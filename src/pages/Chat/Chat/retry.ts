/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2023 TenxCloud. All Rights Reserved.
 */

/**
 * retry
 * @author songsz
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
