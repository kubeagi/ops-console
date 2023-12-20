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
  Divider,
  Descriptions,
  Status,
  Pagination,
  Modal,
  FormilyForm,
  FormilyInput,
  FormilyUpload,
  FormilyTextArea,
} from '@tenx-ui/materials';

import {
  AntdIconPlusOutlined,
  AntdIconReloadOutlined,
  AntdIconCodeSandboxCircleFilled,
  AntdIconSettingOutlined,
  AntdIconCloudUploadOutlined,
} from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class ModelAppList$$Page extends React.Component {
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
      createModalVisible: false,
      currentRecord: null,
      data: [],
      deleteBtnLoading: false,
      deleteLoading: false,
      deleteModalVisible: false,
      fileList: [],
      imageUrl: '',
      keyword: '',
      loading: false,
      pageRange: [],
      pages: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    };
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

  checkFileSize(file) {
    const maxSize = 2 * 1024 * 1024; // 2MB，你可以根据需要设置文件大小限制
    if (file.size > maxSize) {
      this.utils.message.warn('文件大小不能超过2MB！');
      return false; // 阻止上传
    }

    return true; // 允许上传
  }

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  getData() {
    this.setState({
      loading: true,
    });
    const project = this.utils.getAuthData()?.project;
    const { currentPage, pageSize } = this.state.pages;
    const params = {
      namespace: project,
      keyword: this.state.keyword,
      page: currentPage,
      pageSize,
    };
    this.utils.bff
      .listApplications({
        input: params,
      })
      .then(res => {
        console.log(res);
        const { Application } = res;
        const { listApplicationMetadata } = Application || {};
        const { nodes, totalCount } = listApplicationMetadata || {};
        this.setState({
          data: nodes || [],
          loading: false,
          pages: {
            ...this.state.pages,
            total: totalCount,
          },
        });
      })
      .catch(error => {
        this.setState({
          data: [],
          loading: false,
        });
      });
  }

  handleImageChange({ fileList: newFileList }) {
    this.setState({
      fileList: newFileList,
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

  onCloseCreateModel() {
    this.setState({
      createModalVisible: false,
    });
  }

  onCloseDeleteModal(e, isNeedLoad) {
    console.log('isNeedLoad', isNeedLoad);
    this.setState({
      deleteModalVisible: false,
      currentRecord: null,
    });
    if (isNeedLoad) {
      this.getData();
    }
  }

  onCreateClick(event) {
    this.history.push(`/model-app/create`);
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
    /**删除方法
  this.utils.bff.deleteModel({ input: params }).then(res => {
    this.setState({
      deleteLoading: false
    })
    this.utils.notification.success({
      message: '删除模型成功',
    });
    // 'event' 传参无意义，仅仅为了占数
    this.onCloseDeleteModal('event',true)
  }).catch(error => {
    this.setState({
      deleteLoading: false
    })
    this.utils.notification.warn({
      message: '删除模型失败',
    });
  })
   */
  }

  onDetailClick(e, extParams) {
    // 事件的 handler

    this.history.push(`/chat?namespace=${extParams.data.namespace}&name=${extParams.data.name}`);
  }

  onEdit(item) {
    // this.history.push(`/model-app/edit/${item.name}`)
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

  onOpenCreateModel() {
    this.setState({
      createModalVisible: true,
    });
  }

  onSearch(name) {
    this.setState(
      {
        keyword: name,
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

  onSubmitCreate() {
    this.form('create_form')
      .validate()
      .then(res => {
        const values = this.form('create_form').values;
        this.getBase64(this.state.fileList[0].originFileObj).then(res => {
          const project = this.utils.getAuthData()?.project;
          console.log(values);
          const params = {
            namespace: project,
            name: values.name,
            displayName: values.displayName,
            icon: res,
          };
          this.utils.bff
            .createKnowledgeBaseApplication({
              input: params,
            })
            .then(res => {
              const { KnowledgeBaseApplication } = res;
              const { createKnowledgeBaseApplication } = KnowledgeBaseApplication || {};
              console.log(createKnowledgeBaseApplication);
            });
        });
      });
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
              模型应用管理
            </Typography.Title>
          </Col>
          <Col __component_name="Col" span={24}>
            <Alert
              __component_name="Alert"
              message="模型应用全生命周期管理，支持应用编排、计费定价、查看对话记录及用户反馈"
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
              <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                <Col __component_name="Col" span={24}>
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
                            return this.onOpenCreateModel.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this)}
                          shape="default"
                          target="_self"
                          type="primary"
                        >
                          新增模型应用
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
                          placeholder="请输入模型应用名称搜索"
                          style={{ width: '240px' }}
                        />
                      </Space>
                    </Col>
                  </Row>
                </Col>
                <Col __component_name="Col" span={24}>
                  <List
                    __component_name="List"
                    bordered={false}
                    dataSource={__$$eval(() => this.state.data)}
                    grid={{ column: 3, gutter: 20, lg: 2, md: 2, sm: 2, xl: 3, xs: 2, xxl: 4 }}
                    gridEnable={true}
                    itemLayout="horizontal"
                    loading={__$$eval(() => this.state.loading)}
                    pagination={false}
                    renderItem={item =>
                      (__$$context => (
                        <List.Item style={{ marginTop: '16px' }}>
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
                            type="default"
                          >
                            <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" gutter={[0, 0]} wrap={false}>
                                  <Col __component_name="Col" flex="56px">
                                    <AntdIconCodeSandboxCircleFilled
                                      __component_name="AntdIconCodeSandboxCircleFilled"
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
                                      style={{ color: '#4a90e2', fontSize: 56 }}
                                    />
                                  </Col>
                                  <Col __component_name="Col" flex="auto">
                                    <Row
                                      __component_name="Row"
                                      gutter={[0, 0]}
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" style={{ paddingLeft: '20px' }}>
                                        <Typography.Title
                                          __component_name="Typography.Title"
                                          bold={true}
                                          bordered={false}
                                          ellipsis={true}
                                          level={1}
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
                                            tooltip: true,
                                          }}
                                          mark={false}
                                          strong={false}
                                          style={{ fontSize: '12', marginTop: '8px' }}
                                          underline={false}
                                        >
                                          {__$$eval(() => item.description || '-')}
                                        </Typography.Paragraph>
                                      </Col>
                                      <Col __component_name="Col">
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
                                          placement="bottomLeft"
                                          trigger={['hover']}
                                        >
                                          <AntdIconSettingOutlined __component_name="AntdIconSettingOutlined" />
                                        </Dropdown>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" flex="" span={24}>
                                <Divider
                                  __component_name="Divider"
                                  dashed={false}
                                  defaultOpen={false}
                                  mode="line"
                                  orientationMargin=""
                                  style={{ marginLeft: '-24px', width: 'calc(100% + 48px)' }}
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
                                        <Status
                                          __component_name="Status"
                                          id={__$$eval(() => item.isPublic + '')}
                                          types={[
                                            { children: '未发布', id: 'false', type: 'disabled' },
                                            { children: '发布成功', id: 'true', type: 'success' },
                                          ]}
                                        />
                                      ),
                                      key: '1efg6rtctqk',
                                      label: '状态',
                                      span: 1,
                                    },
                                  ]}
                                  labelStyle={{ padding: '12px 0 0 0', width: '76' }}
                                  layout="horizontal"
                                  size="small"
                                  style={{ marginTop: '-16px' }}
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
              </Row>
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={24}>
                  <Pagination
                    __component_name="Pagination"
                    current={__$$eval(() => this.state.pages.currentPage)}
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
            message="确认删除此模型应用？"
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
            return this.onCloseCreateModel.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.onSubmitCreate.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.createModalVisible)}
          title="新增应用"
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 6,
              layout: 'horizontal',
              wrapperCol: 18,
            }}
            formHelper={{ autoFocus: true }}
            ref={this._refsManager.linkRef('create_form')}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                name: 'name',
                required: true,
                title: '模型应用名称',
                'x-validator': [],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                name: 'displayName',
                required: true,
                title: '模型应用别名',
                'x-validator': [],
              }}
            />
            <FormilyUpload
              __component_name="FormilyUpload"
              componentProps={{
                'x-component-props': {
                  accept: 'image/*',
                  beforeUpload: function () {
                    return this.checkFileSize.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  fileList: __$$eval(() => this.state.fileList),
                  listType: 'picture-circle',
                  maxCount: 1,
                  onChange: function () {
                    return this.handleImageChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true, size: 'default' } }}
              fieldProps={{
                name: '_icon',
                title: '上传',
                'x-component': 'FormilyUpload',
                'x-validator': [],
              }}
            >
              {!!__$$eval(() => !this.state.fileList.length) && (
                <AntdIconCloudUploadOutlined
                  __component_name="AntdIconCloudUploadOutlined"
                  style={{ fontSize: 40 }}
                />
              )}
            </FormilyUpload>
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                name: 'description',
                title: '描述',
                'x-component': 'Input.TextArea',
                'x-validator': [],
              }}
            />
          </FormilyForm>
        </Modal>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/model-app' }, location.pathname);
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
        <ModelAppList$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
