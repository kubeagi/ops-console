// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import { Component, Modal, Alert } from '@tenx-ui/materials';

import { DataProvider } from 'shared-components';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from './utils/__utils';

import * as __$$i18n from './i18n';

import __$$constants from './__constants';

import './index.css';

class KubeAgiKnowledgeEditModal$$Component extends React.Component {
  get history() {
    return this.props.self?.history;
  }
  get appHelper() {
    return this.props.self?.appHelper;
  }

  _context = this;

  get constants() {
    return __$$constants || {};
  }

  constructor(props, context) {
    super(props);

    this.utils = utils;

    __$$i18n._inject2(this);

    this.state = { confirmLoading: false };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    console.log('will unmount');
  }

  async onOk() {
    // 点击确定回调
    console.log('onOk');
    console.log('this.props', this.props);
    this.setState({
      confirmLoading: true,
    });
    const { name, namespace } = this.props;
    try {
      const res = await this.utils.bff.deleteKnowledgeBase({
        input: {
          name,
          namespace,
        },
      });
      this.props.onOk?.(res);
    } catch {
      //
    } finally {
      this.setState({
        confirmLoading: false,
      });
    }
  }

  onCancel() {
    this.props.onCancel?.();
  }

  getFullName() {
    const { name, displayName } = this.props;
    if (!name) {
      return '-';
    }
    if (!displayName) {
      return name;
    }
    return `${displayName} (${name})`;
  }

  componentDidMount() {
    console.log('did mount');
  }

  componentWillUnmount() {
    console.log('will unmount');
  }

  componentDidMount() {
    console.log('did mount');
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Component>
        <Modal
          mask={true}
          onOk={function () {
            return this.onOk.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={true}
          title="删除知识库"
          centered={false}
          keyboard={true}
          onCancel={function () {
            return this.onCancel.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          forceRender={false}
          maskClosable={false}
          confirmLoading={__$$eval(() => this.state.confirmLoading)}
          destroyOnClose={true}
          __component_name="Modal"
        >
          <Alert
            type="warning"
            message={__$$eval(() => `确定删除知识库 "${this.getFullName()}" ？`)}
            showIcon={true}
            __component_name="Alert"
          />
        </Modal>
      </Component>
    );
  }
}

const ComponentWrapper = (props = {}) => {
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
        <KubeAgiKnowledgeEditModal$$Component
          {...props}
          {...dataProps}
          self={self}
          appHelper={appHelper}
        />
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
