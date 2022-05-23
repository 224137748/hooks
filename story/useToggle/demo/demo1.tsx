import React from 'react'
import useToggle from '../../../../hooks/src/useToggle/index';
import CmpDemo from '@beisen-phoenix/demo-container';

const code = `
import React from 'react'
import { useToggle } from '@beisen-elearning/helper/hooks';

const App = () => {
  const [state, {toggle, setLeft, setRight}] = useToggle();
  // 也支持对象方式使用
  // const {state, setLeft, setRight, toggle} = useToggle();
  return (
    <div>
      <p>当前状态值： {state}</p>
      <p>
        <button type="button" onClick={toggle}>
          toggle
        </button>
        <button type="button" onClick={setLeft}>
          setLeft
        </button>
        <button type="button" onClick={setRight}>
          setRight
        </button>
      </p>
    </div>
  )
}


`;

const description = <div>
  <div>1、useToogle hook默认返回的类型是boolean。</div>
  <div>2、useToogle支持数组和对象两种用法。</div>
</div>

const Demo1 = () => {
  // const [state, {toggle, setLeft, setRight}] = useToggle();
  const {state, setLeft, setRight, toggle} = useToggle();
  return (
    <CmpDemo
      title="useToggle"
      desc={description}
      code={code}
    >
      <p>当前状态值： {`${state}`}</p>
      <p>
        <button type="button" onClick={toggle}>
          toggle
        </button>
        <button type="button" onClick={setLeft}>
          setLeft
        </button>
        <button type="button" onClick={setRight}>
          setRight
        </button>
      </p>
    </CmpDemo>
  )
}

export default Demo1