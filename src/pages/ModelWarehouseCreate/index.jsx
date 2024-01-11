// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Row,
  Col,
  Space,
  Button,
  Typography,
  FormilyForm,
  FormilyInput,
  FormilyCheckbox,
  FormilyTextArea,
  Divider,
} from '@tenx-ui/materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class CreateModelWarehouse$$Page extends React.Component {
  get location() {
    return this.props.self?.location;
  }
  get match() {
    return this.props.self?.match;
  }
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

    this.state = { createLoading: true, loading: false, name: undefined };
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

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  linkToDetail(name) {
    this.history.push('/model-warehouse/detail/' + name);
  }

  linkToList() {
    this.history.push('/model-warehouse');
  }

  onSubmit() {
    this.form('model_form')
      ?.validate()
      .then(res => {
        this.setState({
          loading: true,
        });
        const values = this.form('model_form').values;
        const name = values.name;
        const params = {
          namespace: this.utils.getAuthData().project,
          // creator:this.utils.getAuthData()?.user?.name,
          ...values,
          types: values.types.join(','),
        };
        this.utils.bff
          .createModel({
            input: params,
          })
          .then(res => {
            if (res?.Model?.createModel) {
              this.setState({
                loading: false,
                name: name,
              });
              this.utils.notification.success({
                message: '新增模型成功',
              });
              this.linkToDetail(res?.Model?.createModel.name);
            }
          })
          .catch(err => {
            this.utils.notification.warn({
              message: '创建失败',
              description: err?.response?.errors[0]?.message || '创建失败',
            });
            this.setState({
              loading: false,
            });
          });
      });
  }

  setName(e) {
    this.setState({
      name: e.target.value,
      hasCreate: false,
    });
  }

  componentDidMount() {
    console.log('did mount');
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Row
          __component_name="Row"
          gutter={['', 0]}
          style={{
            paddingBottom: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '0px',
          }}
          wrap={true}
        >
          <Col __component_name="Col" span={24}>
            <Space __component_name="Space" align="center" direction="horizontal">
              <Button.Back __component_name="Button.Back" title="" type="primary" />
            </Space>
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={2}
            >
              新增模型
            </Typography.Title>
          </Col>
          <Col
            __component_name="Col"
            span={24}
            style={{
              backgroundColor: '#ffffff',
              marginTop: '24px',
              paddingBottom: '24px',
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingTop: '24px',
            }}
          >
            <FormilyForm
              __component_name="FormilyForm"
              componentProps={{
                colon: false,
                labelAlign: 'left',
                labelWidth: '',
                layout: 'horizontal',
              }}
              formHelper={{ autoFocus: true, style: {} }}
              ref={this._refsManager.linkRef('model_form')}
            >
              <FormilyInput
                __component_name="FormilyInput"
                componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
                decoratorProps={{
                  'x-decorator-props': { labelEllipsis: true, labelWidth: '100px' },
                }}
                fieldProps={{
                  '_unsafe_MixedSetter_x-validator_select': 'ArraySetter',
                  'name': 'name',
                  'required': true,
                  'title': '模型名称',
                  'x-validator': [
                    {
                      children: '未知',
                      id: 'disabled',
                      message: "必须由小写字母数字和'-'或'.'组成，并且必须以字母数字开头和结尾",
                      pattern: '^[a-z0-9][a-z0-9.-]*[a-z0-9]$',
                      type: 'disabled',
                    },
                  ],
                }}
                style={{ width: '500px' }}
              />
              <FormilyInput
                __component_name="FormilyInput"
                componentProps={{ 'x-component-props': { addonBefore: '', placeholder: '请输入' } }}
                decoratorProps={{
                  'x-decorator-props': { labelEllipsis: true, labelWidth: '100px' },
                }}
                fieldProps={{
                  'name': 'displayName',
                  'required': true,
                  'title': '模型别名',
                  'x-validator': [],
                }}
                style={{ width: '500px' }}
              />
              <FormilyCheckbox
                __component_name="FormilyCheckbox"
                componentProps={{ 'x-component-props': { _sdkSwrGetFunc: {} } }}
                decoratorProps={{
                  'x-decorator-props': {
                    labelAlign: 'left',
                    labelEllipsis: true,
                    labelWidth: '100px',
                    wrapperAlign: 'left',
                  },
                }}
                fieldProps={{
                  'enum': [
                    { label: 'LLM', value: 'llm' },
                    { label: 'Embedding', value: 'embedding' },
                  ],
                  'name': 'types',
                  'required': true,
                  'title': '模型类型',
                  'x-validator': [],
                }}
              />
              <FormilyTextArea
                __component_name="FormilyTextArea"
                componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
                decoratorProps={{
                  'x-decorator-props': { labelEllipsis: true, labelWidth: '100px' },
                }}
                fieldProps={{
                  'name': 'description',
                  'title': '描述',
                  'x-component': 'Input.TextArea',
                  'x-validator': [],
                }}
                style={{ width: '500px' }}
              />
            </FormilyForm>
          </Col>
          <Col __component_name="Col" span={24} style={{ backgroundColor: '#ffffff' }}>
            <Row __component_name="Row" wrap={true}>
              <Col __component_name="Col" span={24}>
                <Divider
                  __component_name="Divider"
                  dashed={false}
                  defaultOpen={false}
                  mode="line"
                  style={{ height: '2px' }}
                />
              </Col>
            </Row>
            <Row __component_name="Row" wrap={true}>
              <Col
                __component_name="Col"
                span={24}
                style={{ paddingBottom: '24px', paddingLeft: '132px' }}
              >
                <Space __component_name="Space" align="center" direction="horizontal">
                  <Button
                    __component_name="Button"
                    block={false}
                    danger={false}
                    disabled={false}
                    ghost={false}
                    onClick={function () {
                      return this.linkToList.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    shape="default"
                    style={{ marginRight: '12px' }}
                  >
                    取消
                  </Button>
                </Space>
                <Button
                  __component_name="Button"
                  block={false}
                  danger={false}
                  disabled={false}
                  ghost={false}
                  loading={__$$eval(() => this.state.loading)}
                  onClick={function () {
                    return this.onSubmit.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  shape="default"
                  type="primary"
                >
                  确定
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/model-warehouse/create' }, location.pathname);
  history.match = match;
  history.query = qs.parse(location.search);
  const appHelper = {
    utils,
    constants: __$$constants,
    location,
    match,
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
        <CreateModelWarehouse$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
      )}
    />
  );
};
export default PageWrapper;

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
