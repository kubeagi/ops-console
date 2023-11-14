// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  FormilyForm,
  FormilyUpload,
  FormilyFormItem,
  Row,
  Col,
  Typography,
  FormilyInput,
  FormilyTextArea,
  Container,
  Button,
  Space,
  Tabs,
  Descriptions,
  Input,
  Table,
  Empty,
} from '@tenx-ui/materials';

import {
  TenxIconUpload,
  TenxIconStorageConnect,
  AntdIconPlusOutlined,
  AntdIconReloadOutlined,
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
      uploadFileVisible: false,
      editVisible: false,
      deleteVisible: false,
      dataSourceDetail: {},
      tableData: [],
      loading: false,
      currentPage: 1,
      total: 3,
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

  loadData() {
    console.log('match', this.match);
    console.log('id', this.match.params.id);
    this.setState({
      loading: true,
    });
    this.setState(
      {
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
      },
      () => {
        this.setState({
          loading: false,
        });
      }
    );
  }

  goBack() {
    this.history.back();
  }

  refresh() {
    this.loadData();
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

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  clickUploadFileBtn() {
    this.setState({
      uploadFileVisible: true,
    });
  }

  cancelUploadFile() {
    this.setState({
      uploadFileVisible: false,
    });
  }

  uploadFile() {}

  clickEditBtn() {
    this.setState({
      editVisible: true,
    });
  }

  cancelEdit() {
    this.setState({
      editVisible: false,
    });
  }

  editDatasource() {
    const form = this.$('edit_form_ref')?.formRef?.current?.form;
    form.validate().then(res => {
      this.setState({
        loading: true,
      });
      const { name, description } = form.values;
      this.setState(
        {
          dataSourceDetail: {
            ...this.state.dataSourceDetail,
            name,
            description,
          },
        },
        () => {
          this.setState({
            loading: false,
            editVisible: false,
          });
        }
      );
    });
  }

  clickDeleteBtn() {
    this.setState({
      deleteVisible: true,
    });
  }

  cancelDelete() {
    this.setState({
      deleteVisible: false,
    });
  }

  deleteDatasource() {
    this.setState({
      loading: true,
    });
  }

  tablePageChange(value) {
    this.setState({
      currentPage: value,
    });
  }

  downloadFile(record) {
    console.log('下载文件');
  }

  deleteFile(record) {
    console.log(record);
    const newData = this.state.tableData.filter(item => item.id !== record.id);
    console.log(newData);
    this.setState({
      tableData: newData,
    });
  }

  componentDidMount() {
    console.log('did mount');
    this.loadData();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page style={{ backgroundColor: '#f0f0f0' }}>
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
                  multiple: false,
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
        <Container __component_name="Container">
          <Button.Back
            type="primary"
            style={{}}
            title="数据源详情"
            onClick={function () {
              return this.goBack.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            __component_name="Button.Back"
          />
        </Container>
        <Container style={{ marginTop: '20px', marginBottom: '10px' }} __component_name="Container">
          <Row
            wrap={false}
            style={{
              paddingTop: '20px',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingBottom: '20px',
              backgroundColor: '#ffffff',
            }}
            justify="space-between"
            __component_name="Row"
          >
            <Col __component_name="Col">
              <Row wrap={false} justify="space-between" __component_name="Row">
                <Col
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  __component_name="Col"
                >
                  <TenxIconStorageConnect
                    style={{ fontSize: '40px' }}
                    __component_name="TenxIconStorageConnect"
                  />
                </Col>
                <Col __component_name="Col">
                  <Row wrap={true} __component_name="Row">
                    <Col span={24} __component_name="Col">
                      <Typography.Text
                        type="default"
                        style={{ fontSize: '18px' }}
                        strong={false}
                        disabled={false}
                        ellipsis={true}
                        __component_name="Typography.Text"
                      >
                        {__$$eval(() => this.state.dataSourceDetail.name)}
                      </Typography.Text>
                    </Col>
                    <Col span={24} __component_name="Col">
                      <Row
                        wrap={false}
                        align="middle"
                        gutter={[4, 0]}
                        justify="start"
                        __component_name="Row"
                      >
                        <Col
                          span={1}
                          style={{
                            color: '#53c42b',
                            display: 'flex',
                            fontSize: '40px',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          __component_name="Col"
                        >
                          <Typography.Text
                            type="success"
                            style={{
                              width: '20px',
                              height: '20px',
                              display: 'flex',
                              flexWrap: 'wrap-reverse',
                              fontSize: '60px',
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}
                            strong={false}
                            disabled={false}
                            ellipsis={false}
                            __component_name="Typography.Text"
                          >
                            .
                          </Typography.Text>
                        </Col>
                        <Col span={4} __component_name="Col">
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            导入成功
                          </Typography.Text>
                        </Col>
                        <Col span={1} __component_name="Col">
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            |
                          </Typography.Text>
                        </Col>
                        <Col span={7} __component_name="Col">
                          <Typography.Text
                            style={{ width: '114px', fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={false}
                            __component_name="Typography.Text"
                          >
                            数据来源：本地文件
                          </Typography.Text>
                        </Col>
                        <Col span={1} __component_name="Col">
                          <Typography.Text
                            style={{ width: '114px', fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={false}
                            __component_name="Typography.Text"
                          >
                            |
                          </Typography.Text>
                        </Col>
                        <Col span={4} __component_name="Col">
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
                        <Col span={10} __component_name="Col">
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            {__$$eval(() => this.state.dataSourceDetail.createTime)}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col style={{ display: 'flex' }} __component_name="Col">
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
        </Container>
        <Container
          style={{
            marginTop: '20px',
            marginLeft: '-10px',
            marginRight: '-10px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingBottom: '20px',
            backgroundColor: '#ffffff',
          }}
          __component_name="Container"
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
                        key: '7u6hhq5r76c',
                        span: 1,
                        label: 'ID',
                        children: (
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            {null}
                          </Typography.Text>
                        ),
                      },
                      {
                        key: '7yk3a5jlohw',
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
                            text
                          </Typography.Text>
                        ),
                      },
                      {
                        key: '06xockdofixg',
                        span: 1,
                        label: '文件数',
                        children: (
                          <Typography.Text
                            style={{}}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            text
                          </Typography.Text>
                        ),
                      },
                      {
                        key: 'itgwws5yosa',
                        span: 1,
                        label: '创建时间',
                        children: (
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            text
                          </Typography.Text>
                        ),
                      },
                      {
                        key: 'g5rygvbd6v',
                        span: 1,
                        label: '创建者',
                        children: (
                          <Typography.Text
                            style={{}}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            text
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
                            text
                          </Typography.Text>
                        ),
                      },
                    ]}
                    title=""
                    column={1}
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
                children: (
                  <Container __component_name="Container">
                    <Row wrap={false} justify="space-between" __component_name="Row">
                      <Col
                        span={12}
                        style={{ display: 'flex', justifyContent: 'flex-start' }}
                        __component_name="Col"
                      >
                        <Button
                          icon={<AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />}
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
                          type="dashed"
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
                          共计5条
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
                        { key: 'agestatus', title: '导入状态', dataIndex: 'status' },
                        { title: '文件大小', dataIndex: 'fileSize' },
                        { title: '导入时间', sorter: true, dataIndex: 'importTime' },
                        {
                          title: '操作',
                          width: 140,
                          render: (text, record, index) =>
                            (__$$context => (
                              <Space align="center" direction="horizontal" __component_name="Space">
                                <Button
                                  type="dashed"
                                  block={false}
                                  ghost={false}
                                  shape="default"
                                  danger={false}
                                  onClick={function () {
                                    return this.downloadFile.apply(
                                      this,
                                      Array.prototype.slice.call(arguments).concat([])
                                    );
                                  }.bind(__$$context)}
                                  disabled={false}
                                  __component_name="Button"
                                >
                                  下载
                                </Button>
                                <Button
                                  type="dashed"
                                  block={false}
                                  ghost={false}
                                  shape="default"
                                  danger={false}
                                  onClick={function () {
                                    return this.deleteFile.apply(
                                      this,
                                      Array.prototype.slice.call(arguments).concat([])
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
            activeKey=""
            tabPosition="top"
            tabBarGutter={30}
            __component_name="Tabs"
            destroyInactiveTabPane="true"
          />
        </Container>
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
              {__$$eval(() => this.state.dataSourceDetail.name)}
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
          </Container>
        </Modal>
      </Page>
    );
  }
}

const PageWrapper = () => {
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
        enabled: undefined,
        func: 'undefined',
        params: undefined,
      }}
      sdkSwrFuncs={[]}
      render={dataProps => (
        <DatasourceDetail$$Page {...dataProps} self={self} appHelper={appHelper} />
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
