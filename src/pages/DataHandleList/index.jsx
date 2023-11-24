// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Row,
  Col,
  Typography,
  Alert,
  Card,
  Space,
  Button,
  Input,
  Pagination,
  Modal,
  Table,
  UnifiedLink,
  Status,
} from '@tenx-ui/materials';

import { AntdIconPlusOutlined, AntdIconReloadOutlined } from '@tenx-ui/icon-materials';

import { default as Logs } from '@tenx-ui/logs';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class DataHandleList$$Page extends React.Component {
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

    __$$i18n._inject2(this);

    this.state = {
      delModalvisible: false,
      logModalVisible: false,
      currentRecord: null,
      currentPage: 0,
      pageSize: 10,
      totalCount: 0,
      keyword: '',
      dataHandleList: [],
      listLoading: false,
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    console.log('will unmount');
  }

  async getDataList() {
    try {
      this.setState({
        listLoading: true,
      });
      const res = await this.utils.bff.allDataProcessListByPage({
        input: {
          pageIndex: this.state.currentPage,
          pageSize: this.state.pageSize,
          keyword: this.state.keyword,
        },
      });
      const counts = await this.utils.bff.allDataProcessListByCount({
        input: {
          keyword: this.state.keyword,
        },
      });
      const { data, status } = res?.dataProcess?.allDataProcessListByPage;
      if (status === 200) {
        this.setState({
          dataHandleList: data || [],
          totalCount: counts?.dataProcess?.allDataProcessListByCount?.data,
          listLoading: false,
        });
      }
    } catch (error) {}
  }

  onOpenDelModal(e, { record }) {
    this.setState({
      delModalvisible: true,
      currentRecord: record,
    });
  }

  onCancelDelModal(e) {
    this.setState({
      delModalvisible: false,
      currentRecord: null,
    });
  }

  async onCloseDelModal() {
    try {
      const res = await this.utils.bff.deleteDataProcessTask({
        input: {
          id: this.state.currentRecord?.id,
        },
      });
      this.setState(
        {
          delModalvisible: false,
          currentRecord: null,
        },
        () => {
          this.getDataList();
        }
      );
    } catch (error) {}
  }

  onOpenLogModal(e, record) {
    this.setState({
      logModalVisible: true,
      currentRecord: record,
    });
  }

  onCloseLogModal(isNeedReload) {
    this.setState({
      logModalVisible: false,
      currentRecord: null,
    });
  }

  onLinkCreate() {
    // 点击按钮时的回调
    this.history.push('/data-handle/create');
  }

  onCurrentPageChange(page, pageSize) {
    // 页码或 pageSize 改变的回调
    this.setState(
      {
        currentPage: page - 1,
      },
      () => {
        this.getDataList();
      }
    );
  }

  handleSearchValueChange(event) {
    // 输入框内容变化时的回调
    this.setState(
      {
        currentPage: 0,
      },
      () => {
        this.getDataList();
      }
    );
  }

  showTotal(total, range) {
    // 用于格式化显示表格数据总量
    return `共 ${total} 条`;
  }

  onRefresh(event) {
    // 点击按钮时的回调
    this.setState(
      {
        currentPage: 0,
      },
      () => {
        this.getDataList();
      }
    );
  }

  onhandleChange(event) {
    // 输入框内容变化时的回调
    console.log('onChange', event);
    this.setState({
      keyword: event.target.value,
    });
  }

  componentDidMount() {
    console.log('did mount', this.utils);
    this.getDataList();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page
        style={{ marginBottom: '0px', paddingBottom: '24px' }}
        pagePadding={24}
        pagePaddingTop={24}
        pagePaddingBottom={24}
      >
        <Row wrap={true} __component_name="Row">
          <Col span={24} __component_name="Col">
            <Typography.Title
              bold={true}
              level={1}
              bordered={false}
              ellipsis={true}
              __component_name="Typography.Title"
            >
              数据处理
            </Typography.Title>
          </Col>
          <Col span={24} __component_name="Col">
            <Alert type="info" message="数据处理描述" showIcon={true} __component_name="Alert" />
          </Col>
          <Col span={24} style={{}} __component_name="Col">
            <Row wrap={true} __component_name="Row">
              <Col span={24} __component_name="Col">
                <Card
                  size="default"
                  type="inner"
                  style={{ paddingTop: '4px', paddingBottom: '24px' }}
                  actions={[]}
                  loading={false}
                  bordered={false}
                  hoverable={false}
                  __component_name="Card"
                >
                  <Row wrap={false} justify="space-between" __component_name="Row">
                    <Col __component_name="Col">
                      <Space size={12} align="center" direction="horizontal">
                        <Button
                          href=""
                          icon={<AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />}
                          type="primary"
                          block={false}
                          ghost={false}
                          shape="default"
                          danger={false}
                          target="_self"
                          onClick={function () {
                            return this.onLinkCreate.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          disabled={false}
                          __component_name="Button"
                        >
                          创建处理任务
                        </Button>
                        <Button
                          icon={
                            <AntdIconReloadOutlined __component_name="AntdIconReloadOutlined" />
                          }
                          block={false}
                          ghost={false}
                          shape="default"
                          danger={false}
                          onClick={function () {
                            return this.onRefresh.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          disabled={false}
                          __component_name="Button"
                        >
                          刷新
                        </Button>
                        <Input.Search
                          style={{ width: '240px' }}
                          value={__$$eval(() => this.state.keyword)}
                          onChange={function () {
                            return this.onhandleChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          onSearch={function () {
                            return this.handleSearchValueChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          placeholder="请输入任务名称搜索"
                          __component_name="Input.Search"
                        />
                      </Space>
                    </Col>
                    <Col __component_name="Col">
                      <Space align="center" direction="horizontal">
                        <Pagination
                          total={__$$eval(() => this.state.totalCount)}
                          simple={true}
                          current={__$$eval(() => this.state.currentPage + 1)}
                          onChange={function () {
                            return this.onCurrentPageChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          pageSize={__$$eval(() => this.state.pageSize)}
                          showTotal={function () {
                            return this.showTotal.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          __component_name="Pagination"
                        />
                      </Space>
                    </Col>
                  </Row>
                  <Row wrap={true} gutter={[0, 0]} __component_name="Row">
                    <Col span={24} __component_name="Col">
                      {!!__$$eval(() => this.state.delModalvisible) && (
                        <Modal
                          mask={true}
                          onOk={function () {
                            return this.onCloseDelModal.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          open={true}
                          title="删除任务"
                          centered={false}
                          keyboard={true}
                          onCancel={function () {
                            return this.onCloseDelModal.apply(
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
                            message="确认删除任务？"
                            showIcon={true}
                            __component_name="Alert"
                          />
                        </Modal>
                      )}
                      <Table
                        size="default"
                        style={{ marginTop: '24px' }}
                        rowKey=""
                        scroll={{ scrollToFirstRowOnChange: true }}
                        columns={[
                          {
                            key: 'name',
                            title: '任务名称',
                            render: (text, record, index) =>
                              (__$$context => (
                                <UnifiedLink
                                  to={__$$eval(() => '/data-handle/detail/' + record.id)}
                                  target="_self"
                                  __component_name="UnifiedLink"
                                >
                                  {__$$eval(() => text)}
                                </UnifiedLink>
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            ellipsis: { showTitle: true },
                            dataIndex: 'name',
                          },
                          {
                            key: 'status',
                            title: '状态',
                            render: (text, record, index) =>
                              (__$$context => (
                                <Status
                                  id={__$$eval(() => record.status)}
                                  types={[
                                    { id: 'processing', type: 'info', children: '处理中' },
                                    {
                                      id: 'process_complete',
                                      type: 'success',
                                      children: '处理完成',
                                    },
                                    { id: 'process_fail', type: 'error', children: '处理失败' },
                                  ]}
                                  __component_name="Status"
                                />
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            dataIndex: 'status',
                          },
                          {
                            key: 'pre_data_set_name',
                            title: '处理前数据集',
                            render: (text, record, index) =>
                              (__$$context => [
                                <UnifiedLink
                                  to="https://alibaba.com"
                                  target="_blank"
                                  __component_name="UnifiedLink"
                                  key="node_oclpc8ipq71"
                                >
                                  {__$$eval(() => record.pre_data_set_name)}
                                </UnifiedLink>,
                                <Typography.Text
                                  style={{ fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={true}
                                  __component_name="Typography.Text"
                                  key="node_oclpb5hlmy7"
                                >
                                  {' '}
                                  /{' '}
                                </Typography.Text>,
                                <UnifiedLink
                                  to="https://alibaba.com"
                                  target="_blank"
                                  __component_name="UnifiedLink"
                                  key="node_oclpc8ipq77"
                                >
                                  {__$$eval(() => record.pre_data_set_version)}
                                </UnifiedLink>,
                              ])(__$$createChildContext(__$$context, { text, record, index })),
                            dataIndex: 'pre_data_set_name',
                          },
                          {
                            key: 'postDataSetName',
                            title: '处理后数据集',
                            render: (text, record, index) =>
                              (__$$context => [
                                <UnifiedLink
                                  to="https://alibaba.com"
                                  target="_blank"
                                  __component_name="UnifiedLink"
                                  key="node_oclpc8ipq78"
                                >
                                  {__$$eval(() => record.post_data_set_name)}
                                </UnifiedLink>,
                                <Typography.Text
                                  style={{ fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={true}
                                  __component_name="Typography.Text"
                                  key="node_oclpb2s62x4"
                                >
                                  /
                                </Typography.Text>,
                                <UnifiedLink
                                  to="https://alibaba.com"
                                  target="_blank"
                                  __component_name="UnifiedLink"
                                  key="node_oclpc8ipq79"
                                >
                                  {__$$eval(() => record.post_data_set_version)}
                                </UnifiedLink>,
                              ])(__$$createChildContext(__$$context, { text, record, index })),
                            dataIndex: 'dataset_info.postDataSetName',
                          },
                          {
                            key: 'start_datetime',
                            title: '开始时间',
                            render: (text, record, index) =>
                              (__$$context => (
                                <Typography.Time
                                  time={__$$eval(() => record.start_datetime)}
                                  format=""
                                  relativeTime={false}
                                  __component_name="Typography.Time"
                                />
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            dataIndex: 'start_datetime',
                          },
                          {
                            key: 'op',
                            title: '操作',
                            render: (text, record, index) =>
                              (__$$context => (
                                <Space
                                  align="center"
                                  direction="horizontal"
                                  __component_name="Space"
                                >
                                  <Button
                                    size="middle"
                                    block={false}
                                    ghost={false}
                                    shape="default"
                                    danger={false}
                                    onClick={function () {
                                      return this.onOpenLogModal.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([
                                          {
                                            record: record,
                                          },
                                        ])
                                      );
                                    }.bind(__$$context)}
                                    disabled={false}
                                    __component_name="Button"
                                  >
                                    查看日志
                                  </Button>
                                  <Button
                                    size="middle"
                                    block={false}
                                    ghost={false}
                                    shape="default"
                                    danger={false}
                                    onClick={function () {
                                      return this.onOpenDelModal.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([
                                          {
                                            record: record,
                                          },
                                        ])
                                      );
                                    }.bind(__$$context)}
                                    disabled={false}
                                    __component_name="Button"
                                  >
                                    删除
                                  </Button>
                                </Space>
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            dataIndex: 'op',
                          },
                        ]}
                        loading={__$$eval(() => this.state.listLoading)}
                        onChange={function () {
                          return this.handleTableChange.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this)}
                        dataSource={__$$eval(() => this.state.dataHandleList)}
                        pagination={{
                          size: 'default',
                          simple: false,
                          position: [],
                          showQuickJumper: false,
                          showSizeChanger: false,
                        }}
                        showHeader={true}
                        __component_name="Table"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        {!!__$$eval(() => this.state.logModalVisible) && (
          <Modal
            mask={true}
            open={true}
            title="日志"
            footer=""
            centered={false}
            keyboard={true}
            onCancel={function () {
              return this.onCloseLogModal.apply(
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
            <Logs
              logs="123"
              getComponentRef={function e(t) {
                return t;
              }}
              __component_name="Logs"
            />
          </Modal>
        )}
        {!!__$$eval(() => this.state.delModalvisible) && (
          <Modal
            mask={true}
            onOk={function () {
              return this.onCloseDelModal.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            open={true}
            title="删除"
            centered={false}
            keyboard={true}
            onCancel={function () {
              return this.onCancelDelModal.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            forceRender={false}
            maskClosable={false}
            okButtonProps={{ disabled: false }}
            confirmLoading={false}
            destroyOnClose={true}
            __component_name="Modal"
            cancelButtonProps={{ disabled: false }}
          >
            <Alert
              type="warning"
              message="确认删除此任务？"
              showIcon={true}
              __component_name="Alert"
            />
          </Modal>
        )}
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/data-handle' }, location.pathname);
  history.match = match;
  history.query = qs.parse(location.search);
  const appHelper = {
    utils,
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
        func: 'undefined',
        params: undefined,
      }}
      sdkSwrFuncs={[]}
      render={dataProps => (
        <DataHandleList$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
