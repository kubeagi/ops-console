// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  Row,
  Col,
  Typography,
  Alert,
  Card,
  Space,
  Button,
  Input,
  Table,
  UnifiedLink,
  Status,
  Tooltip,
  Pagination,
} from '@tenx-ui/materials';

import { default as Logs } from '@tenx-ui/logs';

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
      currentPage: 1,
      currentRecord: null,
      dataHandleList: [],
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

  getComponentRef(ref) {
    console.log(ref, 'ffffffffffff1');
    // this.logRef = ref;
    // this.logRef && this.logRef.writelns('加载中...');
  }

  async getDataList() {
    try {
      this.setState({
        listLoading: true,
      });
      const res = await this.utils.bff.allDataProcessListByPage({
        input: {
          pageIndex: (this.state.currentPage - 1) * this.state.pageSize,
          pageSize: this.state.pageSize,
          keyword: this.state.keyword,
          namespace: this.utils.getAuthData().project,
        },
      });
      const counts = await this.utils.bff.allDataProcessListByCount({
        input: {
          keyword: this.state.keyword,
          namespace: this.utils.getAuthData().project,
        },
      });
      const { data, status } = res?.dataProcess?.allDataProcessListByPage;
      console.log(data, status);
      if (status === 200) {
        this.setState({
          dataHandleList: data || [],
          totalCount: counts?.dataProcess?.allDataProcessListByCount?.data,
          listLoading: false,
        });
      }
    } catch (error) {
      this.setState({
        dataHandleList: [],
        totalCount: 0,
        listLoading: false,
      });
    }
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
      const res = await this.utils.bff.deleteDataProcessTask({
        input: {
          id: this.state.currentRecord?.id,
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
    this.history.push('/data-handle/create');
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

  showTotal(total, range) {
    // 用于格式化显示表格数据总量
    return `共 ${total} 条`;
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
            return this.onCloseLogModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.logModalVisible)}
          title="弹框标题"
        >
          <Logs
            __component_name="Logs"
            getComponentRef={function () {
              return this.getComponentRef.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            logs="123"
          />
        </Modal>
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={1}
            >
              数据处理
            </Typography.Title>
          </Col>
          <Col __component_name="Col" span={24}>
            <Alert
              __component_name="Alert"
              message="一站式数据处理方案，支持文本数据的拆分、数据异常清洗、数据过滤、数据去重以及数据去除隐私等处理配置，可大幅提升数据质量。"
              showIcon={true}
              type="info"
            />
          </Col>
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
                  style={{ paddingBottom: '16px', paddingTop: '4px' }}
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
                          创建处理任务
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
                            dataIndex: 'name',
                            ellipsis: { showTitle: true },
                            key: 'name',
                            render: (text, record, index) =>
                              (__$$context => (
                                <UnifiedLink
                                  __component_name="UnifiedLink"
                                  target="_self"
                                  to={__$$eval(() => '/data-handle/detail/' + record.id)}
                                >
                                  {__$$eval(() => text)}
                                </UnifiedLink>
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            title: '任务名称',
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
                                    { children: '处理中', id: 'processing', type: 'info' },
                                    {
                                      children: '处理完成',
                                      id: 'process_complete',
                                      type: 'success',
                                    },
                                    { children: '处理失败', id: 'process_fail', type: 'error' },
                                  ]}
                                  key="node_ocloo0nm9w4"
                                />,
                                <Tooltip
                                  __component_name="Tooltip"
                                  title={__$$eval(() => record.error_msg || '-')}
                                  key="node_oclqyryfzi2"
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
                            dataIndex: 'pre_data_set_name',
                            key: 'pre_data_set_name',
                            render: (text, record, index) =>
                              (__$$context => [
                                <UnifiedLink
                                  __component_name="UnifiedLink"
                                  inQianKun={false}
                                  target="_self"
                                  to={__$$eval(() => '/dataset/detail/' + record.pre_data_set_name)}
                                  key="node_oclpc8ipq71"
                                >
                                  {__$$eval(() => record.pre_data_set_name)}
                                </UnifiedLink>,
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                  key="node_oclpb5hlmy7"
                                >
                                  {' '}
                                  /{' '}
                                </Typography.Text>,
                                <UnifiedLink
                                  __component_name="UnifiedLink"
                                  target="_self"
                                  to={__$$eval(
                                    () =>
                                      '/dataset/detail/' +
                                      record.post_data_set_name +
                                      '/version/' +
                                      record.post_data_set_name +
                                      '-' +
                                      record.pre_data_set_version
                                  )}
                                  key="node_oclpc8ipq77"
                                >
                                  {__$$eval(() => record.pre_data_set_version)}
                                </UnifiedLink>,
                              ])(__$$createChildContext(__$$context, { text, record, index })),
                            title: '处理前数据集',
                          },
                          {
                            dataIndex: 'dataset_info.postDataSetName',
                            key: 'postDataSetName',
                            render: (text, record, index) =>
                              (__$$context => [
                                <UnifiedLink
                                  __component_name="UnifiedLink"
                                  inQianKun={false}
                                  target="_self"
                                  to={__$$eval(
                                    () => '/dataset/detail/' + record.post_data_set_name
                                  )}
                                  key="node_oclpc8ipq78"
                                >
                                  {__$$eval(() => record.post_data_set_name)}
                                </UnifiedLink>,
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                  key="node_oclpb2s62x4"
                                >
                                  /
                                </Typography.Text>,
                                <UnifiedLink
                                  __component_name="UnifiedLink"
                                  target="_self"
                                  to={__$$eval(
                                    () =>
                                      '/dataset/detail/' +
                                      record.post_data_set_name +
                                      '/version/' +
                                      record.post_data_set_name +
                                      '-' +
                                      record.post_data_set_version
                                  )}
                                  key="node_oclpc8ipq79"
                                >
                                  {__$$eval(() => record.post_data_set_version)}
                                </UnifiedLink>,
                              ])(__$$createChildContext(__$$context, { text, record, index })),
                            title: '处理后数据集',
                          },
                          {
                            dataIndex: 'start_datetime',
                            key: 'start_datetime',
                            render: (text, record, index) =>
                              (__$$context => (
                                <Typography.Time
                                  __component_name="Typography.Time"
                                  format=""
                                  relativeTime={false}
                                  time={__$$eval(() => record.start_datetime)}
                                />
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            title: '开始时间',
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
                            width: 160,
                          },
                        ]}
                        dataSource={__$$eval(() => this.state.dataHandleList)}
                        loading={__$$eval(() => this.state.listLoading)}
                        onChange={function () {
                          return this.handleTableChange.apply(
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
                  <Pagination
                    __component_name="Pagination"
                    current={__$$eval(() => this.state.currentPage)}
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
                    simple={false}
                    style={{ marginTop: '12px', textAlign: 'right' }}
                    total={__$$eval(() => this.state.totalCount)}
                  />
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
  const match = matchPath({ path: '/data-handle' }, location.pathname);
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
