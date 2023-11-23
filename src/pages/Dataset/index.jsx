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
  Select,
  List,
  Collapse,
  Image,
  UnifiedLink,
  Tag,
  Divider,
  Table,
  Dropdown,
} from '@tenx-ui/materials';

import {
  AntdIconPlusOutlined,
  TenxIconRefresh,
  AntdIconDeleteOutlined,
} from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class Dataset$$Page extends React.Component {
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
      search: undefined,
      type: undefined,
      field: undefined,
      page: 1,
      pageSize: 10,
      total: 0,
      data: [],
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    console.log('will unmount');
  }

  async fetchData() {
    const res = await this.utils.bff
      .listDatasets({
        input: {
          labelSelector: this.state.type,
          fieldSelector: this.state.field,
          keyword: this.state.search,
          namespace: this.appHelper.utils.getAuthData().project,
        },
        versionsInput: {
          namespace: this.appHelper.utils.getAuthData().project,
        },
      })
      .catch(e => {
        console.log(
          'eee',
          {
            ...e,
          },
          e?.response?.data?.Dataset?.listDatasets?.nodes
        );
        this.setState({
          data: e?.response?.data?.Dataset?.listDatasets?.nodes,
        });
      });
    console.log('res', res);
  }

  testFunc() {
    console.log('test aliLowcode func');
    return <div className="test-aliLowcode-func">{this.state.test}</div>;
  }

  addText(event) {
    event.stopPropagation();
    // 点击按钮时的回调
    console.log('addText', event);
  }

  refresh(event) {
    event.stopPropagation();
    // 点击按钮时的回调
    console.log('refresh', event);
  }

  onClick(event) {
    // 点击按钮时的回调
    console.log('onClick', event);
  }

  linkClick(event) {
    event.stopPropagation();
  }

  onSearchChange(event) {
    // 输入框内容变化时的回调
    console.log('onChange', event);
    this.setState({
      search: event.target.value,
    });
  }

  onTypeChange(event) {
    // 输入框内容变化时的回调
    console.log('onChange', event);
    this.setState({
      type: event,
    });
  }

  onFieldChange(event) {
    // 输入框内容变化时的回调
    console.log('onChange', event);
    this.setState(
      {
        field: event,
      },
      () => {
        console.log('tt', this.state);
      }
    );
  }

  onPageChange(page, pageSize) {
    // 页码或 pageSize 改变的回调
  }

  componentDidMount() {
    this.fetchData();
    console.log('componentDidMount', this);
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Row wrap={true} __component_name="Row">
          <Col span={24} __component_name="Col">
            <Typography.Title
              bold={true}
              level={1}
              bordered={false}
              ellipsis={true}
              __component_name="Typography.Title"
            >
              {this.i18n('i18n-5djmpfvu') /* 数据集管理 */}
            </Typography.Title>
          </Col>
          <Col span={24} __component_name="Col">
            <Alert
              type="info"
              style={{ marginBottom: '8px' }}
              message="数据集描述----------暂时还未想好，后续补充"
              showIcon={true}
              __component_name="Alert"
            />
          </Col>
        </Row>
        <Card
          size="default"
          type="default"
          actions={[]}
          loading={false}
          bordered={false}
          hoverable={false}
          __component_name="Card"
        >
          <Row wrap={false} __component_name="Row">
            <Col flex="auto" span={16} style={{ display: 'flex' }} __component_name="Col">
              <Space align="center" direction="horizontal" __component_name="Space">
                <Button
                  href="/dataset/create"
                  icon={<AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />}
                  type="primary"
                  block={false}
                  ghost={false}
                  shape="default"
                  danger={false}
                  disabled={false}
                  __component_name="Button"
                >
                  {this.i18n('i18n-2ejg9q5l') /* 新增数据集 */}
                </Button>
                <Button
                  icon={<TenxIconRefresh __component_name="TenxIconRefresh" />}
                  block={false}
                  ghost={false}
                  shape="default"
                  danger={false}
                  disabled={false}
                  __component_name="Button"
                >
                  刷新
                </Button>
                <Input.Search
                  style={{ width: '200px' }}
                  value={__$$eval(() => this.state.search)}
                  onChange={function () {
                    return this.onSearchChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  placeholder={this.i18n('i18n-vce3sfm7') /* 请输入数据集名称搜索 */}
                  __component_name="Input.Search"
                />
              </Space>
            </Col>
            <Col
              flex="auto"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              __component_name="Col"
            >
              <Space align="center" direction="horizontal" __component_name="Space">
                <Select
                  mode="single"
                  style={{ width: 200 }}
                  value={__$$eval(() => this.state.type)}
                  options={[
                    { label: '文本', value: 'text', disabled: false },
                    { label: '图片', value: 'image', disabled: false },
                    { label: '视频', value: 'video', disabled: false },
                  ]}
                  disabled={false}
                  onChange={function () {
                    return this.onTypeChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  allowClear={true}
                  showSearch={true}
                  placeholder={this.i18n('i18n-af4xea8m') /* 请选择类型 */}
                  _sdkSwrGetFunc={{ label: '', value: '', params: [] }}
                  notFoundContent=""
                  __component_name="Select"
                />
                <Select
                  style={{ width: 200 }}
                  options={[
                    { label: '科技', value: 'science', disabled: false },
                    { label: '金融', value: 'finance', disabled: false },
                    { label: '教育', value: 'education', disabled: false },
                    { label: '医疗', value: 'medical', disabled: false },
                    { label: '能源', value: 'energy', disabled: false },
                    { label: '法律', value: 'law', disabled: false },
                    { label: '其他', value: 'others', disabled: false },
                  ]}
                  disabled={false}
                  onChange={function () {
                    return this.onFieldChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  allowClear={true}
                  showSearch={true}
                  placeholder="请选择应用场景"
                  _sdkSwrGetFunc={{ params: [''] }}
                  __component_name="Select"
                />
              </Space>
            </Col>
          </Row>
          <List
            grid={false}
            size="small"
            split={false}
            style={{ marginTop: '16px' }}
            rowKey="id"
            loading={false}
            bordered={false}
            dataSource={__$$eval(() => this.state.data)}
            gridEnable={false}
            itemLayout="vertical"
            pagination={{
              size: 'default',
              total: __$$eval(() => this.state.total),
              simple: false,
              current: __$$eval(() => this.state.page),
              onChange: function () {
                return this.onPageChange.apply(
                  this,
                  Array.prototype.slice.call(arguments).concat([])
                );
              }.bind(this),
              pageSize: __$$eval(() => this.state.pageSize),
              position: 'bottom',
              pagination: { pageSize: 5 },
              showQuickJumper: false,
              showSizeChanger: false,
            }}
            renderItem={item =>
              (__$$context => (
                <List.Item style={{ marginBottom: '16px' }}>
                  <Row wrap={true} __component_name="Row">
                    <Col span={24} __component_name="Col">
                      <Collapse
                        size="large"
                        ghost={false}
                        items={[
                          {
                            key: '1',
                            label: (
                              <Row wrap={true} __component_name="Row">
                                <Col
                                  span={6}
                                  style={{ display: 'flex', alignItems: 'center' }}
                                  __component_name="Col"
                                >
                                  <Image
                                    src={__$$eval(
                                      () =>
                                        __$$context.props.appHelper.constants.DATASET_DATA
                                          ?.typeIcons?.[item.contentType]
                                    )}
                                    width={32}
                                    height={32}
                                    preview={false}
                                    fallback=""
                                    __component_name="Image"
                                  />
                                  <UnifiedLink
                                    to={__$$eval(() => `/dataset/detail/${item.name}`)}
                                    style={{ fontSize: '18px', marginLeft: '16px' }}
                                    target="_blank"
                                    __component_name="UnifiedLink"
                                  >
                                    {__$$eval(() => item.name)}
                                  </UnifiedLink>
                                </Col>
                                <Col
                                  span={6}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                  __component_name="Col"
                                >
                                  <Tag color="processing" closable={false} __component_name="Tag">
                                    tag
                                  </Tag>
                                  <Tag color="processing" closable={false} __component_name="Tag">
                                    tag
                                  </Tag>
                                </Col>
                                <Col
                                  span={6}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                  __component_name="Col"
                                >
                                  <Typography.Text
                                    style={{ fontSize: '' }}
                                    strong={false}
                                    disabled={false}
                                    ellipsis={true}
                                    __component_name="Typography.Text"
                                  >
                                    版本数 5
                                  </Typography.Text>
                                </Col>
                                <Col
                                  span={6}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                  }}
                                  __component_name="Col"
                                >
                                  <Button
                                    icon={
                                      <AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />
                                    }
                                    type="text"
                                    block={false}
                                    ghost={false}
                                    shape="default"
                                    danger={false}
                                    onClick={function () {
                                      return this.addText.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([])
                                      );
                                    }.bind(__$$context)}
                                    disabled={false}
                                    __component_name="Button"
                                  >
                                    新增文本
                                  </Button>
                                  <Divider
                                    mode="default"
                                    type="vertical"
                                    dashed={false}
                                    defaultOpen={false}
                                    __component_name="Divider"
                                  />
                                  <Button
                                    icon={
                                      <AntdIconDeleteOutlined __component_name="AntdIconDeleteOutlined" />
                                    }
                                    type="text"
                                    block={false}
                                    ghost={false}
                                    shape="default"
                                    danger={false}
                                    onClick={function () {
                                      return this.refresh.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([])
                                      );
                                    }.bind(__$$context)}
                                    disabled={false}
                                    __component_name="Button"
                                  >
                                    刷新
                                  </Button>
                                </Col>
                              </Row>
                            ),
                            children: (
                              <Table
                                size="middle"
                                rowKey="id"
                                scroll={{ scrollToFirstRowOnChange: true }}
                                columns={[
                                  {
                                    key: 'version',
                                    title: '版本',
                                    ellipsis: { showTitle: true },
                                    dataIndex: 'version',
                                  },
                                  {
                                    key: 'importStatus',
                                    title: '导入状态',
                                    dataIndex: 'importStatus',
                                  },
                                  {
                                    key: 'releaseStatus',
                                    title: '发布状态',
                                    dataIndex: 'releaseStatus',
                                  },
                                  {
                                    key: 'dataField',
                                    title: '数据处理状态',
                                    dataIndex: 'dataField',
                                  },
                                  { key: 'dataMount', title: '数据量', dataIndex: 'dataMount' },
                                  {
                                    key: 'updateTime',
                                    title: '最后更新时间',
                                    dataIndex: 'updateTime',
                                  },
                                  {
                                    key: 'action',
                                    title: '操作',
                                    render: (text, record, index) =>
                                      (__$$context => (
                                        <Dropdown.Button
                                          menu={{
                                            items: [
                                              {
                                                key: 'release',
                                                label: this.i18n('i18n-5bu583cw') /* 发布 */,
                                              },
                                              {
                                                key: 'import',
                                                label: this.i18n('i18n-mh5ck17f') /* 导入数据 */,
                                              },
                                              {
                                                key: 'delete',
                                                label: this.i18n('i18n-z0idrepg') /* 删除 */,
                                              },
                                            ],
                                          }}
                                          danger={false}
                                          trigger={['hover']}
                                          disabled={false}
                                          placement="bottomRight"
                                          __component_name="Dropdown.Button"
                                          destroyPopupOnHide={true}
                                        >
                                          <Typography.Text
                                            style={{ fontSize: '' }}
                                            strong={false}
                                            disabled={false}
                                            ellipsis={true}
                                            __component_name="Typography.Text"
                                          >
                                            {this.i18n('i18n-6r57uk2w') /* 数据处理 */}
                                          </Typography.Text>
                                        </Dropdown.Button>
                                      ))(
                                        __$$createChildContext(__$$context, { text, record, index })
                                      ),
                                    dataIndex: 'action',
                                  },
                                ]}
                                dataSource={[
                                  {
                                    id: '1',
                                    age: 32,
                                    name: '胡彦斌',
                                    address: '西湖区湖底公园1号',
                                  },
                                  {
                                    id: '2',
                                    age: 28,
                                    name: '王一博',
                                    address: '滨江区网商路699号',
                                  },
                                ]}
                                pagination={false}
                                showHeader={true}
                                __component_name="Table"
                              />
                            ),
                            showArrow: true,
                            _unsafe_MixedSetter_label_select: 'SlotSetter',
                            _unsafe_MixedSetter_children_select: 'SlotSetter',
                          },
                        ]}
                        style={{}}
                        bordered={true}
                        accordion={false}
                        __component_name="Collapse"
                        defaultActiveKey={['collapse-item-1']}
                        expandIconPosition="right"
                      />
                    </Col>
                  </Row>
                </List.Item>
              ))(__$$createChildContext(__$$context, { item }))
            }
            __component_name="List"
          />
        </Card>
      </Page>
    );
  }
}

const PageWrapper = () => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/dataset' }, location.pathname);
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
      sdkSwrFuncs={[
        {
          func: 'undefined',
          params: undefined,
          enableLocationSearch: undefined,
        },
      ]}
      render={dataProps => <Dataset$$Page {...dataProps} self={self} appHelper={appHelper} />}
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
