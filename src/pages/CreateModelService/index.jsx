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
  FormilyCheckbox,
  FormilyNumberPicker,
} from '@tenx-ui/materials';

import { SliderInput } from '@yuntijs/ui-lowcode-materials';

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
      configType: [],
      createLoading: true,
      listModels: [],
      listNodes: [],
      modelSource: 'worker',
      modelTypes: '-',
      nodesNoAuth: false,
      resourcesData: {
        cpu: 4,
        memory: 16,
        nvidiaGPU: 1,
        nodes: [],
      },
      workerTypes: '-',
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
          namespace: this.appHelper.utils.getAuthData().project || 'abc',
        },
      });
      const _listModels = res.Model.listModels.nodes
        .filter(v => v.status === 'True')
        .map(v => ({
          // label: `${v.name}${v.systemModel ? `（${v.namespace}）` : ''}`,
          label: `${v.name}${v.systemModel ? '（内置）' : ''}`,
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
              queryName: true,
            });
            this.onChangeModel(this.history?.query?.name);
          } else {
            this.form()?.setValues({
              queryName: false,
            });
          }
        }
      );
    } catch (error) {
      // console.log(error, '===> err')
    }
  }

  async getListNodes() {
    try {
      const res = await this.props.appHelper.utils.bff?.listNodes({
        input: {},
      });
      const nodes = res?.Node?.listNodes?.nodes || [];
      const _listNodes = nodes.map(v => ({
        label: v.name,
        value: v.name,
      }));
      _listNodes.unshift({
        label: '随机',
        value: '随机',
      });
      this.form()?.setFieldState('nodes', {
        dataSource: _listNodes,
      });
      this.setState(
        {
          listNodes: nodes,
        },
        () => {
          this.onChangeNode(['随机']);
        }
      );
    } catch (error) {
      // console.log(error, '===> err')
      this.setState({
        nodesNoAuth: true,
      });
    }
  }

  async getListRayClusters() {
    try {
      const res = await this.props.appHelper.utils.bff?.listRayClusters({
        input: {
          namespace: this.appHelper.utils.getAuthData().project || 'abc',
        },
      });
      const list = res.RayCluster.listRayClusters.nodes.map(v => ({
        label: v.name,
        value: v.index,
      }));
      this.form()?.setFieldState('RAY_CLUSTER_INDEX', {
        dataSource: list,
      });
      this.form()?.setValues({
        RAY_CLUSTER_INDEX: list[0]?.value,
      });
    } catch (error) {
      // console.log(error, '===> err')
    }
  }

  handleCancle() {
    this.history.push('/model-service');
  }

  handleConfirm() {
    this.form()?.submit(async v => {
      this.setState({
        createLoading: true,
      });
      const { listModels, modelSource, resourcesData } = this.state;
      try {
        let res = {};
        if (modelSource === 'worker') {
          const params = {
            additionalEnvs: {
              CUDA_VISIBLE_DEVICES: v.CUDA_VISIBLE_DEVICES,
            },
            name: v.name,
            displayName: v.displayName,
            description: v.description,
            model: {
              name: v.model,
              namespace: listModels.find(item => item.name === v.model)?.namespace,
              kind: 'Model',
            },
            type:
              v.configType && v.configType.includes('fastchat-vllm') ? 'fastchat-vllm' : 'fastchat',
            namespace: this.appHelper.utils.getAuthData().project || 'abc',
            resources: {
              cpu: resourcesData.cpu,
              memory: `${resourcesData.memory}Gi`,
              nvidiaGPU: resourcesData.nvidiaGPU,
            },
            matchExpressions: [],
          };
          if (v.nodes?.length && !v.nodes?.includes('随机')) {
            params.matchExpressions = [
              {
                key: 'kubernetes.io/hostname',
                operator: 'In',
                values: v.nodes,
              },
            ];
          }
          if (v.configType.includes('ray')) {
            params.additionalEnvs = {
              ...params.additionalEnvs,
              RAY_CLUSTER_INDEX: v.RAY_CLUSTER_INDEX,
              NUMBER_GPUS: v.NUMBER_GPUS,
            };
          }
          res = await this.props.appHelper.utils.bff?.createWorker({
            input: params,
          });
        }
        if (modelSource === '3rd_party') {
          const params = {
            name: v.name,
            displayName: v.displayName,
            description: v.description,
            types: v.types.join(','),
            apiType: v.apiType === 'kubeagi' ? 'openai' : v.apiType,
            endpoint: {
              auth: {
                apiKey: v.endpoint,
              },
              url: v.baseUrl,
            },
            namespace: this.appHelper.utils.getAuthData().project || 'abc',
          };
          if (v.apiType === 'kubeagi') {
            params.llmModels =
              v.llmModels && v.llmModels?.split(',').length ? v.llmModels.split(',') : [];
            params.embeddingModels =
              v.embeddingModels && v.embeddingModels?.split(',')?.length
                ? v.embeddingModels.split(',')
                : [];
          }
          res = await this.props.appHelper.utils.bff?.createModelService({
            input: params,
          });
        }
        this.utils.notification.success({
          message: '新增模型服务成功',
        });
        this.handleCancle();
      } catch (error) {
        // console.log(error, '===> error')
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

  onChangeCpu(e) {
    this.onSetResourcesValues('cpu', e || 1);
  }

  onChangeMemory(e) {
    this.onSetResourcesValues('memory', e || 1);
  }

  onChangeModel(e) {
    const { listModels } = this.state;
    const listModelsList = listModels?.find(v => v.name === e)?.types?.split(',') || [];
    const modelTypes =
      listModelsList
        .map(l => {
          if (l === 'llm') return 'LLM';
          if (l === 'embedding') return 'Embedding';
          return l;
        })
        ?.join(',') || '-';
    this.setState({
      modelTypes,
    });
  }

  onChangeModelSource(e) {
    this.setState({
      modelSource: e.target.value,
    });
  }

  onChangeNode(e) {
    let disabledName = '随机';
    if (!e?.length) {
      disabledName = '';
    }
    const { dataSource } = this.form().getFieldState('nodes') || {};
    let data = dataSource;
    let nodes = e;
    if (e.includes(disabledName)) {
      data = dataSource.map(item => ({
        ...item,
        disabled: item.value !== disabledName,
      }));
      nodes = [disabledName];
    } else {
      data = dataSource.map(item => ({
        ...item,
        disabled: item.value === disabledName,
      }));
    }
    this.form()?.setFieldState('nodes', {
      dataSource: data,
    });
    this.form()?.setValues({
      nodes,
    });
    this.setState({
      resourcesData: {
        ...this.state.resourcesData,
        nodes,
      },
    });
    this.onSetResourcesValues('nodes', nodes);
  }

  onChangeNvidiaGPU(e) {
    this.onSetResourcesValues('nvidiaGPU', e || 1);
  }

  onChangeType(e) {
    if (e.includes('ray')) {
      this.getListRayClusters();
      this.setState({
        configType: ['fastchat-vllm', 'ray'],
      });
      this.form()?.setValues({
        configType: ['fastchat-vllm', 'ray'],
      });
    } else {
      this.setState({
        configType: e,
      });
    }
  }

  onClickCheck(event) {
    this.form()?.submit(async v => {
      try {
        const params = {
          name: v.name,
          displayName: v.displayName,
          description: v.description,
          types: v.types.join(','),
          apiType: v.apiType === 'kubeagi' ? 'openai' : v.apiType,
          endpoint: {
            auth: {
              apiKey: v.endpoint,
            },
            url: v.baseUrl,
          },
          namespace: this.appHelper.utils.getAuthData().project || 'abc',
        };
        if (v.apiType === 'kubeagi') {
          params.llmModels =
            v.llmModels && v.llmModels?.split(',').length ? v.llmModels.split(',') : [];
          params.embeddingModels =
            v.embeddingModels && v.embeddingModels?.split(',')?.length
              ? v.embeddingModels.split(',')
              : [];
        }
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

  onSetResourcesValues(key, value) {
    this.form()?.setValues({
      [key]: value,
    });
    this.setState({
      resourcesData: {
        ...this.state.resourcesData,
        [key]: value,
      },
    });
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    this.getListModels();
    this.getListNodes();
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
                title="新增模型服务"
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
                    NUMBER_GPUS: 2,
                    resources: { cpu: '4', memory: '16', nvidiaGPU: '1' },
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
                  componentProps={{ 'x-component-props': { placeholder: '请输入模型服务名称' } }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    'name': 'name',
                    'required': true,
                    'title': '模型服务名称',
                    'x-validator': [
                      {
                        children: '未知',
                        id: 'disabled',
                        message: '请输入模型服务名称',
                        pattern: '',
                        required: true,
                        type: 'disabled',
                      },
                      {
                        children: '未知',
                        id: 'disabled',
                        message: '请输入正确的模型服务名称',
                        pattern: '^[a-z]([-a-z0-9]*[a-z0-9])?$',
                        type: 'disabled',
                      },
                    ],
                  }}
                />
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{ 'x-component-props': { placeholder: '请输入模型服务别名' } }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    'name': 'displayName',
                    'required': true,
                    'title': '模型服务别名',
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
                      disabled: '{{ $form.values?.queryName }}',
                      onChange: function () {
                        return this.onChangeModelSource.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                      size: 'middle',
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    'enum': [
                      { label: '本地模型', value: 'worker' },
                      { label: '外部模型', value: '3rd_party' },
                    ],
                    'name': 'modelSource',
                    'title': '模型来源',
                    'x-pattern': '',
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
                    'name': 'description',
                    'title': this.i18n('i18n-il4b7wme') /* 描述 */,
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
                      disabled: '{{ $form.values?.queryName }}',
                      mode: 'single',
                      onChange: function () {
                        return this.onChangeModel.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                      placeholder: '请选择模型',
                      showSearch: true,
                    },
                  }}
                  decoratorProps={{
                    'x-decorator-props': { labelEllipsis: true, labelWrap: false },
                  }}
                  fieldProps={{
                    '_unsafe_MixedSetter_enum_select': 'ArraySetter',
                    'enum': [],
                    'name': 'model',
                    'required': true,
                    'title': '模型',
                    'x-display':
                      "{{ $form.values?.modelSource === 'worker' ? 'visible' : 'hidden' }}",
                    'x-pattern': 'disabled',
                    'x-validator': [
                      {
                        children: '未知',
                        id: 'disabled',
                        message: '请选择模型',
                        required: true,
                        type: 'disabled',
                      },
                    ],
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
                )}
                {!!__$$eval(
                  () => this.state.modelSource === '3rd_party' && this.state.apiType === 'worker'
                ) && (
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
                        {' '}
                        模型服务类型
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
                        {__$$eval(() => this.state.workerTypes)}
                      </Typography.Text>
                    </Col>
                  </Row>
                )}
                {!!__$$eval(() => this.state.modelSource === 'worker') && (
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={4}>
                      <Row __component_name="Row" wrap={true}>
                        <Col __component_name="Col" span={24}>
                          <Typography.Text
                            __component_name="Typography.Text"
                            disabled={false}
                            ellipsis={true}
                            strong={false}
                            style={{ fontSize: '', paddingLeft: '10px', paddingTop: '10px' }}
                          >
                            服务规格
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col __component_name="Col" span={20}>
                      <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                        <Col __component_name="Col" span={24}>
                          <Row
                            __component_name="Row"
                            gutter={[0, 0]}
                            id="1"
                            style={null}
                            wrap={true}
                          >
                            <Col
                              __component_name="Col"
                              span={14}
                              style={{ height: '50px', marginLeft: '-10px' }}
                            >
                              <FormilySelect
                                __component_name="FormilySelect"
                                componentProps={{
                                  'x-component-props': {
                                    _sdkSwrGetFunc: {},
                                    _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ObjectSetter',
                                    allowClear: false,
                                    disabled: false,
                                    mode: 'multiple',
                                    onChange: function () {
                                      return this.onChangeNode.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([])
                                      );
                                    }.bind(this),
                                    placeholder: '请选择节点',
                                    showSearch: true,
                                  },
                                }}
                                decoratorProps={{
                                  'x-decorator-props': {
                                    asterisk: false,
                                    bordered: true,
                                    colon: false,
                                    feedbackLayout: 'none',
                                    fullness: false,
                                    inset: false,
                                    labelAlign: 'left',
                                    labelCol: 4,
                                    labelEllipsis: true,
                                    labelWrap: false,
                                    layout: 'inline',
                                    size: 'default',
                                    style: {},
                                    tooltipLayout: 'text',
                                    wrapperAlign: 'left',
                                    wrapperWrap: false,
                                  },
                                }}
                                fieldProps={{
                                  '_unsafe_MixedSetter_enum_select': 'ExpressionSetter',
                                  '_unsafe_MixedSetter_title_select': 'I18nSetter',
                                  'name': 'nodes',
                                  'required': false,
                                  'title': '指定节点',
                                  'x-display':
                                    "{{ !$form.values?.nodesNoAuth ? 'visible' : 'hidden' }}",
                                  'x-validator': [],
                                }}
                                style={{}}
                              />
                            </Col>
                          </Row>
                          <Row
                            __component_name="Row"
                            gutter={[0, 0]}
                            style={{ marginBottom: '16xpx' }}
                            wrap={true}
                          >
                            <Col __component_name="Col" span={24} style={{}}>
                              <FormilyFormItem
                                __component_name="FormilyFormItem"
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                fieldProps={{
                                  'name': 'FormilyFormItem',
                                  'title': '',
                                  'type': 'object',
                                  'x-component': 'FormilyFormItem',
                                  'x-display':
                                    "{{ $form.values?.nodesNoAuth ? 'visible' : 'hidden' }}",
                                  'x-validator': [],
                                }}
                              >
                                <Row
                                  __component_name="Row"
                                  gutter={[0, 0]}
                                  style={{ marginBottom: '16xpx' }}
                                  wrap={true}
                                >
                                  <Col __component_name="Col" span={2} style={{ height: '50px' }}>
                                    <Typography.Text
                                      __component_name="Typography.Text"
                                      disabled={false}
                                      ellipsis={true}
                                      strong={false}
                                      style={{ fontSize: '12px' }}
                                    >
                                      指定节点
                                    </Typography.Text>
                                    <Typography.Title
                                      __component_name="Typography.Title"
                                      bold={true}
                                      bordered={false}
                                      ellipsis={true}
                                      level={1}
                                    >
                                      {this.i18n('i18n-u0etzjrs') /* - */}
                                    </Typography.Title>
                                  </Col>
                                  <Col __component_name="Col" span={14} style={{ height: '50px' }}>
                                    <Typography.Text
                                      __component_name="Typography.Text"
                                      disabled={false}
                                      ellipsis={true}
                                      strong={false}
                                      style={{ fontSize: '' }}
                                    >
                                      随机
                                    </Typography.Text>
                                    <Typography.Text
                                      __component_name="Typography.Text"
                                      disabled={false}
                                      ellipsis={true}
                                      strong={false}
                                      style={{ color: '#aaaaaa', display: 'block', fontSize: '' }}
                                    >
                                      暂无权限，无法指定节点，请联系管理员获取节点查询权限。
                                    </Typography.Text>
                                  </Col>
                                </Row>
                              </FormilyFormItem>
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
                                CPU
                              </Typography.Title>
                            </Col>
                            <Col __component_name="Col" span={24}>
                              <Row __component_name="Row" gutter={[10, 0]} id="2" wrap={true}>
                                <Col __component_name="Col" span={20}>
                                  <SliderInput
                                    __component_name="SliderInput"
                                    addonAfter="核"
                                    defaultValue={4}
                                    gutter={20}
                                    id="cpu"
                                    inputCol={__$$eval(() => ({
                                      span: 5,
                                    }))}
                                    inputProps={__$$eval(() => ({}))}
                                    max={64}
                                    min={1}
                                    onChange={function () {
                                      return this.onChangeCpu.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([])
                                      );
                                    }.bind(this)}
                                    placeholder="CPU"
                                    sliderCol={__$$eval(() => ({
                                      span: 12,
                                    }))}
                                    sliderProps={__$$eval(() => ({}))}
                                    step={1}
                                    style={{ boxShadow: '0 0 0 0 #000', marginBottom: '16px' }}
                                    value={__$$eval(() => this.state.resourcesData.cpu)}
                                  />
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
                              <Row __component_name="Row" gutter={[10, 0]} id="3" wrap={true}>
                                <Col __component_name="Col" span={20}>
                                  <SliderInput
                                    __component_name="SliderInput"
                                    addonAfter="GiB"
                                    defaultValue={16}
                                    gutter={20}
                                    id="memory"
                                    inputCol={__$$eval(() => ({
                                      span: 5,
                                    }))}
                                    inputProps={__$$eval(() => ({}))}
                                    max={256}
                                    min={1}
                                    onChange={function () {
                                      return this.onChangeMemory.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([])
                                      );
                                    }.bind(this)}
                                    placeholder="内存"
                                    sliderCol={__$$eval(() => ({
                                      span: 12,
                                    }))}
                                    sliderProps={__$$eval(() => ({}))}
                                    step={1}
                                    style={{ marginBottom: '16px' }}
                                    value={__$$eval(() => this.state.resourcesData.memory)}
                                  />
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
                              <Row __component_name="Row" gutter={[10, 0]} id="4" wrap={true}>
                                <Col __component_name="Col" span={20}>
                                  <SliderInput
                                    __component_name="SliderInput"
                                    addonAfter="颗"
                                    defaultValue={1}
                                    gutter={16}
                                    id="nvidiaGPU"
                                    inputCol={__$$eval(() => ({
                                      span: 5,
                                    }))}
                                    inputProps={__$$eval(() => ({}))}
                                    max={16}
                                    min={1}
                                    onChange={function () {
                                      return this.onChangeNvidiaGPU.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([])
                                      );
                                    }.bind(this)}
                                    placeholder="GPU"
                                    sliderCol={__$$eval(() => ({
                                      span: 12,
                                    }))}
                                    sliderProps={__$$eval(() => ({}))}
                                    step={1}
                                    style={{ marginBottom: '16px' }}
                                    value={__$$eval(() => this.state.resourcesData.nvidiaGPU)}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                )}
                {!!__$$eval(() => this.state.modelSource === 'worker') && (
                  <Row __component_name="Row" gutter={[0, 0]} wrap={false}>
                    <Col __component_name="Col" flex="" span={4} />
                    <Col __component_name="Col" flex="auto" span={20}>
                      <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                        <Col __component_name="Col" span={24}>
                          <Row __component_name="Row" gutter={[0, 0]} wrap={false}>
                            <Col
                              __component_name="Col"
                              flex="auto"
                              span={14}
                              style={{ marginBottom: '-4px', marginLeft: '-10px' }}
                            >
                              <FormilyInput
                                __component_name="FormilyInput"
                                componentProps={{
                                  'x-component-props': {
                                    _unsafe_MixedSetter_placeholder_select: 'I18nSetter',
                                    placeholder:
                                      '请输入指定使用的 GPU 序号，多个用英文逗号隔开，如：0,3',
                                  },
                                }}
                                decoratorProps={{
                                  'x-decorator-props': {
                                    colon: false,
                                    labelAlign: 'left',
                                    labelCol: 4,
                                    labelEllipsis: true,
                                    wrapperAlign: 'left',
                                  },
                                }}
                                fieldProps={{
                                  'name': 'CUDA_VISIBLE_DEVICES',
                                  'title': '指定 GPU',
                                  'x-validator': [
                                    {
                                      children: '未知',
                                      id: 'disabled',
                                      message: '仅支持数字和英文逗号，不能以逗号开头',
                                      pattern: '^\\d+(?:,\\d+)*$',
                                      type: 'disabled',
                                    },
                                  ],
                                }}
                                style={{}}
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col __component_name="Col" span={24}>
                          <Row __component_name="Row" gutter={[0, 0]} wrap={false}>
                            <Col __component_name="Col" flex="" span={2} />
                            <Col __component_name="Col" flex="auto" span={20} style={{}}>
                              <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                                <Col __component_name="Col" span={24}>
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ color: '#AAAAAA', fontSize: '10' }}
                                  >
                                    输入 GPU 序号，平台将会使用指定的
                                    GPU，若未全部指定或为空，则按照顺序使用。
                                  </Typography.Text>
                                </Col>
                                <Col __component_name="Col" span={24}>
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ color: '#AAAAAA', fontSize: '10' }}
                                  >
                                    如：服务规格 GPU 配置为 4 颗，指定 GPU 配置为：5,6，那么在调度
                                    GPU 时，将会调度序号为 0,1,5,6 的 GPU。
                                  </Typography.Text>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                )}
                {!!__$$eval(() => this.state.modelSource === 'worker') && (
                  <Row __component_name="Row" gutter={[0, 0]} wrap={false}>
                    <Col __component_name="Col" flex="" span={0} />
                    <Col __component_name="Col" flex="auto">
                      <Divider
                        __component_name="Divider"
                        content={[
                          <Row __component_name="Row" gutter={[0, 16]} style={{}} wrap={true}>
                            <Col __component_name="Col" span={24}>
                              <Row __component_name="Row" gutter={[0, 0]} wrap={false}>
                                <Col __component_name="Col" flex="" span={4} />
                                <Col __component_name="Col" flex="auto">
                                  <FormilyCheckbox
                                    __component_name="FormilyCheckbox"
                                    componentProps={{
                                      'x-component-props': {
                                        onChange: function () {
                                          return this.onChangeType.apply(
                                            this,
                                            Array.prototype.slice.call(arguments).concat([])
                                          );
                                        }.bind(this),
                                      },
                                    }}
                                    decoratorProps={{
                                      'x-decorator-props': { labelEllipsis: true },
                                    }}
                                    fieldProps={{
                                      '_unsafe_MixedSetter_default_select': 'I18nSetter',
                                      'default': '',
                                      'enum': [
                                        { label: '启用 vLLM 加速', value: 'fastchat-vllm' },
                                        { label: '启用 Ray 分布式推理', value: 'ray' },
                                      ],
                                      'name': 'configType',
                                      'x-validator': [],
                                    }}
                                  />
                                </Col>
                              </Row>
                              <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                                <Col __component_name="Col" span={24}>
                                  <FormilySelect
                                    __component_name="FormilySelect"
                                    componentProps={{
                                      'x-component-props': {
                                        _sdkSwrGetFunc: {},
                                        allowClear: false,
                                        disabled: false,
                                        placeholder: '请选择集群',
                                      },
                                    }}
                                    decoratorProps={{
                                      'x-decorator-props': { labelEllipsis: true },
                                    }}
                                    fieldProps={{
                                      'name': 'RAY_CLUSTER_INDEX',
                                      'required': true,
                                      'title': '集群',
                                      'x-display':
                                        "{{ $form.values?.configType?.includes('ray') ? 'visible' : 'hidden' }}",
                                      'x-validator': [],
                                    }}
                                  />
                                </Col>
                                <Col __component_name="Col" span={24}>
                                  {!!__$$eval(() => this.state.configType.includes('ray')) && (
                                    <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                                      <Col
                                        __component_name="Col"
                                        span={4}
                                        style={{ lineHeight: '32px', paddingLeft: '12px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={false}
                                          style={{ fontSize: '' }}
                                        >
                                          GPU 数量
                                        </Typography.Text>
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        span={2}
                                        style={{ marginRight: '12px' }}
                                      >
                                        <FormilyNumberPicker
                                          __component_name="FormilyNumberPicker"
                                          componentProps={{
                                            'x-component-props': {
                                              min: 2,
                                              placeholder: '请输入',
                                              precision: 0,
                                            },
                                          }}
                                          decoratorProps={{
                                            'x-decorator-props': { labelEllipsis: true },
                                          }}
                                          fieldProps={{
                                            'name': 'NUMBER_GPUS',
                                            'title': '',
                                            'x-validator': [],
                                          }}
                                          style={{}}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        span={6}
                                        style={{ lineHeight: '32px' }}
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
                                  )}
                                </Col>
                              </Row>
                            </Col>
                          </Row>,
                        ]}
                        dashed={true}
                        defaultOpen={true}
                        mode="expanded"
                        orientation="left"
                        orientationMargin={0}
                      >
                        高级配置
                      </Divider>
                    </Col>
                  </Row>
                )}
                <FormilySelect
                  __component_name="FormilySelect"
                  componentProps={{
                    'x-component-props': {
                      _sdkSwrGetFunc: {},
                      allowClear: false,
                      disabled: false,
                      notFoundContent: '',
                      placeholder: '请选择模型服务供应商',
                    },
                  }}
                  decoratorProps={{ 'x-decorator-props': { asterisk: true, labelEllipsis: true } }}
                  fieldProps={{
                    '_unsafe_MixedSetter_default_select': 'I18nSetter',
                    '_unsafe_MixedSetter_enum_select': 'ArraySetter',
                    '_unsafe_MixedSetter_x-validator_select': 'ArraySetter',
                    'enum': [
                      {
                        children: '未知',
                        id: 'disabled',
                        label: 'kubeagi',
                        type: 'disabled',
                        value: 'kubeagi',
                      },
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
                    'name': 'apiType',
                    'required': true,
                    'title': '模型服务供应商',
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
                    '_unsafe_MixedSetter_default_select': 'VariableSetter',
                    'default':
                      "{{ $form.values?.apiType ? ($form.values?.apiType === 'zhipuai' ? 'https://open.bigmodel.cn/api/paas/v3/model-api' : 'https://api.openai.com/v1') : undefined }}",
                    'name': 'baseUrl',
                    'required': true,
                    'title': '模型服务地址',
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
                    'name': 'endpoint',
                    'required': true,
                    'title': 'Token',
                    'x-display':
                      "{{ $form.values?.modelSource === '3rd_party' ? 'visible' : 'hidden' }}",
                    'x-validator': [],
                  }}
                  style={{}}
                />
                {!!__$$eval(() => this.state.modelSource !== 'worker') && (
                  <Row
                    __component_name="Row"
                    gutter={[0, 0]}
                    style={{ marginBottom: '24px', marginTop: '-8px' }}
                    wrap={false}
                  >
                    <Col __component_name="Col" flex="" span={4} />
                    <Col __component_name="Col" flex="auto" style={{}}>
                      <Button
                        __component_name="Button"
                        block={false}
                        danger={false}
                        disabled={false}
                        ghost={false}
                        onClick={function () {
                          return this.onClickCheck.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
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
                    'enum': [
                      { label: '支持LLM模型', value: 'llm' },
                      { label: '支持Embedding模型', value: 'embedding' },
                    ],
                    'name': 'types',
                    'required': true,
                    'title': '模型服务类型',
                    'x-display':
                      "{{ $form.values?.modelSource === '3rd_party' ? 'visible' : 'hidden' }}",
                    'x-validator': [],
                  }}
                />
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{ 'x-component-props': { placeholder: '请输入LLM模型列表' } }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    'name': 'llmModels',
                    'required': false,
                    'title': 'LLM模型列表',
                    'x-display':
                      "{{ ($form.values?.modelSource === '3rd_party') && ($form.values?.apiType === 'kubeagi') && $form.values?.types?.includes('llm')  ? 'visible' : 'hidden' }}",
                    'x-validator': [],
                  }}
                />
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{
                    'x-component-props': { placeholder: '请输入Embedding模型列表' },
                  }}
                  decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                  fieldProps={{
                    'name': 'embeddingModels',
                    'required': false,
                    'title': 'Embedding模型列表',
                    'x-display':
                      "{{ ($form.values?.modelSource === '3rd_party') && ($form.values?.apiType === 'kubeagi') && $form.values?.types?.includes('embedding')  ? 'visible' : 'hidden' }}",
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
              <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
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
