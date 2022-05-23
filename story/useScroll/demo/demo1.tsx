import React, { useRef, useState, useEffect } from 'react';
import CmpDemo from '@beisen-phoenix/demo-container';
import useScroll from '../../../src/useScroll';
import type { ScrollListenController } from '../../../src/useScroll';
import './demo1.scss';

const desc = (
  <div>
    <div>
      1、useScroll(target,
      shouldUpdate)。
    </div>
    <div>
    2、第一个参数是dom元素，用于注册scroll事件的，类型是
      {`() => HTMLElement、HTMLElement，MutableRefObject<HTMLElement>`}，<strong>默认值为document</strong>，推荐使用函数、MutableRefObject方式传参。
    </div>
    <div>3、第二个参数是一个函数，{`(position) => boolean`}
      根据position值返回布尔值，用于是否触发scroll更新回调，true则更新，反之false则不更新。</div>
    <div>
      4、该hook返回[position,scrollTo]元组，position为滚动信息，scrollTo将监听scroll事件的dom滚动到指定位置，参数可以为ScrollToOption，也可以是类型是
      {`() => HTMLElement、HTMLElement，MutableRefObject<HTMLElement>`}中一种。
    </div>
    <div>
      5、scrollTo如果参数为HTMLElement的话，一定要确保是target的dom子集，否则不会生效。
    </div>
    <div>
      6、如果scrollTo传入的参数为HTMLElement，会计算该dom元素与其offsetParent之间的距离，如果scrollTo没有生效，请确定监听scroll的dom元素是否为child的最近的“定位元素”。
      <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent">查看详情</a>
    </div>
  </div>
);

const code = `
import React, { useRef, useState, useEffect } from 'react';
import useScroll from '../../../src/useScroll';
import type { ScrollListenController } from '../../../src/useScroll';
import './demo1.scss';

const Demo1 = () => {
  const ref = useRef<HTMLDivElement>();
  const [value, setValue] = useState(200)
  const [scrollOption, setscrollOption] = useState<ScrollToOptions>({
    left: 100,
    top: 100,
    behavior: 'smooth'
  });

  const [childIndex, setChildIndex] = useState(10);
  
  const shouldScrollUpdate:ScrollListenController = (position) => {
    if (position.top > value) {
      return false;
    }
    return true;
  }
  const [position, scrollTo] = useScroll(ref, shouldScrollUpdate);

  const [scrollPosition1] = useScroll(document.querySelector('.hooks-scroll-wrap'));
  const [scrollPosition2] = useScroll(() => document.querySelector('.hooks-scroll-wrap'));

  return (
    <div className="usescroll-demo1">
      <div>
        <div>
          <h4>功能1、监听class类名为‘hooks-scroll-wrap’的dom元素滚动位置：</h4>
          <div>
            <p>方式一：scrollPosition1 = {JSON.stringify(scrollPosition1)} </p>
            <code>
              { const [scrollPosition1] = useScroll(document.querySelector('.hooks-scroll-wrap'));}
            </code>
          </div>
          <div>
            <p>方式二：scrollPosition2 = {JSON.stringify(scrollPosition2)} </p>
            <code>
              {const [scrollPosition2] = useScroll(() => document.querySelector('.hooks-scroll-wrap'));}
            </code>
          </div>
        </div>

        <h4>功能2、监听滚动下面div滚动位置：{JSON.stringify(position)}</h4>
      
        <div className="usescroll-wrapper" id="useSroll-demo1" ref={ref}>
          <div className="usescroll-scroll-list">
            {Array(30)
              .fill(0)
              .map((_, index) => {
                return (
                  <div className="usescroll-scroll-item" key={index}>
                    {index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;
                  </div>
                );
              })}
          </div>
        </div>
        <h4>功能3:自定义监听，当上面的div滚动高度超过<input type="number" value={value} onChange={(e) => setValue(e.target.value)} />时，将不再更新position。
        </h4>
        <h4>功能4: 设置监听scroll事件的dom元素滚动到指定位置。</h4>
          <div>
            将上面蓝色边框div滚动到left：
            <input type="number" 
              value={scrollOption.left} 
              onChange={(e) => setscrollOption({
                ...scrollOption,
                left: e.target.value
              })}
            />，
            top：
            <input type="number" value={scrollOption.top} 
                onChange={(e) => setscrollOption({
                ...scrollOption,
                top: e.target.value
              })}
            />
            <button onClick={() => scrollTo(scrollOption)}>开始滚动</button>
          </div>
          <div>
            将上面蓝色边框div滚动第<input type="number" value={childIndex} onChange={(e) => setChildIndex(e.target.value)} />个子元素，<button onClick={() => {
              scrollTo(() => document.getElementsByClassName('usescroll-scroll-item')[childIndex])
            }}>开始滚动</button>
          </div>
      </div>
    </div>
  );
};
`

