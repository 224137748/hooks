import { useRef } from 'react';
import type { MutableRefObject } from 'react';

/**
 * 使用useRef，返回当前最新的值，可以避免闭包问题
 * @param value 
 */
function useLatest<T>(value: T): MutableRefObject<T> {
  const ref = useRef(value)
  ref.current = value;

  return ref;
}

export default useLatest;