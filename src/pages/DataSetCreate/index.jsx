// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Row,
  Col,
  Space,
  Button,
  Card,
  FormilyForm,
  FormilyInput,
  FormilySelect,
  Divider,
  Typography,
  FormilyFormItem,
  FormilyTextArea,
} from '@tenx-ui/materials';

import LccComponentQlsmm from 'KubeAGIUpload';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import { createAxiosHandler as __$$createAxiosRequestHandler } from '@yunti/lowcode-datasource-axios-handler';

import { create as __$$createDataSourceEngine } from '@alilc/lowcode-datasource-engine/runtime';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class DataSetCreate$$Page extends React.Component {
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

  _dataSourceConfig = this._defineDataSourceConfig();
  _dataSourceEngine = __$$createDataSourceEngine(this._dataSourceConfig, this, {
    runtimeConfig: true,
    requestHandlersMap: { axios: __$$createAxiosRequestHandler(utils.getAxiosHanlderConfig?.()) },
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

    this.state = { createLoading: true, name: undefined };
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
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              headers: {
                Authorization:
                  'bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImExNDU0Y2VmNjNmNmM1ZTNhODYxYzY3YmVlZTZkYTgxYjc1ZTExMzQifQ.eyJpc3MiOiJodHRwczovL3BvcnRhbC4xNzIuMjIuOTYuMTM2Lm5pcC5pby9vaWRjIiwic3ViIjoiQ2dWaFpHMXBiaElHYXpoelkzSmsiLCJhdWQiOiJiZmYtY2xpZW50IiwiZXhwIjoxNzAwNzIxOTYzLCJpYXQiOjE3MDA2MzU1NjMsImF0X2hhc2giOiJIbGNhalBBUDVjemNOZlI1UjBIMFl3IiwiY19oYXNoIjoiSXoyOUYtb1FTNGYyQnowX3JtUUVEdyIsImVtYWlsIjoiYWRtaW5AdGVueGNsb3VkLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJncm91cHMiOlsic3lzdGVtOm1hc3RlcnMiLCJpYW0udGVueGNsb3VkLmNvbSIsIm9ic2VydmFiaWxpdHkiLCJyZXNvdXJjZS1yZWFkZXIiLCJvYnNldmFiaWxpdHkiXSwibmFtZSI6ImFkbWluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJwaG9uZSI6IiIsInVzZXJpZCI6ImFkbWluIn0.t3jrC7A5d1dd8TfSTvYxoKFPAOOFM6YjmOzF_fiPgGJgUVgo575HeNKykAMOvDBRH40jnp-B6Gxg5xgtLQ5DqQSfEQNaTwsUOoMfV2Y6fP7wlV9IaSOcf-ePcQE3nT-CeeqjllucVX1hcb4PDWohh8mCJvUV30MNwnZoRNfXCWSw7JzyJ2CbsGSq1PQuXcsgQfzf_Up-28GJOgY06IZ1Y0IYxiOYPTC89mTI3uK6MvKAEKuDb8_kcfFKtTKqgK-XDOxazhfXDJkF9Mf1EdaKl0rwtMIsI2ULvJJ-3xAaH3QOrhCFQr861ioZfwk3Zm_q9akS8PuuBnN97Ew7-3h0Vg',
              },
              isCors: true,
              method: 'GET',
              params: {
                md5: 'test',
              },
              timeout: 5000,
              uri: 'https://portal.172.22.96.136.nip.io/kubeagi-apis/minio/get_chunks',
            };
          }.bind(_this),
          type: 'axios',
        },
      ],
    };
  }

  componentWillUnmount() {}

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  getBucketPath() {
    return `dataset/${this.form()?.values?.name || this.state.name}/v1`;
  }

  handleCancle() {
    this.history.push('/dataset');
  }

  handleConfirm() {
    if (this.state.hasCreate) {
      // this.handleReUpload()
      return;
    }
    this.form()?.submit(async v => {
      this.setState({
        createLoading: true,
      });
      const { name, description, contentType, filed, displayName } = v;
      const params = {
        name,
        displayName,
        contentType,
        filed,
        description,
        namespace: this.utils.getAuthData()?.project,
      };
      try {
        const res = await this.props.appHelper.utils.bff?.createDataset({
          input: params,
        });
        this.handleCreateVersionedDataset({
          datasetParams: params,
          datasetRes: res,
        });
      } catch (error) {
        this.utils.notification.warnings({
          message: this.i18n('i18n-72kqkgmc'),
          errors: error?.response?.errors,
        });
        this.setState({
          createLoading: false,
        });
      }
    });
  }

  async handleCreateVersionedDataset({ datasetParams, datasetRes }) {
    const params = {
      name: datasetParams.name + '-v1',
      namespace: datasetParams.namespace,
      datasetName: datasetParams.name,
      displayName: datasetParams.displayName + '-v1',
      // description: String
      version: 'v1',
      released: 0,
      // inheritedFrom: String
    };

    try {
      const res = await this.props.appHelper.utils.bff?.createVersionedDataset({
        input: params,
      });
      this.utils.notification.success({
        message: this.i18n('i18n-1sgb2qhp'),
      });
      this.history.push(`/dataset/detail/${datasetParams.name}/version/${datasetParams.name}-v1`);
      // this.handleReUpload()
    } catch (error) {
      this.utils.notification.warnings({
        message: this.i18n('i18n-72kqkgmc'),
        errors: error?.response?.errors,
      });
      this.setState({
        createLoading: false,
      });
    }
  }

  handleReUpload() {
    if (!(this.state.uploadThis?.state?.fileList?.length > 0)) {
      this.handleCancle();
      return;
    }
    this.state.uploadThis?.state?.fileList?.forEach(file => {
      this.state.uploadThis?.computeMD5(file);
    });
  }

  setName(e) {
    this.setState({
      name: e.target.value,
      hasCreate: false,
    });
  }

  setUploadState(state) {
    this.setState(state);
  }

  async validatorName(v) {
    if (v) {
      try {
        const res = await this.props?.appHelper?.utils?.bff?.getDataset({
          name: v,
          namespace: this.utils.getAuthData()?.project,
          versionsInput: {
            namespace: this.utils.getAuthData()?.project,
          },
        });
        if (res?.Dataset?.getDataset?.name) {
          return this.i18n('i18n-w9rn8mqn');
        }
      } catch (error) {}
    }
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Space __component_name="Space" align="center" direction="horizontal">
              <Button.Back
                __component_name="Button.Back"
                name={this.i18n('i18n-wourf2xg') /* 返回 */}
                title={this.i18n('i18n-5j8juy3c') /* 新增数据集 */}
                type="primary"
              />
            </Space>
          </Col>
          <Col __component_name="Col" span={24}>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              className="datasetCreateCard"
              hoverable={false}
              loading={false}
              size="default"
              type="default"
            >
              <FormilyForm
                __component_name="FormilyForm"
                componentProps={{
                  colon: false,
                  labelAlign: 'left',
                  labelWidth: '120px',
                  layout: 'horizontal',
                  wrapperWidth: '600px',
                }}
                formHelper={{ autoFocus: true }}
                ref={this._refsManager.linkRef('formily_create')}
              >
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{
                    'x-component-props': {
                      onChange: function () {
                        return this.setName.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                      placeholder: this.i18n('i18n-9qfjn6yy') /* 请输入数据集名称 */,
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    'name': 'name',
                    'required': true,
                    'title': this.i18n('i18n-g9s3q1i6') /* 数据集名称 */,
                    'x-validator': [
                      {
                        children: '未知',
                        id: 'disabled',
                        message: this.i18n('i18n-585k83dk') /* 数据集名称由 0 ~ 50 字符组成 */,
                        pattern: '^.{0,50}$',
                        type: 'disabled',
                      },
                      {
                        children: '未知',
                        id: 'disabled',
                        message:
                          '只能包含小写字母、数字、连字符（-）和点号（.），且必须以字母或数字开头',
                        pattern:
                          '^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$',
                        type: 'disabled',
                      },
                      {
                        children: '未知',
                        id: 'disabled',
                        triggerType: 'onBlur',
                        type: 'disabled',
                        validator: function () {
                          return this.validatorName.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this),
                      },
                    ],
                  }}
                />
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{
                    'x-component-props': {
                      onChange: function () {
                        return this.setName.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                      placeholder: '请输入数据集别名',
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    'name': 'displayName',
                    'required': true,
                    'title': '数据集别名',
                    'x-validator': [
                      {
                        children: '未知',
                        id: 'disabled',
                        message: '数据集别名由 0 ~ 50 字符组成，可以为中文',
                        pattern: '^.{0,50}$',
                        type: 'disabled',
                        whitespace: false,
                      },
                    ],
                  }}
                />
                <FormilySelect
                  __component_name="FormilySelect"
                  componentProps={{
                    'x-component-props': {
                      _sdkSwrGetFunc: {},
                      allowClear: false,
                      disabled: false,
                      placeholder: this.i18n('i18n-xddfp5fl') /* 请选择数据集类型 */,
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    '_unsafe_MixedSetter_default_select': 'VariableSetter',
                    '_unsafe_MixedSetter_enum_select': 'ExpressionSetter',
                    'default': __$$eval(() => this.utils.getDataSetTypes(this)?.[0]?.value),
                    'enum': __$$eval(() => this.utils.getDataSetTypes(this)),
                    'name': 'contentType',
                    'required': true,
                    'title': this.i18n('i18n-caequar5') /* 数据集类型 */,
                    'x-validator': [],
                  }}
                />
                <FormilySelect
                  __component_name="FormilySelect"
                  componentProps={{
                    'x-component-props': {
                      _sdkSwrGetFunc: {},
                      allowClear: false,
                      disabled: false,
                      placeholder: this.i18n('i18n-q7wryol4') /* 请选择应用场景 */,
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    '_unsafe_MixedSetter_default_select': 'VariableSetter',
                    '_unsafe_MixedSetter_enum_select': 'ExpressionSetter',
                    'default': __$$eval(
                      () => this.utils.getDataSetApplicationScenario(this)?.[0]?.value
                    ),
                    'enum': __$$eval(() => this.utils.getDataSetApplicationScenario(this)),
                    'name': 'filed',
                    'required': true,
                    'title': this.i18n('i18n-qw5ig9gm') /* 应用场景 */,
                    'x-validator': [],
                  }}
                />
                <Divider
                  __component_name="Divider"
                  content={[null]}
                  dashed={true}
                  defaultOpen={true}
                  mode="default"
                  orientation="left"
                  orientationMargin={0}
                >
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={true}
                    style={{ fontSize: '14px' }}
                  >
                    {this.i18n('i18n-0hlfubp3') /* 数据集配置 */}
                  </Typography.Text>
                </Divider>
                <FormilyFormItem
                  __component_name="FormilyFormItem"
                  decoratorProps={{
                    'x-decorator-props': { labelEllipsis: true, style: { marginBottom: '16px' } },
                  }}
                  fieldProps={{
                    'name': 'version',
                    'title': this.i18n('i18n-mi1s7ntp') /* 数据集版本 */,
                    'x-component': 'FormilyFormItem',
                    'x-validator': [],
                  }}
                >
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                  >
                    v1
                  </Typography.Text>
                </FormilyFormItem>
                <FormilyTextArea
                  __component_name="FormilyTextArea"
                  componentProps={{
                    'x-component-props': {
                      placeholder: this.i18n('i18n-3m6syxvd') /* 请输入版本描述 */,
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    'name': 'description',
                    'title': this.i18n('i18n-45qn5g3j') /* 版本描述 */,
                    'x-component': 'Input.TextArea',
                    'x-validator': [
                      {
                        children: '未知',
                        id: 'disabled',
                        message: this.i18n('i18n-idhz6qcw') /* 版本描述由 0 ~ 200 字符组成 */,
                        pattern: __$$eval(() => this.constants.DESCRIPTION_LENGTH_REG),
                        type: 'disabled',
                      },
                    ],
                  }}
                />
                {!!false && (
                  <FormilySelect
                    __component_name="FormilySelect"
                    componentProps={{
                      'x-component-props': {
                        _sdkSwrGetFunc: {},
                        allowClear: false,
                        disabled: false,
                        placeholder: this.i18n('i18n-6gwgta6g') /* 请选择文件类型 */,
                      },
                    }}
                    decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                    fieldProps={{
                      '_unsafe_MixedSetter_default_select': 'VariableSetter',
                      '_unsafe_MixedSetter_enum_select': 'ExpressionSetter',
                      'default': __$$eval(() => this.utils.getDataSetFileTypes(this)?.[0]?.value),
                      'enum': __$$eval(() => this.utils.getDataSetFileTypes(this)),
                      'name': 'filetype',
                      'title': this.i18n('i18n-y2kflhdo') /* 文件类型 */,
                      'x-validator': [],
                    }}
                  />
                )}
              </FormilyForm>
              {!!false && (
                <LccComponentQlsmm
                  __component_name="LccComponentQlsmm"
                  accept=".txt,.doc,.docx,.pdf,.md"
                  Authorization={__$$eval(() => this.utils.getAuthorization())}
                  bucket={__$$eval(() => this.utils.getAuthData()?.project)}
                  bucket_path=""
                  getBucketPath={function () {
                    return this.getBucketPath.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  handleReUpload={function () {
                    return this.handleReUpload.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  handleSuccess={function () {
                    return this.handleCancle.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  setState={function () {
                    return this.setUploadState.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                />
              )}
              <Divider
                __component_name="Divider"
                dashed={false}
                defaultOpen={false}
                mode="line"
                style={{ marginLeft: '-24px', width: 'calc(100% + 48px)' }}
              />
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" flex="120px" />
                <Col __component_name="Col" span={20}>
                  <Space __component_name="Space" align="center" direction="horizontal">
                    <Button
                      __component_name="Button"
                      block={false}
                      danger={false}
                      disabled={false}
                      ghost={false}
                      onClick={function () {
                        return this.handleCancle.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                    >
                      {this.i18n('i18n-tg2scz4v') /* 取消 */}
                    </Button>
                    <Button
                      __component_name="Button"
                      block={false}
                      danger={false}
                      disabled={false}
                      ghost={false}
                      onClick={function () {
                        return this.handleConfirm.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                      type="primary"
                    >
                      {this.i18n('i18n-mq4to9og') /* 确定 */}
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/dataset/create' }, location.pathname);
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
        <DataSetCreate$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
