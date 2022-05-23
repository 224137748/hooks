import { useState, useRef, useCallback } from 'react';
import { Dispatch, SetStateAction } from 'react';
import useUnmount from '../useUnmount';

function useRafState<T>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>];
function useRafState<T = undefined>(): [
  T | undefined,
  Dispatch<SetStateAction<T | undefined>>
];

function useRafState<T>(initialState?: T | (() => T)) {
  const [state, setState] = useState(initialState);
  const ref = useRef(0);

  const setRafState = useCallback((value: T | (() => T)) => {
    cancelAnimationFrame(ref.current);

    ref.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useUnmount(() => {
    cancelAnimationFrame(ref.current);
  });

  return [state, setRafState] as const;
}

export default useRafState;
