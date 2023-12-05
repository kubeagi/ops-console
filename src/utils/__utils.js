import { message } from 'antd';

import { notification, Modal } from '@tenx-ui/materials';

import { getAuthData, setAuthData, removeAuthData, isTokenExpired } from '@tenx-ui/auth-utils';

import { createRef } from 'react';
import { sdk as bff } from '@yuntijs/arcadia-bff-sdk';

import _ from 'lodash';

import axios from 'axios';

const utils = {};

utils.bff = bff;

utils.message = message;

utils.notification = notification;

utils.getAuthData = getAuthData;

utils.setAuthData = setAuthData;

utils.removeAuthData = removeAuthData;

utils.isTokenExpired = isTokenExpired;

/** 获取 Authorization header */
utils.getAuthorization = function __getAuthorization() {
  return () => {
    const authData = this.getAuthData();
    const { token_type, id_token } = authData.token || {};
    const Authorization = token_type && id_token && `${token_type} ${id_token}`;
    return Authorization;
  };
}.apply(utils);
export const getAuthorization = utils.getAuthorization;

/** 获取 axios 默认配置，也可在配置中指定拦截器，用于数据源初始化 axios handler */
utils.getAxiosHanlderConfig = function __getAxiosHanlderConfig() {
  return () => ({
    // 详细配置见：http://dev-npm.tenxcloud.net/-/web/detail/@yunti/lowcode-datasource-axios-handler
    interceptors: {
      request: [
        {
          onFulfilled: config => {
            if (!config.headers.get('Authorization')) {
              config.headers.set('Authorization', this.getAuthorization());
            }
            return config;
          },
        },
      ],
    },
  });
}.apply(utils);
export const getAxiosHanlderConfig = utils.getAxiosHanlderConfig;

/** 数据源状态 */
utils.getDataSourceStatus = function __getDataSourceStatus() {
  return (pageThis, isStatus, isTag) => {
    return [
      // 导入中
      {
        type: 'primary',
        [isStatus ? 'id' : 'value']: 'process',
        [isStatus || isTag ? 'children' : 'text']: pageThis.i18n('i18n-9plmyzo5'),
      },
      // 连接成功
      {
        type: 'success',
        [isStatus ? 'id' : 'value']: 'success',
        [isStatus || isTag ? 'children' : 'text']: pageThis.i18n('i18n-qahl1me8'),
      },
      {
        // 连接异常
        type: 'error',
        [isStatus ? 'id' : 'value']: 'error',
        [isStatus || isTag ? 'children' : 'text']: pageThis.i18n('i18n-8f4bzjjd'),
      },
    ];
  };
}.apply(utils);
export const getDataSourceStatus = utils.getDataSourceStatus;

/** 数据源类型 */
utils.getDataSourceTypes = function __getDataSourceTypes() {
  return (pageThis, isTag) => {
    const valueKey = 'value';
    const labelKey = isTag ? 'children' : 'text';
    return [
      {
        [valueKey]: 'localUpload',
        [labelKey]: pageThis.i18n(''),
        forms: ['upload'],
      },
      {
        [valueKey]: 'fileStorage',
        [labelKey]: pageThis.i18n(''),
        forms: ['serverAddress', 'path'],
      },
      {
        [valueKey]: 'objectStorage',
        [labelKey]: pageThis.i18n(''),
        forms: ['Bucket', 'Object'],
      },
      {
        [valueKey]: 'mysql',
        [labelKey]: pageThis.i18n(''),
        forms: ['serverAddress', 'username', 'password'],
      },
      {
        [valueKey]: 'mongodb',
        [labelKey]: pageThis.i18n(''),
        forms: ['serverAddress', 'username', 'password'],
      },
      {
        [valueKey]: 'api',
        [labelKey]: pageThis.i18n(''),
        forms: ['apiAddress', 'token'],
      },
    ];
  };
}.apply(utils);
export const getDataSourceTypes = utils.getDataSourceTypes;

