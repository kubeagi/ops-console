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

  getForm() {
    return this.$('knowledgeEditForm')?.formRef?.current?.form;
  }

  onCancel() {
    this.props.onCancel?.();
  }

  onOk() {
    // 点击确定回调
    const form = this.getForm();
    form.submit(async values => {
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
        this.utils.notification.success({
          message: `知识库 ${name} 编辑成功`,
        });
        this.props.onOk?.(res);
      } catch {
        this.utils.notification.warning({
          message: `知识库 ${name} 编辑失败`,
        });
      } finally {
        this.setState({
          confirmLoading: false,
        });
      }
    });
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
          title="编辑"
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 6,
              layout: 'horizontal',
              wrapperCol: 18,
            }}
            createFormProps={{ initialValues: __$$eval(() => this.props.initialValues) }}
            formHelper={{ autoFocus: true }}
            ref={this._refsManager.linkRef('knowledgeEditForm')}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{ 'x-component-props': { placeholder: '请输入知识库别名' } }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'displayName',
                'required': true,
                'title': '知识库别名',
                'x-validator': [],
              }}
            />
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{ 'x-component-props': { placeholder: '请输入描述' } }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'description',
                'title': '描述',
                'x-component': 'Input.TextArea',
                'x-validator': [],
              }}
            />
          </FormilyForm>
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