const Demo1 = () => {
  const ref = useRef<HTMLDivElement>();
  const [value, setValue] = useState(200)
  const [scrollOption, setscrollOption] = useState<ScrollToOptions>({
    left: 100,
    top: 100,
    behavior: 'smooth'
  });

  const [childIndex, setChildIndex] = useState(10);
  
  const shouldScrollUpdate:ScrollListenController = (position) => {
    if (position.top > value) {
      return false;
    }
    return true;
  }
  const [position, scrollTo] = useScroll(ref, shouldScrollUpdate);

  const [scrollPosition1] = useScroll(document.querySelector('.hooks-scroll-wrap'));
  const [scrollPosition2] = useScroll(() => document.querySelector('.hooks-scroll-wrap'));
  const [_, bodyScroll] = useScroll();
  return (
    <div className="usescroll-demo1">
      <CmpDemo title="基本使用" desc={desc} code={code}>
        <div>
          <div>
            <h4>功能1、监听class类名为‘hooks-scroll-wrap’的dom元素滚动位置：</h4>
            <div>
              <p>方式一：scrollPosition1 = {JSON.stringify(scrollPosition1)} </p>
              <code>
                {` const [scrollPosition1] = useScroll(document.querySelector('.hooks-scroll-wrap'));`}
              </code>
            </div>
            <div>
              <p>方式二：scrollPosition2 = {JSON.stringify(scrollPosition2)} </p>
              <code>
                {`const [scrollPosition2] = useScroll(() => document.querySelector('.hooks-scroll-wrap'));`}
              </code>
            </div>
          </div>
          <hr />
          <h4>功能2、监听滚动下面div滚动位置：{JSON.stringify(position)}</h4>
        
          <div className="usescroll-wrapper" id="useSroll-demo1" ref={ref}>
            <div className="usescroll-scroll-list">
              {Array(30)
                .fill(0)
                .map((_, index) => {
                  return (
                    <div className="usescroll-scroll-item" key={index}>
                      {index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;{index} 这是一段文字;
                    </div>
                  );
                })}
            </div>
          </div>
          <hr />

          <h4>功能3:自定义监听，当上面的div滚动高度超过<input type="number" value={value} onChange={(e) => setValue(e.target.value)} />时，将不再更新position。
          </h4>
          <hr />

          <h4>功能4: 设置监听scroll事件的dom元素滚动到指定位置。</h4>
            <div>
              将上面蓝色边框div滚动到left：
              <input type="number" 
                value={scrollOption.left} 
                onChange={(e) => setscrollOption({
                  ...scrollOption,
                  left: e.target.value
                })}
              />，
              top：
              <input type="number" value={scrollOption.top} 
                  onChange={(e) => setscrollOption({
                  ...scrollOption,
                  top: e.target.value
                })}
              />
              <button onClick={() => scrollTo(scrollOption)}>开始滚动</button>
            </div>
            <div>
              将上面蓝色边框div滚动第<input type="number" value={childIndex} onChange={(e) => setChildIndex(e.target.value)} />个子元素，<button onClick={() => {
                scrollTo(() => document.getElementsByClassName('usescroll-scroll-item')[childIndex])
              }}>开始滚动</button>
            </div>
        </div>
      </CmpDemo>
    </div>
  );
};

export default Demo1;
