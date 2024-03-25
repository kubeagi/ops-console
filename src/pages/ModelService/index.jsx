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
  Modal,
} from '@tenx-ui/materials';

import {
  AntdIconPlusOutlined,
  TenxIconRefresh,
  AntdIconSettingOutlined,
  TenxIconModelIcon,
} from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class ModelService$$Page extends React.Component {
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
      currentModel: {},
      dataSource: [],
      delVisible: false,
      keyword: '',
      loading: true,
      modelTypes: '',
      offlineModal: false,
      page: 1,
      pageSize: 12,
      providerType: '',
      totalCount: 0,
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {}

  async getListWorkers() {
    this.setState({
      loading: true,
    });
    try {
      const { keyword, pageSize, page, modelTypes, providerType } = this.state;
      const namespace = this.utils.getAuthData().project || 'abc';
      const input = {
        pageSize,
        page,
        namespace,
      };
      if (keyword) input.keyword = keyword;
      if (modelTypes) input.types = modelTypes;
      if (providerType) input.providerType = providerType;
      const res = await this.props.appHelper.utils.bff?.listModelServices({
        input,
      });
      this.setState({
        dataSource: res.ModelService?.listModelServices?.nodes,
        totalCount: res.ModelService?.listModelServices?.totalCount,
        loading: false,
      });
    } catch (error) {
      this.utils.notification.warnings({
        message: '获取服务失败',
        errors: error?.response?.errors,
      });
      this.setState({
        loading: false,
      });
    }
  }

  async localMenuOnClick(e, item) {
    e.domEvent.stopPropagation();
    switch (e.key) {
      case 'offline':
        this.setState({
          currentModel: item,
          offlineModal: true,
        });
        break;
      case 'edit':
        this.history.push(
          `/model-service/editModelService?name=${item.name}&type=${
            item.providerType === 'worker' ? 'local' : 'external'
          }`
        );
        break;
      case 'delete':
        this.setState({
          currentModel: item,
          delVisible: true,
        });
        break;
    }
  }

  onChangeKeyword(event) {
    this.setState({
      keyword: event.target.value,
    });
  }

  onChangeModelTypes(e) {
    this.setState(
      {
        modelTypes: e,
      },
      this.getListWorkers
    );
  }

  onChangeProviderType(e) {
    this.setState(
      {
        providerType: e,
      },
      this.getListWorkers
    );
  }

  onClickCreatModel(event) {
    this.history.push('/model-service/createModelService');
  }

  onClickToDetail(e, { id, type }) {
    this.history.push(
      `/model-service/detail/${id}?type=${type === 'worker' ? 'local' : 'external'}`
    );
  }

  onDelCancel() {
    this.setState({
      delVisible: false,
      currentModel: {},
    });
  }

  async onDelOk() {
    try {
      const { currentModel } = this.state;
      const namespace = this.utils.getAuthData().project || 'abc';
      const input = {
        namespace,
        name: this.state.currentModel.name,
      };
      if (currentModel.providerType === 'worker') {
        await this.props.appHelper.utils.bff?.deleteWorkers({
          input,
        });
      } else {
        await this.props.appHelper.utils.bff?.deleteModelServices({
          input,
        });
      }
      this.utils.notification.success({
        message: '删除成功',
      });
      setTimeout(() => {
        this.getListWorkers();
      }, 500);
    } catch (error) {
      this.utils.notification.warnings({
        message: '删除失败',
        errors: error?.response?.errors,
      });
    }
    this.onDelCancel();
  }

  onOfflineCancel() {
    this.setState({
      offlineModal: false,
      currentModel: {},
    });
  }

  async onOfflineOk() {
    try {
      const { currentModel } = this.state;
      const params = {
        name: currentModel.name,
        namespace: currentModel.namespace,
        displayName: currentModel.displayName,
        description: currentModel.description,
        resources: currentModel.resources,
        replicas: currentModel.status === 'Offline' ? '1' : '0',
      };
      const res = await this.props.appHelper.utils.bff?.updateWorker({
        input: params,
      });
      // this.utils.notification.success({
      //   message: `${currentModel.status === 'Offline' ? '上线' : '下线'}成功`,
      // })
      setTimeout(() => {
        this.getListWorkers();
      }, 500);
    } catch (error) {
      this.utils.notification.warnings({
        message: `${currentModel.status === 'Offline' ? '上线' : '下线'}失败`,
        errors: error?.response?.errors,
      });
    }
    this.onOfflineCancel();
  }

  onRefresh(event) {
    this.getListWorkers();
  }

  onSearch(value, event) {
    this.getListWorkers();
  }

  paginationOnChange(page, pageSize) {
    // 页码或 pageSize 改变的回调
    this.setState(
      {
        page,
      },
      this.getListWorkers
    );
  }

  showTotal(total, range) {
    // 用于格式化显示表格数据总量
    return `共 ${total} 条`;
  }

  componentDidMount() {
    this.getListWorkers();
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
              {this.i18n('i18n-t06rg1nj') /* 模型服务 */}
            </Typography.Title>
          </Col>
          <Col __component_name="Col" span={24}>
            <Alert
              __component_name="Alert"
              message="集中管理模型服务，包含本地部署模型服务与第三方供应商模型服务，支持模型服务监控。"
              showIcon={true}
              style={{ marginBottom: '16px' }}
              type="info"
            />
          </Col>
        </Row>
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={false}
              size="default"
              type="default"
            >
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={24}>
                  <Row __component_name="Row" justify="space-between" wrap={false}>
                    <Col __component_name="Col" span={8}>
                      <Space __component_name="Space" align="center" direction="horizontal">
                        <Button
                          __component_name="Button"
                          block={false}
                          danger={false}
                          disabled={false}
                          ghost={false}
                          icon={<AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />}
                          onClick={function () {
                            return this.onClickCreatModel.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          shape="default"
                          type="primary"
                        >
                          {this.i18n('i18n-d43b7hfv') /* 新增模型服务 */}
                        </Button>
                        <Button
                          __component_name="Button"
                          block={false}
                          danger={false}
                          disabled={false}
                          ghost={false}
                          icon={<TenxIconRefresh __component_name="TenxIconRefresh" />}
                          onClick={function () {
                            return this.onRefresh.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          shape="default"
                        >
                          {this.i18n('i18n-jch93moe') /* 刷新 */}
                        </Button>
                        <Input.Search
                          __component_name="Input.Search"
                          onChange={function () {
                            return this.onChangeKeyword.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          onSearch={function () {
                            return this.onSearch.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          placeholder={this.i18n('i18n-f591ezbf') /* 请输入模型服务名称搜索 */}
                          value={__$$eval(() => this.state.keyword)}
                        />
                      </Space>
                    </Col>
                    <Col __component_name="Col">
                      <Row __component_name="Row" justify="space-between" wrap={false}>
                        <Col __component_name="Col" style={{}}>
                          <Space __component_name="Space" align="center" direction="horizontal">
                            <Select
                              __component_name="Select"
                              _sdkSwrGetFunc={{ func: __$$eval(() => this.state.providerType) }}
                              allowClear={true}
                              disabled={false}
                              onChange={function () {
                                return this.onChangeProviderType.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              options={[
                                { label: '全部来源', value: '' },
                                { label: '本地模型', value: 'worker' },
                                { label: '外部模型', value: '3rd_party' },
                              ]}
                              placeholder="请选择"
                              showSearch={true}
                              style={{ width: 200 }}
                              value={__$$eval(() => this.state.providerType)}
                            />
                            <Select
                              __component_name="Select"
                              _sdkSwrGetFunc={{ func: __$$eval(() => this.state.modelTypes) }}
                              allowClear={true}
                              disabled={false}
                              onChange={function () {
                                return this.onChangeModelTypes.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              options={[
                                { label: '全部类型', value: '' },
                                { label: 'LLM', value: 'llm' },
                                { label: 'Embedding', value: 'embedding' },
                              ]}
                              placeholder="请选择"
                              showSearch={true}
                              style={{ width: 200 }}
                              value={__$$eval(() => this.state.modelTypes)}
                            />
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col __component_name="Col" span={24}>
                  <List
                    __component_name="List"
                    bordered={false}
                    dataSource={__$$eval(() => this.state.dataSource)}
                    grid={{ column: 3, gutter: 20, lg: 3, md: 3, sm: 3, xl: 3, xs: 3, xxl: 4 }}
                    gridEnable={true}
                    itemLayout="horizontal"
                    loading={__$$eval(() => this.state.loading)}
                    pagination={{
                      onChange: function () {
                        return this.paginationOnChange.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                      pageSize: 12,
                      pagination: { pageSize: 5 },
                      position: 'bottom',
                      showQuickJumper: false,
                      showSizeChanger: false,
                      showTotal: function () {
                        return this.showTotal.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                      simple: false,
                      size: 'default',
                      total: __$$eval(() => this.state.totalCount),
                    }}
                    renderItem={item =>
                      (__$$context => (
                        <List.Item>
                          <Card
                            __component_name="Card"
                            actions={[]}
                            bordered={true}
                            hoverable={true}
                            loading={false}
                            onClick={function () {
                              return this.onClickToDetail.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([
                                  {
                                    id: item?.name,
                                    type: item?.providerType,
                                  },
                                ])
                              );
                            }.bind(__$$context)}
                            size="default"
                            style={{}}
                            type="default"
                          >
                            <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" wrap={true}>
                                  <Col
                                    __component_name="Col"
                                    span={24}
                                    style={{
                                      display: 'flex',
                                      float: 'right',
                                      height: '0',
                                      justifyContent: 'flex-end',
                                      position: 'relative',
                                      right: '0px',
                                      zIndex: '1',
                                    }}
                                  >
                                    <Dropdown
                                      __component_name="Dropdown"
                                      destroyPopupOnHide={true}
                                      disabled={false}
                                      menu={{
                                        items: [
                                          {
                                            _unsafe_MixedSetter_label_select: 'VariableSetter',
                                            disabled: __$$eval(
                                              () =>
                                                item.providerType !== 'worker' ||
                                                item.status === 'OfflineInProgress' ||
                                                item.status === 'Pending'
                                            ),
                                            key: 'offline',
                                            label: __$$eval(() =>
                                              item.status === 'Offline' ? '上线' : '下线'
                                            ),
                                          },
                                          {
                                            key: 'edit',
                                            label: this.i18n('i18n-str3pnrc') /* 编辑 */,
                                          },
                                          {
                                            key: 'delete',
                                            label: this.i18n('i18n-z0idrepg') /* 删除 */,
                                          },
                                        ],
                                        onClick: function () {
                                          return this.localMenuOnClick.apply(
                                            this,
                                            Array.prototype.slice.call(arguments).concat([
                                              {
                                                ...item,
                                              },
                                            ])
                                          );
                                        }.bind(__$$context),
                                      }}
                                      placement="bottomLeft"
                                      style={{ display: 'flex' }}
                                      trigger={['hover']}
                                    >
                                      <Button
                                        __component_name="Button"
                                        block={false}
                                        danger={false}
                                        disabled={false}
                                        ghost={false}
                                        hoverColor="default"
                                        icon={
                                          <AntdIconSettingOutlined
                                            __component_name="AntdIconSettingOutlined"
                                            style={{ color: '#000' }}
                                          />
                                        }
                                        shape="default"
                                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                                        type="link"
                                      />
                                    </Dropdown>
                                  </Col>
                                </Row>
                                <Row
                                  __component_name="Row"
                                  style={{ alignItems: 'center', display: 'flex' }}
                                  wrap={false}
                                >
                                  <Col
                                    __component_name="Col"
                                    flex="40px"
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                  >
                                    <TenxIconModelIcon
                                      __component_name="TenxIconModelIcon"
                                      size={40}
                                    />
                                  </Col>
                                  <Col __component_name="Col" flex="auto">
                                    <Row
                                      __component_name="Row"
                                      gutter={[0, 0]}
                                      style={{ paddingLeft: '10px' }}
                                      wrap={true}
                                    >
                                      <Col
                                        __component_name="Col"
                                        span={22}
                                        style={{ marginBottom: '10px' }}
                                      >
                                        <Typography.Title
                                          __component_name="Typography.Title"
                                          bold={true}
                                          bordered={false}
                                          ellipsis={true}
                                          level={1}
                                        >
                                          {__$$eval(
                                            () => `${item?.displayName || '-'}（${item?.name}）`
                                          )}
                                        </Typography.Title>
                                      </Col>
                                      <Col __component_name="Col" span={24}>
                                        <Typography.Paragraph
                                          code={false}
                                          delete={false}
                                          disabled={false}
                                          editable={false}
                                          ellipsis={{ rows: 2 }}
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
                              <Col __component_name="Col" span={24}>
                                <Divider
                                  __component_name="Divider"
                                  dashed={false}
                                  defaultOpen={false}
                                  mode="line"
                                  style={{ marginLeft: '-24px', width: 'calc(100% + 48px)' }}
                                />
                              </Col>
                            </Row>
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
                                    <Row __component_name="Row" gutter={[0, 0]} wrap={false}>
                                      <Col __component_name="Col" flex="60px">
                                        <Status
                                          __component_name="Status"
                                          id={__$$eval(() => item?.status)}
                                          types={[
                                            { children: '运行中', id: 'Running', type: 'success' },
                                            {
                                              _unsafe_MixedSetter_tooltip_select: 'VariableSetter',
                                              children: '部署中',
                                              id: 'Pending',
                                              tooltip: __$$eval(() => item.message || ''),
                                              type: 'info',
                                            },
                                            {
                                              _unsafe_MixedSetter_tooltip_select: 'VariableSetter',
                                              children: '异常',
                                              id: 'Error',
                                              tooltip: __$$eval(() => item.message || ''),
                                              type: 'error',
                                            },
                                            { children: '未知', id: 'Unknown', type: 'disabled' },
                                            { children: '删除中', id: 'Deleting', type: 'warning' },
                                            { children: '已下线', id: 'Offline', type: 'warning' },
                                            { children: '正常', id: 'True', type: 'success' },
                                            {
                                              children: '下线中',
                                              id: 'OfflineInProgress',
                                              type: 'info',
                                            },
                                            {
                                              _unsafe_MixedSetter_tooltip_select: 'VariableSetter',
                                              children: '异常',
                                              id: 'False',
                                              tooltip: __$$eval(() => item.message || ''),
                                              type: 'error',
                                            },
                                          ]}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        flex="auto"
                                        style={{ display: 'flex', justifyContent: 'center' }}
                                      >
                                        <Tag
                                          __component_name="Tag"
                                          closable={false}
                                          color="processing"
                                        >
                                          {__$$eval(() =>
                                            item.providerType === 'worker' ? '本地模型' : '外部模型'
                                          )}
                                        </Tag>
                                        {__$$evalArray(() =>
                                          item.types.split(',').map(item => {
                                            if (item === 'llm') return 'LLM';
                                            if (item === 'embedding') return 'Embedding';
                                            return;
                                          })
                                        ).map((item, index) =>
                                          (__$$context => (
                                            <Tag
                                              __component_name="Tag"
                                              closable={false}
                                              color="processing"
                                            >
                                              {__$$eval(() => item)}
                                            </Tag>
                                          ))(__$$createChildContext(__$$context, { item, index }))
                                        )}
                                      </Col>
                                    </Row>
                                  ),
                                  key: 'i69qjtdvnp',
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
                                  key: 'u0ft3tcpl8a',
                                  label: '更新时间',
                                  span: 1,
                                },
                              ]}
                              labelStyle={{ width: 60 }}
                              layout="horizontal"
                              size="default"
                              title=""
                            />
                          </Card>
                        </List.Item>
                      ))(__$$createChildContext(__$$context, { item }))
                    }
                    rowKey="id"
                    size="small"
                    split={false}
                    style={{}}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
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
            return this.onDelCancel.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          onOk={function () {
            return this.onDelOk.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={__$$eval(() => this.state.delVisible)}
          style={{}}
          title="删除"
        >
          <Alert
            __component_name="Alert"
            bordered="dashed"
            message={__$$eval(
              () =>
                `确定删除${this.state.currentModel.displayName || this.state.currentModel.name}吗？`
            )}
            showIcon={true}
            type="warning"
          />
        </Modal>
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
            return this.onOfflineCancel.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.onOfflineOk.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={__$$eval(() => this.state.offlineModal)}
          style={{}}
          title={__$$eval(() =>
            this.state.currentModel.status === 'Offline' ? '上线模型服务' : '下线模型服务'
          )}
        >
          <Alert
            __component_name="Alert"
            bordered="dashed"
            message={__$$eval(
              () =>
                `确定${this.state.currentModel.status === 'Offline' ? '上线' : '下线'}${
                  this.state.currentModel.displayName || ''
                }吗？`
            )}
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
  const match = matchPath({ path: '/model-service' }, location.pathname);
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
        enabled: false,
        params: undefined,
      }}
      sdkSwrFuncs={[]}
      render={dataProps => (
        <ModelService$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
