import { useMemo, useEffect, useCallback } from 'react';
import { getTargetElement, offset, useEffectWithTarget } from '../utils';
import type { BasicTarget, TargetValue, TargetType } from '../utils';
import useRafState from '../useRafState';
import useLatest from '../useLatest';

type Position = {left: number; top: number;}
export type Target = BasicTarget<Element | Document>
export type ScrollListenController = (val: Position) => boolean;
export type ScrollToFnProps = (param: BasicTarget | ScrollToOptions, easing?: boolean) => void;



function useScroll(target?: Target, shouldUpdate: ScrollListenController = () => true): [Position | undefined, ScrollToFnProps] {
  const [position, setPosition] = useRafState<Position>({
    left: 0,
    top: 0
  });
  const shouldUpdateRef = useLatest(shouldUpdate);

  // 以防该方法作为props参数传入子组件，造成重新render，使用useCallback封装
  const scrollTo = useCallback<ScrollToFnProps>((param, easing = true) => {
    const el = getTargetElement(target);
    if (!el || !param) return;
    let options: ScrollToOptions;
    // param 类型为  ScrollToOptions
    if ('left' in param || 'top' in param) {
      options = param;
    } else {
      let targetElement: TargetValue<HTMLElement>;

      if (typeof param === 'function') { // () => document.getElementById('xx')
        targetElement = param();
      } else if ('current' in param) {   // MutableRefObject
        targetElement = param.current;
      } else {  // HTMLElement
        targetElement = param;
      }

      // 判断targetElement元素是否是滚动dom的子集元素
      if (el instanceof HTMLElement &&  !el.contains(targetElement)) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`设置滚动位置为dom元素的话，此元素必须为监听scroll事件dom元素的子集。`)
        }
        return;
      }
      const {left, top} = offset(targetElement || null, el);
      options = {
        left,
        top,
        behavior: easing ? 'smooth': 'auto'
      }
    }

    try {
      if (el instanceof HTMLElement) {
        (el as Element).scrollTo(options);
      } else {
        window.scrollTo(options);
      }
    } catch (error) {
      console.log(error);
    }
  }, [])

  // 这个hook作用是将传入的dom作为deps，存入到ref中，当dom发生变化时销毁旧dom注册的scroll事件，监听新dom scroll事件。
  useEffectWithTarget(
    () => {
      const el = getTargetElement(target);
      if (!el) {
        return;
      }

      const handle = () => {
        let newPosition: Position;
        if (el === document) {
          if (document.scrollingElement) {
            newPosition = {
              left: document.scrollingElement.scrollLeft,
              top: document.scrollingElement.scrollTop
            }
          } else {
            // quirks mode和strict mode是浏览器解析css的两种模式，在quirks模式下，scrollingElement属性返回HTML body元素（如果它存在并且可能可滚动），否则返回null。这里做兼容处理
            newPosition = {
              left: Math.max(
                window.pageYOffset,
                document.documentElement.scrollTop,
                document.body.scrollTop,
              ),
              top: Math.max(
                window.pageXOffset,
                document.documentElement.scrollLeft,
                document.body.scrollLeft,
              ),
            }
          }

        } else {
          newPosition = {
            left: (el as Element).scrollLeft,
            top: (el as Element).scrollTop,
          };
        }

        if (shouldUpdateRef.current(newPosition)) {
          setPosition(newPosition);
        }
      }

      handle();

      el.addEventListener('scroll', handle, {
        capture: false,
        passive: true,  // listener不会调用preventDefault方法
      });
      return () => {
        el.removeEventListener('scroll', handle);
      }
    },
    [],
    target
  )

  return [position, scrollTo];
}

export default useScroll;