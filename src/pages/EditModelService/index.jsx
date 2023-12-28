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
  FormilyTextArea,
  FormilySelect,
  FormilyCheckbox,
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
      modelSource: '',
      modelTypes: '',
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
      this.setState({
        listModels: res.Model.listModels.nodes,
      });
    } catch {
      // console.log(error, '===> err')
    }
  }

  async getWorkersDetail() {
    const type = this.history?.query?.type === 'local' ? 'worker' : '3rd_party';
    this.form().setValues({
      modelSource: type,
    });
    this.setState({
      modelSource: type,
    });
    try {
      if (type === 'worker') {
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
          model: getWorker.model.name,
          description: getWorker.description,
          type: getWorker.type === 'fastchat-vllm' ? [getWorker.type] : [],
          resources: {
            cpu: isMarksCpu ? marks[Object.values(marks).indexOf(resources.cpu)] : 0,
            memory: isMarksMemory
              ? marks[Object.values(marks).findIndex(v => v === resources.memory?.split('Gi')[0])]
              : 0,
            nvidiaGPU: gpuMarks[resources.nvidiaGPU] || 1,
            customCPU: !isMarksCpu && resources.cpu !== '500m' ? resources.cpu : undefined,
            customMemory:
              !isMarksMemory && resources.memory !== '512Mi'
                ? resources.memory?.split('Gi')[0]
                : undefined,
            customGPU: gpuMarks[resources.nvidiaGPU] ? undefined : resources.nvidiaGPU,
          },
        });
        this.setState({
          modelTypes: getWorker.modelTypes,
        });
        this.getListModels();
      }
      if (type === '3rd_party') {
        const res = await this.props?.appHelper?.utils?.bff?.getModelService({
          namespace: this.appHelper?.utils?.getAuthData()?.project || 'system-tce',
          name: this.history?.query?.name,
        });
        const {
          ModelService: { getModelService },
        } = res;
        this.form().setValues({
          name: getModelService.name,
          displayName: getModelService.displayName,
          description: getModelService.description,
          apiType: getModelService.apiType,
          baseUrl: getModelService.baseUrl,
          types: getModelService.types.split(','),
        });
      }
    } catch {
      // console.log(error, '===> error')
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
      const { marks, gpuMarks, listModels, modelSource } = this.state;
      try {
        let res = {};
        if (modelSource === 'worker') {
          const { resources = {} } = v;
          const params = {
            name: v.name,
            displayName: v.displayName,
            description: v.description,
            namespace: this.appHelper.utils.getAuthData().project || 'system-tce',
            type: v.type && v.type.length > 0 ? 'fastchat-vllm' : 'fastchat',
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
          res = await this.props.appHelper.utils.bff?.updateWorker({
            input: params,
          });
        }
        if (modelSource === '3rd_party') {
          const params = {
            name: v.name,
            displayName: v.displayName,
            description: v.description,
            types: v.types.join(','),
            apiType: v.apiType,
            endpoint: {
              auth: {
                apiKey: v.endpoint,
              },
              baseUrl: v.baseUrl,
            },
            namespace: this.appHelper.utils.getAuthData().project || 'system-tce',
          };
          res = await this.props.appHelper.utils.bff?.updateModelService({
            input: params,
          });
        }
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

  onChangeModel(e) {
    const { listModels } = this.state;
    this.setState({
      modelTypes: listModels.find(v => v.name === e)?.types,
    });
  }

  onClickCheck(event) {
    this.form()?.submit(async v => {
      try {
        const params = {
          name: v.name,
          displayName: v.displayName,
          description: v.description,
          types: v.types.join(','),
          apiType: v.apiType,
          endpoint: {
            auth: {
              apiKey: v.endpoint,
            },
            url: v.baseUrl,
          },
          namespace: this.appHelper.utils.getAuthData().project || 'system-tce',
        };
        const res = await this.props.appHelper.utils.bff?.checkModelService({
          input: params,
        });
        this.utils.notification.success({
          message: '测试成功',
        });
      } catch (error) {
        this.utils.notification.warnings({
          message: '测试失败',
          errors: error?.response?.errors,
        });
        this.setState({
          createLoading: false,
        });
      }
    });
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    this.getWorkersDetail();
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
                title="编辑本地模型服务"
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
                  initialValues: { resources: { cpu: 0, memory: 0, nvidiaGPU: 0 } },
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
                    'x-pattern': 'disabled',
                    'x-validator': [
                      {
                        children: '未知',
                        id: 'disabled',
                        message: this.i18n('i18n-585k83dk') /* 模型服务名称由 0 ~ 50 字符组成 */,
                        pattern: '^.{0,50}$',
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
                        return Reflect.apply(this.onChangeModel, this, [...Array.prototype.slice.call(arguments)]);
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
                    'x-display':
                      "{{ $form.values?.modelSource === 'worker' ? 'visible' : 'hidden' }}",
                    'x-pattern': '',
                    'x-validator': [],
                  }}
                />
                {!!__$$eval(() => this.state.modelSource === 'worker') && (
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
                    <Col __component_name="Col" flex="auto" style={{}}>
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
                )}
                <FormilyCheckbox
                  __component_name="FormilyCheckbox"
                  componentProps={{ 'x-component-props': { _sdkSwrGetFunc: {} } }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    enum: [{ label: 'VLLM 加速', value: 'fastchat-vllm' }],
                    name: 'type',
                    title: 'VLLM 加速',
                    'x-display':
                      "{{ $form.values?.modelSource === 'worker' ? 'visible' : 'hidden' }}",
                    'x-validator': [],
                  }}
                />
                <FormilyFormItem
                  __component_name="FormilyFormItem"
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    name: 'resources',
                    title: this.i18n('i18n-n55cj6ks') /* 服务规格 */,
                    type: 'object',
                    'x-component': 'FormilyFormItem',
                    'x-display':
                      "{{ $form.values?.modelSource === 'worker' ? 'visible' : 'hidden' }}",
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
                <FormilySelect
                  __component_name="FormilySelect"
                  componentProps={{
                    'x-component-props': {
                      _sdkSwrGetFunc: {},
                      allowClear: false,
                      disabled: false,
                      placeholder: '请选择模型服务供应商',
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    enum: [
                      {
                        children: '未知',
                        id: 'disabled',
                        label: 'zhipuai',
                        type: 'disabled',
                        value: 'zhipuai',
                      },
                      {
                        children: '未知',
                        id: 'disabled',
                        label: 'openai',
                        type: 'disabled',
                        value: 'openai',
                      },
                    ],
                    name: 'apiType',
                    required: true,
                    title: '模型服务供应商',
                    'x-display':
                      "{{ $form.values?.modelSource === '3rd_party' ? 'visible' : 'hidden' }}",
                    'x-validator': [],
                  }}
                />
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{ 'x-component-props': { placeholder: '请输入模型服务地址' } }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    name: 'baseUrl',
                    required: true,
                    title: '模型服务地址',
                    'x-display':
                      "{{ $form.values?.modelSource === '3rd_party' ? 'visible' : 'hidden' }}",
                    'x-validator': [],
                  }}
                />
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{ 'x-component-props': { placeholder: '请输入Token' } }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    name: 'endpoint',
                    required: true,
                    title: 'Token',
                    'x-display':
                      "{{ $form.values?.modelSource === '3rd_party' ? 'visible' : 'hidden' }}",
                    'x-validator': [],
                  }}
                />
                {!!__$$eval(() => this.state.modelSource === '3rd_party') && (
                  <Row
                    __component_name="Row"
                    gutter={[0, 0]}
                    style={{ marginBottom: '24px', marginTop: '-8px' }}
                    wrap={false}
                  >
                    <Col __component_name="Col" flex="" span={4} />
                    <Col __component_name="Col" flex="auto">
                      <Button
                        __component_name="Button"
                        block={false}
                        danger={false}
                        disabled={false}
                        ghost={false}
                        onClick={function () {
                          return Reflect.apply(this.onClickCheck, this, [...Array.prototype.slice.call(arguments)]);
                        }.bind(this)}
                        shape="default"
                        size="small"
                        type="link"
                      >
                        测试链接
                      </Button>
                    </Col>
                  </Row>
                )}
                <FormilyCheckbox
                  __component_name="FormilyCheckbox"
                  componentProps={{ 'x-component-props': { _sdkSwrGetFunc: {} } }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    enum: [
                      { label: 'LLM', value: 'llm' },
                      { label: 'Embedding', value: 'embedding' },
                    ],
                    name: 'types',
                    required: true,
                    title: '模型服务类型',
                    'x-display':
                      "{{ $form.values?.modelSource === '3rd_party' ? 'visible' : 'hidden' }}",
                    'x-validator': [],
                  }}
                />
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
                        return Reflect.apply(this.handleCancle, this, [...Array.prototype.slice.call(arguments)]);
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
                        return Reflect.apply(this.handleConfirm, this, [...Array.prototype.slice.call(arguments)]);
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
      render={dataProps => (
        <EditModelService$$Page {...props} {...dataProps} appHelper={appHelper} self={self} />
      )}
      sdkInitFunc={{
        enabled: undefined,
        params: undefined,
      }}
      sdkSwrFuncs={[]}
      self={self}
    />
  );
};
export default PageWrapper;

function __$$eval(expr) {
  try {
    return expr();
  } catch {}
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
