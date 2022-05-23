import React, { useState, useEffect } from 'react';
import CmpDemo from '@beisen-phoenix/demo-container';

import useLatest from '../../src/useLatest';

const code = {
  '使用hook前': `
  import React, { useState, useEffect, useRef } from 'react';

  const Demo = () => {
    const [count, setcount] = useState(0);
    const lastCountRef = useRef(count);
    
    useEffect(() => {
      const timer = setInterval(() => {
        setcount(lastCountRef.current + 1);
        lastCountRef.current = lastCountRef.current + 1
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  
    return (
      <div>
        <p>count: {count}</p>
      </div>
    );
  };
  `,
  '使用hook后': `
  import React, { useState, useEffect } from 'react';
  import useLatest from '../../src/useLatest';

  const Demo = () => {
    const [count, setcount] = useState(0);
    const lastCountRef = useLatest(count);
    
    useEffect(() => {
      const timer = setInterval(() => {
        setcount(lastCountRef.current + 1);
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  
    return (
      <div>
        <p>count: {count}</p>
      </div>
    );
  };
  `,
};

const Demo = () => {
  const [count, setcount] = useState(0);
  const lastCountRef = useLatest(count);

  useEffect(() => {
    const timer = setInterval(() => {
      setcount(lastCountRef.current + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <CmpDemo
      title="基本用法"
      desc="其实useLatest就是将useRef简单封装了一下，减少代码输入, 这个实例比较简单也可以不用该hook，这里只是为了方便演示故意写的。"
      code={code}
    >
      <p>count: {count}</p>
    </CmpDemo>
  );
};

export default Demo;
