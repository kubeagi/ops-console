// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Image,
  Input,
  List,
  Modal,
  Page,
  Pagination,
  Row,
  Space,
  Status,
  Tag,
  Typography,
} from '@tenx-ui/materials';

import LccComponentRu83f from 'CreateDataSource';

import {
  AntdIconPlusOutlined,
  AntdIconSettingOutlined,
  TenxIconRefresh,
} from '@tenx-ui/icon-materials';

import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import { matchPath, useLocation } from '@umijs/max';
import qs from 'query-string';
import { DataProvider } from 'shared-components';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class DataSource$$Page extends React.Component {
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
      size: 10,
      timer: undefined,
      record: {},
      sorter: undefined,
      current: 1,
      filters: undefined,
      modalType: 'add',
      searchKey: 'name',
      pagination: undefined,
      isOpenModal: false,
      searchValue: undefined,
      modalLoading: false,
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {}

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  goDetail(e, { record }) {
    this.history?.push(`/data-source/detail/${this.record?.id || 'test'}`);
  }

  onSubmit(event) {
    // const { name, modalType } = this.state
    // const isCreate = modalType === 'add'
    // const form = this.form()
    // form.submit(async v => {
    //   this.setState({
    //     modalLoading: true
    //   })
    //   const params = {
    //   }
    //   const api = {
    //     create: {
    //       name: 'createDatasource',
    //       params: {
    //       },
    //       successMessage: 'i18n-zoji4fmj',
    //       faildMessage: 'i18n-se3su28h',
    //     },
    //     update: {
    //       name: 'updateDatasource',
    //       params: {
    //       },
    //       successMessage: 'i18n-w3z0nief',
    //       faildMessage: 'i18n-e3qm9bbw',
    //     }
    //   }[isCreate ? 'create' : 'update']
    //   try {
    //     const res = await this.props.appHelper.utils.bff[api.name](api.params)
    //     this.utils.notification.success({
    //       message: this.i18n(api.successMessage),
    //     })
    //     this.handleRefresh()
    //     this.setState({
    //       modalLoading: false
    //     })
    //   } catch (error) {
    //     this.utils.notification.warnings({
    //       message: this.i18n(api.faildMessage),
    //       errors: error?.response?.errors
    //     })
    //     this.setState({
    //       modalLoading: false
    //     })
    //   }
    // })
  }

  openModal(e, { record = {}, modalType = 'add' }) {
    this.setState({
      isOpenModal: true,
      modalType,
      record,
    });
    if (modalType === 'edit') {
      this.initEditForm(record);
    }
  }

  closeModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  setEditThis(editThis) {
    this.setState({
      editThis,
    });
  }

  handleSearch(v) {
    this.setState(
      {
        current: 1,
      },
      this.handleQueryChange
    );
  }

  initEditForm(record) {
    if (!this.state?.editThis?.initEditForm) {
      this.state.timer && clearTimeout(this.state.timer);
      this.setState({
        timer: setTimeout(() => {
          this.initEditForm(record);
        }, 200),
      });
      return;
    }
    this.state?.editThis?.initEditForm(record);
  }

  handleRefresh(event) {
    this.props.useGetDatasourcesPaged?.mutate();
  }

  handleQueryChange() {
    // const { repositoryType, status } = this.state.filters || {}
    // const params = {
    //   "page": this.state?.current || 1,
    //   "pageSize": this.state?.pageSize || 10,
    //   "name": this.state?.searchValue,
    // }
    // if (this.state.sorter?.order) {
    //   params.sortField = this.state.sorter?.field
    //   params.sortDirection = this.state.sorter?.order
    // }
    // if (status?.length > 0) {
    //   params.statuses = status
    // } else {
    //   params.statuses = undefined
    // }
    // this.utils?.changeLocationQuery(
    //   this,
    //   'useGetDatasourcesPaged',
    //   params
    // )
  }

  handleTableChange(pagination, filters, sorter, extra) {
    this.setState(
      {
        pagination,
        filters,
        sorter,
      },
      this.handleQueryChange
    );
  }

  async confirmDeleteModal(e, payload) {
    // this.setState({
    //   modalLoading: true
    // })
    // try {
    //   await this.utils.bff.deleteDatasource({
    //     name: this.state.record?.name,
    //   })
    //   this.closeModal()
    //   this.utils.notification.success({
    //     message: this.i18n('i18n-z0rln00w'),
    //   })
    //   setTimeout(() => {
    //     this.handleRefresh()
    //     this.setState({
    //       modalLoading: false
    //     })
    //   }, 200)
    // } catch (error) {
    //   this.setState({
    //     modalLoading: false
    //   })
    //   this.utils.notification.warnings({
    //     message: this.i18n('i18n-axvyllo6'),
    //     errors: error?.response?.errors
    //   })
    // }
  }

  async validatorNamespace(value, ...payload) {
    const values = this.form()?.values;
    const curIndex = payload?.[1]?.field?.index;
    const currItem = values?.namespaces?.value?.[curIndex];
    try {
      if (
        value &&
        values?.namespaces?.value?.some(
          (item, index) => item.namespace === currItem?.namespace && curIndex !== index
        )
      ) {
        return this.i18n('i18n-q8a45i4l');
      }
    } catch (e) {}
  }

  paginationShowTotal(total, range) {
    return `${this.i18n('i18n-k0zli54g')} ${total} ${this.i18n('i18n-9ruso5ml')}`;
  }

  handleOperationClick(e, { record }) {
    e?.domEvent?.stopPropagation();
    this.openModal(undefined, {
      record,
      modalType: e.key,
    });
  }

  handlePaginationChange(c, s) {
    this.setState(
      {
        size: s,
        current: c,
      },
      this.handleQueryChange
    );
  }

  handleSearchValueChange(e) {
    this.setState({
      searchValue: e.target.value,
      // current: 1,
    });
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Modal
          mask={true}
          onOk={function () {
            return this.confirmDeleteModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.isOpenModal && this.state.modalType === 'delete')}
          title={this.i18n('i18n-1i46nz7w') /* 删除数据源 */}
          centered={false}
          keyboard={true}
          onCancel={function () {
            return this.closeModal.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          forceRender={false}
          maskClosable={false}
          confirmLoading={__$$eval(() => this.state.modalLoading)}
          destroyOnClose={true}
          __component_name="Modal"
        >
          <Alert
            type="warning"
            message={
              <Space align="center" direction="horizontal" __component_name="Space">
                <Typography.Text
                  style={{ fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-5h6srqet') /* 确定删除数据源 */}
                </Typography.Text>
                <Typography.Text
                  style={{ fontSize: '' }}
                  strong={true}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  xxxxxxxxxxxxxxxx
                </Typography.Text>
                <Typography.Text
                  style={{ fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  ？
                </Typography.Text>
              </Space>
            }
            showIcon={true}
            __component_name="Alert"
          />
        </Modal>
        <Drawer
          mask={true}
          open={__$$eval(() => this.state.isOpenModal && this.state.modalType === 'edit')}
          extra=""
          title={this.i18n('i18n-8vmpttzl') /* 编辑数据源 */}
          width="600"
          footer={
            <Space
              align="center"
              style={{ height: '32px' }}
              direction="horizontal"
              __component_name="Space"
            >
              <Button
                block={false}
                ghost={false}
                shape="default"
                style={{ display: 'none' }}
                danger={false}
                disabled={false}
                __component_name="Button"
              >
                Button-2
              </Button>
            </Space>
          }
          onClose={function () {
            return this.closeModal.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          className="edit-data-source-drawer"
          placement="right"
          maskClosable={false}
          destroyOnClose={true}
          __component_name="Drawer"
        >
          <LccComponentRu83f
            data={__$$eval(() => this.state?.record || {})}
            setThis={function () {
              return this.setEditThis.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            handelCancel={function () {
              return this.closeModal.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            handleCancel={function () {
              return this.closeModal.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            __component_name="LccComponentRu83f"
          />
        </Drawer>
        <Row wrap={true} __component_name="Row">
          <Col span={24} __component_name="Col">
            <Typography.Title
              bold={true}
              level={1}
              bordered={false}
              ellipsis={true}
              __component_name="Typography.Title"
            >
              {this.i18n('i18n-38tkeb1r') /* 数据源管理 */}
            </Typography.Title>
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
              <Row wrap={true} __component_name="Row">
                <Col span={24} __component_name="Col">
                  <Space align="center" direction="horizontal" __component_name="Space">
                    <Button
                      href="/data-source/create"
                      icon={<AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />}
                      type="primary"
                      block={false}
                      ghost={false}
                      shape="default"
                      danger={false}
                      disabled={false}
                      __component_name="Button"
                    >
                      {this.i18n('i18n-ueslu0a9') /* 新增数据源 */}
                    </Button>
                    <Button
                      icon={<TenxIconRefresh __component_name="TenxIconRefresh" />}
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
                      {this.i18n('i18n-jskgqh8o') /* 刷新 */}
                    </Button>
                    <Input.Search
                      onChange={function () {
                        return this.handleSearchValueChange.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      onSearch={function () {
                        return this.handleSearch.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      placeholder={this.i18n('i18n-hp37vpeo') /* 请输入数据源名称搜索 */}
                      __component_name="Input.Search"
                    />
                  </Space>
                </Col>
                <Col span={24} __component_name="Col">
                  <List
                    grid={{ lg: 3, md: 3, sm: 3, xl: 4, xs: 3, xxl: 4, column: 3, gutter: 16 }}
                    size="small"
                    split={false}
                    footer=""
                    header=""
                    rowKey="id"
                    bordered={false}
                    dataSource={[
                      {
                        id: 1,
                        name: 'aaaaaaa',
                        text: 'Racing car sprays burning fuel into crowd.',
                        type: 'localUpload',
                      },
                      { id: 2, text: 'Japanese princess to wed commoner.', type: 'fileStorage' },
                      {
                        id: 3,
                        text: 'Australian walks 100km after outback crash.',
                        type: 'fileStorage',
                      },
                      { id: 4, text: 'Man charged over missing wedding girl.', type: 'mysql' },
                      { id: 5, text: 'Los Angeles battles huge wildfires.', type: 'mongodb' },
                      { id: 6, text: 'Los Angeles battles huge wildfires.', type: 'api' },
                    ]}
                    gridEnable={true}
                    itemLayout="horizontal"
                    pagination={false}
                    renderItem={item =>
                      (__$$context => (
                        <List.Item>
                          <Card
                            size="default"
                            type="default"
                            style={{ border: '1px solid #E2E2E2' }}
                            actions={[]}
                            loading={false}
                            onClick={function () {
                              return this.goDetail.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([
                                  {
                                    record: this.record,
                                  },
                                ])
                              );
                            }.bind(__$$context)}
                            bordered={false}
                            bodyStyle={{ position: 'relative' }}
                            hoverable={false}
                          >
                            <Row wrap={true} gutter={[0, 0]} __component_name="Row">
                              <Col
                                span={24}
                                style={{
                                  float: 'right',
                                  right: '0px',
                                  height: '0',
                                  zIndex: '1',
                                  position: 'relative',
                                }}
                                __component_name="Col"
                              >
                                <Dropdown
                                  menu={{
                                    items: [
                                      { key: 'edit', label: this.i18n('i18n-str3pnrc') /* 编辑 */ },
                                      {
                                        key: 'delete',
                                        label: this.i18n('i18n-z0idrepg') /* 删除 */,
                                      },
                                    ],
                                    onClick: function () {
                                      return this.handleOperationClick.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([
                                          {
                                            record: item,
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
                                  <Button
                                    type="default"
                                    block={false}
                                    ghost={false}
                                    shape="default"
                                    style={{
                                      top: '-10px',
                                      float: 'right',
                                      border: 'none',
                                      padding: '0',
                                    }}
                                    danger={false}
                                    disabled={false}
                                    __component_name="Button"
                                  >
                                    {
                                      <AntdIconSettingOutlined __component_name="AntdIconSettingOutlined" />
                                    }
                                  </Button>
                                </Dropdown>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Row
                                  wrap={false}
                                  style={{ display: 'flex', alignItems: 'center' }}
                                  gutter={[0, 0]}
                                  __component_name="Row"
                                >
                                  <Col flex="56px" __component_name="Col">
                                    <Image
                                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                      style={{}}
                                      width={56}
                                      height={56}
                                      preview={false}
                                      fallback=""
                                      __component_name="Image"
                                    />
                                  </Col>
                                  <Col flex="auto" __component_name="Col">
                                    <Row
                                      wrap={true}
                                      style={{ paddingLeft: '20px' }}
                                      gutter={[0, 0]}
                                      __component_name="Row"
                                    >
                                      <Col __component_name="Col">
                                        <Typography.Title
                                          bold={true}
                                          level={1}
                                          bordered={false}
                                          ellipsis={true}
                                          __component_name="Typography.Title"
                                        >
                                          标题
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
                                          ellipsis={{
                                            rows: 2,
                                            tooltip: { title: '' },
                                            expandable: false,
                                          }}
                                          underline={false}
                                        >
                                          蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。
                                        </Typography.Paragraph>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                              <Col
                                span={24}
                                style={{ marginBottom: '-15px' }}
                                __component_name="Col"
                              >
                                <Divider
                                  mode="line"
                                  style={{ width: 'calc(100% + 48px)', marginLeft: '-24px' }}
                                  dashed={false}
                                  defaultOpen={false}
                                  __component_name="Divider"
                                />
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Descriptions
                                  id=""
                                  size="default"
                                  colon={false}
                                  items={[
                                    {
                                      key: 'yuqlalgvmn',
                                      span: 1,
                                      label: this.i18n('i18n-p7mextst') /* 状态 */,
                                      children: (
                                        <Row
                                          wrap={true}
                                          style={{ width: '100%' }}
                                          __component_name="Row"
                                        >
                                          <Col span={24} __component_name="Col">
                                            <Row
                                              wrap={false}
                                              style={{ display: 'flex' }}
                                              justify="space-between"
                                              __component_name="Row"
                                            >
                                              <Col __component_name="Col">
                                                <Space
                                                  align="center"
                                                  style={{}}
                                                  direction="horizontal"
                                                  __component_name="Space"
                                                >
                                                  <Status
                                                    id="error"
                                                    types={__$$eval(() =>
                                                      __$$context.utils.getDataSourceStatus(
                                                        __$$context,
                                                        true
                                                      )
                                                    )}
                                                    __component_name="Status"
                                                  />
                                                  <Typography.Text
                                                    type="colorPrimary"
                                                    style={{ top: '-2px', position: 'relative' }}
                                                    strong={false}
                                                    disabled={false}
                                                    ellipsis={true}
                                                    __component_name="Typography.Text"
                                                  >
                                                    (30%)
                                                  </Typography.Text>
                                                </Space>
                                              </Col>
                                              <Col __component_name="Col">
                                                <Tag
                                                  color="processing"
                                                  bordered={false}
                                                  closable={false}
                                                  __component_name="Tag"
                                                >
                                                  tag
                                                </Tag>
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>
                                      ),
                                    },
                                    {
                                      key: 'bdtsm8b0pth',
                                      span: 1,
                                      label: this.i18n('i18n-uag94ndq') /* 更新时间 */,
                                      children: (
                                        <Typography.Time
                                          time=""
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
                                  labelStyle={{ width: '60px', padding: '0', marginTop: '8px' }}
                                  contentStyle={{ padding: '0', marginTop: '8px' }}
                                  borderedBottom={true}
                                  __component_name="Descriptions"
                                  borderedBottomDashed={true}
                                >
                                  <Descriptions.Item
                                    key="yuqlalgvmn"
                                    span={1}
                                    label={this.i18n('i18n-p7mextst') /* 状态 */}
                                  >
                                    {null}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    key="bdtsm8b0pth"
                                    span={1}
                                    label={this.i18n('i18n-uag94ndq') /* 更新时间 */}
                                  >
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
                <Col
                  span={24}
                  style={{ display: 'flex', justifyContent: 'center' }}
                  __component_name="Col"
                >
                  <Pagination
                    style={{ display: 'flex', marginTop: '8px' }}
                    total={50}
                    simple={false}
                    current={1}
                    pageSize={10}
                    __component_name="Pagination"
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

const PageWrapper = () => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/data-source' }, location.pathname);
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
          func: 'useGetDatasourcesPaged',
          params: function applyThis() {
            return {
              input: {
                namespace: this.utils.getAuthData()?.project,
              },
            };
          }.apply(self),
          enableLocationSearch: function applyThis() {
            return true;
          }.apply(self),
        },
      ]}
      render={dataProps => <DataSource$$Page {...dataProps} self={self} appHelper={appHelper} />}
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
