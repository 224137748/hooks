import React, { useState, useRef } from 'react'
import CmpDemo from '@beisen-phoenix/demo-container';
import useInterval from '../../src/useInterval';
import useRafState from '../../src/useRafState';
import useToggle from '../../src/useToggle';


const desc = <div>
  <div>1、该hook设置的状态，只在requestAnimationFrame callback时更新state，一般用于性能优化。</div>
  <div>2、useRafState状态的更新不是很即时，可用于监听dom scroll，resize等事件。</div>
</div>

const code = `
import React, { useState, useRef } from 'react'
import useInterval from '../../src/useInterval';
import useRafState from '../../src/useRafState';
import useToggle from '../../src/useToggle';

const Demo = () => {
  const {state, toggle,} = useToggle();
  const [values1, setValues1] = useState([]);
  const [values2, setValues2] = useRafState([]);
  const count = useRef(0);
  const time = useRef(0);

  // 以4ms更新 count的值；谷歌浏览器最低是4ms。
  useInterval(() => {
    count.current = count.current + 4;
    time.current =time.current + 4;
    setValues1([...values1, count.current]);
    setValues2([...values2, count.current]);
  }, state ? 4: null);

  if (time.current > 200) {
    toggle();
    time.current = 0;
  }

  return (
    <CmpDemo
      title="基本使用"
      desc="desc"
      code={code}
    >
      <p>useState: {values1.length ? [values1.toString()]: '[]'}</p>
      <p>useRafState: {values2.length ? [values2.toString()]: '[]'}</p>
      <div>
        <button onClick={toggle}>{state ? '停止': '开始'}累加数值</button>
        <button disabled={state} onClick={() => {
          setValues1([]);
          setValues2([]);
          count.current = 0;
        }}>重置</button>
      </div>
    </CmpDemo>
  )
}
`



const Demo = () => {
  const {state, toggle,} = useToggle();
  const [values1, setValues1] = useState([]);
  const [values2, setValues2] = useRafState([]);
  const count = useRef(0);
  const time = useRef(0);

  // 以4ms更新 count的值；
  useInterval(() => {
    count.current = count.current + 4;
    time.current =time.current + 4;
    setValues1([...values1, count.current]);
    setValues2([...values2, count.current]);
  }, state ? 4: null);

  if (time.current > 200) {
    toggle();
    time.current = 0;
  }

  return (
    <CmpDemo
      title="基本使用"
      desc={desc}
      code={code}
    >
      <p style={{wordWrap: 'break-word'}}>useState: {values1.length ? `[${values1.toString()}]`: '[]'}</p>
      <p style={{wordWrap: 'break-word'}}>useRafState: {values2.length ? `[${values2.toString()}]`: '[]'}</p>
      <div>
        <button onClick={toggle}>{state ? '停止': '开始'}累加数值</button>
        <button disabled={state} onClick={() => {
          setValues1([]);
          setValues2([]);
          count.current = 0;
        }}>重置</button>
      </div>
    </CmpDemo>
  )
}

export default Demo