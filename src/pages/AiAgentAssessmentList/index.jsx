// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Button,
  Row,
  Col,
  Card,
  Space,
  Input,
  Modal,
  Alert,
  Table,
  Typography,
  Status,
  Tooltip,
  UnifiedLink,
  Pagination,
} from '@tenx-ui/materials';

import {
  AntdIconPlusOutlined,
  AntdIconReloadOutlined,
  AntdIconInfoCircleOutlined,
} from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class AiAgentAssessmentList$$Page extends React.Component {
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
      currentPage: 1,
      currentRecord: null,
      dataList: [],
      delModalvisible: false,
      keyword: '',
      listLoading: false,
      logModalVisible: false,
      pageSize: 10,
      totalCount: 0,
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    console.log('will unmount');
  }

  calcSpendTime(record) {
    const times = (
      ((record.completeTimestamp ? new Date(record.completeTimestamp) : new Date()).getTime() -
        new Date(record.creationTimestamp).getTime()) /
      60000
    ).toFixed(2);
    if (times > 60) {
      return `${(times / 60).toFixed(2)} 小时`;
    }
    return `${times} 分钟`;
  }

  getDataList() {
    this.setState({
      listLoading: true,
    });
    const appName = this.history?.query?.appName;
    const parmas = {
      keyword: this.state.keyword,
      pageSize: this.state.pageSize,
      page: this.state.currentPage,
      namespace: this.utils.getAuthData().project,
      appName,
    };
    const res = this.utils.bff
      .listRAG({
        input: parmas,
      })
      .then(res => {
        console.log(res);
        const { nodes, totalCount } = res.RAG?.listRAG || [];
        this.setState({
          dataList: nodes,
          totalCount,
          listLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          dataList: [],
          totalCount: 0,
          listLoading: false,
        });
      });
  }

  handlePaginationChange(c, s) {
    this.setState(
      {
        currentPage: c,
        pageSize: s,
      },
      this.getDataList
    );
  }

  handleSearchValueChange(event) {
    // 输入框内容变化时的回调
    this.setState(
      {
        currentPage: 1,
      },
      () => {
        this.getDataList();
      }
    );
  }

  onCancelDelModal(e) {
    this.setState({
      delModalvisible: false,
      currentRecord: null,
    });
  }

  async onCloseDelModal() {
    try {
      const res = await this.utils.bff.deleteRAG({
        input: {
          name: this.state.currentRecord?.name,
          namespace: this.state.currentRecord?.namespace,
        },
      });
      this.setState(
        {
          delModalvisible: false,
          currentRecord: null,
          // 如果是删除了临界的数据，页数要向前翻一页，比如pageSize=10，一共有11挑数据，删掉第十一条，则currentPage需要改成1而不是2.
          currentPage:
            this.state.totalCount % this.state.pageSize === 1 &&
            Number.parseInt(this.state.totalCount / this.state.pageSize) !== 0
              ? this.state.currentPage - 1
              : this.state.currentPage,
        },
        () => {
          this.getDataList();
        }
      );
    } catch (error) {}
  }

  onCloseLogModal(isNeedReload) {
    this.setState({
      logModalVisible: false,
      currentRecord: null,
    });
  }

  onCurrentPageChange(page, pageSize) {
    // 页码或 pageSize 改变的回调
    this.setState(
      {
        currentPage: page,
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

  onLinkCreate() {
    // 点击按钮时的回调
    this.history.push(
      `/ai-agent-assessment/create?appName=${this.history.query.appName}&appNamespace=${this.history.query.appNamespace}`
    );
  }

  onLinkReport(e, { record }) {
    this.history.push(
      `/ai-agent-assessment/report?name=${record.name}&namespace=${record.namespace}`
    );
  }

  onOpenDelModal(e, { record }) {
    this.setState({
      delModalvisible: true,
      currentRecord: record,
    });
  }

  onOpenLogModal(e, record) {
    this.setState({
      logModalVisible: true,
      currentRecord: record,
    });
  }

  onRefresh(event) {
    // 点击按钮时的回调
    this.setState(
      {
        currentPage: 1,
      },
      () => {
        this.getDataList();
      }
    );
  }

  onTableChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  restore(event, { record }) {
    this.updateRecord({
      record,
      text: '恢复',
      type: 'restore',
    });
  }

  showTotal(total, range) {
    // 用于格式化显示表格数据总量
    return `共 ${total} 条`;
  }

  stop(event, { record }) {
    this.updateRecord({
      record,
      text: '停止',
      type: 'stop',
    });
  }

  updateRecord({ record, type, text }) {
    this.utils.bff
      .updateRAG({
        input: {
          name: record.name,
          namespace: record.namespace,
          suspend: type === 'stop' ? true : false,
        },
      })
      .then(res => {
        this.utils.notification.success({
          message: text + '任务评估成功',
        });
        this.getDataList();
      })
      .catch(err => {
        this.utils.notification.warn({
          message: text + '任务评估失败',
          errors: err?.response?.errors,
        });
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
        pagePadding={24}
        pagePaddingBottom={24}
        pagePaddingTop={24}
        style={{ marginBottom: '0px', paddingBottom: '24px' }}
      >
        <Button.Back __component_name="Button.Back" title="评估记录" type="ghost" />
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24} style={{}}>
            <Row __component_name="Row" wrap={true}>
              <Col __component_name="Col" span={24}>
                <Card
                  __component_name="Card"
                  actions={[]}
                  bordered={false}
                  hoverable={false}
                  loading={false}
                  size="default"
                  style={{ marginTop: '16px', paddingBottom: '16px' }}
                  type="inner"
                >
                  <Row __component_name="Row" justify="space-between" wrap={false}>
                    <Col __component_name="Col">
                      <Space align="center" direction="horizontal" size={12}>
                        <Button
                          __component_name="Button"
                          block={false}
                          danger={false}
                          disabled={false}
                          ghost={false}
                          href=""
                          icon={<AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />}
                          onClick={function () {
                            return this.onLinkCreate.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          shape="default"
                          target="_self"
                          type="primary"
                        >
                          新建评估
                        </Button>
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
                            return this.onRefresh.apply(
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
                          style={{ width: '240px' }}
                          value={__$$eval(() => this.state.keyword)}
                        />
                      </Space>
                    </Col>
                  </Row>
                  <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                    <Col __component_name="Col" span={24}>
                      {!!__$$eval(() => this.state.delModalvisible) && (
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
                            return this.onCloseDelModal.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          onOk={function () {
                            return this.onCloseDelModal.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          open={true}
                          title="删除任务"
                        >
                          <Alert
                            __component_name="Alert"
                            message="确认删除任务？"
                            showIcon={true}
                            type="warning"
                          />
                        </Modal>
                      )}
                      <Table
                        __component_name="Table"
                        columns={[
                          {
                            dataIndex: 'creationTimestamp',
                            ellipsis: { showTitle: true },
                            key: 'creationTimestamp',
                            render: (text, record, index) =>
                              (__$$context => (
                                <Typography.Time
                                  __component_name="Typography.Time"
                                  format=""
                                  relativeTime={false}
                                  time={__$$eval(() => record.creationTimestamp)}
                                />
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            sorter: false,
                            title: '开始时间',
                          },
                          {
                            _unsafe_MixedSetter_width_select: 'StringSetter',
                            dataIndex: 'spend_time',
                            key: 'spend_time',
                            render: (text, record, index) =>
                              (__$$context => (
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                >
                                  {__$$eval(() => __$$context.calcSpendTime(record))}
                                </Typography.Text>
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            sorter: false,
                            title: '耗时',
                            width: '80px',
                          },
                          {
                            dataIndex: 'status',
                            key: 'status',
                            render: (text, record, index) =>
                              (__$$context => [
                                <Status
                                  __component_name="Status"
                                  id={__$$eval(() => record.status)}
                                  types={[
                                    { children: '评估中', id: 'ing', type: 'info' },
                                    { children: '评估完成', id: 'complete', type: 'success' },
                                    { children: '任务停止', id: 'suspend', type: 'warning' },
                                    { children: '评估失败', id: 'failed', type: 'error' },
                                  ]}
                                  key="node_oclr8k78nb1"
                                />,
                                <Tooltip
                                  __component_name="Tooltip"
                                  title={__$$eval(() => record.phaseMessage)}
                                  key="node_oclrty9ict3"
                                >
                                  {!!__$$eval(() => record.status === 'failed') && (
                                    <AntdIconInfoCircleOutlined
                                      __component_name="AntdIconInfoCircleOutlined"
                                      style={{ marginLeft: '20px' }}
                                    />
                                  )}
                                </Tooltip>,
                                <Tooltip
                                  __component_name="Tooltip"
                                  title={__$$eval(() => record.error_msg || '-')}
                                  key="node_oclr8k78nb2"
                                >
                                  {!!__$$eval(() => record.status === 'process_fail') && (
                                    <AntdIconInfoCircleOutlined
                                      __component_name="AntdIconInfoCircleOutlined"
                                      style={{ marginLeft: '20px' }}
                                    />
                                  )}
                                </Tooltip>,
                              ])(__$$createChildContext(__$$context, { text, record, index })),
                            title: '状态',
                          },
                          {
                            dataIndex: 'judgeLLM.displayName',
                            key: 'judgeLLM.displayName',
                            render: (text, record, index) =>
                              (__$$context => (
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                >
                                  {__$$eval(() => record.judgeLLM.displayName || '-')}
                                </Typography.Text>
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            title: '裁判大模型',
                          },
                          {
                            dataIndex: 'pre_data_set_name',
                            key: 'pre_data_set_name',
                            render: (text, record, index) =>
                              (__$$context => [
                                <UnifiedLink
                                  __component_name="UnifiedLink"
                                  inQianKun={false}
                                  target="_self"
                                  to={__$$eval(
                                    () =>
                                      '/dataset/detail/' +
                                      record.datasets[0]?.source?.name?.split('.')[0]
                                  )}
                                  key="node_oclrzxbwum2"
                                >
                                  {__$$eval(
                                    () => record.datasets[0]?.source?.name?.split('.')[0] || '-'
                                  )}
                                </UnifiedLink>,
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                  key="node_oclrzxbwum3"
                                >
                                  {' '}
                                  /{' '}
                                </Typography.Text>,
                                <UnifiedLink
                                  __component_name="UnifiedLink"
                                  inQianKun={false}
                                  target="_self"
                                  to={__$$eval(
                                    () =>
                                      '/dataset/detail/' +
                                      record.datasets[0]?.source?.name?.split('.')[0] +
                                      '/version/' +
                                      record.datasets[0]?.source?.name?.split('.')[0] +
                                      '-' +
                                      record.datasets[0]?.source?.name?.split('.')[1]
                                  )}
                                  key="node_oclrzxbwum4"
                                >
                                  {__$$eval(
                                    () => record.datasets[0]?.source?.name?.split('.')[1] || '-'
                                  )}
                                </UnifiedLink>,
                              ])(__$$createChildContext(__$$context, { text, record, index })),
                            title: '评测数据集',
                          },
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
                                  {!!__$$eval(() => record.status !== 'ing') && (
                                    <Button
                                      __component_name="Button"
                                      block={false}
                                      danger={false}
                                      disabled={false}
                                      ghost={false}
                                      onClick={function () {
                                        return this.onLinkReport.apply(
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
                                      查看报告
                                    </Button>
                                  )}
                                  {!!__$$eval(() => record.status === 'ing') && (
                                    <Button
                                      __component_name="Button"
                                      block={false}
                                      danger={false}
                                      disabled={false}
                                      ghost={false}
                                      onClick={function () {
                                        return this.stop.apply(
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
                                      停止评估
                                    </Button>
                                  )}
                                  {!!__$$eval(() => record.status === 'suspend') && (
                                    <Button
                                      __component_name="Button"
                                      block={false}
                                      danger={false}
                                      disabled={false}
                                      ghost={false}
                                      onClick={function () {
                                        return this.restore.apply(
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
                                      恢复评估
                                    </Button>
                                  )}
                                  <Button
                                    __component_name="Button"
                                    block={false}
                                    danger={false}
                                    disabled={false}
                                    ghost={false}
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
                                    shape="default"
                                    size="small"
                                  >
                                    删除
                                  </Button>
                                </Space>
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            title: '操作',
                            width: 220,
                          },
                        ]}
                        dataSource={__$$eval(() => this.state.dataList)}
                        loading={__$$eval(() => this.state.listLoading)}
                        onChange={function () {
                          return this.onTableChange.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this)}
                        pagination={{
                          position: [],
                          showQuickJumper: false,
                          showSizeChanger: false,
                          simple: false,
                          size: 'default',
                        }}
                        rowKey=""
                        scroll={{ scrollToFirstRowOnChange: true }}
                        showHeader={true}
                        size="middle"
                        style={{ marginTop: '16px' }}
                      />
                    </Col>
                  </Row>
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={24}>
                      <Row __component_name="Row" justify="space-between" wrap={false}>
                        <Col __component_name="Col" />
                        <Col __component_name="Col">
                          <Pagination
                            __component_name="Pagination"
                            current={__$$eval(() => this.state.currentPage)}
                            onChange={function () {
                              return this.onCurrentPageChange.apply(
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
                            pageSize={__$$eval(() => this.state.pageSize)}
                            showTotal={function () {
                              return this.showTotal.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this)}
                            simple={false}
                            style={{ marginTop: '12px', textAlign: 'right' }}
                            total={__$$eval(() => this.state.totalCount)}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal
          __component_name="Modal"
          cancelButtonProps={{ disabled: false }}
          centered={false}
          confirmLoading={false}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          okButtonProps={{ disabled: false }}
          onCancel={function () {
            return this.onCancelDelModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.onCloseDelModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.delModalvisible)}
          title="删除"
        >
          <Alert
            __component_name="Alert"
            message="确认删除此任务？"
            showIcon={true}
            type="warning"
          />
        </Modal>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/ai-agent-assessment' }, location.pathname);
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
        <AiAgentAssessmentList$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
