// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  Alert,
  Button,
  Spin,
  Card,
  Row,
  Col,
  Typography,
  Status,
  Dropdown,
  Space,
  Descriptions,
} from '@tenx-ui/materials';

import { TenxIconModelIcon } from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class ModelServiceDetail$$Page extends React.Component {
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
      delModalVisible: false,
      detail: {},
      isOffFlag: undefined,
      loading: false,
      okLoading: false,
      onAndOffModalVisible: false,
      onOrOffLoading: false,
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    // console.log('will unmount');
  }

  async deleteModelServiceItemReq() {
    this.setState({
      okLoading: true,
    });
    const { name, namespace, type } = this.getBaseInfo();
    const deleteReq =
      type === 'local' ? this.utils.bff.deleteWorkers : this.utils.bff.deleteModelServices;
    const input = {
      name,
      namespace,
    };
    try {
      const res = await deleteReq({
        input,
      });
      this.utils.notification.success({
        message: '删除成功',
      });
      this.setState(
        {
          delModalVisible: false,
        },
        () => {
          this.history.go(-1);
        }
      );
    } catch (err) {
      const description = err?.response?.errors?.[0]?.message || '未知错误';
      this.utils.notification.warn({
        message: '删除失败',
        description,
      });
    } finally {
      this.setState({
        okLoading: false,
      });
    }
  }

  getBaseInfo() {
    const name = this.match.params?.name;
    const type = this.history.query?.type;
    const namespace = this.appHelper.utils.getAuthData().project;
    return {
      name,
      type,
      namespace,
    };
  }

  async getExternalModelServiceDetailReq() {
    const { name, namespace } = this.getBaseInfo();
    try {
      const res = await this.utils.bff.getModelService({
        name,
        namespace,
      });
      const detail = res?.ModelService?.getModelService || {};
      this.setState({
        detail,
      });
    } catch (err) {
      const description = err?.response?.errors?.[0]?.message || '未知错误';
      this.utils.notification.warn({
        message: '获取详情失败',
        description,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  getFullDescribe({ value, key }) {
    const _value = value || this.state.detail;
    return (key ? _value[key] : _value) || '-';
  }

  async getLocalModelServiceDetailReq() {
    const { name, namespace } = this.getBaseInfo();
    try {
      const res = await this.utils.bff.getWorker({
        name,
        namespace,
      });
      const detail = res?.Worker?.getWorker || {};
      const isOffFlag = ['offline', 'offlineinprogress'].includes(detail?.status?.toLowerCase());
      this.setState({
        detail,
        isOffFlag,
      });
    } catch (err) {
      const description = err?.response?.errors?.[0]?.message || '未知错误';
      this.utils.notification.warn({
        message: '获取详情失败',
        description,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  getOnOrOffInfo() {
    const { isOffFlag } = this.state;
    const label = isOffFlag ? '上线' : '下线';
    const replicas = isOffFlag ? '1' : '0';
    return {
      label,
      replicas,
    };
  }

  handleCpuData() {
    const unit = '核';
    let cpu = this.state.detail.resources?.cpu;
    if (!cpu) {
      cpu = '-';
    }
    if (typeof cpu === 'string') {
      cpu = cpu.toLowerCase().includes('m') ? parseInt(cpu) / 1000 : cpu;
    }
    return `${cpu} ${unit}`;
  }

  handleDelModalCancelClick() {
    this.setState({
      delModalVisible: false,
    });
  }

  handleDelModalOkClick() {
    this.deleteModelServiceItemReq();
  }

  handleMemoryData() {
    const memory = this.state.detail.resources?.memory;
    const reg = /m/i;
    const val = isNaN(parseInt(memory)) ? '-' : parseInt(memory);
    const unit = reg.test(memory) ? 'MiB' : 'GiB';
    return memory ? `${val} ${unit}` : '- GiB';
  }

  handleMenuClick(e) {
    switch (e.key) {
      case 'edit':
        this.linkToEditPage();
        break;
      case 'delete':
        this.openDelModal();
        break;
      default:
        this.openOnAndOffModal();
        break;
    }
  }

  handleModelData() {
    const isModelBuildIn = () => {
      const detail = this.state.detail;
      return detail?.namespace !== detail?.model?.namespace;
    };
    const model = this.state.detail.model;
    if (typeof model === 'string') {
      return model || '-';
    }
    if (typeof model === 'object') {
      const { name } = model;
      const result = name ? (isModelBuildIn() ? `${name}（内置）` : name) : '-';
      return result;
    }
    return '-';
  }

  handleModelTypes(key) {
    const _key = key || 'modelTypes';
    const type = this.state.detail[_key];
    const llmReg = /llm/i;
    if (type) {
      return type
        ?.split(',')
        ?.map(item => {
          if (llmReg.test(item)) {
            return item.toUpperCase();
          }
          return item.charAt(0)?.toUpperCase() + item.slice(1);
        })
        .join(',');
    }
    return '-';
  }

  handleOnOrOffModalCancelClick() {
    this.setState({
      onAndOffModalVisible: false,
    });
  }

  handleOnOrOffModalOkClick() {
    this.updateWorkerReq();
  }

  initServiceDetailData() {
    const { type } = this.getBaseInfo();
    this.setState({
      loading: true,
    });
    if (type === 'local') {
      this.getLocalModelServiceDetailReq();
      return;
    }
    this.getExternalModelServiceDetailReq();
  }

  linkToEditPage() {
    const { name, type } = this.getBaseInfo();
    this.history.push(`/model-service/editModelService?name=${name}&type=${type}`);
  }

  openDelModal() {
    this.setState({
      delModalVisible: true,
    });
  }

  openOnAndOffModal() {
    this.setState({
      onAndOffModalVisible: true,
    });
  }

  testFunc() {
    // console.log('test aliLowcode func');
    return <div className="test-aliLowcode-func">{this.state.test}</div>;
  }

  async updateWorkerReq() {
    const { name, namespace } = this.getBaseInfo();
    const { label, replicas } = this.getOnOrOffInfo();
    const {
      detail: { displayName, description, resources },
    } = this.state;
    const input = {
      name,
      namespace,
      displayName,
      description,
      resources,
      replicas,
    };
    this.setState({
      onOrOffLoading: true,
    });
    try {
      const res = await this.utils.bff.updateWorker({
        input,
      });
      this.utils.notification.success({
        message: `${label}成功`,
      });
      this.setState(
        {
          onAndOffModalVisible: false,
        },
        () => {
          setTimeout(this.initServiceDetailData.bind(this), 500);
        }
      );
    } catch (err) {
      const description = err?.response?.errors?.[0]?.message || '未知错误';
      this.utils.notification.warn({
        message: `${label}失败`,
        description,
      });
    } finally {
      this.setState({
        onOrOffLoading: false,
      });
    }
  }

  componentDidMount() {
    this.initServiceDetailData();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page style={{ position: 'relative' }}>
        <Modal
          __component_name="Modal"
          cancelButtonProps={{ disabled: false }}
          centered={false}
          confirmLoading={__$$eval(() => this.state.okLoading)}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          okButtonProps={{ disabled: false }}
          onCancel={function () {
            return this.handleDelModalCancelClick.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.handleDelModalOkClick.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.delModalVisible)}
          title="删除"
        >
          <Alert
            __component_name="Alert"
            bordered="dashed"
            message={__$$eval(() => `确定删除 ${this.state.detail?.displayName} 模型服务吗？`)}
            showIcon={true}
            type="warning"
          />
        </Modal>
        {!!__$$eval(() => this.state.onAndOffModalVisible) && (
          <Modal
            __component_name="Modal"
            cancelButtonProps={{ disabled: false }}
            centered={false}
            confirmLoading={__$$eval(() => this.state.onOrOffLoading)}
            destroyOnClose={true}
            forceRender={false}
            keyboard={true}
            mask={true}
            maskClosable={false}
            okButtonProps={{ disabled: false }}
            onCancel={function () {
              return this.handleOnOrOffModalCancelClick.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            onOk={function () {
              return this.handleOnOrOffModalOkClick.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            open={__$$eval(() => this.state.onAndOffModalVisible)}
            title={__$$eval(() => (this.state.isOffFlag ? '上线' : '下线'))}
          >
            <Alert
              __component_name="Alert"
              bordered="dashed"
              message={__$$eval(
                () =>
                  `确定${this.state.isOffFlag ? '上线' : '下线'} ${
                    this.state.detail?.displayName
                  } 模型服务吗？`
              )}
              showIcon={true}
              type="warning"
            />
          </Modal>
        )}
        <Button.Back
          __component_name="Button.Back"
          style={{ fontSize: '14px', lineHeight: '15px' }}
          title="模型服务详情"
          type="ghost"
        />
        <Spin
          __component_name="Spin"
          spinning={__$$eval(() => this.state.loading)}
          style={{ height: 'auto', left: '50%', top: '50%', width: 'auto' }}
        >
          <Card
            __component_name="Card"
            actions={[]}
            bordered={false}
            hoverable={false}
            loading={false}
            size="default"
            style={{ marginBottom: '16px', marginTop: '16px' }}
            type="default"
          >
            <Row
              __component_name="Row"
              align="middle"
              gutter={[0, 0]}
              justify="space-between"
              wrap={true}
            >
              <Col __component_name="Col" span={16}>
                <Row __component_name="Row" align="middle" gutter={[20, 0]} style={{}} wrap={true}>
                  <Col __component_name="Col">
                    <TenxIconModelIcon __component_name="TenxIconModelIcon" size={56} />
                  </Col>
                  <Col __component_name="Col" flex="1">
                    <Row __component_name="Row" gutter={[0, 8]} wrap={true}>
                      <Col __component_name="Col" span="">
                        <Typography.Title
                          __component_name="Typography.Title"
                          bold={true}
                          bordered={false}
                          ellipsis={true}
                          level={1}
                          style={{ fontSize: '16px', lineHeight: '20px' }}
                        >
                          {__$$eval(() => this.utils.getFullName(this.state.detail) || '-')}
                        </Typography.Title>
                      </Col>
                      <Col
                        __component_name="Col"
                        span={24}
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'row',
                          marginRight: '12xpx',
                        }}
                      >
                        <Row
                          __component_name="Row"
                          align="middle"
                          gutter={[0, 0]}
                          justify="start"
                          style={{ width: '100%' }}
                          wrap={true}
                        >
                          <Col
                            __component_name="Col"
                            flex=""
                            style={{ alignItems: 'center', display: 'flex', marginRight: '16px' }}
                          >
                            <Status
                              __component_name="Status"
                              id={__$$eval(() => this.state.detail.status || 'Unknown')}
                              style={{ fontSize: '12px', height: '22px', lineHeight: '20px' }}
                              types={[
                                { children: '未知', id: 'Unknown', type: 'disabled' },
                                {
                                  _unsafe_MixedSetter_children_select: 'StringSetter',
                                  children: '部署中',
                                  id: 'Pending',
                                  type: 'info',
                                },
                                {
                                  _unsafe_MixedSetter_children_select: 'StringSetter',
                                  children: '运行中',
                                  id: 'Running',
                                  type: 'success',
                                },
                                {
                                  _unsafe_MixedSetter_children_select: 'StringSetter',
                                  children: '删除中',
                                  id: 'Deleting',
                                  type: 'warning',
                                },
                                {
                                  _unsafe_MixedSetter_children_select: 'StringSetter',
                                  children: '异常',
                                  id: 'Error',
                                  type: 'error',
                                },
                                {
                                  _unsafe_MixedSetter_children_select: 'StringSetter',
                                  children: '已下线',
                                  id: 'Offline',
                                  type: 'warning',
                                },
                                {
                                  _unsafe_MixedSetter_children_select: 'StringSetter',
                                  children: '下线中',
                                  id: 'OfflineInProgress',
                                  type: 'info',
                                },
                                {
                                  _unsafe_MixedSetter_children_select: 'StringSetter',
                                  children: '正常',
                                  id: 'True',
                                  type: 'success',
                                },
                                {
                                  _unsafe_MixedSetter_children_select: 'StringSetter',
                                  _unsafe_MixedSetter_tooltip_select: 'VariableSetter',
                                  children: '异常',
                                  id: 'False',
                                  tooltip: __$$eval(() => this.state.detail.message),
                                  type: 'error',
                                },
                              ]}
                            />
                          </Col>
                          <Col
                            __component_name="Col"
                            flex=""
                            span=""
                            style={{
                              backgroundColor: '#E2E2E2',
                              display: 'inline-block',
                              fontSize: '14px',
                              height: '14px',
                              width: '1px',
                            }}
                          />
                          <Col
                            __component_name="Col"
                            style={{
                              alignItems: 'center',
                              color: 'rgba(0, 0, 0, 0.65)',
                              display: 'flex',
                              marginLeft: '16px',
                            }}
                          >
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ color: '#000000a6', fontSize: '12px', paddingTop: '1px' }}
                            >
                              更新时间：
                            </Typography.Text>
                            <Typography.Time
                              __component_name="Typography.Time"
                              format=""
                              relativeTime={true}
                              style={{ fontSize: '12px' }}
                              time={__$$eval(() =>
                                this.getFullDescribe({
                                  key: 'updateTimestamp',
                                })
                              )}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col __component_name="Col">
                {!!__$$eval(() => this.history.query?.type === 'local') && (
                  <Dropdown.Button
                    __component_name="Dropdown.Button"
                    danger={false}
                    destroyPopupOnHide={true}
                    disabled={false}
                    menu={{
                      items: [
                        {
                          _unsafe_MixedSetter_label_select: 'StringSetter',
                          key: 'edit',
                          label: '编辑',
                        },
                        {
                          _unsafe_MixedSetter_label_select: 'StringSetter',
                          key: 'delete',
                          label: '删除',
                        },
                      ],
                      onClick: function () {
                        return this.handleMenuClick.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this),
                    }}
                    onClick={function () {
                      return this.handleMenuClick.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    placement="bottomRight"
                    trigger={['hover']}
                    type="default"
                  >
                    {__$$eval(() => this.getOnOrOffInfo()?.label)}
                  </Dropdown.Button>
                )}
              </Col>
              {!!__$$eval(() => this.history.query?.type !== 'local') && (
                <Col __component_name="Col">
                  <Space __component_name="Space" align="center" direction="horizontal">
                    <Button
                      __component_name="Button"
                      block={false}
                      danger={false}
                      disabled={false}
                      ghost={false}
                      onClick={function () {
                        return this.linkToEditPage.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                    >
                      编辑
                    </Button>
                    <Button
                      __component_name="Button"
                      block={false}
                      danger={false}
                      disabled={false}
                      ghost={false}
                      onClick={function () {
                        return this.openDelModal.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                    >
                      删除
                    </Button>
                  </Space>
                </Col>
              )}
            </Row>
          </Card>
          {!!__$$eval(() => this.history.query?.type !== 'local') && (
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              key="local"
              loading={false}
              size="default"
              style={{}}
              type="default"
            >
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
                      <Typography.Text
                        __component_name="Typography.Text"
                        copyable={true}
                        disabled={false}
                        ellipsis={false}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(() =>
                          this.getFullDescribe({
                            key: 'id',
                          })
                        )}
                      </Typography.Text>
                    ),
                    key: 'lrm3jnlf8pf',
                    label: this.i18n('i18n-4hvq7ssv') /* ID */,
                    labelStyle: null,
                    span: 1,
                  },
                  {
                    _unsafe_MixedSetter_label_select: 'StringSetter',
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        外部模型
                      </Typography.Text>
                    ),
                    key: 'b1p31grk7v7',
                    label: '模型服务类型',
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        copyable={false}
                        disabled={false}
                        ellipsis={false}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(() => this.handleModelTypes('types'))}
                      </Typography.Text>
                    ),
                    key: 'go45kowxcpu',
                    label: this.i18n('i18n-vpux924a') /* 模型类型 */,
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Time
                        __component_name="Typography.Time"
                        format=""
                        relativeTime={false}
                        style={{ fontSize: '12px' }}
                        time={__$$eval(() =>
                          this.getFullDescribe({
                            key: 'creationTimestamp',
                          })
                        )}
                      />
                    ),
                    key: 'ciki4nv4w8g',
                    label: this.i18n('i18n-w9nvxdg4') /* 创建时间 */,
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(() =>
                          this.getFullDescribe({
                            key: 'creator',
                          })
                        )}
                      </Typography.Text>
                    ),
                    key: '5zn4d3pdmqh',
                    label: this.i18n('i18n-ljfukqf4') /* 创建者 */,
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(() =>
                          this.getFullDescribe({
                            key: 'apiType',
                          })
                        )}
                      </Typography.Text>
                    ),
                    key: '3sazqsbj1wd',
                    label: this.i18n('i18n-glkas5dt') /* 服务供应商 */,
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '14px' }}
                      >
                        {__$$eval(() =>
                          this.getFullDescribe({
                            key: 'baseUrl',
                          })
                        )}
                      </Typography.Text>
                    ),
                    key: 'dkm7fcd4lhg',
                    label: this.i18n('i18n-v57sro4s') /* 服务地址 */,
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(() =>
                          this.getFullDescribe({
                            key: 'token',
                          })
                        )}
                      </Typography.Text>
                    ),
                    key: '3b9p0wnrc8f',
                    label: this.i18n('i18n-6h2qbk6l') /* Token */,
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Paragraph
                        code={false}
                        delete={false}
                        disabled={false}
                        editable={false}
                        ellipsis={{
                          _unsafe_MixedSetter_tooltip_select: 'ObjectSetter',
                          expandable: false,
                          rows: 2,
                          tooltip: {
                            _unsafe_MixedSetter_title_select: 'VariableSetter',
                            title: __$$eval(() =>
                              this.getFullDescribe({
                                key: 'description',
                              })
                            ),
                          },
                        }}
                        mark={false}
                        strong={false}
                        style={{ fontSize: '', width: '80%' }}
                        type="colorTextDescription"
                        underline={false}
                      >
                        {__$$eval(() =>
                          this.getFullDescribe({
                            key: 'description',
                          })
                        )}
                      </Typography.Paragraph>
                    ),
                    key: 'p5ek0awahr',
                    label: this.i18n('i18n-txt5kh4m') /* 描述 */,
                    span: 1,
                  },
                ]}
                labelStyle={{ width: 100 }}
                layout="horizontal"
                size="default"
                style={{}}
                title="详细信息"
              />
            </Card>
          )}
          {!!__$$eval(() => this.history.query?.type === 'local') && (
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={false}
              size="default"
              type="default"
            >
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
                      <Typography.Text
                        __component_name="Typography.Text"
                        copyable={true}
                        disabled={false}
                        ellipsis={false}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(() =>
                          this.getFullDescribe({
                            key: 'id',
                          })
                        )}
                      </Typography.Text>
                    ),
                    key: 'lrm3jnlf8pf',
                    label: this.i18n('i18n-4hvq7ssv') /* ID */,
                    labelStyle: null,
                    span: 1,
                  },
                  {
                    _unsafe_MixedSetter_label_select: 'StringSetter',
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        本地模型
                      </Typography.Text>
                    ),
                    key: 'fzj9h513jac',
                    label: '模型服务类型',
                    span: 1,
                  },
                  {
                    _unsafe_MixedSetter_children_select: 'SlotSetter',
                    _unsafe_MixedSetter_label_select: 'StringSetter',
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        copyable={true}
                        disabled={false}
                        ellipsis={false}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(() =>
                          this.getFullDescribe({
                            key: 'api',
                          })
                        )}
                      </Typography.Text>
                    ),
                    key: 'wdifgpbo6x',
                    label: 'API地址',
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={false}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(() => this.handleModelTypes())}
                      </Typography.Text>
                    ),
                    key: 'go45kowxcpu',
                    label: this.i18n('i18n-vpux924a') /* 模型类型 */,
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Time
                        __component_name="Typography.Time"
                        format=""
                        relativeTime={false}
                        time={__$$eval(() =>
                          this.getFullDescribe({
                            key: 'creationTimestamp',
                          })
                        )}
                      />
                    ),
                    key: 'ciki4nv4w8g',
                    label: this.i18n('i18n-w9nvxdg4') /* 创建时间 */,
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(() =>
                          this.getFullDescribe({
                            key: 'creator',
                          })
                        )}
                      </Typography.Text>
                    ),
                    key: '5zn4d3pdmqh',
                    label: this.i18n('i18n-ljfukqf4') /* 创建者 */,
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(() => this.handleModelData())}
                      </Typography.Text>
                    ),
                    key: '0o3tlvtap77d',
                    label: this.i18n('i18n-vgl4ncps') /* 模型 */,
                    span: 1,
                  },
                  {
                    children: (
                      <Typography.Paragraph
                        code={false}
                        delete={false}
                        disabled={false}
                        editable={false}
                        ellipsis={{
                          _unsafe_MixedSetter_tooltip_select: 'ObjectSetter',
                          expandable: false,
                          rows: 2,
                          tooltip: {
                            title:
                              '蚂蚁的企业级产品是蚂蚁的企业级产品是蚂蚁的企业级产品是蚂蚁的企业级产品是蚂蚁的企业级产品是蚂蚁的企业级产品是蚂蚁的企业级产品是蚂蚁的企业级产品是蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。',
                          },
                        }}
                        mark={false}
                        strong={false}
                        style={{ fontSize: '', width: '80%' }}
                        type="colorTextDescription"
                        underline={false}
                      >
                        {__$$eval(() =>
                          this.getFullDescribe({
                            key: 'description',
                          })
                        )}
                      </Typography.Paragraph>
                    ),
                    key: 'p5ek0awahr',
                    label: this.i18n('i18n-txt5kh4m') /* 描述 */,
                    span: 1,
                  },
                  {
                    children: (
                      <Row
                        __component_name="Row"
                        gutter={['', '']}
                        style={{ width: '100%' }}
                        wrap={false}
                      >
                        <Col __component_name="Col" span={24}>
                          <Row
                            __component_name="Row"
                            gutter={[0, 0]}
                            style={{ marginBottom: '8px' }}
                            wrap={true}
                          >
                            <Col __component_name="Col" span={1}>
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '12px' }}
                              >
                                CPU
                              </Typography.Text>
                            </Col>
                            <Col __component_name="Col">
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '12px' }}
                              >
                                {__$$eval(() => this.handleCpuData())}
                              </Typography.Text>
                            </Col>
                          </Row>
                          <Row
                            __component_name="Row"
                            gutter={[0, 0]}
                            style={{ marginBottom: '8px' }}
                            wrap={true}
                          >
                            <Col __component_name="Col" span={1}>
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '12px' }}
                              >
                                内存
                              </Typography.Text>
                            </Col>
                            <Col __component_name="Col">
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '12px' }}
                              >
                                {__$$eval(() => this.handleMemoryData())}
                              </Typography.Text>
                            </Col>
                          </Row>
                          <Row __component_name="Row" gutter={[0, 0]} wrap={true}>
                            <Col __component_name="Col" span={1}>
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '12px' }}
                              >
                                GPU
                              </Typography.Text>
                            </Col>
                            <Col __component_name="Col">
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '12px' }}
                              >
                                {__$$eval(
                                  () => `${this.state.detail.resources?.nvidiaGPU || '-'} 颗`
                                )}
                              </Typography.Text>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ),
                    key: '45yg37my717',
                    label: this.i18n('i18n-bwjy26tq') /* 服务规格 */,
                    span: 1,
                  },
                ]}
                labelStyle={{ width: 100 }}
                layout="horizontal"
                size="default"
                title="详细信息"
              />
            </Card>
          )}
        </Spin>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/model-service/detail/:name' }, location.pathname);
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
          params: undefined,
          enableLocationSearch: undefined,
        },
      ]}
      render={dataProps => (
        <ModelServiceDetail$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