/** 数据集类型 */
utils.getDataSetTypes = function __getDataSetTypes() {
  return (pageThis, isTag) => {
    const valueKey = 'value';
    const labelKey = isTag ? 'children' : 'label';
    return [
      {
        // 文本
        [valueKey]: 'text',
        [labelKey]: pageThis.i18n('i18n-3kxctf9p'),
      },
      {
        // 图片
        [valueKey]: 'image',
        [labelKey]: pageThis.i18n('i18n-4sbaoiyr'),
      },
      {
        // 视频
        [valueKey]: 'video',
        [labelKey]: pageThis.i18n('i18n-516o6p6k'),
      },
    ];
  };
}.apply(utils);
export const getDataSetTypes = utils.getDataSetTypes;

/** 数据源应用场景 */
utils.getDataSetApplicationScenario = function __getDataSetApplicationScenario() {
  return (pageThis, isTag) => {
    const valueKey = 'value';
    const labelKey = isTag ? 'children' : 'label';
    return [
      {
        // 科技
        [valueKey]: 'science',
        [labelKey]: pageThis.i18n('i18n-zpw49ds4'),
      },
      {
        // 金融
        [valueKey]: 'finance',
        [labelKey]: pageThis.i18n('i18n-3avsorb4'),
      },
      {
        // 教育
        [valueKey]: 'education',
        [labelKey]: pageThis.i18n('i18n-hrtg7fkn'),
      },
      {
        // 医疗
        [valueKey]: 'medical',
        [labelKey]: pageThis.i18n('i18n-yrc22hwt'),
      },
      {
        // 能源
        [valueKey]: 'energy',
        [labelKey]: pageThis.i18n('i18n-mazlme9u'),
      },
      {
        // 法律
        [valueKey]: 'law',
        [labelKey]: pageThis.i18n('i18n-82tsjj5m'),
      },
      {
        // 其他
        [valueKey]: 'others',
        [labelKey]: pageThis.i18n('i18n-k56nh13q'),
      },
    ];
  };
}.apply(utils);
export const getDataSetApplicationScenario = utils.getDataSetApplicationScenario;

/** 获取数据源文件类型 */
utils.getDataSetFileTypes = function __getDataSetFileTypes() {
  return (pageThis, isTag) => {
    const valueKey = 'value';
    const labelKey = isTag ? 'children' : 'label';
    return [
      {
        // 普通文本
        [valueKey]: 'text',
        [labelKey]: pageThis.i18n('i18n-uwszai5e'),
      },
      {
        // QA 文本
        [valueKey]: 'pic',
        [labelKey]: pageThis.i18n('i18n-l6bbbjcm'),
      },
    ];
  };
}.apply(utils);
export const getDataSetFileTypes = utils.getDataSetFileTypes;

/** - */
utils.getFullName = function __getFullName() {
  return source => {
    if (!source) return '-';
    const { name, displayName } = source;
    if (!displayName) {
      return name;
    }
    return `${displayName} (${name})`;
  };
}.apply(utils);
export const getFullName = utils.getFullName;

utils._ = _;

utils.Modal = Modal;

/** - */
utils.changeLocationQuery = function __changeLocationQuery() {
  return (pageThis, func, _search) => {
    try {
      const locationSearch = {};
      const help = pageThis.appHelper;
      help?.location?.search
        ?.slice(1)
        ?.split('&')
        ?.forEach(item => {
          if (item.split('=')[0] === '_search') {
            locationSearch[item.split('=')[0]] = JSON.parse(decodeURI(item.split('=')[1]) || '{}');
          } else {
            locationSearch[item.split('=')[0]] = item.split('=')[1];
          }
        });
      const newQuery = {
        ...(locationSearch || {}),
        _search: JSON.stringify({
          ...((locationSearch || {})?._search || {}),
          ...(_search || {}),
        }),
      };
      const path =
        help?.match?.pathname +
        '?' +
        Object.keys(newQuery || {})
          ?.filter(key => key && newQuery[key])
          ?.map(key => `${key}=${newQuery[key]}`)
          ?.join('&');
      help.history?.replace(path);
    } catch (e) {}
  };
}.apply(utils);
export const changeLocationQuery = utils.changeLocationQuery;

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

utils.axios = axios;

export default {
  bff,

  message,

  notification,

  getAuthData,

  setAuthData,

  removeAuthData,

  isTokenExpired,

  getAuthorization,

  getAxiosHanlderConfig,

  getDataSourceStatus,

  getDataSourceTypes,

  getDataSetTypes,

  getDataSetApplicationScenario,

  getDataSetFileTypes,

  _,

  Modal,

  getFullName,

  changeLocationQuery,

  axios,
};
