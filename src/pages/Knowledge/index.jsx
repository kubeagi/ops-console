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
  List,
  Dropdown,
  Image,
  Divider,
  Descriptions,
  Status,
  Tooltip,
  Tag,
  Pagination,
} from '@tenx-ui/materials';

import LccComponentXnggv from 'kubeagi-knowledge-edit-modal';

import LccComponentChj61 from 'kubeagi-knowledge-delete-modal';

import {
  AntdIconPlusOutlined,
  TenxIconRefresh,
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

class Knowledge$$Page extends React.Component {
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
      corpusList: [],
      currentItem: {},
      deleteModalOpen: false,
      editModalOpen: false,
      loading: false,
      pageRange: [],
      pages: {
        currentPage: 1,
        pageSize: 12,
        total: 0,
      },
      searchName: '',
    };
  }

  $ = () => null;

  $$ = () => [];

  getData() {
    this.setState({
      loading: true,
    });
    const project = JSON.parse(localStorage.getItem('authData'))?.project;
    const { currentPage, pageSize } = this.state.pages;
    const params = {
      namespace: project,
      name: this.state.searchName,
      page: currentPage,
      pageSize,
    };
    this.utils.bff
      .listKnowledgeBases({
        input: params,
      })
      .then(res => {
        const { KnowledgeBase } = res;
        const { listKnowledgeBases } = KnowledgeBase || {};
        const { nodes, totalCount } = listKnowledgeBases || {};
        this.setState({
          corpusList: nodes || [],
          loading: false,
          pages: {
            ...this.state.pages,
            total: totalCount,
          },
        });
      })
      .catch(error => {
        this.setState({
          corpusList: [],
          loading: false,
        });
      });
  }

  getDataStatus(isStatus, isTag) {
    return [
      // 导入中
      {
        type: 'primary',
        [isStatus ? 'id' : 'value']: 'process',
        [isStatus || isTag ? 'children' : 'text']: '数据处理中',
      },
      // 连接成功
      {
        type: 'success',
        [isStatus ? 'id' : 'value']: 'success',
        [isStatus || isTag ? 'children' : 'text']: '数据处理完成',
      },
      // 连接异常
      {
        type: 'error',
        [isStatus ? 'id' : 'value']: 'error',
        [isStatus || isTag ? 'children' : 'text']: '数据处理失败',
      },
      // 删除中
      {
        type: 'info',
        [isStatus ? 'id' : 'value']: 'deleting',
        [isStatus || isTag ? 'children' : 'text']: '删除中',
      },
    ];
  }

  getStatusType(item) {
    if (item.status === 'True') {
      return 'success';
    }
    if (item.status === 'False') {
      return 'error';
    }
    if (item.status === 'Deleting') {
      return 'deleting';
    }
    return 'process';
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

  onCreateClick(event) {
    this.history.push(`/knowledge/create`);
  }

  onDeleteModalCancel() {
    this.setState({
      deleteModalOpen: false,
    });
  }

  onDeleteModalOk() {
    this.getData();
    this.setState({
      deleteModalOpen: false,
    });
  }

  onDetailClick(e, extParams) {
    this.history.push(`/knowledge/detail/${extParams.data.name}`);
  }

  onEditModalCancel() {
    this.setState({
      editModalOpen: false,
    });
  }

  onEditModalOk() {
    this.getData();
    this.setState({
      editModalOpen: false,
    });
  }

  onMenuClick({ item, key, keyPath, domEvent }, extParams) {
    domEvent.stopPropagation();
    this.setState({
      currentItem: extParams.data,
    });
    switch (key) {
      case 'edit':
        {
          this.setState({
            editModalOpen: true,
          });
        }
        break;
      case 'delete':
        {
          this.setState({
            deleteModalOpen: true,
          });
        }
        break;
      default:
        break;
    }
  }

  onSearch(name) {
    this.setState(
      {
        searchName: name,
        pages: {
          ...this.state.pages,
          currentPage: 1,
        },
      },
      () => {
        this.getData(name);
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

  returnTxt(item) {
    return item;
  }

  showTotal(total, range) {
    return `共 ${total} 条`;
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        {!!__$$eval(() => this.state.editModalOpen) && (
          <LccComponentXnggv
            __component_name="LccComponentXnggv"
            initialValues={__$$eval(() => this.state.currentItem)}
            name={__$$eval(() => this.state.currentItem?.name)}
            namespace={__$$eval(() => this.state.currentItem?.namespace)}
            onCancel={function () {
              return this.onEditModalCancel.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            onOk={function () {
              return this.onEditModalOk.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            open={__$$eval(() => this.state.editModalOpen)}
          />
        )}
        {!!__$$eval(() => this.state.deleteModalOpen) && (
          <LccComponentChj61
            __component_name="LccComponentChj61"
            displayName={__$$eval(() => this.state.currentItem?.displayName)}
            name={__$$eval(() => this.state.currentItem?.name)}
            namespace={__$$eval(() => this.state.currentItem?.namespace)}
            onCancel={function () {
              return this.onDeleteModalCancel.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            onOk={function () {
              return this.onDeleteModalOk.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
          />
        )}
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={1}
            >
              知识库管理
            </Typography.Title>
          </Col>
          <Col __component_name="Col" span={24}>
            <Alert
              __component_name="Alert"
              message="构建私域文档以及知识管理的能力，支持多种数据类型，上传的数据文件将会储存至向量数据库中。"
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
              style={{ paddingBottom: '16px', paddingTop: '4px' }}
              type="inner"
            >
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={24}>
                  <Space __component_name="Space" align="center" direction="horizontal">
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
                      新增知识库
                    </Button>
                    <Button
                      __component_name="Button"
                      block={false}
                      danger={false}
                      disabled={false}
                      ghost={false}
                      icon={<TenxIconRefresh __component_name="TenxIconRefresh" />}
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
                      placeholder="请输入知识库名称搜索"
                    />
                  </Space>
                </Col>
                <Col __component_name="Col" span={24}>
                  <List
                    __component_name="List"
                    bordered={false}
                    dataSource={__$$eval(() => this.state.corpusList)}
                    footer=""
                    grid={{ column: 3, gutter: 16, lg: 3, md: 2, sm: 2, xl: 4, xs: 2, xxl: 4 }}
                    gridEnable={true}
                    header=""
                    itemLayout="horizontal"
                    loading={__$$eval(() => this.state.loading)}
                    renderItem={
                      /* 插槽容器*/ item =>
                        (__$$context => (
                          <List.Item actions={[]} extra="">
                            <Card
                              actions={[]}
                              bodyStyle={{ position: 'relative' }}
                              bordered={true}
                              cover=""
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
                              style={{}}
                              type="default"
                            >
                              <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                                <Col
                                  __component_name="Col"
                                  span={24}
                                  style={{ position: 'absolute', right: '24px' }}
                                >
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
                                              data: item,
                                            },
                                          ])
                                        );
                                      }.bind(__$$context),
                                    }}
                                    placement="bottomLeft"
                                    trigger={['hover']}
                                  >
                                    <Button
                                      __component_name="Button"
                                      block={false}
                                      danger={false}
                                      disabled={false}
                                      ghost={false}
                                      onClick={function () {
                                        return this.stopPropagation.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([])
                                        );
                                      }.bind(__$$context)}
                                      shape="default"
                                      style={{
                                        border: 'none',
                                        boxShadow: 'none',
                                        float: 'right',
                                        padding: '0',
                                        right: '-16px',
                                        top: '-10px',
                                        width: '48px',
                                        zIndex: '2',
                                      }}
                                      type="default"
                                    >
                                      {
                                        <AntdIconSettingOutlined __component_name="AntdIconSettingOutlined" />
                                      }
                                    </Button>
                                  </Dropdown>
                                </Col>
                                <Col __component_name="Col" span={24}>
                                  <Row
                                    __component_name="Row"
                                    gutter={[0, 0]}
                                    style={{ alignItems: 'center', display: 'flex' }}
                                    wrap={false}
                                  >
                                    <Col __component_name="Col" flex="56px">
                                      <Image
                                        __component_name="Image"
                                        fallback=""
                                        height={56}
                                        preview={false}
                                        src="data:image/png;base64,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"
                                        style={{ borderRadius: '28px' }}
                                        width={56}
                                      />
                                    </Col>
                                    <Col __component_name="Col" flex="auto">
                                      <Row
                                        __component_name="Row"
                                        gutter={[0, 0]}
                                        style={{ cursor: 'pointer', paddingLeft: '20px' }}
                                        wrap={true}
                                      >
                                        <Col
                                          __component_name="Col"
                                          style={{ paddingRight: '32px' }}
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
                                        </Col>
                                        <Col __component_name="Col" span={24}>
                                          <Typography.Paragraph
                                            code={false}
                                            delete={false}
                                            disabled={false}
                                            editable={false}
                                            ellipsis={{ rows: 1 }}
                                            mark={false}
                                            strong={false}
                                            style={{ fontSize: '' }}
                                            underline={false}
                                          >
                                            {__$$eval(() => item.description || '-')}
                                          </Typography.Paragraph>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col
                                  __component_name="Col"
                                  span={24}
                                  style={{ height: '36px', marginBottom: '-15px' }}
                                >
                                  <Divider
                                    __component_name="Divider"
                                    dashed={false}
                                    defaultOpen={false}
                                    mode="line"
                                    style={{ marginLeft: '-24px', width: 'calc(100% + 48px)' }}
                                  />
                                </Col>
                              </Row>
                              <Row __component_name="Row" wrap={true}>
                                <Col __component_name="Col" span={24}>
                                  <Descriptions
                                    __component_name="Descriptions"
                                    bordered={false}
                                    borderedBottom={true}
                                    borderedBottomDashed={true}
                                    colon={true}
                                    column={1}
                                    contentStyle={{ padding: '12px 0 0 0' }}
                                    id=""
                                    items={[
                                      {
                                        children: [
                                          <Space
                                            __component_name="Space"
                                            align="center"
                                            direction="horizontal"
                                            size={2}
                                            key="node_oclqalnx4r2"
                                          >
                                            <Status
                                              __component_name="Status"
                                              getTypes={null}
                                              id={__$$eval(() => __$$context.getStatusType(item))}
                                              types={__$$eval(() =>
                                                __$$context.getDataStatus(__$$context, true)
                                              )}
                                            />
                                            {!!__$$eval(
                                              () => item.status !== 'True' && item.message
                                            ) && (
                                              <Tooltip
                                                __component_name="Tooltip"
                                                title={__$$eval(() => item.message)}
                                              >
                                                <AntdIconInfoCircleOutlined
                                                  __component_name="AntdIconInfoCircleOutlined"
                                                  style={{ color: '#9b9b9b', marginLeft: '4px' }}
                                                />
                                              </Tooltip>
                                            )}
                                          </Space>,
                                          <Tag
                                            __component_name="Tag"
                                            closable={false}
                                            color="default"
                                            style={{ marginLeft: '12px' }}
                                            key="node_oclqalnx4r1"
                                          >
                                            {__$$eval(
                                              () =>
                                                item.embedder?.displayName || item.embedder?.name
                                            )}
                                          </Tag>,
                                        ],
                                        key: 'ssfd772g2sk',
                                        label: '状态',
                                        span: 1,
                                      },
                                      {
                                        children: (
                                          <Typography.Time
                                            __component_name="Typography.Time"
                                            format=""
                                            relativeTime={false}
                                            time={__$$eval(() => item.updateTimestamp)}
                                          />
                                        ),
                                        key: '3nv8b79bh9d',
                                        label: '更新时间',
                                        span: 1,
                                      },
                                    ]}
                                    itemStyle={{}}
                                    labelStyle={{ padding: '12px 0 0 0', width: '76' }}
                                    layout="horizontal"
                                    size="default"
                                    title=""
                                  />
                                </Col>
                              </Row>
                            </Card>
                          </List.Item>
                        ))(__$$createChildContext(__$$context, { item }))
                    }
                    rowKey="id"
                    size="small"
                    split={false}
                  />
                </Col>
                <Col
                  __component_name="Col"
                  span={24}
                  style={{ display: 'flex', justifyContent: 'right' }}
                >
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
                      return this.onShowSizeChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    pageSize={__$$eval(() => this.state.pages.pageSize)}
                    pageSizeOptions={null}
                    showTotal={function () {
                      return this.showTotal.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    simple={false}
                    style={{ display: 'flex', marginTop: '8px' }}
                    total={__$$eval(() => this.state.pages.total)}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/knowledge' }, location.pathname);
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
      sdkSwrFuncs={[
        {
          params: undefined,
          enableLocationSearch: undefined,
        },
      ]}
      render={dataProps => (
        <Knowledge$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
