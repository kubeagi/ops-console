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
  Dropdown,
  Divider,
  Descriptions,
  Status,
  Tag,
  Pagination,
  Modal,
} from '@tenx-ui/materials';

import {
  AntdIconPlusOutlined,
  AntdIconReloadOutlined,
  AntdIconCodeSandboxCircleFilled,
  AntdIconSettingOutlined,
} from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class ModelWarehouse$$Page extends React.Component {
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
      pages: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      types: '',
      keyword: '',
      loading: false,
      modelList: [],
      pageRange: [],
      currentRecord: null,
      deleteLoading: false,
      deleteBtnLoading: false,
      deleteModalVisible: false,
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    console.log('will unmount');
  }

  onEdit(item) {
    this.history.push(`/model-warehouse/edit/${item.name}`);
  }

  getData() {
    console.log(this.utils.bff);
    this.setState({
      loading: true,
    });
    const project = this.utils.getAuthData()?.project;
    const { currentPage, pageSize } = this.state.pages;
    const params = {
      namespace: project,
      keyword: this.state.keyword,
      labelSelector: this.state.types ? `arcadia.kubeagi.k8s.com.cn/${this.state.types}=true` : '',
      page: currentPage,
      pageSize,
    };
    this.utils.bff
      .listModels({
        input: params,
      })
      .then(res => {
        console.log(res);
        const { Model } = res;
        const { listModels } = Model || {};
        const { nodes, totalCount } = listModels || {};
        this.setState({
          modelList: nodes || [],
          loading: false,
          pages: {
            ...this.state.pages,
            total: totalCount,
          },
        });
      })
      .catch(error => {
        this.setState({
          modelList: [],
          loading: false,
        });
      });
  }

  onChange(page, pageSize) {
    // 页码或 pageSize 改变的回调
    this.setState(
      {
        pages: {
          ...this.state.pages,
          currentPage: page,
          pageSize,
        },
      },
      () => {
        this.getData();
      }
    );
  }

  onDelete() {
    console.log(this.utils.bff);
    this.setState({
      deleteLoading: true,
    });
    const project = this.utils.getAuthData()?.project;
    const params = {
      namespace: project,
      name: this.state.currentRecord.name,
    };
    this.utils.bff
      .deleteModels({
        input: params,
      })
      .then(res => {
        this.setState({
          deleteLoading: false,
        });
        this.utils.notification.success({
          message: '删除模型成功',
        });
        // 'event' 传参无意义，仅仅为了占数
        this.onCloseDeleteModal('event', true);
      })
      .catch(error => {
        this.setState({
          deleteLoading: false,
        });
        this.utils.notification.warn({
          message: '删除模型失败',
        });
      });
  }

  onSearch(name) {
    this.setState(
      {
        keyword: name,
        types: this.state.types,
        pages: {
          ...this.state.pages,
          currentPage: 1,
        },
      },
      () => {
        this.getData();
      }
    );
  }

  showTotal(total, range) {
    // 用于格式化显示表格数据总量
    return `共 ${total} 条`;
  }

  onMenuClick(opItem, record) {
    const { key } = opItem;
    if (key === 'delete') {
      this.openDeleteModal(record.item);
    } else if (key === 'edit') {
      this.onEdit(record.item);
    }
  }

  onCreateClick(event) {
    this.history.push(`/model-warehouse/create`);
  }

  onDetailClick(e, extParams) {
    // 事件的 handler

    this.history.push(`/model-warehouse/detail/${extParams.data.name}`);
  }

  onTypesChange(type) {
    this.setState(
      {
        keyword: this.state.keyword,
        types: type === 'all' ? '' : type,
        pages: {
          ...this.state.pages,
          currentPage: 1,
        },
      },
      () => {
        this.getData();
      }
    );
  }

  openDeleteModal(item) {
    this.setState({
      deleteModalVisible: true,
      currentRecord: item,
    });
  }

  onShowSizeChange(current, size) {
    // pageSize 变化的回调
    this.setState({
      pages: {
        ...this.state.pages,
        pageSize: size,
      },
    });
  }

  onCloseDeleteModal(e, isNeedLoad) {
    console.log('isNeedLoad', isNeedLoad);
    this.setState({
      deleteModalVisible: false,
      currentRecord: null,
    });
    if (isNeedLoad) {
      this.getData();
    }
  }

  handlePageSizeChange(size) {
    this.setState({
      pages: {
        ...this.state.pages,
        pageSize: size,
      },
    });
  }

  componentDidMount() {
    console.log('did mount', this.utils.bff);
    this.getData();
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
              模型仓库
            </Typography.Title>
          </Col>
          <Col span={24} __component_name="Col" style={{}}>
            <Alert
              message="模型托管模块，集中管理通过平台训练或手动导入的大模型，支持对模型进行评估及部署。"
              __component_name="Alert"
              type="info"
              showIcon={true}
            />
          </Col>
          <Col span={24} __component_name="Col">
            <Card
              size="default"
              type="inner"
              style={{ paddingTop: '4px', paddingBottom: '16px' }}
              actions={[]}
              loading={false}
              bordered={false}
              hoverable={false}
              __component_name="Card"
            >
              <Row wrap={true} gutter={[0, 0]} __component_name="Row">
                <Col span={24} __component_name="Col">
                  <Row
                    wrap={false}
                    style={{ marginBottom: '16px' }}
                    justify="space-between"
                    __component_name="Row"
                  >
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
                            return this.onCreateClick.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          disabled={false}
                          __component_name="Button"
                        >
                          新增模型
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
                        <Input.Search
                          style={{ width: '240px' }}
                          onSearch={function () {
                            return this.onSearch.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          placeholder="请输入模型名称搜索"
                          __component_name="Input.Search"
                        />
                      </Space>
                    </Col>
                    <Col __component_name="Col">
                      <Space align="center" direction="horizontal" __component_name="Space">
                        <Row wrap={false} justify="space-between" __component_name="Row">
                          <Col __component_name="Col">
                            <Select
                              style={{ width: 200 }}
                              options={[
                                { label: '全部类型', value: 'all', disabled: false },
                                { label: 'LLM', value: 'llm' },
                                { label: 'Embedding', value: 'embedding' },
                              ]}
                              disabled={false}
                              onChange={function () {
                                return this.onTypesChange.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              allowClear={true}
                              showSearch={true}
                              placeholder="全部类型"
                              _sdkSwrGetFunc={{}}
                              __component_name="Select"
                            />
                          </Col>
                        </Row>
                      </Space>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} __component_name="Col">
                  <List
                    grid={{ lg: 2, md: 2, sm: 2, xl: 3, xs: 2, xxl: 4, column: 3, gutter: 20 }}
                    size="small"
                    split={false}
                    rowKey="id"
                    loading={__$$eval(() => this.state.loading)}
                    bordered={false}
                    dataSource={__$$eval(() => this.state.modelList)}
                    gridEnable={true}
                    itemLayout="horizontal"
                    pagination={false}
                    renderItem={item =>
                      (__$$context => (
                        <List.Item style={{ marginTop: '16px' }}>
                          <Card
                            size="default"
                            type="default"
                            actions={[]}
                            loading={false}
                            bordered={true}
                            hoverable={true}
                          >
                            <Row wrap={true} gutter={['', 0]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} gutter={[0, 0]} __component_name="Row">
                                  <Col flex="56px" __component_name="Col">
                                    <AntdIconCodeSandboxCircleFilled
                                      style={{ color: '#4a90e2', fontSize: 56 }}
                                      onClick={function () {
                                        return this.onDetailClick.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              data: item,
                                            },
                                          ])
                                        );
                                      }.bind(__$$context)}
                                      __component_name="AntdIconCodeSandboxCircleFilled"
                                    />
                                  </Col>
                                  <Col flex="auto" __component_name="Col">
                                    <Row
                                      wrap={false}
                                      gutter={[0, 0]}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col style={{ paddingLeft: '20px' }} __component_name="Col">
                                        <Typography.Title
                                          bold={true}
                                          level={1}
                                          onClick={function () {
                                            return this.onDetailClick.apply(
                                              this,
                                              Array.prototype.slice.call(arguments).concat([
                                                {
                                                  data: item,
                                                },
                                              ])
                                            );
                                          }.bind(__$$context)}
                                          bordered={false}
                                          ellipsis={true}
                                          __component_name="Typography.Title"
                                        >
                                          {__$$eval(() => __$$context.utils.getFullName(item))}
                                        </Typography.Title>
                                        <Typography.Paragraph
                                          code={false}
                                          mark={false}
                                          style={{ fontSize: '12', marginTop: '8px' }}
                                          delete={false}
                                          strong={false}
                                          disabled={false}
                                          editable={false}
                                          ellipsis={{
                                            rows: 2,
                                            tooltip: true,
                                            _unsafe_MixedSetter_tooltip_select: 'BoolSetter',
                                          }}
                                          underline={false}
                                        >
                                          {__$$eval(() => item.description || '-')}
                                        </Typography.Paragraph>
                                      </Col>
                                      <Col __component_name="Col">
                                        <Dropdown
                                          menu={{
                                            items: [
                                              { key: 'deployment', label: '部署' },
                                              { key: 'edit', label: '编辑' },
                                              { key: 'delete', label: '删除' },
                                            ],
                                            onClick: function () {
                                              return this.onMenuClick.apply(
                                                this,
                                                Array.prototype.slice.call(arguments).concat([
                                                  {
                                                    item: item,
                                                  },
                                                ])
                                              );
                                            }.bind(__$$context),
                                          }}
                                          trigger={['hover']}
                                          disabled={false}
                                          placement="bottomLeft"
                                          __component_name="Dropdown"
                                          destroyPopupOnHide={true}
                                        >
                                          <AntdIconSettingOutlined __component_name="AntdIconSettingOutlined" />
                                        </Dropdown>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                              <Col flex="" span={24} __component_name="Col">
                                <Divider
                                  mode="line"
                                  style={{ width: 'calc(100% + 48px)', marginLeft: '-24px' }}
                                  dashed={false}
                                  defaultOpen={false}
                                  __component_name="Divider"
                                  orientationMargin=""
                                />
                                <Descriptions
                                  id=""
                                  size="small"
                                  colon={false}
                                  items={[
                                    {
                                      key: '1efg6rtctqk',
                                      span: 1,
                                      label: '状态',
                                      children: (
                                        <Row
                                          wrap={false}
                                          justify="space-between"
                                          __component_name="Row"
                                        >
                                          <Col
                                            span={18}
                                            style={{ paddingLeft: '16px' }}
                                            __component_name="Col"
                                          >
                                            <Status
                                              id={__$$eval(() => item.status)}
                                              style={{}}
                                              types={[
                                                { id: 'False', type: 'error', children: '失败' },
                                                { id: 'True', type: 'success', children: '成功' },
                                              ]}
                                              __component_name="Status"
                                            />
                                          </Col>
                                          <Col
                                            span={24}
                                            style={{ display: 'inline-block', textAlign: 'left' }}
                                            __component_name="Col"
                                          >
                                            {__$$evalArray(() => item.types.split(',')).map(
                                              (item, index) =>
                                                (__$$context => (
                                                  <Tag
                                                    key="item"
                                                    color="success"
                                                    style={{}}
                                                    closable={false}
                                                    __component_name="Tag"
                                                  >
                                                    {__$$eval(() =>
                                                      item === 'llm'
                                                        ? 'LLM'
                                                        : item === 'embedding'
                                                        ? 'Embedding'
                                                        : item
                                                    )}
                                                  </Tag>
                                                ))(
                                                  __$$createChildContext(__$$context, {
                                                    item,
                                                    index,
                                                  })
                                                )
                                            )}
                                          </Col>
                                        </Row>
                                      ),
                                    },
                                    {
                                      key: 'jclso8ts01b',
                                      span: 1,
                                      label: '更新时间',
                                      children: (
                                        <Typography.Time
                                          time={__$$eval(() => item.updateTimestamp)}
                                          format=""
                                          relativeTime={false}
                                          __component_name="Typography.Time"
                                        />
                                      ),
                                      labelStyle: { marginTop: '0px' },
                                    },
                                  ]}
                                  style={{ marginTop: '-16px' }}
                                  title=""
                                  column={1}
                                  layout="horizontal"
                                  bordered={false}
                                  labelStyle={{ width: '76', padding: '12px 0 0 0' }}
                                  contentStyle={{ padding: '12px 0 0 0' }}
                                  borderedBottom={false}
                                  __component_name="Descriptions"
                                  borderedBottomDashed={true}
                                >
                                  <Descriptions.Item key="1efg6rtctqk" span={1} label="状态">
                                    {null}
                                  </Descriptions.Item>
                                  <Descriptions.Item key="jclso8ts01b" span={1} label="更新时间">
                                    {null}
                                  </Descriptions.Item>
                                </Descriptions>
                              </Col>
                            </Row>
                          </Card>
                        </List.Item>
                      ))(__$$createChildContext(__$$context, { item }))
                    }
                    __component_name="List"
                  />
                </Col>
              </Row>
              <Row wrap={true} __component_name="Row">
                <Col span={24} __component_name="Col">
                  <Pagination
                    style={{ textAlign: 'right' }}
                    total={__$$eval(() => this.state.pages.total)}
                    simple={false}
                    current={__$$eval(() => this.state.pages.currentPage)}
                    onChange={function () {
                      return this.onChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    pageSize={__$$eval(() => this.state.pages.pageSize)}
                    __component_name="Pagination"
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Modal
          mask={true}
          onOk={function () {
            return this.onDelete.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={__$$eval(() => this.state.deleteModalVisible)}
          title="删除模型"
          centered={false}
          keyboard={true}
          onCancel={function () {
            return this.onCloseDeleteModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          forceRender={false}
          maskClosable={false}
          okButtonProps={{ disabled: false }}
          confirmLoading={__$$eval(() => this.state.deleteLoading)}
          destroyOnClose={true}
          __component_name="Modal"
          cancelButtonProps={{ disabled: false }}
        >
          <Alert
            type="warning"
            message="确认删除此模型？"
            showIcon={true}
            __component_name="Alert"
          />
        </Modal>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: 'model-warehouse' }, location.pathname);
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
        <ModelWarehouse$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
