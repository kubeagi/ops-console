// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  FormilyForm,
  FormilyTextArea,
  Row,
  Col,
  FormilyInput,
  FormilyNumberPicker,
  FormilyRadio,
  FormilySelect,
  Typography,
  Drawer,
  Space,
  Button,
  Table,
  Alert,
  Card,
  Image,
  Status,
  Tooltip,
  Divider,
  Tabs,
  Descriptions,
} from '@tenx-ui/materials';

import LccComponentQlsmm from 'KubeAGIUpload';

import LccComponentSbva0 from 'confirm';

import {
  AntdIconPlusOutlined,
  AntdIconEditOutlined,
  AntdIconDeleteOutlined,
  AntdIconInfoCircleOutlined,
} from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class DatasetVersionDetail$$Page extends React.Component {
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
      addCsvform: {},
      addCsvIsEdit: false,
      addCsvOriginData: {},
      addCsvVisible: false,
      addFileDatasource: undefined,
      addFileDataSourceList: [],
      addFileLoading: false,
      addFileLocal: true,
      addFileVisible: false,
      clearFile: false,
      confirm: {},
      cvsData: {
        current: 1,
        list: [],
        total: 0,
        loading: false,
      },
      fileData: {},
      openFile: false,
      upload: {},
    };

    this.fileUploadSuccessList = [];
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentDidUpdate(preProps) {
    if (
      this.props.useGetVersionedDataset.data?.VersionedDataset?.getVersionedDataset?.version &&
      !this.state.versionDetail?.version
    ) {
      this.setState({
        versionDetail:
        this.props.useGetVersionedDataset.data?.VersionedDataset?.getVersionedDataset,
      });
    }
  }

  componentWillUnmount() {}

  addCvsClick(event) {
    this.setState({
      addCsvVisible: true,
    });
  }

  addCvsOk() {
    const fetch = async values => {
      const isEdit = this.state.addCsvIsEdit;
      const line = [
        values.q || '',
        values.a || '',
        values.fileName || '',
        String(values.pageNumber || ''),
        values.chunkContent || '',
      ];
      const body = isEdit
        ? {
          updateLines: [
            {
              lineNumber: this.state.addCsvOriginData?.lineNumber,
              values: line,
            },
          ],
        }
        : {
          newLines: [line],
        };
      const errorMsg = isEdit ? '编辑数据失败' : '新增数据失败';
      const res = await this.updateCsv(body, errorMsg);
      if (res.status === 200) {
        this.getFile();
        this.onAddCsvCancel();
        this.utils.notification.success({
          message: isEdit ? '编辑数据成功' : '新增数据成功',
        });
      } else {
        this.utils.notification.warn({
          message: errorMsg,
        });
      }
    };
    // 点击确定回调
    this.form('cvsForm').submit(fetch);
  }

  addFileClick(event) {
    this.setState({
      addFileVisible: true,
    });
  }

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
    // 点击确定回调
    this.form()?.submit(fetch);
  }

  addOnline() {
    const fetch = async values => {
      const res = this.utils.axios
        .post(
          `${this.constants.FILES_API_ORIGIN}/kubeagi-apis/bff/versioneddataset/files/webcrawler`,
          {
            datasource: values.datasource,
            versioneddataset: this.data().data?.name,
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
        })
        .catch(e => {
          this.utils.notification.warn({
            message: '新增在线数据失败',
          });
        });
    };
    this.form().submit(fetch);
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

  data() {
    const data = this.props.useGetVersionedDataset.data?.VersionedDataset?.getVersionedDataset;
    return {
      ...this.props.useGetVersionedDataset,
      data: data?.version ? data : this.state.versionDetail || {},
    };
  }

  delCsvClick(event, { data }) {
    this.setState({
      confirm: {
        id: new Date().getTime(),
        title: '删除数据',
        content: `确定删除数据：${data?.q} ？`,
        onOk: async () => {
          const errorMsg = '删除数据失败';
          const res = await this.updateCsv(
            {
              delLines: [data.lineNumber],
            },
            errorMsg
          );
          if (res.status === 200) {
            this.getFile();
            this.onAddCsvCancel();
            this.utils.notification.success({
              message: '删除数据成功',
            });
          } else {
            this.utils.notification.warn({
              message: errorMsg,
            });
          }
        },
      },
    });
  }

  delFileClick(event, { data }) {
    // 点击按钮时的回调
    this.setState({
      confirm: {
        id: new Date().getTime(),
        title: '删除文件',
        content: `确定删除文件：${data?.path} ？`,
        onOk: async () => {
          await this.utils.axios
            .delete(`${this.constants.FILES_API_ORIGIN}/kubeagi-apis/bff/versioneddataset/files`, {
              data: {
                files: [data.path],
                bucket: this.utils.getAuthData?.()?.project,
                bucketPath: this.getBucketPath(),
              },
              headers: {
                Authorization: this.utils.getAuthorization(),
                namespace: this.utils.getAuthData?.()?.project,
              },
            })
            .then(res => {
              if (res?.data === 'success') {
                this.utils.notification.success({
                  message: '删除文件成功',
                });
                this.refresh();
              }
            })
            .catch(e => {
              this.utils.notification.warn({
                message: '删除文件失败',
              });
            });
        },
      },
    });
  }

  delVerClick(event) {
    this.setState({
      confirm: {
        id: new Date().getTime(),
        title: '删除数据集版本',
        content: `确定删除数据集版本：${this.data().data?.version} ？`,
        onOk: async () => {
          const res = await this.utils.bff
            .deleteVersionedDatasets({
              input: {
                name: this.data().data.name,
                namespace: this.utils.getAuthData?.()?.project,
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
          this.appHelper.history.back();
        },
      },
    });
  }

  doUpload() {
    this.state.upload?.uploadThis?.state?.fileList?.forEach(file => {
      this.state.upload?.uploadThis?.computeMD5(file);
    });
  }

  form(name) {
    return this.$(name || 'add_file')?.formRef?.current?.form;
  }

  getAddFileDatasourceUrl() {
    const res =
      this.state.addFileDataSourceList.filter(
        item => item.value === this.state.addFileDatasource
      ) || [];
    return res[0].endpoint?.url;
  }

  getBucketPath() {
    return `dataset/${this.props.useGetDataset.data?.Dataset?.getDataset?.name}/${
      this.data().data?.version
    }`;
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

  async getFile() {
    this.setState({
      cvsData: {
        ...this.state.cvsData,
        loading: true,
      },
    });
    const res = await this.utils.axios.get(
      `${this.constants.FILES_API_ORIGIN}/kubeagi-apis/bff/versioneddataset/files/csv?page=${
        this.state.cvsData?.current
      }&size=10&bucket=${
        this.utils.getAuthData?.()?.project
      }&bucketPath=${this.getBucketPath()}&fileName=${this.state.fileData?.path}`,
      {
        headers: {
          Authorization: this.utils.getAuthorization(),
          namespace: this.utils.getAuthData?.()?.project,
        },
      }
    );
    this.setState({
      cvsData: {
        ...this.state.cvsData,
        list: res?.data?.rows
          ?.map((row, index) => ({
            q: row?.[0],
            a: row?.[1],
            fileName: row?.[2],
            pageNumber: row?.[3],
            chunkContent: row?.[4],
            lineNumber: index,
            version: res?.data?.version,
          }))
          .filter(item => item.lineNumber !== 0),
        total: res?.data?.total,
        version: res?.data?.version,
        loading: false,
      },
    });
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

  onAddCsvCancel() {
    this.setState({
      addCsvVisible: false,
      addCsvIsEdit: false,
      addCsvform: {},
      addCsvOriginData: {},
    });
  }

  onAddFileTypeChange(v) {
    this.setState({
      addFileLocal: v.target.value === 'local',
    });
  }

  onCsvPageChange(page, pageSize) {
    // 页码或 pageSize 改变的回调
    this.setState(
      {
        cvsData: {
          ...this.state.cvsData,
          current: page,
        },
      },
      this.getFile.bind(this)
    );
  }

  onDatasourceChange(v) {
    this.setState({
      addFileDatasource: v,
    });
  }

  onEditCsvClick(event, { data }) {
    this.setState({
      addCsvform: {
        ...data,
      },
      addCsvOriginData: {
        ...data,
      },
      addCsvIsEdit: true,
      addCsvVisible: true,
    });
  }

  onFileClose(event) {
    this.setState({
      openFile: false,
      fileData: {},
      cvsData: {
        current: 1,
        loading: false,
        list: [],
        total: 0,
      },
    });
  }

  onFilePageChange(page, pageSize) {
    // 页码或 pageSize 改变的回调
    this.utils?.changeLocationQuery(this, 'useGetVersionedDataset', {
      _: new Date().getTime(),
      name: this.match?.params?.versionId,
      namespace: this.utils.getAuthData?.()?.project,
      fileInput: {
        pageSize: 10,
        page,
      },
    });
  }

  onFileUploaded(file) {
    this.setFileUploadStatus(file);
    this.utils.notification.success({
      message: `文件 ${file.name} 已经存在，无需再次上传`,
    });
    this.handleCancle();
  }

  onShowTrustModal() {
    this.setState({
      addFileLoading: false,
    });
  }

  openFileDetail(e, { data }) {
    if (data?.fileType !== 'QA') return;
    this.setState(
      {
        openFile: true,
        fileData: data,
      },
      this.getFile.bind(this)
    );
  }

  refresh() {
    this.utils?.changeLocationQuery(this, 'useGetVersionedDataset', {
      name: this.match?.params?.versionId,
      namespace: this.utils.getAuthData?.()?.project,
      _: new Date().getTime(),
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

  async updateCsv(otherBody = {}, errorMsg) {
    const res = await this.utils.axios
      .put(
        `${this.constants.FILES_API_ORIGIN}/kubeagi-apis/bff/versioneddataset/files/edit`,
        {
          fileName: this.state.fileData?.path,
          bucket: this.utils.getAuthData?.()?.project,
          bucketPath: this.getBucketPath(),
          version: this.state.cvsData.version,
          ...otherBody,
        },
        {
          headers: {
            Authorization: this.utils.getAuthorization(),
            namespace: this.utils.getAuthData?.()?.project,
          },
        }
      )
      .catch(e => {
        errorMsg &&
        this.utils.notification.warn({
          message: errorMsg,
        });
      });
    return res;
  }

  componentDidMount() {
    this.getDataSource();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
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
            return this.onAddCsvCancel.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.addCvsOk.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={__$$eval(() => this.state.addCsvVisible)}
          title={__$$eval(() => (this.state.addCsvIsEdit ? '编辑数据' : '新增数据'))}
          width="70%"
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
            createFormProps={{ values: __$$eval(() => this.state.addCsvform) }}
            formHelper={{ autoFocus: true }}
            ref={this._refsManager.linkRef('cvsForm')}
          >
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                'x-component-props': {
                  placeholder:
                    '1. 当前数据为被向量化的内容，该部分内容的质量决定了在对话时，能否高效、准确的找到合适的知识；2. 此处内容一般是搜索的问题，最多可输入 2000 字。',
                  rows: 3,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true, layout: 'vertical' } }}
              fieldProps={{
                'name': 'q',
                'required': true,
                'title': '被搜索的内容（Q）',
                'x-component': 'Input.TextArea',
                'x-validator': [],
              }}
            />
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                'x-component-props': {
                  placeholder: ' 此处内容一般是搜索匹配的内容，最多可输入 2000 字。',
                  rows: 5,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true, layout: 'vertical' } }}
              fieldProps={{
                'name': 'a',
                'required': true,
                'title': '匹配内容（A）',
                'x-component': 'Input.TextArea',
                'x-validator': [],
              }}
            />
            <Row __component_name="Row" justify="space-between" wrap={false}>
              <Col __component_name="Col" span={12}>
                <FormilyInput
                  __component_name="FormilyInput"
                  componentProps={{
                    'x-component-props': { placeholder: '此处填写 QA 内容引用的源文件名称。' },
                  }}
                  decoratorProps={{
                    'x-decorator-props': { labelEllipsis: true, layout: 'vertical' },
                  }}
                  fieldProps={{ 'name': 'fileName', 'title': '文件名称', 'x-validator': [] }}
                />
              </Col>
              <Col __component_name="Col" span={12}>
                <FormilyNumberPicker
                  __component_name="FormilyNumberPicker"
                  componentProps={{
                    'x-component-props': {
                      min: 1,
                      placeholder: '此处填写 QA 内容引用的原文段落所在页码。',
                    },
                  }}
                  decoratorProps={{
                    'x-decorator-props': { labelEllipsis: true, layout: 'vertical' },
                  }}
                  fieldProps={{ 'name': 'pageNumber', 'title': '页码', 'x-validator': [] }}
                />
              </Col>
            </Row>
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                'x-component-props': {
                  placeholder: '此处填写 QA 引用的原文段落，最多可输入 2000 字。',
                  rows: 11,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true, layout: 'vertical' } }}
              fieldProps={{
                'name': 'chunkContent',
                'title': '原文段落',
                'x-component': 'Input.TextArea',
                'x-validator': [],
              }}
            />
          </FormilyForm>
        </Modal>
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
        <LccComponentSbva0
          __component_name="LccComponentSbva0"
          data={__$$eval(() => this.state.confirm)}
        />
        <Drawer
          __component_name="Drawer"
          destroyOnClose={true}
          extra=""
          footer=""
          mask={true}
          maskClosable={true}
          onClose={function () {
            return this.onFileClose.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={__$$eval(() => this.state.openFile)}
          placement="right"
          title={__$$eval(() => this.state.fileData.path)}
          width="70%"
        >
          <Row __component_name="Row" style={{ marginBottom: '8px' }} wrap={false}>
            <Col __component_name="Col" flex="270px">
              <Space __component_name="Space" align="center" direction="horizontal">
                <Button
                  __component_name="Button"
                  block={false}
                  danger={false}
                  disabled={false}
                  ghost={false}
                  icon={<AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />}
                  onClick={function () {
                    return this.addCvsClick.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  shape="default"
                  type="primary"
                >
                  新增数据
                </Button>
              </Space>
            </Col>
            <Col __component_name="Col" flex="auto">
              <Typography.Text
                __component_name="Typography.Text"
                children=""
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: '' }}
              />
            </Col>
          </Row>
          <Table
            __component_name="Table"
            bordered={true}
            className="custom-table"
            columns={[
              {
                _unsafe_MixedSetter_width_select: 'StringSetter',
                dataIndex: 'q',
                key: 'q',
                title: 'Q',
                width: '40%',
              },
              {
                _unsafe_MixedSetter_width_select: 'StringSetter',
                dataIndex: 'a',
                key: 'a',
                title: 'A',
                width: '50%',
              },
              {
                dataIndex: '',
                key: 'action',
                render: (text, record, index) =>
                  (__$$context =>
                    !!__$$eval(() => text.lineNumber !== 0) && (
                      <Space __component_name="Space" align="center" direction="horizontal">
                        <Button
                          __component_name="Button"
                          block={false}
                          children=""
                          danger={false}
                          disabled={false}
                          ghost={false}
                          icon={<AntdIconEditOutlined __component_name="AntdIconEditOutlined" />}
                          onClick={function () {
                            return this.onEditCsvClick.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([
                                {
                                  data: record,
                                },
                              ])
                            );
                          }.bind(__$$context)}
                          shape="default"
                          type="link"
                        />
                        <Button
                          __component_name="Button"
                          block={false}
                          children=""
                          danger={true}
                          disabled={false}
                          ghost={true}
                          icon={
                            <AntdIconDeleteOutlined __component_name="AntdIconDeleteOutlined" />
                          }
                          onClick={function () {
                            return this.delCsvClick.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([
                                {
                                  data: record,
                                },
                              ])
                            );
                          }.bind(__$$context)}
                          shape="default"
                          type="link"
                        />
                      </Space>
                    ))(__$$createChildContext(__$$context, { text, record, index })),
                title: '操作',
              },
            ]}
            dataSource={__$$eval(() => this.state.cvsData?.list || [])}
            loading={__$$eval(() => this.state.cvsData.loading)}
            pagination={{
              current: __$$eval(() => this.state.cvsData?.current || 1),
              onChange: function () {
                return this.onCsvPageChange.apply(
                  this,
                  Array.prototype.slice.call(arguments).concat([])
                );
              }.bind(this),
              pageSize: 10,
              pagination: { pageSize: 10 },
              showQuickJumper: false,
              showSizeChanger: false,
              simple: false,
              size: 'default',
              total: __$$eval(() => this.state.cvsData?.total || 0),
            }}
            rowKey="id"
            scroll={{ scrollToFirstRowOnChange: true }}
            showCard={true}
            showHeader={true}
            size="middle"
            style={{}}
          />
        </Drawer>
        {!!__$$eval(() => this.state.delFileVisible) && (
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
              return this.delFileCancle.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            onOk={function () {
              return this.delFileOk.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            open={true}
            title="删除文件"
          >
            <Alert
              __component_name="Alert"
              message={__$$eval(() => `确定删除文件：${this.state.delFileData.path} ？`)}
              showIcon={true}
              type="warning"
            />
          </Modal>
        )}
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24} style={{ marginBottom: '16px' }}>
            <Space __component_name="Space" align="center" direction="horizontal">
              <Button.Back
                __component_name="Button.Back"
                path="/dataset"
                title={this.i18n('i18n-k7qioby7') /* 数据集版本详情 */}
                type="ghost"
              />
            </Space>
          </Col>
        </Row>
        <Card
          __component_name="Card"
          actions={[]}
          bordered={false}
          className="dataset-version-header"
          hoverable={false}
          loading={false}
          size="default"
          style={{ marginBottom: '16px' }}
          type="default"
        >
          <Row __component_name="Row">
            <Col __component_name="Col" flex="470px" span={19}>
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col">
                  <Image
                    __component_name="Image"
                    fallback=""
                    height={56}
                    preview={false}
                    src={__$$eval(() => this.constants.DATASET_DATA.versionImg)}
                    width={56}
                  />
                </Col>
                <Col __component_name="Col" span={20}>
                  <Row
                    __component_name="Row"
                    style={{ display: 'flex', height: '56px' }}
                    wrap={true}
                  >
                    <Col __component_name="Col" span={24}>
                      <Typography.Title
                        __component_name="Typography.Title"
                        bold={true}
                        bordered={false}
                        ellipsis={true}
                        level={1}
                      >
                        {__$$eval(() => this.data().data?.version || '-')}
                      </Typography.Title>
                    </Col>
                    <Col __component_name="Col" span={24} style={{ marginTop: '-13px' }}>
                      <Space
                        __component_name="Space"
                        align="center"
                        direction="horizontal"
                        style={{ width: '300px' }}
                      >
                        <Status
                          __component_name="Status"
                          id={__$$eval(() => this.data().data?.syncStatus)}
                          types={__$$eval(() => this.constants.DATASET_DATA.syncStatus)}
                        />
                        {!!__$$eval(() => this.data().data?.syncMsg) && (
                          <Tooltip
                            __component_name="Tooltip"
                            style={{}}
                            title={__$$eval(() => this.data().data?.syncMsg || '-')}
                          >
                            <AntdIconInfoCircleOutlined
                              __component_name="AntdIconInfoCircleOutlined"
                              style={{ marginLeft: '-4px' }}
                            />
                          </Tooltip>
                        )}
                        <Divider
                          __component_name="Divider"
                          dashed={false}
                          defaultOpen={false}
                          mode="default"
                          type="vertical"
                        />
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: '', paddingBottom: '3px' }}
                        >
                          更新时间:
                        </Typography.Text>
                        <Typography.Time
                          __component_name="Typography.Time"
                          format=""
                          relativeTime={true}
                          time={__$$eval(() => this.data().data?.updateTimestamp)}
                        />
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col
              __component_name="Col"
              flex="auto"
              span={5}
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
            >
              <Space __component_name="Space" align="center" direction="horizontal">
                <Button
                  __component_name="Button"
                  block={false}
                  danger={false}
                  disabled={false}
                  ghost={false}
                  onClick={function () {
                    return this.delVerClick.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  shape="default"
                >
                  删除
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
        <Card
          __component_name="Card"
          actions={[]}
          bordered={false}
          hoverable={false}
          loading={false}
          size="default"
          type="default"
        >
          <Tabs
            __component_name="Tabs"
            activeKey=""
            defaultActiveKey="file"
            destroyInactiveTabPane="true"
            items={[
              {
                children: [
                  <Row __component_name="Row" wrap={false} key="node_ocltqx63ys1">
                    <Col __component_name="Col" flex="270px">
                      <Space
                        __component_name="Space"
                        align="center"
                        direction="horizontal"
                        style={{}}
                      >
                        <Button
                          __component_name="Button"
                          block={false}
                          danger={false}
                          disabled={false}
                          ghost={false}
                          onClick={function () {
                            return this.addFileClick.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          shape="default"
                          type="primary"
                        >
                          新增文件
                        </Button>
                        <Button
                          __component_name="Button"
                          block={false}
                          danger={false}
                          disabled={false}
                          ghost={false}
                          onClick={function () {
                            return this.refresh.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          shape="default"
                        >
                          刷新
                        </Button>
                      </Space>
                    </Col>
                  </Row>,
                  <Table
                    __component_name="Table"
                    columns={[
                      {
                        dataIndex: 'path',
                        ellipsis: { showTitle: true },
                        key: 'path',
                        render: (text, record, index) =>
                          (__$$context => (
                            <Row
                              __component_name="Row"
                              onClick={function () {
                                return this.openFileDetail.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([
                                    {
                                      data: record,
                                    },
                                  ])
                                );
                              }.bind(__$$context)}
                              wrap={true}
                            >
                              <Col __component_name="Col" span={24}>
                                {!!__$$eval(() => record.fileType !== 'QA') && (
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '', paddingLeft: '16px' }}
                                  >
                                    {__$$eval(() => record.path || '-')}
                                  </Typography.Text>
                                )}
                                {!!__$$eval(() => record.fileType === 'QA') && (
                                  <Button
                                    __component_name="Button"
                                    block={false}
                                    danger={false}
                                    disabled={__$$eval(() => record.fileType !== 'QA')}
                                    ghost={false}
                                    onClick={function () {
                                      return this.openFileDetail.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([
                                          {
                                            data: record,
                                          },
                                        ])
                                      );
                                    }.bind(__$$context)}
                                    shape="default"
                                    type="link"
                                  >
                                    {__$$eval(() => record.path || '-')}
                                  </Button>
                                )}
                              </Col>
                            </Row>
                          ))(__$$createChildContext(__$$context, { text, record, index })),
                        title: '文件',
                      },
                      {
                        dataIndex: 'fileType',
                        key: 'fileType',
                        render: (text, record) => record.fileType || '-',
                        title: '标签',
                        width: 150,
                      },
                      { dataIndex: 'size', key: 'size', title: '文件大小', width: 150 },
                      {
                        dataIndex: 'count',
                        key: 'count',
                        render: (text, record) => record.count || 0,
                        title: '数据量',
                        width: 150,
                      },
                      {
                        dataIndex: 'time',
                        key: 'time',
                        render: (text, record, index) =>
                          (__$$context => (
                            <Typography.Time
                              __component_name="Typography.Time"
                              format=""
                              relativeTime={true}
                              time={__$$eval(() => record.time)}
                            />
                          ))(__$$createChildContext(__$$context, { text, record, index })),
                        title: '创建时间',
                        width: 100,
                      },
                      {
                        dataIndex: '',
                        key: 'action',
                        render: (text, record, index) =>
                          (__$$context => (
                            <Button
                              __component_name="Button"
                              block={false}
                              danger={false}
                              disabled={false}
                              ghost={false}
                              icon=""
                              onClick={function () {
                                return this.delFileClick.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([
                                    {
                                      data: record,
                                    },
                                  ])
                                );
                              }.bind(__$$context)}
                              shape="default"
                            >
                              删除
                            </Button>
                          ))(__$$createChildContext(__$$context, { text, record, index })),
                        title: '操作',
                        width: 150,
                      },
                    ]}
                    dataSource={__$$eval(() => this.data().data?.files?.nodes || [])}
                    pagination={{
                      onChange: function () {
                        return this.onFilePageChange.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                      pageSize: 10,
                      pagination: { pageSize: 10 },
                      showQuickJumper: false,
                      showSizeChanger: false,
                      simple: false,
                      size: 'default',
                      total: __$$eval(() => this.data().data?.files?.totalCount),
                    }}
                    rowKey="id"
                    scroll={{ scrollToFirstRowOnChange: true }}
                    showHeader={true}
                    size="middle"
                    style={{}}
                    key="node_ocltqx63ys6"
                  />,
                ],
                key: 'file',
                label: '文件',
              },
              {
                children: (
                  <Descriptions
                    __component_name="Descriptions"
                    bordered={false}
                    borderedBottom={false}
                    borderedBottomDashed={false}
                    colon={false}
                    column={3}
                    id=""
                    items={[
                      {
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                        children: __$$eval(() => this.data().data?.name),
                        key: '0whadic76h29',
                        label: '名称',
                        span: 24,
                      },
                      {
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                        children: __$$eval(() => this.data().data?.id || '-'),
                        key: '2y97byqciee',
                        label: 'ID',
                        span: 24,
                      },
                      {
                        _unsafe_MixedSetter_children_select: 'SlotSetter',
                        children: [
                          <Status
                            __component_name="Status"
                            id={__$$eval(() => this.data().data?.syncStatus)}
                            types={__$$eval(() => this.constants.DATASET_DATA.syncStatus)}
                            key="node_oclpwcoa482"
                          />,
                          !!__$$eval(() => this.data().data?.syncMsg) && (
                            <Tooltip
                              __component_name="Tooltip"
                              title={__$$eval(() => this.data().data?.syncMsg || '-')}
                              key="node_oclrfrjnot1"
                            >
                              <AntdIconInfoCircleOutlined
                                __component_name="AntdIconInfoCircleOutlined"
                                style={{ marginLeft: '4px' }}
                              />
                            </Tooltip>
                          ),
                        ],
                        key: 'xvcp3obfu',
                        label: '导入状态',
                        span: 24,
                      },
                      {
                        _unsafe_MixedSetter_children_select: 'SlotSetter',
                        children: [
                          <Status
                            __component_name="Status"
                            id={__$$eval(() => this.data().data?.dataProcessStatus || 'no')}
                            types={__$$eval(() => this.constants.DATASET_DATA.dataProcessStatus)}
                            key="node_oclpwcoa484"
                          />,
                          !!__$$eval(() => this.data().data?.dataProcessMsg) && (
                            <Tooltip
                              __component_name="Tooltip"
                              title={__$$eval(() => this.data().data?.dataProcessMsg || '-')}
                              key="node_oclrfrjk2q1"
                            >
                              <AntdIconInfoCircleOutlined
                                __component_name="AntdIconInfoCircleOutlined"
                                style={{ marginLeft: '4px' }}
                              />
                            </Tooltip>
                          ),
                        ],
                        key: 'er0ptk5lill',
                        label: '数据处理状态',
                        span: 24,
                      },
                      {
                        _unsafe_MixedSetter_children_select: 'SlotSetter',
                        children: (
                          <Typography.Time
                            __component_name="Typography.Time"
                            format=""
                            relativeTime={true}
                            time={__$$eval(() => this.data().data?.creationTimestamp)}
                          />
                        ),
                        key: 'ww04wf6evps',
                        label: this.i18n('i18n-qjodl1nn') /* 创建时间 */,
                        span: 24,
                      },
                      {
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                        children: __$$eval(() => this.data().data?.creator || '-'),
                        key: 'ajc9nhn140i',
                        label: this.i18n('i18n-sg7nu8tx') /* 创建者 */,
                        span: 24,
                      },
                      {
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                        children: __$$eval(() => this.data().data?.description || '-'),
                        key: '3p5bkjlrh9u',
                        label: this.i18n('i18n-txt5kh4m') /* 描述 */,
                        span: 24,
                      },
                    ]}
                    labelStyle={{ width: 100 }}
                    layout="horizontal"
                    size="default"
                    title=""
                  />
                ),
                key: 'info',
                label: this.i18n('i18n-1gikmooh') /* 详细信息 */,
              },
            ]}
            size="default"
            style={{ marginTop: '-20px' }}
            tabPosition="top"
            type="line"
          />
        </Card>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/dataset/detail/:id/version/:versionId' }, location.pathname);
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
          func: 'useGetVersionedDataset',
          params: function applyThis() {
            return {
              name: this.match?.params?.versionId,
              namespace: this.utils.getAuthData?.()?.project,
              fileInput: {
                pageSize: 10,
                page:
                  JSON.parse(new URL(window.location.href).searchParams.get('_search') || '{}')
                    ?.fileInput?.page || 1,
              },
            };
          }.apply(self),
          enableLocationSearch: function applyThis() {
            return true;
          }.apply(self),
        },
        {
          func: 'useGetDataset',
          params: function applyThis() {
            return {
              name: this.match?.params?.id,
              namespace: this.utils.getAuthData?.()?.project,
              versionsInput: {
                namespace: this.utils.getAuthData?.()?.project,
              },
            };
          }.apply(self),
          enableLocationSearch: undefined,
        },
      ]}
      render={dataProps => (
        <DatasetVersionDetail$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
