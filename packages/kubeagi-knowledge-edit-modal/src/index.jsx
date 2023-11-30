// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import { Component, Modal, FormilyForm, FormilyInput, FormilyTextArea } from '@tenx-ui/materials';

import { DataProvider } from 'shared-components';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from './utils/__utils';

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

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = { confirmLoading: false };
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {
    console.log('will unmount');
  }

  onOk() {
    // 点击确定回调
    console.log('onOk');
    const form = this.getForm();
    form.submit(async values => {
      console.log('values', values);
      console.log('this.props', this.props);
      this.setState({
        confirmLoading: true,
      });
      const { name, namespace } = this.props;
      const { displayName, description } = values;
      try {
        const res = await this.utils.bff.updateKnowledgeBase({
          input: {
            name,
            namespace,
            displayName,
            description,
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
    });
  }

  getForm() {
    return this.$('knowledgeEditForm')?.formRef?.current?.form;
  }

  onCancel() {
    this.props.onCancel?.();
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
          title="编辑"
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
          <FormilyForm
            ref={this._refsManager.linkRef('knowledgeEditForm')}
            formHelper={{ autoFocus: true }}
            componentProps={{
              colon: false,
              layout: 'horizontal',
              labelCol: 6,
              labelAlign: 'left',
              wrapperCol: 18,
            }}
            createFormProps={{ initialValues: __$$eval(() => this.props.initialValues) }}
            __component_name="FormilyForm"
          >
            <FormilyInput
              fieldProps={{
                name: 'displayName',
                title: '知识库别名',
                required: true,
                'x-validator': [],
              }}
              componentProps={{ 'x-component-props': { placeholder: '请输入知识库别名' } }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyInput"
            />
            <FormilyTextArea
              fieldProps={{
                name: 'description',
                title: '描述',
                'x-component': 'Input.TextArea',
                'x-validator': [],
              }}
              componentProps={{ 'x-component-props': { placeholder: '请输入描述' } }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyTextArea"
            />
          </FormilyForm>
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
