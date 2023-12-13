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
  Typography,
  Status,
  Tabs,
  Modal,
  Descriptions,
  Tag,
  Space,
  Input,
  Table,
  Pagination,
  Alert,
} from '@tenx-ui/materials';

import {
  AntdIconCodeSandboxCircleFilled,
  AntdIconPlusOutlined,
  AntdIconReloadOutlined,
  AntdIconDeleteOutlined,
} from '@tenx-ui/icon-materials';

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
      uploadModalVisible: false,
      loading: false,
      name: this.match.params.name,
      data: {},
      submitLoading: false,
      uploadedFileCount: 0,
      deleteFilesVisible: false,
      selectedFileList: [],
      currentFile: '',
      deleteType: 'single',
      deleteLoading: false,
      fileSearchParams: {
        keyword: '',
        currentPage: 1,
      },
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
          type: 'axios',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              uri: `${this.getUrlPrex()}/model/files`,
              isCors: true,
              method: 'DELETE',
              params: {},
              headers: {
                Authorization: this.props.Authorization || this.state.Authorization,
              },
              timeout: 5000,
            };
          }.bind(_this),
        },
      ],
    };
  }

  componentWillUnmount() {
    console.log('will unmount');
  }

  getDataSourceMap() {
    return this.dataSourceMap;
  }

  openUploadModal() {
    this.setState({
      uploadModalVisible: true,
    });
  }

  closeUploadModal() {
    this.setState({
      uploadModalVisible: false,
    });
  }

  getData() {
    this.setState({
      loading: true,
    });
    console.log(this.history);
    const project = this.history?.query.namespace || this.utils.getAuthData()?.project;
    const name = this.match.params.name;
    const params = {
      namespace: project,
      name,
      filesInput: {
        keyword: this.state.fileSearchParams.keyword,
        pageSize: 10,
        page: this.state.fileSearchParams.currentPage,
      },
    };
    this.utils.bff
      .getModel(params)
      .then(res => {
        console.log(res);
        const { Model } = res;
        const { getModel } = Model || {};
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

  showTotal(total, range) {
    // 用于格式化显示表格数据总量
    return `共 ${total} 条`;
  }

  onPageChange(page) {
    this.setState(
      {
        fileSearchParams: {
          ...this.state.fileSearchParams,
          currentPage: page,
        },
      },
      () => {
        this.getData();
      }
    );
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

  onSubmitUpload() {
    this.setState({
      submitLoading: true,
    });
    this.handleReUpload();
  }

  handleReUpload() {
    if (!(this.state.uploadThis?.state?.fileList?.length > 0)) {
      this.handleCancle();
      this.state.uploadThis.setState({
        fileList: [],
      });
      return;
    }
    console.log(this.state.uploadThis);
    this.state.uploadThis?.state?.fileList?.forEach(file => {
      this.state.uploadThis?.computeMD5(file);
    });
  }

  getBucketPath() {
    return `model/${this.state.name}`;
  }

  getUrlPrex() {
    return `${window.location.origin}/kubeagi-apis/bff`;
  }

  getBucket() {
    // namespace
    return this.utils.getAuthData()?.project;
  }

  setUploadState(state) {
    this.setState(state);
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

  handleCancle() {
    this.utils.notification.success({
      message: '上传成功',
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

  openDeleteFilesModal(e, { record }) {
    this.setState({
      deleteFilesVisible: true,
      currentFile: record?.path,
      deleteType: 'single',
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

  onRowSelectedChange(keys) {
    console.log(keys);
    this.setState({
      selectedFileList: keys,
    });
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

  closeDeleteFilesModal() {
    this.setState({
      deleteFilesVisible: false,
      currentFile: '',
    });
  }

  onClick(event) {
    // 点击按钮时的回调

    console.log('onClick', event);
  }

  handleBackFunc(event) {
    // 点击按钮时的回调
    this.history.push('/model-warehouse');
    console.log('onClick', history);
  }

  onChangeSwitch(checked, event) {
    // 变化时回调函数
    this.state.switchState = checked;
    console.log('onChange', checked, event, this.state);
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    this.getData();
    console.log('did mount');
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page style={{}}>
        <Button.Back
          path=""
          type="ghost"
          style={{ opacity: '0' }}
          title="模型仓库详情"
          onClick={function () {
            return this.handleBackFunc.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          __component_name="Button.Back"
        />
        <Spin spinning={__$$eval(() => this.state.loading)} __component_name="Spin">
          <Card
            size="default"
            type="default"
            style={{ marginTop: '16px' }}
            actions={[]}
            loading={false}
            bordered={false}
            hoverable={false}
            __component_name="Card"
          >
            <Row wrap={false} style={{ height: '56px' }} __component_name="Row">
              <Col
                flex="56px"
                span={1}
                style={{ width: '56px', height: '56px' }}
                __component_name="Col"
              >
                <AntdIconCodeSandboxCircleFilled
                  style={{ color: '#4a90e2', fontSize: 56, lineHeight: '0px' }}
                  __component_name="AntdIconCodeSandboxCircleFilled"
                />
              </Col>
              <Col
                flex="auto"
                span={20}
                style={{ height: '56px', display: 'flex', alignItems: 'center' }}
                __component_name="Col"
              >
                <Row
                  wrap={true}
                  style={{ paddingLeft: '20px' }}
                  gutter={['', '']}
                  __component_name="Row"
                >
                  <Col span={24} __component_name="Col">
                    <Row wrap={true} gutter={['', 0]} __component_name="Row">
                      <Col span={24} __component_name="Col">
                        <Typography.Title
                          bold={true}
                          level={1}
                          bordered={false}
                          ellipsis={true}
                          __component_name="Typography.Title"
                        >
                          {__$$eval(() => this.utils.getFullName(this.state.data))}
                        </Typography.Title>
                      </Col>
                      <Col span={24} __component_name="Col">
                        <Status
                          id={__$$eval(() => this.state.data.status)}
                          types={[
                            { id: 'False', type: 'error', children: '异常' },
                            { id: 'True', type: 'success', children: '正常' },
                          ]}
                          __component_name="Status"
                        />
                        <Typography.Text
                          style={{ fontSize: '', paddingLeft: '12px' }}
                          strong={false}
                          disabled={false}
                          ellipsis={true}
                          __component_name="Typography.Text"
                        >
                          更新时间：
                        </Typography.Text>
                        <Typography.Time
                          time={__$$eval(() => this.state.data?.updateTimestamp)}
                          format="YYYY-MM-DD HH:mm:ss"
                          relativeTime={false}
                          __component_name="Typography.Time"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Spin>
        <Card
          size="default"
          type="default"
          style={{ marginTop: '16px' }}
          actions={[]}
          loading={false}
          bordered={false}
          hoverable={false}
          __component_name="Card"
        >
          <Tabs
            size="large"
            type="line"
            items={[
              {
                key: 'tab-item-1',
                label: '详细信息',
                children: (
                  <Descriptions
                    id=""
                    size="default"
                    colon={false}
                    items={[
                      {
                        key: 'xhiw4rl3fr8',
                        span: 1,
                        label: 'ID',
                        children: (
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            {__$$eval(() => this.state.data?.id)}
                          </Typography.Text>
                        ),
                      },
                      {
                        key: 'hdx1if55is',
                        span: 1,
                        label: '模型类型',
                        children: __$$evalArray(() => this.state.data?.types?.split(',')).map(
                          (item, index) =>
                            (__$$context => (
                              <Tag color="success" closable={false} __component_name="Tag">
                                {__$$eval(() =>
                                  item === 'llm' ? 'LLM' : item === 'embedding' ? 'Embedding' : item
                                )}
                              </Tag>
                            ))(__$$createChildContext(__$$context, { item, index }))
                        ),
                      },
                      {
                        key: 'ik4agaf7r1d',
                        span: 1,
                        label: '创建时间',
                        children: (
                          <Typography.Time
                            time={__$$eval(() => this.state.data?.creationTimestamp)}
                            format=""
                            relativeTime={false}
                            __component_name="Typography.Time"
                          />
                        ),
                      },
                      {
                        key: '5c0mxhs31zb',
                        span: 1,
                        label: '创建者',
                        children: (
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            {__$$eval(() => this.state.data?.creator || '-')}
                          </Typography.Text>
                        ),
                      },
                      {
                        key: 'ys4jchfegg',
                        span: 1,
                        label: '描述',
                        children: (
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={false}
                            __component_name="Typography.Text"
                          >
                            {__$$eval(() => this.state.data?.description)}
                          </Typography.Text>
                        ),
                      },
                    ]}
                    title=""
                    column={1}
                    layout="horizontal"
                    bordered={false}
                    labelStyle={{ width: 100 }}
                    borderedBottom={false}
                    __component_name="Descriptions"
                    borderedBottomDashed={false}
                  >
                    <Descriptions.Item key="xhiw4rl3fr8" span={1} label="ID">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="hdx1if55is" span={1} label="任务类型">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="7vo7r2wbqev" span={1} label="处理前数据集">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="ik4agaf7r1d" span={1} label="处理后数据集">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="5c0mxhs31zb" span={1} label="创建时间">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="ys4jchfegg" span={1} label="创建者">
                      {null}
                    </Descriptions.Item>
                  </Descriptions>
                ),
              },
              {
                key: 'tab-item-2',
                label: '模型文件',
                children: (
                  <Row wrap={true} gutter={['', 12]} __component_name="Row">
                    <Col span={24} __component_name="Col">
                      <Row wrap={false} justify="space-between" __component_name="Row">
                        <Col __component_name="Col">
                          <Space size={12} align="center" direction="horizontal">
                            {!!__$$eval(() => !this.state.data?.systemModel) && (
                              <Button
                                href=""
                                icon={
                                  <AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />
                                }
                                type="primary"
                                block={false}
                                ghost={false}
                                shape="default"
                                danger={false}
                                target="_self"
                                onClick={function () {
                                  return this.openUploadModal.apply(
                                    this,
                                    Array.prototype.slice.call(arguments).concat([])
                                  );
                                }.bind(this)}
                                disabled={false}
                                __component_name="Button"
                              >
                                上传模型文件
                              </Button>
                            )}
                            <Button
                              icon={
                                <AntdIconReloadOutlined __component_name="AntdIconReloadOutlined" />
                              }
                              block={false}
                              ghost={false}
                              shape="default"
                              danger={false}
                              onClick={function () {
                                return this.getData.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              disabled={false}
                              __component_name="Button"
                            >
                              刷新
                            </Button>
                            {!!__$$eval(() => !this.state.data?.systemModel) && (
                              <Button
                                icon={
                                  <AntdIconDeleteOutlined __component_name="AntdIconDeleteOutlined" />
                                }
                                block={false}
                                ghost={false}
                                shape="default"
                                danger={false}
                                onClick={function () {
                                  return this.onDeleteBatch.apply(
                                    this,
                                    Array.prototype.slice.call(arguments).concat([])
                                  );
                                }.bind(this)}
                                disabled={false}
                                __component_name="Button"
                              >
                                删除
                              </Button>
                            )}
                            <Input.Search
                              style={{ width: '240px' }}
                              onSearch={function () {
                                return this.onSearch.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              placeholder="请输入文件名称搜索"
                              __component_name="Input.Search"
                            />
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24} __component_name="Col">
                      <Table
                        size="middle"
                        rowKey="path"
                        scroll={{ scrollToFirstRowOnChange: true }}
                        columns={[
                          { key: 'name', title: '名称', dataIndex: 'path' },
                          { key: 'status', title: '状态', dataIndex: 'status' },
                          { key: 'size', title: '文件大小', dataIndex: 'size' },
                          {
                            key: 'op',
                            title: '操作',
                            width: 160,
                            render: (text, record, index) =>
                              (__$$context => (
                                <Space
                                  align="center"
                                  direction="horizontal"
                                  __component_name="Space"
                                >
                                  <Button
                                    size="small"
                                    block={false}
                                    ghost={false}
                                    shape="default"
                                    danger={false}
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
                                    disabled={__$$eval(() => __$$context.state.data?.systemModel)}
                                    __component_name="Button"
                                  >
                                    删除
                                  </Button>
                                </Space>
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            dataIndex: 'op',
                          },
                        ]}
                        dataSource={__$$eval(() => this.state.data?.files?.nodes || [])}
                        pagination={false}
                        showHeader={true}
                        rowSelection={{
                          type: 'checkbox',
                          onChange: function () {
                            return this.onRowSelectedChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                        }}
                        __component_name="Table"
                      />
                      <Row wrap={true} gutter={['', '']} __component_name="Row">
                        <Col span={24} __component_name="Col">
                          <Pagination
                            style={{ marginTop: '16px', textAlign: 'right', marginBottom: '24px' }}
                            total={__$$eval(() => this.state.data?.files?.totalCount || 0)}
                            simple={false}
                            current={__$$eval(() => this.state.fileSearchParams.currentPage)}
                            onChange={function () {
                              return this.onPageChange.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this)}
                            pageSize={10}
                            showTotal={function () {
                              return this.showTotal.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this)}
                            __component_name="Pagination"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ),
              },
            ]}
            style={{ marginTop: '-24px' }}
            activeKey=""
            tabPosition="top"
            tabBarGutter={24}
            __component_name="Tabs"
            destroyInactiveTabPane="true"
          >
            <Modal
              mask={true}
              open={true}
              title="弹框标题"
              centered={false}
              keyboard={true}
              forceRender={false}
              maskClosable={false}
              confirmLoading={false}
              destroyOnClose={true}
              __component_name="Modal"
            />
          </Tabs>
        </Card>
        <Modal
          mask={true}
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
          centered={false}
          keyboard={true}
          onCancel={function () {
            return this.closeDeleteFilesModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          forceRender={false}
          maskClosable={false}
          confirmLoading={__$$eval(() => this.state.deleteLoading)}
          destroyOnClose={true}
          __component_name="Modal"
        >
          <Alert type="warning" message="确认删除文件？" showIcon={true} __component_name="Alert" />
        </Modal>
        <Modal
          mask={true}
          onOk={function () {
            return this.onSubmitUpload.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.uploadModalVisible)}
          title="文件上传"
          width="700px"
          centered={false}
          keyboard={true}
          onCancel={function () {
            return this.closeUploadModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          forceRender={false}
          maskClosable={false}
          confirmLoading={__$$eval(() => this.state.submitLoading)}
          destroyOnClose={true}
          __component_name="Modal"
        >
          <LccComponentQlsmm
            label="上传"
            accept=""
            bucket={__$$eval(() => this.utils.getAuthData()?.project)}
            setState={function () {
              return this.setUploadState.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            Authorization={__$$eval(() => this.utils.getAuthorization())}
            getBucketPath={function () {
              return this.getBucketPath.apply(
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
            handleReUpload={function () {
              return this.handleReUpload.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            isSupportFolder={true}
            __component_name="LccComponentQlsmm"
            calcUploadedFile={function () {
              return this.calcUploadedFile.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
          />
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
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
