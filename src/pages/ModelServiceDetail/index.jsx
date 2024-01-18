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
  Image,
  Typography,
  Status,
  Dropdown,
  Space,
  Descriptions,
} from '@tenx-ui/materials';

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
    const model = this.state.detail.model;
    if (typeof model === 'string') {
      return model || '-';
    }
    if (typeof model === 'object') {
      const { name, namespace } = model;
      const result = name ? (namespace ? `${name}（${namespace}）` : name) : '-';
      return result;
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
                    <Image
                      __component_name="Image"
                      fallback=""
                      height={56}
                      preview={false}
                      src="data:image/png;base64,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"
                      style={{ transform: 'rotate(-90deg)' }}
                      width={56}
                    />
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
                                  children: '异常',
                                  id: 'False',
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
                              style={{ color: '#000000a6', fontSize: '12px', paddingTop: '2px' }}
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
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(() =>
                          this.getFullDescribe({
                            key: 'types',
                          })
                        )}
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
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(() =>
                          this.getFullDescribe({
                            key: 'modelTypes',
                          })
                        )}
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
