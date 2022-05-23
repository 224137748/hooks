import React, { useEffect, useState, Suspense } from 'react';
import CmpDemo from '@beisen-phoenix/demo-container';
import useInViewport from '../../../src/useInViewport/index';
import { Skeleton } from './AsyncComponent';
import './demo2.scss';

const code = `
import React, { useEffect, useState, Suspense } from 'react';
import useInViewport from '../../../src/useInViewport/index';
import { Skeleton } from './AsyncComponent';
import './demo2.scss';

const RankList = React.lazy(() =>
  import(/* webpackChunkName: "ranklist" */ './AsyncComponent')
);


const Demo2 = () => {
  const [loading, setloading] = useState(false);
  const { ref, inView } = useInViewport({
    triggerOnce: true,
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setloading(true);
      }, 3000);
    }
  }, [inView]);

  return (
    <div>
      <h4 className="desc-tit">inView: {inView}}</h4>
      <div className="parent">
        <div className="others"></div>
        <div className="child" ref={ref}>
          <Suspense fallback={<div>Loading...</div>}>
            {inView ? <RankList /> : <Skeleton />}
          </Suspense>
        </div>
        <div className="others"></div>
      </div>
    </div>
  );
};
`

const RankList = React.lazy(() =>
  import(/* webpackChunkName: "ranklist" */ './AsyncComponent')
);

const Demo2 = () => {
  const [loading, setloading] = useState(false);
  const { ref, inView } = useInViewport({
    triggerOnce: true,
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setloading(true);
      }, 3000);
    }
  }, [inView]);

  return (
    <CmpDemo
      title="懒加载组件"
      desc="当组件完全滚动到视图区域内，才加载组件，组件加载完成之前默认展示骨架屏，该hook配置了triggerOnce，只会只执行一次"
      code={code}
    >
      <>
        <h4 className="desc-tit">inView: {`${inView}`}</h4>
        <div className="parent">
          <div className="others"></div>
          <div className="child" ref={ref}>
            <Suspense fallback={<div>Loading...</div>}>
              {inView ? <RankList /> : <Skeleton />}
            </Suspense>
          </div>
          <div className="others"></div>
        </div>
      </>
    </CmpDemo>
  );
};

export default Demo2;
