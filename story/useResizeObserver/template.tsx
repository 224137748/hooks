const template = `

import React  from 'react';
import CmpDemo from '@beisen-phoenix/demo-container';
import useResizeObserver from '../index';
import './index.scss';


const App = () => {
  const {ref, contentRect }  = useResizeObserver((entry) => {
    console.log('entry ==> ', entry);
  });

  return (
    <CmpDemo
      title="useResizeObserver"
      desc="监听dom resize 👇"
    >
      <div className="resize-box" ref={ref}>
          {contentRect?.width} x {contentRect?.height}
      </div>
    </CmpDemo>
  )
}

export default App;


`;

export default template;
