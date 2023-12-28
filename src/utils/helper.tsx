/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * hooks
 * @author zggmd
 * @date 2023-03-16
 */
import { useModel } from '@umijs/max';
import * as React from 'react';

type QiankunData = {
  // 存储 主应用 的 state
  state?: any;
  // 存储 子应用的 setInitialState 方法 https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
  // 主应用的 state 变化后, 使用 setInitialState 重新设置 子应用的全局初始状态
  setInitialState?: (state: any) => void;
};
export const _qiankunData: QiankunData = {
  state: undefined,
};
const useQiankunGlobalState = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { setQiankun } = useModel('qiankun');
  React.useEffect(() => {
    setQiankun(initialState);
  }, [setQiankun, initialState]);
  React.useEffect(() => {
    _qiankunData.setInitialState = setInitialState;
  }, [setInitialState]);
};
export { useQiankunGlobalState };
