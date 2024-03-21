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
  Spin,
  Card,
  FormilyForm,
  FormilyInput,
  FormilyFormItem,
  FormilySelect,
  FormilyCheckbox,
  FormilyTextArea,
  Divider,
} from '@tenx-ui/materials';

import LccComponentC6ipk from 'SelectCard';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class ModelWarehouseEdit$$Page extends React.Component {
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

    this.state = { branchList: [], data: {}, loading: false };
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

  getData() {
    this.setState({
      loading: true,
    });
    const project = this.utils.getAuthData()?.project;
    const name = this.match.params.name;
    const params = {
      namespace: project,
      name,
    };
    this.utils.bff
      .getModel(params)
      .then(res => {
        const { Model } = res;
        const { getModel } = Model || {};
        this.setState({
          loading: false,
          data: getModel,
        });
        this.setFormData(getModel);
        if (getModel.modelSource && getModel.modelSource !== 'local') {
          this.getModelscopeBranchList(
            getModel.modelSource,
            getModel.modelSource !== 'local' &&
              (getModel.huggingFaceRepo || getModel.modelScopeRepo),
            getModel.token
          );
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          data: {},
        });
      });
  }

  getDataSourceTypes(pageThis, labelKey = 'children') {
    const valueKey = 'value';
    return [
      {
        [valueKey]: 'modelscope',
        [labelKey]: '魔塔社区',
        forms: ['url', 'branch'],
        icon: this.constants.ModelSourceImg_MODELSCOPE,
      },
      {
        [valueKey]: 'huggingface',
        [labelKey]: 'Hugging Face',
        forms: ['url', 'branch', 'token'],
        icon: this.constants.ModelSorceImg_HUGGINGFACE,
      },
      {
        [valueKey]: 'local',
        [labelKey]: '本地模型',
        forms: [],
        icon: this.constants.ModelSorceImg_LOCAL,
      },
    ];
  }

  getModelscopeBranchList(type, modelId, token) {
    if (!modelId) return;
    this.utils.axios
      .get(`/kubeagi-apis/forward/${type}/revisions?modelid=${modelId}`, {
        headers: {
          REPOTOKEN: token,
          namespace: this.utils.getAuthData()?.project,
          Authorization: this.utils.getAuthorization(),
        },
      })
      .then(res => {
        const data = res.data;
        const list = [...(data.branches || []), ...(data.tags || [])];
        this.setState(
          {
            branchList: list.map(item => ({
              label: item.name,
              value: item.name,
            })),
          },
          () => {
            this.form('model_edit')?.setFieldState('branch', {
              dataSource: this.state.branchList,
            });
          }
        );
      })
      .catch(err => {
        console.log(err);
        this.utils.notification.warn({
          message: err?.response?.data.message || '获取分支数据失败',
        });
        this.setState({
          branchList: [],
        });
        this.form('model_edit')?.setFieldState('branch', {
          dataSource: [],
        });
        this.form('model_edit')?.setValues({
          branch: undefined,
        });
      });
  }

  linkToList() {
    this.history.push('/model-warehouse');
  }

  onSubmit() {
    this.form('model_edit')
      ?.validate()
      .then(res => {
        this.setState({
          loading: true,
        });
        const values = this.form('model_edit').values;
        const { branch, url, token, ...otherCommonParams } = values;
        const params = {
          namespace: this.utils.getAuthData().project,
          ...otherCommonParams,
          types: values.types.join(','),
          huggingFaceRepo: values.modelSource === 'huggingface' ? url : undefined,
          modelScopeRepo: values.modelSource === 'modelscope' ? url : undefined,
          revision: branch,
        };
        this.utils.bff
          .updateModel({
            input: params,
          })
          .then(res => {
            if (res?.Model?.updateModel) {
              this.setState({
                loading: false,
              });
              this.utils.notification.success({
                message: '成功',
                description: '正在返回列表页',
              });
              this.linkToList();
            }
          })
          .catch(err => {
            console.log(err);
            this.setState({
              loading: false,
            });
            this.utils.notification.warn({
              message: '编辑失败',
              description: err?.response?.errors[0]?.message || '编辑失败',
            });
          });
      });
  }

  onTokenChange(e) {
    const value = e.target.value;
    if (value) {
      if (this.form('model_edit').values?.name) {
        this.getModelscopeBranchList(
          this.state.data.modelSource,
          this.form('model_edit').values?.name,
          value
        );
      }
    }
  }

  setFormData(data) {
    this.form('model_edit').setValues({
      types: data?.types?.split(','),
      name: data.name,
      displayName: data.displayName,
      description: data.description,
      modelSource: data.modelSource || 'local',
      url:
        data.modelSource &&
        data.modelSource !== 'local' &&
        (data.huggingFaceRepo || data.modelScopeRepo),
      branch: data.revision,
      token: data.token,
    });
  }

  testFunc() {
    console.log('test aliLowcode func');
    return <div className="test-aliLowcode-func">{this.state.test}</div>;
  }

  urlChange(e) {
    const value = e.target.value;
    const modelSource = this.state.data.modelSource;
    if (modelSource !== 'local' && value) {
      this.setState(
        {
          branchList: [],
        },
        () => {
          if (modelSource === 'huggingface') {
            this.getModelscopeBranchList(modelSource, value, this.form('model_edit').values?.token);
          } else {
            this.getModelscopeBranchList(modelSource, value);
          }
        }
      );
      this.form('model_edit')?.setFieldState('branch', {
        dataSource: [],
      });
      this.form('model_edit')?.setValues({
        branch: undefined,
      });
    }
  }

  componentDidMount() {
    console.log('did mount');
    this.getData();
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
              <Button.Back
                __component_name="Button.Back"
                onClick={function () {
                  return this.linkToList.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
                title=""
                type="primary"
              />
            </Space>
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={2}
            >
              编辑模型
            </Typography.Title>
          </Col>
          <Col __component_name="Col" span={24} style={{ marginTop: '16px' }}>
            <Spin __component_name="Spin" spinning={__$$eval(() => this.state.loading)}>
              <Card
                __component_name="Card"
                actions={[]}
                bordered={false}
                hoverable={false}
                loading={false}
                size="default"
                type="default"
              >
                <FormilyForm
                  __component_name="FormilyForm"
                  componentProps={{ colon: false, labelAlign: 'left', layout: 'horizontal' }}
                  formHelper={{ autoFocus: true, style: {} }}
                  ref={this._refsManager.linkRef('model_edit')}
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
                      'x-pattern': 'disabled',
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
                    componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
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
                  <Row
                    __component_name="Row"
                    style={{
                      marginBottom: '0px',
                      marginLeft: '0px',
                      marginRight: '0px',
                      marginTop: '0px',
                      paddingBottom: '0px',
                      paddingLeft: '0px',
                      paddingRight: '0px',
                      paddingTop: '0px',
                    }}
                    wrap={true}
                  >
                    <Col __component_name="Col" span={24}>
                      <Row
                        __component_name="Row"
                        justify="start"
                        style={{ marginBottom: '16px' }}
                        wrap={false}
                      >
                        <Col
                          __component_name="Col"
                          style={{
                            marginLeft: '0px',
                            marginRight: '0px',
                            paddingLeft: '0px',
                            paddingRight: '0px',
                          }}
                        >
                          <FormilyFormItem
                            __component_name="FormilyFormItem"
                            decoratorProps={{
                              'x-decorator-props': {
                                labelEllipsis: true,
                                labelWidth: '100px',
                                style: { marginBottom: '16px' },
                                wrapperWidth: '0',
                              },
                            }}
                            fieldProps={{
                              'name': 'modelSource',
                              'title': '模型来源',
                              'type': 'object',
                              'x-component': 'FormilyFormItem',
                              'x-validator': [],
                            }}
                          />
                        </Col>
                        <Col
                          __component_name="Col"
                          style={{
                            marginLeft: '0px',
                            marginRight: '0px',
                            paddingLeft: '0px',
                            paddingRight: '0px',
                          }}
                        >
                          <LccComponentC6ipk
                            __component_name="LccComponentC6ipk"
                            dataSource={__$$eval(() => this.getDataSourceTypes(this, 'label'))}
                            value={__$$eval(() => this.state.data.modelSource || 'local')}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <FormilyInput
                    __component_name="FormilyInput"
                    componentProps={{
                      'x-component-props': {
                        addonBefore: '',
                        onBlur: function () {
                          return this.urlChange.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this),
                        placeholder: '请输入',
                      },
                    }}
                    decoratorProps={{
                      'x-decorator-props': { labelEllipsis: true, labelWidth: '100px' },
                    }}
                    fieldProps={{
                      'name': 'url',
                      'required': true,
                      'title': '模型文件地址',
                      'x-display': "{{$form.values?.modelSource !== 'local' ?'visible':'hidden'}}",
                      'x-validator': [],
                    }}
                    style={{ width: '500px' }}
                  />
                  <FormilySelect
                    __component_name="FormilySelect"
                    componentProps={{
                      'x-component-props': {
                        _sdkSwrGetFunc: {},
                        allowClear: false,
                        disabled: false,
                        placeholder: '请选择',
                      },
                    }}
                    decoratorProps={{
                      'x-decorator-props': { labelEllipsis: true, labelWidth: '100px' },
                    }}
                    fieldProps={{
                      'name': 'branch',
                      'required': true,
                      'title': '分支',
                      'x-display': "{{$form.values?.modelSource !== 'local' ?'visible':'hidden'}}",
                      'x-validator': [],
                    }}
                    style={{ width: '500px' }}
                  />
                  <FormilyInput
                    __component_name="FormilyInput"
                    componentProps={{
                      'x-component-props': {
                        addonBefore: '',
                        onBlur: function () {
                          return this.onTokenChange.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this),
                        placeholder: '请输入',
                      },
                    }}
                    decoratorProps={{
                      'x-decorator-props': { labelEllipsis: true, labelWidth: '100px' },
                    }}
                    fieldProps={{
                      'name': 'token',
                      'required': false,
                      'title': 'Token',
                      'x-display':
                        "{{$form.values?.modelSource === 'huggingface' ?'visible':'hidden'}}",
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
                        { label: 'Reranking', value: 'reranking' },
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
                <Divider
                  __component_name="Divider"
                  dashed={false}
                  defaultOpen={false}
                  mode="line"
                  style={{ height: '2px' }}
                />
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
                  style={{ marginLeft: '100px', marginRight: '12px' }}
                >
                  取消
                </Button>
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
              </Card>
            </Spin>
          </Col>
        </Row>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/model-warehouse/edit/:name' }, location.pathname);
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
        <ModelWarehouseEdit$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
