// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  FormilyForm,
  FormilyInput,
  Container,
  Image,
  FormilyUpload,
  FormilyFormItem,
  FormilyTextArea,
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
  Tooltip,
  Pagination,
} from '@tenx-ui/materials';

import {
  AntdIconCloudUploadOutlined,
  AntdIconPlusOutlined,
  AntdIconReloadOutlined,
  AntdIconSettingOutlined,
  AntdIconInfoCircleOutlined,
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
      createBtnLoading: false,
      createModalVisible: false,
      currentRecord: null,
      data: [],
      deleteLoading: false,
      deleteModalVisible: false,
      editBtnLoading: false,
      editModalVisible: false,
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

  beforeUpload() {}

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

  handleEditImageChange({ fileList: newFileList }) {
    this.setState({
      fileList: newFileList,
    });
    this.getBase64(newFileList[0].originFileObj).then(res => {
      this.form('edit_form').setValues({
        imageUrl: res,
      });
      this.setState({
        imageUrl: res,
      });
      this.imageUrl = res;
    });
  }

  handleImageChange({ fileList: newFileList }) {
    this.setState({
      fileList: newFileList,
    });
    this.getBase64(newFileList[0].originFileObj).then(res => {
      this.form('create_form').setValues({
        imageUrl: res,
      });
      this.setState({
        imageUrl: res,
      });
      this.imageUrl = res;
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

  async handlePreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }
    this.setState({
      imageUrl: file.url || file.preview,
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
      createBtnLoading: false,
      imageUrl: '',
    });
  }

  onCloseDeleteModal() {
    this.setState({
      deleteModalVisible: false,
      currentRecord: null,
    });
  }

  onCloseEditModel() {
    this.setState({
      editModalVisible: false,
      editBtnLoading: false,
      imageUrl: '',
    });
  }

  onCreateClick(event) {
    this.history.push(`/model-app/create`);
  }

  onDelete() {
    this.setState({
      deleteLoading: true,
    });
    const project = this.utils.getAuthData()?.project;
    const params = {
      namespace: project,
      name: this.state.currentRecord.name,
    };
    //删除方法
    this.utils.bff
      .deleteApplication({
        input: params,
      })
      .then(res => {
        this.setState(
          {
            deleteLoading: false,
            pages: {
              ...this.state.pages,
              currentPage:
                this.state.pages.total % this.state.pages.pageSize === 1 &&
                Number.parseInt(this.state.pages.total / this.state.pages.pageSize) !== 0
                  ? this.state.pages.currentPage - 1
                  : this.state.pages.currentPage,
            },
          },
          () => {
            this.onCloseDeleteModal();
            this.getData();
          }
        );
        this.utils.notification.success({
          message: '删除智能体成功',
        });
      })
      .catch(error => {
        this.setState({
          deleteLoading: false,
        });
        this.utils.notification.warn({
          message: '删除智能体失败',
        });
      });
  }

  onDetailClick(e, extParams) {
    // 事件的 handler

    this.history.push(`/model-app/detail/${extParams.data.name}`);
  }

  onEdit() {
    this.setState({
      editBtnLoading: true,
    });
    this.form('edit_form')
      .validate()
      .then(res => {
        const values = this.form('edit_form').values;
        if (this.state.fileList[0]?.originFileObj) {
          this.getBase64(this.state.fileList[0].originFileObj).then(res => {
            const project = this.utils.getAuthData()?.project;
            const params = {
              namespace: project,
              name: values.name,
              displayName: values.displayName,
              description: values.description,
              icon: res,
            };
            this.utils.bff
              .updateApplication({
                input: params,
              })
              .then(res => {
                this.utils.notification.success({
                  message: '编辑成功',
                });
                this.setState({
                  editBtnLoading: false,
                });
                this.onCloseEditModel();
                this.getData();
              });
          });
        } else {
          const project = this.utils.getAuthData()?.project;
          const params = {
            namespace: project,
            name: values.name,
            displayName: values.displayName,
            description: values.description,
            icon: this.state.fileList[0].url,
          };
          this.utils.bff
            .updateApplication({
              input: params,
            })
            .then(res => {
              this.utils.notification.success({
                message: '编辑成功',
              });
              this.setState({
                editBtnLoading: false,
              });
              this.onCloseEditModel();
              this.getData();
            });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          editBtnLoading: false,
        });
      });
  }

  onMenuClick(opItem, record) {
    const { key, domEvent } = opItem;
    domEvent.stopPropagation();
    if (key === 'delete') {
      this.openDeleteModal(record.item);
    } else if (key === 'edit') {
      this.openEditModal(record.item);
    }
  }

  onOpenCreateModel() {
    this.setState(
      {
        createModalVisible: true,
      },
      () => {
        const pageThis = this;
        const imageUrl =
          'data:image/image/png;base64,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';
        setTimeout(() => {
          pageThis.form('create_form').setValues({
            imageUrl: imageUrl,
            icon: {
              fileList: [
                {
                  status: 'done',
                  url: imageUrl,
                  originFileObj: imageUrl,
                },
              ],
            },
          });
          this.setState({
            imageUrl: imageUrl,
            fileList: [
              {
                status: 'done',
                url: imageUrl,
              },
            ],
          });
        });
      }
    );
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
    this.setState({
      createBtnLoading: true,
    });
    this.form('create_form')
      .validate()
      .then(res => {
        const values = this.form('create_form').values;
        if (this.state.fileList[0]?.originFileObj) {
          this.getBase64(this.state.fileList[0].originFileObj).then(res => {
            const project = this.utils.getAuthData()?.project;
            const params = {
              namespace: project,
              name: values.name,
              displayName: values.displayName,
              icon: res,
              description: values.description,
            };
            this.utils.bff
              .createApplication({
                input: params,
              })
              .then(res => {
                this.utils.notification.success({
                  message: '创建成功',
                });
                this.setState({
                  createBtnLoading: false,
                });
                this.onCloseCreateModel();
                this.history.push(`/model-app/detail/${res.Application.createApplication.name}`);
              });
          });
        } else {
          const project = this.utils.getAuthData()?.project;
          const params = {
            namespace: project,
            name: values.name,
            displayName: values.displayName,
            description: values.description,
            icon: this.state.fileList[0].url,
          };
          this.utils.bff
            .createApplication({
              input: params,
            })
            .then(res => {
              this.utils.notification.success({
                message: '创建成功',
              });
              this.setState({
                createBtnLoading: false,
              });
              this.onCloseCreateModel();
              this.history.push(`/model-app/detail/${res.Application.createApplication.name}`);
            });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          createBtnLoading: false,
        });
      });
  }

  openDeleteModal(item) {
    this.setState({
      deleteModalVisible: true,
      currentRecord: item,
    });
  }

  openEditModal(item) {
    this.setState(
      {
        editModalVisible: true,
        currentRecord: item,
      },
      () => {
        const pageThis = this;
        setTimeout(() => {
          pageThis.form('edit_form')?.setValues({
            name: this.state.currentRecord.name,
            displayName: this.state.currentRecord.displayName,
            icon: {
              fileList: [
                {
                  status: 'done',
                  url: this.state.currentRecord.icon,
                },
              ],
            },
            description: this.state.currentRecord.description,
          });
        }, 500);
        this.setState({
          imageUrl: this.state.currentRecord.icon,
          fileList: [
            {
              status: 'done',
              url: this.state.currentRecord.icon,
            },
          ],
        });
      }
    );
  }

  showTotal(total, range) {
    // 用于格式化显示表格数据总量
    return `共 ${total} 条`;
  }

  validate(value, item) {
    if (!value?.fileList?.length) {
      return '请选择文件上传';
    }
  }

  async validatorName(v) {
    if (v) {
      try {
        const res = await this.utils.bff.getApplication({
          name: v,
          namespace: this.utils.getAuthData()?.project,
        });
        if (res?.Application?.getApplication?.metadata?.name) {
          return '智能体名称重复';
        }
      } catch (error) {}
    }
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
        <Modal
          __component_name="Modal"
          centered={false}
          className="model-app"
          confirmLoading={__$$eval(() => this.state.createBtnLoading)}
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
          title="新增智能体"
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
                'name': 'name',
                'required': true,
                'title': '智能体名称',
                'x-validator': [
                  {
                    children: '未知',
                    id: 'disabled',
                    message: "必须由小写字母数字和'-'或'.'组成，并且必须以字母数字开头和结尾",
                    pattern: '^[a-z0-9][a-z0-9.-]*[a-z0-9]$',
                    type: 'disabled',
                  },
                  {
                    children: '未知',
                    id: 'disabled',
                    triggerType: 'onBlur',
                    type: 'disabled',
                    validator: function () {
                      return this.validatorName.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this),
                  },
                ],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'displayName',
                'required': true,
                'title': '智能体别名',
                'x-validator': [],
              }}
            />
            {!!__$$eval(() => this.state.imageUrl) && (
              <Container
                __component_name="Container"
                style={{ left: '152px', position: 'absolute', top: '204px' }}
              >
                <Image
                  __component_name="Image"
                  fallback=""
                  height={60}
                  preview={false}
                  src={__$$eval(() => this.state.imageUrl)}
                  style={{}}
                  width={60}
                />
              </Container>
            )}
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
                  showUploadList: false,
                },
              }}
              decoratorProps={{
                'x-decorator-props': { asterisk: true, labelEllipsis: true, size: 'default' },
              }}
              fieldProps={{
                'name': 'icon',
                'required': false,
                'title': '上传',
                'x-component': 'FormilyUpload',
                'x-validator': [
                  {
                    children: '未知',
                    id: 'disabled',
                    required: false,
                    type: 'disabled',
                    validator: function () {
                      return this.validate.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this),
                  },
                ],
              }}
            >
              <FormilyFormItem
                __component_name="FormilyFormItem"
                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                fieldProps={{
                  'name': 'FormilyFormItem1',
                  'title': '',
                  'type': 'object',
                  'x-component': 'FormilyFormItem',
                  'x-display':
                    "{{$form.values?.icon?.fileList?.length > 0 ? 'hidden' : 'visible' }}",
                  'x-validator': [],
                }}
              >
                <AntdIconCloudUploadOutlined
                  __component_name="AntdIconCloudUploadOutlined"
                  style={{ color: '#4461EB', fontSize: 40 }}
                />
              </FormilyFormItem>
              {!!false && (
                <AntdIconCloudUploadOutlined
                  __component_name="AntdIconCloudUploadOutlined"
                  style={{ color: '#4461EB', fontSize: 40 }}
                />
              )}
            </FormilyUpload>
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'description',
                'title': '描述',
                'x-component': 'Input.TextArea',
                'x-validator': [],
              }}
            />
          </FormilyForm>
        </Modal>
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={1}
            >
              AI 智能体管理
            </Typography.Title>
          </Col>
          <Col __component_name="Col" span={24}>
            <Alert
              __component_name="Alert"
              message="AI 智能体全生命周期管理，支持应用编排、计费定价、查看对话记录及用户反馈"
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
                          新增智能体
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
                        <List.Item style={{ marginBottom: '16px' }}>
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
                            <Row
                              __component_name="Row"
                              gutter={['', 0]}
                              style={{ marginBottom: '0px', paddingBottom: '0px' }}
                              wrap={true}
                            >
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" gutter={[0, 0]} wrap={false}>
                                  <Col __component_name="Col" flex="56px">
                                    <Image
                                      __component_name="Image"
                                      fallback=""
                                      height={56}
                                      preview={false}
                                      src={__$$eval(() => item.icon)}
                                      width={56}
                                    />
                                  </Col>
                                  <Col __component_name="Col" flex="auto" span={19}>
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
                                            tooltip: false,
                                          }}
                                          mark={false}
                                          strong={false}
                                          style={{ fontSize: '12', marginTop: '4px' }}
                                          underline={false}
                                        >
                                          {__$$eval(() => item.description || '-')}
                                        </Typography.Paragraph>
                                      </Col>
                                      <Col __component_name="Col" style={{ zIndex: 3 }}>
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
                                          overlayStyle={{}}
                                          placement="bottomLeft"
                                          style={{}}
                                          trigger={['hover']}
                                        >
                                          <Button
                                            __component_name="Button"
                                            block={false}
                                            children=""
                                            danger={false}
                                            disabled={false}
                                            ghost={false}
                                            icon={
                                              <AntdIconSettingOutlined __component_name="AntdIconSettingOutlined" />
                                            }
                                            shape="default"
                                            size="small"
                                            style={{ borderColor: 'rgba(34,25,77,0)' }}
                                          />
                                        </Dropdown>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                              <Col
                                __component_name="Col"
                                span={24}
                                style={{ display: 'inline-block', textAlign: 'left' }}
                              />
                              <Col __component_name="Col" flex="" span={24}>
                                <Divider
                                  __component_name="Divider"
                                  dashed={false}
                                  defaultOpen={false}
                                  mode="line"
                                  orientationMargin=""
                                  style={{
                                    marginBottom: '0px',
                                    marginLeft: '-24px',
                                    marginTop: '24px',
                                    width: 'calc(100% + 48px)',
                                  }}
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
                                        <Row __component_name="Row" wrap={true}>
                                          <Col __component_name="Col" span={24}>
                                            <Row
                                              __component_name="Row"
                                              justify="space-between"
                                              wrap={false}
                                            >
                                              <Col __component_name="Col">
                                                <Status
                                                  __component_name="Status"
                                                  id={__$$eval(() => item.isPublic + '')}
                                                  types={[
                                                    {
                                                      children: '未部署',
                                                      id: 'false',
                                                      type: 'disabled',
                                                    },
                                                    {
                                                      children: '已部署',
                                                      id: 'true',
                                                      type: 'info',
                                                    },
                                                  ]}
                                                />
                                                <Tooltip
                                                  __component_name="Tooltip"
                                                  title={__$$eval(() => item.message || '-')}
                                                >
                                                  <AntdIconInfoCircleOutlined
                                                    __component_name="AntdIconInfoCircleOutlined"
                                                    style={{ marginLeft: '20px' }}
                                                  />
                                                </Tooltip>
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>
                                      ),
                                      key: 'jclso8ts01b',
                                      label: '状态',
                                      labelStyle: { marginTop: '0px' },
                                      span: 1,
                                    },
                                  ]}
                                  labelStyle={{ padding: '12px 0 0 0', width: '60px' }}
                                  layout="horizontal"
                                  size="small"
                                  style={{ marginTop: '0' }}
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
                              <Col
                                __component_name="Col"
                                flex=""
                                span={24}
                                style={{ marginTop: '16px' }}
                              />
                            </Row>
                            {!!__$$eval(() => item?.systemModel) && (
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{
                                  color: '#fff',
                                  fontSize: '',
                                  position: 'absolute',
                                  right: '2px',
                                  top: '6px',
                                  transform: 'rotate(45deg)',
                                }}
                              >
                                内置
                              </Typography.Text>
                            )}
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
                    onChange={function () {
                      return this.onChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
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
          centered={false}
          className="model-app"
          confirmLoading={__$$eval(() => this.state.editBtnLoading)}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.onCloseEditModel.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.onEdit.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={__$$eval(() => this.state.editModalVisible)}
          title="编辑智能体"
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
            ref={this._refsManager.linkRef('edit_form')}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'name',
                'required': true,
                'title': '智能体名称',
                'x-pattern': 'disabled',
                'x-validator': [],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'displayName',
                'required': true,
                'title': '智能体别名',
                'x-validator': [],
              }}
            />
            {!!__$$eval(() => this.state.imageUrl) && (
              <Container
                __component_name="Container"
                style={{ left: '152px', position: 'absolute', top: '204px' }}
              >
                <Image
                  __component_name="Image"
                  fallback=""
                  height={60}
                  preview={false}
                  src={__$$eval(() => this.state.imageUrl)}
                  style={{}}
                  width={60}
                />
              </Container>
            )}
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
                    return this.handleEditImageChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  showUploadList: false,
                },
              }}
              decoratorProps={{
                'x-decorator-props': { asterisk: true, labelEllipsis: true, size: 'default' },
              }}
              fieldProps={{
                'name': 'icon',
                'title': '上传',
                'x-component': 'FormilyUpload',
                'x-validator': [
                  {
                    children: '未知',
                    id: 'disabled',
                    type: 'disabled',
                    validator: function () {
                      return this.validate.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this),
                  },
                ],
              }}
            >
              <FormilyFormItem
                __component_name="FormilyFormItem"
                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                fieldProps={{
                  'name': 'FormilyFormItem1',
                  'title': '',
                  'type': 'object',
                  'x-component': 'FormilyFormItem',
                  'x-display':
                    "{{$form.values?.icon?.fileList?.length > 0 ? 'hidden' : 'visible' }}",
                  'x-validator': [],
                }}
              >
                <AntdIconCloudUploadOutlined
                  __component_name="AntdIconCloudUploadOutlined"
                  style={{ color: '#4461EB', fontSize: 40 }}
                />
              </FormilyFormItem>
              {!!false && (
                <AntdIconCloudUploadOutlined
                  __component_name="AntdIconCloudUploadOutlined"
                  style={{ color: '#4461EB', fontSize: 40 }}
                />
              )}
            </FormilyUpload>
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'description',
                'title': '描述',
                'x-component': 'Input.TextArea',
                'x-validator': [],
              }}
            />
          </FormilyForm>
        </Modal>
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
          title="删除智能体"
        >
          <Alert
            __component_name="Alert"
            message="确认删除此智能体？"
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
