// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Button,
  Spin,
  Card,
  Row,
  Col,
  Image,
  Descriptions,
  Status,
  Tooltip,
  Typography,
  Tag,
  Dropdown,
  Tabs,
  Modal,
  Space,
  Input,
  Table,
  Pagination,
  Alert,
} from '@tenx-ui/materials';

import {
  AntdIconInfoCircleOutlined,
  AntdIconPlusOutlined,
  AntdIconReloadOutlined,
  AntdIconDeleteOutlined,
} from '@tenx-ui/icon-materials';

import ReactMarkdownLowcode from '@yuntijs/react-markdown-lowcode-materials';

import LccComponentQlsmm from 'KubeAGIUpload';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import { createAxiosHandler as __$$createAxiosRequestHandler } from '@yunti/lowcode-datasource-axios-handler';

import { create as __$$createDataSourceEngine } from '@alilc/lowcode-datasource-engine/runtime';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class ModelWarehouseDetail$$Page extends React.Component {
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

    __$$i18n._inject2(this);

    this.state = {
      baseInfoModalVisible: false,
      currentFile: '',
      data: {},
      deleteAppLoading: false,
      deleteAppModalVisible: false,
      deleteFilesVisible: false,
      deleteLoading: false,
      deleteType: 'single',
      descInfoList: [],
      fileSearchParams: {
        keyword: '',
        currentPage: 1,
        pageSize: 10,
      },
      iconMap: {
        modelscope: this.constants.ModelSourceImg_MODELSCOPE,
        huggingface: this.constants.ModelSorceImg_HUGGINGFACE,
        local: this.constants.ModelSorceImg_LOCAL,
      },
      isLoadedReadme: false,
      loading: false,
      modelSourceName: '',
      name: this.match.params.name,
      readmeData: '#### 暂无介绍',
      readmeLoading: false,
      selectedFileList: [],
      submitLoading: false,
      typesMap: {
        llm: 'LLM',
        embedding: 'Embedding',
        reranking: 'Reranking',
      },
      uploadedFileCount: 0,
      uploadModalVisible: false,
    };
  }

  $ = () => null;

  $$ = () => [];

  _defineDataSourceConfig() {
    const _this = this;
    return {
      list: [
        {
          id: 'delete_files',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              headers: {
                Authorization: this.props.Authorization || this.state.Authorization,
                namespace: this.utils.getAuthData()?.project,
              },
              isCors: true,
              method: 'DELETE',
              params: {},
              timeout: 5000,
              uri: `${this.getUrlPrex()}/model/files`,
            };
          }.bind(_this),
          type: 'axios',
        },
        {
          id: 'get_file_size',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              headers: {
                Authorization: this.props.Authorization || this.state.Authorization,
                namespace: this.utils.getAuthData()?.project,
              },
              isCors: true,
              method: 'GET',
              params: {},
              timeout: 5000,
              uri: `${this.getUrlPrex()}/model/files/stat`,
            };
          }.bind(_this),
          type: 'axios',
        },
        {
          id: 'download',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              headers: {
                Authorization: this.props.Authorization || this.state.Authorization,
                namespace: this.utils.getAuthData()?.project,
              },
              isCors: true,
              method: 'GET',
              params: {},
              timeout: 5000,
              uri: `${this.getUrlPrex()}/model/files/download`,
            };
          }.bind(_this),
          type: 'axios',
        },
      ],
    };
  }

  componentWillUnmount() {
    console.log('will unmount');
  }

  calcUploadedFile(file) {
    console.log(file);
    const count = this.state.uploadedFileCount + 1;
    this.setState(
      {
        uploadedFileCount: count,
      },
      () => {
        // 都曾经上传过
        if (this.state.uploadThis?.state?.fileList?.length === this.state.uploadedFileCount) {
          this.handleCancle();
          this.setState({
            uploadedFileCount: 0,
          });
          this.state.uploadThis.setState({
            fileList: [],
          });
        }
      }
    );
  }

  checkHasReadmeFile(data) {
    const fileList = data?.files?.nodes || [];
    let haveReadme = false;
    try {
      for (let i = 0; i < fileList.length; i++) {
        const item = fileList[i];
        const pathAndNameList = item?.path.split('/');
        const fileName = pathAndNameList[pathAndNameList.length - 1];
        if (fileName.toLocaleLowerCase() === 'readme.md') {
          haveReadme = true;
          this.getReadmeSize({
            name: item.path,
            bucketPath: 'model/' + data.name,
            namespace: data.namespace,
          });
        }
      }
      if (!haveReadme) {
        this.setState({
          readmeLoading: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  closeDeleteAppModal() {
    this.setState({
      deleteAppModalVisible: false,
    });
  }

  closeDeleteFilesModal() {
    this.setState({
      deleteFilesVisible: false,
      currentFile: '',
    });
  }

  closeOpenBaseInfoModal() {
    this.setState({
      baseInfoModalVisible: false,
    });
  }

  closeUploadModal() {
    this.setState({
      uploadModalVisible: false,
      submitLoading: false,
    });
  }

  downloadReadme({ size, ...fileData }) {
    const pageThis = this;
    return new Promise((resolve, reject) => {
      pageThis
        .getDataSourceMap()
        .download.load({
          fileName: fileData.name,
          bucket: fileData.namespace,
          bucketPath: fileData.bucketPath,
          from: 0,
          end: size,
        })
        .then(function (response) {
          pageThis.setState({
            readmeData: response || '#### 暂无介绍',
            isLoadedReadme: true,
            readmeLoading: false,
          });
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
          pageThis.setState({
            readmeLoading: false,
          });
        });
    });
  }

  getBucket() {
    // namespace
    return this.utils.getAuthData()?.project;
  }

  getBucketPath() {
    return `model/${this.state.name}`;
  }

  getData() {
    this.setState({
      loading: true,
    });
    const project = this.history?.query.namespace || this.utils.getAuthData()?.project;
    const name = this.match.params.name;
    const params = {
      namespace: project,
      name,
      filesInput: {
        keyword: this.state.fileSearchParams.keyword,
        pageSize: this.state.fileSearchParams.pageSize,
        page: this.state.fileSearchParams.currentPage,
      },
    };
    this.utils.bff
      .getModel(params)
      .then(res => {
        console.log(res);
        const { Model } = res;
        const { getModel } = Model || {};
        if (this.history?.query.modelSource !== 'local') {
          this.getOtherModelSummary(getModel);
          // iic/speech_eres2net_sv_zh-cn_16k-common
          let tempModelName;
          if (getModel.modelScopeRepo) {
            tempModelName = `modelscope.cn/${getModel.modelScopeRepo}`;
          } else {
            tempModelName = `huggingface.co/${getModel.huggingFaceRepo}`;
          }
          this.setState({
            modelSourceName: tempModelName,
          });
        } else {
          this.setState({
            modelSourceName: '本地模型',
          });
        }
        this.setState({
          loading: false,
          data: getModel,
          name: this.match.params.name,
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          data: {},
        });
      });
  }

  getDataSourceMap() {
    return this.dataSourceMap;
  }

  getFileData() {
    this.setState({
      readmeLoading: true,
    });
    const project = this.history?.query.namespace || this.utils.getAuthData()?.project;
    const name = this.match.params.name;
    const params = {
      namespace: project,
      name,
      filesInput: {
        keyword: 'README.md',
        pageSize: 10,
        page: 1,
      },
    };
    this.utils.bff
      .getModel(params)
      .then(res => {
        const { Model } = res;
        const { getModel } = Model || {};
        if (!this.state.isLoadedReadme) {
          this.checkHasReadmeFile(getModel);
        } else {
          this.setState({
            readmeLoading: false,
          });
        }
      })
      .catch(error => {
        this.setState({
          readmeLoading: false,
          data: {},
        });
      });
  }

  getOtherModelSummary(data) {
    this.setState({
      readmeLoading: true,
    });
    const modelSource = data.modelSource;
    const modelid = modelSource === 'huggingface' ? data.huggingFaceRepo : data.modelScopeRepo;
    this.utils.axios
      .get(
        `/kubeagi-apis/forward/${modelSource}/summary?modelid=${modelid}&revision=${data.revision}`,
        {
          headers: {
            REPOTOKEN: data.token,
            namespace: this.utils.getAuthData()?.project,
            Authorization: this.utils.getAuthorization(),
          },
        }
      )
      .then(res => {
        const data = res.data;
        this.setState({
          readmeData: data.summary || '#### 暂无介绍',
          isLoadedReadme: true,
          readmeLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          readmeData: '#### 暂无介绍',
          isLoadedReadme: true,
          readmeLoading: false,
        });
      });
  }

  getReadmeSize(fileData) {
    const pageThis = this;
    return new Promise((resolve, reject) => {
      pageThis
        .getDataSourceMap()
        .get_file_size.load({
          fileName: fileData.name,
          bucket: fileData.namespace,
          bucketPath: fileData.bucketPath,
        })
        .then(function (response) {
          console.log(response);
          const size = response.size;
          pageThis.downloadReadme({
            ...fileData,
            size,
          });
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
          pageThis.setState({
            readmeLoading: false,
          });
        });
    });
  }

  getUrlPrex() {
    return `${window.location.origin}/kubeagi-apis/bff`;
  }

  handleBackFunc(event) {
    // 点击按钮时的回调
    this.history.push('/model-warehouse');
    console.log('onClick', history);
  }

  handleCancle() {
    this.utils.notification.success({
      message: '上传成功,请刷新列表查看',
    });
    this.setState(
      {
        submitLoading: false,
        uploadModalVisible: false,
      },
      () => {
        this.getData();
      }
    );
  }

  handlePaginationChange(page, size) {
    this.setState(
      {
        fileSearchParams: {
          ...this.state.fileSearchParams,
          currentPage: page,
          pageSize: size,
        },
      },
      () => {
        this.getData();
      }
    );
  }

  handleReUpload() {
    if (!(this.state.uploadThis?.state?.fileList?.length > 0)) {
      this.handleCancle();
      this.state.uploadThis.setState({
        fileList: [],
      });
      return;
    }
    // console.log(this.state.uploadThis)
    this.state.uploadThis?.state?.fileList?.forEach(file => {
      this.state.uploadThis?.computeMD5(file);
    });
  }

  onChangeSwitch(checked, event) {
    // 变化时回调函数
    this.state.switchState = checked;
    console.log('onChange', checked, event, this.state);
  }

  onClick(event) {
    // 点击按钮时的回调

    console.log('onClick', event);
  }

  onDelete(selectedDeleteFileList) {
    this.setState({
      deleteLoading: true,
    });
    const pageThis = this;
    return new Promise((resolve, reject) => {
      pageThis
        .getDataSourceMap()
        .delete_files.load({
          files: selectedDeleteFileList,
          bucket: pageThis.getBucket(),
          bucketPath: pageThis.getBucketPath(),
        })
        .then(function (response) {
          console.log(response);
          if (response === 'success') {
            pageThis.utils.notification.success({
              message: '删除文件成功！',
            });
            pageThis.closeDeleteFilesModal();
            pageThis.getData();
          } else {
            pageThis.utils.notification.warn({
              message: response,
            });
          }
          pageThis.setState({
            deleteLoading: false,
          });
          resolve(response);
        })
        .catch(function (error) {
          pageThis.setState({
            deleteLoading: false,
          });
          reject(error);
        });
    });
  }

  onDeleteBatch() {
    if (!this.state.selectedFileList.length) {
      this.utils.notification.warn({
        message: '请选择要删除的文件！',
      });
      return;
    }
    this.setState({
      deleteFilesVisible: true,
      deleteType: 'batch',
    });
  }

  onDeleteModelApp() {
    this.setState({
      deleteAppLoading: true,
    });
    const project = this.history?.query.namespace || this.utils.getAuthData()?.project;
    const params = {
      namespace: project,
      name: this.match.params.name,
    };
    this.utils.bff
      .deleteModels({
        input: params,
      })
      .then(res => {
        this.setState({
          deleteAppLoading: false,
        });
        this.utils.notification.success({
          message: '删除模型成功',
        });
        this.history.push('/model-warehouse');
      })
      .catch(error => {
        this.setState({
          deleteAppLoading: false,
        });
        this.utils.notification.warn({
          message: '删除模型失败',
        });
      });
  }

  onDeploy() {
    this.history.push('/model-service/createModelService?name=' + this.state.data.name);
  }

  onEdit(item) {
    this.history.push(`/model-warehouse/edit/${this.match.params.name}`);
  }

  onMenuClick({ key, domEvent }) {
    domEvent.stopPropagation();
    switch (key) {
      case 'edit':
        {
          this.onEdit();
        }
        break;
      case 'del':
        {
          this.onOpenDeleteAppModal();
        }
        break;
      case 'baseinfo':
        {
          this.onOpenBaseInfoModal();
        }
        break;
      default:
        break;
    }
  }

  onOpenBaseInfoModal() {
    this.setState({
      baseInfoModalVisible: true,
    });
  }

  onOpenDeleteAppModal() {
    this.setState({
      deleteAppModalVisible: true,
    });
  }

  onRowSelectedChange(keys) {
    console.log(keys);
    this.setState({
      selectedFileList: keys,
    });
  }

  onSearch(value) {
    // 输入框内容变化时的回调
    this.setState(
      {
        fileSearchParams: {
          ...this.state.fileSearchParams,
          currentPage: 1,
          keyword: value,
        },
      },
      () => {
        this.getData();
      }
    );
  }

  onSubmitDel() {
    console.log(files);
    const files = [];
    if (this.state.deleteType === 'batch') {
      this.onDelete(this.state.selectedFileList);
    }
    if (this.state.deleteType === 'single') {
      this.onDelete([this.state.currentFile]);
    }
  }

  onSubmitUpload() {
    this.setState({
      submitLoading: true,
    });
    this.handleReUpload();
  }

  onTabChange(key) {
    if (key === 'detail' && !this.state.isLoadedReadme) {
      this.getFileData();
    }
  }

  openDeleteFilesModal(e, { record }) {
    this.setState({
      deleteFilesVisible: true,
      currentFile: record?.path,
      deleteType: 'single',
    });
  }

  openUploadModal() {
    this.setState({
      uploadModalVisible: true,
    });
  }

  setUploadState(state) {
    this.setState(state);
  }

  showTotal(total, range) {
    // 用于格式化显示表格数据总量
    return `共 ${total} 条`;
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    this.getData();
    if (this.history?.query.modelSource === 'local') {
      this.getFileData();
    }
    console.log('did mount');
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page style={{}}>
        <Button.Back
          __component_name="Button.Back"
          onClick={function () {
            return this.handleBackFunc.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          path=""
          style={{ opacity: '0' }}
          title="模型详情"
          type="ghost"
        />
        <Spin __component_name="Spin" spinning={__$$eval(() => this.state.loading)}>
          <Card
            __component_name="Card"
            actions={[]}
            bordered={false}
            hoverable={false}
            loading={false}
            size="default"
            style={{ marginTop: '16px' }}
            type="default"
          >
            <Row __component_name="Row" style={{}} wrap={false}>
              <Col
                __component_name="Col"
                flex="56px"
                span={1}
                style={{ height: '56px', width: '56px' }}
              >
                <Image
                  __component_name="Image"
                  fallback=""
                  height={56}
                  preview={false}
                  src={__$$eval(() => this.state.iconMap[this.history?.query.modelSource])}
                  style={{ borderRadius: '56px' }}
                  width={56}
                />
              </Col>
              <Col
                __component_name="Col"
                className="model-ware-detail"
                flex="auto"
                span={21}
                style={{ alignItems: 'center', display: 'flex' }}
              >
                <Row
                  __component_name="Row"
                  gutter={['', '']}
                  style={{ paddingLeft: '20px' }}
                  wrap={true}
                />
                {!!__$$eval(() => this.history?.query.modelSource === 'local') && (
                  <Descriptions
                    __component_name="Descriptions"
                    bordered={false}
                    borderedBottom={false}
                    borderedBottomDashed={false}
                    colon={true}
                    column={8}
                    items={[
                      {
                        children: [
                          <Status
                            __component_name="Status"
                            id={__$$eval(() => this.state.data.status)}
                            types={[
                              { children: '异常', id: 'False', type: 'error' },
                              { children: '正常', id: 'True', type: 'success' },
                            ]}
                            key="node_oclu0miditz"
                          />,
                          <Tooltip
                            __component_name="Tooltip"
                            title={__$$eval(() => this.state.data.message)}
                            key="node_oclu0midit10"
                          >
                            {!!__$$eval(() => this.state.data.status === 'False') && (
                              <AntdIconInfoCircleOutlined
                                __component_name="AntdIconInfoCircleOutlined"
                                style={{ marginLeft: '20px' }}
                              />
                            )}
                          </Tooltip>,
                        ],
                        key: '918t94n9pza',
                        label: '状态',
                        span: 1,
                      },
                      {
                        children: (
                          <Typography.Text
                            __component_name="Typography.Text"
                            copyable={false}
                            disabled={false}
                            ellipsis={true}
                            strong={false}
                            style={{ fontSize: '', maxWidth: '100%', width: '100%' }}
                          >
                            {__$$eval(() => this.state.modelSourceName || '-')}
                          </Typography.Text>
                        ),
                        key: 'qts1prkau6',
                        label: '模型地址',
                        span: 1,
                      },
                      {
                        children: __$$evalArray(() => this.state.data?.types?.split(',')).map(
                          (item, index) =>
                            (__$$context => (
                              <Tag __component_name="Tag" closable={false} color="success">
                                {__$$eval(() => item)}
                              </Tag>
                            ))(__$$createChildContext(__$$context, { item, index }))
                        ),
                        key: '7cmmj6aoyzm',
                        label: '模型类型',
                        span: 1,
                      },
                    ]}
                    layout="horizontal"
                    size="default"
                    style={{}}
                    title={
                      <Row
                        __component_name="Row"
                        gutter={[null, 0]}
                        style={{ marginBottom: '0px' }}
                        wrap={true}
                      >
                        <Col __component_name="Col" span={24} style={{ marginBottom: '0px' }}>
                          <Typography.Title
                            __component_name="Typography.Title"
                            bold={true}
                            bordered={false}
                            ellipsis={true}
                            level={1}
                            style={{ marginRight: '8px', paddingRight: '8px' }}
                          >
                            {__$$eval(() => this.utils.getFullName(this.state.data) || '-')}
                          </Typography.Title>
                        </Col>
                      </Row>
                    }
                  />
                )}
                {!!__$$eval(() => this.history?.query.modelSource !== 'local') && (
                  <Descriptions
                    __component_name="Descriptions"
                    bordered={false}
                    borderedBottom={false}
                    borderedBottomDashed={false}
                    colon={true}
                    column={6}
                    items={[
                      {
                        children: [
                          <Status
                            __component_name="Status"
                            id={__$$eval(() => this.state.data.status)}
                            types={[
                              { children: '异常', id: 'False', type: 'error' },
                              { children: '正常', id: 'True', type: 'success' },
                            ]}
                            key="node_oclu0miditn"
                          />,
                          <Tooltip
                            __component_name="Tooltip"
                            title={__$$eval(() => this.state.data.message)}
                            key="node_oclu0miditw"
                          >
                            {!!__$$eval(() => this.state.data.status === 'False') && (
                              <AntdIconInfoCircleOutlined
                                __component_name="AntdIconInfoCircleOutlined"
                                style={{ marginLeft: '20px' }}
                              />
                            )}
                          </Tooltip>,
                        ],
                        key: 'vf42cdbq3y',
                        label: '状态',
                        span: 1,
                      },
                      {
                        children: (
                          <Typography.Text
                            __component_name="Typography.Text"
                            copyable={__$$eval(() => this.state.modelSourceName !== '本地模型')}
                            disabled={false}
                            ellipsis={true}
                            strong={false}
                            style={{ fontSize: '', maxWidth: '100%', width: '100%' }}
                          >
                            {__$$eval(() => this.state.modelSourceName || '-')}
                          </Typography.Text>
                        ),
                        key: 'qts1prkau6',
                        label: '模型地址',
                        span: 1,
                      },
                      {
                        children: (
                          <Typography.Text
                            __component_name="Typography.Text"
                            disabled={false}
                            ellipsis={true}
                            strong={false}
                            style={{ fontSize: '' }}
                          >
                            {__$$eval(() => this.state.data.revision || '-')}
                          </Typography.Text>
                        ),
                        key: '3y6x8ue0rz',
                        label: '分支',
                        span: 1,
                      },
                      {
                        children: __$$evalArray(() => this.state.data?.types?.split(',')).map(
                          (item, index) =>
                            (__$$context => (
                              <Tag __component_name="Tag" closable={false} color="success">
                                {__$$eval(() => item)}
                              </Tag>
                            ))(__$$createChildContext(__$$context, { item, index }))
                        ),
                        key: '7cmmj6aoyzm',
                        label: '模型类型',
                        span: 1,
                      },
                    ]}
                    layout="horizontal"
                    size="default"
                    style={{}}
                    title={
                      <Row
                        __component_name="Row"
                        gutter={[null, 0]}
                        style={{ marginBottom: '0px' }}
                        wrap={true}
                      >
                        <Col __component_name="Col" span={24} style={{ marginBottom: '0px' }}>
                          <Typography.Title
                            __component_name="Typography.Title"
                            bold={true}
                            bordered={false}
                            ellipsis={true}
                            level={1}
                            style={{ marginRight: '8px', paddingRight: '8px' }}
                          >
                            {__$$eval(() => this.utils.getFullName(this.state.data) || '-')}
                          </Typography.Title>
                        </Col>
                      </Row>
                    }
                  />
                )}
              </Col>
              <Col __component_name="Col" flex="110px" style={{ height: '56px', width: '56px' }}>
                {!!__$$eval(() => this.state.data.status === 'True') && (
                  <Dropdown.Button
                    __component_name="Dropdown.Button"
                    danger={false}
                    destroyPopupOnHide={true}
                    disabled={false}
                    menu={{
                      items: [
                        { key: 'baseinfo', label: '基础信息' },
                        { key: 'edit', label: '编辑' },
                        { key: 'del', label: '删除' },
                      ],
                      onClick: function () {
                        return this.onMenuClick.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                    }}
                    onClick={function () {
                      return this.onDeploy.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    placement="bottomCenter"
                    trigger={['hover']}
                    type="default"
                  >
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      部署
                    </Typography.Text>
                  </Dropdown.Button>
                )}
                {!!__$$eval(() => this.state.data.status === 'False') && (
                  <Dropdown.Button
                    __component_name="Dropdown.Button"
                    danger={false}
                    destroyPopupOnHide={true}
                    disabled={false}
                    menu={{
                      items: [
                        { key: 'baseinfo', label: '基础信息' },
                        { key: 'del', label: '删除' },
                        { disabled: true, key: 'deploy', label: '部署' },
                      ],
                      onClick: function () {
                        return this.onMenuClick.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                    }}
                    onClick={function () {
                      return this.onEdit.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    placement="bottomCenter"
                    trigger={['hover']}
                    type="default"
                  >
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      编辑
                    </Typography.Text>
                  </Dropdown.Button>
                )}
              </Col>
            </Row>
          </Card>
        </Spin>
        <Card
          __component_name="Card"
          actions={[]}
          bordered={false}
          hoverable={false}
          loading={false}
          size="default"
          style={{ marginTop: '16px' }}
          type="default"
        >
          <Tabs
            __component_name="Tabs"
            activeKey=""
            destroyInactiveTabPane="true"
            items={[
              {
                children: (
                  <Spin __component_name="Spin" spinning={__$$eval(() => this.state.readmeLoading)}>
                    <ReactMarkdownLowcode __component_name="ReactMarkdownLowcode">
                      {__$$eval(() => this.state.readmeData)}
                    </ReactMarkdownLowcode>
                  </Spin>
                ),
                key: 'detail',
                label: '模型介绍',
              },
              {
                children: (
                  <Row __component_name="Row" gutter={['', 12]} wrap={true}>
                    <Col __component_name="Col" span={24}>
                      <Row __component_name="Row" justify="space-between" wrap={false}>
                        <Col __component_name="Col">
                          <Space align="center" direction="horizontal" size={12}>
                            {!!__$$eval(
                              () =>
                                !this.state.data?.systemModel ||
                                (this.state.data?.systemModel &&
                                  this.state.data?.namespace === this.utils.getAuthData()?.project)
                            ) && (
                              <Button
                                __component_name="Button"
                                block={false}
                                danger={false}
                                disabled={false}
                                ghost={false}
                                href=""
                                icon={
                                  <AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />
                                }
                                onClick={function () {
                                  return this.openUploadModal.apply(
                                    this,
                                    Array.prototype.slice.call(arguments).concat([])
                                  );
                                }.bind(this)}
                                shape="default"
                                target="_self"
                                type="primary"
                              >
                                上传模型文件
                              </Button>
                            )}
                            <Button
                              __component_name="Button"
                              block={false}
                              danger={false}
                              disabled={false}
                              ghost={false}
                              icon={
                                <AntdIconReloadOutlined __component_name="AntdIconReloadOutlined" />
                              }
                              onClick={function () {
                                return this.getData.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              shape="default"
                            >
                              刷新
                            </Button>
                            {!!__$$eval(
                              () =>
                                !this.state.data?.systemModel ||
                                (this.state.data?.systemModel &&
                                  this.state.data?.namespace === this.utils.getAuthData()?.project)
                            ) && (
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
                                  return this.onDeleteBatch.apply(
                                    this,
                                    Array.prototype.slice.call(arguments).concat([])
                                  );
                                }.bind(this)}
                                shape="default"
                              >
                                删除
                              </Button>
                            )}
                            <Input.Search
                              __component_name="Input.Search"
                              onSearch={function () {
                                return this.onSearch.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              placeholder="请输入文件名称搜索"
                              style={{ width: '240px' }}
                            />
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                    <Col __component_name="Col" span={24}>
                      <Table
                        __component_name="Table"
                        columns={[
                          {
                            _unsafe_MixedSetter_width_select: 'StringSetter',
                            dataIndex: 'path',
                            key: 'name',
                            title: '名称',
                            width: '25%',
                          },
                          { dataIndex: 'status', key: 'status', title: '状态' },
                          { dataIndex: 'size', key: 'size', title: '文件大小' },
                          {
                            dataIndex: 'op',
                            key: 'op',
                            render: (text, record, index) =>
                              (__$$context => (
                                <Space
                                  __component_name="Space"
                                  align="center"
                                  direction="horizontal"
                                >
                                  <Button
                                    __component_name="Button"
                                    block={false}
                                    danger={false}
                                    disabled={__$$eval(
                                      () =>
                                        __$$context.state.data?.systemModel &&
                                        __$$context.state.data?.namespace !==
                                          __$$context.utils.getAuthData()?.project
                                    )}
                                    ghost={false}
                                    onClick={function () {
                                      return this.openDeleteFilesModal.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([
                                          {
                                            record: record,
                                          },
                                        ])
                                      );
                                    }.bind(__$$context)}
                                    shape="default"
                                    size="small"
                                  >
                                    删除
                                  </Button>
                                </Space>
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            title: '操作',
                            width: 160,
                          },
                        ]}
                        dataSource={__$$eval(() => this.state.data?.files?.nodes || [])}
                        pagination={false}
                        rowKey="path"
                        rowSelection={{
                          onChange: function () {
                            return this.onRowSelectedChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                          type: 'checkbox',
                        }}
                        scroll={{ scrollToFirstRowOnChange: true }}
                        showHeader={true}
                        size="middle"
                      />
                      <Row __component_name="Row" gutter={['', '']} wrap={true}>
                        <Col __component_name="Col" span={24}>
                          <Row __component_name="Row" wrap={true}>
                            <Col __component_name="Col" span={24}>
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col" />
                                <Col __component_name="Col">
                                  <Pagination
                                    __component_name="Pagination"
                                    current={__$$eval(
                                      () => this.state.fileSearchParams.currentPage
                                    )}
                                    onChange={function () {
                                      return this.handlePaginationChange.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([])
                                      );
                                    }.bind(this)}
                                    onShowSizeChange={function () {
                                      return this.handlePaginationChange.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([])
                                      );
                                    }.bind(this)}
                                    pageSize={__$$eval(() => this.state.fileSearchParams.pageSize)}
                                    showTotal={function () {
                                      return this.showTotal.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([])
                                      );
                                    }.bind(this)}
                                    simple={false}
                                    style={{
                                      marginBottom: '24px',
                                      marginTop: '16px',
                                      textAlign: 'right',
                                    }}
                                    total={__$$eval(() => this.state.data?.files?.totalCount || 0)}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ),
                hidden: __$$eval(() => this.history?.query?.modelSource !== 'local'),
                key: 'file',
                label: '模型文件',
              },
            ]}
            onChange={function () {
              return this.onTabChange.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            size="default"
            style={{ marginTop: '-24px' }}
            tabBarGutter={24}
            tabPosition="top"
            type="line"
          >
            <Spin __component_name="Spin" spinning={false} />
            <Modal
              __component_name="Modal"
              centered={false}
              confirmLoading={false}
              destroyOnClose={true}
              forceRender={false}
              keyboard={true}
              mask={true}
              maskClosable={false}
              open={true}
              title="弹框标题"
            />
          </Tabs>
        </Card>
        <Modal
          __component_name="Modal"
          centered={false}
          confirmLoading={__$$eval(() => this.state.deleteLoading)}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.closeDeleteFilesModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.onSubmitDel.apply(
              this,
              Array.prototype.slice.call(arguments).concat([
                {
                  files: 123,
                },
              ])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.deleteFilesVisible)}
          title="删除文件"
        >
          <Alert __component_name="Alert" message="确认删除文件？" showIcon={true} type="warning" />
        </Modal>
        <Modal
          __component_name="Modal"
          centered={false}
          confirmLoading={__$$eval(() => this.state.submitLoading)}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.closeUploadModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.onSubmitUpload.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.uploadModalVisible)}
          title="文件上传"
          width="700px"
        >
          <LccComponentQlsmm
            __component_name="LccComponentQlsmm"
            accept=""
            Authorization={__$$eval(() => this.utils.getAuthorization())}
            bucket={__$$eval(() => this.utils.getAuthData()?.project)}
            calcUploadedFile={function () {
              return this.calcUploadedFile.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
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
            isSupportFolder={true}
            label="上传"
            setState={function () {
              return this.setUploadState.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
          />
        </Modal>
        <Modal
          __component_name="Modal"
          centered={false}
          confirmLoading={__$$eval(() => this.state.deleteAppLoading)}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.closeDeleteAppModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.onDeleteModelApp.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.deleteAppModalVisible)}
          title="删除模型"
        >
          <Alert
            __component_name="Alert"
            message="确认删除此模型？"
            showIcon={true}
            type="warning"
          />
        </Modal>
        <Modal
          __component_name="Modal"
          cancelButtonProps={{ disabled: false }}
          centered={false}
          className="modal_not_footer"
          confirmLoading={false}
          destroyOnClose={true}
          footer={null}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          okButtonProps={{ disabled: true }}
          onCancel={function () {
            return this.closeOpenBaseInfoModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.baseInfoModalVisible)}
          title="基本信息"
          width="680px"
        >
          {!!__$$eval(() => this.history?.query.modelSource === 'local') && (
            <Descriptions
              __component_name="Descriptions"
              bordered={false}
              borderedBottom={false}
              borderedBottomDashed={false}
              colon={true}
              column={2}
              items={[
                {
                  children: (
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      {__$$eval(() => this.state.data?.name || '-')}
                    </Typography.Text>
                  ),
                  key: 'rih7p2dysbo',
                  label: '模型名称',
                  span: 1,
                },
                {
                  children: (
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      {__$$eval(() => this.state.data?.id || '-')}
                    </Typography.Text>
                  ),
                  key: '0kkdql8bwqcm',
                  label: 'ID',
                  span: 1,
                },
                {
                  children: (
                    <Typography.Time
                      __component_name="Typography.Time"
                      format="YYYY-MM-DD HH:mm:ss"
                      relativeTime={false}
                      time={__$$eval(() => this.state.data?.updateTimestamp || '-')}
                    />
                  ),
                  key: '7sl4fga857j',
                  label: '更新时间',
                  span: 1,
                },
                {
                  children: (
                    <Typography.Time
                      __component_name="Typography.Time"
                      format="YYYY-MM-DD HH:mm:ss"
                      relativeTime={false}
                      time={__$$eval(() => this.state.data?.creationTimestamp || '-')}
                    />
                  ),
                  key: 's40dyqz93',
                  label: '创建时间',
                  span: 1,
                },
                {
                  children: (
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      {__$$eval(() => this.state.data?.creator || '-')}
                    </Typography.Text>
                  ),
                  key: 'vx2ug1ccct',
                  label: '创建者',
                  span: 2,
                },
                {
                  children: (
                    <Typography.Paragraph
                      code={false}
                      delete={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
                      mark={false}
                      strong={false}
                      style={{ fontSize: '' }}
                      underline={false}
                    >
                      {__$$eval(() => this.state.data?.description || '-')}
                    </Typography.Paragraph>
                  ),
                  key: 'sw0a4avmxhl',
                  label: '描述',
                  span: 2,
                },
              ]}
              labelStyle={{ width: 80 }}
              layout="horizontal"
              size="default"
              style={{}}
              title=""
            />
          )}
          {!!__$$eval(() => this.history?.query.modelSource !== 'local') && (
            <Descriptions
              __component_name="Descriptions"
              bordered={false}
              borderedBottom={false}
              borderedBottomDashed={false}
              colon={true}
              column={2}
              items={[
                {
                  children: (
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      {__$$eval(() => this.state.data?.name || '-')}
                    </Typography.Text>
                  ),
                  key: 'rih7p2dysbo',
                  label: '模型名称',
                  span: 1,
                },
                {
                  children: (
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      {__$$eval(() => this.state.data?.id || '-')}
                    </Typography.Text>
                  ),
                  key: '0kkdql8bwqcm',
                  label: 'ID',
                  span: 1,
                },
                {
                  children: (
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      {__$$eval(() => this.state.data?.token || '-')}
                    </Typography.Text>
                  ),
                  key: 'm029qv9anc',
                  label: 'Token',
                  span: __$$eval(() => (this.history?.query?.modelSource !== 'local' ? 1 : 0)),
                },
                {
                  children: (
                    <Typography.Time
                      __component_name="Typography.Time"
                      format="YYYY-MM-DD HH:mm:ss"
                      relativeTime={false}
                      time={__$$eval(() => this.state.data?.updateTimestamp || '-')}
                    />
                  ),
                  key: '7sl4fga857j',
                  label: '更新时间',
                  span: 1,
                },
                {
                  children: (
                    <Typography.Time
                      __component_name="Typography.Time"
                      format="YYYY-MM-DD HH:mm:ss"
                      relativeTime={false}
                      time={__$$eval(() => this.state.data?.creationTimestamp || '-')}
                    />
                  ),
                  key: 's40dyqz93',
                  label: '创建时间',
                  span: 1,
                },
                {
                  children: (
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '' }}
                    >
                      {__$$eval(() => this.state.data?.creator || '-')}
                    </Typography.Text>
                  ),
                  key: 'vx2ug1ccct',
                  label: '创建者',
                  span: 1,
                },
                {
                  children: (
                    <Typography.Paragraph
                      code={false}
                      delete={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
                      mark={false}
                      strong={false}
                      style={{ fontSize: '' }}
                      underline={false}
                    >
                      {__$$eval(() => this.state.data?.description || '-')}
                    </Typography.Paragraph>
                  ),
                  key: 'sw0a4avmxhl',
                  label: '描述',
                  span: 2,
                },
              ]}
              labelStyle={{ textAlign: 'right', width: 80 }}
              layout="horizontal"
              size="small"
              style={{ textAlign: 'left' }}
              title=""
            />
          )}
        </Modal>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/model-warehouse/detail/:name' }, location.pathname);
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
        <ModelWarehouseDetail$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
