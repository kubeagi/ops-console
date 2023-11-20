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

    this.state = { delModalvisible: false, logModalVisible: false, currentRecord: null };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    console.log('will unmount');
  }

  onOpenDelModal(record) {
    this.setState({
      delModalvisible: true,
      currentRecord: record,
    });
  }

  onCloseDelModal(isNeedReload) {
    this.setState({
      delModalvisible: false,
      currentRecord: null,
    });
  }

  onOpenLogModal(record) {
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

  componentDidMount() {
    console.log('did mount');
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
                            return this.handleRefresh.apply(
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
                          onSearch={function () {
                            return this.handleSearchValueChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          __component_name="Input.Search"
                        />
                      </Space>
                    </Col>
                    <Col __component_name="Col">
                      <Space align="center" direction="horizontal">
                        <Pagination
                          total={50}
                          simple={false}
                          current={1}
                          pageSize={10}
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
                        rowKey="task_name"
                        scroll={{ scrollToFirstRowOnChange: true }}
                        columns={[
                          {
                            key: 'task_name',
                            title: '任务名称',
                            render: (text, record, index) =>
                              (__$$context => (
                                <UnifiedLink
                                  to={__$$eval(() => '/data-handle/detail/' + record.id)}
                                  target="_blank"
                                  __component_name="UnifiedLink"
                                >
                                  {__$$eval(() => text)}
                                </UnifiedLink>
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            ellipsis: { showTitle: true },
                            dataIndex: 'task_name',
                          },
                          {
                            key: 'task_status',
                            title: '状态',
                            render: (text, record, index) =>
                              (__$$context => (
                                <Status
                                  id="disabled"
                                  types={[
                                    { id: 'success', type: 'disabled', children: '未知' },
                                    { id: 'error', type: 'disabled', children: '未知' },
                                    { id: 'doing', type: 'disabled', children: '未知' },
                                  ]}
                                  __component_name="Status"
                                />
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            filters: [{ text: '处理成功', value: 'success' }],
                            dataIndex: 'task_status',
                          },
                          {
                            key: 'dataset_name',
                            title: '处理数据集',
                            render: (text, record, index) =>
                              (__$$context => [
                                <UnifiedLink
                                  to=""
                                  target="_blank"
                                  __component_name="UnifiedLink"
                                  key="node_ocloz29z4l3"
                                >
                                  {__$$eval(() => text)}
                                </UnifiedLink>,
                                <Typography.Text
                                  style={{ fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={true}
                                  __component_name="Typography.Text"
                                  key="node_ocloz29z4l5"
                                >
                                  ----
                                </Typography.Text>,
                                <UnifiedLink
                                  to="https://alibaba.com"
                                  target="_blank"
                                  __component_name="UnifiedLink"
                                  key="node_ocloz29z4l4"
                                >
                                  {__$$eval(() => `V ${record.dataset_version}`)}
                                </UnifiedLink>,
                              ])(__$$createChildContext(__$$context, { text, record, index })),
                            dataIndex: 'dataset_name',
                          },
                          { key: 'start_time', title: '开始时间', dataIndex: 'start_time' },
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
                                    size="small"
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
                                    size="small"
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
                        onChange={function () {
                          return this.handleTableChange.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this)}
                        dataSource={[
                          {
                            id: '1101',
                            task_name: '任务一',
                            start_time: '2021-10-10 12:00:00',
                            task_status: 'success',
                            dataset_name: '数据集一',
                            dataset_version: '1.0',
                          },
                          {
                            id: '1102',
                            task_name: '任务二',
                            start_time: '2021-10-12 12:00:00',
                            task_status: 'success',
                            dataset_name: '数据集二',
                            dataset_version: '2.0',
                          },
                          {
                            id: '1102',
                            task_name: '任务三',
                            start_time: '2021-10-13 12:00:00',
                            task_status: 'success',
                            dataset_name: '数据集三',
                            dataset_version: '3.0',
                          },
                        ]}
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
              return this.onCloseDelModal.apply(
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

const PageWrapper = () => {
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
        <DataHandleList$$Page {...dataProps} self={self} appHelper={appHelper} />
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
