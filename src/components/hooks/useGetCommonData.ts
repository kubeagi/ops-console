/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 *
 * useGetCommonData 通用的请求数据的hook
 *
 * @author zggmd
 * @date 2023-12-26
 *
 */
import get from 'lodash/get';
import { useCallback, useEffect, useState } from 'react';

import request from '@/utils/request';

interface Data<T> {
  url: string;
  method?: 'get' | 'post' | 'delete' | 'put' | 'patch' | 'head' | 'options' | 'rpc';
  initValue: T;
  payload?: any;
  resStr?: string;
  refresh?: any;
  // 不请求数据，并设置返回值为initValue
  notFetch?: boolean;
  onError?: any;
  format?: (input: any) => T;
  options?: object;
}

const useGetCommonData = <T>(data: Data<T>) => {
  const {
    url,
    options,
    method = 'get',
    initValue,
    payload,
    resStr,
    refresh,
    notFetch,
    onError,
    format,
  } = data;
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<T>(initValue);
  const getData = useCallback(async () => {
    if (notFetch) return setList(initValue);
    setLoading(true);
    const res = await request[method]({
      url,
      options,
    }).catch(
      onError ||
        (() => {
          setDone(true);
          setLoading(false);
        })
    );
    const v = (resStr ? get(res, resStr) : res) || initValue;
    setList(format ? format(v) : v);
    setDone(true);
    setLoading(false);
  }, [setList, refresh, notFetch, setLoading]);
  useEffect(() => {
    getData();
  }, [getData]);
  return [list, loading, done] as [T, boolean, boolean];
};
export default useGetCommonData;
