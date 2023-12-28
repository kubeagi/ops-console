/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * retry
 * @author zggmd
 * @date 2023-12-21
 */

export default class Retry {
  constructor(abort: AbortController, tryTotal: number = 3) {
    this.abortInstance = abort;
    this.total = tryTotal;
  }
  abortInstance: AbortController;
  sum: number = 0;
  total: number;
  abortFlag = Symbol('abortFlag');
  retry() {
    if (this.sum < this.total - 1) {
      this.sum++;
      return;
    }
    this.abort();
    return this.abortFlag;
  }
  abort() {
    this.abortInstance.abort();
    this.sum = 0;
  }
}
