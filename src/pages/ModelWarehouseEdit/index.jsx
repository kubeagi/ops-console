// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Row,
  Col,
  Space,
  Button,
  Typography,
  Spin,
  FormilyForm,
  FormilyInput,
  FormilyCheckbox,
  FormilyTextArea,
  Divider,
  FormilyUpload,
  Container,
} from '@tenx-ui/materials';

import { TenxIconPlus } from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class ModelWarehouseEdit$$Page extends React.Component {
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

    this.state = { loading: false, data: {} };
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

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  setFormData(data) {
    console.log(this.form('model_edit'), data);
    this.form('model_edit').setValues({
      modeltypes: data?.modeltypes?.split(','),
      name: data.name,
      displayName: data.displayName,
      description: data.description,
    });
  }

  getData() {
    this.setState({
      loading: true,
    });
    const project = this.utils.getAuthData()?.project;
    const name = this.match.params.name;
    const params = {
      namespace: project,
      name,
    };
    this.utils.bff
      .getModel(params)
      .then(res => {
        const { Model } = res;
        const { getModel } = Model || {};
        console.log(getModel);
        this.setState(
          {
            loading: false,
            data: getModel,
          },
          () => {
            this.setFormData(this.state.data);
          }
        );
      })
      .catch(error => {
        this.setState({
          loading: false,
          data: {},
        });
      });
  }

  linkToList() {
    this.history.push('/model-warehouse');
  }

  onSubmit() {
    this.form('model_edit')
      ?.validate()
      .then(res => {
        this.setState({
          loading: true,
        });
        const values = this.form('model_edit').values;
        const params = {
          namespace: this.utils.getAuthData().project,
          ...values,
          modeltypes: values.modeltypes.join(','),
        };
        this.utils.bff
          .updateModel({
            input: params,
          })
          .then(res => {
            if (res?.Model?.updateModel) {
              this.setState({
                loading: false,
              });
              this.utils.notification.success({
                message: '成功',
                description: '正在返回列表页',
              });
              this.linkToList();
            }
          })
          .catch(err => {
            console.log(err);
            this.setState({
              loading: false,
            });
            this.utils.notification.warn({
              message: '失败',
              description: err,
            });
          });
      });
  }

  testFunc() {
    console.log('test aliLowcode func');
    return <div className="test-aliLowcode-func">{this.state.test}</div>;
  }

  componentDidMount() {
    console.log('did mount');
    this.getData();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Row
          wrap={true}
          style={{
            paddingTop: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingBottom: '0px',
          }}
          gutter={['', 0]}
          __component_name="Row"
        >
          <Col span={24} __component_name="Col">
            <Space align="center" direction="horizontal" __component_name="Space">
              <Button.Back type="primary" title="" __component_name="Button.Back" />
            </Space>
            <Typography.Title
              bold={true}
              level={2}
              bordered={false}
              ellipsis={true}
              __component_name="Typography.Title"
            >
              编辑模型
            </Typography.Title>
          </Col>
          <Col
            span={24}
            style={{ marginTop: '16px', backgroundColor: '#ffffff' }}
            __component_name="Col"
          >
            <Spin spinning={__$$eval(() => this.state.loading)} __component_name="Spin">
              <Row
                wrap={true}
                style={{ marginTop: '24px', paddingTop: '24px', paddingLeft: '24px' }}
                __component_name="Row"
              >
                <Col span={24} __component_name="Col">
                  <FormilyForm
                    ref={this._refsManager.linkRef('model_edit')}
                    formHelper={{ style: {}, autoFocus: true }}
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
                      style={{ width: '500px' }}
                      fieldProps={{
                        name: 'name',
                        title: '模型名称',
                        required: true,
                        'x-validator': [
                          {
                            id: 'disabled',
                            type: 'disabled',
                            message:
                              "必须由小写字母数字和'-'或'.'组成，并且必须以字母数字开头和结尾",
                            pattern: '^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$',
                            children: '未知',
                          },
                        ],
                        '_unsafe_MixedSetter_x-validator_select': 'ArraySetter',
                      }}
                      componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
                      decoratorProps={{ 'x-decorator-props': { labelCol: 3, labelEllipsis: true } }}
                      __component_name="FormilyInput"
                    />
                    <FormilyInput
                      style={{ width: '500px' }}
                      fieldProps={{
                        name: 'displayName',
                        title: '模型别名',
                        required: true,
                        'x-validator': [],
                      }}
                      componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
                      decoratorProps={{ 'x-decorator-props': { labelCol: 3, labelEllipsis: true } }}
                      __component_name="FormilyInput"
                    />
                    <FormilyCheckbox
                      fieldProps={{
                        enum: [
                          { label: 'LLM', value: 'llm' },
                          { label: 'Embedding', value: 'embedding' },
                        ],
                        name: 'modeltypes',
                        title: '模型类型',
                        required: true,
                        'x-validator': [],
                      }}
                      componentProps={{ 'x-component-props': { _sdkSwrGetFunc: {} } }}
                      decoratorProps={{
                        'x-decorator-props': {
                          labelCol: 3,
                          labelAlign: 'left',
                          labelWidth: '',
                          wrapperAlign: 'left',
                          labelEllipsis: true,
                        },
                      }}
                      __component_name="FormilyCheckbox"
                    />
                    <FormilyTextArea
                      style={{ width: '500px' }}
                      fieldProps={{
                        name: 'description',
                        title: '描述',
                        'x-component': 'Input.TextArea',
                        'x-validator': [],
                      }}
                      componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
                      decoratorProps={{ 'x-decorator-props': { labelCol: 3, labelEllipsis: true } }}
                      __component_name="FormilyTextArea"
                    />
                    <Divider
                      mode="line"
                      dashed={true}
                      content={[null]}
                      defaultOpen={true}
                      orientation="left"
                      __component_name="Divider"
                      orientationMargin={0}
                    >
                      模型文件
                    </Divider>
                    <FormilyUpload
                      style={{ width: '600px' }}
                      fieldProps={{
                        name: 'Upload',
                        title: '模型文件',
                        'x-component': 'FormilyUpload',
                        'x-validator': [],
                      }}
                      componentProps={{
                        'x-component-props': {
                          multiple: true,
                          directory: false,
                          showUploadList: true,
                        },
                      }}
                      decoratorProps={{ 'x-decorator-props': { labelCol: 3, labelEllipsis: true } }}
                      __component_name="FormilyUpload"
                    >
                      <Container
                        style={{
                          width: '500px',
                          height: '130px',
                          borderColor: '#9b9b9b',
                          borderStyle: 'dashed',
                          borderWidth: '1px',
                          backgroundColor: '#ffffff',
                        }}
                        defaultStyle={{}}
                        __component_name="Container"
                      >
                        <Row
                          wrap={true}
                          style={{ textAlign: 'center', paddingTop: '16px' }}
                          gutter={['', 0]}
                          __component_name="Row"
                        >
                          <Col span={24} __component_name="Col">
                            <TenxIconPlus __component_name="TenxIconPlus" />
                          </Col>
                          <Col span={24} __component_name="Col">
                            <Typography.Text
                              style={{ fontSize: '', textAlign: 'center' }}
                              strong={false}
                              disabled={false}
                              ellipsis={true}
                              __component_name="Typography.Text"
                            >
                              点击上传 / 拖拽文件到此区域
                            </Typography.Text>
                          </Col>
                          <Col span={24} __component_name="Col">
                            <Typography.Text
                              style={{ color: '#9b9b9b', fontSize: '' }}
                              strong={false}
                              disabled={false}
                              ellipsis={true}
                              __component_name="Typography.Text"
                            >
                              文件限制：
                            </Typography.Text>
                            <Typography.Text
                              style={{ color: '#9b9b9b', fontSize: '' }}
                              strong={false}
                              disabled={false}
                              ellipsis={true}
                              __component_name="Typography.Text"
                            >
                              {' '}
                              支持上传文件夹{' '}
                            </Typography.Text>
                            <Typography.Text
                              style={{ color: '#9b9b9b', fontSize: '' }}
                              strong={false}
                              disabled={false}
                              ellipsis={true}
                              __component_name="Typography.Text"
                            >
                              、单文件大小{' '}
                            </Typography.Text>
                            <Typography.Text
                              style={{ color: '#f5a623', fontSize: '' }}
                              strong={false}
                              disabled={false}
                              ellipsis={true}
                              __component_name="Typography.Text"
                            >
                              不超过2G
                            </Typography.Text>
                            <Typography.Text
                              style={{ color: '#9b9b9b', fontSize: '' }}
                              strong={false}
                              disabled={false}
                              ellipsis={true}
                              __component_name="Typography.Text"
                            >
                              : 单次上传文件数量
                            </Typography.Text>
                            <Typography.Text
                              style={{ color: '#f5a623', fontSize: '' }}
                              strong={false}
                              disabled={false}
                              ellipsis={true}
                              __component_name="Typography.Text"
                            >
                              {' '}
                              不超过 20个
                            </Typography.Text>
                          </Col>
                        </Row>
                        <Row
                          wrap={true}
                          style={{ color: '#9b9b9b', textAlign: 'left', marginLeft: '170px' }}
                          gutter={['', 0]}
                          __component_name="Row"
                        />
                      </Container>
                    </FormilyUpload>
                  </FormilyForm>
                </Col>
              </Row>
            </Spin>
            <Row wrap={true} __component_name="Row">
              <Col span={24} __component_name="Col">
                <Divider
                  mode="line"
                  style={{ height: '2px' }}
                  dashed={false}
                  defaultOpen={false}
                  __component_name="Divider"
                />
              </Col>
            </Row>
            <Row wrap={true} __component_name="Row">
              <Col
                span={24}
                style={{ paddingLeft: '70px', paddingBottom: '24px' }}
                __component_name="Col"
              >
                <Space align="center" direction="horizontal" __component_name="Space">
                  <Button
                    type="primary"
                    block={false}
                    ghost={false}
                    shape="default"
                    danger={false}
                    loading={__$$eval(() => this.state.loading)}
                    onClick={function () {
                      return this.onSubmit.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    disabled={false}
                    __component_name="Button"
                  >
                    确定
                  </Button>
                  <Button
                    block={false}
                    ghost={false}
                    shape="default"
                    danger={false}
                    onClick={function () {
                      return this.linkToList.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    disabled={false}
                    __component_name="Button"
                  >
                    取消
                  </Button>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/model-warehouse/edit/:name' }, location.pathname);
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
        <ModelWarehouseEdit$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
