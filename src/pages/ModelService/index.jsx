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
  Tooltip,
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
      modelTypes: '',
      page: 1,
      pageSize: 12,
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {}

  async getListWorkers() {
    try {
      const { keyword, pageSize, page, modelTypes } = this.state;
      const namespace = this.utils.getAuthData().project || 'system-tce';
      const input = {
        modelTypes,
        pageSize,
        page,
        namespace,
      };
      if (keyword) input.keyword = keyword;
      const res = await this.props.appHelper.utils.bff?.listWorkers({
        input,
      });
      this.setState({
        dataSource: res.Worker?.listWorkers?.nodes,
      });
    } catch (error) {
      this.utils.notification.warnings({
        message: '获取服务失败',
        errors: error?.response?.errors,
      });
    }
  }

  localMenuOnClick(e, item) {
    e.domEvent.stopPropagation();
    switch (e.key) {
      case 'edit':
        this.history.push(`/model-service/editModelService?name=${item.name}`);
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

  onClickCreatModel(event) {
    this.history.push('/model-service/createModelService');
  }

  onClickCreatOutsideModel(event) {
    this.history.push('/model-service/createOutsideModelService');
  }

  onClickToDetail(e, { id }) {
    this.history.push(`/model-service/detail/${id}?type=local`);
  }

  onDelCancel() {
    this.setState({
      delVisible: false,
      currentModel: {},
    });
  }

  async onDelOk() {
    try {
      const namespace = this.utils.getAuthData().project || 'system-tce';
      const input = {
        namespace,
        name: this.state.currentModel.name,
      };
      const res = await this.props.appHelper.utils.bff?.deleteWorkers({
        input,
      });
      this.utils.notification.success({
        message: '删除成功',
      });
      this.getListWorkers();
    } catch (error) {
      this.utils.notification.warnings({
        message: '删除失败',
        errors: error?.response?.errors,
      });
    }
    this.setState({
      delVisible: false,
      currentModel: {},
    });
  }

  onRefresh(event) {
    this.getListWorkers();
  }

  onSearch(value, event) {
    this.getListWorkers();
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
                        <Col __component_name="Col">
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
                    pagination={{
                      pagination: { pageSize: 5 },
                      position: 'bottom',
                      showQuickJumper: false,
                      showSizeChanger: false,
                      simple: false,
                      size: 'default',
                    }}
                    renderItem={item =>
                      (__$$context => (
                        <List.Item>
                          <Card
                            __component_name="Card"
                            actions={[]}
                            bordered={false}
                            hoverable={true}
                            loading={false}
                            onClick={function () {
                              return this.onClickToDetail.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([
                                  {
                                    id: item?.name,
                                  },
                                ])
                              );
                            }.bind(__$$context)}
                            size="default"
                            style={{ border: '1px solid #E2E2E2' }}
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
                                        span={24}
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
                                        <Tooltip
                                          __component_name="Tooltip"
                                          title={__$$eval(() =>
                                            item.status === 'Error' ? item.message : ''
                                          )}
                                        >
                                          <Status
                                            __component_name="Status"
                                            id={__$$eval(() => item.status)}
                                            types={[
                                              {
                                                children: '运行中',
                                                id: 'Running',
                                                type: 'success',
                                              },
                                              { children: '部署中', id: 'Pending', type: 'info' },
                                              { children: '异常', id: 'Error', type: 'error' },
                                              { children: '未知', id: 'Unknown', type: 'disabled' },
                                              {
                                                children: '删除中',
                                                id: 'Deleting',
                                                type: 'warning',
                                              },
                                            ]}
                                          />
                                        </Tooltip>
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        flex="auto"
                                        style={{ display: 'flex', justifyContent: 'center' }}
                                      >
                                        {__$$evalArray(() => item.modelTypes.split(',')).map(
                                          (item, index) =>
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
                              labelStyle={{ width: 100 }}
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
            message={__$$eval(() => `确定删除${this.state.currentModel.displayName || ''}吗？`)}
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
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
