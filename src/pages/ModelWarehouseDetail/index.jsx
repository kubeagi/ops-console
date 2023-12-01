// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Button,
  Spin,
  Card,
  Row,
  Col,
  Typography,
  Status,
  Tabs,
  Descriptions,
  Tag,
  Space,
  Input,
  Table,
  Pagination,
  Modal,
  FormilyForm,
  FormilyUpload,
  Container,
} from '@tenx-ui/materials';

import {
  AntdIconCodeSandboxCircleFilled,
  AntdIconPlusOutlined,
  AntdIconReloadOutlined,
  AntdIconDeleteOutlined,
} from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class ModelWarehouseDetail$$Page extends React.Component {
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

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = { data: {}, loading: false, uploadModalVisible: false };
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {
    console.log('will unmount');
  }

  getData() {
    this.setState({
      loading: true,
    });
    const project = this.utils.getAuthData()?.project;
    const name = this.match.params.name;
    const params = {
      namespace: project,
      name,
    };
    this.utils.bff
      .getModel(params)
      .then(res => {
        console.log(res);
        const { Model } = res;
        const { getModel } = Model || {};
        console.log(getModel);
        this.setState({
          loading: false,
          data: getModel,
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          data: {},
        });
      });
  }

  onClick(event) {
    // 点击按钮时的回调

    console.log('onClick', event);
  }

  handleBackFunc(event) {
    // 点击按钮时的回调
    history.back(-1);
    console.log('onClick', history);
  }

  onChangeSwitch(checked, event) {
    // 变化时回调函数
    this.state.switchState = checked;
    console.log('onChange', checked, event, this.state);
  }

  openUploadModal() {
    this.setState({
      uploadModalVisible: true,
    });
  }

  closeUploadModal() {
    this.setState({
      uploadModalVisible: false,
    });
  }

  componentDidMount() {
    this.getData();
    console.log('did mount');
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page style={{}}>
        <Button.Back
          type="ghost"
          style={{ opacity: '0' }}
          title="模型仓库详情"
          onClick={function () {
            return this.handleBackFunc.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          __component_name="Button.Back"
        />
        <Spin __component_name="Spin" spinning={__$$eval(() => this.state.loading)}>
          <Card
            size="default"
            type="default"
            style={{ marginTop: '16px' }}
            actions={[]}
            loading={false}
            bordered={false}
            hoverable={false}
            __component_name="Card"
          >
            <Row wrap={false} style={{ height: '56px' }} __component_name="Row">
              <Col
                flex="56px"
                span={1}
                style={{ width: '56px', height: '56px' }}
                __component_name="Col"
              >
                <AntdIconCodeSandboxCircleFilled
                  style={{ color: '#4a90e2', fontSize: 56, lineHeight: '0px' }}
                  __component_name="AntdIconCodeSandboxCircleFilled"
                />
              </Col>
              <Col
                flex="auto"
                span={20}
                style={{ height: '56px', display: 'flex', alignItems: 'center' }}
                __component_name="Col"
              >
                <Row
                  wrap={true}
                  style={{ paddingLeft: '20px' }}
                  gutter={['', '']}
                  __component_name="Row"
                >
                  <Col span={24} __component_name="Col">
                    <Row wrap={true} gutter={['', 0]} __component_name="Row">
                      <Col span={24} __component_name="Col">
                        <Typography.Title
                          bold={true}
                          level={1}
                          bordered={false}
                          ellipsis={true}
                          __component_name="Typography.Title"
                        >
                          {__$$eval(() => this.utils.getFullName(this.state.data))}
                        </Typography.Title>
                      </Col>
                      <Col span={24} __component_name="Col">
                        <Status
                          id={__$$eval(() => this.state.data.status)}
                          types={[
                            { id: 'False', type: 'error', children: '失败' },
                            { id: 'True', type: 'disabled', children: '成功' },
                          ]}
                          __component_name="Status"
                        />
                        <Typography.Text
                          style={{ fontSize: '', paddingLeft: '12px' }}
                          strong={false}
                          disabled={false}
                          ellipsis={true}
                          __component_name="Typography.Text"
                        >
                          更新时间：
                        </Typography.Text>
                        <Typography.Time
                          time={__$$eval(() => this.state.data?.updateTimestamp)}
                          format="YYYY-MM-DD HH:mm:ss"
                          relativeTime={false}
                          __component_name="Typography.Time"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Spin>
        <Card
          size="default"
          type="default"
          style={{ marginTop: '16px' }}
          actions={[]}
          loading={false}
          bordered={false}
          hoverable={false}
          __component_name="Card"
        >
          <Tabs
            size="large"
            type="line"
            items={[
              {
                key: 'tab-item-1',
                label: '详细信息',
                children: (
                  <Descriptions
                    id=""
                    size="default"
                    colon={false}
                    items={[
                      {
                        key: 'xhiw4rl3fr8',
                        span: 1,
                        label: 'ID',
                        children: (
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            {__$$eval(() => this.state.data?.id)}
                          </Typography.Text>
                        ),
                      },
                      {
                        key: 'hdx1if55is',
                        span: 1,
                        label: '模型类型',
                        children: __$$evalArray(() => this.state.data?.modeltypes?.split(',')).map(
                          (item, index) =>
                            (__$$context => (
                              <Tag color="success" closable={false} __component_name="Tag">
                                {__$$eval(() =>
                                  item === 'llm' ? 'LLM' : item === 'embedding' ? 'Embedding' : item
                                )}
                              </Tag>
                            ))(__$$createChildContext(__$$context, { item, index }))
                        ),
                      },
                      {
                        key: 'ik4agaf7r1d',
                        span: 1,
                        label: '创建时间',
                        children: (
                          <Typography.Time
                            __component_name="Typography.Time"
                            time={__$$eval(() => this.state.data?.creationTimestamp)}
                            format=""
                            relativeTime={false}
                          />
                        ),
                      },
                      {
                        key: '5c0mxhs31zb',
                        span: 1,
                        label: '创建者',
                        children: (
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            {__$$eval(() => this.state.data?.creator || '-')}
                          </Typography.Text>
                        ),
                      },
                      {
                        key: 'ys4jchfegg',
                        span: 1,
                        label: '描述',
                        children: (
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            {__$$eval(() => this.state.data?.description)}
                          </Typography.Text>
                        ),
                      },
                    ]}
                    title=""
                    column={1}
                    layout="horizontal"
                    bordered={false}
                    labelStyle={{ width: 100 }}
                    borderedBottom={false}
                    __component_name="Descriptions"
                    borderedBottomDashed={false}
                  >
                    <Descriptions.Item key="xhiw4rl3fr8" span={1} label="ID">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="hdx1if55is" span={1} label="任务类型">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="7vo7r2wbqev" span={1} label="处理前数据集">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="ik4agaf7r1d" span={1} label="处理后数据集">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="5c0mxhs31zb" span={1} label="创建时间">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="ys4jchfegg" span={1} label="创建者">
                      {null}
                    </Descriptions.Item>
                  </Descriptions>
                ),
              },
              {
                key: 'tab-item-2',
                label: '模型文件',
                children: (
                  <Row wrap={true} gutter={['', 12]} __component_name="Row">
                    <Col span={24} __component_name="Col">
                      <Row wrap={false} justify="space-between" __component_name="Row">
                        <Col __component_name="Col">
                          <Space size={12} align="center" direction="horizontal">
                            <Button
                              href=""
                              icon={
                                <AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />
                              }
                              type="primary"
                              block={false}
                              ghost={false}
                              shape="default"
                              danger={false}
                              target="_self"
                              onClick={function () {
                                return this.openUploadModal.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              disabled={false}
                              __component_name="Button"
                            >
                              上传模型文件
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
                            <Button
                              icon={
                                <AntdIconDeleteOutlined __component_name="AntdIconDeleteOutlined" />
                              }
                              block={false}
                              ghost={false}
                              shape="default"
                              danger={false}
                              disabled={false}
                              __component_name="Button"
                            >
                              删除
                            </Button>
                            <Input.Search
                              style={{ width: '240px' }}
                              onSearch={function () {
                                return this.handleSearchValueChange.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              placeholder="请输入文件名称搜索"
                              __component_name="Input.Search"
                            />
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24} __component_name="Col">
                      <Table
                        __component_name="Table"
                        rowKey="id"
                        dataSource={[
                          { id: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号' },
                          { id: '2', name: '王一博', age: 28, address: '滨江区网商路699号' },
                        ]}
                        columns={[
                          { title: '姓名', dataIndex: 'name', key: 'name' },
                          { title: '状态', dataIndex: 'status', key: 'status' },
                          { title: '文件大小', dataIndex: 'size', key: 'size' },
                          {
                            title: '操作',
                            dataIndex: 'op',
                            key: 'op',
                            render: (text, record, index) =>
                              (__$$context => (
                                <Space
                                  __component_name="Space"
                                  direction="horizontal"
                                  align="center"
                                >
                                  <Button
                                    __component_name="Button"
                                    danger={false}
                                    ghost={false}
                                    shape="default"
                                    block={false}
                                    disabled={false}
                                    size="small"
                                  >
                                    下载
                                  </Button>
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
                            width: 160,
                          },
                        ]}
                        pagination={false}
                        showHeader={true}
                        size="middle"
                        scroll={{ scrollToFirstRowOnChange: true }}
                      />
                      <Row __component_name="Row" wrap={true} gutter={['', '']}>
                        <Col __component_name="Col" span={24}>
                          <Pagination
                            total={50}
                            simple={false}
                            current={1}
                            pageSize={10}
                            __component_name="Pagination"
                            style={{ textAlign: 'right', marginTop: '16px', marginBottom: '24px' }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ),
              },
            ]}
            style={{ marginTop: '-24px' }}
            activeKey=""
            tabPosition="top"
            tabBarGutter={24}
            __component_name="Tabs"
            destroyInactiveTabPane="true"
          />
        </Card>
        <Modal
          mask={true}
          onOk={function () {
            return this.closeUploadModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.uploadModalVisible)}
          title="文件上传"
          centered={false}
          keyboard={true}
          onCancel={function () {
            return this.closeUploadModal.apply(
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
          <FormilyForm
            ref={this._refsManager.linkRef('formily_p9nf61733c')}
            formHelper={{ autoFocus: true }}
            componentProps={{
              colon: false,
              layout: 'horizontal',
              labelCol: 4,
              labelAlign: 'left',
              wrapperCol: 20,
            }}
            __component_name="FormilyForm"
          >
            <FormilyUpload
              fieldProps={{
                name: 'Upload',
                title: '',
                'x-component': 'FormilyUpload',
                'x-validator': [],
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyUpload"
            >
              <Container
                defaultStyle={{
                  paddingTop: '16px',
                  borderColor: '#9b9b9b',
                  borderStyle: 'dashed',
                  borderWidth: '1px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingBottom: '16px',
                }}
                __component_name="Container"
              >
                <Row
                  wrap={true}
                  style={{
                    textAlign: 'center',
                    paddingTop: '16px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingBottom: '24px',
                  }}
                  gutter={['', 0]}
                  __component_name="Row"
                >
                  <Col span={24} __component_name="Col">
                    <AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />
                  </Col>
                  <Col span={24} __component_name="Col">
                    <Typography.Text
                      style={{ fontSize: '14px' }}
                      strong={false}
                      disabled={false}
                      ellipsis={true}
                      __component_name="Typography.Text"
                    >
                      点击上传 / 拖拽文件到此区域
                    </Typography.Text>
                  </Col>
                  <Col span={23} style={{ textAlign: 'left' }} __component_name="Col">
                    <Typography.Text
                      style={{ color: '#9b9b9b', fontSize: '' }}
                      strong={false}
                      disabled={false}
                      ellipsis={true}
                      __component_name="Typography.Text"
                    >
                      文件限制：仅支持 .txt,.doc,.docx,.pdf,.md 文件、单文件大小
                    </Typography.Text>
                    <Typography.Text
                      style={{ color: '#f5a623', fontSize: '' }}
                      strong={false}
                      disabled={false}
                      ellipsis={true}
                      __component_name="Typography.Text"
                    >
                      {' '}
                      不超过 2G
                    </Typography.Text>
                    <Typography.Text
                      style={{ color: '#9b9b9b', fontSize: '' }}
                      strong={false}
                      disabled={false}
                      ellipsis={true}
                      __component_name="Typography.Text"
                    >
                      、单次上传文件数量
                    </Typography.Text>
                    <Typography.Text
                      style={{ color: '#f5a623', fontSize: '' }}
                      strong={false}
                      disabled={false}
                      ellipsis={true}
                      __component_name="Typography.Text"
                    >
                      不超过 20个
                    </Typography.Text>
                  </Col>
                </Row>
              </Container>
            </FormilyUpload>
          </FormilyForm>
        </Modal>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/model-warehouse/detail/:name' }, location.pathname);
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
        <ModelWarehouseDetail$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
