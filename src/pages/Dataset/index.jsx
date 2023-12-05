// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  FormilyForm,
  FormilyFormItem,
  Typography,
  FormilyTextArea,
  FormilySwitch,
  FormilySelect,
  Row,
  Col,
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
  Status,
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

import utils, { RefsManager } from '../../utils/__utils';

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

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = {
      data: [],
      page: 1,
      type: undefined,
      field: undefined,
      search: undefined,
      loading: false,
      pageSize: 10,
      addVersion: {
        visible: false,
        data: {},
      },
      totalCount: 0,
    };

    // 代码中有些 Ds 是 Dataset的简写
    this._fetchData = this.utils._.debounce(this.fetchData, 500);
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {}

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  _data() {
    return {
      fields: [
        {
          label: '科技',
          value: 'science',
        },
        {
          label: '金融',
          value: 'finance',
        },
        {
          label: '教育',
          value: 'education',
        },
        {
          label: '医疗',
          value: 'medical',
        },
        {
          label: '能源',
          value: 'energy',
        },
        {
          label: '法律',
          value: 'law',
        },
        {
          label: '其他',
          value: 'others',
        },
      ],
      type: [
        {
          label: '文本',
          value: 'text',
        },
        {
          label: '图片',
          value: 'image',
        },
        {
          label: '科技',
          value: 'video',
        },
      ],
      syncStatus: [
        {
          children: '同步中',
          id: 'FileSyncing',
          type: 'info',
        },
        {
          children: '同步失败',
          id: 'FileSyncFailed',
          type: 'error',
        },
        {
          children: '同步成功',
          id: 'FileSyncSuccess',
          type: 'success',
        },
      ],
      released: [
        {
          children: '未发布',
          id: 0,
          type: 'error',
        },
        {
          children: '已发布',
          id: 1,
          type: 'success',
        },
      ],
      dataProcessStatus: {},
    };
  }

  onClick(event) {
    // 点击按钮时的回调
  }

  refresh(event) {
    event.stopPropagation();
    this.fetchData();
  }

  testFunc() {
    return <div className="test-aliLowcode-func">{this.state.test}</div>;
  }

  toDetail(event, params) {
    this.history.push(`/dataset/detail/${params.datasetName}/version/${params.versionName}`);
  }

  async fetchData() {
    this.setState({
      loading: true,
    });
    const res = await this.utils.bff
      .listDatasets({
        input: {
          labelSelector: this.state.type,
          fieldSelector: this.state.field,
          keyword: this.state.search,
          namespace: this.appHelper.utils.getAuthData().project,
          pageSize: this.state.pageSize,
          page: this.state.page,
        },
        versionsInput: {
          namespace: this.appHelper.utils.getAuthData().project,
          pageSize: 1000,
          page: 1,
        },
        filesInput: {
          keyword: '',
          pageSize: 1,
          page: 1,
        },
      })
      .catch(e => {
        this.setState({
          loading: false,
        });
      });
    this.setState({
      data: res?.Dataset?.listDatasets?.nodes,
      totalCount: res?.Dataset?.listDatasets?.totalCount,
      loading: false,
    });
  }

  linkClick(event) {
    event.stopPropagation();
  }

  showTotal(total, range) {
    // 用于格式化显示表格数据总量
    return `共 ${total} 条`;
  }

  addVersion(event, params) {
    event.stopPropagation();
    this.setState({
      addVersion: {
        visible: true,
        data: params.data,
      },
    });
  }

  delVersion(params) {
    this.utils.Modal.confirm({
      title: '删除数据集版本',
      content: `确定删除数据集：${params.dataset.name} 下版本：${params.version.version}？`,
      onOk: async () => {
        const res = await this.utils.bff
          .deleteVersionedDatasets({
            input: {
              namespace: params.dataset.namespace,
              name: params.version.name,
            },
          })
          .catch(e => {
            this.utils.notification.warn({
              message: '删除数据集版本失败',
            });
          });
        this.utils.notification.success({
          message: '删除数据集版本成功',
        });
        this.fetchData();
      },
    });
  }

  onDelDataset(event, params) {
    event.stopPropagation();
    // 点击按钮时的回调
    this.utils.Modal.confirm({
      title: '删除数据集',
      content: `确定删除数据集：${params.item.name}？`,
      onOk: async () => {
        const res = await this.utils.bff
          .deleteDatasets({
            input: {
              namespace: params.item.namespace,
              name: params.item.name,
            },
          })
          .catch(e => {
            this.utils.notification.warn({
              message: '删除数据集失败',
            });
          });
        this.utils.notification.success({
          message: '删除数据集成功',
        });
        this.fetchData();
      },
    });
  }

  onPageChange(page, pageSize) {
    // 页码或 pageSize 改变的回调
    this.setState(
      {
        page,
        pageSize,
      },
      this.fetchData
    );
  }

  onTypeChange(event) {
    // 输入框内容变化时的回调
    this.setState(
      {
        type: event,
      },
      this.fetchData
    );
  }

  delVersionBak(params) {
    this.setState({
      delDsVisible: true,
      delDsData: params,
    });
  }

  onFieldChange(event) {
    // 输入框内容变化时的回调
    this.setState(
      {
        field: event,
      },
      this.fetchData
    );
  }

  onAddVersionOK() {
    // 点击遮罩层或右上角叉或取消按钮的回调
    this.form()
      .validate()
      .then(this.addVersionFetch.bind(this))
      .catch(e => {
        console.error('onAddVersion error:', e);
      });
  }

  onSearchChange(event) {
    // 输入框内容变化时的回调
    this.setState(
      {
        search: event.target.value,
      },
      this._fetchData
    );
  }

  async addVersionFetch() {
    const _version =
      'v' + (this.getVersionsNumMax(this.state.addVersion.data?.versions?.nodes || []) + 1);
    const payload = {
      input: {
        name: this.state.addVersion.data?.name + '-' + _version,
        namespace: this.state.addVersion.data?.namespace,
        datasetName: this.state.addVersion.data?.name,
        displayName: '',
        description: this.form().values.description,
        inheritedFrom: this.form().values.inheritedFrom,
        version: _version,
        released: 0,
      },
    };
    const res = await this.utils.bff.createVersionedDataset(payload).catch(e => {
      this.utils.notification.warn({
        message: '新增数据集版本失败',
      });
    });
    if (res?.VersionedDataset?.createVersionedDataset?.name) {
      this.utils.notification.success({
        message: '新增数据集版本成功',
      });
      this.onAddVersionCancel();
      this.fetchData();
    }
  }

  onDropdownClick(event, params) {
    if (event.key === 'delete') {
      this.delVersion(params);
    }
  }

  getVersionsNumMax(versions) {
    console.log('getVersionsNumMax', versions);
    return Math.max(...versions.map(v => parseInt(v?.version?.match(/\d+/)?.[0] || '0')), 0);
  }

  onAddVersionCancel() {
    // 点击遮罩层或右上角叉或取消按钮的回调
    this.setState({
      addVersion: {
        visible: false,
        data: {},
      },
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        {!!__$$eval(() => this.state.addVersion.visible) && (
          <Modal
            mask={true}
            onOk={function () {
              return this.onAddVersionOK.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            open={true}
            title={this.i18n('i18n-wgpt60zj') /* 新增版本 */}
            centered={false}
            keyboard={true}
            onCancel={function () {
              return this.onAddVersionCancel.apply(
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
              ref={this._refsManager.linkRef('formily_create')}
              formHelper={{ autoFocus: true }}
              componentProps={{
                colon: false,
                layout: 'horizontal',
                labelCol: 5,
                labelAlign: 'left',
                wrapperCol: 19,
              }}
              createFormProps={{
                initialValues: __$$eval(() => ({
                  inheritedFromSwitch: !!this.state.addVersion.data?.versions.nodes.length,
                })),
              }}
              __component_name="FormilyForm"
            >
              <FormilyFormItem
                fieldProps={{
                  name: 'FormilyFormItem',
                  title: '数据集版本',
                  'x-component': 'FormilyFormItem',
                  'x-validator': [],
                }}
                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                __component_name="FormilyFormItem"
              >
                <Typography.Text
                  style={{ fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {__$$eval(
                    () =>
                      'v' + (this.getVersionsNumMax(this.state.addVersion.data?.versions.nodes) + 1)
                  )}
                </Typography.Text>
              </FormilyFormItem>
              <FormilyTextArea
                fieldProps={{
                  name: 'description',
                  title: '版本描述',
                  'x-component': 'Input.TextArea',
                  'x-validator': [],
                }}
                componentProps={{ 'x-component-props': { placeholder: '请输入描述' } }}
                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                __component_name="FormilyTextArea"
              />
              <FormilySwitch
                fieldProps={{
                  name: 'inheritedFromSwitch',
                  title: '继承历史版本',
                  'x-validator': [],
                }}
                componentProps={{ 'x-component-props': { loading: false, disabled: false } }}
                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                __component_name="FormilySwitch"
              />
              <FormilySelect
                fieldProps={{
                  enum: __$$eval(() =>
                    this.state.addVersion.data?.versions.nodes.map(v => ({
                      label: v.version,
                      value: v.version,
                    }))
                  ),
                  name: 'inheritedFrom',
                  title: '历史版本',
                  required: true,
                  'x-display': "{{ $form.values?.inheritedFromSwitch ? 'visible' : 'hidden' }}",
                  'x-validator': [],
                  _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                }}
                componentProps={{
                  'x-component-props': {
                    disabled: false,
                    allowClear: false,
                    placeholder: '请选择历史版本',
                    _sdkSwrGetFunc: {},
                    _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ObjectSetter',
                  },
                }}
                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                __component_name="FormilySelect"
              />
            </FormilyForm>
          </Modal>
        )}
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
                  onClick={function () {
                    return this.fetchData.apply(
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
                  options={__$$eval(() => this._data().type)}
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
                  options={__$$eval(() => this._data().fields)}
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
            rowKey="name"
            loading={__$$eval(() => this.state.loading)}
            bordered={false}
            dataSource={__$$eval(() => this.state.data)}
            gridEnable={false}
            itemLayout="vertical"
            pagination={{
              size: 'default',
              total: __$$eval(() => this.state.totalCount),
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
              showTotal: function () {
                return this.showTotal.apply(this, Array.prototype.slice.call(arguments).concat([]));
              }.bind(this),
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
                            key: __$$eval(() => item.name),
                            label: (
                              <Row
                                wrap={true}
                                style={{ display: 'flex', justifyContent: 'space-between' }}
                                __component_name="Row"
                              >
                                <Col
                                  span={11}
                                  style={{ display: 'flex', alignItems: 'center' }}
                                  __component_name="Col"
                                >
                                  <Image
                                    src={__$$eval(
                                      () =>
                                        __$$context.constants.DATASET_DATA?.typeIcons?.[
                                          item.contentType
                                          ]
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
                                    target="_self"
                                    __component_name="UnifiedLink"
                                  >
                                    {__$$eval(() => __$$context.utils.getFullName(item))}
                                  </UnifiedLink>
                                </Col>
                                <Col
                                  flex="200px"
                                  span={4}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                  }}
                                  __component_name="Col"
                                >
                                  <Tag color="warning" closable={false} __component_name="Tag">
                                    {__$$eval(
                                      () =>
                                        __$$context.utils._.find(__$$context._data().type, {
                                          value: item.contentType,
                                        })?.label || '未知'
                                    )}
                                  </Tag>
                                  <Tag color="processing" closable={false} __component_name="Tag">
                                    {__$$eval(() => item.field || '未知')}
                                  </Tag>
                                </Col>
                                <Col
                                  flex="150px"
                                  span={4}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '30px',
                                    justifyContent: 'flex-start',
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
                                    {__$$eval(() => `版本数：${item.versions.totalCount}`)}
                                  </Typography.Text>
                                </Col>
                                <Col
                                  span={4}
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
                                      return this.addVersion.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([
                                          {
                                            testKey: 123,
                                            data: item,
                                          },
                                        ])
                                      );
                                    }.bind(__$$context)}
                                    disabled={false}
                                    __component_name="Button"
                                  >
                                    {this.i18n('i18n-wgpt60zj') /* 新增版本 */}
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
                                      return this.onDelDataset.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([
                                          {
                                            item: item,
                                          },
                                        ])
                                      );
                                    }.bind(__$$context)}
                                    disabled={false}
                                    __component_name="Button"
                                  >
                                    {this.i18n('i18n-z0idrepg') /* - */}
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
                                    key: 'syncStatus',
                                    title: '导入状态',
                                    render: (text, record, index) =>
                                      (__$$context => (
                                        <Status
                                          id={__$$eval(() => record.syncStatus)}
                                          types={__$$eval(() => __$$context._data().syncStatus)}
                                          __component_name="Status"
                                        />
                                      ))(
                                        __$$createChildContext(__$$context, { text, record, index })
                                      ),
                                    dataIndex: 'syncStatus',
                                  },
                                  {
                                    key: 'dataProcessStatus',
                                    title: '数据处理状态',
                                    render: (text, record) => text || '未开始',
                                    dataIndex: 'dataProcessStatus',
                                  },
                                  {
                                    key: 'released',
                                    title: '发布状态',
                                    render: (text, record, index) =>
                                      (__$$context => (
                                        <Status
                                          id={__$$eval(() => record.released)}
                                          types={__$$eval(() => __$$context._data().released)}
                                          __component_name="Status"
                                        />
                                      ))(
                                        __$$createChildContext(__$$context, { text, record, index })
                                      ),
                                    dataIndex: 'released',
                                  },
                                  {
                                    key: 'files',
                                    title: '数据量',
                                    render: (text, record) => text.totalCount,
                                    dataIndex: 'files',
                                  },
                                  {
                                    key: 'updateTimestamp',
                                    title: '最后更新时间',
                                    render: (text, record, index) =>
                                      (__$$context => (
                                        <Typography.Time
                                          time={__$$eval(() => text)}
                                          format=""
                                          relativeTime={true}
                                          __component_name="Typography.Time"
                                        />
                                      ))(
                                        __$$createChildContext(__$$context, { text, record, index })
                                      ),
                                    dataIndex: 'updateTimestamp',
                                  },
                                  {
                                    key: 'action',
                                    title: '操作',
                                    render: (text, record, index) =>
                                      (__$$context => (
                                        <Dropdown.Button
                                          menu={{
                                            items: __$$eval(() =>
                                              (() => {
                                                const list = [
                                                  {
                                                    key: 'delete',
                                                    label: '删除',
                                                    index: 5,
                                                  },
                                                ];
                                                if (record.released) return list;
                                                list.unshift({
                                                  key: 'import',
                                                  label: '导入数据',
                                                  index: 1,
                                                });
                                                if (record.syncStatus !== 'FileSyncSuccess') {
                                                  return list;
                                                }
                                                list.push(
                                                  {
                                                    key: 'dataProcess',
                                                    label: '数据处理',
                                                    index: 2,
                                                  },
                                                  {
                                                    key: 'release',
                                                    label: '发布',
                                                    index: 3,
                                                  }
                                                );
                                                return list.sort((a, b) => a.index - b.index);
                                              })()
                                            ),
                                            onClick: function () {
                                              return this.onDropdownClick.apply(
                                                this,
                                                Array.prototype.slice.call(arguments).concat([
                                                  {
                                                    version: record,
                                                    dataset: item,
                                                  },
                                                ])
                                              );
                                            }.bind(__$$context),
                                          }}
                                          type="default"
                                          danger={false}
                                          onClick={function () {
                                            return this.toDetail.apply(
                                              this,
                                              Array.prototype.slice.call(arguments).concat([
                                                {
                                                  versionName: record.name,
                                                  datasetName: item.name,
                                                },
                                              ])
                                            );
                                          }.bind(__$$context)}
                                          trigger={['hover']}
                                          disabled={false}
                                          placement="bottomRight"
                                          overlayStyle={{}}
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
                                            查看详情
                                          </Typography.Text>
                                        </Dropdown.Button>
                                      ))(
                                        __$$createChildContext(__$$context, { text, record, index })
                                      ),
                                    dataIndex: 'action',
                                  },
                                ]}
                                dataSource={__$$eval(() =>
                                  (function () {
                                    return item.versions?.nodes || [];
                                  })()
                                )}
                                pagination={{
                                  size: 'default',
                                  simple: false,
                                  pageSize: 5,
                                  pagination: { pageSize: 10 },
                                  showQuickJumper: false,
                                  showSizeChanger: false,
                                }}
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
                        accordion={true}
                        __component_name="Collapse"
                        expandIconPosition="right"
                        destroyInactivePanel={true}
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

const PageWrapper = (props = {}) => {
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
      render={dataProps => (
        <Dataset$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
