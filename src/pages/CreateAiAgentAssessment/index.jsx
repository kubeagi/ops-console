// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  Row,
  Col,
  Typography,
  Tooltip,
  Slider,
  FormilyForm,
  FormilyNumberPicker,
  FormilyTextArea,
  Space,
  Button,
  Card,
  FormilySelect,
  FormilyFormItem,
  FormilySwitch,
  Input,
  Pagination,
  Table,
  Divider,
} from '@tenx-ui/materials';

import { AntdIconQuestionCircleOutlined } from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class CreateAiAgentAssessment$$Page extends React.Component {
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

    this.state = {
      dataSetDataList: [],
      dataSetFileList: [],
      dataSetFileSearchParams: {
        keyword: '',
        currentPage: 1,
        pageSize: 10,
      },
      dataSetFileTotal: '0',
      fileSelectCheckErrorFlag: false,
      fileTableLoading: false,
      formInitValue: {
        answer_correctness: {
          checked: true,
          value: 0.5,
        },
        answer_relevancy: {
          checked: true,
          value: 0.5,
        },
        answer_similarity: {
          checked: true,
          value: 0.5,
        },
        context_precision: {
          checked: true,
          value: 0.5,
        },
        context_recall: {
          checked: true,
          value: 0.5,
        },
        context_relevancy: {
          checked: true,
          value: 0.5,
        },
        faithfulness: {
          checked: true,
          value: 0.5,
        },
      },
      hasKnowledgebase: true,
      llmList: [],
      loading: false,
      numberInputStep: 0.1,
      selectedFileList: [],
    };
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

  formatParameters(values) {
    const keys = Object.keys(this.state.formInitValue);
    const result = [];
    for (let i = 0; i < keys.length; i++) {
      const item = keys[i];
      const { checked, value } = values[item];
      if (checked) {
        if (item === 'answer_correctness') {
          result.push({
            metricKind: item,
            toleranceThreshbold: value * 100,
            parameters: [
              {
                key: 'factuality',
                value: values.factuality / 100,
              },
              {
                key: 'semantic',
                value: values.semantic / 100,
              },
            ],
          });
        } else {
          result.push({
            metricKind: item,
            toleranceThreshbold: value * 100,
          });
        }
      }
    }
    return result;
  }

  async getApplication() {
    const res = await this.utils.bff.getApplication({
      name: this.history?.query?.appName,
      namespace: this.history?.query?.appNamespace,
    });
    const Application = res?.Application?.getApplication;
    if (!Application.knowledgebase) {
      this.setState({
        hasKnowledgebase: false,
      });
      this.form('create_form').fields['faithfulness.checked'].componentProps.disabled = true;
      this.form('create_form').fields['faithfulness.value'].required = false;
      this.form('create_form').fields['context_relevancy.checked'].componentProps.disabled = true;
      this.form('create_form').fields['context_relevancy.value'].required = false;
      this.form('create_form').fields['context_precision.checked'].componentProps.disabled = true;
      this.form('create_form').fields['context_precision.value'].required = false;
      this.form('create_form').fields['context_recall.checked'].componentProps.disabled = true;
      this.form('create_form').fields['context_recall.value'].required = false;
      this.form('create_form').setValues({
        faithfulness: {
          checked: false,
        },
        context_relevancy: {
          checked: false,
        },
        context_precision: {
          checked: false,
        },
        context_recall: {
          checked: false,
        },
      });
    }
  }

  async getDataSet() {
    const res = await this.utils.bff.listDatasets({
      input: {
        namespace: this.utils.getAuthData().project,
        pageSize: 9999,
        page: 1,
      },
      versionsInput: {
        namespace: this.utils.getAuthData().project,
        pageSize: 9999,
        page: 1,
      },
      filesInput: {
        keyword: this.state.dataSetFileSearchParams.keyword,
        pageSize: this.state.dataSetFileSearchParams.pageSize,
        page: this.state.dataSetFileSearchParams.currentPage,
      },
    });
    const datasetlist = res.Dataset.listDatasets.nodes.map(item => {
      const versions = item.versions.nodes.map(i => ({
        label: i.version,
        value: i.version,
        name: i.name,
        namespace: i.namespace,
      }));
      return {
        label: this.utils.getFullName(item),
        value: item.name,
        versions: versions,
        namespace: item.namespace,
      };
    });
    this.setState(
      {
        dataSetDataList: datasetlist,
      },
      () => {
        this.form('create_form').setFieldState('data_set_name', {
          dataSource: datasetlist,
        });
        const values = this.form('create_form')?.values;
        const name = this.getVersionName(values?.data_set_name, values?.data_set_version);
        this.getTableList(name);
      }
    );
  }

  getListWorkers() {
    const namespace = this.utils.getAuthData().project || 'system-tce';
    const input = {
      pageSize: 9999,
      page: 1,
      namespace,
    };
    this.utils.bff
      ?.listLLMs({
        input,
      })
      .then(res => {
        const nodes = res.LLM.listLLMs?.nodes || [];
        const _list = nodes
          .filter(item => item.status === 'True' || item.status === 'Running')
          .map(item => {
            return {
              models: item.models?.map(i => ({
                label: i,
                value: i,
              })),
              _models: item.models,
              label: this.utils.getFullName(item),
              value: item.name,
              provider: item.provider,
              baseUrl: item.baseUrl,
              namespace: item.namespace,
            };
          });
        this.setState({
          llmList: _list,
        });
        this.form('create_form').setFieldState('judgeLLM', {
          dataSource: _list,
        });
      })
      .catch(err => [
        this.utils.notification.warn({
          message: '获取裁判大模型失败',
          errors: err?.response?.errors,
        }),
      ]);
  }

  async getTableList(name) {
    if (!name) return;
    this.setState({
      fileTableLoading: true,
    });
    const res = await this.utils.bff.getVersionedDataset({
      name: name,
      namespace: this.utils.getAuthData().project,
      fileInput: {
        keyword: this.state.dataSetFileSearchParams.keyword,
        pageSize: 10,
        page: this.state.dataSetFileSearchParams.currentPage,
      },
    });
    const data = res.VersionedDataset.getVersionedDataset.files;
    this.setState({
      fileTableLoading: false,
      dataSetFileList:
        (data.nodes || []).map(i => ({
          ...i,
          label: '普通文本',
        })) || [],
      dataSetFileTotal: data.totalCount || 0,
    });
  }

  getVersionName(dataset, version) {
    if (dataset && version) {
      const datasetObj = this.state.dataSetDataList.find(i => i.value === dataset);
      const versionObj = datasetObj.versions.find(i => i.value === version);
      return versionObj.name;
    }
    return;
  }

  onBack(event) {
    // 点击按钮时的回调
    this.history.push('/');
  }

  onDataSetChange(v) {
    this.setState({
      dataSetFileList: [],
      selectedFileList: [],
      dataSetFileTotal: '0',
    });
    this.form('create_form').setValues({
      data_set_version: undefined,
    });
    this.setDataSetVersionsSource(v);
  }

  onDataSetVersionChange(v) {
    const { data_set_name } = this.form('create_form').values;
    const name = this.getVersionName(data_set_name, v);
    this.getTableList(name);
  }

  onFinish() {
    this.form('create_form')
      .validate()
      .then(res => {
        const values = this.form('create_form')?.values;
        if (!this.state.selectedFileList.length) {
          this.setState({
            fileSelectCheckErrorFlag: true,
          });
          return;
        }
        const otherParams = this.formatParameters(values);
        const params = {
          namespace: this.utils.getAuthData().project || 'system-tce',
          application: {
            apiGroup: 'arcadia.kubeagi.k8s.com.cn/v1alpha1',
            name: this.history?.query?.appName,
            namespace: this.history?.query?.appNamespace,
            kind: 'Application',
          },
          datasets: [
            {
              source: {
                apiGroup: 'arcadia.kubeagi.k8s.com.cn/v1alpha1',
                kind: 'VersionedDataset',
                name: `${values.data_set_name}.${values.data_set_version}`,
                namespace: this.state.dataSetFileList.find(
                  item => item.name === values.data_set_name
                )?.namespace,
              },
              files: this.state.selectedFileList.map(
                item => `dataset/${values.data_set_name}/${values.data_set_version}/${item}`
              ),
            },
          ],
          judgeLLM: {
            apiGroup: 'arcadia.kubeagi.k8s.com.cn/v1alpha1',
            kind: 'LLM',
            name: values.judgeLLM,
            namespace: this.state.llmList.find(item => item.name === values.data_set_name)
              ?.namespace,
          },
          serviceAccountName: 'ragas-eval-sa',
          metrics: [...otherParams],
        };
        this.setState({
          loading: true,
        });
        this.utils.bff
          .createRAG({
            input: params,
          })
          .then(res => {
            if (res.RAG.createRAG) {
              this.utils.notification.success({
                message: '创建任务成功',
              });
              this.history.go(-1);
              this.setState({
                loading: false,
              });
            }
          })
          .catch(err => {
            this.setState({
              loading: false,
            });
          });
      });
  }

  onPageChange(page, pageSize) {
    this.setState(
      {
        dataSetFileSearchParams: {
          ...this.state.dataSetFileSearchParams,
          currentPage: page,
          pageSize,
        },
      },
      () => {
        this.getDataSet();
      }
    );
  }

  onSearch(value) {
    this.setState(
      {
        dataSetFileSearchParams: {
          keyword: value,
          currentPage: 1,
        },
      },
      () => {
        const values = this.form('create_form')?.values;
        const name = this.getVersionName(values?.data_set_name, values?.data_set_version);
        this.getTableList(name);
      }
    );
  }

  onSelectFileChange(v) {
    if (v.length) {
      this.setState({
        fileSelectCheckErrorFlag: false,
      });
    } else {
      this.setState({
        fileSelectCheckErrorFlag: true,
      });
    }
    this.setState({
      selectedFileList: v,
    });
  }

  onSwitchCheckChange(value, event, { type }) {
    if (value) {
      this.form('create_form').fields[`${type}.value`].required = true;
    } else {
      this.form('create_form').fields[`${type}.value`].required = false;
    }
  }

  onValueChange(val, { type }) {
    if (type === 'factuality') {
      this.form('create_form').setValues({
        semantic: 100 - val,
      });
    } else {
      this.form('create_form').setValues({
        factuality: 100 - val,
      });
    }
  }

  setDataSetVersionsSource(v) {
    const obj = this.state.dataSetDataList.find(item => item.value === v);
    const genOptionList = obj.versions;
    this.form('create_form').setFieldState('data_set_version', {
      dataSource: genOptionList,
    });
  }

  showTotal(total, range) {
    // 用于格式化显示表格数据总量
    return `共 ${total} 条`;
  }

  componentDidMount() {
    this.getDataSet();
    this.getListWorkers();
    this.getApplication();
    setTimeout(() => {
      this.form('create_form').setValues(this.state.formInitValue);
    });
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page style={{ marginBottom: '0px', paddingBottom: '0px' }}>
        <Modal
          __component_name="Modal"
          centered={false}
          confirmLoading={false}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.onCloseConfigModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.onSubmitHighConfig.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.configVisible)}
          title="模型高级配置"
          width="700px"
        >
          <Row __component_name="Row" wrap={false}>
            <Col
              __component_name="Col"
              flex="140px"
              style={{ paddingLeft: '20px', paddingTop: '8px' }}
            >
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: '' }}
              >
                温度
              </Typography.Text>
              <Tooltip
                __component_name="Tooltip"
                title="配置 AI 回复的发散程度，较高的数值会使输出更加随机，较低的数值会使输出更加精确，范围为(0, 1]。"
              >
                <AntdIconQuestionCircleOutlined
                  __component_name="AntdIconQuestionCircleOutlined"
                  style={{ marginLeft: '5px' }}
                />
              </Tooltip>
            </Col>
            <Col __component_name="Col" flex="auto">
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={18}>
                  <Slider
                    __component_name="Slider"
                    marks={__$$eval(() => this.state.temperature_marks)}
                    max={100}
                    min={0}
                    onChange={function () {
                      return this.setQaSplitHighConfigValue.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([
                          {
                            fieldName: 'temperature',
                          },
                        ])
                      );
                    }.bind(this)}
                    value={__$$eval(() => this.state.qaSplitHighConfig.temperature)}
                  />
                </Col>
                <Col __component_name="Col" span={6}>
                  <FormilyForm
                    __component_name="FormilyForm"
                    componentProps={{
                      colon: false,
                      labelAlign: 'left',
                      labelCol: 4,
                      layout: 'horizontal',
                      wrapperCol: 20,
                    }}
                    formHelper={{ autoFocus: true }}
                    ref={this._refsManager.linkRef('temperature_form')}
                  >
                    <FormilyNumberPicker
                      __component_name="FormilyNumberPicker"
                      componentProps={{
                        'x-component-props': {
                          max: 1,
                          min: 0,
                          onChange: function () {
                            return this.setQaSplitHighConfigValue.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([
                                {
                                  fieldName: 'temperature',
                                  times: 100,
                                },
                              ])
                            );
                          }.bind(this),
                          placeholder: '请输入',
                          step: __$$eval(() => 1 / 100),
                        },
                      }}
                      decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                      fieldProps={{
                        '_unsafe_MixedSetter_default_select': 'VariableSetter',
                        'default': __$$eval(() => this.state.qaSplitHighConfig.temperature / 100),
                        'name': 'temperature',
                        'title': '',
                        'x-validator': [],
                      }}
                    />
                  </FormilyForm>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row __component_name="Row" wrap={false}>
            <Col
              __component_name="Col"
              flex="140px"
              style={{ paddingLeft: '20px', paddingTop: '8px' }}
            >
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: '' }}
              >
                最大响应长度
              </Typography.Text>
              <Tooltip
                __component_name="Tooltip"
                title="控制 AI 回复的最大 Tokens，范围为[10，4096],较小的值可以一定程度上减少 AI 的废话，但也可能导致 AI 回复不完整。"
              >
                <AntdIconQuestionCircleOutlined
                  __component_name="AntdIconQuestionCircleOutlined"
                  style={{ marginLeft: '5px' }}
                />
              </Tooltip>
            </Col>
            <Col __component_name="Col" flex="auto">
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={18}>
                  <Slider
                    __component_name="Slider"
                    marks={__$$eval(() => this.state.max_token_marks)}
                    max={4096}
                    min={10}
                    onChange={function () {
                      return this.setQaSplitHighConfigValue.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([
                          {
                            fieldName: 'max_tokens',
                          },
                        ])
                      );
                    }.bind(this)}
                    value={__$$eval(() => this.state.qaSplitHighConfig.max_tokens)}
                  />
                </Col>
                <Col __component_name="Col" span={6}>
                  <FormilyForm
                    __component_name="FormilyForm"
                    componentProps={{
                      colon: false,
                      labelAlign: 'left',
                      labelCol: 4,
                      layout: 'horizontal',
                      wrapperCol: 20,
                    }}
                    formHelper={{ autoFocus: true }}
                    ref={this._refsManager.linkRef('max_tokens_form')}
                  >
                    <FormilyNumberPicker
                      __component_name="FormilyNumberPicker"
                      componentProps={{
                        'x-component-props': {
                          max: 4096,
                          min: 10,
                          onChange: function () {
                            return this.setQaSplitHighConfigValue.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([
                                {
                                  fieldName: 'max_tokens',
                                },
                              ])
                            );
                          }.bind(this),
                          placeholder: '请输入',
                        },
                      }}
                      decoratorProps={{
                        'x-decorator-props': {
                          labelCol: 0,
                          labelEllipsis: true,
                          labelWidth: '0px',
                        },
                      }}
                      fieldProps={{
                        '_unsafe_MixedSetter_default_select': 'VariableSetter',
                        'default': __$$eval(() => this.state.qaSplitHighConfig.max_tokens),
                        'name': 'max_tokens',
                        'title': '',
                        'x-validator': [],
                      }}
                    />
                  </FormilyForm>
                </Col>
              </Row>
            </Col>
          </Row>
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 5,
              layout: 'horizontal',
              wrapperCol: 19,
            }}
            formHelper={{ autoFocus: true }}
            ref={this._refsManager.linkRef('prompt_template_form')}
          >
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                'x-component-props': {
                  onChange: function () {
                    return this.setQaSplitHighConfigValue.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([
                        {
                          fieldName: 'prompt_template',
                        },
                      ])
                    );
                  }.bind(this),
                  placeholder: '请输入',
                  rows: 15,
                },
              }}
              decoratorProps={{
                'x-decorator-props': {
                  labelEllipsis: true,
                  labelWidth: '140px',
                  tooltip:
                    'QA 拆分 Prompt：提示词可以帮助模型更好地理解做 QA 拆分的意图，该提示词会输出给大模型，帮助您去做文档 QA 拆分处理。输入内容必须包含变量，如：{text}。',
                },
              }}
              fieldProps={{
                '_unsafe_MixedSetter_default_select': 'VariableSetter',
                'default': __$$eval(() => this.state.qaSplitHighConfig.prompt_template),
                'name': 'prompt_template',
                'title': 'QA 拆分 Prompt',
                'x-component': 'Input.TextArea',
                'x-validator': [],
              }}
            />
          </FormilyForm>
        </Modal>
        <Row __component_name="Row" style={{ marginBottom: '16px' }} wrap={true}>
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
              创建任务
            </Typography.Title>
          </Col>
        </Row>
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
              labelWidth: '',
              layout: 'horizontal',
              wrapperCol: 20,
            }}
            formHelper={{ autoFocus: false }}
            ref={this._refsManager.linkRef('create_form')}
          >
            <Row __component_name="Row" wrap={true}>
              <Col __component_name="Col" flex="960px">
                <FormilySelect
                  __component_name="FormilySelect"
                  componentProps={{
                    'x-component-props': {
                      _sdkSwrGetFunc: __$$eval(() => this.state.dataSetDataList),
                      _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ExpressionSetter',
                      allowClear: false,
                      disabled: false,
                      placeholder: '请选择裁判大模型',
                      showSearch: true,
                    },
                  }}
                  decoratorProps={{
                    'x-decorator-props': {
                      labelEllipsis: true,
                      labelWidth: '120px',
                      wrapperWidth: '',
                    },
                  }}
                  fieldProps={{
                    '_unsafe_MixedSetter_enum_select': 'ExpressionSetter',
                    'enum': null,
                    'name': 'judgeLLM',
                    'required': true,
                    'title': '裁判大模型',
                    'x-validator': [],
                  }}
                  style={{}}
                />
              </Col>
            </Row>
            <Row
              __component_name="Row"
              gutter={[null, 0]}
              style={{ marginBottom: '0px', paddingBottom: '0px' }}
              wrap={true}
            >
              <Col __component_name="Col" flex="120px">
                <FormilyFormItem
                  __component_name="FormilyFormItem"
                  decoratorProps={{
                    'x-decorator-props': {
                      asterisk: true,
                      labelCol: 6,
                      labelEllipsis: true,
                      wrapperWidth: '0',
                    },
                  }}
                  fieldProps={{
                    'name': 'FormilyFormItem',
                    'title': '评测指标',
                    'type': 'object',
                    'x-component': 'FormilyFormItem',
                    'x-validator': [],
                  }}
                  style={{}}
                />
              </Col>
              <Col __component_name="Col" span={19} style={{}}>
                <Row __component_name="Row" justify="start" wrap={false}>
                  <Col __component_name="Col" flex="420px">
                    <Card
                      __component_name="Card"
                      actions={[]}
                      bordered={true}
                      className="index-card"
                      hoverable={true}
                      loading={false}
                      size="default"
                      style={{ marginBottom: '16px' }}
                      type="default"
                    >
                      <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                        <Col __component_name="Col" span={22}>
                          <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                            <Col __component_name="Col" span={24}>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={true}
                                        style={{ fontSize: '16' }}
                                      >
                                        忠实度
                                      </Typography.Text>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col __component_name="Col">
                                  <FormilySwitch
                                    __component_name="FormilySwitch"
                                    componentProps={{
                                      'x-component-props': {
                                        disabled: false,
                                        loading: false,
                                        onChange: function () {
                                          return this.onSwitchCheckChange.apply(
                                            this,
                                            Array.prototype.slice.call(arguments).concat([
                                              {
                                                type: 'faithfulness',
                                              },
                                            ])
                                          );
                                        }.bind(this),
                                        size: 'small',
                                      },
                                    }}
                                    decoratorProps={{
                                      'x-decorator-props': {
                                        labelEllipsis: true,
                                        style: { height: '20px', marginBottom: '0px' },
                                      },
                                    }}
                                    fieldProps={{
                                      'name': 'faithfulness.checked',
                                      'title': '',
                                      'x-validator': [],
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>
                            <Col __component_name="Col" span={24}>
                              <Typography.Paragraph
                                code={false}
                                delete={false}
                                disabled={false}
                                editable={false}
                                ellipsis={{ rows: 2 }}
                                mark={false}
                                strong={false}
                                style={{ fontSize: '' }}
                                type="secondary"
                                underline={false}
                              >
                                衡量待测智能体生成的答案与知识库内容的一致性，阈值范围为（0,1），得分越高越好。
                              </Typography.Paragraph>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{
                                        marginBottom: '0px',
                                        marginLeft: '0px',
                                        marginRight: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '8px',
                                        paddingRight: '0px',
                                      }}
                                    >
                                      <FormilyNumberPicker
                                        __component_name="FormilyNumberPicker"
                                        componentProps={{
                                          'x-component-props': {
                                            max: 1,
                                            min: 0,
                                            placeholder: '请输入',
                                            step: __$$eval(() => 1 / 10),
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            asterisk: false,
                                            colon: false,
                                            labelAlign: 'left',
                                            labelEllipsis: false,
                                            labelWidth: '120px',
                                            size: 'default',
                                            style: {
                                              marginBottom: '0px',
                                              marginLeft: '0px',
                                              marginRight: '0px',
                                              marginTop: '5px',
                                              paddingBottom: '0px',
                                              paddingRight: '0px',
                                              paddingTop: '0px',
                                              textAlign: 'left',
                                            },
                                            wrapperAlign: 'left',
                                            wrapperWidth: '80px',
                                          },
                                        }}
                                        fieldProps={{
                                          'name': 'faithfulness.value',
                                          'required': true,
                                          'title': '容忍阈值设置',
                                          'x-validator': [],
                                        }}
                                        style={{ display: 'inline-block' }}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col __component_name="Col" flex="420px">
                    <Card
                      __component_name="Card"
                      actions={[]}
                      bordered={true}
                      className="index-card"
                      hoverable={true}
                      loading={false}
                      size="default"
                      style={{ marginBottom: '16px' }}
                      type="default"
                    >
                      <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                        <Col __component_name="Col" span={22}>
                          <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                            <Col __component_name="Col" span={24}>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={true}
                                        style={{ fontSize: '16' }}
                                      >
                                        知识库相关度
                                      </Typography.Text>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col __component_name="Col">
                                  <FormilySwitch
                                    __component_name="FormilySwitch"
                                    componentProps={{
                                      'x-component-props': {
                                        disabled: false,
                                        loading: false,
                                        onChange: function () {
                                          return this.onSwitchCheckChange.apply(
                                            this,
                                            Array.prototype.slice.call(arguments).concat([
                                              {
                                                type: 'context_relevancy',
                                              },
                                            ])
                                          );
                                        }.bind(this),
                                        size: 'small',
                                      },
                                    }}
                                    decoratorProps={{
                                      'x-decorator-props': {
                                        labelEllipsis: true,
                                        style: { height: '20px', marginBottom: '0px' },
                                      },
                                    }}
                                    fieldProps={{
                                      'name': 'context_relevancy.checked',
                                      'title': '',
                                      'x-pattern': '',
                                      'x-validator': [],
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>
                            <Col __component_name="Col" span={24}>
                              <Typography.Paragraph
                                code={false}
                                delete={false}
                                disabled={false}
                                editable={false}
                                ellipsis={{ rows: 2 }}
                                mark={false}
                                strong={false}
                                style={{ fontSize: '' }}
                                type="secondary"
                                underline={false}
                              >
                                衡量待测智能体的知识库与问题的相关度，阈值范围为（0,1），得分越高越好。
                              </Typography.Paragraph>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{
                                        marginBottom: '0px',
                                        marginLeft: '0px',
                                        marginRight: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '8px',
                                        paddingRight: '0px',
                                      }}
                                    >
                                      <FormilyNumberPicker
                                        __component_name="FormilyNumberPicker"
                                        componentProps={{
                                          'x-component-props': {
                                            max: 1,
                                            min: 0,
                                            placeholder: '请输入',
                                            step: __$$eval(() => 1 / 10),
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            asterisk: false,
                                            colon: false,
                                            labelAlign: 'left',
                                            labelEllipsis: false,
                                            labelWidth: '120px',
                                            size: 'default',
                                            style: {
                                              marginBottom: '0px',
                                              marginLeft: '0px',
                                              marginRight: '0px',
                                              marginTop: '5px',
                                              paddingBottom: '0px',
                                              paddingRight: '0px',
                                              paddingTop: '0px',
                                              textAlign: 'left',
                                            },
                                            wrapperAlign: 'left',
                                            wrapperWidth: '80px',
                                          },
                                        }}
                                        fieldProps={{
                                          'name': 'context_relevancy.value',
                                          'required': true,
                                          'title': '容忍阈值设置',
                                          'x-validator': [],
                                        }}
                                        style={{ display: 'inline-block' }}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                    />
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
                <Row __component_name="Row" justify="start" wrap={false}>
                  <Col __component_name="Col" flex="420px">
                    <Card
                      __component_name="Card"
                      actions={[]}
                      bordered={true}
                      className="index-card"
                      hoverable={true}
                      loading={false}
                      size="default"
                      style={{ marginBottom: '16px' }}
                      type="default"
                    >
                      <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                        <Col __component_name="Col" span={22}>
                          <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                            <Col __component_name="Col" span={24}>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={true}
                                        style={{ fontSize: '16' }}
                                      >
                                        答案相关度
                                      </Typography.Text>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col __component_name="Col">
                                  <FormilySwitch
                                    __component_name="FormilySwitch"
                                    componentProps={{
                                      'x-component-props': {
                                        disabled: true,
                                        loading: false,
                                        onChange: function () {
                                          return this.onSwitchCheckChange.apply(
                                            this,
                                            Array.prototype.slice.call(arguments).concat([
                                              {
                                                type: 'answer_relevancy',
                                              },
                                            ])
                                          );
                                        }.bind(this),
                                        size: 'small',
                                      },
                                    }}
                                    decoratorProps={{
                                      'x-decorator-props': {
                                        labelEllipsis: true,
                                        style: { height: '20px', marginBottom: '0px' },
                                      },
                                    }}
                                    fieldProps={{
                                      'name': 'answer_relevancy.checked',
                                      'title': '',
                                      'x-validator': [],
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>
                            <Col __component_name="Col" span={24}>
                              <Typography.Paragraph
                                code={false}
                                delete={false}
                                disabled={false}
                                editable={false}
                                ellipsis={{ rows: 4 }}
                                mark={false}
                                strong={false}
                                style={{ fontSize: '' }}
                                type="secondary"
                                underline={false}
                              >
                                衡量待测智能体的答案与问题的相关程度。当一个答案直接恰当地解决了最初的问题时，它就被认为是相关的；答案不完整或冗余则分数降低。该指标不考虑答案真实性，阈值范围为（0,1），得分越高越好。
                              </Typography.Paragraph>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{
                                        marginBottom: '0px',
                                        marginLeft: '0px',
                                        marginRight: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '8px',
                                        paddingRight: '0px',
                                      }}
                                    >
                                      <FormilyNumberPicker
                                        __component_name="FormilyNumberPicker"
                                        componentProps={{
                                          'x-component-props': {
                                            max: 1,
                                            min: 0,
                                            placeholder: '请输入',
                                            step: __$$eval(() => 1 / 10),
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            asterisk: false,
                                            colon: false,
                                            labelAlign: 'left',
                                            labelEllipsis: false,
                                            labelWidth: '120px',
                                            size: 'default',
                                            style: {
                                              marginBottom: '0px',
                                              marginLeft: '0px',
                                              marginRight: '0px',
                                              marginTop: '5px',
                                              paddingBottom: '0px',
                                              paddingRight: '0px',
                                              paddingTop: '0px',
                                              textAlign: 'left',
                                            },
                                            wrapperAlign: 'left',
                                            wrapperWidth: '80px',
                                          },
                                        }}
                                        fieldProps={{
                                          'name': 'answer_relevancy.value',
                                          'required': true,
                                          'title': '容忍阈值设置',
                                          'x-validator': [],
                                        }}
                                        style={{ display: 'inline-block' }}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col __component_name="Col" flex="420px">
                    <Card
                      __component_name="Card"
                      actions={[]}
                      bordered={true}
                      className="index-card"
                      hoverable={true}
                      loading={false}
                      size="default"
                      style={{ marginBottom: '16px' }}
                      type="default"
                    >
                      <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                        <Col __component_name="Col" span={22}>
                          <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                            <Col __component_name="Col" span={24}>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={true}
                                        style={{ fontSize: '16' }}
                                      >
                                        知识库精度
                                      </Typography.Text>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col __component_name="Col">
                                  <FormilySwitch
                                    __component_name="FormilySwitch"
                                    componentProps={{
                                      'x-component-props': {
                                        disabled: false,
                                        loading: false,
                                        onChange: function () {
                                          return this.onSwitchCheckChange.apply(
                                            this,
                                            Array.prototype.slice.call(arguments).concat([
                                              {
                                                type: 'context_precision',
                                              },
                                            ])
                                          );
                                        }.bind(this),
                                        size: 'small',
                                      },
                                    }}
                                    decoratorProps={{
                                      'x-decorator-props': {
                                        labelEllipsis: true,
                                        style: { height: '20px', marginBottom: '0px' },
                                      },
                                    }}
                                    fieldProps={{
                                      'name': 'context_precision.checked',
                                      'title': '',
                                      'x-validator': [],
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>
                            <Col __component_name="Col" span={24}>
                              <Typography.Paragraph
                                code={false}
                                delete={false}
                                disabled={false}
                                editable={false}
                                ellipsis={{ rows: 4 }}
                                mark={false}
                                strong={false}
                                style={{ fontSize: '' }}
                                type="secondary"
                                underline={false}
                              >
                                衡量待测智能体知识库所有与评测数据集中给定答案相关的数据是否排名更改，阈值范围为（0,1），得分越高越好。
                              </Typography.Paragraph>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{
                                        marginBottom: '0px',
                                        marginLeft: '0px',
                                        marginRight: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '8px',
                                        paddingRight: '0px',
                                      }}
                                    >
                                      <FormilyNumberPicker
                                        __component_name="FormilyNumberPicker"
                                        componentProps={{
                                          'x-component-props': {
                                            max: 1,
                                            min: 0,
                                            placeholder: '请输入',
                                            step: __$$eval(() => 1 / 10),
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            asterisk: false,
                                            colon: false,
                                            labelAlign: 'left',
                                            labelEllipsis: false,
                                            labelWidth: '120px',
                                            size: 'default',
                                            style: {
                                              marginBottom: '0px',
                                              marginLeft: '0px',
                                              marginRight: '0px',
                                              marginTop: '5px',
                                              paddingBottom: '0px',
                                              paddingRight: '0px',
                                              paddingTop: '0px',
                                              textAlign: 'left',
                                            },
                                            wrapperAlign: 'left',
                                            wrapperWidth: '80px',
                                          },
                                        }}
                                        fieldProps={{
                                          'name': 'context_precision.value',
                                          'required': true,
                                          'title': '容忍阈值设置',
                                          'x-validator': [],
                                        }}
                                        style={{ display: 'inline-block' }}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                    />
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
                <Row __component_name="Row" justify="start" wrap={false}>
                  <Col __component_name="Col" flex="420px">
                    <Card
                      __component_name="Card"
                      actions={[]}
                      bordered={true}
                      className="index-card"
                      hoverable={true}
                      loading={false}
                      size="default"
                      style={{ marginBottom: '16px' }}
                      type="default"
                    >
                      <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                        <Col __component_name="Col" span={22}>
                          <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                            <Col __component_name="Col" span={24}>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={true}
                                        style={{ fontSize: '16' }}
                                      >
                                        答案语义相似度
                                      </Typography.Text>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col __component_name="Col">
                                  <FormilySwitch
                                    __component_name="FormilySwitch"
                                    componentProps={{
                                      'x-component-props': {
                                        disabled: true,
                                        loading: false,
                                        onChange: function () {
                                          return this.onSwitchCheckChange.apply(
                                            this,
                                            Array.prototype.slice.call(arguments).concat([
                                              {
                                                type: 'answer_similarity',
                                              },
                                            ])
                                          );
                                        }.bind(this),
                                        size: 'small',
                                      },
                                    }}
                                    decoratorProps={{
                                      'x-decorator-props': {
                                        labelEllipsis: true,
                                        style: { height: '20px', marginBottom: '0px' },
                                      },
                                    }}
                                    fieldProps={{
                                      'name': 'answer_similarity.checked',
                                      'title': '',
                                      'x-validator': [],
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>
                            <Col __component_name="Col" span={24}>
                              <Typography.Paragraph
                                code={false}
                                delete={false}
                                disabled={false}
                                editable={false}
                                ellipsis={{ rows: 2 }}
                                mark={false}
                                strong={false}
                                style={{ fontSize: '' }}
                                type="secondary"
                                underline={false}
                              >
                                衡量待测智能体的答案与评测数据集中给定答案的语义相似度，阈值范围为（0,1），得分越高越好。
                              </Typography.Paragraph>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{
                                        marginBottom: '0px',
                                        marginLeft: '0px',
                                        marginRight: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '8px',
                                        paddingRight: '0px',
                                      }}
                                    >
                                      <FormilyNumberPicker
                                        __component_name="FormilyNumberPicker"
                                        componentProps={{
                                          'x-component-props': {
                                            max: 1,
                                            min: 0,
                                            placeholder: '请输入',
                                            step: __$$eval(() => 1 / 10),
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            asterisk: false,
                                            colon: false,
                                            labelAlign: 'left',
                                            labelEllipsis: false,
                                            labelWidth: '120px',
                                            size: 'default',
                                            style: {
                                              marginBottom: '0px',
                                              marginLeft: '0px',
                                              marginRight: '0px',
                                              marginTop: '5px',
                                              paddingBottom: '0px',
                                              paddingRight: '0px',
                                              paddingTop: '0px',
                                              textAlign: 'left',
                                            },
                                            wrapperAlign: 'left',
                                            wrapperWidth: '80px',
                                          },
                                        }}
                                        fieldProps={{
                                          'name': 'answer_similarity.value',
                                          'required': true,
                                          'title': '容忍阈值设置',
                                          'x-validator': [],
                                        }}
                                        style={{ display: 'inline-block' }}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                    />
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col __component_name="Col" flex="420px">
                    <Card
                      __component_name="Card"
                      actions={[]}
                      bordered={true}
                      className="index-card"
                      hoverable={true}
                      loading={false}
                      size="default"
                      style={{ marginBottom: '16px' }}
                      type="default"
                    >
                      <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                        <Col __component_name="Col" span={22}>
                          <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                            <Col __component_name="Col" span={24}>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={true}
                                        style={{ fontSize: '16' }}
                                      >
                                        知识库相似度
                                      </Typography.Text>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col __component_name="Col">
                                  <FormilySwitch
                                    __component_name="FormilySwitch"
                                    componentProps={{
                                      'x-component-props': {
                                        disabled: false,
                                        loading: false,
                                        onChange: function () {
                                          return this.onSwitchCheckChange.apply(
                                            this,
                                            Array.prototype.slice.call(arguments).concat([
                                              {
                                                type: 'context_recall',
                                              },
                                            ])
                                          );
                                        }.bind(this),
                                        size: 'small',
                                      },
                                    }}
                                    decoratorProps={{
                                      'x-decorator-props': {
                                        labelEllipsis: true,
                                        style: { height: '20px', marginBottom: '0px' },
                                      },
                                    }}
                                    fieldProps={{
                                      'name': 'context_recall.checked',
                                      'title': '',
                                      'x-validator': [],
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>
                            <Col __component_name="Col" span={24}>
                              <Typography.Paragraph
                                code={false}
                                delete={false}
                                disabled={false}
                                editable={false}
                                ellipsis={{ rows: 2 }}
                                mark={false}
                                strong={false}
                                style={{ fontSize: '' }}
                                type="secondary"
                                underline={false}
                              >
                                衡量待测智能体知识库与评测数据集中给定答案是否一致，阈值范围为（0,1），得分越高越好。
                              </Typography.Paragraph>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{
                                        marginBottom: '0px',
                                        marginLeft: '0px',
                                        marginRight: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '8px',
                                        paddingRight: '0px',
                                      }}
                                    >
                                      <FormilyNumberPicker
                                        __component_name="FormilyNumberPicker"
                                        componentProps={{
                                          'x-component-props': {
                                            max: 1,
                                            min: 0,
                                            placeholder: '请输入',
                                            step: __$$eval(() => 1 / 10),
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            asterisk: false,
                                            colon: false,
                                            labelAlign: 'left',
                                            labelEllipsis: false,
                                            labelWidth: '120px',
                                            size: 'default',
                                            style: {
                                              marginBottom: '0px',
                                              marginLeft: '0px',
                                              marginRight: '0px',
                                              marginTop: '5px',
                                              paddingBottom: '0px',
                                              paddingRight: '0px',
                                              paddingTop: '0px',
                                              textAlign: 'left',
                                            },
                                            wrapperAlign: 'left',
                                            wrapperWidth: '80px',
                                          },
                                        }}
                                        fieldProps={{
                                          'name': 'context_recall.value',
                                          'required': true,
                                          'title': '容忍阈值设置',
                                          'x-validator': [],
                                        }}
                                        style={{ display: 'inline-block' }}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                    />
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
                <Row __component_name="Row" justify="start" wrap={false}>
                  <Col __component_name="Col" flex="840px">
                    <Card
                      __component_name="Card"
                      actions={[]}
                      bordered={true}
                      className="index-card"
                      hoverable={true}
                      loading={false}
                      size="default"
                      style={{ marginBottom: '16px' }}
                      type="default"
                    >
                      <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                        <Col __component_name="Col" span={22}>
                          <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                            <Col __component_name="Col" span={24}>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={true}
                                        style={{ fontSize: '16' }}
                                      >
                                        答案正确性
                                      </Typography.Text>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col __component_name="Col">
                                  <FormilySwitch
                                    __component_name="FormilySwitch"
                                    componentProps={{
                                      'x-component-props': {
                                        disabled: true,
                                        loading: false,
                                        onChange: function () {
                                          return this.onSwitchCheckChange.apply(
                                            this,
                                            Array.prototype.slice.call(arguments).concat([
                                              {
                                                type: 'answer_correctness',
                                              },
                                            ])
                                          );
                                        }.bind(this),
                                        size: 'small',
                                      },
                                    }}
                                    decoratorProps={{
                                      'x-decorator-props': {
                                        labelEllipsis: true,
                                        style: { height: '20px', marginBottom: '0px' },
                                      },
                                    }}
                                    fieldProps={{
                                      'name': 'answer_correctness.checked',
                                      'title': '',
                                      'x-validator': [],
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>
                            <Col __component_name="Col" span={24}>
                              <Typography.Paragraph
                                code={false}
                                delete={false}
                                disabled={false}
                                editable={false}
                                ellipsis={{ rows: 4 }}
                                mark={false}
                                strong={false}
                                style={{ fontSize: '' }}
                                type="secondary"
                                underline={false}
                              >
                                衡量待测智能体的答案与评测数据集中给定答案的准确性，阈值范围为（0,1），得分越高越好。此项指标包含两个计分项：语义相似性、事实相似性，可手动配置两项计分项的权重。
                              </Typography.Paragraph>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col">
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{
                                        marginBottom: '0px',
                                        marginLeft: '0px',
                                        marginRight: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '8px',
                                        paddingRight: '0px',
                                      }}
                                    >
                                      <FormilyNumberPicker
                                        __component_name="FormilyNumberPicker"
                                        componentProps={{
                                          'x-component-props': {
                                            max: 1,
                                            min: 0,
                                            placeholder: '请输入',
                                            step: __$$eval(() => 1 / 10),
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            asterisk: false,
                                            colon: false,
                                            labelAlign: 'left',
                                            labelEllipsis: false,
                                            labelWidth: '120px',
                                            size: 'default',
                                            style: {
                                              marginBottom: '0px',
                                              marginLeft: '0px',
                                              marginRight: '0px',
                                              marginTop: '5px',
                                              paddingBottom: '0px',
                                              paddingRight: '0px',
                                              paddingTop: '0px',
                                              textAlign: 'left',
                                            },
                                            wrapperAlign: 'left',
                                            wrapperWidth: '80px',
                                          },
                                        }}
                                        fieldProps={{
                                          'name': 'answer_correctness.value',
                                          'required': true,
                                          'title': '容忍阈值设置',
                                          'x-validator': [],
                                        }}
                                        style={{ display: 'inline-block' }}
                                      />
                                    </Col>
                                  </Row>
                                  <Row __component_name="Row" justify="space-between" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      style={{
                                        marginBottom: '0px',
                                        marginLeft: '0px',
                                        marginRight: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '8px',
                                        paddingRight: '0px',
                                      }}
                                    />
                                  </Row>
                                </Col>
                              </Row>
                              <Row __component_name="Row" wrap={true}>
                                <Col __component_name="Col" span={24}>
                                  <Row __component_name="Row" wrap={false}>
                                    <Col
                                      __component_name="Col"
                                      flex="120px"
                                      style={{ lineHeight: '32px' }}
                                    >
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={false}
                                        style={{ fontSize: '' }}
                                      >
                                        权重分配
                                      </Typography.Text>
                                    </Col>
                                    <Col __component_name="Col" flex="auto">
                                      <Row __component_name="Row" wrap={true}>
                                        <Col __component_name="Col" span={24}>
                                          <Row
                                            __component_name="Row"
                                            justify="space-between"
                                            wrap={false}
                                          >
                                            <Col __component_name="Col">
                                              <Row
                                                __component_name="Row"
                                                gutter={[null, 0]}
                                                justify="start"
                                                wrap={false}
                                              >
                                                <Col
                                                  __component_name="Col"
                                                  style={{
                                                    marginBottom: '0px',
                                                    marginRight: '0px',
                                                    paddingBottom: '0px',
                                                    paddingLeft: '8px',
                                                    paddingRight: '0px',
                                                  }}
                                                >
                                                  <FormilyNumberPicker
                                                    __component_name="FormilyNumberPicker"
                                                    componentProps={{
                                                      'x-component-props': {
                                                        max: 100,
                                                        min: 0,
                                                        onChange: function () {
                                                          return this.onValueChange.apply(
                                                            this,
                                                            Array.prototype.slice
                                                              .call(arguments)
                                                              .concat([
                                                                {
                                                                  type: 'semantic',
                                                                },
                                                              ])
                                                          );
                                                        }.bind(this),
                                                        placeholder: '请输入',
                                                      },
                                                    }}
                                                    decoratorProps={{
                                                      'x-decorator-props': {
                                                        asterisk: true,
                                                        colon: false,
                                                        labelAlign: 'left',
                                                        labelEllipsis: false,
                                                        labelWidth: '80px',
                                                        size: 'default',
                                                        style: {
                                                          marginBottom: '0px',
                                                          marginLeft: '0px',
                                                          marginRight: '0px',
                                                          marginTop: '5px',
                                                          paddingBottom: '0px',
                                                          paddingRight: '0px',
                                                          paddingTop: '0px',
                                                          textAlign: 'left',
                                                        },
                                                        wrapperAlign: 'left',
                                                        wrapperWidth: '80px',
                                                      },
                                                    }}
                                                    fieldProps={{
                                                      'name': 'semantic',
                                                      'required': true,
                                                      'title': '语义相关性',
                                                      'x-validator': [],
                                                    }}
                                                    style={{ display: 'inline-block' }}
                                                  />
                                                </Col>
                                                <Col
                                                  __component_name="Col"
                                                  style={{
                                                    lineHeight: '32px',
                                                    marginBottom: '0px',
                                                    marginLeft: '0px',
                                                    marginRight: '0px',
                                                    paddingBottom: '0px',
                                                    paddingLeft: '0px',
                                                    paddingRight: '0px',
                                                  }}
                                                />
                                                <Col
                                                  __component_name="Col"
                                                  style={{
                                                    lineHeight: '37px',
                                                    marginBottom: '0px',
                                                    marginLeft: '0px',
                                                    paddingBottom: '0px',
                                                    paddingLeft: '0px',
                                                  }}
                                                >
                                                  <Typography.Text
                                                    __component_name="Typography.Text"
                                                    disabled={false}
                                                    ellipsis={true}
                                                    strong={false}
                                                    style={{ fontSize: '', paddingLeft: '5px' }}
                                                  >
                                                    %
                                                  </Typography.Text>
                                                </Col>
                                              </Row>
                                            </Col>
                                            <Col __component_name="Col">
                                              <Row
                                                __component_name="Row"
                                                gutter={[null, 0]}
                                                justify="space-around"
                                                wrap={false}
                                              >
                                                <Col
                                                  __component_name="Col"
                                                  style={{
                                                    marginBottom: '0px',
                                                    marginRight: '0px',
                                                    paddingBottom: '0px',
                                                    paddingLeft: '8px',
                                                    paddingRight: '0px',
                                                  }}
                                                >
                                                  <FormilyNumberPicker
                                                    __component_name="FormilyNumberPicker"
                                                    componentProps={{
                                                      'x-component-props': {
                                                        max: 100,
                                                        min: 0,
                                                        onChange: function () {
                                                          return this.onValueChange.apply(
                                                            this,
                                                            Array.prototype.slice
                                                              .call(arguments)
                                                              .concat([
                                                                {
                                                                  type: 'factuality',
                                                                },
                                                              ])
                                                          );
                                                        }.bind(this),
                                                        placeholder: '请输入',
                                                      },
                                                    }}
                                                    decoratorProps={{
                                                      'x-decorator-props': {
                                                        asterisk: true,
                                                        colon: false,
                                                        labelAlign: 'left',
                                                        labelEllipsis: false,
                                                        labelWidth: '80px',
                                                        size: 'default',
                                                        style: {
                                                          marginBottom: '0px',
                                                          marginRight: '0px',
                                                          marginTop: '5px',
                                                          paddingBottom: '0px',
                                                          paddingRight: '0px',
                                                          paddingTop: '0px',
                                                          textAlign: 'left',
                                                        },
                                                        wrapperAlign: 'left',
                                                        wrapperWidth: '80px',
                                                      },
                                                    }}
                                                    fieldProps={{
                                                      'name': 'factuality',
                                                      'required': true,
                                                      'title': '事实相似性',
                                                      'x-validator': [],
                                                    }}
                                                    style={{}}
                                                  />
                                                </Col>
                                                <Col
                                                  __component_name="Col"
                                                  style={{
                                                    lineHeight: '32px',
                                                    marginBottom: '0px',
                                                    marginLeft: '0px',
                                                    marginRight: '0px',
                                                    paddingBottom: '0px',
                                                    paddingLeft: '0px',
                                                    paddingRight: '0px',
                                                  }}
                                                />
                                                <Col
                                                  __component_name="Col"
                                                  style={{
                                                    lineHeight: '37px',
                                                    marginBottom: '0px',
                                                    marginLeft: '0px',
                                                    paddingBottom: '0px',
                                                    paddingLeft: '0px',
                                                  }}
                                                >
                                                  <Typography.Text
                                                    __component_name="Typography.Text"
                                                    disabled={false}
                                                    ellipsis={true}
                                                    strong={false}
                                                    style={{ fontSize: '', paddingLeft: '5px' }}
                                                  >
                                                    %
                                                  </Typography.Text>
                                                </Col>
                                              </Row>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                              <Row __component_name="Row" justify="start" wrap={false}>
                                <Col __component_name="Col">
                                  <Row
                                    __component_name="Row"
                                    gutter={[null, 0]}
                                    justify="start"
                                    wrap={false}
                                  >
                                    <Col
                                      __component_name="Col"
                                      style={{
                                        lineHeight: '37px',
                                        marginBottom: '0px',
                                        marginLeft: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '0px',
                                      }}
                                    />
                                    <Col
                                      __component_name="Col"
                                      style={{
                                        lineHeight: '37px',
                                        marginBottom: '0px',
                                        marginLeft: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '0px',
                                      }}
                                    />
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row __component_name="Row" wrap={true}>
              <Col __component_name="Col" flex="520px">
                <FormilySelect
                  __component_name="FormilySelect"
                  componentProps={{
                    'x-component-props': {
                      _sdkSwrGetFunc: __$$eval(() => this.state.dataSetDataList),
                      _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ExpressionSetter',
                      allowClear: false,
                      disabled: false,
                      onChange: function () {
                        return this.onDataSetChange.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                      placeholder: '请选择数据集',
                      showSearch: true,
                    },
                  }}
                  decoratorProps={{
                    'x-decorator-props': {
                      labelEllipsis: true,
                      labelWidth: '120px',
                      wrapperWidth: '400px',
                    },
                  }}
                  fieldProps={{
                    '_unsafe_MixedSetter_enum_select': 'ExpressionSetter',
                    'enum': null,
                    'name': 'data_set_name',
                    'required': true,
                    'title': '评测数据集',
                    'x-validator': [],
                  }}
                  style={{}}
                />
              </Col>
              <Col __component_name="Col" flex="300px">
                <FormilySelect
                  __component_name="FormilySelect"
                  componentProps={{
                    'x-component-props': {
                      _sdkSwrGetFunc: {},
                      _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ObjectSetter',
                      allowClear: false,
                      disabled: false,
                      onChange: function () {
                        return this.onDataSetVersionChange.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                      placeholder: '请选择数据集版本',
                      showSearch: true,
                    },
                  }}
                  decoratorProps={{
                    'x-decorator-props': { labelEllipsis: true, wrapperWidth: '400px' },
                  }}
                  fieldProps={{
                    '_unsafe_MixedSetter_enum_select': 'ExpressionSetter',
                    'enum': null,
                    'name': 'data_set_version',
                    'required': true,
                    'title': '',
                    'x-validator': [],
                  }}
                />
              </Col>
            </Row>
            <Row
              __component_name="Row"
              style={{ marginBottom: '0px', paddingBottom: '0px' }}
              wrap={true}
            >
              <Col __component_name="Col" flex="120px" />
              <Col __component_name="Col" span={19} style={{}}>
                <Row __component_name="Row" wrap={true}>
                  <Col __component_name="Col" span={24}>
                    <Row
                      __component_name="Row"
                      justify="space-between"
                      style={{ width: '840px' }}
                      wrap={false}
                    >
                      <Col __component_name="Col">
                        <Input.Search
                          __component_name="Input.Search"
                          onSearch={function () {
                            return this.onSearch.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          placeholder="请输入"
                          style={{ width: '400px' }}
                        />
                      </Col>
                      <Col __component_name="Col">
                        <Space __component_name="Space" align="center" direction="horizontal">
                          <Row __component_name="Row" justify="space-between" wrap={false}>
                            <Col __component_name="Col">
                              <Pagination
                                __component_name="Pagination"
                                current={__$$eval(
                                  () => this.state.dataSetFileSearchParams.currentPage
                                )}
                                onChange={function () {
                                  return this.onPageChange.apply(
                                    this,
                                    Array.prototype.slice.call(arguments).concat([])
                                  );
                                }.bind(this)}
                                onShowSizeChange={function () {
                                  return this.onPageChange.apply(
                                    this,
                                    Array.prototype.slice.call(arguments).concat([])
                                  );
                                }.bind(this)}
                                pageSize={__$$eval(
                                  () => this.state.dataSetFileSearchParams.pageSize
                                )}
                                showTotal={function () {
                                  return this.showTotal.apply(
                                    this,
                                    Array.prototype.slice.call(arguments).concat([])
                                  );
                                }.bind(this)}
                                simple={false}
                                style={{ textAlign: 'right' }}
                                total={__$$eval(() => this.state.dataSetFileTotal)}
                              />
                            </Col>
                          </Row>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Table
                  __component_name="Table"
                  bordered={false}
                  columns={[
                    { dataIndex: 'path', key: 'name', title: '文件名称' },
                    {
                      dataIndex: 'fileType',
                      render: (text, record, index) =>
                        (__$$context => (
                          <Typography.Text
                            __component_name="Typography.Text"
                            disabled={false}
                            ellipsis={true}
                            strong={false}
                            style={{ fontSize: '' }}
                          >
                            {__$$eval(() => text || '-')}
                          </Typography.Text>
                        ))(__$$createChildContext(__$$context, { text, record, index })),
                      title: '标签',
                      width: 120,
                    },
                    { dataIndex: 'size', key: 'size', title: '文件大小', width: 100 },
                    { dataIndex: 'count', title: '数据量' },
                  ]}
                  dataSource={__$$eval(() => this.state.dataSetFileList)}
                  expandable={{ expandedRowRender: '' }}
                  loading={__$$eval(() => this.state.fileTableLoading)}
                  pagination={false}
                  rowKey="path"
                  rowSelection={{
                    onChange: function () {
                      return this.onSelectFileChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this),
                    selectedRowKeys: __$$eval(() => this.state.selectedFileList),
                    type: 'checkbox',
                  }}
                  scroll={{ scrollToFirstRowOnChange: true }}
                  showHeader={true}
                  size="default"
                  style={{ width: '820px' }}
                />
              </Col>
            </Row>
            {!!__$$eval(() => this.state.fileSelectCheckErrorFlag) && (
              <Row
                __component_name="Row"
                style={{ marginBottom: '0px', paddingBottom: '0px' }}
                wrap={true}
              >
                <Col __component_name="Col" flex="120px" />
                <Col __component_name="Col" span={19} style={{}}>
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={24}>
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ color: '#d0021b', fontSize: '' }}
                      >
                        请选择文件
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </FormilyForm>
          <Divider
            __component_name="Divider"
            dashed={false}
            defaultOpen={false}
            mode="line"
            style={{ height: '1px', marginBottom: '0px', marginTop: '0px' }}
          />
          <Row __component_name="Row" style={{ marginLeft: '0px', marginRight: '0px' }} wrap={true}>
            <Col
              __component_name="Col"
              flex="140px"
              style={{
                display: 'inline',
                marginLeft: '0px',
                marginRight: '0px',
                paddingBottom: '16px',
                paddingTop: '16px',
                textAlign: 'center',
              }}
            />
            <Col
              __component_name="Col"
              span={6}
              style={{
                display: 'inline',
                marginLeft: '0px',
                marginRight: '0px',
                paddingBottom: '16px',
                paddingTop: '16px',
                textAlign: 'left',
              }}
            >
              <Button
                __component_name="Button"
                block={false}
                danger={false}
                disabled={false}
                ghost={false}
                loading={__$$eval(() => this.state.loading)}
                onClick={function () {
                  return this.onFinish.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
                shape="default"
                type="primary"
              >
                创建
              </Button>
              <Button
                __component_name="Button"
                block={false}
                danger={false}
                disabled={false}
                ghost={false}
                shape="default"
                style={{ marginLeft: '12px' }}
              >
                取消
              </Button>
            </Col>
          </Row>
        </Card>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/ai-agent-assessment/create' }, location.pathname);
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
        <CreateAiAgentAssessment$$Page
          {...props}
          {...dataProps}
          self={self}
          appHelper={appHelper}
        />
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
