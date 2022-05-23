import React, { useEffect, useMemo } from 'react';
import CmpDemo from '@beisen-phoenix/demo-container';
import useInViewport from '../../../src/useInViewport/index';
import './demo1.scss';

const code = `
import React, { useEffect, useMemo } from 'react';
import useInViewport from '@beisen-elearning/helper/lib/hooks';
import './demo1.scss';
let maxRatio = 0;

const Demo1 = () => {
  const { ref, inView, entry } = useInViewport({
    threshold: [0.3, 0.5, 0.8],
  });

  const renderText = useMemo(() => {
    let text = '向上滚动，我们的视图将会进入一位新同学...';
    if (!entry) {
      return text;
    }
    const intersectionRatio = entry.intersectionRatio;
    if (maxRatio <= intersectionRatio) {
      if (intersectionRatio === 1) {
        text = '我进来了，你来打我呀';
      } else if (intersectionRatio > 0.8) {
        text = '哈哈，我进来了';
      } else if (intersectionRatio > 0.5) {
        text = '哦吼，我要进来了';
      } else if (intersectionRatio > 0.3) {
        text = '大叫好我是张暴富，我要进入视图区域了';
      }
    } else {
      if (intersectionRatio < 0.3) {
        text = '撒浪嘿哟，再见啦';
      } else if (intersectionRatio < 0.8) {
        text = '拜拜，我准备走了';
      }
    }
    maxRatio = intersectionRatio;
    return text;
  }, [entry?.intersectionRatio]);

  useEffect(() => {
  }, [entry]);

  return (
    <div>
      <h4 className="desc-tit">
        inView: {inView}}
      </h4>
      <fieldset className="parent">
        <legend>{renderText}</legend>
        <div className="others"></div>
        <div className="child" ref={ref}>
          轻轻的我来了...
        </div>
        <div className="others"></div>
      </fieldset>
    </div>
  );
};

export default Demo1;


`

let maxRatio = 0;

const Demo1 = () => {
  const { ref, inView, entry } = useInViewport({
    threshold: [0.3, 0.5, 0.8],
  });

  const renderText = useMemo(() => {
    let text = '向上滚动，我们的视图将会进入一位新同学...';
    if (!entry) {
      return text;
    }
    const intersectionRatio = entry.intersectionRatio;
    if (maxRatio <= intersectionRatio) {
      if (intersectionRatio === 1) {
        text = '我进来了，你来打我呀';
      } else if (intersectionRatio > 0.8) {
        text = '哈哈，我进来了';
      } else if (intersectionRatio > 0.5) {
        text = '哦吼，我要进来了';
      } else if (intersectionRatio > 0.3) {
        text = '大叫好我是张暴富，我要进入视图区域了';
      }
    } else {
      if (intersectionRatio < 0.3) {
        text = '撒浪嘿哟，再见啦';
      } else if (intersectionRatio < 0.8) {
        text = '拜拜，我准备走了';
      }
    }
    maxRatio = intersectionRatio;
    return text;
  }, [entry?.intersectionRatio]);


  return (
    <CmpDemo title="基础使用" desc="监听dom滚动到试图区域内" code={code}>
      <>
        <h4 className="desc-tit">
          inView: {`${inView}`}
        </h4>
        <fieldset className="parent">
          <legend>{renderText}</legend>
          <div className="others"></div>
          <div className="child" ref={ref}>
            轻轻的我来了...
          </div>
          <div className="others"></div>
        </fieldset>
      </>
    </CmpDemo>
  );
};

export default Demo1;
