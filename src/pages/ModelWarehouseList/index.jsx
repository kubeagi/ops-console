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
  Tooltip,
  Tag,
  Container,
  Pagination,
  Modal,
} from '@tenx-ui/materials';

import {
  AntdIconPlusOutlined,
  AntdIconReloadOutlined,
  AntdIconCodeSandboxCircleFilled,
  AntdIconSettingOutlined,
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
      currentRecord: null,
      deleteBtnLoading: false,
      deleteLoading: false,
      deleteModalVisible: false,
      keyword: '',
      loading: false,
      modelList: [],
      pageRange: [],
      pages: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      systemModel: true,
      types: '',
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    console.log('will unmount');
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
      systemModel: this.state.systemModel,
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

  handlePageSizeChange(size) {
    this.setState({
      pages: {
        ...this.state.pages,
        pageSize: size,
      },
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

  onCloseDeleteModal(e) {
    this.setState({
      deleteModalVisible: false,
      currentRecord: null,
    });
  }

  onCreateClick(event) {
    this.history.push(`/model-warehouse/create`);
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
        // 如果是删除了临界的数据，页数要向前翻一页，比如pageSize=10，一共有11挑数据，删掉第十一条，则currentPage需要改成1而不是2.
        this.setState(
          {
            deleteLoading: false,
            pages: {
              ...this.state.pages,
              currentPage:
                this.state.pages.total % this.state.pages.pageSize === 1 &&
                Number.parseInt(this.state.pages.total / this.state.pages.pageSize) !== 0
                  ? this.state.pages.currentPage - 1
                  : this.state.pages.currentPage,
            },
          },
          () => {
            this.getData();
          }
        );
        this.utils.notification.success({
          message: '删除模型成功',
        });
        this.onCloseDeleteModal();

        // 'event' 传参无意义，仅仅为了占数
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

  onDeployment(e, extParams) {
    // 事件的 handler
    e.stopPropagation();
    console.log(extParams);
  }

  onDetailClick(e, extParams) {
    // 事件的 handler

    this.history.push(
      `/model-warehouse/detail/${extParams.data.name}?namespace=${extParams.data.namespace}`
    );
  }

  onEdit(item) {
    this.history.push(`/model-warehouse/edit/${item.name}`);
  }

  onMenuClick(opItem, record) {
    const { key, domEvent } = opItem;
    domEvent.stopPropagation();
    if (key === 'delete') {
      this.openDeleteModal(record.item);
    } else if (key === 'edit') {
      this.onEdit(record.item);
    }
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

  onShowSizeChange(current, size) {
    // pageSize 变化的回调
    this.setState({
      pages: {
        ...this.state.pages,
        pageSize: size,
      },
    });
  }

  onSystemModelChange(source) {
    console.log(source);
    this.setState(
      {
        keyword: this.state.keyword,
        types: this.state.types,
        systemModel: source === 'false' ? false : true,
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

  onTypesChange(type) {
    this.setState(
      {
        keyword: this.state.keyword,
        systemModel: this.state.systemModel,
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

  showTotal(total, range) {
    // 用于格式化显示表格数据总量
    return `共 ${total} 条`;
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
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={1}
            >
              模型仓库
            </Typography.Title>
          </Col>
          <Col __component_name="Col" span={24} style={{}}>
            <Alert
              __component_name="Alert"
              message="模型托管模块，集中管理通过平台训练或手动导入的大模型，支持对模型进行评估及部署。"
              showIcon={true}
              type="info"
            />
          </Col>
          <Col __component_name="Col" span={24}>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={false}
              size="default"
              style={{ paddingBottom: '16px' }}
              type="inner"
            >
              <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                <Col
                  __component_name="Col"
                  span={24}
                  style={{ marginBottom: '0px', paddingBottom: '0px' }}
                >
                  <Row
                    __component_name="Row"
                    justify="space-between"
                    style={{ marginBottom: '16px' }}
                    wrap={false}
                  >
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
                            return this.onCreateClick.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          shape="default"
                          target="_self"
                          type="primary"
                        >
                          新增模型
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
                            return this.getData.apply(
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
                          onSearch={function () {
                            return this.onSearch.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          placeholder="请输入模型名称搜索"
                          style={{ width: '240px' }}
                        />
                      </Space>
                    </Col>
                    <Col __component_name="Col">
                      <Space __component_name="Space" align="center" direction="horizontal">
                        <Row __component_name="Row" justify="space-between" wrap={false}>
                          <Col __component_name="Col">
                            <Select
                              __component_name="Select"
                              _sdkSwrGetFunc={{}}
                              allowClear={true}
                              disabled={false}
                              onChange={function () {
                                return this.onSystemModelChange.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              options={[
                                { disabled: false, label: '全部模型', value: 'all' },
                                { label: '系统内置模型', value: 'true' },
                                { label: '我的模型', value: 'false' },
                              ]}
                              placeholder="全部来源"
                              showSearch={true}
                              style={{ marginRight: '12px', width: '150px' }}
                            />
                          </Col>
                          <Col __component_name="Col">
                            <Select
                              __component_name="Select"
                              _sdkSwrGetFunc={{}}
                              allowClear={true}
                              disabled={false}
                              onChange={function () {
                                return this.onTypesChange.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              options={[
                                { disabled: false, label: '全部类型', value: 'all' },
                                { label: 'LLM', value: 'llm' },
                                { label: 'Embedding', value: 'embedding' },
                              ]}
                              placeholder="全部类型"
                              showSearch={true}
                              style={{ width: '150px' }}
                            />
                          </Col>
                        </Row>
                      </Space>
                    </Col>
                  </Row>
                </Col>
                <Col __component_name="Col" span={24}>
                  <List
                    __component_name="List"
                    bordered={false}
                    dataSource={__$$eval(() => this.state.modelList)}
                    grid={{ column: 3, gutter: 20, lg: 2, md: 2, sm: 2, xl: 3, xs: 2, xxl: 4 }}
                    gridEnable={true}
                    itemLayout="horizontal"
                    loading={__$$eval(() => this.state.loading)}
                    pagination={false}
                    renderItem={item =>
                      (__$$context => (
                        <List.Item extra="" style={{ marginBlockEnd: '0px', marginBottom: '16px' }}>
                          <Card
                            actions={[]}
                            bordered={true}
                            hoverable={true}
                            loading={false}
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
                            size="default"
                            style={{ marginBottom: '16px' }}
                            type="default"
                          >
                            <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" gutter={[0, 0]} wrap={false}>
                                  <Col __component_name="Col" flex="56px">
                                    <AntdIconCodeSandboxCircleFilled
                                      __component_name="AntdIconCodeSandboxCircleFilled"
                                      style={{ color: '#4a90e2', fontSize: 56 }}
                                    />
                                  </Col>
                                  <Col __component_name="Col" flex="1">
                                    <Row
                                      __component_name="Row"
                                      gutter={[0, 0]}
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col
                                        __component_name="Col"
                                        flex="1"
                                        style={{ paddingLeft: '20px' }}
                                      >
                                        <Typography.Title
                                          __component_name="Typography.Title"
                                          bold={true}
                                          bordered={false}
                                          ellipsis={true}
                                          level={1}
                                        >
                                          {__$$eval(() => __$$context.utils.getFullName(item))}
                                        </Typography.Title>
                                        <Typography.Paragraph
                                          code={false}
                                          delete={false}
                                          disabled={false}
                                          editable={false}
                                          ellipsis={{
                                            _unsafe_MixedSetter_tooltip_select: 'BoolSetter',
                                            rows: 2,
                                            tooltip: false,
                                          }}
                                          mark={false}
                                          strong={false}
                                          style={{ fontSize: '12', marginTop: '4px' }}
                                          underline={false}
                                        >
                                          {__$$eval(() => item.description || '-')}
                                        </Typography.Paragraph>
                                      </Col>
                                      <Col __component_name="Col" flex="24px" style={{ zIndex: 3 }}>
                                        <Dropdown
                                          __component_name="Dropdown"
                                          destroyPopupOnHide={true}
                                          disabled={false}
                                          menu={{
                                            items: [
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
                                          overlayStyle={{}}
                                          placement="bottomLeft"
                                          style={{}}
                                          trigger={['hover']}
                                        >
                                          {!!__$$eval(
                                            () =>
                                              __$$context.utils.getAuthData()?.project ===
                                              item.namespace
                                          ) && (
                                            <Button
                                              __component_name="Button"
                                              block={false}
                                              children=""
                                              danger={false}
                                              disabled={false}
                                              ghost={false}
                                              icon={
                                                <AntdIconSettingOutlined __component_name="AntdIconSettingOutlined" />
                                              }
                                              shape="default"
                                              size="small"
                                              style={{ borderColor: 'rgba(34,25,77,0)' }}
                                            />
                                          )}
                                        </Dropdown>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                              <Col
                                __component_name="Col"
                                span={24}
                                style={{ display: 'inline-block', textAlign: 'left' }}
                              />
                              <Col __component_name="Col" flex="" span={24}>
                                <Divider
                                  __component_name="Divider"
                                  dashed={false}
                                  defaultOpen={false}
                                  mode="line"
                                  orientationMargin=""
                                  style={{
                                    marginBottom: '0px',
                                    marginLeft: '-24px',
                                    marginTop: '24px',
                                    width: 'calc(100% + 48px)',
                                  }}
                                />
                                <Descriptions
                                  __component_name="Descriptions"
                                  bordered={false}
                                  borderedBottom={false}
                                  borderedBottomDashed={true}
                                  colon={false}
                                  column={1}
                                  contentStyle={{ padding: '12px 0 0 0' }}
                                  id=""
                                  items={[
                                    {
                                      children: (
                                        <Row
                                          __component_name="Row"
                                          gutter={[0, 0]}
                                          justify="start"
                                          wrap={true}
                                        >
                                          <Col __component_name="Col" span={24}>
                                            <Row
                                              __component_name="Row"
                                              gutter={[0, 0]}
                                              justify="space-between"
                                              style={{ width: '100%' }}
                                              wrap={false}
                                            >
                                              <Col __component_name="Col" span={9}>
                                                <Status
                                                  __component_name="Status"
                                                  id={__$$eval(() => item.status)}
                                                  style={{}}
                                                  types={[
                                                    {
                                                      children: '异常',
                                                      id: 'False',
                                                      type: 'error',
                                                    },
                                                    {
                                                      children: '正常',
                                                      id: 'True',
                                                      type: 'success',
                                                    },
                                                  ]}
                                                />
                                                <Tooltip
                                                  __component_name="Tooltip"
                                                  title={__$$eval(() => item.message)}
                                                >
                                                  {!!__$$eval(() => item.status === 'False') && (
                                                    <AntdIconInfoCircleOutlined
                                                      __component_name="AntdIconInfoCircleOutlined"
                                                      style={{ marginLeft: '20px' }}
                                                    />
                                                  )}
                                                </Tooltip>
                                              </Col>
                                              <Col
                                                __component_name="Col"
                                                span={15}
                                                style={{ textAlign: 'right' }}
                                              >
                                                {__$$evalArray(() => item.types.split(',')).map(
                                                  (item, index) =>
                                                    (__$$context => (
                                                      <Tag
                                                        __component_name="Tag"
                                                        closable={false}
                                                        color="success"
                                                        key="item"
                                                        style={{ marginRight: '0px' }}
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
                                          </Col>
                                        </Row>
                                      ),
                                      contentStyle: {
                                        display: 'block',
                                        marginRight: '0px',
                                        paddingRight: '0px',
                                      },
                                      key: 'tmnox1z1efp',
                                      label: '状态',
                                      span: 1,
                                    },
                                    {
                                      children: (
                                        <Row __component_name="Row" wrap={true}>
                                          <Col __component_name="Col" span={24}>
                                            <Row
                                              __component_name="Row"
                                              justify="space-between"
                                              wrap={false}
                                            >
                                              <Col __component_name="Col">
                                                <Typography.Time
                                                  __component_name="Typography.Time"
                                                  format=""
                                                  relativeTime={false}
                                                  time={__$$eval(() => item.updateTimestamp)}
                                                />
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>
                                      ),
                                      key: 'jclso8ts01b',
                                      label: '更新时间',
                                      labelStyle: { marginTop: '0px' },
                                      span: 1,
                                    },
                                  ]}
                                  labelStyle={{ padding: '12px 0 0 0', width: '60px' }}
                                  layout="horizontal"
                                  size="small"
                                  style={{ marginTop: '0' }}
                                  title=""
                                >
                                  <Descriptions.Item key="1efg6rtctqk" label="状态" span={1}>
                                    {null}
                                  </Descriptions.Item>
                                  <Descriptions.Item key="jclso8ts01b" label="更新时间" span={1}>
                                    {null}
                                  </Descriptions.Item>
                                </Descriptions>
                              </Col>
                              <Col
                                __component_name="Col"
                                flex=""
                                span={24}
                                style={{ marginTop: '16px' }}
                              >
                                <Button
                                  __component_name="Button"
                                  block={true}
                                  danger={false}
                                  disabled={__$$eval(() => item.status === 'False')}
                                  ghost={true}
                                  hoverColor="primary"
                                  href={__$$eval(
                                    () => '/model-service/createModelService?name=' + item.name
                                  )}
                                  icon=""
                                  onClick={function () {
                                    return this.onDeployment.apply(
                                      this,
                                      Array.prototype.slice.call(arguments).concat([
                                        {
                                          data: item,
                                        },
                                      ])
                                    );
                                  }.bind(__$$context)}
                                  shape="default"
                                  size="small"
                                  target="_self"
                                  type="primary"
                                >
                                  部署
                                </Button>
                              </Col>
                            </Row>
                            {!!__$$eval(() => item?.systemModel) && (
                              <Container
                                __component_name="Container"
                                defaultStyle={{}}
                                style={{
                                  borderLeft: '40px solid transparent',
                                  borderLeftStyle: 'solid',
                                  borderTopColor: 'rgba(92,184,92,0.9)',
                                  borderTopStyle: 'solid',
                                  borderTopWidth: '40px',
                                  position: 'absolute',
                                  right: '0',
                                  top: '0',
                                }}
                              />
                            )}
                            {!!__$$eval(() => item?.systemModel) && (
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{
                                  color: '#fff',
                                  fontSize: '',
                                  position: 'absolute',
                                  right: '2px',
                                  top: '6px',
                                  transform: 'rotate(45deg)',
                                }}
                              >
                                内置
                              </Typography.Text>
                            )}
                          </Card>
                        </List.Item>
                      ))(__$$createChildContext(__$$context, { item }))
                    }
                    rowKey="id"
                    size="small"
                    split={false}
                    style={{
                      marginBottom: '0px',
                      marginTop: '0px',
                      paddingBottom: '0px',
                      paddingTop: '0px',
                    }}
                  />
                </Col>
              </Row>
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={24}>
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={24}>
                      <Row __component_name="Row" justify="space-between" wrap={false}>
                        <Col __component_name="Col" />
                        <Col __component_name="Col">
                          <Pagination
                            __component_name="Pagination"
                            current={__$$eval(() => this.state.pages.currentPage)}
                            onChange={function () {
                              return this.onChange.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this)}
                            onShowSizeChange={function () {
                              return this.onChange.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this)}
                            pageSize={__$$eval(() => this.state.pages.pageSize)}
                            showTotal={function () {
                              return this.showTotal.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this)}
                            simple={false}
                            style={{ textAlign: 'right' }}
                            total={__$$eval(() => this.state.pages.total)}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Modal
          __component_name="Modal"
          cancelButtonProps={{ disabled: false }}
          centered={false}
          confirmLoading={__$$eval(() => this.state.deleteLoading)}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          okButtonProps={{ disabled: false }}
          onCancel={function () {
            return this.onCloseDeleteModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.onDelete.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={__$$eval(() => this.state.deleteModalVisible)}
          title="删除模型"
        >
          <Alert
            __component_name="Alert"
            message="确认删除此模型？"
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
  const match = matchPath({ path: 'model-warehouse' }, location.pathname);
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
