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
      timer: undefined,
      total: 3,
      loading: false,
      tableData: [],
      currentPage: 1,
      editVisible: false,
      deleteVisible: false,
      dataSourceDetail: {},
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

  search(event) {
    console.log(event.target.value);
    const newData = this.state.tableData.filter(
      item => item.fileName.indexOf(event.target.value) > -1
    );
    this.setState({
      tableData: newData,
    });
  }

  getData() {
    return {
      ...(this.props.useGetDatasource?.data?.Datasource?.getDatasource || {}),
      type: 'objectStorage',
    };
  }

  getName() {
    return `${this.getData()?.displayName || '-'}(${this.getData()?.name || '-'})`;
  }

  refresh() {
    this.props.useGetDatasource?.mutate();
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

  cancelEdit() {
    this.setState({
      editVisible: false,
    });
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

  uploadFile() {}

  cancelDelete() {
    this.setState({
      deleteVisible: false,
    });
  }

  clickEditBtn() {
    this.setState({
      editVisible: true,
    });
    this.initEditForm();
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

  clickDeleteBtn() {
    this.setState({
      deleteVisible: true,
    });
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

  tablePageChange(value) {
    this.setState({
      currentPage: value,
    });
  }

  cancelUploadFile() {
    this.setState({
      uploadFileVisible: false,
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

  clickUploadFileBtn() {
    this.setState({
      uploadFileVisible: true,
    });
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page style={{ backgroundColor: '#f0f0f0' }}>
        <Row wrap={true} __component_name="Row">
          <Col span={24} __component_name="Col">
            <Space align="center" direction="horizontal" __component_name="Space">
              <Button.Back
                type="primary"
                style={{}}
                title="数据源详情"
                __component_name="Button.Back"
              />
            </Space>
          </Col>
          <Col span={24} __component_name="Col">
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
                <Col flex="auto" __component_name="Col">
                  <Row wrap={false} __component_name="Row">
                    <Col flex="84px" __component_name="Col">
                      <Image
                        src={__$$eval(
                          () =>
                            this.utils
                              .getDataSourceTypes(this)
                              ?.find(item => item.value === this.getData().type)?.icon || '-'
                        )}
                        style={{ marginRight: '20px' }}
                        width={64}
                        height={64}
                        preview={false}
                        fallback=""
                        __component_name="Image"
                      />
                    </Col>
                    <Col flex="auto" __component_name="Col">
                      <Row wrap={true} gutter={['', 16]} __component_name="Row">
                        <Col span={24} __component_name="Col">
                          <Typography.Title
                            bold={true}
                            level={1}
                            bordered={false}
                            ellipsis={true}
                            __component_name="Typography.Title"
                          >
                            {__$$eval(() => this.getName())}
                          </Typography.Title>
                        </Col>
                        <Col span={24} __component_name="Col">
                          <Space align="center" direction="horizontal" __component_name="Space">
                            <Status
                              id={__$$eval(() => this.getData().status)}
                              types={__$$eval(() => this.utils.getDataSourceStatus(this, true))}
                              __component_name="Status"
                            />
                            <Divider
                              mode="default"
                              type="vertical"
                              dashed={false}
                              defaultOpen={false}
                              __component_name="Divider"
                            />
                          </Space>
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            ID:
                          </Typography.Text>
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            {__$$eval(() => this.getData()?.id || '-')}
                          </Typography.Text>
                          <Divider
                            mode="default"
                            type="vertical"
                            dashed={false}
                            defaultOpen={false}
                            __component_name="Divider"
                          />
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            更新时间：
                          </Typography.Text>
                          <Typography.Time
                            time={__$$eval(() => this.getData()?.updateTimestamp)}
                            format=""
                            relativeTime={false}
                            __component_name="Typography.Time"
                          />
                          <Divider
                            mode="default"
                            type="vertical"
                            dashed={false}
                            defaultOpen={false}
                            __component_name="Divider"
                          />
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            创建时间：
                          </Typography.Text>
                          <Typography.Time
                            time={__$$eval(() => this.getData()?.creationTimestamp)}
                            format=""
                            relativeTime={false}
                            __component_name="Typography.Time"
                          />
                          <Divider
                            mode="default"
                            type="vertical"
                            dashed={false}
                            defaultOpen={false}
                            __component_name="Divider"
                          />
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            创建者：
                          </Typography.Text>
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            {__$$eval(() => this.getData()?.creator || '-')}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col flex="135px" style={{ display: 'flex' }} __component_name="Col">
                  <Space align="center" direction="horizontal" __component_name="Space">
                    <Button
                      block={false}
                      ghost={false}
                      shape="default"
                      danger={false}
                      onClick={function () {
                        return this.clickEditBtn.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      disabled={false}
                      __component_name="Button"
                    >
                      编辑
                    </Button>
                    <Button
                      block={false}
                      ghost={false}
                      shape="default"
                      danger={false}
                      onClick={function () {
                        return this.clickDeleteBtn.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
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
          </Col>
          <Col span={24} __component_name="Col">
            <Card
              size="default"
              type="default"
              style={{}}
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
                    key: 'base-info',
                    label: '基本信息',
                    children: (
                      <Descriptions
                        id=""
                        size="default"
                        colon={false}
                        items={[
                          {
                            key: 'znsxqm9jvg',
                            span: 1,
                            label: '数据来源',
                            children: (
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
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
                          },
                          {
                            key: 'ylkewexl94s',
                            span: 1,
                            label: '服务地址',
                            children: (
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => this.getData()?.endpoint?.url || '-')}
                              </Typography.Text>
                            ),
                          },
                          {
                            key: 'znsxqm9jvg',
                            span: 1,
                            label: 'Bucket',
                            children: (
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => this.getData()?.oss?.bucket || '-')}
                              </Typography.Text>
                            ),
                          },
                          {
                            key: 'bmtu55oldgu',
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
                                {__$$eval(() => this.getData()?.description || '-')}
                              </Typography.Text>
                            ),
                          },
                          {
                            key: 'dytrj9jc2ps',
                            span: 1,
                            label: 'Object',
                            children: (
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => this.getData()?.oss?.object || '-')}
                              </Typography.Text>
                            ),
                          },
                          {
                            key: '5bdfutwg6vd',
                            span: 1,
                            label: '协议类型',
                            children: (
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() =>
                                  this.getData()?.endpoint?.insecure ? 'HTTPS' : 'HTTP'
                                )}
                              </Typography.Text>
                            ),
                          },
                        ]}
                        title=""
                        column={2}
                        layout="horizontal"
                        bordered={false}
                        labelStyle={{ width: 100 }}
                        borderedBottom={false}
                        __component_name="Descriptions"
                        borderedBottomDashed={false}
                      >
                        <Descriptions.Item key="7u6hhq5r76c" span={1} label="ID">
                          {null}
                        </Descriptions.Item>
                        <Descriptions.Item key="7yk3a5jlohw" span={1} label="数据来源">
                          {null}
                        </Descriptions.Item>
                        <Descriptions.Item key="06xockdofixg" span={1} label="文件数">
                          {null}
                        </Descriptions.Item>
                        <Descriptions.Item key="itgwws5yosa" span={1} label="创建时间">
                          {null}
                        </Descriptions.Item>
                        <Descriptions.Item key="g5rygvbd6v" span={1} label="创建者">
                          {null}
                        </Descriptions.Item>
                        <Descriptions.Item key="bmtu55oldgu" span={1} label="描述">
                          {null}
                        </Descriptions.Item>
                      </Descriptions>
                    ),
                    disabled: false,
                  },
                  {
                    key: 'import-data',
                    label: '数据',
                    hidden: true,
                    children: (
                      <Container __component_name="Container">
                        <Row wrap={false} justify="space-between" __component_name="Row">
                          <Col
                            span={12}
                            style={{ display: 'flex', justifyContent: 'flex-start' }}
                            __component_name="Col"
                          >
                            <Button
                              icon={
                                <AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />
                              }
                              type="primary"
                              block={false}
                              ghost={false}
                              shape="default"
                              danger={false}
                              onClick={function () {
                                return this.clickUploadFileBtn.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              disabled={false}
                              __component_name="Button"
                            >
                              上传文件
                            </Button>
                            <Button
                              icon={
                                <AntdIconReloadOutlined __component_name="AntdIconReloadOutlined" />
                              }
                              type="default"
                              block={false}
                              ghost={false}
                              shape="default"
                              style={{ marginLeft: '12px', marginRight: '12px' }}
                              danger={false}
                              loading={false}
                              onClick={function () {
                                return this.refresh.apply(
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
                              style={{ width: '220px' }}
                              loading={false}
                              onChange={function () {
                                return this.search.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(this)}
                              placeholder="请输入文件名称搜索"
                              __component_name="Input.Search"
                            />
                            <Container
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '12px',
                                marginRight: '12px',
                                justifyContent: 'center',
                              }}
                              __component_name="Container"
                            >
                              <Typography.Text
                                style={{ fontSize: '', lineHeight: '60px' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                共有文件：113个
                              </Typography.Text>
                            </Container>
                            <Container
                              style={{ display: 'flex', alignItems: 'center' }}
                              __component_name="Container"
                            >
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                大小：2G
                              </Typography.Text>
                            </Container>
                          </Col>
                          <Col
                            style={{ lineHeight: '32px', marginRight: '120px' }}
                            __component_name="Col"
                          >
                            <Typography.Text
                              style={{ fontSize: '' }}
                              strong={false}
                              disabled={false}
                              ellipsis={true}
                              __component_name="Typography.Text"
                            >
                              共计
                            </Typography.Text>
                            <Typography.Text
                              style={{ padding: '0 5px', fontSize: '' }}
                              strong={false}
                              disabled={false}
                              ellipsis={true}
                              __component_name="Typography.Text"
                            >
                              {__$$eval(() => this.state.total)}
                            </Typography.Text>
                            <Typography.Text
                              style={{ fontSize: '' }}
                              strong={false}
                              disabled={false}
                              ellipsis={true}
                              __component_name="Typography.Text"
                            >
                              条
                            </Typography.Text>
                          </Col>
                        </Row>
                        <Table
                          size="default"
                          style={{}}
                          rowKey="id"
                          scroll={{ scrollToFirstRowOnChange: true }}
                          columns={[
                            {
                              key: 'name',
                              title: '文件名称',
                              ellipsis: { showTitle: true },
                              dataIndex: 'fileName',
                            },
                            {
                              key: 'agestatus',
                              title: '导入状态',
                              render: (text, record, index) =>
                                (__$$context => (
                                  <Typography.Text
                                    style={{ fontSize: '' }}
                                    strong={false}
                                    disabled={false}
                                    ellipsis={true}
                                    __component_name="Typography.Text"
                                  >
                                    {__$$eval(() => __$$context.getStatusText(text))}
                                  </Typography.Text>
                                ))(__$$createChildContext(__$$context, { text, record, index })),
                              dataIndex: 'status',
                            },
                            {
                              title: '文件大小',
                              render: (text, record, index) =>
                                (__$$context => (
                                  <Typography.Text
                                    style={{ fontSize: '' }}
                                    strong={false}
                                    disabled={false}
                                    ellipsis={true}
                                    __component_name="Typography.Text"
                                  >
                                    {__$$eval(() => __$$context.sizeTostr(text))}
                                  </Typography.Text>
                                ))(__$$createChildContext(__$$context, { text, record, index })),
                              dataIndex: 'fileSize',
                            },
                            { title: '导入时间', sorter: true, dataIndex: 'importTime' },
                            {
                              title: '操作',
                              width: 140,
                              render: (text, record, index) =>
                                (__$$context => (
                                  <Space
                                    align="center"
                                    direction="horizontal"
                                    __component_name="Space"
                                  >
                                    <Button
                                      type="default"
                                      block={false}
                                      ghost={false}
                                      shape="default"
                                      danger={false}
                                      onClick={function () {
                                        return this.downloadFile.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([record])
                                        );
                                      }.bind(__$$context)}
                                      disabled={false}
                                      __component_name="Button"
                                    >
                                      下载
                                    </Button>
                                    <Button
                                      type="default"
                                      block={false}
                                      ghost={false}
                                      shape="default"
                                      danger={false}
                                      onClick={function () {
                                        return this.deleteFile.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([record])
                                        );
                                      }.bind(__$$context)}
                                      disabled={false}
                                      __component_name="Button"
                                    >
                                      删除
                                    </Button>
                                  </Space>
                                ))(__$$createChildContext(__$$context, { text, record, index })),
                              dataIndex: 'opertion',
                            },
                          ]}
                          loading={__$$eval(() => this.state.loading)}
                          bordered={false}
                          showCard={false}
                          dataSource={__$$eval(() => this.state.tableData)}
                          expandable={{ expandedRowRender: '' }}
                          pagination={{
                            size: 'small',
                            total: __$$eval(() => this.state.total),
                            simple: false,
                            current: __$$eval(() => this.state.currentPage),
                            onChange: function () {
                              return this.tablePageChange.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(this),
                            pageSize: 2,
                            position: ['topRight'],
                            pagination: { pageSize: 10 },
                            showQuickJumper: false,
                            showSizeChanger: false,
                          }}
                          showHeader={true}
                          rowSelection={false}
                          __component_name="Table"
                        />
                      </Container>
                    ),
                    disabled: false,
                  },
                  {
                    key: 'api-data',
                    label: '数据',
                    hidden: true,
                    children: [
                      <Input.Search
                        style={{ width: '240px', marginBottom: '10px' }}
                        placeholder="请输入关键字搜索"
                        __component_name="Input.Search"
                        key="node_ocloo4llf1t"
                      />,
                      <Tabs
                        size="large"
                        type="line"
                        items={[
                          {
                            key: 'tab-item-1',
                            label: '标签项1',
                            children: (
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                数据1
                              </Typography.Text>
                            ),
                          },
                          {
                            key: 'tab-item-2',
                            label: '标签项2',
                            children: [
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                                key="node_ocloo4llf110"
                              >
                                数据2
                              </Typography.Text>,
                              <Empty
                                description="该类文件暂不支持预览"
                                __component_name="Empty"
                                key="node_ocloo4llf113"
                              />,
                            ],
                          },
                        ]}
                        activeKey=""
                        tabPosition="left"
                        tabBarGutter={0}
                        __component_name="Tabs"
                        destroyInactiveTabPane="true"
                        key="node_ocloo4llf19"
                      />,
                    ],
                  },
                ]}
                style={{ marginTop: '-20px' }}
                activeKey=""
                tabPosition="top"
                tabBarGutter={30}
                __component_name="Tabs"
                destroyInactiveTabPane="true"
              >
                <Card
                  size="default"
                  type="default"
                  actions={[]}
                  loading={false}
                  bordered={false}
                  hoverable={false}
                  __component_name="Card"
                />
              </Tabs>
            </Card>
          </Col>
        </Row>
        <Modal
          mask={true}
          onOk={function () {
            return this.uploadFile.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          open={__$$eval(() => this.state.uploadFileVisible)}
          title="上传数据"
          okType="primary"
          centered={false}
          keyboard={true}
          onCancel={function () {
            return this.cancelUploadFile.apply(
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
            ref={this._refsManager.linkRef('formily_xvs0e43ve49')}
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
                enum: [],
                name: 'Upload',
                title: '',
                required: true,
                'x-display': 'visible',
                'x-pattern': 'editable',
                'x-component': 'FormilyUpload',
                'x-validator': [],
              }}
              componentProps={{
                'x-component-props': {
                  accept: '.txt,.doc,.docx,.pdf,.md',
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
                  directory: false,
                  showUploadList: true,
                  openFileDialogOnClick: true,
                },
              }}
              decoratorProps={{
                'x-decorator-props': {
                  colon: true,
                  asterisk: true,
                  bordered: false,
                  labelEllipsis: true,
                },
              }}
              __component_name="FormilyUpload"
            >
              <FormilyFormItem
                style={{ paddingTop: '20px', borderRadius: '4px', paddingBottom: '20px' }}
                fieldProps={{
                  name: 'FormilyFormItem',
                  title: '',
                  'x-component': 'FormilyFormItem',
                  'x-validator': [],
                }}
                decoratorProps={{
                  'x-decorator-props': {
                    inset: false,
                    layout: 'vertical',
                    bordered: false,
                    fullness: false,
                    wrapperWidth: '',
                    labelEllipsis: true,
                    feedbackLayout: 'loose',
                  },
                }}
                __component_name="FormilyFormItem"
              >
                <Row
                  wrap={true}
                  align="middle"
                  gutter={['', 24]}
                  justify="center"
                  __component_name="Row"
                >
                  <Col
                    flex=""
                    span={24}
                    style={{ display: 'flex', fontSize: '44px', justifyContent: 'center' }}
                    __component_name="Col"
                  >
                    <TenxIconUpload __component_name="TenxIconUpload" />
                  </Col>
                  <Col
                    span={24}
                    style={{ display: 'flex', justifyContent: 'center' }}
                    __component_name="Col"
                  >
                    <Typography.Text
                      style={{ fontSize: '16px' }}
                      strong={false}
                      disabled={false}
                      ellipsis={true}
                      __component_name="Typography.Text"
                    >
                      点击上传 / 拖拽文件到此区域
                    </Typography.Text>
                  </Col>
                </Row>
                <Row
                  wrap={true}
                  align="middle"
                  style={{ fontSize: '12px', marginTop: '20px' }}
                  gutter={['', 10]}
                  justify="center"
                  __component_name="Row"
                >
                  <Col
                    flex=""
                    span={24}
                    style={{ display: 'flex', justifyContent: 'center' }}
                    __component_name="Col"
                  >
                    <Typography.Paragraph
                      code={false}
                      mark={false}
                      style={{ width: '204px', fontSize: '' }}
                      delete={false}
                      strong={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
                      underline={false}
                    >
                      文件限制:
                    </Typography.Paragraph>
                  </Col>
                  <Col
                    flex=""
                    span={24}
                    style={{ display: 'flex', justifyContent: 'center' }}
                    __component_name="Col"
                  >
                    <Typography.Paragraph
                      code={false}
                      mark={false}
                      style={{ width: '204px', fontSize: '' }}
                      delete={false}
                      strong={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
                      underline={false}
                    >
                      - 仅支持 .txt,.doc,.docx,.pdf,.md 文件
                    </Typography.Paragraph>
                  </Col>
                  <Col
                    flex=""
                    span={24}
                    style={{ display: 'flex', justifyContent: 'center' }}
                    __component_name="Col"
                  >
                    <Typography.Paragraph
                      code={false}
                      mark={false}
                      style={{ width: '70px', fontSize: '' }}
                      delete={false}
                      strong={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
                      underline={false}
                    >
                      - 单文件大小
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      code={false}
                      mark={false}
                      style={{ color: '#f5a623', width: '134px', fontSize: '12px' }}
                      delete={false}
                      strong={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
                      underline={false}
                    >
                      不超过2G
                    </Typography.Paragraph>
                  </Col>
                  <Col
                    span={24}
                    style={{ display: 'flex', justifyContent: 'center' }}
                    __component_name="Col"
                  >
                    <Typography.Paragraph
                      code={false}
                      mark={false}
                      style={{ width: '106px', fontSize: '' }}
                      delete={false}
                      strong={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
                      underline={false}
                    >
                      - 单次上传文件数量
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      code={false}
                      mark={false}
                      style={{ color: '#f5a623', width: '98px', fontSize: '' }}
                      delete={false}
                      strong={false}
                      disabled={false}
                      editable={false}
                      ellipsis={false}
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
          mask={true}
          onOk={function () {
            return this.editDatasource.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.editVisible)}
          title="编辑"
          centered={false}
          keyboard={true}
          onCancel={function () {
            return this.cancelEdit.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          forceRender={false}
          maskClosable={false}
          confirmLoading={__$$eval(() => this.state.loading)}
          destroyOnClose={true}
          __component_name="Modal"
        >
          <FormilyForm
            ref={this._refsManager.linkRef('edit_form_ref')}
            formHelper={{ autoFocus: true }}
            componentProps={{
              colon: false,
              layout: 'horizontal',
              labelCol: 4,
              labelAlign: 'left',
              wrapperCol: 20,
            }}
            createFormProps={{ values: __$$eval(() => this.state.dataSourceDetail) }}
            __component_name="FormilyForm"
          >
            <FormilyInput
              fieldProps={{
                name: 'name',
                title: '数据源名称',
                required: true,
                'x-pattern': 'disabled',
                'x-validator': [
                  {
                    id: 'disabled',
                    type: 'disabled',
                    message: '请输入数据源名称',
                    children: '未知',
                    required: true,
                    whitespace: false,
                    triggerType: 'onBlur',
                  },
                ],
              }}
              componentProps={{
                'x-component-props': {
                  bordered: true,
                  allowClear: true,
                  placeholder: '请输入数据源名称',
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelWidth: '', labelEllipsis: false } }}
              __component_name="FormilyInput"
            />
            <FormilyInput
              fieldProps={{
                name: 'displayName',
                title: '数据源别名',
                required: true,
                'x-pattern': 'editable',
                'x-validator': [
                  {
                    id: 'disabled',
                    type: 'disabled',
                    message: '请输入数据源名称',
                    children: '未知',
                    required: true,
                    whitespace: false,
                    triggerType: 'onBlur',
                  },
                ],
              }}
              componentProps={{
                'x-component-props': {
                  bordered: true,
                  allowClear: true,
                  placeholder: '请输入数据源别名',
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelWidth: '', labelEllipsis: false } }}
              __component_name="FormilyInput"
            />
            <FormilyTextArea
              fieldProps={{
                name: 'description',
                title: '描述',
                'x-component': 'Input.TextArea',
                'x-validator': [],
              }}
              componentProps={{
                'x-component-props': {
                  rows: 3,
                  autoSize: false,
                  showCount: false,
                  placeholder: '请输入描述',
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyTextArea"
            />
          </FormilyForm>
        </Modal>
        <Modal
          mask={true}
          onOk={function () {
            return this.deleteDatasource.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.deleteVisible)}
          title="删除"
          centered={false}
          keyboard={true}
          onCancel={function () {
            return this.cancelDelete.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          forceRender={false}
          maskClosable={false}
          confirmLoading={__$$eval(() => this.state.loading)}
          destroyOnClose={true}
          __component_name="Modal"
        >
          {!!false && (
            <Container
              style={{
                display: 'flex',
                padding: '10px',
                alignItems: 'center',
                borderColor: '#fedc9f',
                borderStyle: 'solid',
                borderWidth: '1px',
                backgroundColor: '#fffbf5',
              }}
              defaultStyle={{
                borderColor: '#f5a623',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderRadius: '4px',
              }}
              __component_name="Container"
            >
              <AntdIconWarningFilled
                style={{ color: '#ff7f23', fontSize: '16px', marginRight: '10px' }}
                __component_name="AntdIconWarningFilled"
              />
            </Container>
          )}
          <Alert
            type="warning"
            message={
              <Space align="center" direction="horizontal" __component_name="Space">
                <Typography.Paragraph
                  code={false}
                  mark={false}
                  style={{ fontSize: '' }}
                  delete={false}
                  strong={false}
                  disabled={false}
                  editable={false}
                  ellipsis={true}
                  underline={false}
                >
                  确定删除{' '}
                </Typography.Paragraph>
                <Typography.Paragraph
                  code={false}
                  mark={false}
                  style={{ padding: '0 4px', fontSize: '' }}
                  delete={false}
                  strong={false}
                  disabled={false}
                  editable={false}
                  ellipsis={true}
                  underline={false}
                >
                  {__$$eval(() => this.getName())}
                </Typography.Paragraph>
                <Typography.Paragraph
                  code={false}
                  mark={false}
                  style={{ fontSize: '' }}
                  delete={false}
                  strong={false}
                  disabled={false}
                  editable={false}
                  ellipsis={true}
                  underline={false}
                >
                  {' '}
                  吗？
                </Typography.Paragraph>
              </Space>
            }
            showIcon={true}
            __component_name="Alert"
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
        func: 'undefined',
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
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
