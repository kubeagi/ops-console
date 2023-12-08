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

class Confirm$$Component extends React.Component {
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

    this.state = { loading: false, visible: false };
  }

  $ = () => null;

  $$ = () => [];

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data?.id && this.props.data?.id !== prevProps.data?.id) {
      this.setState({
        visible: true,
        loading: false,
      });
    }
  }

  componentWillUnmount() {}

  async onOk() {
    this.setState({
      loading: true,
    });
    const res = await this.props.data
      ?.onOk?.()
      ?.then(msg => {
        this.onCancel();
      })
      ?.catch(e => {
        this.setState({
          loading: false,
        });
        console.warn('confirm: onOk error:', e);
        throw e;
      });
  }

  onCancel() {
    this.setState({
      visible: false,
      loading: false,
    });
  }

  componentDidMount() {
    if (this.props.data?.id) {
      this.setState({
        visible: true,
        loading: false,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data?.id && this.props.data?.id !== prevProps.data?.id) {
      this.setState({
        visible: true,
        loading: false,
      });
    }
  }

  componentWillUnmount() {}

  componentDidMount() {
    if (this.props.data?.id) {
      this.setState({
        visible: true,
        loading: false,
      });
    }
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Component>
        {!!__$$eval(() => this.state.visible) && (
          <Modal
            mask={true}
            onOk={function () {
              return this.onOk.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            open={true}
            title={__$$eval(() => this.props.data?.title || '确认')}
            centered={false}
            keyboard={true}
            onCancel={function () {
              return this.onCancel.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            forceRender={false}
            maskClosable={false}
            confirmLoading={__$$eval(() => this.state.loading)}
            destroyOnClose={true}
            __component_name="Modal"
          >
            <Alert
              type={__$$eval(() => this.props.data?.type || 'warning')}
              message={__$$eval(() => this.props.data?.content || '请确认')}
              showIcon={true}
              __component_name="Alert"
            />
          </Modal>
        )}
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
        <Confirm$$Component ref={ref} {...props} {...dataProps} self={self} appHelper={appHelper} />
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
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
