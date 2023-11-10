// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Row,
  Col,
  Typography,
  Card,
  Space,
  Button,
  Input,
  Pagination,
  Table,
  Status,
} from '@tenx-ui/materials';

import { AntdIconPlusOutlined, AntdIconReloadOutlined } from '@tenx-ui/icon-materials';

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

    this.state = {};
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    console.log('will unmount');
  }

  testFunc() {
    console.log('test aliLowcode func');
    return <div className="test-aliLowcode-func">{this.state.test}</div>;
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
        pagePadding={24}
        pagePaddingTop={24}
        pagePaddingBottom={24}
        style={{ marginBottom: '0px', paddingBottom: '24px' }}
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
                          disabled={false}
                          __component_name="Button"
                          onClick={function () {
                            return this.onLinkCreate.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
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
                      <Table
                        size="default"
                        style={{ marginTop: '24px' }}
                        rowKey="id"
                        scroll={{ scrollToFirstRowOnChange: true }}
                        columns={[
                          {
                            key: 'name',
                            title: '任务名称',
                            ellipsis: { showTitle: true },
                            dataIndex: 'name',
                          },
                          {
                            key: 'status',
                            title: '状态',
                            render: (text, record, index) =>
                              (__$$context => (
                                <Status
                                  id="disabled"
                                  types={[{ id: 'disabled', type: 'disabled', children: '未知' }]}
                                  __component_name="Status"
                                />
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            filters: __$$eval(() => this.utils.getComponentWarehouseTypes(this)),
                            dataIndex: 'status',
                          },
                          {
                            key: 'dataset_pre',
                            title: '处理前数据集',
                            ellipsis: { showTitle: true },
                            dataIndex: 'dataset_pre',
                          },
                          {
                            key: 'dataset_after',
                            title: '处理后数据集',
                            render: (text, record, index) =>
                              (__$$context => (
                                <Status
                                  id="health"
                                  types={__$$eval(() =>
                                    __$$context.utils.getComponentWarehouseStatus(__$$context, true)
                                  )}
                                  __component_name="Status"
                                />
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            filters: __$$eval(() => this.utils.getComponentWarehouseStatus(this)),
                            dataIndex: 'dataset_after',
                            title: '处理后数据集',
                          },
                          {
                            key: 'time',
                            render: (text, record, index) =>
                              (__$$context => (
                                <Typography.Time
                                  time=""
                                  format=""
                                  relativeTime={false}
                                  __component_name="Typography.Time"
                                />
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            dataIndex: 'time',
                            title: '开始时间',
                            sorter: true,
                          },
                          {
                            render: (text, record, index) =>
                              (__$$context => (
                                <Space size={12} align="center" direction="horizontal">
                                  <Button
                                    __component_name="Button"
                                    danger={false}
                                    ghost={false}
                                    size="small"
                                    shape="default"
                                    block={false}
                                    disabled={false}
                                  >
                                    删除
                                  </Button>
                                </Space>
                              ))(__$$createChildContext(__$$context, { text, record, index })),
                            dataIndex: 'op',
                            title: '操作',
                          },
                        ]}
                        onChange={function () {
                          return this.handleTableChange.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this)}
                        dataSource={[
                          { id: '1', age: 32, name: '胡彦斌', address: '西湖区湖底公园1号' },
                          { id: '2', age: 28, name: '王一博', address: '滨江区网商路699号' },
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
                        style={{ marginTop: '24px' }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
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
