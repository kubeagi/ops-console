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

import utils, { RefsManager } from '../../utils/__utils';

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

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = {
      current: 1,
      filters: undefined,
      isOpenModal: false,
      modalLoading: false,
      modalType: 'add',
      pagination: undefined,
      record: {},
      searchKey: 'name',
      searchValue: undefined,
      size: 12,
      sorter: undefined,
      timer: undefined,
    };
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {}

  closeModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  async confirmDeleteModal(e, payload) {
    this.setState({
      modalLoading: true,
    });
    try {
      await this.utils.bff.deleteDatasources({
        input: {
          name: this.state.record?.name,
          namespace: this.utils.getAuthData()?.project,
        },
      });
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n('i18n-vf1xe64m'),
      });
      setTimeout(() => {
        this.handleRefresh();
        this.setState({
          modalLoading: false,
        });
      }, 200);
    } catch (error) {
      this.setState({
        modalLoading: false,
      });
      this.utils.notification.warnings({
        message: this.i18n('i18n-yc0jhxgr'),
        errors: error?.response?.errors,
      });
    }
  }

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  goDetail(e, { record }) {
    this.history?.push(`/data-source/detail/${record?.name}`);
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

  handleQueryChange() {
    const { repositoryType, status } = this.state.filters || {};
    const params = {
      input: {
        page: this.state?.current || 1,
        pageSize: this.state?.size || 12,
        keyword: this.state?.searchValue,
        namespace: this.utils.getAuthData()?.project,
      },
    };
    this.utils?.changeLocationQuery(this, 'useListDatasources', params);
  }

  handleRefresh(event) {
    this.props.useListDatasources?.mutate();
  }

  handleSearch(v) {
    this.setState(
      {
        current: 1,
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

  initEditForm(record) {
    if (!this?.editThis?.initEditForm) {
      this.state.timer && clearTimeout(this.state.timer);
      this.setState({
        timer: setTimeout(() => {
          this.initEditForm({
            ...(record || {}),
            bucket: record?.oss?.bucket,
            object: record?.oss?.object,
            serverAddress: record?.endpoint?.url,
            password: record?.endpoint?.auth?.password,
            username: record?.endpoint?.auth?.username,
            insecure: record?.endpoint?.insecure ? 'http' : 'https',
          });
        }, 200),
      });
      return;
    }
    this?.editThis?.initEditForm(record);
  }

  onSubmit(event) {
    const { modalType } = this.state;
    const isCreate = modalType === 'add';
    const form = this?.editThis?.form();
    form.submit(async v => {
      this.setState({
        modalLoading: true,
      });
      const params = {
        input: {
          name: v?.name,
          displayName: v?.displayName,
          namespace: this.utils.getAuthData()?.project,
          description: v?.description,
          ossinput: {
            bucket: v?.bucket,
            object: v?.object,
          },
          endpointinput: {
            url: v?.serverAddress,
            insecure: v?.insecure === 'https' ? false : true,
            auth: {
              username: v?.username,
              password: v?.password,
            },
          },
        },
      };
      const api = {
        create: {
          name: 'createDatasource',
          params,
          successMessage: 'i18n-ia3gjpq5',
          faildMessage: 'i18n-p20wuevb',
        },
        update: {
          name: 'updateDatasource',
          params,
          successMessage: 'i18n-tz6dwud2',
          faildMessage: 'i18n-sah3nlrl',
        },
      }[isCreate ? 'create' : 'update'];
      try {
        const res = await this.props.appHelper.utils.bff[api.name](api.params);
        this.utils.notification.success({
          message: this.i18n(api.successMessage),
        });
        this.handleRefresh();
        this.closeModal();
        this.setState({
          modalLoading: false,
        });
      } catch (error) {
        this.utils.notification.warnings({
          message: this.i18n(api.faildMessage),
          errors: error?.response?.errors,
        });
        this.setState({
          modalLoading: false,
        });
      }
    });
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

  paginationShowTotal(total, range) {
    return `${this.i18n('i18n-k0zli54g')} ${total} ${this.i18n('i18n-9ruso5ml')}`;
  }

  setEditThis(editThis) {
    this.editThis = editThis;
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

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Modal
          __component_name="Modal"
          centered={false}
          confirmLoading={__$$eval(() => this.state.modalLoading)}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.closeModal.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          onOk={function () {
            return this.confirmDeleteModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.isOpenModal && this.state.modalType === 'delete')}
          title={this.i18n('i18n-1i46nz7w') /* 删除数据源 */}
        >
          <Alert
            __component_name="Alert"
            message={
              <Space __component_name="Space" align="center" direction="horizontal">
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '' }}
                >
                  {this.i18n('i18n-5h6srqet') /* 确定删除数据源 */}
                </Typography.Text>
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={true}
                  style={{ fontSize: '' }}
                >
                  {__$$eval(
                    () =>
                      `${this?.state?.record?.displayName || '-'}(${
                        this?.state?.record?.name || '-'
                      })`
                  )}
                </Typography.Text>
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '' }}
                >
                  ？
                </Typography.Text>
              </Space>
            }
            showIcon={true}
            type="warning"
          />
        </Modal>
        <Drawer
          __component_name="Drawer"
          className="edit-data-source-drawer"
          destroyOnClose={true}
          extra=""
          footer={
            <Space
              __component_name="Space"
              align="center"
              direction="horizontal"
              style={{ height: '32px' }}
            >
              <Button
                __component_name="Button"
                block={false}
                danger={false}
                disabled={false}
                ghost={false}
                shape="default"
                style={{ display: 'none' }}
              >
                Button-2
              </Button>
            </Space>
          }
          mask={true}
          maskClosable={false}
          onClose={function () {
            return this.closeModal.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={__$$eval(() => this.state.isOpenModal && this.state.modalType === 'edit')}
          placement="right"
          title={this.i18n('i18n-8vmpttzl') /* 编辑数据源 */}
          width="600"
        >
          <LccComponentRu83f
            __component_name="LccComponentRu83f"
            bff={__$$eval(() => this.props.appHelper.utils.bff)}
            data={__$$eval(() => this.state?.record || {})}
            handelCancel={function () {
              return this.closeModal.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            handleCancel={function () {
              return this.closeModal.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            handleSave={function () {
              return this.onSubmit.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            project={__$$eval(() => this.utils.getAuthData()?.project)}
            ref={this._refsManager.linkRef('LccComponentRu83f')}
            setThis={function () {
              return this.setEditThis.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
          />
        </Drawer>
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={1}
            >
              {this.i18n('i18n-38tkeb1r') /* 数据源管理 */}
            </Typography.Title>
          </Col>
          <Col __component_name="Col" span={24}>
            <Alert
              __component_name="Alert"
              message="管理和查看平台数据源。作为 LLMOps 统一的数据入口，需要优先将训练数据、测试数据、知识库文件等数据内容接入数据源，以供其他模块的数据引用。"
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
                      href="/data-source/create"
                      icon={<AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />}
                      shape="default"
                      type="primary"
                    >
                      {this.i18n('i18n-ueslu0a9') /* 新增数据源 */}
                    </Button>
                    <Button
                      __component_name="Button"
                      block={false}
                      danger={false}
                      disabled={false}
                      ghost={false}
                      icon={<TenxIconRefresh __component_name="TenxIconRefresh" />}
                      onClick={function () {
                        return this.handleRefresh.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                    >
                      {this.i18n('i18n-jskgqh8o') /* 刷新 */}
                    </Button>
                    <Input.Search
                      __component_name="Input.Search"
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
                    />
                  </Space>
                </Col>
                <Col __component_name="Col" span={24}>
                  <List
                    __component_name="List"
                    bordered={false}
                    dataSource={__$$eval(
                      () =>
                        this.props.useListDatasources?.data?.Datasource?.listDatasources?.nodes?.map(
                          item => ({
                            ...item,
                            type: item.type || 'objectStorage',
                          })
                        ) || []
                    )}
                    footer=""
                    grid={{ column: 3, gutter: 16, lg: 3, md: 3, sm: 3, xl: 4, xs: 3, xxl: 4 }}
                    gridEnable={true}
                    header=""
                    itemLayout="horizontal"
                    loading={__$$eval(
                      () =>
                        this.props.useListDatasources?.isLoading ||
                        this.props?.useListDatasources?.loading ||
                        false
                    )}
                    pagination={false}
                    renderItem={record =>
                      (__$$context => (
                        <List.Item>
                          <Card
                            actions={[]}
                            bodyStyle={{ position: 'relative' }}
                            bordered={false}
                            hoverable={true}
                            loading={false}
                            onClick={function () {
                              return this.goDetail.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([
                                  {
                                    record: record,
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
                                style={{
                                  float: 'right',
                                  height: '0',
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
                                            record: record,
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
                                    shape="default"
                                    style={{
                                      border: 'none',
                                      float: 'right',
                                      padding: '0',
                                      top: '-10px',
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
                                      src={__$$eval(
                                        () =>
                                          __$$context.utils
                                            .getDataSourceTypes(__$$context)
                                            ?.find(item => item.value === record.type)?.icon || '-'
                                      )}
                                      style={{}}
                                      width={56}
                                    />
                                  </Col>
                                  <Col __component_name="Col" flex="auto">
                                    <Row
                                      __component_name="Row"
                                      gutter={[0, 0]}
                                      style={{ paddingLeft: '20px' }}
                                      wrap={true}
                                    >
                                      <Col __component_name="Col">
                                        <Typography.Title
                                          __component_name="Typography.Title"
                                          bold={true}
                                          bordered={false}
                                          ellipsis={{
                                            tooltip: {
                                              _unsafe_MixedSetter_title_select: 'VariableSetter',
                                              title: __$$eval(
                                                () =>
                                                  `${record?.displayName || '-'}(${
                                                    record?.name || '-'
                                                  })`
                                              ),
                                            },
                                          }}
                                          level={1}
                                        >
                                          {__$$eval(() => __$$context.utils.getFullName(record))}
                                        </Typography.Title>
                                      </Col>
                                      <Col __component_name="Col" span={24}>
                                        <Typography.Paragraph
                                          code={false}
                                          delete={false}
                                          disabled={false}
                                          editable={false}
                                          ellipsis={{
                                            expandable: false,
                                            rows: 2,
                                            tooltip: { title: '' },
                                          }}
                                          mark={false}
                                          strong={false}
                                          style={{ fontSize: '' }}
                                          underline={false}
                                        >
                                          {__$$eval(() => record?.description || '-')}
                                        </Typography.Paragraph>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                              <Col
                                __component_name="Col"
                                span={24}
                                style={{ marginBottom: '-15px' }}
                              >
                                <Divider
                                  __component_name="Divider"
                                  dashed={false}
                                  defaultOpen={false}
                                  mode="line"
                                  style={{ marginLeft: '-24px', width: 'calc(100% + 48px)' }}
                                />
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Descriptions
                                  __component_name="Descriptions"
                                  bordered={false}
                                  borderedBottom={true}
                                  borderedBottomDashed={true}
                                  colon={false}
                                  column={1}
                                  contentStyle={{ marginTop: '8px', padding: '0' }}
                                  id=""
                                  items={[
                                    {
                                      children: (
                                        <Row
                                          __component_name="Row"
                                          style={{ width: '100%' }}
                                          wrap={true}
                                        >
                                          <Col __component_name="Col" span={24}>
                                            <Row
                                              __component_name="Row"
                                              gutter={[0, 0]}
                                              justify="space-between"
                                              style={{ display: 'flex' }}
                                              wrap={false}
                                            >
                                              <Col __component_name="Col">
                                                <Space
                                                  __component_name="Space"
                                                  align="center"
                                                  direction="horizontal"
                                                  size={0}
                                                  style={{}}
                                                >
                                                  <Status
                                                    __component_name="Status"
                                                    id={__$$eval(() => record?.status)}
                                                    types={__$$eval(() =>
                                                      __$$context.utils.getDataSourceStatus(
                                                        __$$context,
                                                        true
                                                      )
                                                    )}
                                                  />
                                                  {!!false && (
                                                    <Typography.Text
                                                      __component_name="Typography.Text"
                                                      disabled={false}
                                                      ellipsis={true}
                                                      strong={false}
                                                      style={{
                                                        fontSize: '',
                                                        position: 'relative',
                                                        top: '-2px',
                                                      }}
                                                      type="colorPrimary"
                                                    >
                                                      (30%)
                                                    </Typography.Text>
                                                  )}
                                                </Space>
                                              </Col>
                                              <Col
                                                __component_name="Col"
                                                style={{ verticalAlign: 'baseline' }}
                                              >
                                                <Tag
                                                  __component_name="Tag"
                                                  bordered={false}
                                                  closable={false}
                                                  color={__$$eval(
                                                    () =>
                                                      __$$context.utils
                                                        .getDataSourceTypes(__$$context)
                                                        ?.find(item => item.value === record.type)
                                                        ?.tagColor || 'primary'
                                                  )}
                                                >
                                                  {__$$eval(
                                                    () =>
                                                      __$$context.utils
                                                        .getDataSourceTypes(__$$context)
                                                        ?.find(item => item.value === record.type)
                                                        ?.children || '-'
                                                  )}
                                                </Tag>
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>
                                      ),
                                      key: 'yuqlalgvmn',
                                      label: this.i18n('i18n-p7mextst') /* 状态 */,
                                      span: 1,
                                    },
                                    {
                                      children: (
                                        <Typography.Time
                                          __component_name="Typography.Time"
                                          format=""
                                          relativeTime={false}
                                          time={__$$eval(() => record?.updateTimestamp)}
                                        />
                                      ),
                                      key: 'bdtsm8b0pth',
                                      label: this.i18n('i18n-uag94ndq') /* 更新时间 */,
                                      span: 1,
                                    },
                                  ]}
                                  labelStyle={{ marginTop: '8px', padding: '0', width: '60px' }}
                                  layout="horizontal"
                                  size="default"
                                  title=""
                                >
                                  <Descriptions.Item
                                    key="yuqlalgvmn"
                                    label={this.i18n('i18n-p7mextst') /* 状态 */}
                                    span={1}
                                  >
                                    {null}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    key="bdtsm8b0pth"
                                    label={this.i18n('i18n-uag94ndq') /* 更新时间 */}
                                    span={1}
                                  >
                                    {null}
                                  </Descriptions.Item>
                                </Descriptions>
                              </Col>
                            </Row>
                          </Card>
                        </List.Item>
                      ))(__$$createChildContext(__$$context, { record }))
                    }
                    rowKey="id"
                    size="small"
                    split={false}
                  />
                </Col>
                <Col
                  __component_name="Col"
                  span={24}
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Pagination
                    __component_name="Pagination"
                    current={__$$eval(() => this.state.current)}
                    onChange={function () {
                      return this.handlePaginationChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    onShowSizeChange={function () {
                      return this.handlePaginationChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    pageSize={__$$eval(() => this.state.size)}
                    simple={false}
                    style={{ display: 'flex', marginTop: '8px' }}
                    total={__$$eval(
                      () =>
                        this.props.useListDatasources?.data?.Datasource?.listDatasources
                          ?.totalCount || 0
                    )}
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
  const match = matchPath({ path: '/data-source' }, location.pathname);
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
          func: 'useListDatasources',
          params: function applyThis() {
            return {
              input: {
                namespace: this.utils.getAuthData()?.project,
                page: 1,
                pageSize: 12,
              },
            };
          }.apply(self),
          enableLocationSearch: function applyThis() {
            return true;
          }.apply(self),
        },
      ]}
      render={dataProps => (
        <DataSource$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
