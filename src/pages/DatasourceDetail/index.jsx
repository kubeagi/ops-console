// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Row,
  Col,
  Space,
  Button,
  Card,
  Image,
  Typography,
  Status,
  Divider,
  Tabs,
  Descriptions,
  Container,
  Input,
  Table,
  Empty,
  Modal,
  FormilyForm,
  FormilyUpload,
  FormilyFormItem,
  FormilyInput,
  FormilyTextArea,
  Alert,
} from '@tenx-ui/materials';

import {
  AntdIconPlusOutlined,
  AntdIconReloadOutlined,
  TenxIconUpload,
  AntdIconWarningFilled,
} from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class DatasourceDetail$$Page extends React.Component {
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
      currentPage: 1,
      dataSourceDetail: {},
      deleteVisible: false,
      editVisible: false,
      loading: false,
      tableData: [],
      timer: undefined,
      total: 3,
      uploadFileVisible: false,
    };
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {}

  cancelDelete() {
    this.setState({
      deleteVisible: false,
    });
  }

  cancelEdit() {
    this.setState({
      editVisible: false,
    });
  }

  cancelUploadFile() {
    this.setState({
      uploadFileVisible: false,
    });
  }

  clickDeleteBtn() {
    this.setState({
      deleteVisible: true,
    });
  }

  clickEditBtn() {
    this.setState({
      editVisible: true,
    });
    this.initEditForm();
  }

  clickUploadFileBtn() {
    this.setState({
      uploadFileVisible: true,
    });
  }

  async deleteDatasource() {
    this.setState({
      loading: true,
    });
    try {
      await this.utils.bff.deleteDatasources({
        input: {
          name: this.getData()?.name,
          namespace: this.utils.getAuthData()?.project,
        },
      });
      this.setState({
        deleteVisible: true,
      });
      this.utils.notification.success({
        message: this.i18n('i18n-vf1xe64m'),
      });
      setTimeout(() => {
        this.history?.go(-1);
        this.setState({
          loading: false,
        });
      }, 200);
    } catch (error) {
      this.setState({
        loading: false,
      });
      this.utils.notification.warnings({
        message: this.i18n('i18n-yc0jhxgr'),
        errors: error?.response?.errors,
      });
    }
  }

  deleteFile(event, record) {
    console.log(record);
    const newData = this.state.tableData.filter(item => item.id !== record.id);
    console.log(newData);
    this.setState(state => {
      return {
        tableData: newData,
        total: state.total - 1,
      };
    });
  }

  downloadFile(event, record) {
    console.log(record);
    try {
      let file = `file content`;
      const blob = new Blob([file], {
        type: 'text/html;charset=utf-8',
      }); // 创建 Blob 对象
      const url = URL.createObjectURL(blob); // 创建 URL
      const a = document.createElement('a');
      a.href = url; // 设置链接地址
      a.download = record.fileName; // 设置文件名
      a.click(); // 模拟点击链接进行下载
      URL.revokeObjectURL(url); // 释放 URL
    } catch (error) {
      // console.log(error)
    }
  }

  editDatasource() {
    const form = this.$('edit_form_ref')?.formRef?.current?.form;
    const isCreate = false;
    form.submit(async v => {
      this.setState({
        loading: true,
      });
      const params = {
        input: {
          name: v?.name,
          displayName: v?.displayName,
          namespace: this.utils.getAuthData()?.project,
          description: v?.description,
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
        this.refresh();
        this.setState({
          loading: false,
          editVisible: false,
        });
      } catch (error) {
        this.utils.notification.warnings({
          message: this.i18n(api.faildMessage),
          errors: error?.response?.errors,
        });
        this.setState({
          loading: false,
        });
      }
    });
  }

  getData() {
    const data = this.props.useGetDatasource?.data?.Datasource?.getDatasource || {};
    return {
      ...data,
      type:
        {
          web: 'onLine',
          oss: 'objectStorage',
          unknown: 'onLine',
          postgresql: 'postgresql',
        }[data?.type] || 'web',
    };
  }

  getName() {
    return this.utils.getFullName(this.getData());
  }

  initEditForm() {
    const record = this.getData();
    const form = this.$('edit_form_ref')?.formRef?.current?.form;
    this.state.timer && clearTimeout(this.state.timer);
    if (form) {
      form.setValues({
        ...(record || {}),
        bucket: record?.oss?.bucket,
        object: record?.oss?.object,
      });
      return;
    }
    this.setState({
      timer: setTimeout(() => {
        this.initEditForm();
      }, 200),
    });
  }

  loadData() {
    console.log(this);
    console.log(ArcadiaBffSDK);
    const { sdk } = ArcadiaBffSDK;
    // sdk.getDatasourcesPaged()
    // .then(res=>{
    //   console.log(res)
    // })

    console.log('match', this.match);
    console.log('id', this.match.params.id);
    this.setState(
      {
        loading: true,
        dataSourceDetail: {
          name: '数据源1',
          description: '数据源1的描述信息',
          createTime: '2023.10.11 00:00:10',
        },
        tableData: [
          {
            id: 1,
            fileName: '文件1',
            status: 'success',
            fileSize: 10240,
            importTime: '2023.11.11 10:10:10',
          },
          {
            id: 2,
            fileName: '文件2',
            status: 'failed',
            fileSize: 1024,
            importTime: '2023.11.12 11:10:10',
          },
          {
            id: 3,
            fileName: '文件3',
            status: 'importing',
            fileSize: 20480,
            importTime: '2023.11.14 12:10:10',
          },
        ],
        total: 3,
      },
      () => {
        this.setState({
          loading: false,
        });
      }
    );
  }

  refresh() {
    this.props.useGetDatasource?.mutate();
  }

  search(event) {
    console.log(event.target.value);
    const newData = this.state.tableData.filter(
      item => item.fileName.indexOf(event.target.value) > -1
    );
    this.setState({
      tableData: newData,
    });
  }

  selectFileChange(event) {
    console.log(event);
    const maxFileSize = 2 * 1024 * 1024 * 1024;
    if (event.file.size > maxFileSize) {
      event.fileList = event.fileList.filter(item => {
        return item.uid !== event.file.uid;
      });
      this.utils.notification.warnings({
        message: '文件：' + event.file.name + '内容过大',
      });
    }
  }

  sizeTostr(size) {
    var data = '';
    if (size < 0.1 * 1024) {
      //如果小于0.1KB转化成B
      data = size.toFixed(2) + 'B';
    } else if (size < 0.1 * 1024 * 1024) {
      //如果小于0.1MB转化成KB
      data = (size / 1024).toFixed(2) + 'KB';
    } else if (size < 0.1 * 1024 * 1024 * 1024) {
      //如果小于0.1GB转化成MB
      data = (size / (1024 * 1024)).toFixed(2) + 'MB';
    } else {
      //其他转化成GB
      data = (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    }
    var sizestr = data + '';
    var len = sizestr.indexOf('.');
    var dec = sizestr.substr(len + 1, 2);
    if (dec == '00') {
      //当小数点后为00时 去掉小数部分
      return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
  }

  tablePageChange(value) {
    this.setState({
      currentPage: value,
    });
  }

  uploadFile() {}

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page style={{ backgroundColor: '#f0f0f0' }}>
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Space __component_name="Space" align="center" direction="horizontal">
              <Button.Back
                __component_name="Button.Back"
                style={{}}
                title="数据源详情"
                type="primary"
              />
            </Space>
          </Col>
          <Col __component_name="Col" span={24}>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={false}
              size="default"
              type="default"
            >
              <Row __component_name="Row" wrap={false}>
                <Col __component_name="Col" flex="auto">
                  <Row __component_name="Row" wrap={false}>
                    <Col __component_name="Col" flex="84px">
                      <Image
                        __component_name="Image"
                        fallback=""
                        height={64}
                        preview={false}
                        src={__$$eval(
                          () =>
                            this.utils
                              .getDataSourceTypes(this)
                              ?.find(item => item.value === this.getData().type)?.icon || '-'
                        )}
                        style={{ marginRight: '20px' }}
                        width={64}
                      />
                    </Col>
                    <Col __component_name="Col" flex="auto">
                      <Row __component_name="Row" gutter={['', 16]} wrap={true}>
                        <Col __component_name="Col" span={24}>
                          <Typography.Title
                            __component_name="Typography.Title"
                            bold={true}
                            bordered={false}
                            ellipsis={true}
                            level={1}
                          >
                            {__$$eval(() => this.getName())}
                          </Typography.Title>
                        </Col>
                        <Col __component_name="Col" span={24}>
                          <Space __component_name="Space" align="center" direction="horizontal">
                            <Status
                              __component_name="Status"
                              id={__$$eval(() => this.getData().status)}
                              types={__$$eval(() => this.utils.getDataSourceStatus(this, true))}
                            />
                            <Divider
                              __component_name="Divider"
                              dashed={false}
                              defaultOpen={false}
                              mode="default"
                              type="vertical"
                            />
                          </Space>
                          <Typography.Text
                            __component_name="Typography.Text"
                            disabled={false}
                            ellipsis={true}
                            strong={false}
                            style={{ fontSize: '' }}
                          >
                            ID:
                          </Typography.Text>
                          <Typography.Text
                            __component_name="Typography.Text"
                            disabled={false}
                            ellipsis={true}
                            strong={false}
                            style={{ fontSize: '' }}
                          >
                            {__$$eval(() => this.getData()?.id || '-')}
                          </Typography.Text>
                          <Divider
                            __component_name="Divider"
                            dashed={false}
                            defaultOpen={false}
                            mode="default"
                            type="vertical"
                          />
                          <Typography.Text
                            __component_name="Typography.Text"
                            disabled={false}
                            ellipsis={true}
                            strong={false}
                            style={{ fontSize: '' }}
                          >
                            更新时间：
                          </Typography.Text>
                          <Typography.Time
                            __component_name="Typography.Time"
                            format=""
                            relativeTime={false}
                            time={__$$eval(() => this.getData()?.updateTimestamp)}
                          />
                          <Divider
                            __component_name="Divider"
                            dashed={false}
                            defaultOpen={false}
                            mode="default"
                            type="vertical"
                          />
                          <Typography.Text
                            __component_name="Typography.Text"
                            disabled={false}
                            ellipsis={true}
                            strong={false}
                            style={{ fontSize: '' }}
                          >
                            创建时间：
                          </Typography.Text>
                          <Typography.Time
                            __component_name="Typography.Time"
                            format=""
                            relativeTime={false}
                            time={__$$eval(() => this.getData()?.creationTimestamp)}
                          />
                          <Divider
                            __component_name="Divider"
                            dashed={false}
                            defaultOpen={false}
                            mode="default"
                            type="vertical"
                          />
                          <Typography.Text
                            __component_name="Typography.Text"
                            disabled={false}
                            ellipsis={true}
                            strong={false}
                            style={{ fontSize: '' }}
                          >
                            创建者：
                          </Typography.Text>
                          <Typography.Text
                            __component_name="Typography.Text"
                            disabled={false}
                            ellipsis={true}
                            strong={false}
                            style={{ fontSize: '' }}
                          >
                            {__$$eval(() => this.getData()?.creator || '-')}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col __component_name="Col" flex="135px" style={{ display: 'flex' }}>
                  <Space __component_name="Space" align="center" direction="horizontal">
                    <Button
                      __component_name="Button"
                      block={false}
                      danger={false}
                      disabled={false}
                      ghost={false}
                      onClick={function () {
                        return this.clickEditBtn.apply(
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
                        return this.clickDeleteBtn.apply(
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
              </Row>
            </Card>
          </Col>
          <Col __component_name="Col" span={24}>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={false}
              size="default"
              style={{}}
              type="default"
            >
              <Tabs
                __component_name="Tabs"
                activeKey=""
                destroyInactiveTabPane="true"
                items={[
                  {
                    children: [
                      !!__$$eval(() => this.getData().type === 'objectStorage') && (
                        <Descriptions
                          __component_name="Descriptions"
                          bordered={false}
                          borderedBottom={false}
                          borderedBottomDashed={false}
                          colon={false}
                          column={2}
                          id=""
                          items={[
                            {
                              children: (
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                >
                                  {__$$eval(
                                    () =>
                                      this.utils
                                        .getDataSourceTypes(this)
                                        ?.find(item => item.value === this.getData().type)
                                        ?.children || '-'
                                  )}
                                </Typography.Text>
                              ),
                              key: 'znsxqm9jvg',
                              label: '数据来源',
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
                                  {__$$eval(() => this.getData()?.endpoint?.url || '-')}
                                </Typography.Text>
                              ),
                              key: 'ylkewexl94s',
                              label: '服务地址',
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
                                  {__$$eval(() => this.getData()?.oss?.bucket || '-')}
                                </Typography.Text>
                              ),
                              key: 'znsxqm9jvg',
                              label: 'Bucket',
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
                                  {__$$eval(() => this.getData()?.description || '-')}
                                </Typography.Text>
                              ),
                              key: 'bmtu55oldgu',
                              label: '描述',
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
                                  {__$$eval(() => this.getData()?.oss?.object || '-')}
                                </Typography.Text>
                              ),
                              key: 'dytrj9jc2ps',
                              label: 'Object',
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
                                    this.getData()?.endpoint?.insecure ? 'HTTP' : 'HTTPS'
                                  )}
                                </Typography.Text>
                              ),
                              key: '5bdfutwg6vd',
                              label: '协议类型',
                              span: 1,
                            },
                          ]}
                          labelStyle={{ width: 100 }}
                          layout="horizontal"
                          size="default"
                          title=""
                          key="node_ocloo1oktwh"
                        >
                          <Descriptions.Item key="7u6hhq5r76c" label="ID" span={1}>
                            {null}
                          </Descriptions.Item>
                          <Descriptions.Item key="7yk3a5jlohw" label="数据来源" span={1}>
                            {null}
                          </Descriptions.Item>
                          <Descriptions.Item key="06xockdofixg" label="文件数" span={1}>
                            {null}
                          </Descriptions.Item>
                          <Descriptions.Item key="itgwws5yosa" label="创建时间" span={1}>
                            {null}
                          </Descriptions.Item>
                          <Descriptions.Item key="g5rygvbd6v" label="创建者" span={1}>
                            {null}
                          </Descriptions.Item>
                          <Descriptions.Item key="bmtu55oldgu" label="描述" span={1}>
                            {null}
                          </Descriptions.Item>
                        </Descriptions>
                      ),
                      <Descriptions
                        __component_name="Descriptions"
                        bordered={false}
                        borderedBottom={false}
                        borderedBottomDashed={false}
                        colon={false}
                        column={2}
                        id=""
                        items={[
                          {
                            children: (
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(
                                  () =>
                                    this.utils
                                      .getDataSourceTypes(this)
                                      ?.find(item => item.value === this.getData().type)
                                      ?.children || '-'
                                )}
                              </Typography.Text>
                            ),
                            key: 'znsxqm9jvg',
                            label: '数据来源',
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
                                {__$$eval(() => this.getData()?.endpoint?.url || '-')}
                              </Typography.Text>
                            ),
                            key: 'ylkewexl94s',
                            label: '服务地址',
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
                                {__$$eval(() => this.getData()?.pg?.database || '-')}
                              </Typography.Text>
                            ),
                            key: 'znsxqm9jvg',
                            label: '数据库',
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
                                {__$$eval(() => this.getData()?.description || '-')}
                              </Typography.Text>
                            ),
                            key: 'bmtu55oldgu',
                            label: '描述',
                            span: 1,
                          },
                        ]}
                        labelStyle={{ width: 100 }}
                        layout="horizontal"
                        size="default"
                        title=""
                        key="node_oclub1rxli5"
                      >
                        <Descriptions.Item key="7u6hhq5r76c" label="ID" span={1}>
                          {null}
                        </Descriptions.Item>
                        <Descriptions.Item key="7yk3a5jlohw" label="数据来源" span={1}>
                          {null}
                        </Descriptions.Item>
                        <Descriptions.Item key="06xockdofixg" label="文件数" span={1}>
                          {null}
                        </Descriptions.Item>
                        <Descriptions.Item key="itgwws5yosa" label="创建时间" span={1}>
                          {null}
                        </Descriptions.Item>
                        <Descriptions.Item key="g5rygvbd6v" label="创建者" span={1}>
                          {null}
                        </Descriptions.Item>
                        <Descriptions.Item key="bmtu55oldgu" label="描述" span={1}>
                          {null}
                        </Descriptions.Item>
                      </Descriptions>,
                      !!__$$eval(() => this.getData().type === 'onLine') && (
                        <Descriptions
                          __component_name="Descriptions"
                          bordered={false}
                          borderedBottom={false}
                          borderedBottomDashed={false}
                          colon={false}
                          column={2}
                          id=""
                          items={[
                            {
                              children: (
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                >
                                  {__$$eval(
                                    () =>
                                      this.utils
                                        .getDataSourceTypes(this)
                                        ?.find(item => item.value === this.getData().type)
                                        ?.children || '-'
                                  )}
                                </Typography.Text>
                              ),
                              key: 'znsxqm9jvg',
                              label: '数据来源',
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
                                  {__$$eval(() => this.getData()?.endpoint?.url || '-')}
                                </Typography.Text>
                              ),
                              key: 'ylkewexl94s',
                              label: 'URL',
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
                                  {__$$eval(() => this.getData()?.description || '-')}
                                </Typography.Text>
                              ),
                              key: 'bmtu55oldgu',
                              label: '描述',
                              span: 1,
                            },
                          ]}
                          labelStyle={{ width: 100 }}
                          layout="horizontal"
                          size="default"
                          title=""
                          key="node_ocls15ywt53"
                        >
                          <Descriptions.Item key="7u6hhq5r76c" label="ID" span={1}>
                            {null}
                          </Descriptions.Item>
                          <Descriptions.Item key="7yk3a5jlohw" label="数据来源" span={1}>
                            {null}
                          </Descriptions.Item>
                          <Descriptions.Item key="06xockdofixg" label="文件数" span={1}>
                            {null}
                          </Descriptions.Item>
                          <Descriptions.Item key="itgwws5yosa" label="创建时间" span={1}>
                            {null}
                          </Descriptions.Item>
                          <Descriptions.Item key="g5rygvbd6v" label="创建者" span={1}>
                            {null}
                          </Descriptions.Item>
                          <Descriptions.Item key="bmtu55oldgu" label="描述" span={1}>
                            {null}
                          </Descriptions.Item>
                        </Descriptions>
                      ),
                    ],
                    disabled: false,
                    key: 'base-info',
                    label: '基本信息',
                  },
                  {
                    children: (
                      <Container __component_name="Container">
                        <Row __component_name="Row" justify="space-between" wrap={false}>
                          <Col
                            __component_name="Col"
                            span={12}
                            style={{ display: 'flex', justifyContent: 'flex-start' }}
                          >
                            <Button
                              __component_name="Button"
                              block={false}
                              danger={false}
                              disabled={false}
                              ghost={false}
                              icon={
                                <AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />
                              }
                              onClick={function () {
                                return this.clickUploadFileBtn.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              shape="default"
                              type="primary"
                            >
                              上传文件
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
                              loading={false}
                              onClick={function () {
                                return this.refresh.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              shape="default"
                              style={{ marginLeft: '12px', marginRight: '12px' }}
                              type="default"
                            >
                              刷新
                            </Button>
                            <Input.Search
                              __component_name="Input.Search"
                              loading={false}
                              onChange={function () {
                                return this.search.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              placeholder="请输入文件名称搜索"
                              style={{ width: '220px' }}
                            />
                            <Container
                              __component_name="Container"
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                marginLeft: '12px',
                                marginRight: '12px',
                              }}
                            >
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '', lineHeight: '60px' }}
                              >
                                共有文件：113个
                              </Typography.Text>
                            </Container>
                            <Container
                              __component_name="Container"
                              style={{ alignItems: 'center', display: 'flex' }}
                            >
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                大小：2G
                              </Typography.Text>
                            </Container>
                          </Col>
                          <Col
                            __component_name="Col"
                            style={{ lineHeight: '32px', marginRight: '120px' }}
                          >
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: '' }}
                            >
                              共计
                            </Typography.Text>
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: '', padding: '0 5px' }}
                            >
                              {__$$eval(() => this.state.total)}
                            </Typography.Text>
                            <Typography.Text
                              __component_name="Typography.Text"
                              disabled={false}
                              ellipsis={true}
                              strong={false}
                              style={{ fontSize: '' }}
                            >
                              条
                            </Typography.Text>
                          </Col>
                        </Row>
                        <Table
                          __component_name="Table"
                          bordered={false}
                          columns={[
                            {
                              dataIndex: 'fileName',
                              ellipsis: { showTitle: true },
                              key: 'name',
                              title: '文件名称',
                            },
                            {
                              dataIndex: 'status',
                              key: 'agestatus',
                              render: (text, record, index) =>
                                (__$$context => (
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {__$$eval(() => __$$context.getStatusText(text))}
                                  </Typography.Text>
                                ))(__$$createChildContext(__$$context, { text, record, index })),
                              title: '导入状态',
                            },
                            {
                              dataIndex: 'fileSize',
                              render: (text, record, index) =>
                                (__$$context => (
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {__$$eval(() => __$$context.sizeTostr(text))}
                                  </Typography.Text>
                                ))(__$$createChildContext(__$$context, { text, record, index })),
                              title: '文件大小',
                            },
                            { dataIndex: 'importTime', sorter: true, title: '导入时间' },
                            {
                              dataIndex: 'opertion',
                              render: (text, record, index) =>
                                (__$$context => (
                                  <Space
                                    __component_name="Space"
                                    align="center"
                                    direction="horizontal"
                                  >
                                    <Button
                                      __component_name="Button"
                                      block={false}
                                      danger={false}
                                      disabled={false}
                                      ghost={false}
                                      onClick={function () {
                                        return this.downloadFile.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([record])
                                        );
                                      }.bind(__$$context)}
                                      shape="default"
                                      type="default"
                                    >
                                      下载
                                    </Button>
                                    <Button
                                      __component_name="Button"
                                      block={false}
                                      danger={false}
                                      disabled={false}
                                      ghost={false}
                                      onClick={function () {
                                        return this.deleteFile.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([record])
                                        );
                                      }.bind(__$$context)}
                                      shape="default"
                                      type="default"
                                    >
                                      删除
                                    </Button>
                                  </Space>
                                ))(__$$createChildContext(__$$context, { text, record, index })),
                              title: '操作',
                              width: 140,
                            },
                          ]}
                          dataSource={__$$eval(() => this.state.tableData)}
                          expandable={{ expandedRowRender: '' }}
                          loading={__$$eval(() => this.state.loading)}
                          pagination={{
                            current: __$$eval(() => this.state.currentPage),
                            onChange: function () {
                              return this.tablePageChange.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this),
                            pageSize: 2,
                            pagination: { pageSize: 10 },
                            position: ['topRight'],
                            showQuickJumper: false,
                            showSizeChanger: false,
                            simple: false,
                            size: 'small',
                            total: __$$eval(() => this.state.total),
                          }}
                          rowKey="id"
                          rowSelection={false}
                          scroll={{ scrollToFirstRowOnChange: true }}
                          showCard={false}
                          showHeader={true}
                          size="default"
                          style={{}}
                        />
                      </Container>
                    ),
                    disabled: false,
                    hidden: true,
                    key: 'import-data',
                    label: '数据',
                  },
                  {
                    children: [
                      <Input.Search
                        __component_name="Input.Search"
                        placeholder="请输入关键字搜索"
                        style={{ marginBottom: '10px', width: '240px' }}
                        key="node_ocloo4llf1t"
                      />,
                      <Tabs
                        __component_name="Tabs"
                        activeKey=""
                        destroyInactiveTabPane="true"
                        items={[
                          {
                            children: (
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                数据1
                              </Typography.Text>
                            ),
                            key: 'tab-item-1',
                            label: '标签项1',
                          },
                          {
                            children: [
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                                key="node_ocloo4llf110"
                              >
                                数据2
                              </Typography.Text>,
                              <Empty
                                __component_name="Empty"
                                description="该类文件暂不支持预览"
                                key="node_ocloo4llf113"
                              />,
                            ],
                            key: 'tab-item-2',
                            label: '标签项2',
                          },
                        ]}
                        size="large"
                        tabBarGutter={0}
                        tabPosition="left"
                        type="line"
                        key="node_ocloo4llf19"
                      />,
                    ],
                    hidden: true,
                    key: 'api-data',
                    label: '数据',
                  },
                ]}
                size="large"
                style={{ marginTop: '-20px' }}
                tabBarGutter={30}
                tabPosition="top"
                type="line"
              >
                <Card
                  __component_name="Card"
                  actions={[]}
                  bordered={false}
                  hoverable={false}
                  loading={false}
                  size="default"
                  type="default"
                />
              </Tabs>
            </Card>
          </Col>
        </Row>
        <Modal
          __component_name="Modal"
          centered={false}
          confirmLoading={false}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          okType="primary"
          onCancel={function () {
            return this.cancelUploadFile.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.uploadFile.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={__$$eval(() => this.state.uploadFileVisible)}
          title="上传数据"
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 4,
              layout: 'horizontal',
              wrapperCol: 20,
            }}
            formHelper={{ autoFocus: true }}
            ref={this._refsManager.linkRef('formily_xvs0e43ve49')}
          >
            <FormilyUpload
              __component_name="FormilyUpload"
              componentProps={{
                'x-component-props': {
                  accept: '.txt,.doc,.docx,.pdf,.md',
                  directory: false,
                  disabled: false,
                  listType: 'text',
                  maxCount: 20,
                  multiple: true,
                  onChange: function () {
                    return this.selectFileChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  openFileDialogOnClick: true,
                  showUploadList: true,
                },
              }}
              decoratorProps={{
                'x-decorator-props': {
                  asterisk: true,
                  bordered: false,
                  colon: true,
                  labelEllipsis: true,
                },
              }}
              fieldProps={{
                'enum': [],
                'name': 'Upload',
                'required': true,
                'title': '',
                'x-component': 'FormilyUpload',
                'x-display': 'visible',
                'x-pattern': 'editable',
                'x-validator': [],
              }}
            >
              <FormilyFormItem
                __component_name="FormilyFormItem"
                decoratorProps={{
                  'x-decorator-props': {
                    bordered: false,
                    feedbackLayout: 'loose',
                    fullness: false,
                    inset: false,
                    labelEllipsis: true,
                    layout: 'vertical',
                    wrapperWidth: '',
                  },
                }}
                fieldProps={{
                  'name': 'FormilyFormItem',
                  'title': '',
                  'x-component': 'FormilyFormItem',
                  'x-validator': [],
                }}
                style={{ borderRadius: '4px', paddingBottom: '20px', paddingTop: '20px' }}
              >
                <Row
                  __component_name="Row"
                  align="middle"
                  gutter={['', 24]}
                  justify="center"
                  wrap={true}
                >
                  <Col
                    __component_name="Col"
                    flex=""
                    span={24}
                    style={{ display: 'flex', fontSize: '44px', justifyContent: 'center' }}
                  >
                    <TenxIconUpload __component_name="TenxIconUpload" />
                  </Col>
                  <Col
                    __component_name="Col"
                    span={24}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '16px' }}
                    >
                      点击上传 / 拖拽文件到此区域
                    </Typography.Text>
                  </Col>
                </Row>
                <Row
                  __component_name="Row"
                  align="middle"
                  gutter={['', 10]}
                  justify="center"
                  style={{ fontSize: '12px', marginTop: '20px' }}
                  wrap={true}
                >
                  <Col
                    __component_name="Col"
                    flex=""
                    span={24}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Typography.Paragraph
                      code={false}
                      delete={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
                      mark={false}
                      strong={false}
                      style={{ fontSize: '', width: '204px' }}
                      underline={false}
                    >
                      文件限制:
                    </Typography.Paragraph>
                  </Col>
                  <Col
                    __component_name="Col"
                    flex=""
                    span={24}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Typography.Paragraph
                      code={false}
                      delete={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
                      mark={false}
                      strong={false}
                      style={{ fontSize: '', width: '204px' }}
                      underline={false}
                    >
                      - 仅支持 .txt,.doc,.docx,.pdf,.md 文件
                    </Typography.Paragraph>
                  </Col>
                  <Col
                    __component_name="Col"
                    flex=""
                    span={24}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Typography.Paragraph
                      code={false}
                      delete={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
                      mark={false}
                      strong={false}
                      style={{ fontSize: '', width: '70px' }}
                      underline={false}
                    >
                      - 单文件大小
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      code={false}
                      delete={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
                      mark={false}
                      strong={false}
                      style={{ color: '#f5a623', fontSize: '12px', width: '134px' }}
                      underline={false}
                    >
                      不超过2G
                    </Typography.Paragraph>
                  </Col>
                  <Col
                    __component_name="Col"
                    span={24}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Typography.Paragraph
                      code={false}
                      delete={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
                      mark={false}
                      strong={false}
                      style={{ fontSize: '', width: '106px' }}
                      underline={false}
                    >
                      - 单次上传文件数量
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      code={false}
                      delete={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
                      mark={false}
                      strong={false}
                      style={{ color: '#f5a623', fontSize: '', width: '98px' }}
                      underline={false}
                    >
                      不超过 20个
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </FormilyFormItem>
            </FormilyUpload>
          </FormilyForm>
        </Modal>
        <Modal
          __component_name="Modal"
          centered={false}
          confirmLoading={__$$eval(() => this.state.loading)}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.cancelEdit.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          onOk={function () {
            return this.editDatasource.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.editVisible)}
          title="编辑"
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 4,
              layout: 'horizontal',
              wrapperCol: 20,
            }}
            createFormProps={{ values: __$$eval(() => this.state.dataSourceDetail) }}
            formHelper={{ autoFocus: true }}
            ref={this._refsManager.linkRef('edit_form_ref')}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  allowClear: true,
                  bordered: true,
                  placeholder: '请输入数据源名称',
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: false, labelWidth: '' } }}
              fieldProps={{
                'name': 'name',
                'required': true,
                'title': '数据源名称',
                'x-pattern': 'disabled',
                'x-validator': [
                  {
                    children: '未知',
                    id: 'disabled',
                    message: '请输入数据源名称',
                    required: true,
                    triggerType: 'onBlur',
                    type: 'disabled',
                    whitespace: false,
                  },
                ],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  allowClear: true,
                  bordered: true,
                  placeholder: '请输入数据源别名',
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: false, labelWidth: '' } }}
              fieldProps={{
                'name': 'displayName',
                'required': true,
                'title': '数据源别名',
                'x-pattern': 'editable',
                'x-validator': [
                  {
                    children: '未知',
                    id: 'disabled',
                    message: '请输入数据源名称',
                    required: true,
                    triggerType: 'onBlur',
                    type: 'disabled',
                    whitespace: false,
                  },
                ],
              }}
            />
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                'x-component-props': {
                  autoSize: false,
                  placeholder: '请输入描述',
                  rows: 3,
                  showCount: false,
                },
              }}
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
          centered={false}
          confirmLoading={__$$eval(() => this.state.loading)}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.cancelDelete.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          onOk={function () {
            return this.deleteDatasource.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.deleteVisible)}
          title="删除"
        >
          {!!false && (
            <Container
              __component_name="Container"
              defaultStyle={{
                borderColor: '#f5a623',
                borderRadius: '4px',
                borderStyle: 'solid',
                borderWidth: '1px',
              }}
              style={{
                alignItems: 'center',
                backgroundColor: '#fffbf5',
                borderColor: '#fedc9f',
                borderStyle: 'solid',
                borderWidth: '1px',
                display: 'flex',
                padding: '10px',
              }}
            >
              <AntdIconWarningFilled
                __component_name="AntdIconWarningFilled"
                style={{ color: '#ff7f23', fontSize: '16px', marginRight: '10px' }}
              />
            </Container>
          )}
          <Alert
            __component_name="Alert"
            message={
              <Space __component_name="Space" align="center" direction="horizontal">
                <Typography.Paragraph
                  code={false}
                  delete={false}
                  disabled={false}
                  editable={false}
                  ellipsis={true}
                  mark={false}
                  strong={false}
                  style={{ fontSize: '' }}
                  underline={false}
                >
                  确定删除{' '}
                </Typography.Paragraph>
                <Typography.Paragraph
                  code={false}
                  delete={false}
                  disabled={false}
                  editable={false}
                  ellipsis={true}
                  mark={false}
                  strong={false}
                  style={{ fontSize: '', padding: '0 4px' }}
                  underline={false}
                >
                  {__$$eval(() => this.getName())}
                </Typography.Paragraph>
                <Typography.Paragraph
                  code={false}
                  delete={false}
                  disabled={false}
                  editable={false}
                  ellipsis={true}
                  mark={false}
                  strong={false}
                  style={{ fontSize: '' }}
                  underline={false}
                >
                  {' '}
                  吗？
                </Typography.Paragraph>
              </Space>
            }
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
  const match = matchPath({ path: '/data-source/detail/:id' }, location.pathname);
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
      sdkSwrFuncs={[
        {
          func: 'useGetDatasource',
          params: function applyThis() {
            return {
              namespace: this.utils.getAuthData()?.project,
              name: this.appHelper?.match?.params?.id,
            };
          }.apply(self),
          enableLocationSearch: undefined,
        },
      ]}
      render={dataProps => (
        <DatasourceDetail$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
