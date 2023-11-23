// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import { Component, FormilyForm, FormilyUpload, Flex, Typography } from '@tenx-ui/materials';

import { AntdIconPlusOutlined } from '@tenx-ui/icon-materials';

import { DataProvider } from 'shared-components';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import { createFetchHandler as __$$createFetchRequestHandler } from '@alilc/lowcode-datasource-fetch-handler';

import { create as __$$createDataSourceEngine } from '@alilc/lowcode-datasource-engine/runtime';

import utils, { RefsManager } from './utils/__utils';

import * as __$$i18n from './i18n';

import __$$constants from './__constants';

import './index.css';

class KubeAgiUpload$$Component extends React.Component {
  get history() {
    return this.props.self?.history;
  }
  get appHelper() {
    return this.props.self?.appHelper;
  }

  _context = this;

  _dataSourceConfig = this._defineDataSourceConfig();
  _dataSourceEngine = __$$createDataSourceEngine(this._dataSourceConfig, this, {
    runtimeConfig: true,
    requestHandlersMap: { fetch: __$$createFetchRequestHandler() },
  });

  get dataSourceMap() {
    return this._dataSourceEngine.dataSourceMap || {};
  }

  reloadDataSource = async () => {
    await this._dataSourceEngine.reloadDataSource();
  };

  get constants() {
    return __$$constants || {};
  }

  constructor(props, context) {
    super(props);

    this.utils = utils;

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = { status: '初始状态', urlPrex: 'http://127.0.0.1:8081/minio', progress: 0 };
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  _defineDataSourceConfig() {
    const _this = this;
    return {
      list: [
        {
          id: 'get_chunks',
          type: 'fetch',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              uri: 'https://portal.172.22.96.136.nip.io/kubeagi-apis/minio/get_chunks',
              isCors: true,
              method: 'GET',
              params: {
                md5: 'test',
              },
              headers: {
                Authorization:
                  'bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImExNDU0Y2VmNjNmNmM1ZTNhODYxYzY3YmVlZTZkYTgxYjc1ZTExMzQifQ.eyJpc3MiOiJodHRwczovL3BvcnRhbC4xNzIuMjIuOTYuMTM2Lm5pcC5pby9vaWRjIiwic3ViIjoiQ2dWaFpHMXBiaElHYXpoelkzSmsiLCJhdWQiOiJiZmYtY2xpZW50IiwiZXhwIjoxNzAwNzIxOTYzLCJpYXQiOjE3MDA2MzU1NjMsImF0X2hhc2giOiJIbGNhalBBUDVjemNOZlI1UjBIMFl3IiwiY19oYXNoIjoiSXoyOUYtb1FTNGYyQnowX3JtUUVEdyIsImVtYWlsIjoiYWRtaW5AdGVueGNsb3VkLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJncm91cHMiOlsic3lzdGVtOm1hc3RlcnMiLCJpYW0udGVueGNsb3VkLmNvbSIsIm9ic2VydmFiaWxpdHkiLCJyZXNvdXJjZS1yZWFkZXIiLCJvYnNldmFiaWxpdHkiXSwibmFtZSI6ImFkbWluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJwaG9uZSI6IiIsInVzZXJpZCI6ImFkbWluIn0.t3jrC7A5d1dd8TfSTvYxoKFPAOOFM6YjmOzF_fiPgGJgUVgo575HeNKykAMOvDBRH40jnp-B6Gxg5xgtLQ5DqQSfEQNaTwsUOoMfV2Y6fP7wlV9IaSOcf-ePcQE3nT-CeeqjllucVX1hcb4PDWohh8mCJvUV30MNwnZoRNfXCWSw7JzyJ2CbsGSq1PQuXcsgQfzf_Up-28GJOgY06IZ1Y0IYxiOYPTC89mTI3uK6MvKAEKuDb8_kcfFKtTKqgK-XDOxazhfXDJkF9Mf1EdaKl0rwtMIsI2ULvJJ-3xAaH3QOrhCFQr861ioZfwk3Zm_q9akS8PuuBnN97Ew7-3h0Vg',
              },
              timeout: 5000,
            };
          }.bind(_this),
        },
      ],
    };
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Component>
        <FormilyForm
          ref={this._refsManager.linkRef('formily_KubeAGIUpload')}
          formHelper={{ autoFocus: true, className: 'formily_KubeAGIUpload' }}
          componentProps={{
            colon: false,
            layout: 'horizontal',
            labelCol: 4,
            labelAlign: 'left',
            wrapperCol: 20,
          }}
          __component_name="FormilyForm"
        >
          <FormilyUpload
            fieldProps={{
              name: 'Upload',
              title: __$$eval(() => this.props.label || this.i18n('i18n-b6z34has')),
              'x-component': 'FormilyUpload',
              'x-validator': [],
              _unsafe_MixedSetter_title_select: 'VariableSetter',
            }}
            decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
            __component_name="FormilyUpload"
          >
            <Flex
              align="center"
              style={{ border: '1px dashed #4461EB', height: '100px', borderRadius: '4px' }}
              justify="center"
              vertical={true}
              __component_name="Flex"
            >
              <AntdIconPlusOutlined
                style={{ color: '#4461EB', fontSize: '16' }}
                __component_name="AntdIconPlusOutlined"
              />
              <Typography.Text
                type="colorTextSecondary"
                style={{ paddingTop: '16px', paddingBottom: '16px' }}
                strong={false}
                disabled={false}
                ellipsis={true}
                __component_name="Typography.Text"
              >
                {this.i18n('i18n-acu9gpik') /* 点击 / 拖拽文件到此区域上传 */}
              </Typography.Text>
              <Flex __component_name="Flex">
                <Typography.Text
                  style={{ fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-ui0fj2sq') /* 仅支持 */}
                </Typography.Text>
                <Typography.Text
                  style={{ fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {__$$eval(() => this.props.accept || '-')}
                </Typography.Text>
                <Typography.Text
                  style={{ fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-u0ndjcyg') /* 文件； */}
                </Typography.Text>
                <Typography.Text
                  type="colorTextSecondary"
                  style={{ paddingLeft: '6px' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-1v40vm3l') /* 单文件大小 */}
                </Typography.Text>
                <Typography.Text
                  type="warning"
                  style={{ fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-o9uxngg9') /* 不超过2G， */}
                </Typography.Text>
                <Typography.Text
                  type="colorTextSecondary"
                  style={{ fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-w3k0sm1r') /* 单次上传文件数量 */}
                </Typography.Text>
                <Typography.Text
                  type="warning"
                  style={{ paddingLeft: '6px' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-07ryldck') /* 不超过20个 */}
                </Typography.Text>
              </Flex>
            </Flex>
          </FormilyUpload>
        </FormilyForm>
      </Component>
    );
  }
}

const ComponentWrapper = () => {
  const history = getUnifiedHistory();
  const appHelper = {
    utils,
    history,
  };
  const self = {
    appHelper,
    ...appHelper,
  };
  return (
    <DataProvider
      self={self}
      sdkInitFunc={{
        enabled: undefined,
        func: 'undefined',
        params: undefined,
      }}
      sdkSwrFuncs={[]}
      render={dataProps => (
        <KubeAgiUpload$$Component {...dataProps} self={self} appHelper={appHelper} />
      )}
    />
  );
};
export default ComponentWrapper;

function __$$eval(expr) {
  try {
    return expr();
  } catch (error) {}
}

function __$$evalArray(expr) {
  const res = __$$eval(expr);
  return Array.isArray(res) ? res : [];
}

function __$$createChildContext(oldContext, ext) {
  const childContext = {
    ...oldContext,
    ...ext,
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
