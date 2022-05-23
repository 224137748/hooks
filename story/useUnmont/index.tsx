import React from 'react';
import CmpDemo from '@beisen-phoenix/demo-container';
import useUnmount from '../../src/useUnmount';
import useToogle from '../../src/useToggle';

const code = `
import React from 'react';
import useUnmount from '../../src/useUnmount';
import useToogle from '../../src/useToogle';

const Input = () => {
  useUnmount(() => {
    alert('确定要卸载输入框嘛？');
  });

  return (
    <div>
      <input
        disabled
        type="text"
        placeholder="一个禁用的输入框"
      />
    </div>
  );
};

const Demo = () => {
  const { state, toggle } = useToogle(true);
  return (
    <div>
      <p>
        {state ? '卸载' : '展示'}输入框组件， <button onClick={toggle}>{state ? '卸载' : '展示'}</button>
      </p>
      {state && <Input />}
    </div>
  );
};
`

const Input = () => {
  useUnmount(() => {
    if(process.env.NODE_ENV !== 'development') {
      alert('确定要卸载输入框嘛？');
    }
  });

  return (
    <div>
      <input
        disabled
        type="text"
        placeholder="一个禁用的输入框"
      />
    </div>
  );
};

const Demo = () => {
  const { state, toggle } = useToogle(true);
  return (
    <CmpDemo title="基础使用" desc="在组件卸载时，执行函数。" code={code} >
      <p>
        {state ? '卸载' : '展示'}输入框组件， <button onClick={toggle}>{state ? '卸载' : '展示'}</button>
      </p>
      {state && <Input />}
    </CmpDemo>
  );
};

export default Demo;
