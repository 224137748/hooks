import { useCallback, useState } from 'react';

/**
 * 与class Component中forceUpdate作用差不多
 * @returns 
 */
const useForceUpdate = () => {
  const [, setState ] = useState({});
  return useCallback(() => setState({}), []);
};


export default useForceUpdate;