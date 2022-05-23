import React, { useState }  from 'react';
import CmpDemo from '@beisen-phoenix/demo-container';
import template from './template';
import useResizeObserver from '../../src/useResizeObserver/index';
import './index.scss';


const App = () => {
  const [contentRect, setContentRect] = useState();
  const ref  = useResizeObserver((entry) => {
    setContentRect(entry);
  });

  return (
    <CmpDemo
      title="useResizeObserver"
      desc="监听dom resize 👆；为了避免频繁触发render，该hook内并没有直接返回contentRect数据，而是使用回调形式让使用者自行处理数据。"
      code={template}
    >
      <div className="resize-box" ref={ref}>
          {contentRect?.width} x {contentRect?.height}
      </div>
    </CmpDemo>
  )
}

export default App;