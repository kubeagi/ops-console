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
  Select,
  List,
  Dropdown,
  Divider,
  Descriptions,
  Status,
  Tag,
  Modal,
  Alert,
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
      dataSource: [],
      delVisible: false,
      currentModel: {},
      modelTypes: '',
      keyword: '',
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
      console.log(error, '===> err');
      this.utils.notification.warnings({
        message: '获取服务失败',
        errors: error?.response?.errors,
      });
    }
  }

  onClickCreatModel(event) {
    this.history.push('/model-service/createModelService');
  }

  localMenuOnClick(e, item) {
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

  onChangeKeyword(event) {
    this.setState({
      keyword: event.target.value,
    });
  }

  onSearch(value, event) {
    this.getListWorkers();
  }

  onChangeModelTypes(e) {
    this.setState(
      {
        modelTypes: e,
      },
      this.getListWorkers
    );
  }

  onRefresh(event) {
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
        <Row wrap={true} __component_name="Row">
          <Col span={24} __component_name="Col">
            <Typography.Title
              bold={true}
              level={1}
              bordered={false}
              ellipsis={true}
              __component_name="Typography.Title"
            >
              {this.i18n('i18n-t06rg1nj') /* 模型服务 */}
            </Typography.Title>
          </Col>
          <Col span={24} __component_name="Col">
            <Card
              size="default"
              type="default"
              actions={[]}
              loading={false}
              bordered={false}
              hoverable={false}
              __component_name="Card"
            >
              <Row wrap={true} __component_name="Row">
                <Col span={24} __component_name="Col">
                  <Row wrap={false} justify="space-between" __component_name="Row">
                    <Col span={8} __component_name="Col">
                      <Space align="center" direction="horizontal" __component_name="Space">
                        <Button
                          icon={<AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />}
                          type="primary"
                          block={false}
                          ghost={false}
                          shape="default"
                          danger={false}
                          onClick={function () {
                            return this.onClickCreatModel.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          disabled={false}
                          __component_name="Button"
                        >
                          {this.i18n('i18n-d43b7hfv') /* 新增模型服务 */}
                        </Button>
                        <Button
                          icon={<TenxIconRefresh __component_name="TenxIconRefresh" />}
                          block={false}
                          ghost={false}
                          shape="default"
                          danger={false}
                          onClick={function () {
                            return this.onRefresh.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          disabled={false}
                          __component_name="Button"
                        >
                          {this.i18n('i18n-jch93moe') /* 刷新 */}
                        </Button>
                        <Input.Search
                          value={__$$eval(() => this.state.keyword)}
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
                          __component_name="Input.Search"
                        />
                      </Space>
                    </Col>
                    <Col __component_name="Col">
                      <Row wrap={false} justify="space-between" __component_name="Row">
                        <Col __component_name="Col">
                          <Select
                            style={{ width: 200 }}
                            value={__$$eval(() => this.state.modelTypes)}
                            options={[
                              { label: '全部类型', value: '' },
                              { label: 'LLM', value: 'llm' },
                              { label: 'Embedding', value: 'embedding' },
                            ]}
                            disabled={false}
                            onChange={function () {
                              return this.onChangeModelTypes.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this)}
                            allowClear={true}
                            showSearch={true}
                            placeholder="请选择"
                            _sdkSwrGetFunc={{ func: __$$eval(() => this.state.modelTypes) }}
                            __component_name="Select"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} __component_name="Col">
                  <List
                    grid={{ lg: 4, md: 4, sm: 4, xl: 4, xs: 4, xxl: 4, column: 4, gutter: 20 }}
                    size="small"
                    split={false}
                    rowKey="id"
                    bordered={false}
                    dataSource={__$$eval(() => this.state.dataSource)}
                    gridEnable={true}
                    itemLayout="horizontal"
                    pagination={{
                      size: 'default',
                      simple: false,
                      position: 'bottom',
                      pagination: { pageSize: 5 },
                      showQuickJumper: false,
                      showSizeChanger: false,
                    }}
                    renderItem={item =>
                      (__$$context => (
                        <List.Item>
                          <Card
                            size="default"
                            type="default"
                            style={{ border: '1px solid #E2E2E2' }}
                            actions={[]}
                            loading={false}
                            bordered={false}
                            hoverable={false}
                            __component_name="Card"
                          >
                            <Row wrap={true} gutter={[0, 0]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={true} __component_name="Row">
                                  <Col
                                    span={24}
                                    style={{
                                      float: 'right',
                                      right: '0px',
                                      height: '0',
                                      zIndex: '1',
                                      display: 'flex',
                                      position: 'relative',
                                      justifyContent: 'flex-end',
                                    }}
                                    __component_name="Col"
                                  >
                                    <Dropdown
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
                                      style={{ display: 'flex' }}
                                      trigger={['hover']}
                                      disabled={false}
                                      placement="bottomLeft"
                                      __component_name="Dropdown"
                                      destroyPopupOnHide={true}
                                    >
                                      <Button
                                        icon={
                                          <AntdIconSettingOutlined __component_name="AntdIconSettingOutlined" />
                                        }
                                        type="link"
                                        block={false}
                                        ghost={false}
                                        shape="default"
                                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                                        danger={false}
                                        disabled={false}
                                        __component_name="Button"
                                      />
                                    </Dropdown>
                                  </Col>
                                </Row>
                                <Row
                                  wrap={false}
                                  style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
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
                                  __component_name="Row"
                                >
                                  <Col
                                    flex="40px"
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                    __component_name="Col"
                                  >
                                    <TenxIconModelIcon
                                      size={40}
                                      __component_name="TenxIconModelIcon"
                                    />
                                  </Col>
                                  <Col flex="auto" __component_name="Col">
                                    <Row
                                      wrap={true}
                                      style={{ paddingLeft: '10px' }}
                                      gutter={[0, 0]}
                                      __component_name="Row"
                                    >
                                      <Col
                                        span={24}
                                        style={{ marginBottom: '10px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Title
                                          bold={true}
                                          level={1}
                                          bordered={false}
                                          ellipsis={true}
                                          __component_name="Typography.Title"
                                        >
                                          {__$$eval(() => item?.displayName || '-')}
                                        </Typography.Title>
                                      </Col>
                                      <Col span={24} __component_name="Col">
                                        <Typography.Paragraph
                                          code={false}
                                          mark={false}
                                          style={{ fontSize: '' }}
                                          delete={false}
                                          strong={false}
                                          disabled={false}
                                          editable={false}
                                          ellipsis={{ rows: 2 }}
                                          underline={false}
                                        >
                                          {__$$eval(() => item.description || '-')}
                                        </Typography.Paragraph>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Divider
                                  mode="line"
                                  style={{ width: 'calc(100% + 48px)', marginLeft: '-24px' }}
                                  dashed={false}
                                  defaultOpen={false}
                                  __component_name="Divider"
                                />
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col flex="3" __component_name="Col">
                                    <Descriptions
                                      id=""
                                      size="default"
                                      colon={false}
                                      items={[
                                        {
                                          key: 'rtilj4ro9ua',
                                          span: 1,
                                          label: this.i18n('i18n-p7mextst') /* 状态 */,
                                          children: (
                                            <Status
                                              id={__$$eval(() => item.status)}
                                              types={[
                                                {
                                                  id: 'Running',
                                                  type: 'success',
                                                  children: '已发布',
                                                },
                                                { id: 'Pending', type: 'info', children: '发布中' },
                                                { id: 'Error', type: 'error', children: '异常' },
                                                {
                                                  id: 'Unknown',
                                                  type: 'disabled',
                                                  children: '未知',
                                                },
                                              ]}
                                              __component_name="Status"
                                            />
                                          ),
                                        },
                                        {
                                          key: '2yzo8dyskna',
                                          span: 1,
                                          label: this.i18n('i18n-uag94ndq') /* 更新时间 */,
                                          children: (
                                            <Typography.Time
                                              time={__$$eval(() => item.updateTimestamp)}
                                              format=""
                                              relativeTime={false}
                                              __component_name="Typography.Time"
                                            />
                                          ),
                                        },
                                      ]}
                                      title=""
                                      column={1}
                                      layout="horizontal"
                                      bordered={false}
                                      labelStyle={{ width: '90px' }}
                                      contentStyle={{}}
                                      borderedBottom={false}
                                      __component_name="Descriptions"
                                      borderedBottomDashed={false}
                                    />
                                  </Col>
                                  <Col __component_name="Col">
                                    {__$$evalArray(() => item.modelTypes.split(',')).map(
                                      (item, index) =>
                                        (__$$context => (
                                          <Tag
                                            color="processing"
                                            closable={false}
                                            __component_name="Tag"
                                          >
                                            {__$$eval(() => item)}
                                          </Tag>
                                        ))(__$$createChildContext(__$$context, { item, index }))
                                    )}
                                  </Col>
                                </Row>
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
            </Card>
          </Col>
        </Row>
        <Modal
          mask={true}
          onOk={function () {
            return this.onDelOk.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={__$$eval(() => this.state.delVisible)}
          style={{}}
          title="删除"
          centered={false}
          keyboard={true}
          onCancel={function () {
            return this.onDelCancel.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          forceRender={false}
          maskClosable={false}
          confirmLoading={false}
          destroyOnClose={true}
          __component_name="Modal"
        >
          <Alert
            type="warning"
            message={__$$eval(() => `确定删除${this.state.currentModel.displayName || ''}吗？`)}
            bordered="dashed"
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
