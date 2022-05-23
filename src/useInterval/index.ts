import { useEffect } from 'react';
import useLatest from '../useLatest';

function useInterval(callback: Function, delay?: number | null) {
  const callbackRef = useLatest(callback);

  useEffect(() => {
    if (delay !== null) {
      const timer = window.setInterval(() => callbackRef.current(), delay || 0);
      return () => clearInterval(timer);
    }
    return undefined;
  }, [delay]);
}

export default useInterval;
