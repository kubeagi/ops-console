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
  UnifiedLink,
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
      addFileVisible: false,
      upload: {},
      confirm: {},
      openFile: false,
      fileData: {},
      cvsData: {
        current: 1,
        list: [],
      },
    };
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {}

  form(name) {
    return this.$(name || 'add_file')?.formRef?.current?.form;
  }

  data() {
    return {
      ...this.props.useGetVersionedDataset,
      data: this.props.useGetVersionedDataset.data?.VersionedDataset?.getVersionedDataset || {},
    };
  }

  refresh() {
    this.utils?.changeLocationQuery(this, 'useGetVersionedDataset', {
      name: this.match?.params?.versionId,
      namespace: this.utils.getAuthData?.()?.project,
      _: new Date().getTime(),
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

  setUploadState(state) {
    this.setState({
      upload: state,
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

  handleCancle() {
    this.setState({
      addFileVisible: false,
    });
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

  addFileClick(event) {
    this.setState({
      addFileVisible: true,
    });
  }

  addFileOk() {
    const fetch = async () => {
      try {
        this.handleReUpload();
      } catch (e) {}
    };
    // 点击确定回调
    this.form()?.submit(fetch);
  }

  getBucketPath() {
    return `dataset/${this.props.useGetDataset.data?.Dataset?.getDataset?.name}/${
      this.data().data?.version
    }`;
  }

  handleUploadFinished(file, res) {
    console.log('handleUploadFinished,', file, res);
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
            .delete(`${window.location.origin}/kubeagi-apis/bff/versioneddataset/files`, {
              data: {
                files: [data.path],
                bucket: this.utils.getAuthData?.()?.project,
                bucketPath: this.getBucketPath(),
              },
              headers: {
                Authorization: this.utils.getAuthorization(),
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

  openFileDetail(e, { data }) {
    // 事件的 handler
    console.log('onClick!!!data:', data);
    this.setState(
      {
        openFile: true,
        fileData: data,
      },
      this.getFile.bind(this)
    );
  }

  onFileClose(event) {
    this.setState({
      openFile: false,
      fileData: {},
    });
  }

  async getFile() {
    const res = await this.utils.axios.get(
      `${
        window.location.origin
      }/kubeagi-apis/bff/versioneddataset/files/csv?page=1&size=10&bucket=${
        this.utils.getAuthData?.()?.project
      }&bucketPath=${this.getBucketPath()}&fileName=${this.state.fileData?.path}`,
      {
        headers: {
          Authorization: this.utils.getAuthorization(),
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
      },
    });
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Drawer
          mask={true}
          open={__$$eval(() => this.state.openFile)}
          extra=""
          title={__$$eval(() => this.state.fileData.path)}
          width="70%"
          footer=""
          onClose={function () {
            return this.onFileClose.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          placement="right"
          maskClosable={true}
          destroyOnClose={true}
          __component_name="Drawer"
        >
          <Table
            __component_name="Table"
            rowKey="id"
            dataSource={__$$eval(() => this.state.cvsData?.list || [])}
            columns={[
              {
                title: 'Q',
                dataIndex: 'q',
                key: 'q',
                _unsafe_MixedSetter_width_select: 'StringSetter',
                width: '50%',
              },
              {
                title: 'A',
                dataIndex: 'a',
                key: 'a',
                _unsafe_MixedSetter_width_select: 'StringSetter',
                width: '50%',
              },
            ]}
            pagination={{
              pageSize: 10,
              total: __$$eval(() => this.state.cvsData?.total || 0),
              current: __$$eval(() => this.state.cvsData?.current || 1),
              showSizeChanger: false,
              showQuickJumper: false,
              simple: false,
              size: 'default',
              pagination: { pageSize: 10 },
            }}
            showHeader={true}
            size="middle"
            scroll={{ scrollToFirstRowOnChange: true }}
          />
        </Drawer>
        {!!__$$eval(() => this.state.delFileVisible) && (
          <Modal
            mask={true}
            onOk={function () {
              return this.delFileOk.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            open={true}
            title="删除文件"
            centered={false}
            keyboard={true}
            onCancel={function () {
              return this.delFileCancle.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            forceRender={false}
            maskClosable={false}
            confirmLoading={false}
            destroyOnClose={true}
            __component_name="Modal"
          >
            <Alert
              type="warning"
              message={__$$eval(() => `确定删除文件：${this.state.delFileData.path} ？`)}
              showIcon={true}
              __component_name="Alert"
            />
          </Modal>
        )}
        <Modal
          mask={true}
          onOk={function () {
            return this.addFileOk.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={__$$eval(() => this.state.addFileVisible)}
          title="新增文件"
          width="650px"
          centered={false}
          keyboard={true}
          onCancel={function () {
            return this.handleCancle.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          forceRender={false}
          maskClosable={false}
          confirmLoading={false}
          destroyOnClose={false}
          __component_name="Modal"
        >
          <FormilyForm
            ref={this._refsManager.linkRef('add_file')}
            formHelper={{ autoFocus: true }}
            componentProps={{
              colon: false,
              layout: 'horizontal',
              labelCol: 4,
              labelAlign: 'left',
              wrapperCol: 20,
            }}
            __component_name="FormilyForm"
          >
            <LccComponentQlsmm
              accept=".txt,.doc,.docx,.pdf,.md"
              bucket={__$$eval(() => this.utils.getAuthData()?.project)}
              setState={function () {
                return this.setUploadState.apply(
                  this,
                  Array.prototype.slice.call(arguments).concat([])
                );
              }.bind(this)}
              contentWidth="520px"
              Authorization={__$$eval(() => this.utils.getAuthorization())}
              getBucketPath={function () {
                return this.getBucketPath.apply(
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
              __component_name="LccComponentQlsmm"
            />
          </FormilyForm>
        </Modal>
        <LccComponentSbva0
          data={__$$eval(() => this.state.confirm)}
          __component_name="LccComponentSbva0"
        />
        <Row wrap={true} __component_name="Row">
          <Col span={24} style={{ marginBottom: '16px' }} __component_name="Col">
            <Space align="center" direction="horizontal" __component_name="Space">
              <Button.Back
                type="ghost"
                title={this.i18n('i18n-k7qioby7') /* 数据集版本详情 */}
                __component_name="Button.Back"
              />
            </Space>
          </Col>
        </Row>
        <Card
          size="default"
          type="default"
          style={{ marginBottom: '16px' }}
          actions={[]}
          loading={false}
          bordered={false}
          hoverable={false}
          __component_name="Card"
        >
          <Row __component_name="Row">
            <Col flex="470px" __component_name="Col">
              <Row wrap={true} __component_name="Row">
                <Col span={4} __component_name="Col">
                  <Image
                    src={__$$eval(() => this.constants.DATASET_DATA.versionImg)}
                    width={64}
                    height={64}
                    preview={false}
                    fallback=""
                    __component_name="Image"
                  />
                </Col>
                <Col span={6} __component_name="Col">
                  <Row wrap={true} __component_name="Row">
                    <Col span={24} __component_name="Col">
                      <Typography.Title
                        bold={true}
                        level={1}
                        bordered={false}
                        ellipsis={true}
                        __component_name="Typography.Title"
                      >
                        {__$$eval(() => this.data().data?.version || '-')}
                      </Typography.Title>
                    </Col>
                    <Col flex="" span={24} __component_name="Col">
                      <Space
                        align="center"
                        style={{ width: '300px' }}
                        direction="horizontal"
                        __component_name="Space"
                      >
                        <Status
                          id={__$$eval(() => this.data().data?.syncStatus)}
                          types={__$$eval(() => this.constants.DATASET_DATA.syncStatus)}
                          __component_name="Status"
                        />
                        <Divider
                          mode="default"
                          type="vertical"
                          dashed={false}
                          defaultOpen={false}
                          __component_name="Divider"
                        />
                        <Typography.Text
                          style={{ fontSize: '', paddingBottom: '3px' }}
                          strong={false}
                          disabled={false}
                          ellipsis={true}
                          __component_name="Typography.Text"
                        >
                          更新时间:
                        </Typography.Text>
                        <Typography.Time
                          time={__$$eval(() => this.data().data?.updateTimestamp)}
                          format=""
                          relativeTime={true}
                          __component_name="Typography.Time"
                        />
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col
              flex="auto"
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
              __component_name="Col"
            >
              <Space align="center" direction="horizontal" __component_name="Space">
                <Button
                  block={false}
                  ghost={false}
                  shape="default"
                  danger={false}
                  onClick={function () {
                    return this.delVerClick.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  disabled={false}
                  __component_name="Button"
                >
                  删除
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
        <Card
          size="default"
          type="default"
          actions={[]}
          loading={false}
          bordered={false}
          hoverable={false}
          __component_name="Card"
        >
          <Tabs
            size="default"
            type="line"
            items={[
              {
                key: 'tab-item-1',
                label: this.i18n('i18n-1gikmooh') /* 详细信息 */,
                children: (
                  <Descriptions
                    id=""
                    size="default"
                    colon={false}
                    items={[
                      {
                        key: '0whadic76h29',
                        span: 24,
                        label: '名称',
                        children: __$$eval(() => this.data().data?.name),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                      {
                        key: '2y97byqciee',
                        span: 24,
                        label: 'ID',
                        children: __$$eval(() => this.data().data?.id || '-'),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                      {
                        key: 'xvcp3obfu',
                        span: 24,
                        label: '同步状态',
                        children: (
                          <Status
                            id={__$$eval(() => this.data().data?.syncStatus)}
                            types={__$$eval(() => this.constants.DATASET_DATA.syncStatus)}
                            __component_name="Status"
                          />
                        ),
                        _unsafe_MixedSetter_children_select: 'SlotSetter',
                      },
                      {
                        key: 'er0ptk5lill',
                        span: 24,
                        label: this.i18n('i18n-p5qipded') /* 数据处理状态 */,
                        children: (
                          <Status
                            id={__$$eval(() => this.data().data?.dataProcessStatus || 'no')}
                            types={__$$eval(() => this.constants.DATASET_DATA.dataProcessStatus)}
                            __component_name="Status"
                          />
                        ),
                        _unsafe_MixedSetter_children_select: 'SlotSetter',
                      },
                      {
                        key: 'ww04wf6evps',
                        span: 24,
                        label: this.i18n('i18n-qjodl1nn') /* 创建时间 */,
                        children: (
                          <Typography.Time
                            time={__$$eval(() => this.data().data?.creationTimestamp)}
                            format=""
                            relativeTime={true}
                            __component_name="Typography.Time"
                          />
                        ),
                        _unsafe_MixedSetter_children_select: 'SlotSetter',
                      },
                      {
                        key: 'ajc9nhn140i',
                        span: 24,
                        label: this.i18n('i18n-sg7nu8tx') /* 创建者 */,
                        children: __$$eval(() => this.data().data?.creator || '-'),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                      {
                        key: '3p5bkjlrh9u',
                        span: 24,
                        label: this.i18n('i18n-txt5kh4m') /* 描述 */,
                        children: __$$eval(() => this.data().data?.description || '-'),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                    ]}
                    title=""
                    column={3}
                    layout="horizontal"
                    bordered={false}
                    labelStyle={{ width: 100 }}
                    borderedBottom={false}
                    __component_name="Descriptions"
                    borderedBottomDashed={false}
                  />
                ),
              },
              {
                key: 'fxyz5e43ztm',
                label: '文件',
                children: [
                  <Row wrap={false} __component_name="Row" key="node_oclpkviwvr1">
                    <Col flex="270px" __component_name="Col">
                      <Space
                        align="center"
                        style={{}}
                        direction="horizontal"
                        __component_name="Space"
                      >
                        <Button
                          type="primary"
                          block={false}
                          ghost={false}
                          shape="default"
                          danger={false}
                          onClick={function () {
                            return this.addFileClick.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          disabled={false}
                          __component_name="Button"
                        >
                          新增文件
                        </Button>
                        <Button
                          block={false}
                          ghost={false}
                          shape="default"
                          style={{}}
                          danger={false}
                          onClick={function () {
                            return this.refresh.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          disabled={false}
                          __component_name="Button"
                        >
                          刷新
                        </Button>
                      </Space>
                    </Col>
                  </Row>,
                  <Table
                    size="middle"
                    style={{}}
                    rowKey="id"
                    scroll={{ scrollToFirstRowOnChange: true }}
                    columns={[
                      {
                        key: 'path',
                        title: '文件',
                        render: (text, record, index) =>
                          (__$$context => (
                            <Row
                              wrap={true}
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
                              __component_name="Row"
                            >
                              <Col span={24} __component_name="Col">
                                <UnifiedLink
                                  to=""
                                  target="_self"
                                  inQianKun={false}
                                  __component_name="UnifiedLink"
                                >
                                  {__$$eval(() => record.path || '-')}
                                </UnifiedLink>
                              </Col>
                            </Row>
                          ))(__$$createChildContext(__$$context, { text, record, index })),
                        ellipsis: { showTitle: true },
                        dataIndex: 'path',
                      },
                      {
                        key: 'fileType',
                        title: '标签',
                        width: 150,
                        render: (text, record) => record.fileType || '-',
                        dataIndex: 'fileType',
                      },
                      { key: 'size', title: '文件大小', width: 150, dataIndex: 'size' },
                      {
                        key: 'count',
                        title: '数据量',
                        width: 150,
                        render: (text, record) => record.count || 0,
                        dataIndex: 'count',
                      },
                      {
                        key: 'time',
                        title: '创建时间',
                        width: 100,
                        render: (text, record, index) =>
                          (__$$context => (
                            <Typography.Time
                              time={__$$eval(() => record.time)}
                              format=""
                              relativeTime={true}
                              __component_name="Typography.Time"
                            />
                          ))(__$$createChildContext(__$$context, { text, record, index })),
                        dataIndex: 'time',
                      },
                      {
                        key: 'action',
                        title: '操作',
                        width: 150,
                        render: (text, record, index) =>
                          (__$$context => (
                            <Button
                              icon=""
                              block={false}
                              ghost={false}
                              shape="default"
                              danger={false}
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
                              disabled={false}
                              __component_name="Button"
                            >
                              删除
                            </Button>
                          ))(__$$createChildContext(__$$context, { text, record, index })),
                        dataIndex: '',
                      },
                    ]}
                    dataSource={__$$eval(() => this.data().data?.files?.nodes || [])}
                    pagination={{
                      size: 'default',
                      simple: false,
                      pageSize: 10,
                      pagination: { pageSize: 10 },
                      showQuickJumper: false,
                      showSizeChanger: false,
                    }}
                    showHeader={true}
                    __component_name="Table"
                    key="node_oclpktaw526"
                  />,
                ],
              },
            ]}
            style={{ marginTop: '-20px' }}
            activeKey=""
            tabPosition="top"
            __component_name="Tabs"
            destroyInactiveTabPane="true"
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
    get state() {
      return oldContext.state
    }
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
