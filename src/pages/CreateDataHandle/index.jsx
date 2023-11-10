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
  Steps,
  Card,
  Switch,
  FormilyForm,
  FormilyNumberPicker,
  Progress,
  Table,
  FormilyInput,
  FormilySelect,
  Pagination,
} from '@tenx-ui/materials';

import { AntdIconEyeInvisibleFilled } from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class CreateDataHandle$$Page extends React.Component {
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

    this.state = { currentStep: 0 };
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

  onNext() {
    const step = this.state.currentStep + 1;
    this.setState({
      currentStep: step,
    });
  }

  onPrevious() {
    const step = this.state.currentStep - 1;
    this.setState({
      currentStep: step,
    });
  }

  componentDidMount() {
    console.log('did mount');
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page style={{ marginBottom: '0px', paddingBottom: '0px' }}>
        <Row wrap={true} style={{ marginBottom: '16px' }} __component_name="Row">
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
              创建任务
            </Typography.Title>
          </Col>
        </Row>
        <Row
          wrap={true}
          align="top"
          style={{
            paddingTop: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingBottom: '24px',
            backgroundColor: '#ffffff',
          }}
          gutter={['', '']}
          __component_name="Row"
        >
          <Col span={24} style={{ backgroundColor: '#ffffff' }} __component_name="Col">
            <Steps
              items={[
                { title: '基本信息' },
                { title: '选择文件' },
                { title: '数据处理配置' },
                { title: '处理预览' },
              ]}
              style={{
                display: 'flex',
                marginTop: '16px',
                alignItems: 'center',
                paddingTop: '24px',
                paddingBottom: '24px',
              }}
              current={__$$eval(() => this.state.currentStep)}
              __component_name="Steps"
            />
            {!!__$$eval(() => this.state.currentStep === 2) && (
              <Row wrap={true} gutter={['', 0]} __component_name="Row">
                <Col span={24} style={{ paddingBottom: '8px' }} __component_name="Col">
                  <Typography.Title
                    bold={false}
                    level={2}
                    bordered={false}
                    ellipsis={true}
                    __component_name="Typography.Title"
                  >
                    分段处理
                  </Typography.Title>
                </Col>
                <Col span={24} __component_name="Col">
                  <Row wrap={true} __component_name="Row">
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          QA 拆分
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          文本分段
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row wrap={true} style={{ marginTop: '8px' }} __component_name="Row">
                          <Col span={17} style={{}} __component_name="Col">
                            <FormilyForm
                              ref={this._refsManager.linkRef('formily_xv445n80qw')}
                              formHelper={{ style: { textAlign: 'right' }, autoFocus: true }}
                              componentProps={{
                                size: 'small',
                                colon: true,
                                layout: 'horizontal',
                                labelCol: 4,
                                labelAlign: 'left',
                                wrapperCol: 20,
                                wrapperAlign: '',
                              }}
                              __component_name="FormilyForm"
                            >
                              <FormilyNumberPicker
                                style={{ width: '80px', marginBottom: '0px', paddingBottom: '0px' }}
                                fieldProps={{
                                  name: 'size',
                                  title: '分段长度',
                                  required: true,
                                  'x-validator': [],
                                }}
                                componentProps={{
                                  'x-component-props': { suffix: '', addonAfter: '' },
                                }}
                                decoratorProps={{
                                  'x-decorator-props': {
                                    size: 'small',
                                    inset: false,
                                    style: { marginBottom: '0px' },
                                    layout: 'horizontal',
                                    fullness: false,
                                    labelCol: 100,
                                    labelWrap: false,
                                    addonAfter: '',
                                    labelAlign: 'left',
                                    labelWidth: '100',
                                    wrapperWrap: false,
                                    wrapperAlign: 'left',
                                    wrapperWidth: '',
                                    labelEllipsis: true,
                                    tooltipLayout: 'text',
                                  },
                                }}
                                __component_name="FormilyNumberPicker"
                              />
                              <FormilyNumberPicker
                                style={{ width: '80px' }}
                                fieldProps={{
                                  name: 'repeatSize',
                                  title: '分段重叠长度',
                                  required: true,
                                  'x-validator': [],
                                }}
                                componentProps={{ 'x-component-props': { placeholder: '' } }}
                                decoratorProps={{
                                  'x-decorator-props': {
                                    size: 'small',
                                    style: { marginBottom: '0px' },
                                    layout: 'horizontal',
                                    labelCol: 100,
                                    addonAfter: '',
                                    labelWidth: '100',
                                    labelEllipsis: true,
                                  },
                                }}
                                __component_name="FormilyNumberPicker"
                              />
                            </FormilyForm>
                          </Col>
                          <Col span={4} style={{ height: '32px' }} __component_name="Col">
                            <Row
                              wrap={true}
                              style={{ textAlign: 'center' }}
                              gutter={[0, 0]}
                              __component_name="Row"
                            >
                              <Col
                                span={24}
                                style={{ height: '32px', lineHeight: '26px' }}
                                __component_name="Col"
                              >
                                <Typography.Text
                                  style={{ fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={true}
                                  __component_name="Typography.Text"
                                >
                                  字符
                                </Typography.Text>
                              </Col>
                              <Col
                                span={24}
                                style={{ height: '32px', lineHeight: '26px' }}
                                __component_name="Col"
                              >
                                <Typography.Text
                                  style={{ fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={true}
                                  __component_name="Typography.Text"
                                >
                                  字符
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
            {!!__$$eval(() => this.state.currentStep === 2) && (
              <Row wrap={true} gutter={['', 0]} __component_name="Row">
                <Col
                  span={24}
                  style={{ paddingTop: '16px', paddingBottom: '8px' }}
                  __component_name="Col"
                >
                  <Typography.Title
                    bold={false}
                    level={2}
                    bordered={false}
                    ellipsis={true}
                    __component_name="Typography.Title"
                  >
                    异常清洗配置
                  </Typography.Title>
                </Col>
                <Col span={24} __component_name="Col">
                  <Row wrap={true} __component_name="Row">
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          移除不可见字符
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          空格处理
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          去除乱码
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          繁转简
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          去除网页标识符
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          去除表情
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
            {!!__$$eval(() => this.state.currentStep === 2) && (
              <Row wrap={true} gutter={['', 0]} __component_name="Row">
                <Col
                  span={24}
                  style={{ paddingTop: '16px', paddingBottom: '8px' }}
                  __component_name="Col"
                >
                  <Typography.Title
                    bold={false}
                    level={2}
                    bordered={false}
                    ellipsis={true}
                    __component_name="Typography.Title"
                  >
                    数据过滤配置
                  </Typography.Title>
                </Col>
                <Col span={24} __component_name="Col">
                  <Row wrap={true} __component_name="Row">
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          字重复率过滤
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Row wrap={true} __component_name="Row">
                                  <Col span={24} __component_name="Col">
                                    <Row
                                      wrap={false}
                                      style={{ height: '40px' }}
                                      gutter={[0, 0]}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span={19} __component_name="Col">
                                        <Progress __component_name="Progress" />
                                      </Col>
                                      <Col __component_name="Col">
                                        <FormilyForm
                                          ref={this._refsManager.linkRef('formily_bu33ve7fnv')}
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
                                          <FormilyNumberPicker
                                            style={{ width: '50px' }}
                                            fieldProps={{
                                              name: 'numberPicker',
                                              title: '',
                                              'x-validator': [],
                                            }}
                                            componentProps={{
                                              'x-component-props': { placeholder: '' },
                                            }}
                                            decoratorProps={{
                                              'x-decorator-props': { size: 'small' },
                                            }}
                                            __component_name="FormilyNumberPicker"
                                          />
                                        </FormilyForm>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          词重复率过滤
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Row
                                  wrap={false}
                                  style={{ height: '40px' }}
                                  gutter={[0, 0]}
                                  justify="space-between"
                                  __component_name="Row"
                                >
                                  <Col span={19} __component_name="Col">
                                    <Progress __component_name="Progress" />
                                  </Col>
                                  <Col __component_name="Col">
                                    <FormilyForm
                                      ref={this._refsManager.linkRef('formilyform-h5d0b6o')}
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
                                      <FormilyNumberPicker
                                        style={{ width: '50px' }}
                                        fieldProps={{
                                          name: 'numberPicker',
                                          title: '',
                                          'x-validator': [],
                                        }}
                                        componentProps={{
                                          'x-component-props': { placeholder: '' },
                                        }}
                                        decoratorProps={{ 'x-decorator-props': { size: 'small' } }}
                                        __component_name="FormilyNumberPicker"
                                      />
                                    </FormilyForm>
                                  </Col>
                                </Row>
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          特殊字符串率
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Row
                                  wrap={false}
                                  style={{ height: '40px' }}
                                  gutter={[0, 0]}
                                  justify="space-between"
                                  __component_name="Row"
                                >
                                  <Col span={19} __component_name="Col">
                                    <Progress __component_name="Progress" />
                                  </Col>
                                  <Col __component_name="Col">
                                    <FormilyForm
                                      ref={this._refsManager.linkRef('formilyform-kwftate')}
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
                                      <FormilyNumberPicker
                                        style={{ width: '50px' }}
                                        fieldProps={{
                                          name: 'numberPicker',
                                          title: '',
                                          'x-validator': [],
                                        }}
                                        componentProps={{
                                          'x-component-props': { placeholder: '' },
                                        }}
                                        decoratorProps={{ 'x-decorator-props': { size: 'small' } }}
                                        __component_name="FormilyNumberPicker"
                                      />
                                    </FormilyForm>
                                  </Col>
                                </Row>
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          色情暴力词率
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Row
                                  wrap={false}
                                  style={{ height: '40px' }}
                                  gutter={[0, 0]}
                                  justify="space-between"
                                  __component_name="Row"
                                >
                                  <Col span={19} __component_name="Col">
                                    <Progress __component_name="Progress" />
                                  </Col>
                                  <Col __component_name="Col">
                                    <FormilyForm
                                      ref={this._refsManager.linkRef('formilyform-q8tkxw3')}
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
                                      <FormilyNumberPicker
                                        style={{ width: '50px' }}
                                        fieldProps={{
                                          name: 'numberPicker',
                                          title: '',
                                          'x-validator': [],
                                        }}
                                        componentProps={{
                                          'x-component-props': { placeholder: '' },
                                        }}
                                        decoratorProps={{ 'x-decorator-props': { size: 'small' } }}
                                        __component_name="FormilyNumberPicker"
                                      />
                                    </FormilyForm>
                                  </Col>
                                </Row>
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
            {!!__$$eval(() => this.state.currentStep === 2) && (
              <Row wrap={true} gutter={['', 0]} __component_name="Row">
                <Col
                  span={24}
                  style={{ paddingTop: '16px', paddingBottom: '8px' }}
                  __component_name="Col"
                >
                  <Typography.Title
                    bold={false}
                    level={2}
                    bordered={false}
                    ellipsis={true}
                    __component_name="Typography.Title"
                  >
                    数据去重配置
                  </Typography.Title>
                </Col>
                <Col span={24} __component_name="Col">
                  <Row wrap={true} __component_name="Row">
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          simhash-operator
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Row
                                  wrap={false}
                                  style={{ height: '40px' }}
                                  gutter={[0, 0]}
                                  justify="space-between"
                                  __component_name="Row"
                                >
                                  <Col span={19} __component_name="Col">
                                    <Progress __component_name="Progress" />
                                  </Col>
                                  <Col __component_name="Col">
                                    <FormilyForm
                                      ref={this._refsManager.linkRef('formilyform-zjbf6fy')}
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
                                      <FormilyNumberPicker
                                        style={{ width: '50px' }}
                                        fieldProps={{
                                          name: 'numberPicker',
                                          title: '',
                                          'x-validator': [],
                                        }}
                                        componentProps={{
                                          'x-component-props': { placeholder: '' },
                                        }}
                                        decoratorProps={{ 'x-decorator-props': { size: 'small' } }}
                                        __component_name="FormilyNumberPicker"
                                      />
                                    </FormilyForm>
                                  </Col>
                                </Row>
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
            {!!__$$eval(() => this.state.currentStep === 2) && (
              <Row wrap={true} gutter={['', 0]} __component_name="Row">
                <Col
                  span={24}
                  style={{ paddingTop: '16px', paddingBottom: '8px' }}
                  __component_name="Col"
                >
                  <Typography.Title
                    bold={false}
                    level={2}
                    bordered={false}
                    ellipsis={true}
                    __component_name="Typography.Title"
                  >
                    数据隐私处理
                  </Typography.Title>
                </Col>
                <Col span={24} __component_name="Col">
                  <Row wrap={true} __component_name="Row">
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          数据隐私处理
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          去除IP地址
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  去除IPv4 或者 IPv6 地址
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        hoverable={true}
                        __component_name="Card"
                      >
                        <Row wrap={true} gutter={['', 0]} __component_name="Row">
                          <Col span={22} __component_name="Col">
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col span={24} __component_name="Col">
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col span="" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      >
                                        <Typography.Text
                                          style={{ fontSize: '16' }}
                                          strong={true}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          去除数字
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={false}
                                      loading={false}
                                      disabled={false}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Text
                                  style={{ color: '#9b9b9b', fontSize: '' }}
                                  strong={false}
                                  disabled={false}
                                  ellipsis={false}
                                  __component_name="Typography.Text"
                                >
                                  去除数字和字母数字标识符，如电话号码、信用卡号、十六进制散列等，同时跳过年份和简单数字的实例
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        {!!__$$eval(() => this.state.currentStep === 3) && (
          <Row
            wrap={true}
            style={{
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingBottom: '24px',
              backgroundColor: '#ffffff',
            }}
            gutter={[0]}
            __component_name="Row"
          >
            <Col span={24} __component_name="Col">
              <Typography.Text
                style={{ fontSize: '14px' }}
                strong={false}
                disabled={false}
                ellipsis={true}
                __component_name="Typography.Text"
              >
                数据处理预览
              </Typography.Text>
            </Col>
            <Col span={24} __component_name="Col">
              <Table
                size="middle"
                rowKey="id"
                scroll={{ scrollToFirstRowOnChange: true }}
                columns={[
                  { key: 'name', title: '配置内容', dataIndex: 'type' },
                  { key: 'age', title: '处理前', dataIndex: 'per_content' },
                  { title: '处理后', dataIndex: 'after_content' },
                ]}
                dataSource={[
                  { id: '1', age: 32, name: '胡彦斌', address: '西湖区湖底公园1号' },
                  { id: '2', age: 28, name: '王一博', address: '滨江区网商路699号' },
                ]}
                pagination={false}
                showHeader={true}
                __component_name="Table"
              />
            </Col>
          </Row>
        )}
        {!!__$$eval(() => this.state.currentStep === 0) && (
          <Row wrap={true} style={{ marginLeft: '0px', marginRight: '0px' }} __component_name="Row">
            <Col
              span={24}
              style={{ height: '130px', backgroundColor: '#ffffff' }}
              __component_name="Col"
            >
              <FormilyForm
                ref={this._refsManager.linkRef('formilyform-pdk9gk4')}
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
                <Row
                  wrap={true}
                  style={{ marginLeft: '0px', marginRight: '0px', backgroundColor: '#ffffff' }}
                  __component_name="Row"
                >
                  <Col span={24} style={{ height: '40px' }} __component_name="Col">
                    <FormilyInput
                      fieldProps={{ name: 'name', title: '任务名称', 'x-validator': [] }}
                      componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
                      __component_name="FormilyInput"
                    />
                  </Col>
                  <Col span={24} style={{ height: '40px' }} __component_name="Col">
                    <FormilySelect
                      fieldProps={{ name: 'type', title: '文件类型', 'x-validator': [] }}
                      componentProps={{
                        'x-component-props': {
                          disabled: false,
                          allowClear: false,
                          placeholder: '请选择',
                          _sdkSwrGetFunc: {},
                        },
                      }}
                      __component_name="FormilySelect"
                    />
                  </Col>
                </Row>
              </FormilyForm>
            </Col>
          </Row>
        )}
        {!!__$$eval(() => this.state.currentStep === 1) && (
          <Row
            wrap={true}
            style={{
              marginLeft: '0px',
              paddingTop: '0px',
              marginRight: '0px',
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingBottom: '24px',
              backgroundColor: '#ffffff',
            }}
            __component_name="Row"
          >
            <Col span={24} style={{ color: '#ffffff !important' }} __component_name="Col">
              <FormilyForm
                ref={this._refsManager.linkRef('formily_v9rahwqsia')}
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
                <Row wrap={true} __component_name="Row">
                  <Col span={12} __component_name="Col">
                    <FormilySelect
                      fieldProps={{ name: 'handleDataSet', title: '处理数据集', 'x-validator': [] }}
                      componentProps={{
                        'x-component-props': {
                          disabled: false,
                          allowClear: false,
                          placeholder: '请选择',
                          _sdkSwrGetFunc: {},
                        },
                      }}
                      decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                      __component_name="FormilySelect"
                    />
                  </Col>
                  <Col span={12} __component_name="Col">
                    <FormilySelect
                      fieldProps={{ name: 'Select', title: '', 'x-validator': [] }}
                      componentProps={{
                        'x-component-props': {
                          disabled: false,
                          allowClear: false,
                          placeholder: '请选择',
                          _sdkSwrGetFunc: {},
                        },
                      }}
                      decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                      __component_name="FormilySelect"
                    />
                  </Col>
                </Row>
                <Row wrap={true} __component_name="Row">
                  <Col span={12} __component_name="Col">
                    <FormilyInput
                      fieldProps={{ name: 'Input', title: '', description: '', 'x-validator': [] }}
                      componentProps={{
                        'x-component-props': { placeholder: '请输入文件名称搜索' },
                      }}
                      decoratorProps={{ 'x-decorator-props': { tooltip: '请输入文件名称搜索' } }}
                      __component_name="FormilyInput"
                    />
                  </Col>
                </Row>
                <Row wrap={true} justify="end" __component_name="Row">
                  <Col span={12} __component_name="Col">
                    <Pagination
                      style={{ textAlign: 'right' }}
                      total={50}
                      simple={false}
                      current={1}
                      pageSize={10}
                      __component_name="Pagination"
                    />
                  </Col>
                </Row>
              </FormilyForm>
            </Col>
          </Row>
        )}
        {!!__$$eval(() => this.state.currentStep === 1) && (
          <Row
            wrap={true}
            style={{ marginLeft: '0px', marginRight: '0px', backgroundColor: '#ffffff' }}
            __component_name="Row"
          >
            <Col span={24} style={{ marginLeft: '0px', marginRight: '0px' }} __component_name="Col">
              <Table
                size="default"
                rowKey="id"
                scroll={{ scrollToFirstRowOnChange: true }}
                columns={[
                  {
                    key: 'name',
                    title: '文件名称',
                    render: (text, record, index) =>
                      (__$$context => (
                        <Row wrap={true} __component_name="Row">
                          <Col span={24} __component_name="Col">
                            <Typography.Text
                              style={{ fontSize: '' }}
                              strong={false}
                              disabled={false}
                              ellipsis={true}
                              __component_name="Typography.Text"
                            >
                              text
                            </Typography.Text>
                          </Col>
                        </Row>
                      ))(__$$createChildContext(__$$context, { text, record, index })),
                    dataIndex: 'name',
                  },
                  { key: 'age', title: '文件大小', dataIndex: 'size' },
                ]}
                bordered={false}
                dataSource={[
                  { id: '1', name: '胡彦斌', size: '50G' },
                  { id: '2', name: '王一博', size: '100 G' },
                ]}
                pagination={false}
                showHeader={true}
                rowSelection={{ type: 'checkbox' }}
                __component_name="Table"
              />
            </Col>
          </Row>
        )}
        <Row wrap={true} style={{ marginLeft: '0px', marginRight: '0px' }} __component_name="Row">
          <Col
            span={24}
            style={{
              height: '100px',
              display: 'inline',
              textAlign: 'center',
              marginLeft: '0px',
              paddingTop: '16px',
              marginRight: '0px',
              backgroundColor: '#ffffff',
            }}
            __component_name="Col"
          >
            <Space align="center" direction="horizontal" __component_name="Space">
              <Button
                icon=""
                block={false}
                ghost={false}
                shape="default"
                style={{ marginRight: '12px' }}
                danger={false}
                disabled={false}
                __component_name="Button"
              >
                取消
              </Button>
              {!!__$$eval(() => this.state.currentStep !== 0) && (
                <Button
                  icon=""
                  block={false}
                  ghost={false}
                  shape="default"
                  style={{ marginRight: '12px' }}
                  danger={false}
                  onClick={function () {
                    return this.onPrevious.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  disabled={false}
                  __component_name="Button"
                >
                  上一步
                </Button>
              )}
            </Space>
            {!!__$$eval(() => this.state.currentStep !== 3) && (
              <Button
                icon=""
                type="primary"
                block={false}
                ghost={false}
                shape="default"
                style={{ marginRight: '12px' }}
                danger={false}
                onClick={function () {
                  return this.onNext.apply(this, Array.prototype.slice.call(arguments).concat([]));
                }.bind(this)}
                disabled={false}
                __component_name="Button"
              >
                下一步
              </Button>
            )}
            {!!__$$eval(() => this.state.currentStep === 3) && (
              <Button
                icon=""
                type="primary"
                block={false}
                ghost={false}
                shape="default"
                style={{ marginRight: '12px' }}
                danger={false}
                onClick={function () {
                  return this.onNext.apply(this, Array.prototype.slice.call(arguments).concat([]));
                }.bind(this)}
                disabled={false}
                __component_name="Button"
              >
                完成
              </Button>
            )}
          </Col>
        </Row>
      </Page>
    );
  }
}

const PageWrapper = () => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/data-handle/create' }, location.pathname);
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
        <CreateDataHandle$$Page {...dataProps} self={self} appHelper={appHelper} />
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
