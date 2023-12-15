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
  Divider,
  Typography,
  FormilyInput,
  FormilyRadio,
  FormilyTextArea,
  FormilySelect,
  FormilyFormItem,
  FormilySlider,
  FormilyNumberPicker,
} from '@tenx-ui/materials';

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

class CreateModelService$$Page extends React.Component {
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

    this.state = {
      createLoading: true,
      gpuMarks: {
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
      },
      listModels: [],
      marks: {
        0: '0.5',
        1: '1',
        2: '2',
        3: '4',
        4: '8',
        5: '16',
      },
      modelTypes: '-',
    };
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
          },
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
          },
          type: 'axios',
        },
      ],
    };
  }

  componentWillUnmount() {}

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  async getListModels() {
    try {
      const res = await this.props.appHelper.utils.bff?.listModels({
        input: {
          systemModel: true,
          namespace: this.appHelper.utils.getAuthData().project || 'system-tce',
        },
      });
      const _listModels = res.Model.listModels.nodes
        .filter(v => v.status === 'True')
        .map(v => ({
          label: `${v.name}${v.systemModel ? `（${v.namespace}）` : ''}`,
          value: v.name,
        }));
      this.form()?.setFieldState('model', {
        dataSource: _listModels,
      });
      this.setState(
        {
          listModels: res.Model.listModels.nodes,
        },
        () => {
          if (this.history?.query?.name) {
            this.form()?.setValues({
              model: this.history?.query?.name,
            });
            this.onChangeModel(this.history?.query?.name);
          }
        }
      );
    } catch (error) {
      // console.log(error, '===> err')
    }
  }

  handleCancle() {
    this.history?.go(-1);
  }

  handleConfirm() {
    this.form()?.submit(async v => {
      this.setState({
        createLoading: true,
      });
      const { marks, gpuMarks, listModels } = this.state;
      const { resources = {} } = v;
      const params = {
        ...v,
        model: {
          name: v.model,
          namespace: listModels.find(item => item.name === v.model)?.namespace,
          kind: 'Model',
        },
        namespace: this.appHelper.utils.getAuthData().project || 'system-tce',
        resources: {
          cpu: resources.customCPU || marks[resources.cpu],
          memory: `${
            resources.customMemory || resources.customMemory === 0
              ? resources.customMemory
              : marks[resources.memory]
          }Gi`,
          nvidiaGPU:
            resources.customGPU || resources.customGPU === 0
              ? resources.customGPU
              : gpuMarks[resources.nvidiaGPU],
        },
      };
      delete params.modelSource;
      try {
        const res = await this.props.appHelper.utils.bff?.createWorker({
          input: params,
        });
        this.utils.notification.success({
          message: '新增模型服务成功',
        });
        this.handleCancle();
      } catch (error) {
        this.utils.notification.warnings({
          message: '新增模型服务失败',
          errors: error?.response?.errors,
        });
        this.setState({
          createLoading: false,
        });
      }
    });
  }

  onChangeModel(e) {
    const { listModels } = this.state;
    this.setState({
      modelTypes: listModels.find(v => v.name === e)?.types,
    });
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    this.getListModels();
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
                title="新增本地模型服务"
                type="primary"
              />
            </Space>
          </Col>
          <Col __component_name="Col" span={24}>
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
                componentProps={{
                  colon: false,
                  labelAlign: 'left',
                  labelCol: 4,
                  layout: 'horizontal',
                  wrapperCol: 20,
                }}
                createFormProps={{
                  initialValues: {
                    modelSource: 'worker',
                    resources: { cpu: 0, memory: 0, nvidiaGPU: 0 },
                  },
                }}
                formHelper={{ autoFocus: true }}
                ref={this._refsManager.linkRef('formily_create')}
              >
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
                    基本信息
                  </Typography.Text>
                </Divider>
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{
                    'x-component-props': {
                      placeholder: this.i18n('i18n-guknewzm') /* 请输入模型服务名称 */,
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    name: 'name',
                    required: true,
                    title: this.i18n('i18n-cqapbnun') /* 模型服务名称 */,
                    'x-pattern': '',
                    'x-validator': [
                      {
                        children: '未知',
                        id: 'disabled',
                        message: this.i18n('i18n-585k83dk') /* 模型服务名称由 0 ~ 50 字符组成 */,
                        pattern: '',
                        triggerType: 'onInput',
                        type: 'disabled',
                      },
                    ],
                  }}
                />
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{ 'x-component-props': { placeholder: '请输入模型类型' } }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    name: 'displayName',
                    title: '模型服务别名',
                    'x-pattern': 'editable',
                    'x-validator': [],
                  }}
                />
                <FormilyRadio
                  __component_name="FormilyRadio"
                  componentProps={{
                    'x-component-props': {
                      _sdkSwrGetFunc: {},
                      buttonStyle: 'outline',
                      disabled: false,
                      size: 'middle',
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    enum: [
                      { label: '本地模型', value: 'worker' },
                      { label: '外部模型', value: '3rd_party' },
                    ],
                    name: 'modelSource',
                    title: '模型来源',
                    'x-validator': [],
                  }}
                />
                <FormilyTextArea
                  __component_name="FormilyTextArea"
                  componentProps={{
                    'x-component-props': {
                      placeholder: this.i18n('i18n-cd20aykf') /* 请输入描述 */,
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    name: 'description',
                    title: this.i18n('i18n-il4b7wme') /* 描述 */,
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
                    模型服务配置
                  </Typography.Text>
                </Divider>
                <FormilySelect
                  __component_name="FormilySelect"
                  componentProps={{
                    'x-component-props': {
                      _sdkSwrGetFunc: { label: '', params: [], value: '' },
                      allowClear: false,
                      disabled: false,
                      mode: 'single',
                      onChange: function () {
                        return this.onChangeModel.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                      placeholder: '请选择模型',
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    _unsafe_MixedSetter_enum_select: 'ArraySetter',
                    enum: [],
                    name: 'model',
                    required: true,
                    title: '模型',
                    'x-validator': [],
                  }}
                />
                <Row
                  __component_name="Row"
                  gutter={[0, 0]}
                  style={{ marginBottom: '24px' }}
                  wrap={false}
                >
                  <Col __component_name="Col" flex="" span={4} style={{ paddingLeft: '10px' }}>
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      模型类型
                    </Typography.Text>
                  </Col>
                  <Col __component_name="Col" flex="auto">
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '', height: '16px' }}
                    >
                      {__$$eval(() => this.state.modelTypes)}
                    </Typography.Text>
                  </Col>
                </Row>
                <FormilyFormItem
                  __component_name="FormilyFormItem"
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    name: 'resources',
                    title: this.i18n('i18n-n55cj6ks') /* 服务规格 */,
                    'x-component': 'FormilyFormItem',
                    'x-validator': [],
                  }}
                >
                  <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                    <Col __component_name="Col" span={24}>
                      <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                        <Col __component_name="Col" span={24}>
                          <Typography.Title
                            __component_name="Typography.Title"
                            bold={true}
                            bordered={false}
                            ellipsis={true}
                            level={1}
                          >
                            {this.i18n('i18n-u0etzjrs') /* - */}
                          </Typography.Title>
                          <Typography.Title
                            __component_name="Typography.Title"
                            bold={false}
                            bordered={false}
                            ellipsis={true}
                            level={2}
                          >
                            CPU
                          </Typography.Title>
                        </Col>
                        <Col __component_name="Col" span={24}>
                          <Row __component_name="Row" gutter={[10, 0]} wrap={true}>
                            <Col __component_name="Col" span={10}>
                              <FormilySlider
                                __component_name="FormilySlider"
                                componentProps={{
                                  'x-component-props': {
                                    _unsafe_MixedSetter_marks_select: 'ExpressionSetter',
                                    defaultValue: 0,
                                    marks: __$$eval(() => this.state.marks),
                                    max: 5,
                                    min: 0,
                                    step: 1,
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                fieldProps={{
                                  name: 'cpu',
                                  title: '',
                                  'x-component': 'FormilySlider',
                                  'x-validator': [],
                                }}
                                style={{ marginBottom: '0' }}
                              />
                            </Col>
                            <Col
                              __component_name="Col"
                              span={1}
                              style={{ display: 'flex', justifyContent: 'center' }}
                            >
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ alignItems: 'center', display: 'flex', fontSize: '' }}
                              >
                                {this.i18n('i18n-k56nh13q') /* 其他 */}
                              </Typography.Text>
                            </Col>
                            <Col
                              __component_name="Col"
                              span={2}
                              style={{ display: 'block', marginTop: '0px' }}
                            >
                              <FormilyNumberPicker
                                __component_name="FormilyNumberPicker"
                                componentProps={{
                                  'x-component-props': {
                                    max: 64,
                                    min: 1,
                                    placeholder: '请输入',
                                    precision: 0,
                                    step: 1,
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                fieldProps={{ name: 'customCPU', title: '', 'x-validator': [] }}
                                style={{}}
                              />
                            </Col>
                            <Col
                              __component_name="Col"
                              span={1}
                              style={{ alignItems: 'center', display: 'flex' }}
                            >
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                核
                              </Typography.Text>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                        <Col __component_name="Col" span={24}>
                          <Typography.Title
                            __component_name="Typography.Title"
                            bold={true}
                            bordered={false}
                            ellipsis={true}
                            level={1}
                          >
                            {this.i18n('i18n-u0etzjrs') /* - */}
                          </Typography.Title>
                          <Typography.Title
                            __component_name="Typography.Title"
                            bold={false}
                            bordered={false}
                            ellipsis={true}
                            level={2}
                          >
                            内存
                          </Typography.Title>
                        </Col>
                        <Col __component_name="Col" span={24}>
                          <Row __component_name="Row" gutter={[10, 0]} wrap={true}>
                            <Col __component_name="Col" span={10}>
                              <FormilySlider
                                __component_name="FormilySlider"
                                componentProps={{
                                  'x-component-props': {
                                    _unsafe_MixedSetter_marks_select: 'ExpressionSetter',
                                    defaultValue: 0,
                                    marks: __$$eval(() => this.state.marks),
                                    max: 5,
                                    min: 0,
                                    step: 1,
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                fieldProps={{
                                  name: 'memory',
                                  title: '',
                                  'x-component': 'FormilySlider',
                                  'x-validator': [],
                                }}
                                style={{ marginBottom: '0' }}
                              />
                            </Col>
                            <Col
                              __component_name="Col"
                              span={1}
                              style={{ display: 'flex', justifyContent: 'center' }}
                            >
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ alignItems: 'center', display: 'flex', fontSize: '' }}
                              >
                                {this.i18n('i18n-k56nh13q') /* 其他 */}
                              </Typography.Text>
                            </Col>
                            <Col __component_name="Col" span={2}>
                              <FormilyNumberPicker
                                __component_name="FormilyNumberPicker"
                                componentProps={{
                                  'x-component-props': {
                                    max: 256,
                                    min: 0,
                                    placeholder: '请输入',
                                    precision: 2,
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                fieldProps={{ name: 'customMemory', title: '', 'x-validator': [] }}
                              />
                            </Col>
                            <Col
                              __component_name="Col"
                              span={1}
                              style={{ alignItems: 'center', display: 'flex' }}
                            >
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                GiB
                              </Typography.Text>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                        <Col __component_name="Col" span={24}>
                          <Typography.Title
                            __component_name="Typography.Title"
                            bold={true}
                            bordered={false}
                            ellipsis={true}
                            level={1}
                          >
                            {this.i18n('i18n-u0etzjrs') /* - */}
                          </Typography.Title>
                          <Typography.Title
                            __component_name="Typography.Title"
                            bold={false}
                            bordered={false}
                            ellipsis={true}
                            level={2}
                          >
                            GPU
                          </Typography.Title>
                        </Col>
                        <Col __component_name="Col" span={24}>
                          <Row __component_name="Row" gutter={[10, 0]} wrap={true}>
                            <Col __component_name="Col" span={10} style={{ marginBottom: '0px' }}>
                              <FormilySlider
                                __component_name="FormilySlider"
                                componentProps={{
                                  'x-component-props': {
                                    _unsafe_MixedSetter_marks_select: 'ExpressionSetter',
                                    defaultValue: 0,
                                    marks: __$$eval(() => this.state.gpuMarks),
                                    max: 6,
                                    min: 0,
                                    step: 1,
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                fieldProps={{
                                  name: 'nvidiaGPU',
                                  title: '',
                                  'x-component': 'FormilySlider',
                                  'x-validator': [],
                                }}
                              />
                            </Col>
                            <Col
                              __component_name="Col"
                              span={1}
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                paddingBottom: '24px',
                              }}
                            >
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ alignItems: 'center', display: 'flex', fontSize: '' }}
                              >
                                {this.i18n('i18n-k56nh13q') /* 其他 */}
                              </Typography.Text>
                            </Col>
                            <Col
                              __component_name="Col"
                              span={2}
                              style={{ display: 'block', marginTop: '0px', paddingTop: '8px' }}
                            >
                              <FormilyNumberPicker
                                __component_name="FormilyNumberPicker"
                                componentProps={{
                                  'x-component-props': {
                                    max: 10,
                                    min: 0,
                                    placeholder: '请输入',
                                    precision: 0,
                                    step: 1,
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                fieldProps={{ name: 'customGPU', title: '', 'x-validator': [] }}
                              />
                            </Col>
                            <Col
                              __component_name="Col"
                              span={1}
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                                paddingBottom: '24px',
                              }}
                            >
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                颗
                              </Typography.Text>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </FormilyFormItem>
              </FormilyForm>
              <Divider
                __component_name="Divider"
                dashed={false}
                defaultOpen={false}
                mode="line"
                style={{ marginLeft: '-24px', width: 'calc(100% + 48px)' }}
              />
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={4} />
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
  const match = matchPath({ path: '/model-service/createModelService' }, location.pathname);
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
        <CreateModelService$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
