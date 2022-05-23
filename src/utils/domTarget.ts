import type { MutableRefObject } from 'react';

export type TargetValue<T> = T | undefined | null;

export type TargetType = HTMLElement | Element | Window | Document;

/**
 * 定义获取domTarget类型，可以是函数、Element、react-Ref类型
 */
export type  BasicTarget<T extends TargetType= Element> = (() => TargetValue<T>) | TargetValue<T> | MutableRefObject<TargetValue<T>>;


export function getTargetElement<T extends TargetType>(target: BasicTarget<T>) {
  // 不是浏览器环境
  if(!(typeof window !== 'undefined' && window.document &&
  window.document.createElement)) {
    return undefined;
  }
  if (!target) {
    return document;
  }

  let targetElement: TargetValue<T>;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {   // MutableRefObject
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}