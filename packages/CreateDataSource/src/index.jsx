// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Component,
  FormilyForm,
  Divider,
  Typography,
  FormilyInput,
  FormilyTextArea,
  FormilyFormItem,
  Row,
  Col,
  FormilyUpload,
  Flex,
  Space,
  Button,
  Tooltip,
} from '@tenx-ui/materials';

import LccComponentC6ipk from 'SelectCard';

import { AntdIconPlusOutlined } from '@tenx-ui/icon-materials';

import { DataProvider } from 'shared-components';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from './utils/__utils';

import * as __$$i18n from './i18n';

import __$$constants from './__constants';

import './index.css';

class CreateDataSource$$Component extends React.Component {
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

    this.state = { type: undefined, timer: undefined, checked: false };
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Component>
        <FormilyForm
          ref={this._refsManager.linkRef('formily_create')}
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
          {!!__$$eval(() => this.props.data) && (
            <Divider
              mode="default"
              dashed={true}
              content={[null]}
              defaultOpen={true}
              orientation="left"
              __component_name="Divider"
              orientationMargin={0}
            >
              <Typography.Title
                bold={true}
                level={2}
                bordered={false}
                ellipsis={true}
                __component_name="Typography.Title"
              >
                基本信息
              </Typography.Title>
            </Divider>
          )}
          <FormilyInput
            fieldProps={{
              name: 'name',
              title: this.i18n('i18n-k8ddthex') /* 数据源名称 */,
              required: true,
              'x-validator': [],
            }}
            componentProps={{
              'x-component-props': {
                placeholder: this.i18n('i18n-u4ayeyas') /* 请输入数据源名称 */,
              },
            }}
            decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
            __component_name="FormilyInput"
          />
          <FormilyTextArea
            fieldProps={{
              name: 'description',
              title: this.i18n('i18n-7p3f51an') /* 描述 */,
              'x-component': 'Input.TextArea',
              'x-validator': [],
            }}
            componentProps={{
              'x-component-props': { placeholder: this.i18n('i18n-eictbzlm') /* 请输入描述 */ },
            }}
            decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
            __component_name="FormilyTextArea"
          />
          {!!__$$eval(() => !this.props.data) && (
            <Divider
              mode="default"
              dashed={true}
              content={[null]}
              defaultOpen={true}
              orientation="left"
              __component_name="Divider"
              orientationMargin={0}
            >
              <Typography.Title
                bold={true}
                level={2}
                bordered={false}
                ellipsis={true}
                __component_name="Typography.Title"
              >
                数据接入
              </Typography.Title>
            </Divider>
          )}
          {!!__$$eval(() => this.props.data && !this.getTypeForms()?.includes('upload')) && (
            <Divider
              mode="default"
              dashed={true}
              content={[null]}
              defaultOpen={true}
              orientation="left"
              __component_name="Divider"
              orientationMargin={0}
            >
              <Typography.Title
                bold={true}
                level={2}
                bordered={false}
                ellipsis={true}
                __component_name="Typography.Title"
              >
                数据来源
              </Typography.Title>
            </Divider>
          )}
          {!!__$$eval(() => !this.props.data) && (
            <FormilyFormItem
              style={{ marginBottom: '-20px' }}
              fieldProps={{
                name: 'type',
                title: this.i18n('i18n-5am4k7to') /* 数据源 */,
                required: true,
                'x-component': 'FormilyFormItem',
                'x-validator': [],
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyFormItem"
            />
          )}
          {!!__$$eval(() => !this.props.data) && (
            <Row wrap={true} style={{ marginBottom: '22px' }} __component_name="Row">
              <Col span={4} __component_name="Col" />
              <Col span={20} style={{ marginTop: '-30px' }} __component_name="Col">
                <LccComponentC6ipk
                  value={__$$eval(() => this.getType())}
                  dataSource={__$$eval(() => this.getDataSourceTypes(this, 'label'))}
                  defaultValue=""
                  __component_name="LccComponentC6ipk"
                />
              </Col>
            </Row>
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('upload') && !this.props.data) && (
            <FormilyUpload
              fieldProps={{
                name: 'file',
                title: this.i18n('i18n-p1xi725y') /* 选择文件 */,
                required: true,
                'x-component': 'FormilyUpload',
                'x-validator': [],
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyUpload"
            >
              <Flex
                align="center"
                style={{
                  width: '680px',
                  border: '1px dashed #4461EB',
                  height: '100px',
                  borderRadius: '4px',
                }}
                justify="center"
                vertical={true}
                __component_name="Flex"
              >
                <AntdIconPlusOutlined
                  style={{ color: '#4461EB', fontSize: '16px' }}
                  __component_name="AntdIconPlusOutlined"
                />
                <Typography.Text
                  type="colorTextSecondary"
                  style={{ fontSize: '', paddingTop: '16px', paddingBottom: '16px' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-23jovmbg') /* 点击 / 拖拽文件到此区域上传 */}
                </Typography.Text>
                <Flex __component_name="Flex">
                  <Typography.Text
                    type="colorTextSecondary"
                    style={{ fontSize: '' }}
                    strong={false}
                    disabled={false}
                    ellipsis={true}
                    __component_name="Typography.Text"
                  >
                    {this.i18n('i18n-1gfbnspc') /* 仅支持 .txt,.doc,.docx,.pdf,.md 文件； */}
                  </Typography.Text>
                  <Typography.Text
                    type="colorTextSecondary"
                    style={{ fontSize: '' }}
                    strong={false}
                    disabled={false}
                    ellipsis={true}
                    __component_name="Typography.Text"
                  >
                    {this.i18n('i18n-h0lq7h8f') /* 单文件大小  */}
                  </Typography.Text>
                  <Typography.Text
                    type="warning"
                    style={{ fontSize: '', paddingLeft: '6px' }}
                    strong={false}
                    disabled={false}
                    ellipsis={true}
                    __component_name="Typography.Text"
                  >
                    不超过 2G，
                  </Typography.Text>
                  <Typography.Text
                    type="colorTextSecondary"
                    style={{ fontSize: '' }}
                    strong={false}
                    disabled={false}
                    ellipsis={true}
                    __component_name="Typography.Text"
                  >
                    {this.i18n('i18n-vuolk538') /* 单次上传文件数量 */}
                  </Typography.Text>
                  <Typography.Text
                    type="warning"
                    style={{ fontSize: '', paddingLeft: '6px' }}
                    strong={false}
                    disabled={false}
                    ellipsis={true}
                    __component_name="Typography.Text"
                  >
                    不超过 20个
                  </Typography.Text>
                </Flex>
                <Typography.Text
                  style={{ fontSize: '' }}
                  strong={false}
                  children=""
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                />
              </Flex>
            </FormilyUpload>
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('serverAddress')) && (
            <FormilyInput
              fieldProps={{
                name: 'fwdz',
                title: this.i18n('i18n-wg1t5zxg') /* 服务地址 */,
                required: true,
                'x-validator': [],
              }}
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-6spbbojn') /* 请输入服务地址 */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyInput"
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('path')) && (
            <FormilyInput
              fieldProps={{
                name: 'lujing',
                title: this.i18n('i18n-tw87ecqw') /* 路径 */,
                required: true,
                'x-validator': [],
              }}
              componentProps={{
                'x-component-props': { placeholder: this.i18n('i18n-h18e958l') /* 请输入路径 */ },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyInput"
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('bucket')) && (
            <FormilyInput
              fieldProps={{
                name: 'bucket',
                title: this.i18n('i18n-a17g4buw') /* Bucket */,
                required: true,
                'x-validator': [],
              }}
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-9vkabv9j') /* 请输入 Bucket */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyInput"
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('object')) && (
            <FormilyInput
              fieldProps={{
                name: 'object',
                title: this.i18n('i18n-147ypkac') /* Object */,
                required: true,
                'x-validator': [],
              }}
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-iazmtrsp') /* 请输入 Object */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyInput"
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('username')) && (
            <FormilyInput
              fieldProps={{
                name: 'username',
                title: this.i18n('i18n-ifb9v7p6') /* 用户名 */,
                required: true,
                'x-validator': [],
              }}
              componentProps={{
                'x-component-props': { placeholder: this.i18n('i18n-tnfvqdxl') /* 请输入用户名 */ },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyInput"
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('password')) && (
            <FormilyInput
              fieldProps={{
                name: 'password',
                title: this.i18n('i18n-mtolrn4c') /* 密码 */,
                required: true,
                'x-validator': [],
              }}
              componentProps={{
                'x-component-props': { placeholder: this.i18n('i18n-yzicgjma') /* 请输入密码 */ },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyInput"
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('apiAddress')) && (
            <FormilyInput
              fieldProps={{
                name: 'api',
                title: this.i18n('i18n-6y63riyn') /* API 地址 */,
                required: true,
                'x-validator': [],
              }}
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-232nz66x') /* 请输入 API 地址 */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyInput"
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('token')) && (
            <FormilyInput
              fieldProps={{
                name: 'token',
                title: this.i18n('i18n-af2ovuoj') /* Token */,
                required: true,
                'x-validator': [],
              }}
              componentProps={{
                'x-component-props': { placeholder: this.i18n('i18n-l88g15y8') /* 请输入 Token */ },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              __component_name="FormilyInput"
            />
          )}
          {!!__$$eval(() => !this.getTypeForms()?.includes('upload')) && (
            <Row wrap={true} __component_name="Row">
              <Col span={4} style={{}} __component_name="Col" />
              <Col span={20} style={{ marginBottom: '20px' }} __component_name="Col">
                <Typography.Text
                  type="colorPrimary"
                  style={{ cursor: 'pointer', fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-z7scyw9j') /* 测试连接 */}
                </Typography.Text>
              </Col>
            </Row>
          )}
          {!!__$$eval(() => !this.props.data) && (
            <Divider
              mode="line"
              style={{ width: 'calc(100% + 48px)', marginLeft: '-24px' }}
              dashed={false}
              defaultOpen={false}
              __component_name="Divider"
            />
          )}
          <Row wrap={true} __component_name="Row">
            <Col span={4} style={{}} __component_name="Col" />
            <Col span={20} __component_name="Col">
              <Space
                size="middle"
                align="center"
                style={__$$eval(
                  () =>
                    this.props.data && {
                      position: 'fixed',
                      right: 0,
                      'z-index': 1,
                      bottom: '8px',
                      right: '24px',
                    }
                )}
                direction="horizontal"
                __component_name="Space"
              >
                <Button
                  block={false}
                  ghost={false}
                  shape="default"
                  danger={false}
                  disabled={false}
                  __component_name="Button"
                >
                  {this.i18n('i18n-0ujub8i3') /* 取消 */}
                </Button>
                <Tooltip
                  title={this.i18n('i18n-umfzqrmt') /* 请测试连接并通过 */}
                  __component_name="Tooltip"
                >
                  <Button
                    type="primary"
                    block={false}
                    ghost={false}
                    shape="default"
                    danger={false}
                    disabled={__$$eval(
                      () => !this.state.checked && !this.getTypeForms()?.includes('upload')
                    )}
                    __component_name="Button"
                  >
                    {this.i18n('i18n-cz31s8vq') /* 确定 */}
                  </Button>
                </Tooltip>
              </Space>
            </Col>
          </Row>
        </FormilyForm>
      </Component>
    );
  }
}

const ComponentWrapper = () => {
  const history = getUnifiedHistory();
  const appHelper = {
    utils,
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
        <CreateDataSource$$Component {...dataProps} self={self} appHelper={appHelper} />
      )}
    />
  );
};
export default ComponentWrapper;

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
