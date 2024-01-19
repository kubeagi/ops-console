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

  onCancel() {
    this.props.onCancel?.();
  }

  async onOk() {
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
      this.utils.notification.success({
        message: `知识库 ${name} 删除成功`,
      });
      this.props.onOk?.(res);
    } catch {
      this.utils.notification.warning({
        message: `知识库 ${name} 删除失败`,
      });
    } finally {
      this.setState({
        confirmLoading: false,
      });
    }
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Component>
        <Modal
          __component_name="Modal"
          centered={false}
          confirmLoading={__$$eval(() => this.state.confirmLoading)}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.onCancel.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          onOk={function () {
            return this.onOk.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={true}
          title="删除知识库"
        >
          <Alert
            __component_name="Alert"
            message={__$$eval(() => `确定删除知识库 "${this.getFullName()}" ？`)}
            showIcon={true}
            type="warning"
          />
        </Modal>
      </Component>
    );
  }
}

const ComponentWrapper = React.forwardRef((props = {}, ref) => {
  const history = getUnifiedHistory();
  const appHelper = {
    utils,
    constants: __$$constants,
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
        params: undefined,
      }}
      sdkSwrFuncs={[]}
      render={dataProps => (
        <KubeAgiKnowledgeEditModal$$Component
          ref={ref}
          {...props}
          {...dataProps}
          self={self}
          appHelper={appHelper}
        />
      )}
    />
  );
});
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
    // 重写 state getter，保证 state 的指向不变，这样才能从 context 中拿到最新的 state
    get state() {
      return oldContext.state;
    },
    // 重写 props getter，保证 props 的指向不变，这样才能从 context 中拿到最新的 props
    get props() {
      return oldContext.props;
    },
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
