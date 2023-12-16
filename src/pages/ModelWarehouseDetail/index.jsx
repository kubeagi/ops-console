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
  Tooltip,
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
  AntdIconInfoCircleOutlined,
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
      currentFile: '',
      data: {},
      deleteFilesVisible: false,
      deleteLoading: false,
      deleteType: 'single',
      fileSearchParams: {
        keyword: '',
        currentPage: 1,
      },
      loading: false,
      name: this.match.params.name,
      selectedFileList: [],
      submitLoading: false,
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

  closeDeleteFilesModal() {
    this.setState({
      deleteFilesVisible: false,
      currentFile: '',
    });
  }

  closeUploadModal() {
    this.setState({
      uploadModalVisible: false,
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

  getDataSourceMap() {
    return this.dataSourceMap;
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
    // this.utils.notification.success({ message: '上传成功,请刷新列表查看'})
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
          title="模型仓库详情"
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
            <Row __component_name="Row" style={{ height: '56px' }} wrap={false}>
              <Col
                __component_name="Col"
                flex="56px"
                span={1}
                style={{ height: '56px', width: '56px' }}
              >
                <AntdIconCodeSandboxCircleFilled
                  __component_name="AntdIconCodeSandboxCircleFilled"
                  style={{ color: '#4a90e2', fontSize: 56, lineHeight: '0px' }}
                />
              </Col>
              <Col
                __component_name="Col"
                flex="auto"
                span={20}
                style={{ alignItems: 'center', display: 'flex', height: '56px' }}
              >
                <Row
                  __component_name="Row"
                  gutter={['', '']}
                  style={{ paddingLeft: '20px' }}
                  wrap={true}
                >
                  <Col __component_name="Col" span={24}>
                    <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                      <Col __component_name="Col" span={24}>
                        <Typography.Title
                          __component_name="Typography.Title"
                          bold={true}
                          bordered={false}
                          ellipsis={true}
                          level={1}
                        >
                          {__$$eval(() => this.utils.getFullName(this.state.data))}
                        </Typography.Title>
                      </Col>
                      <Col __component_name="Col" span={24}>
                        <Status
                          __component_name="Status"
                          id={__$$eval(() => this.state.data.status)}
                          types={[
                            { children: '异常', id: 'False', type: 'error' },
                            { children: '正常', id: 'True', type: 'success' },
                          ]}
                        />
                        {!!__$$eval(() => this.state.data.status === 'False') && (
                          <Tooltip
                            __component_name="Tooltip"
                            style={{}}
                            title={__$$eval(() => this.state.data.message || '-')}
                          >
                            <AntdIconInfoCircleOutlined
                              __component_name="AntdIconInfoCircleOutlined"
                              style={{ marginLeft: '5px' }}
                            />
                          </Tooltip>
                        )}
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: '', paddingLeft: '12px' }}
                        >
                          更新时间：
                        </Typography.Text>
                        <Typography.Time
                          __component_name="Typography.Time"
                          format="YYYY-MM-DD HH:mm:ss"
                          relativeTime={false}
                          time={__$$eval(() => this.state.data?.updateTimestamp)}
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
                  <Descriptions
                    __component_name="Descriptions"
                    bordered={false}
                    borderedBottom={false}
                    borderedBottomDashed={false}
                    colon={false}
                    column={1}
                    id=""
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
                            {__$$eval(() => this.state.data?.id)}
                          </Typography.Text>
                        ),
                        key: 'xhiw4rl3fr8',
                        label: 'ID',
                        span: 1,
                      },
                      {
                        children: __$$evalArray(() => this.state.data?.types?.split(',')).map(
                          (item, index) =>
                            (__$$context => (
                              <Tag __component_name="Tag" closable={false} color="success">
                                {__$$eval(() =>
                                  item === 'llm' ? 'LLM' : item === 'embedding' ? 'Embedding' : item
                                )}
                              </Tag>
                            ))(__$$createChildContext(__$$context, { item, index }))
                        ),
                        key: 'hdx1if55is',
                        label: '模型类型',
                        span: 1,
                      },
                      {
                        children: (
                          <Typography.Time
                            __component_name="Typography.Time"
                            format=""
                            relativeTime={false}
                            time={__$$eval(() => this.state.data?.creationTimestamp)}
                          />
                        ),
                        key: 'ik4agaf7r1d',
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
                        key: '5c0mxhs31zb',
                        label: '创建者',
                        span: 1,
                      },
                      {
                        children: (
                          <Typography.Text
                            __component_name="Typography.Text"
                            disabled={false}
                            ellipsis={false}
                            strong={false}
                            style={{ fontSize: '' }}
                          >
                            {__$$eval(() => this.state.data?.description)}
                          </Typography.Text>
                        ),
                        key: 'ys4jchfegg',
                        label: '描述',
                        span: 1,
                      },
                    ]}
                    labelStyle={{ width: 100 }}
                    layout="horizontal"
                    size="default"
                    title=""
                  >
                    <Descriptions.Item key="xhiw4rl3fr8" label="ID" span={1}>
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="hdx1if55is" label="任务类型" span={1}>
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="7vo7r2wbqev" label="处理前数据集" span={1}>
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="ik4agaf7r1d" label="处理后数据集" span={1}>
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="5c0mxhs31zb" label="创建时间" span={1}>
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="ys4jchfegg" label="创建者" span={1}>
                      {null}
                    </Descriptions.Item>
                  </Descriptions>
                ),
                key: 'tab-item-1',
                label: '详细信息',
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
                          { dataIndex: 'path', key: 'name', title: '名称' },
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
                          <Pagination
                            __component_name="Pagination"
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
                            simple={false}
                            style={{ marginBottom: '24px', marginTop: '16px', textAlign: 'right' }}
                            total={__$$eval(() => this.state.data?.files?.totalCount || 0)}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ),
                key: 'tab-item-2',
                label: '模型文件',
              },
            ]}
            size="large"
            style={{ marginTop: '-24px' }}
            tabBarGutter={24}
            tabPosition="top"
            type="line"
          >
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
