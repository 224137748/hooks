import { useState, useMemo } from 'react';

export interface Actions<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (value: T) => void;
  toggle: () => void;
}


/** 函数重载 */
function useToggle<T = boolean>(): [boolean, Actions<T>] & { state: boolean;} & Actions<T>;

function useToggle<T>(defaultValue: T): [T, Actions<T>] & { state: T;} & Actions<T>;

function useToggle<T, U>(defaultValue: T, exchangeValue: U): [T | U, Actions<T | U>] & { state: T | U;} & Actions<T | U>;

function useToggle<D, R>(defaultValue: D = false as unknown as D, exchangeValue?: R) {
  const [state, setstate] = useState<D | R>(defaultValue);

  const actions = useMemo(() => {
    const exchangeValueOrigin = (exchangeValue === undefined ? !defaultValue : exchangeValue) as D | R;

    const toggle = () => setstate((preValue) => preValue === defaultValue ? exchangeValueOrigin : defaultValue);
    const set  = (value: D | R) => setstate(value);
    const setLeft = () => setstate(defaultValue);
    const setRight = () => setstate(exchangeValueOrigin);

    return {
      toggle,
      set,
      setLeft,
      setRight
    };
  }, [])

  const result = [state, actions] as ReturnType<typeof useToggle>;
  result.state = result[0];
  result.set = result[1].set;
  result.setLeft = result[1].setLeft;
  result.setRight = result[1].setRight;
  result.toggle = result[1].toggle;
  return result;
}



export default useToggle;