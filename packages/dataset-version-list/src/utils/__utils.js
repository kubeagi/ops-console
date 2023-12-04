import { Modal, notification } from '@tenx-ui/materials';

import { sdk as bff } from '@yuntijs/arcadia-bff-sdk';

import { createRef } from 'react';

const utils = {};

utils.Modal = Modal;

utils.notification = notification;

utils.bff = bff;

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
  Modal,

  notification,

  bff,
};
