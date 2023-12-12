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

class EditModelService$$Page extends React.Component {
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
      marks: {
        0: '0.5',
        1: '1',
        2: '2',
        3: '4',
        4: '8',
        5: '16',
      },
      gpuMarks: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
      },
      listModels: [],
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
          type: 'axios',
          isInit: function () {
            return false;
          },
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
          },
        },
      ],
    };
  }

  componentWillUnmount() {}

  async getWorkersDetail() {
    try {
      const res = await this.props?.appHelper?.utils?.bff?.getWorker({
        namespace: this.appHelper?.utils?.getAuthData()?.project || 'system-tce',
        name: this.history?.query?.name,
      });
      const {
        Worker: { getWorker },
      } = res;
      const { resources = {} } = getWorker;
      const { marks, gpuMarks } = this.state;
      const isMarksCpu = Object.values(marks).includes(resources.cpu);
      const isMarksMemory = Object.values(marks).includes(resources.memory?.split('Gi')[0]);
      this.form().setValues({
        name: getWorker.name,
        displayName: getWorker.displayName,
        model: getWorker.model,
        description: getWorker.description,
        modelTypes: getWorker.modelTypes,
        resources: {
          cpu: isMarksCpu ? marks[Object.values(marks).findIndex(v => v === resources.cpu)] : 0,
          memory: isMarksMemory
            ? marks[Object.values(marks).findIndex(v => v === resources.memory?.split('Gi')[0])]
            : 0,
          nvidiaGPU: gpuMarks[resources.nvidiaGPU] || 1,
          customCPU: !isMarksCpu ? resources.cpu : undefined,
          customMemory: !isMarksMemory ? resources.memory?.split('Gi')[0] : undefined,
          customGPU: !gpuMarks[resources.nvidiaGPU] ? resources.nvidiaGPU : undefined,
        },
      });
    } catch (error) {
      // console.log(error, '===> error')
    }
  }

  async getListModels() {
    try {
      const res = await this.props.appHelper.utils.bff?.listModels({
        input: {
          namespace: this.appHelper.utils.getAuthData().project || 'system-tce',
        },
      });
      const _listModels = res.Model.listModels.nodes.map(v => ({
        label: v.name,
        value: v.name,
      }));
      this.form()?.setFieldState('model', {
        dataSource: _listModels,
      });
      this.setState({
        listModels: res.Model.listModels.nodes,
      });
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
      const { marks, gpuMarks } = this.state;
      const { resources = {} } = v;
      const params = {
        ...v,
        namespace: this.appHelper.utils.getAuthData().project || 'system-tce',
        resources: {
          cpu: resources.customCPU || marks[resources.cpu],
          memory: `${resources.customMemory || marks[resources.memory]}Gi`,
          nvidiaGPU: resources.customGPU || gpuMarks[resources.nvidiaGPU],
        },
      };
      delete params.modelSource;
      delete params.modelTypes;
      delete params.model;
      try {
        const res = await this.props.appHelper.utils.bff?.updateWorker({
          input: params,
        });
        this.utils.notification.success({
          message: '编辑模型服务成功',
        });
        this.handleCancle();
      } catch (error) {
        this.utils.notification.warnings({
          message: '编辑模型服务失败',
          errors: error?.response?.errors,
        });
        this.setState({
          createLoading: false,
        });
      }
    });
  }

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  onChangeModel(e) {
    const { listModels } = this.state;
    this.form()?.setValues({
      modelTypes: listModels.find(v => v.name === e)?.types,
    });
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    this.getWorkersDetail();
    this.getListModels();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Row wrap={true} __component_name="Row">
          <Col span={24} __component_name="Col">
            <Space align="center" direction="horizontal" __component_name="Space">
              <Button.Back
                name={this.i18n('i18n-wourf2xg') /* 返回 */}
                type="primary"
                title="编辑本地模型服务"
                __component_name="Button.Back"
              />
            </Space>
          </Col>
          <Col span={24} __component_name="Col">
            <Card
              size="default"
              type="default"
              actions={[]}
              loading={false}
              bordered={false}
              hoverable={false}
              __component_name="Card"
            >
              <FormilyForm
                ref={this._refsManager.linkRef('formily_create')}
                formHelper={{ autoFocus: true }}
                componentProps={{
                  colon: false,
                  layout: 'horizontal',
                  labelCol: 4,
                  labelAlign: 'left',
                  wrapperCol: 20,
                }}
                createFormProps={{
                  initialValues: {
                    resources: { cpu: 0, memory: 0, nvidiaGPU: 1 },
                    modelSource: 'worker',
                  },
                }}
                __component_name="FormilyForm"
              >
                <Divider
                  mode="default"
                  dashed={true}
                  content={[null]}
                  defaultOpen={true}
                  orientation="left"
                  __component_name="Divider"
                  orientationMargin={0}
                >
                  <Typography.Text
                    style={{ fontSize: '14px' }}
                    strong={true}
                    disabled={false}
                    ellipsis={true}
                    __component_name="Typography.Text"
                  >
                    基本信息
                  </Typography.Text>
                </Divider>
                <FormilyInput
                  fieldProps={{
                    name: 'name',
                    title: this.i18n('i18n-cqapbnun') /* 模型服务名称 */,
                    required: true,
                    'x-pattern': 'disabled',
                    'x-validator': [
                      {
                        id: 'disabled',
                        type: 'disabled',
                        message: this.i18n('i18n-585k83dk') /* 数据集名称由 0 ~ 50 字符组成 */,
                        pattern: '^.{0,50}$',
                        children: '未知',
                      },
                    ],
                  }}
                  componentProps={{
                    'x-component-props': {
                      placeholder: this.i18n('i18n-guknewzm') /* 请输入模型服务名称 */,
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  __component_name="FormilyInput"
                />
                <FormilyInput
                  fieldProps={{
                    name: 'displayName',
                    title: '模型服务别名',
                    'x-pattern': 'editable',
                    'x-validator': [],
                  }}
                  componentProps={{ 'x-component-props': { placeholder: '请输入模型类型' } }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  __component_name="FormilyInput"
                />
                <FormilyRadio
                  fieldProps={{
                    enum: [
                      { label: '本地模型', value: 'worker' },
                      { label: '外部模型', value: '3rd_party' },
                    ],
                    name: 'modelSource',
                    title: '模型来源',
                    'x-validator': [],
                  }}
                  componentProps={{
                    'x-component-props': {
                      size: 'middle',
                      disabled: false,
                      buttonStyle: 'outline',
                      _sdkSwrGetFunc: {},
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  __component_name="FormilyRadio"
                />
                <FormilyTextArea
                  fieldProps={{
                    name: 'description',
                    title: this.i18n('i18n-il4b7wme') /* 描述 */,
                    'x-component': 'Input.TextArea',
                    'x-validator': [
                      {
                        id: 'disabled',
                        type: 'disabled',
                        message: this.i18n('i18n-idhz6qcw') /* 版本描述由 0 ~ 200 字符组成 */,
                        pattern: __$$eval(() => this.constants.DESCRIPTION_LENGTH_REG),
                        children: '未知',
                      },
                    ],
                  }}
                  componentProps={{
                    'x-component-props': {
                      placeholder: this.i18n('i18n-cd20aykf') /* 请输入描述 */,
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  __component_name="FormilyTextArea"
                />
                <Divider
                  mode="default"
                  dashed={true}
                  content={[null]}
                  defaultOpen={true}
                  orientation="left"
                  __component_name="Divider"
                  orientationMargin={0}
                >
                  <Typography.Text
                    style={{ fontSize: '14px' }}
                    strong={true}
                    disabled={false}
                    ellipsis={true}
                    __component_name="Typography.Text"
                  >
                    模型服务配置
                  </Typography.Text>
                </Divider>
                <FormilySelect
                  fieldProps={{
                    enum: [],
                    name: 'model',
                    title: '模型',
                    required: true,
                    'x-pattern': 'disabled',
                    'x-validator': [],
                    _unsafe_MixedSetter_enum_select: 'ArraySetter',
                  }}
                  componentProps={{
                    'x-component-props': {
                      mode: 'single',
                      disabled: false,
                      onChange: function () {
                        return this.onChangeModel.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                      allowClear: false,
                      placeholder: '请选择模型',
                      _sdkSwrGetFunc: { label: '', value: '', params: [] },
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  __component_name="FormilySelect"
                />
                <FormilyInput
                  fieldProps={{
                    name: 'modelTypes',
                    title: '模型类型',
                    'x-pattern': 'readOnly',
                    'x-validator': [],
                  }}
                  componentProps={{
                    'x-component-props': { allowClear: false, placeholder: '请输入模型类型' },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  __component_name="FormilyInput"
                />
                <FormilyFormItem
                  fieldProps={{
                    name: 'resources',
                    title: this.i18n('i18n-n55cj6ks') /* 服务规格 */,
                    'x-component': 'FormilyFormItem',
                    'x-validator': [],
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  __component_name="FormilyFormItem"
                >
                  <Row wrap={true} gutter={[0, 0]} __component_name="Row">
                    <Col span={24} __component_name="Col">
                      <Row wrap={true} gutter={[0, 0]} __component_name="Row">
                        <Col span={24} __component_name="Col">
                          <Typography.Title
                            bold={true}
                            level={1}
                            bordered={false}
                            ellipsis={true}
                            __component_name="Typography.Title"
                          >
                            {this.i18n('i18n-u0etzjrs') /* - */}
                          </Typography.Title>
                          <Typography.Title
                            bold={false}
                            level={2}
                            bordered={false}
                            ellipsis={true}
                            __component_name="Typography.Title"
                          >
                            CPU
                          </Typography.Title>
                        </Col>
                        <Col span={24} __component_name="Col">
                          <Row wrap={true} gutter={[10, 0]} __component_name="Row">
                            <Col span={10} __component_name="Col">
                              <FormilySlider
                                style={{ marginBottom: '0' }}
                                fieldProps={{
                                  name: 'cpu',
                                  title: '',
                                  'x-component': 'FormilySlider',
                                  'x-validator': [],
                                }}
                                componentProps={{
                                  'x-component-props': {
                                    max: 5,
                                    min: 0,
                                    step: 1,
                                    marks: __$$eval(() => this.state.marks),
                                    defaultValue: 0,
                                    _unsafe_MixedSetter_marks_select: 'ExpressionSetter',
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                __component_name="FormilySlider"
                              />
                            </Col>
                            <Col
                              span={1}
                              style={{ display: 'flex', justifyContent: 'center' }}
                              __component_name="Col"
                            >
                              <Typography.Text
                                style={{ display: 'flex', fontSize: '', alignItems: 'center' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {this.i18n('i18n-k56nh13q') /* 其他 */}
                              </Typography.Text>
                            </Col>
                            <Col
                              span={2}
                              style={{ display: 'block', marginTop: '0px' }}
                              __component_name="Col"
                            >
                              <FormilyNumberPicker
                                style={{}}
                                fieldProps={{ name: 'customCPU', title: '', 'x-validator': [] }}
                                componentProps={{
                                  'x-component-props': {
                                    max: 64,
                                    min: 1,
                                    step: 1,
                                    precision: 0,
                                    placeholder: '请输入',
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                __component_name="FormilyNumberPicker"
                              />
                            </Col>
                            <Col
                              span={1}
                              style={{ display: 'flex', alignItems: 'center' }}
                              __component_name="Col"
                            >
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                核
                              </Typography.Text>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row wrap={true} gutter={[0, 0]} __component_name="Row">
                        <Col span={24} __component_name="Col">
                          <Typography.Title
                            bold={true}
                            level={1}
                            bordered={false}
                            ellipsis={true}
                            __component_name="Typography.Title"
                          >
                            {this.i18n('i18n-u0etzjrs') /* - */}
                          </Typography.Title>
                          <Typography.Title
                            bold={false}
                            level={2}
                            bordered={false}
                            ellipsis={true}
                            __component_name="Typography.Title"
                          >
                            内存
                          </Typography.Title>
                        </Col>
                        <Col span={24} __component_name="Col">
                          <Row wrap={true} gutter={[10, 0]} __component_name="Row">
                            <Col span={10} __component_name="Col">
                              <FormilySlider
                                style={{ marginBottom: '0' }}
                                fieldProps={{
                                  name: 'memory',
                                  title: '',
                                  'x-component': 'FormilySlider',
                                  'x-validator': [],
                                }}
                                componentProps={{
                                  'x-component-props': {
                                    max: 5,
                                    min: 0,
                                    step: 1,
                                    marks: __$$eval(() => this.state.marks),
                                    defaultValue: 0,
                                    _unsafe_MixedSetter_marks_select: 'ExpressionSetter',
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                __component_name="FormilySlider"
                              />
                            </Col>
                            <Col
                              span={1}
                              style={{ display: 'flex', justifyContent: 'center' }}
                              __component_name="Col"
                            >
                              <Typography.Text
                                style={{ display: 'flex', fontSize: '', alignItems: 'center' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {this.i18n('i18n-k56nh13q') /* 其他 */}
                              </Typography.Text>
                            </Col>
                            <Col span={2} __component_name="Col">
                              <FormilyNumberPicker
                                fieldProps={{ name: 'customMemory', title: '', 'x-validator': [] }}
                                componentProps={{
                                  'x-component-props': {
                                    max: 256,
                                    min: 0,
                                    precision: 2,
                                    placeholder: '请输入',
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                __component_name="FormilyNumberPicker"
                              />
                            </Col>
                            <Col
                              span={1}
                              style={{ display: 'flex', alignItems: 'center' }}
                              __component_name="Col"
                            >
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                GiB
                              </Typography.Text>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row wrap={true} gutter={[0, 0]} __component_name="Row">
                        <Col span={24} __component_name="Col">
                          <Typography.Title
                            bold={true}
                            level={1}
                            bordered={false}
                            ellipsis={true}
                            __component_name="Typography.Title"
                          >
                            {this.i18n('i18n-u0etzjrs') /* - */}
                          </Typography.Title>
                          <Typography.Title
                            bold={false}
                            level={2}
                            bordered={false}
                            ellipsis={true}
                            __component_name="Typography.Title"
                          >
                            GPU
                          </Typography.Title>
                        </Col>
                        <Col span={24} __component_name="Col">
                          <Row wrap={true} gutter={[10, 0]} __component_name="Row">
                            <Col span={10} style={{ marginBottom: '0px' }} __component_name="Col">
                              <FormilySlider
                                fieldProps={{
                                  name: 'nvidiaGPU',
                                  title: '',
                                  'x-component': 'FormilySlider',
                                  'x-validator': [],
                                }}
                                componentProps={{
                                  'x-component-props': {
                                    max: 6,
                                    min: 1,
                                    step: 1,
                                    marks: __$$eval(() => this.state.gpuMarks),
                                    defaultValue: 1,
                                    _unsafe_MixedSetter_marks_select: 'ExpressionSetter',
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                __component_name="FormilySlider"
                              />
                            </Col>
                            <Col
                              span={1}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingBottom: '24px',
                                justifyContent: 'center',
                              }}
                              __component_name="Col"
                            >
                              <Typography.Text
                                style={{ display: 'flex', fontSize: '', alignItems: 'center' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {this.i18n('i18n-k56nh13q') /* 其他 */}
                              </Typography.Text>
                            </Col>
                            <Col
                              span={2}
                              style={{ display: 'block', marginTop: '0px', paddingTop: '8px' }}
                              __component_name="Col"
                            >
                              <FormilyNumberPicker
                                fieldProps={{ name: 'customGPU', title: '', 'x-validator': [] }}
                                componentProps={{
                                  'x-component-props': {
                                    max: 10,
                                    min: 1,
                                    step: 1,
                                    precision: 0,
                                    placeholder: '请输入',
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                __component_name="FormilyNumberPicker"
                              />
                            </Col>
                            <Col
                              span={1}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingBottom: '24px',
                              }}
                              __component_name="Col"
                            >
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
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
                mode="line"
                style={{ width: 'calc(100% + 48px)', marginLeft: '-24px' }}
                dashed={false}
                defaultOpen={false}
                __component_name="Divider"
              />
              <Row wrap={true} __component_name="Row">
                <Col span={4} __component_name="Col" />
                <Col span={20} __component_name="Col">
                  <Space align="center" direction="horizontal" __component_name="Space">
                    <Button
                      block={false}
                      ghost={false}
                      shape="default"
                      danger={false}
                      onClick={function () {
                        return this.handleCancle.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      disabled={false}
                      __component_name="Button"
                    >
                      {this.i18n('i18n-tg2scz4v') /* 取消 */}
                    </Button>
                    <Button
                      type="primary"
                      block={false}
                      ghost={false}
                      shape="default"
                      danger={false}
                      onClick={function () {
                        return this.handleConfirm.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      disabled={false}
                      __component_name="Button"
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
  const match = matchPath({ path: '/model-service/editModelService' }, location.pathname);
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
        <EditModelService$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
