import SparkMD5 from 'spark-md5';

import qs from 'qs';

import axios from 'axios';

import { notification } from '@tenx-ui/materials';

import { createRef } from 'react';

const utils = {};

utils.SparkMD5 = SparkMD5;

utils.qs = qs;

utils.axios = axios;

utils.notification = notification;

export class RefsManager {
  constructor() {
    this.refInsStore = {};
  }

  clearNullRefs() {
    Object.keys(this.refInsStore).forEach(refName => {
      const filteredInsList = this.refInsStore[refName].filter(insRef => !!insRef.current);
      if (filteredInsList.length > 0) {
        this.refInsStore[refName] = filteredInsList;
      } else {
        delete this.refInsStore[refName];
      }
    });
  }

  get(refName) {
    this.clearNullRefs();
    if (this.refInsStore[refName] && this.refInsStore[refName].length > 0) {
      return this.refInsStore[refName][0].current;
    }

    return null;
  }

  getAll(refName) {
    this.clearNullRefs();
    if (this.refInsStore[refName] && this.refInsStore[refName].length > 0) {
      return this.refInsStore[refName].map(i => i.current);
    }

    return [];
  }

  linkRef(refName) {
    const refIns = createRef();
    this.refInsStore[refName] = this.refInsStore[refName] || [];
    this.refInsStore[refName].push(refIns);
    return refIns;
  }
}
utils.RefsManager = RefsManager;

export default {
  SparkMD5,

  qs,

  axios,

  notification,
};
