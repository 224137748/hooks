import React from 'react';
import useToggle from '../../../../hooks/src/useToggle/index';
import CmpDemo from '@beisen-phoenix/demo-container';

interface ValueProps1 {
  width: number;
}
interface ValueProps2 {
  height: number;
}
const code = `
import React from 'react'
import { useToggle } from '@beisen-elearning/helper/hooks';

interface ValueProps1 {
  width: number;
}
interface ValueProps2 {
  height: number;
}
const App = () => {
  const [state, { toggle, set, setLeft, setRight }] = useToggle<
    ValueProps1,
    ValueProps2
  >({ width: 100 }, { height: 200 });

return (
  <div>
    <p>toggle当前状态值：{JSON.stringify(state)}</p>
    <p>
      <button type="button" onClick={toggle}>
        Toggle
      </button>
      <button
        type="button"
        onClick={() => set({ width: 800 })}
        style={{ margin: '0 8px' }}
      >
        设置一个新的value，第三个状态
      </button>
      <button type="button" onClick={() => set({ width: 200 })}>
        设置成默认值
      </button>
      <button type="button" onClick={setLeft} style={{ margin: '0 8px' }}>
        Set Left
      </button>
      <button type="button" onClick={setRight}>
        Set Right
      </button>
    </p>
  </div>
);
}


`;
const demo2 = () => {
  const [state, { toggle, set, setLeft, setRight }] = useToggle<
    ValueProps1,
    ValueProps2
  >({ width: 100 }, { height: 200 });
  return (
    <CmpDemo
      title="useToggle"
      desc="在任意两个值之间切换,也可以设置第三个状态值，满足特性的场景"
      code={code}
    >
      <p>toggle当前状态值：{JSON.stringify(state)}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button
          type="button"
          onClick={() => set({ width: 800 })}
          style={{ margin: '0 8px' }}
        >
          设置一个新的value，第三个状态
        </button>
        <button type="button" onClick={() => set({ width: 200 })}>
          设置成默认值
        </button>
        <button type="button" onClick={setLeft} style={{ margin: '0 8px' }}>
          Set Left
        </button>
        <button type="button" onClick={setRight}>
          Set Right
        </button>
      </p>
    </CmpDemo>
  );
};

export default demo2;
