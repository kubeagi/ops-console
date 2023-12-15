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
  FormilyInput,
  Row,
  Col,
  Space,
  Button,
  Card,
  Image,
  Tabs,
  Descriptions,
} from '@tenx-ui/materials';

import LccComponentSbva0 from 'confirm';

import { AntdIconPlusOutlined, AntdIconReloadOutlined } from '@tenx-ui/icon-materials';

import LccComponentNy419 from 'dataset-version-list';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class DatasetDetail$$Page extends React.Component {
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

    this.state = { editVisible: false, confirm: {}, addVersion: false };
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

  data() {
    return {
      ...this.props.useGetDataset,
      data: this.props.useGetDataset.data?.Dataset?.getDataset || {},
    };
  }

  form(name) {
    return this.$(name || 'edit-dataset')?.formRef?.current?.form;
  }

  getVersionsNumMax(versions) {
    return Math.max(...versions.map(v => parseInt(v?.version?.match(/\d+/)?.[0] || '0')), 0);
  }

  onAddVersionOK() {
    // 点击遮罩层或右上角叉或取消按钮的回调
    this.form('formily_create')
      .validate()
      .then(this.addVersionFetch.bind(this))
      .catch(e => {
        console.error('onAddVersion error:', e);
      });
  }

  onAddVersionCancel() {
    // 点击遮罩层或右上角叉或取消按钮的回调
    this.setState({
      addVersion: false,
    });
  }

  async addVersionFetch() {
    const _version = 'v' + (this.getVersionsNumMax(this.data().data?.versions?.nodes || []) + 1);
    const payload = {
      input: {
        name: this.data().data?.name + '-' + _version,
        namespace: this.data().data?.namespace,
        datasetName: this.data().data?.name,
        displayName: '',
        description: this.form('formily_create').values.description,
        inheritedFrom: this.form('formily_create').values.inheritedFrom,
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
      this.refresh();
    }
  }

  onEditBtnClick(event) {
    // 点击按钮时的回调
    this.setState({
      editVisible: true,
    });
  }

  onEditCancel() {
    // 点击遮罩层或右上角叉或取消按钮的回调
    this.setState({
      editVisible: false,
    });
  }

  async doEditDataset() {
    const payload = {
      input: {
        name: this.data().data?.name,
        namespace: this.data().data?.namespace,
        displayName: this.form().values.displayName,
      },
    };
    const res = await this.utils.bff.updateDataset(payload).catch(e => {
      this.utils.notification.warn({
        message: '编辑数据集失败',
      });
    });
    if (res?.VersionedDataset?.createVersionedDataset?.name) {
      this.utils.notification.success({
        message: '编辑数据集成功',
      });
      this.onEditCancel();
    }
    this.setState({
      data: res?.Dataset?.listDatasets?.nodes,
      totalCount: res?.Dataset?.listDatasets?.totalCount,
    });
  }

  onEditOk() {
    // 点击确定回调
    this.form()
      .validate()
      .then(this.doEditDataset)
      .catch(e => {});
  }

  refresh() {
    this.utils?.changeLocationQuery(this, 'useGetDataset', {
      _: new Date().getTime(),
      name: this.match?.params?.id,
      namespace: this.utils.getAuthData?.()?.project,
      versionsInput: {
        namespace: this.utils.getAuthData?.()?.project,
        pageSize: 1000,
        page: 1,
      },
      filesInput: {
        keyword: '',
        pageSize: 1,
        page: 1,
      },
    });
  }

  async validatorName(v) {
    if (v) {
      try {
        const res = await this.props?.appHelper?.utils?.bff?.getDataset({
          name: v,
          namespace: this.utils.getAuthData()?.project,
          versionsInput: {
            namespace: this.utils.getAuthData()?.project,
          },
        });
        if (res?.Dataset?.getDataset?.name) {
          return '数据集名称重复';
        }
      } catch (error) {}
    }
  }

  onDel(event) {
    // 点击按钮时的回调
    this.setState({
      confirm: {
        id: new Date().getTime(),
        title: '删除数据集',
        content: `确定删除数据集：${this.data().data?.name}？`,
        onOk: async () => {
          const res = await this.utils.bff
            .deleteDatasets({
              input: {
                namespace: this.data().data?.namespace,
                name: this.data().data?.name,
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
          this.refresh();
        },
      },
    });
  }

  addVersion(event) {
    this.setState({
      addVersion: {
        visible: true,
      },
    });
  }

  componentDidMount() {
    console.log('did mount1', this, this.utils, this.data());
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        {!!__$$eval(() => this.state.addVersion) && (
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
                  inheritedFromSwitch: !!this.data().data?.versions.nodes.length,
                })),
              }}
              __component_name="FormilyForm"
            >
              <FormilyFormItem
                fieldProps={{
                  name: 'FormilyFormItem',
                  type: 'object',
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
                    () => 'v' + (this.getVersionsNumMax(this.data().data?.versions.nodes) + 1)
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
                  'x-display': 'visible',
                  'x-pattern': 'editable',
                  'x-validator': [],
                }}
                componentProps={{ 'x-component-props': { loading: false, disabled: false } }}
                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                __component_name="FormilySwitch"
              />
              <FormilySelect
                fieldProps={{
                  enum: __$$eval(() =>
                    this.data().data?.versions.nodes.map(v => ({
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
        {!!__$$eval(() => this.state.editVisible) && (
          <Modal
            mask={true}
            onOk={function () {
              return this.onEditOk.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            open={true}
            title="编辑数据集"
            centered={false}
            keyboard={true}
            onCancel={function () {
              return this.onEditCancel.apply(
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
              ref={this._refsManager.linkRef('edit-dataset')}
              formHelper={{ id: 'displayName', autoFocus: true }}
              componentProps={{
                colon: false,
                layout: 'horizontal',
                labelCol: 4,
                labelAlign: 'left',
                wrapperCol: 20,
              }}
              __component_name="FormilyForm"
            >
              <FormilyInput
                fieldProps={{
                  name: 'displayName',
                  title: '数据集名称',
                  required: true,
                  'x-validator': [
                    {
                      id: 'disabled',
                      type: 'disabled',
                      message: '由小写字母、数字和中划线组成，以小写字母或数字开头和结尾',
                      pattern: '^[a-z0-9]{1}[-a-z0-9]{1,61}[a-z0-9]{1}$',
                      children: '未知',
                      required: true,
                      whitespace: true,
                    },
                    {
                      id: 'disabled',
                      type: 'disabled',
                      children: '未知',
                      validator: function () {
                        return this.validatorName.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                    },
                  ],
                }}
                componentProps={{
                  'x-component-props': { allowClear: true, placeholder: '请输入数据集名称' },
                }}
                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                __component_name="FormilyInput"
              />
            </FormilyForm>
          </Modal>
        )}
        <LccComponentSbva0
          data={__$$eval(() => this.state.confirm)}
          __component_name="LccComponentSbva0"
        />
        <Row wrap={true} __component_name="Row">
          <Col span={24} style={{ marginBottom: '16px' }} __component_name="Col">
            <Space align="center" direction="horizontal" __component_name="Space">
              <Button.Back type="ghost" title="数据集详情" __component_name="Button.Back" />
            </Space>
          </Col>
        </Row>
        <Card
          size="default"
          type="default"
          style={{ marginBottom: '16px' }}
          actions={[]}
          loading={false}
          bordered={false}
          hoverable={false}
          __component_name="Card"
        >
          <Row __component_name="Row">
            <Col flex="470px" __component_name="Col">
              <Row wrap={true} __component_name="Row">
                <Col span={4} __component_name="Col">
                  <Image
                    src={__$$eval(
                      () => this.constants.DATASET_DATA?.typeIcons?.[this.data().data?.contentType]
                    )}
                    width={64}
                    height={64}
                    preview={false}
                    fallback=""
                    __component_name="Image"
                  />
                </Col>
                <Col span={19} __component_name="Col">
                  <Row wrap={true} __component_name="Row">
                    <Col span={24} __component_name="Col">
                      <Typography.Title
                        bold={true}
                        level={1}
                        bordered={false}
                        ellipsis={true}
                        __component_name="Typography.Title"
                      >
                        {__$$eval(
                          () => this.data().data?.displayName || this.data().data?.name || '-'
                        )}
                      </Typography.Title>
                    </Col>
                    <Col flex="" span={24} __component_name="Col">
                      <Row wrap={false} __component_name="Row">
                        <Col flex="" __component_name="Col">
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            更新时间：
                          </Typography.Text>
                        </Col>
                        <Col flex="auto" span={24} __component_name="Col">
                          <Typography.Time
                            time={__$$eval(() => this.data().data?.creationTimestamp)}
                            format=""
                            relativeTime={true}
                            __component_name="Typography.Time"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col
              flex="auto"
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
              __component_name="Col"
            >
              <Space align="center" direction="horizontal" __component_name="Space">
                <Button
                  block={false}
                  ghost={false}
                  shape="default"
                  danger={false}
                  onClick={function () {
                    return this.onEditBtnClick.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  disabled={false}
                  __component_name="Button"
                >
                  {this.i18n('i18n-str3pnrc') /* 编辑 */}
                </Button>
                <Button
                  block={false}
                  ghost={false}
                  shape="default"
                  danger={false}
                  onClick={function () {
                    return this.onDel.apply(this, Array.prototype.slice.call(arguments).concat([]));
                  }.bind(this)}
                  disabled={false}
                  __component_name="Button"
                >
                  删除
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
        <Card
          size="default"
          type="default"
          actions={[]}
          loading={false}
          bordered={false}
          hoverable={false}
          __component_name="Card"
        >
          <Tabs
            size="default"
            type="line"
            items={[
              {
                key: 'tab-item-1',
                label: this.i18n('i18n-1gikmooh') /* 详细信息 */,
                children: (
                  <Descriptions
                    id=""
                    size="default"
                    colon={false}
                    items={[
                      {
                        key: '2y97byqciee',
                        span: 24,
                        label: 'ID',
                        children: __$$eval(
                          () => this.data()?.data?.id || this.data()?.data?.ID || '-'
                        ),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                      { key: 'xvcp3obfu', span: 24, label: '数据类型', children: '文本' },
                      { key: 'er0ptk5lill', span: 24, label: '应用场景', children: '科技' },
                      {
                        key: 'ww04wf6evps',
                        span: 24,
                        label: this.i18n('i18n-qjodl1nn') /* 创建时间 */,
                        children: (
                          <Typography.Time
                            time={__$$eval(() => this.data().data?.creationTimestamp)}
                            format=""
                            relativeTime={true}
                            __component_name="Typography.Time"
                          />
                        ),
                        _unsafe_MixedSetter_children_select: 'SlotSetter',
                      },
                      {
                        key: 'ajc9nhn140i',
                        span: 24,
                        label: this.i18n('i18n-sg7nu8tx') /* 创建者 */,
                        children: __$$eval(() => this.data().data?.creator || '-'),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                      {
                        key: '3p5bkjlrh9u',
                        span: 24,
                        label: this.i18n('i18n-txt5kh4m') /* 描述 */,
                        children: __$$eval(() => this.data().data?.description || '-'),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                    ]}
                    title=""
                    column={3}
                    layout="horizontal"
                    bordered={false}
                    labelStyle={{ width: 100 }}
                    borderedBottom={false}
                    __component_name="Descriptions"
                    borderedBottomDashed={false}
                  />
                ),
              },
              {
                key: 'tab-item-2',
                label: '全部版本',
                children: [
                  <Space
                    align="center"
                    direction="horizontal"
                    __component_name="Space"
                    key="node_oclq0s51353"
                  >
                    <Button
                      icon={<AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />}
                      type="primary"
                      block={false}
                      ghost={false}
                      shape="default"
                      danger={false}
                      onClick={function () {
                        return this.addVersion.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      disabled={false}
                      __component_name="Button"
                    >
                      新增版本
                    </Button>
                    <Button
                      icon={<AntdIconReloadOutlined __component_name="AntdIconReloadOutlined" />}
                      block={false}
                      ghost={false}
                      shape="default"
                      danger={false}
                      disabled={false}
                      __component_name="Button"
                      onClick={function () {
                        return this.refresh.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                    >
                      刷新
                    </Button>
                  </Space>,
                  <LccComponentNy419
                    isProd="false"
                    dataset={__$$eval(() => this.data()?.data)}
                    refresh={function () {
                      return this.refresh.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    dataSource={__$$eval(() => [1, 2, 3])}
                    datasource={__$$eval(() => this.data().data?.versions?.nodes || [])}
                    __component_name="LccComponentNy419"
                    key="node_oclpjicyqh1"
                  />,
                ],
              },
            ]}
            style={{ marginTop: '-20px' }}
            activeKey=""
            tabPosition="top"
            __component_name="Tabs"
            destroyInactiveTabPane="true"
          />
        </Card>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/dataset/detail/:id' }, location.pathname);
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
          func: 'useGetDataset',
          params: function applyThis() {
            return {
              name: this.match?.params?.id,
              namespace: this.utils.getAuthData?.()?.project,
              versionsInput: {
                namespace: this.utils.getAuthData?.()?.project,
                pageSize: 1000,
                page: 1,
              },
              filesInput: {
                keyword: '',
                pageSize: 1,
                page: 1,
              },
            };
          }.apply(self),
          enableLocationSearch: function applyThis() {
            return true;
          }.apply(self),
        },
      ]}
      render={dataProps => (
        <DatasetDetail$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
