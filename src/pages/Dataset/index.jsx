// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  FormilyForm,
  FormilyRadio,
  FormilySelect,
  Row,
  Col,
  Typography,
  FormilyNumberPicker,
  FormilyFormItem,
  FormilyTextArea,
  FormilySwitch,
  Alert,
  Card,
  Space,
  Button,
  Input,
  Select,
  List,
  Collapse,
  Image,
  Tag,
  Divider,
} from '@tenx-ui/materials';

import LccComponentQlsmm from 'KubeAGIUpload';

import LccComponentSbva0 from 'confirm';

import {
  AntdIconPlusOutlined,
  TenxIconRefresh,
  AntdIconDeleteOutlined,
} from '@tenx-ui/icon-materials';

import LccComponentNy419 from 'dataset-version-list';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class Dataset$$Page extends React.Component {
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
      addFileData: {},
      addFileDatasource: undefined,
      addFileDataSourceList: [],
      addFileLoading: false,
      addFileLocal: true,
      addFileVisible: false,
      addVersion: {
        visible: false,
        data: {},
      },
      clearFile: false,
      confirm: {},
      data: [],
      field: undefined,
      loading: false,
      page: 1,
      pageSize: 10,
      search: undefined,
      totalCount: 0,
      type: undefined,
    };

    // 代码中有些 Ds 是 Dataset的简写
    this._fetchData = this.utils._.debounce(this.fetchData, 500);
    this.fileUploadSuccessList = [];
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {}

  addFileOk() {
    if (!this.state.addFileLocal) {
      return this.addOnline();
    }
    if (this.state.upload.uploadThis?.state?.fileList?.length) {
      this.setState({
        addFileLoading: true,
      });
    }
    const fetch = async () => {
      try {
        this.doUpload();
      } catch (e) {}
    };
    this.form('add_file')?.submit(fetch);
  }

  addOnline() {
    const fetch = async values => {
      const res = this.utils.axios
        .post(
          `${this.constants.FILES_API_ORIGIN}/kubeagi-apis/bff/versioneddataset/files/webcrawler`,
          {
            datasource: values.datasource,
            versioneddataset: this.state.addFileData.version,
            params: {
              interval_time: values.interval_time,
              max_count: 1000,
              max_depth: parseInt(values.max_depth),
            },
          },
          {
            headers: {
              Authorization: this.utils.getAuthorization(),
              namespace: this.utils.getAuthData?.()?.project,
            },
          }
        )
        .then(res => {
          if (res?.data?.object) {
            this.utils.notification.success({
              message: '新增在线数据成功',
            });
            this.refresh();
            this.setState({
              addFileDatasource: undefined,
              addFileLoading: false,
              addFileVisible: false,
              addFileLocal: true,
            });
            this.clearFileBuffer();
          }
        });
      // .catch(e => {
      //   this.utils.notification.warn({
      //     message: '新增在线数据失败1',
      //   });
      // });
    };

    this.form('add_file').submit(fetch);
  }

  addVersion(event, params) {
    event.stopPropagation();
    this.setState({
      addVersion: {
        visible: true,
        data: params.data,
      },
    });
  }

  async addVersionFetch() {
    const _version =
      'v' + (this.getVersionsNumMax(this.state.addVersion.data?.versions?.nodes || []) + 1);
    const payload = {
      input: {
        name: this.state.addVersion.data?.name + '-' + _version,
        namespace: this.state.addVersion.data?.namespace,
        datasetName: this.state.addVersion.data?.name,
        displayName: '',
        description: this.form().values.description,
        inheritedFrom: this.form().values.inheritedFrom,
        version: _version,
        released: 0,
      },
    };
    const res = await this.utils.bff.createVersionedDataset(payload).catch(e => {
      this.utils.notification.warn({
        message: '新增数据集版本失败',
      });
    });
    if (res?.VersionedDataset?.createVersionedDataset?.name) {
      this.utils.notification.success({
        message: '新增数据集版本成功',
      });
      this.onAddVersionCancel();
      this.fetchData();
    }
  }

  async asyncFunc(error) {
    const res = await new Promise((res, rej) => {
      setTimeout(() => {
        error ? rej('error') : res('ok');
      }, 1000);
    });
    return res;
  }

  clearFileBuffer() {
    this.setState(
      {
        clearFile: true,
      },
      () => {
        this.setState({
          clearFile: false,
        });
      }
    );
  }

  delVersion(params) {
    this.setState({
      confirm: {
        id: new Date().getTime(),
        title: '删除数据集版本',
        content: `确定删除数据集：${params.dataset.name}-${params.version.version}？`,
        onOk: async () => {
          const res = await this.utils.bff
            .deleteVersionedDatasets({
              input: {
                namespace: params.dataset.namespace,
                name: params.version.name,
              },
            })
            .catch(e => {
              this.utils.notification.warn({
                message: '删除数据集版本失败',
              });
            });
          this.utils.notification.success({
            message: '删除数据集版本成功',
          });
          this.fetchData();
        },
      },
    });
  }

  doUpload() {
    this.state.upload?.uploadThis?.state?.fileList?.forEach(file => {
      this.state.upload?.uploadThis?.computeMD5(file);
    });
  }

  async fetchData() {
    this.setState({
      loading: true,
    });
    const labelSelector = (() => {
      if (!this.state.type && !this.state.field) {
        return undefined;
      }
      if (this.state.type && this.state.field) {
        return `arcadia.kubeagi.k8s.com.cn/content-type=${this.state.type},arcadia.kubeagi.k8s.com.cn/field=${this.state.field}`;
      }
      return `arcadia.kubeagi.k8s.com.cn/${
        this.state.type ? 'content-type=' + this.state.type : 'field=' + this.state.field
      }`;
    })();
    const res = await this.utils.bff
      .listDatasets({
        input: {
          labelSelector,
          keyword: this.state.search,
          namespace: this.appHelper.utils.getAuthData().project,
          pageSize: this.state.pageSize,
          page: this.state.page,
        },
        versionsInput: {
          namespace: this.appHelper.utils.getAuthData().project,
          pageSize: 1000,
          page: 1,
        },
        filesInput: {
          keyword: '',
          pageSize: 1,
          page: 1,
        },
      })
      .catch(e => {
        this.setState({
          loading: false,
        });
      });
    this.setState({
      data: res?.Dataset?.listDatasets?.nodes,
      totalCount: res?.Dataset?.listDatasets?.totalCount,
      loading: false,
    });
  }

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  getAddFileDatasourceUrl() {
    const res =
      this.state.addFileDataSourceList.filter(
        item => item.value === this.state.addFileDatasource
      ) || [];
    return res[0].endpoint?.url;
  }

  getBucketPath() {
    return `dataset/${this.state.addFileData.dataset}/${this.state.addFileData.version}`;
  }

  async getDataSource() {
    const res = await this.utils.bff.listDatasources({
      input: {
        page: 1,
        pageSize: 10000,
        namespace: this.utils.getAuthData().project,
      },
    });
    this.setState({
      addFileDataSourceList: res?.Datasource?.listDatasources?.nodes
        ?.filter(item => {
          return item.type === 'web';
        })
        .map(item => ({
          ...item,
          label: item.name,
          value: item.name,
        })),
    });
  }

  getVersionsNumMax(versions) {
    return Math.max(...versions.map(v => parseInt(v?.version?.match(/\d+/)?.[0] || '0')), 0);
  }

  handleCancle() {
    this.setState({
      addFileVisible: false,
    });
  }

  handleReUpload() {
    this.setState({
      addFileLoading: false,
    });
    if (!(this.state.upload?.uploadThis?.state?.fileList?.length > 0)) {
      this.handleCancle();
      return;
    }
    this.doUpload();
  }

  handleUploadFinished(file, res) {
    this.setFileUploadStatus(file);
    this.utils.notification.success({
      message: '新增文件成功',
    });
    this.refresh();
  }

  handleUploadSuccess() {
    this.setState({
      addFileVisible: false,
    });
  }

  linkClick(event) {
    event.stopPropagation();
  }

  onAddFileTypeChange(v) {
    this.setState({
      addFileLocal: v.target.value === 'local',
    });
  }

  onAddVersionCancel() {
    // 点击遮罩层或右上角叉或取消按钮的回调
    this.setState({
      addVersion: {
        visible: false,
        data: {},
      },
    });
  }

  onAddVersionOK() {
    // 点击遮罩层或右上角叉或取消按钮的回调
    this.form()
      .validate()
      .then(this.addVersionFetch.bind(this))
      .catch(e => {
        console.error('onAddVersion error:', e);
      });
  }

  onClick(event) {
    // 点击按钮时的回调
  }

  onDatasourceChange(v) {
    this.setState({
      addFileDatasource: v,
    });
  }

  onDelDataset(event, params) {
    event.stopPropagation();
    this.setState({
      confirm: {
        id: new Date().getTime(),
        title: '删除数据集',
        content: `确定删除数据集：${params.item.name}？`,
        onOk: async () => {
          const res = await this.utils.bff
            .deleteDatasets({
              input: {
                namespace: params.item.namespace,
                name: params.item.name,
              },
            })
            .catch(e => {
              this.utils.notification.warn({
                message: '删除数据集失败',
              });
            });
          this.utils.notification.success({
            message: '删除数据集成功',
          });
          this.fetchData();
        },
      },
    });
  }

  onDropdownClick(event, params) {
    if (event.key === 'delete') {
      return this.delVersion(params);
    }
    if (event.key === 'release') {
      return this.release(params);
    }
  }

  onFieldChange(event) {
    // 输入框内容变化时的回调
    this.setState(
      {
        field: event,
      },
      this.fetchData
    );
  }

  onFileUploaded(file) {
    this.setFileUploadStatus(file);
    this.utils.notification.success({
      message: `文件 ${file.name} 已经存在，无需再次上传`,
    });
    this.handleCancle();
  }

  onImportDataClick(params) {
    console.log('onClick', params);
    this.setState({
      addFileVisible: true,
      addFileData: {
        dataset: params.dataset.name,
        version: params.version.version,
      },
    });
  }

  onPageChange(page, pageSize) {
    // 页码或 pageSize 改变的回调
    this.setState(
      {
        page,
        pageSize,
      },
      this.fetchData
    );
  }

  onSearchChange(event) {
    // 输入框内容变化时的回调
    this.setState(
      {
        search: event.target.value,
      },
      this._fetchData
    );
  }

  onShowTrustModal() {
    this.setState({
      addFileLoading: false,
    });
  }

  onTypeChange(event) {
    // 输入框内容变化时的回调
    this.setState(
      {
        type: event,
      },
      this.fetchData
    );
  }

  refresh(event) {
    event?.stopPropagation();
    this.fetchData();
  }

  release(params) {
    this.setState({
      confirm: {
        id: new Date().getTime(),
        title: '发布数据集',
        content: `数据发布后不可更改，确定发布：${params.dataset.name}-${params.version.version}？`,
        onOk: async () => {
          const res = await this.utils.bff
            .updateVersionedDataset({
              input: {
                namespace: params.dataset.namespace,
                name: params.version.name,
                released: 1,
              },
            })
            .then(res => {
              this.utils.notification.success({
                message: '发布数据集版本成功',
              });
              this.fetchData();
            })
            .catch(e => {
              this.utils.notification.warn({
                message: '发布数据集版本失败',
              });
            });
        },
      },
    });
  }

  setFileUploadStatus(file) {
    this.fileUploadSuccessList.push(file);
    this.refresh();
    if (
      this.state.upload.uploadThis?.state?.fileList?.length === this.fileUploadSuccessList.length
    ) {
      this.fileUploadSuccessList = [];
      this.state.upload.uploadThis?.state?.fileList?.length >= 2 &&
      this.utils.notification.success({
        message: '所有文件上传完成',
      });
      this.clearFileBuffer();
      this.setState({
        addFileLoading: false,
      });
    }
  }

  setUploadState(state) {
    this.setState({
      upload: {
        ...this.state.upload,
        ...state,
      },
    });
  }

  showTotal(total, range) {
    // 用于格式化显示表格数据总量
    return `共 ${total} 条`;
  }

  testFunc() {
    return <div className="test-aliLowcode-func">{this.state.test}</div>;
  }

  toDetail(event, params) {
    this.history.push(`/dataset/detail/${params.datasetName}/version/${params.versionName}`);
  }

  componentDidMount() {
    this.fetchData();
    console.log('didmount', this.constants.DATASET_DATA);
    this.getDataSource();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        {!!__$$eval(() => !this.state.clearFile) && (
          <Modal
            __component_name="Modal"
            centered={false}
            confirmLoading={__$$eval(() => this.state.addFileLoading)}
            destroyOnClose={false}
            forceRender={false}
            keyboard={true}
            mask={true}
            maskClosable={false}
            onCancel={function () {
              return this.handleCancle.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            onOk={function () {
              return this.addFileOk.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            open={__$$eval(() => this.state.addFileVisible)}
            title="新增文件"
            width="650px"
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
                initialValues: __$$eval(() => ({
                  source: 'local',
                  datasource: undefined,
                })),
              }}
              formHelper={{ autoFocus: true }}
              ref={this._refsManager.linkRef('add_file')}
            >
              <FormilyRadio
                __component_name="FormilyRadio"
                componentProps={{
                  'x-component-props': {
                    _sdkSwrGetFunc: {},
                    buttonStyle: 'outline',
                    disabled: false,
                    onChange: function () {
                      return this.onAddFileTypeChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this),
                    optionType: 'default',
                    size: 'middle',
                  },
                }}
                decoratorProps={{ 'x-decorator-props': { labelCol: 5, labelEllipsis: true } }}
                fieldProps={{
                  '_unsafe_MixedSetter_default_select': 'VariableSetter',
                  'enum': [
                    { label: '本地文件', value: 'local' },
                    { label: '在线数据', value: 'online' },
                  ],
                  'name': 'source',
                  'title': '文件来源',
                  'x-validator': [],
                }}
              />
              {!!__$$eval(() => this.state.addFileLocal) && (
                <LccComponentQlsmm
                  __component_name="LccComponentQlsmm"
                  accept=".txt,.doc,.docx,.pdf,.md"
                  Authorization={__$$eval(() => this.utils.getAuthorization())}
                  bucket={__$$eval(() => this.utils.getAuthData()?.project)}
                  calcUploadedFile={function () {
                    return this.onFileUploaded.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  contentWidth="520px"
                  getBucketPath={function () {
                    return this.getBucketPath.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  handleFinished={function () {
                    return this.handleUploadFinished.apply(
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
                    return this.handleUploadSuccess.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  multiple={true}
                  onShowTrustModal={function () {
                    return this.onShowTrustModal.apply(
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
              {!!__$$eval(() => !this.state.addFileLocal) && (
                <FormilySelect
                  __component_name="FormilySelect"
                  componentProps={{
                    'x-component-props': {
                      _sdkSwrGetFunc: {},
                      allowClear: false,
                      disabled: false,
                      onChange: function () {
                        return this.onDatasourceChange.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                      placeholder: '请选择数据源',
                    },
                  }}
                  decoratorProps={{
                    'x-decorator-props': {
                      labelCol: 5,
                      labelEllipsis: true,
                      tooltip: '仅展示“网站”类型数据源',
                    },
                  }}
                  fieldProps={{
                    '_unsafe_MixedSetter_default_select': 'VariableSetter',
                    '_unsafe_MixedSetter_enum_select': 'ExpressionSetter',
                    'default': undefined,
                    'enum': __$$eval(() => this.state.addFileDataSourceList),
                    'name': 'datasource',
                    'required': true,
                    'title': '数据源',
                    'x-validator': [],
                  }}
                />
              )}
              {!!__$$eval(() => this.state.addFileDatasource && !this.state.addFileLocal) && (
                <Row
                  __component_name="Row"
                  style={{ marginBottom: '8px', marginTop: '-18px' }}
                  wrap={false}
                >
                  <Col __component_name="Col" flex="130px">
                    <Typography.Text
                      __component_name="Typography.Text"
                      children=""
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    />
                  </Col>
                  <Col __component_name="Col" flex="auto">
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      {__$$eval(() => this.getAddFileDatasourceUrl())}
                    </Typography.Text>
                  </Col>
                </Row>
              )}
              {!!__$$eval(() => !this.state.addFileLocal) && (
                <FormilySelect
                  __component_name="FormilySelect"
                  componentProps={{
                    'x-component-props': {
                      _sdkSwrGetFunc: {},
                      allowClear: false,
                      disabled: false,
                      placeholder: '请选择页面层级',
                    },
                  }}
                  decoratorProps={{
                    'x-decorator-props': {
                      labelCol: 5,
                      labelEllipsis: true,
                      tooltip:
                        '网页中嵌入了其他链接是常见的，如：一级页面提供二级页面的访问链接，二级页面作为详情页提供所需数据。配置获取页面层级，平台将会根据配置进行页面内容获取，最多设置 5 层。',
                    },
                  }}
                  fieldProps={{
                    'default': '1',
                    'enum': [
                      {
                        children: '未知',
                        id: 'disabled',
                        label: '1',
                        type: 'disabled',
                        value: '1',
                      },
                      {
                        children: '未知',
                        id: 'disabled',
                        label: '2',
                        type: 'disabled',
                        value: '2',
                      },
                      {
                        children: '未知',
                        id: 'disabled',
                        label: '3',
                        type: 'disabled',
                        value: '3',
                      },
                      {
                        children: '未知',
                        id: 'disabled',
                        label: '4',
                        type: 'disabled',
                        value: '4',
                      },
                      {
                        _unsafe_MixedSetter_value_select: 'NumberSetter',
                        children: '未知',
                        id: 'disabled',
                        label: '5',
                        type: 'disabled',
                        value: 5,
                      },
                    ],
                    'name': 'max_depth',
                    'required': true,
                    'title': '获取页面层级',
                    'x-validator': [],
                  }}
                />
              )}
              {!!__$$eval(() => !this.state.addFileLocal) && (
                <FormilyNumberPicker
                  __component_name="FormilyNumberPicker"
                  componentProps={{
                    'x-component-props': {
                      addonAfter: 'ms',
                      min: 1000,
                      placeholder: '请输入时间间隔',
                    },
                  }}
                  decoratorProps={{
                    'x-decorator-props': {
                      fullness: true,
                      labelCol: 5,
                      labelEllipsis: true,
                      labelWidth: '',
                      tooltip: '获取每个页面数据的间隔时间，不建议过于频繁地获取页面内容。',
                      tooltipLayout: 'icon',
                      wrapperWidth: '',
                    },
                  }}
                  fieldProps={{
                    '_unsafe_MixedSetter_default_select': 'VariableSetter',
                    'default': 1000,
                    'description': '',
                    'name': 'interval_time',
                    'required': true,
                    'title': '间隔时间',
                    'x-validator': [],
                  }}
                />
              )}
            </FormilyForm>
          </Modal>
        )}
        {!!__$$eval(() => this.state.addVersion.visible) && (
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
              return this.onAddVersionCancel.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            onOk={function () {
              return this.onAddVersionOK.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            open={true}
            title={this.i18n('i18n-wgpt60zj') /* 新增版本 */}
          >
            <Row __component_name="Row" justify="space-between" wrap={false}>
              <Col __component_name="Col" span={4} style={{ marginLeft: '8px' }}>
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '' }}
                >
                  数据集名称
                </Typography.Text>
              </Col>
              <Col __component_name="Col" span={20}>
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '', paddingLeft: '8px' }}
                >
                  {__$$eval(() => this.utils.getFullName(this.state.addVersion.data))}
                </Typography.Text>
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
              createFormProps={{
                initialValues: __$$eval(() => ({
                  inheritedFromSwitch: !!this.state.addVersion.data?.versions.nodes.length,
                })),
              }}
              formHelper={{ autoFocus: true }}
              ref={this._refsManager.linkRef('formily_create')}
            >
              <FormilyFormItem
                __component_name="FormilyFormItem"
                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                fieldProps={{
                  'name': 'FormilyFormItem',
                  'title': '数据集版本',
                  'type': 'object',
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
                  {__$$eval(
                    () =>
                      'v' + (this.getVersionsNumMax(this.state.addVersion.data?.versions.nodes) + 1)
                  )}
                </Typography.Text>
              </FormilyFormItem>
              <FormilyTextArea
                __component_name="FormilyTextArea"
                componentProps={{ 'x-component-props': { placeholder: '请输入描述' } }}
                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                fieldProps={{
                  'name': 'description',
                  'title': '版本描述',
                  'x-component': 'Input.TextArea',
                  'x-validator': [],
                }}
              />
              <FormilySwitch
                __component_name="FormilySwitch"
                componentProps={{ 'x-component-props': { disabled: false, loading: false } }}
                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                fieldProps={{
                  'name': 'inheritedFromSwitch',
                  'title': '继承历史版本',
                  'x-validator': [],
                }}
              />
              <FormilySelect
                __component_name="FormilySelect"
                componentProps={{
                  'x-component-props': {
                    _sdkSwrGetFunc: {},
                    _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ObjectSetter',
                    allowClear: false,
                    disabled: false,
                    placeholder: '请选择历史版本',
                  },
                }}
                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                fieldProps={{
                  '_unsafe_MixedSetter_enum_select': 'ExpressionSetter',
                  'enum': __$$eval(() =>
                    this.state.addVersion.data?.versions.nodes.map(v => ({
                      label: v.version,
                      value: v.version,
                    }))
                  ),
                  'name': 'inheritedFrom',
                  'required': true,
                  'title': '历史版本',
                  'x-display': "{{ $form.values?.inheritedFromSwitch ? 'visible' : 'hidden' }}",
                  'x-validator': [],
                }}
              />
            </FormilyForm>
          </Modal>
        )}
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={1}
            >
              {this.i18n('i18n-5djmpfvu') /* 数据集管理 */}
            </Typography.Title>
          </Col>
          <Col __component_name="Col" span={24}>
            <Alert
              __component_name="Alert"
              message="可用数据统一纳管，包含训练数据集、知识库数据集等。支持自主版本迭代、数据查看和数据更新等操作。"
              showIcon={true}
              style={{ marginBottom: '8px' }}
              type="info"
            />
          </Col>
        </Row>
        <LccComponentSbva0
          __component_name="LccComponentSbva0"
          data={__$$eval(() => this.state.confirm)}
        />
        <Card
          __component_name="Card"
          actions={[]}
          bordered={false}
          hoverable={false}
          loading={false}
          size="default"
          type="default"
        >
          <Row __component_name="Row" wrap={false}>
            <Col __component_name="Col" flex="auto" span={16} style={{ display: 'flex' }}>
              <Space __component_name="Space" align="center" direction="horizontal">
                <Button
                  __component_name="Button"
                  block={false}
                  danger={false}
                  disabled={false}
                  ghost={false}
                  href="/dataset/create"
                  icon={<AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />}
                  shape="default"
                  type="primary"
                >
                  {this.i18n('i18n-2ejg9q5l') /* 新增数据集 */}
                </Button>
                <Button
                  __component_name="Button"
                  block={false}
                  danger={false}
                  disabled={false}
                  ghost={false}
                  icon={<TenxIconRefresh __component_name="TenxIconRefresh" />}
                  onClick={function () {
                    return this.fetchData.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  shape="default"
                >
                  刷新
                </Button>
                <Input.Search
                  __component_name="Input.Search"
                  onChange={function () {
                    return this.onSearchChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  placeholder={this.i18n('i18n-vce3sfm7') /* 请输入数据集名称搜索 */}
                  style={{ width: '200px' }}
                  value={__$$eval(() => this.state.search)}
                />
              </Space>
            </Col>
            <Col
              __component_name="Col"
              flex="auto"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Space __component_name="Space" align="center" direction="horizontal">
                <Select
                  __component_name="Select"
                  _sdkSwrGetFunc={{ label: '', params: [], value: '' }}
                  allowClear={true}
                  disabled={false}
                  mode="single"
                  notFoundContent=""
                  onChange={function () {
                    return this.onTypeChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  options={__$$eval(() => this.constants.DATASET_DATA.type)}
                  placeholder={this.i18n('i18n-af4xea8m') /* 请选择类型 */}
                  showSearch={true}
                  style={{ width: 200 }}
                  value={__$$eval(() => this.state.type)}
                />
                <Select
                  __component_name="Select"
                  _sdkSwrGetFunc={{ params: [''] }}
                  allowClear={true}
                  disabled={false}
                  onChange={function () {
                    return this.onFieldChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  options={__$$eval(() => this.constants.DATASET_DATA.fields)}
                  placeholder="请选择应用场景"
                  showSearch={true}
                  style={{ width: 200 }}
                />
              </Space>
            </Col>
          </Row>
          <List
            __component_name="List"
            bordered={false}
            dataSource={__$$eval(() => this.state.data)}
            grid={false}
            gridEnable={false}
            itemLayout="vertical"
            loading={__$$eval(() => this.state.loading)}
            pagination={{
              current: __$$eval(() => this.state.page),
              onChange: function () {
                return this.onPageChange.apply(
                  this,
                  Array.prototype.slice.call(arguments).concat([])
                );
              }.bind(this),
              pageSize: __$$eval(() => this.state.pageSize),
              pagination: { pageSize: 5 },
              position: 'bottom',
              showQuickJumper: false,
              showSizeChanger: false,
              showTotal: function () {
                return this.showTotal.apply(this, Array.prototype.slice.call(arguments).concat([]));
              }.bind(this),
              simple: false,
              size: 'default',
              total: __$$eval(() => this.state.totalCount),
            }}
            renderItem={item =>
              (__$$context => (
                <List.Item style={{ marginBottom: '16px' }}>
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={24}>
                      <Collapse
                        __component_name="Collapse"
                        accordion={true}
                        bordered={true}
                        className="dataset-collapse-header"
                        destroyInactivePanel={true}
                        expandIconPosition="right"
                        ghost={false}
                        items={[
                          {
                            _unsafe_MixedSetter_children_select: 'SlotSetter',
                            _unsafe_MixedSetter_label_select: 'SlotSetter',
                            children: (
                              <LccComponentNy419
                                __component_name="LccComponentNy419"
                                dataset={__$$eval(() => item)}
                                datasource={__$$eval(() => item.versions?.nodes || [])}
                                onImportDataClick={function () {
                                  return this.onImportDataClick.apply(
                                    this,
                                    Array.prototype.slice.call(arguments).concat([])
                                  );
                                }.bind(__$$context)}
                              />
                            ),
                            key: __$$eval(() => item.name),
                            label: (
                              <Row
                                __component_name="Row"
                                align="middle"
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  marginTop: '0px',
                                }}
                                wrap={true}
                              >
                                <Col
                                  __component_name="Col"
                                  span={7}
                                  style={{ alignItems: 'center', display: 'flex' }}
                                >
                                  <Image
                                    __component_name="Image"
                                    fallback=""
                                    height={28}
                                    preview={false}
                                    src={__$$eval(
                                      () =>
                                        __$$context.constants.DATASET_DATA?.typeIcons?.[
                                          item.contentType
                                          ]
                                    )}
                                    width={28}
                                  />
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{
                                      fontSize: '14px',
                                      fontWeight: 500,
                                      paddingLeft: '8px',
                                    }}
                                  >
                                    {__$$eval(() => __$$context.utils.getFullName(item))}
                                  </Typography.Text>
                                </Col>
                                <Col
                                  __component_name="Col"
                                  flex="200px"
                                  span={3}
                                  style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                  }}
                                >
                                  <Tag __component_name="Tag" closable={false} color="warning">
                                    {__$$eval(
                                      () =>
                                        __$$context.utils._.find(
                                          __$$context.constants.DATASET_DATA.type,
                                          {
                                            value: item.contentType,
                                          }
                                        )?.label || '未知'
                                    )}
                                  </Tag>
                                  {!!__$$eval(() =>
                                    Boolean(
                                      __$$context.utils._.find(
                                        __$$context.constants.DATASET_DATA.fields,
                                        {
                                          value: item.field,
                                        }
                                      )?.label
                                    )
                                  ) && (
                                    <Tag __component_name="Tag" closable={false} color="processing">
                                      {__$$eval(
                                        () =>
                                          __$$context.utils._.find(
                                            __$$context.constants.DATASET_DATA.fields,
                                            {
                                              value: item.field,
                                            }
                                          )?.label || '未知'
                                      )}
                                    </Tag>
                                  )}
                                </Col>
                                <Col
                                  __component_name="Col"
                                  flex=""
                                  span={8}
                                  style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    paddingLeft: '30px',
                                  }}
                                >
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {__$$eval(() => `版本数：${item.versions.totalCount}`)}
                                  </Typography.Text>
                                </Col>
                                <Col
                                  __component_name="Col"
                                  span={4}
                                  style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                  }}
                                >
                                  <Button
                                    __component_name="Button"
                                    block={false}
                                    danger={false}
                                    disabled={false}
                                    ghost={false}
                                    icon={
                                      <AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />
                                    }
                                    onClick={function () {
                                      return this.addVersion.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([
                                          {
                                            testKey: 123,
                                            data: item,
                                          },
                                        ])
                                      );
                                    }.bind(__$$context)}
                                    shape="default"
                                    size="small"
                                    type="text"
                                  >
                                    {this.i18n('i18n-wgpt60zj') /* 新增版本 */}
                                  </Button>
                                  <Divider
                                    __component_name="Divider"
                                    dashed={false}
                                    defaultOpen={false}
                                    mode="default"
                                    type="vertical"
                                  />
                                  <Button
                                    __component_name="Button"
                                    block={false}
                                    danger={false}
                                    disabled={false}
                                    ghost={false}
                                    icon={
                                      <AntdIconDeleteOutlined __component_name="AntdIconDeleteOutlined" />
                                    }
                                    onClick={function () {
                                      return this.onDelDataset.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([
                                          {
                                            item: item,
                                          },
                                        ])
                                      );
                                    }.bind(__$$context)}
                                    shape="default"
                                    size="small"
                                    type="text"
                                  >
                                    {this.i18n('i18n-z0idrepg') /* - */}
                                  </Button>
                                </Col>
                              </Row>
                            ),
                            showArrow: true,
                          },
                        ]}
                        size="large"
                        style={{}}
                      />
                    </Col>
                  </Row>
                </List.Item>
              ))(__$$createChildContext(__$$context, { item }))
            }
            rowKey="name"
            size="small"
            split={false}
            style={{ marginTop: '16px' }}
          />
        </Card>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/dataset' }, location.pathname);
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
      sdkSwrFuncs={[
        {
          params: undefined,
          enableLocationSearch: undefined,
        },
      ]}
      render={dataProps => (
        <Dataset$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
