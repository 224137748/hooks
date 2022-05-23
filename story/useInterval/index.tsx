import React, { useState, useEffect, useRef } from 'react';
import CmpDemo from '@beisen-phoenix/demo-container';
import useInterval from '../../src/useInterval';
import useToggle from '../../src/useToggle';

const code = {
  '不使用hook实现': `
  import React, { useState, useEffect, useRef } from 'react';

  const Demo = () => {
    const [state, setState] = useState(true)
    const [count, setcount] = useState(0);
    const lastCountRef = useRef(count);
    const timer = useRef();
    
    useEffect(() => {
      if (state) {
        timer.current = setInterval(() => {
          setcount(lastCountRef.current + 1);
          lastCountRef.current = lastCountRef.current + 1;
        }, 1000);
      } else {
        clearInterval(timer.current)
      }
      
      return () => (timer.current && clearInterval(timer.current));
    }, [state]);

    return (
      <div>
        <p>count: {count}</p>
        <button onClick={() => setState(prev => !prev)}>{state ? '暂停计时' : '开始计时'}</button>
        <button
          onClick={() => {
            setState(false);
            setcount(0);
            lastCountRef.current = 0;
          }}
        >
          重置
        </button>
      </div>
    );
  };
  `,
  '使用hook实现': `
  import React, { useState} from 'react';
  const Demo = () => {
    const [state, { toggle, set }] = useToggle();
    const [count, setcount] = useState(0);
  
    useInterval(
      () => {
        setcount(count + 1);
      },
      state ? 1000 : null
    );
  
    return (
      <div>
        count: {count}
        <button onClick={toggle}>{state ? '暂停计时' : '开始计时'}</button>
        <button
          onClick={() => {
            set(false);
            setcount(0);
          }}
        >
          重置
        </button>
      </div>
    );
  };
  `,
};

const desc = (
  <div>
    <div>1、使用该hook不用担心闭包问题。</div>
    <div>2、通过state状态值，控制是否开启定时器，非常方便。</div>
    <div>3、state 为false时，自动清除倒计时，不用自己维护timer的清理逻辑.</div>
  </div>
);
const Demo = () => {
  const [state, { toggle, set }] = useToggle();
  const [count, setcount] = useState(0);

  useInterval(
    () => {
      setcount(count + 1);
    },
    state ? 1000 : null
  );

  return (
    <CmpDemo title="基本使用,实现一个开始、暂停、重置功能的计时器" desc={desc} code={code}>
      <div>
        <p>count: {count}</p>
        <button onClick={toggle}>{state ? '暂停计时' : '开始计时'}</button>
        <button
          onClick={() => {
            set(false);
            setcount(0);
          }}
        >
          重置
        </button>
      </div>
    </CmpDemo>
  );
};

export default Demo;
