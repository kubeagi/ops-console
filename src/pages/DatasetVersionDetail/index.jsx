// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Drawer,
  Table,
  Modal,
  Alert,
  FormilyForm,
  Row,
  Col,
  Space,
  Button,
  Card,
  Image,
  Typography,
  Status,
  Divider,
  Tabs,
  Descriptions,
} from '@tenx-ui/materials';

import LccComponentQlsmm from 'KubeAGIUpload';

import LccComponentSbva0 from 'confirm';

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
      addFileLoading: false,
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

  addFileClick(event) {
    this.setState({
      addFileVisible: true,
    });
  }

  addFileOk() {
    if (this.state.upload.uploadThis?.state?.fileList?.length) {
      this.setState({
        addFileLoading: true,
      });
    }
    const fetch = async () => {
      try {
        this.handleReUpload();
      } catch (e) {}
    };
    // 点击确定回调
    this.form()?.submit(fetch);
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

  form(name) {
    return this.$(name || 'add_file')?.formRef?.current?.form;
  }

  getBucketPath() {
    return `dataset/${this.props.useGetDataset.data?.Dataset?.getDataset?.name}/${
      this.data().data?.version
    }`;
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
        list: res?.data?.rows?.map(row => ({
          q: row?.[0],
          a: row?.[1],
        })),
        total: res?.data?.total,
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
    if (!(this.state.upload?.uploadThis?.state?.fileList?.length > 0)) {
      this.handleCancle();
      return;
    }
    this.state.upload?.uploadThis?.state?.fileList?.forEach(file => {
      this.state.upload?.uploadThis?.computeMD5(file);
    });
  }

  handleUploadFinished(file, res) {
    this.setFileUploadStatus(file);
  }

  handleUploadSuccess() {
    this.setState({
      addFileVisible: false,
    });
    this.utils.notification.success({
      message: '新增文件成功',
    });
    this.refresh();
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

  onFileUploaded(file) {
    this.setFileUploadStatus(file);
    this.utils.notification.success({
      message: `文件 ${file.name} 已经存在，无需再次上传`,
    });
    this.handleCancle();
  }

  openFileDetail(e, { data }) {
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
      upload: state,
    });
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
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
                width: '50%',
              },
              {
                _unsafe_MixedSetter_width_select: 'StringSetter',
                dataIndex: 'a',
                key: 'a',
                title: 'A',
                width: '50%',
              },
            ]}
            dataSource={__$$eval(() =>
              (() => {
                console.log(this.state.cvsData?.list || []);
                return this.state.cvsData?.list || [];
              })()
            )}
            loading={__$$eval(() => this.state.cvsData.loading)}
            pagination={{
              current: __$$eval(() => this.state.cvsData?.current || 1),
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
              formHelper={{ autoFocus: true }}
              ref={this._refsManager.linkRef('add_file')}
            >
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
                setState={function () {
                  return this.setUploadState.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
              />
            </FormilyForm>
          </Modal>
        )}
        <LccComponentSbva0
          __component_name="LccComponentSbva0"
          data={__$$eval(() => this.state.confirm)}
        />
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
          hoverable={false}
          loading={false}
          size="default"
          style={{ marginBottom: '16px' }}
          type="default"
        >
          <Row __component_name="Row">
            <Col __component_name="Col" flex="470px">
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={4}>
                  <Image
                    __component_name="Image"
                    fallback=""
                    height={64}
                    preview={false}
                    src={__$$eval(() => this.constants.DATASET_DATA.versionImg)}
                    width={64}
                  />
                </Col>
                <Col __component_name="Col" span={6}>
                  <Row __component_name="Row" wrap={true}>
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
                    <Col __component_name="Col" flex="" span={24}>
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
            destroyInactiveTabPane="true"
            items={[
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
                        children: (
                          <Status
                            __component_name="Status"
                            id={__$$eval(() => this.data().data?.syncStatus)}
                            types={__$$eval(() => this.constants.DATASET_DATA.syncStatus)}
                          />
                        ),
                        key: 'xvcp3obfu',
                        label: '同步状态',
                        span: 24,
                      },
                      {
                        _unsafe_MixedSetter_children_select: 'SlotSetter',
                        children: (
                          <Status
                            __component_name="Status"
                            id={__$$eval(() => this.data().data?.dataProcessStatus || 'no')}
                            types={__$$eval(() => this.constants.DATASET_DATA.dataProcessStatus)}
                          />
                        ),
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
                key: 'tab-item-1',
                label: this.i18n('i18n-1gikmooh') /* 详细信息 */,
              },
              {
                children: [
                  <Row __component_name="Row" wrap={false} key="node_oclpkviwvr1">
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
                                <Button
                                  __component_name="Button"
                                  block={false}
                                  danger={false}
                                  disabled={false}
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
                      pageSize: 10,
                      pagination: { pageSize: 10 },
                      showQuickJumper: false,
                      showSizeChanger: false,
                      simple: false,
                      size: 'default',
                    }}
                    rowKey="id"
                    scroll={{ scrollToFirstRowOnChange: true }}
                    showHeader={true}
                    size="middle"
                    style={{}}
                    key="node_oclpktaw526"
                  />,
                ],
                key: 'fxyz5e43ztm',
                label: '文件',
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
