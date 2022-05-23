import { RefObject, useEffect, useRef, useState } from 'react';

export interface ResizeObserverEntry {
  target: HTMLElement;
  contentRect: DOMRectReadOnly;
}

export type ObserverCallback = (entry: DOMRectReadOnly) => void;

export interface ResizeObserverFn {
  (callback?: ObserverCallback): RefObject<HTMLElement>;

}

/**
 * 监听dom元素resize
 * @returns
 */
const useResizeObserver: ResizeObserverFn = (callback) => {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;
    if (ref.current) {
      resizeObserver = new (window as any).ResizeObserver(
        (entries: ResizeObserverEntry[]) => {
          if (callback) {
            callback(entries[0].contentRect);
          }
        }
      );
      resizeObserver.observe(ref.current);
    } else {
      console.warn('请传入需要监听的dom元素!!!');
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return ref;
};

export default useResizeObserver;
