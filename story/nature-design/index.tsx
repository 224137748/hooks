import React from 'react';
import { NatureContainer, NatureItem } from '@beisen-phoenix/demo-container';
import UseInViewPort from '../useInViewport';
import UseResizeObserver from '../useResizeObserver/';
import UseToggle from '../useToggle';
import UseUnmount from '../useUnmont';
import UseLatest from '../useLatest';
import UseInterval from '../useInterval';
import UseRafState from '../useRafState';
import UseScroll from '../useScroll';

export const hooks = {
  scene: [],
  lifeCycle: [
    {
      label: 'useUnmount',
      type: 'lifeCycle',
      demo: <UseUnmount/>
    }
  ],
  state: [
    {
      label: 'useToggle',
      type: 'state',
      demo: <UseToggle />,
    },
    {
      label: 'useRafState',
      type: 'state',
      demo: <UseRafState/>
    }
  ],
  effect: [],
  dom: [
    {
      label: 'useInViewport',
      type: 'dom',
      demo: <UseInViewPort />,
    },
    {
      label: 'useScroll',
      type: 'dom',
      demo: <UseScroll/>
    }
  ],
  observer: [
    {
      label: 'useResizeObserver',
      type: 'observer',
      demo: <UseResizeObserver />,
    },
  ],
  advanced: [
    {
      label: 'useLatest',
      type: 'advanced',
      demo: <UseLatest/>
    }
  ],
  animation: [
    {
      label: 'useInterval',
      type: 'animation',
      demo: <UseInterval/>
    }
  ]
};

export default () => {
  return (
    <div>
      {Object.keys(hooks).map((hookType, index) => (
        <div className="hooks-type-wrapper" key={hookType + index}>
          <h2 className="hooks-type-title">{hookType}</h2>
          {hooks[hookType].map((hook, index2) => (
            <div
              className={`hooks-example-item hooks-example-${hook.label}`}
              key={hook.label+ index2}
            >
              <h4 className="hooks-example-item-title">
                #{index2 + 1}&nbsp;{hook.label}
              </h4>
              {hook.demo}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
