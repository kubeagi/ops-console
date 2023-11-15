// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Status,
  Tabs,
  Descriptions,
  Steps,
  Table,
} from '@tenx-ui/materials';

import { AntdIconAlipayCircleFilled, AntdIconEyeInvisibleFilled } from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class DataHandleDetail$$Page extends React.Component {
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

    this.state = {};
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    console.log('will unmount');
  }

  testFunc() {
    console.log('test aliLowcode func');
    return <div className="test-aliLowcode-func">{this.state.test}</div>;
  }

  handleBackFunc(event) {
    // 点击按钮时的回调
    history.back(-1);
    console.log('onClick', history);
  }

  componentDidMount() {
    console.log('did mount');
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page style={{}}>
        <Button.Back
          type="ghost"
          style={{ opacity: '0' }}
          title="数据处理详情"
          onClick={function () {
            return this.handleBackFunc.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          __component_name="Button.Back"
        />
        <Card
          size="default"
          type="default"
          style={{ marginTop: '16px' }}
          actions={[]}
          loading={false}
          bordered={false}
          hoverable={false}
          __component_name="Card"
        >
          <Row wrap={false} __component_name="Row">
            <Col flex="40px" span={1} __component_name="Col">
              <AntdIconAlipayCircleFilled
                style={{ fontSize: 40 }}
                __component_name="AntdIconAlipayCircleFilled"
              />
            </Col>
            <Col flex="auto" __component_name="Col">
              <Row
                wrap={true}
                style={{ paddingLeft: '20px' }}
                gutter={['', '']}
                __component_name="Row"
              >
                <Col span={24} __component_name="Col">
                  <Row wrap={true} gutter={['', 0]} __component_name="Row">
                    <Col span={24} __component_name="Col">
                      <Typography.Title
                        bold={true}
                        level={1}
                        bordered={false}
                        ellipsis={true}
                        __component_name="Typography.Title"
                      >
                        标题
                      </Typography.Title>
                    </Col>
                    <Col span={24} __component_name="Col">
                      <Status
                        id="disabled"
                        types={[{ id: 'disabled', type: 'disabled', children: '未知' }]}
                        __component_name="Status"
                      />
                      <Typography.Text
                        style={{ fontSize: '', paddingLeft: '12px' }}
                        strong={false}
                        disabled={false}
                        ellipsis={true}
                        __component_name="Typography.Text"
                      >
                        更新时间：
                      </Typography.Text>
                      <Typography.Time
                        time="2023"
                        format=""
                        relativeTime={false}
                        __component_name="Typography.Time"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card
          size="default"
          type="default"
          style={{ marginTop: '16px' }}
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
                key: 'tab-item-1',
                label: '详细信息',
                children: (
                  <Descriptions
                    id=""
                    size="default"
                    colon={false}
                    items={[
                      { key: 'xhiw4rl3fr8', span: 1, label: 'ID', children: null },
                      { key: 'hdx1if55is', span: 1, label: '任务类型', children: null },
                      { key: '7vo7r2wbqev', span: 1, label: '处理前数据集', children: null },
                      { key: 'ik4agaf7r1d', span: 1, label: '处理后数据集', children: null },
                      { key: '5c0mxhs31zb', span: 1, label: '创建时间', children: null },
                      { key: 'ys4jchfegg', span: 1, label: '创建者', children: null },
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
                    <Descriptions.Item key="xhiw4rl3fr8" span={1} label="ID">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="hdx1if55is" span={1} label="任务类型">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="7vo7r2wbqev" span={1} label="处理前数据集">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="ik4agaf7r1d" span={1} label="处理后数据集">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="5c0mxhs31zb" span={1} label="创建时间">
                      {null}
                    </Descriptions.Item>
                    <Descriptions.Item key="ys4jchfegg" span={1} label="创建者">
                      {null}
                    </Descriptions.Item>
                  </Descriptions>
                ),
              },
              {
                key: 'tab-item-2',
                label: '数据处理',
                children: (
                  <Steps
                    items={[
                      {
                        title: '异常清洗',
                        disabled: false,
                        subTitle: '收起',
                        description: (
                          <Row wrap={true} gutter={['', 0]} __component_name="Row">
                            <Col span={24} __component_name="Col">
                              <Row wrap={true} __component_name="Row">
                                <Col span={6} __component_name="Col">
                                  <Card
                                    size="default"
                                    type="default"
                                    style={{ boxShadow: '0 0 0 0 #000', borderRadius: '4px' }}
                                    actions={[]}
                                    loading={false}
                                    bordered={true}
                                    hoverable={false}
                                    __component_name="Card"
                                  >
                                    <Row
                                      wrap={false}
                                      style={{
                                        display: 'flex',
                                        textAlign: 'left',
                                        alignItems: 'center',
                                        marginBottom: '8px',
                                      }}
                                      gutter={['', '']}
                                      __component_name="Row"
                                    >
                                      <Col flex="24px" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 24 }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col flex="auto" __component_name="Col">
                                        <Typography.Title
                                          bold={true}
                                          level={1}
                                          style={{
                                            marginTop: '0px',
                                            paddingTop: '0px',
                                            paddingLeft: '8px',
                                          }}
                                          bordered={false}
                                          ellipsis={true}
                                          __component_name="Typography.Title"
                                        >
                                          移除不可见字符
                                        </Typography.Title>
                                      </Col>
                                    </Row>
                                    <Typography.Paragraph
                                      code={false}
                                      mark={false}
                                      type="default"
                                      style={{ fontSize: '', paddingTop: '0px' }}
                                      delete={false}
                                      strong={false}
                                      disabled={false}
                                      editable={false}
                                      ellipsis={{
                                        rows: 2,
                                        tooltip: true,
                                        expandable: false,
                                        _unsafe_MixedSetter_tooltip_select: 'BoolSetter',
                                      }}
                                      underline={false}
                                    >
                                      移除 ASCII 中的一些不可见字符, 如0-32 和127-160这两个范围
                                    </Typography.Paragraph>
                                  </Card>
                                </Col>
                                <Col span={6} __component_name="Col">
                                  <Card
                                    size="default"
                                    type="default"
                                    style={{ boxShadow: '0 0 0 0 #000', borderRadius: '4px' }}
                                    actions={[]}
                                    loading={false}
                                    bordered={true}
                                    hoverable={false}
                                    __component_name="Card"
                                  >
                                    <Row
                                      wrap={false}
                                      style={{
                                        display: 'flex',
                                        textAlign: 'left',
                                        alignItems: 'center',
                                        marginBottom: '8px',
                                      }}
                                      gutter={['', '']}
                                      __component_name="Row"
                                    >
                                      <Col flex="24px" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 24 }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col flex="auto" __component_name="Col">
                                        <Typography.Title
                                          bold={true}
                                          level={1}
                                          style={{
                                            marginTop: '0px',
                                            paddingTop: '0px',
                                            paddingLeft: '8px',
                                          }}
                                          bordered={false}
                                          ellipsis={true}
                                          __component_name="Typography.Title"
                                        >
                                          移除不可见字符
                                        </Typography.Title>
                                      </Col>
                                    </Row>
                                    <Typography.Paragraph
                                      code={false}
                                      mark={false}
                                      type="default"
                                      style={{ fontSize: '', paddingTop: '0px' }}
                                      delete={false}
                                      strong={false}
                                      disabled={false}
                                      editable={false}
                                      ellipsis={{
                                        rows: 2,
                                        tooltip: true,
                                        expandable: false,
                                        _unsafe_MixedSetter_tooltip_select: 'BoolSetter',
                                      }}
                                      underline={false}
                                    >
                                      移除文档中的开头和结尾的空格tab等，如‘\n’, ‘\r’,
                                      ‘\t’等。将段落内不同的 unicode 空格比如  u2008，转成正常的空格
                                    </Typography.Paragraph>
                                  </Card>
                                </Col>
                                <Col span={6} __component_name="Col">
                                  <Card
                                    size="default"
                                    type="default"
                                    style={{ boxShadow: '0 0 0 0 #000', borderRadius: '4px' }}
                                    actions={[]}
                                    loading={false}
                                    bordered={true}
                                    hoverable={false}
                                    __component_name="Card"
                                  >
                                    <Row
                                      wrap={false}
                                      style={{
                                        display: 'flex',
                                        textAlign: 'left',
                                        alignItems: 'center',
                                        marginBottom: '8px',
                                      }}
                                      gutter={['', '']}
                                      __component_name="Row"
                                    >
                                      <Col flex="24px" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 24 }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col flex="auto" __component_name="Col">
                                        <Typography.Title
                                          bold={true}
                                          level={1}
                                          style={{
                                            marginTop: '0px',
                                            paddingTop: '0px',
                                            paddingLeft: '8px',
                                          }}
                                          bordered={false}
                                          ellipsis={true}
                                          __component_name="Typography.Title"
                                        >
                                          移除不可见字符
                                        </Typography.Title>
                                      </Col>
                                    </Row>
                                    <Typography.Paragraph
                                      code={false}
                                      mark={false}
                                      type="default"
                                      style={{ fontSize: '', paddingTop: '0px' }}
                                      delete={false}
                                      strong={false}
                                      disabled={false}
                                      editable={false}
                                      ellipsis={{
                                        rows: 2,
                                        tooltip: true,
                                        expandable: false,
                                        _unsafe_MixedSetter_tooltip_select: 'BoolSetter',
                                      }}
                                      underline={false}
                                    >
                                      移除 ASCII 中的一些不可见字符, 如0-32 和127-160这两个范围
                                    </Typography.Paragraph>
                                  </Card>
                                </Col>
                                <Col span={6} __component_name="Col">
                                  <Card
                                    size="default"
                                    type="default"
                                    style={{ boxShadow: '0 0 0 0 #000', borderRadius: '4px' }}
                                    actions={[]}
                                    loading={false}
                                    bordered={true}
                                    hoverable={false}
                                    __component_name="Card"
                                  >
                                    <Row
                                      wrap={false}
                                      style={{
                                        display: 'flex',
                                        textAlign: 'left',
                                        alignItems: 'center',
                                        marginBottom: '8px',
                                      }}
                                      gutter={['', '']}
                                      __component_name="Row"
                                    >
                                      <Col flex="24px" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 24 }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col flex="auto" __component_name="Col">
                                        <Typography.Title
                                          bold={true}
                                          level={1}
                                          style={{
                                            marginTop: '0px',
                                            paddingTop: '0px',
                                            paddingLeft: '8px',
                                          }}
                                          bordered={false}
                                          ellipsis={true}
                                          __component_name="Typography.Title"
                                        >
                                          移除不可见字符
                                        </Typography.Title>
                                      </Col>
                                    </Row>
                                    <Typography.Paragraph
                                      code={false}
                                      mark={false}
                                      type="default"
                                      style={{ fontSize: '', paddingTop: '0px' }}
                                      delete={false}
                                      strong={false}
                                      disabled={false}
                                      editable={false}
                                      ellipsis={{
                                        rows: 2,
                                        tooltip: true,
                                        expandable: false,
                                        _unsafe_MixedSetter_tooltip_select: 'BoolSetter',
                                      }}
                                      underline={false}
                                    >
                                      移除 ASCII 中的一些不可见字符, 如0-32 和127-160这两个范围
                                    </Typography.Paragraph>
                                  </Card>
                                </Col>
                              </Row>
                            </Col>
                            <Col span={24} __component_name="Col">
                              <Typography.Text
                                style={{
                                  display: 'block',
                                  fontSize: '',
                                  paddingTop: '14px',
                                  paddingBottom: '14px',
                                }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                使用 4 个异常清洗配置对 2 个文本执行了异常清洗
                              </Typography.Text>
                              <Table
                                size="default"
                                rowKey="id"
                                scroll={{ scrollToFirstRowOnChange: true }}
                                columns={[
                                  { key: 'id', title: '序号', dataIndex: 'id' },
                                  { key: 'before', title: '处理前', dataIndex: 'before' },
                                  { key: 'after', title: '处理后', dataIndex: 'after' },
                                ]}
                                bordered={true}
                                showCard={false}
                                dataSource={[
                                  {
                                    id: '1',
                                    age: 32,
                                    name: '胡彦斌',
                                    address: '西湖区湖底公园1号',
                                  },
                                  {
                                    id: '2',
                                    age: 28,
                                    name: '王一博',
                                    address: '滨江区网商路699号',
                                  },
                                ]}
                                pagination={false}
                                showHeader={true}
                                __component_name="Table"
                              />
                            </Col>
                          </Row>
                        ),
                        _unsafe_MixedSetter_description_select: 'SlotSetter',
                      },
                      {
                        title: '过滤',
                        description: (
                          <Row wrap={true} gutter={['', 0]} __component_name="Row">
                            <Col span={24} __component_name="Col">
                              <Row wrap={true} __component_name="Row">
                                <Col span={6} __component_name="Col">
                                  <Card
                                    size="default"
                                    type="default"
                                    style={{ boxShadow: '0 0 0 0 #000', borderRadius: '4px' }}
                                    actions={[]}
                                    loading={false}
                                    bordered={true}
                                    hoverable={false}
                                    __component_name="Card"
                                  >
                                    <Row
                                      wrap={false}
                                      style={{
                                        display: 'flex',
                                        textAlign: 'left',
                                        alignItems: 'center',
                                        marginBottom: '8px',
                                      }}
                                      gutter={['', '']}
                                      __component_name="Row"
                                    >
                                      <Col flex="24px" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 24 }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col flex="auto" __component_name="Col">
                                        <Typography.Title
                                          bold={true}
                                          level={1}
                                          style={{
                                            marginTop: '0px',
                                            paddingTop: '0px',
                                            paddingLeft: '8px',
                                          }}
                                          bordered={false}
                                          ellipsis={true}
                                          __component_name="Typography.Title"
                                        >
                                          移除不可见字符
                                        </Typography.Title>
                                      </Col>
                                    </Row>
                                    <Typography.Paragraph
                                      code={false}
                                      mark={false}
                                      type="default"
                                      style={{ fontSize: '', paddingTop: '0px' }}
                                      delete={false}
                                      strong={false}
                                      disabled={false}
                                      editable={false}
                                      ellipsis={{
                                        rows: 2,
                                        tooltip: true,
                                        expandable: false,
                                        _unsafe_MixedSetter_tooltip_select: 'BoolSetter',
                                      }}
                                      underline={false}
                                    >
                                      移除 ASCII 中的一些不可见字符, 如0-32 和127-160这两个范围
                                    </Typography.Paragraph>
                                    <Typography.Text
                                      style={{
                                        display: 'inline-block',
                                        fontSize: '',
                                        marginTop: '0px',
                                        paddingTop: '20px',
                                      }}
                                      strong={true}
                                      disabled={false}
                                      ellipsis={true}
                                      __component_name="Typography.Text"
                                    >
                                      阈值：0.5
                                    </Typography.Text>
                                  </Card>
                                </Col>
                                <Col span={6} __component_name="Col">
                                  <Card
                                    size="default"
                                    type="default"
                                    style={{ boxShadow: '0 0 0 0 #000', borderRadius: '4px' }}
                                    actions={[]}
                                    loading={false}
                                    bordered={true}
                                    hoverable={false}
                                    __component_name="Card"
                                  >
                                    <Row
                                      wrap={false}
                                      style={{
                                        display: 'flex',
                                        textAlign: 'left',
                                        alignItems: 'center',
                                        marginBottom: '8px',
                                      }}
                                      gutter={['', '']}
                                      __component_name="Row"
                                    >
                                      <Col flex="24px" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 24 }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col flex="auto" __component_name="Col">
                                        <Typography.Title
                                          bold={true}
                                          level={1}
                                          style={{
                                            marginTop: '0px',
                                            paddingTop: '0px',
                                            paddingLeft: '8px',
                                          }}
                                          bordered={false}
                                          ellipsis={true}
                                          __component_name="Typography.Title"
                                        >
                                          移除不可见字符
                                        </Typography.Title>
                                      </Col>
                                    </Row>
                                    <Typography.Paragraph
                                      code={false}
                                      mark={false}
                                      type="default"
                                      style={{ fontSize: '', paddingTop: '0px' }}
                                      delete={false}
                                      strong={false}
                                      disabled={false}
                                      editable={false}
                                      ellipsis={{
                                        tooltip: {
                                          title: null,
                                          _unsafe_MixedSetter_title_select: 'SlotSetter',
                                        },
                                        rows: 2,
                                      }}
                                      underline={false}
                                    >
                                      移除文档中的开头和结尾的空格tab等，如‘\n’, ‘\r’,
                                      ‘\t’等。将段落内不同的 unicode 空格比如  u2008，转成正常的空格
                                    </Typography.Paragraph>
                                    <Typography.Text
                                      style={{
                                        display: 'inline-block',
                                        fontSize: '',
                                        marginTop: '0px',
                                        paddingTop: '20px',
                                      }}
                                      strong={true}
                                      disabled={false}
                                      ellipsis={true}
                                      __component_name="Typography.Text"
                                    >
                                      阈值：0.5
                                    </Typography.Text>
                                  </Card>
                                </Col>
                                <Col span={6} __component_name="Col">
                                  <Card
                                    size="default"
                                    type="default"
                                    style={{ boxShadow: '0 0 0 0 #000', borderRadius: '4px' }}
                                    actions={[]}
                                    loading={false}
                                    bordered={true}
                                    hoverable={false}
                                    __component_name="Card"
                                  >
                                    <Row
                                      wrap={false}
                                      style={{
                                        display: 'flex',
                                        textAlign: 'left',
                                        alignItems: 'center',
                                        marginBottom: '8px',
                                      }}
                                      gutter={['', '']}
                                      __component_name="Row"
                                    >
                                      <Col flex="24px" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 24 }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col flex="auto" __component_name="Col">
                                        <Typography.Title
                                          bold={true}
                                          level={1}
                                          style={{
                                            marginTop: '0px',
                                            paddingTop: '0px',
                                            paddingLeft: '8px',
                                          }}
                                          bordered={false}
                                          ellipsis={true}
                                          __component_name="Typography.Title"
                                        >
                                          移除不可见字符
                                        </Typography.Title>
                                      </Col>
                                    </Row>
                                    <Typography.Paragraph
                                      code={false}
                                      mark={false}
                                      type="default"
                                      style={{ fontSize: '', paddingTop: '0px' }}
                                      delete={false}
                                      strong={false}
                                      disabled={false}
                                      editable={false}
                                      ellipsis={{
                                        tooltip: true,
                                        expandable: false,
                                        rows: 2,
                                        _unsafe_MixedSetter_tooltip_select: 'BoolSetter',
                                      }}
                                      underline={false}
                                    >
                                      移除 ASCII 中的一些不可见字符, 如0-32 和127-160这两个范围
                                    </Typography.Paragraph>
                                    <Typography.Text
                                      style={{
                                        display: 'inline-block',
                                        fontSize: '',
                                        marginTop: '0px',
                                        paddingTop: '20px',
                                      }}
                                      strong={true}
                                      disabled={false}
                                      ellipsis={true}
                                      __component_name="Typography.Text"
                                    >
                                      阈值：0.5
                                    </Typography.Text>
                                  </Card>
                                </Col>
                                <Col span={6} __component_name="Col">
                                  <Card
                                    size="default"
                                    type="default"
                                    style={{ boxShadow: '0 0 0 0 #000', borderRadius: '4px' }}
                                    actions={[]}
                                    loading={false}
                                    bordered={true}
                                    hoverable={false}
                                    __component_name="Card"
                                  >
                                    <Row
                                      wrap={false}
                                      style={{
                                        display: 'flex',
                                        textAlign: 'left',
                                        alignItems: 'center',
                                        marginBottom: '8px',
                                      }}
                                      gutter={['', '']}
                                      __component_name="Row"
                                    >
                                      <Col flex="24px" __component_name="Col">
                                        <AntdIconEyeInvisibleFilled
                                          style={{ fontSize: 24 }}
                                          __component_name="AntdIconEyeInvisibleFilled"
                                        />
                                      </Col>
                                      <Col flex="auto" __component_name="Col">
                                        <Typography.Title
                                          bold={true}
                                          level={1}
                                          style={{
                                            marginTop: '0px',
                                            paddingTop: '0px',
                                            paddingLeft: '8px',
                                          }}
                                          bordered={false}
                                          ellipsis={true}
                                          __component_name="Typography.Title"
                                        >
                                          移除不可见字符
                                        </Typography.Title>
                                      </Col>
                                    </Row>
                                    <Typography.Paragraph
                                      code={false}
                                      mark={false}
                                      type="default"
                                      style={{ fontSize: '', paddingTop: '0px' }}
                                      delete={false}
                                      strong={false}
                                      disabled={false}
                                      editable={false}
                                      ellipsis={{
                                        rows: 2,
                                        tooltip: true,
                                        expandable: false,
                                        _unsafe_MixedSetter_tooltip_select: 'BoolSetter',
                                      }}
                                      underline={false}
                                    >
                                      移除 ASCII 中的一些不可见字符, 如0-32 和127-160这两个范围
                                    </Typography.Paragraph>
                                    <Typography.Text
                                      style={{
                                        display: 'inline-block',
                                        fontSize: '',
                                        marginTop: '0px',
                                        paddingTop: '20px',
                                      }}
                                      strong={true}
                                      disabled={false}
                                      ellipsis={true}
                                      __component_name="Typography.Text"
                                    >
                                      阈值：0.5
                                    </Typography.Text>
                                  </Card>
                                </Col>
                              </Row>
                            </Col>
                            <Col span={24} __component_name="Col">
                              <Typography.Text
                                style={{
                                  display: 'block',
                                  fontSize: '',
                                  paddingTop: '14px',
                                  paddingBottom: '14px',
                                }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                使用 4 个异常清洗配置对 2 个文本执行了异常清洗
                              </Typography.Text>
                              <Table
                                size="default"
                                rowKey="id"
                                scroll={{ scrollToFirstRowOnChange: true }}
                                columns={[
                                  { key: 'id', title: '序号', dataIndex: 'id' },
                                  { key: 'before', title: '文本内容', dataIndex: 'before' },
                                ]}
                                bordered={true}
                                showCard={false}
                                dataSource={[
                                  {
                                    id: '1',
                                    age: 32,
                                    name: '胡彦斌',
                                    address: '西湖区湖底公园1号',
                                  },
                                  {
                                    id: '2',
                                    age: 28,
                                    name: '王一博',
                                    address: '滨江区网商路699号',
                                  },
                                ]}
                                pagination={false}
                                showHeader={true}
                                __component_name="Table"
                              />
                            </Col>
                          </Row>
                        ),
                        _unsafe_MixedSetter_description_select: 'SlotSetter',
                      },
                      { title: '去重' },
                    ]}
                    current={0}
                    direction="vertical"
                    __component_name="Steps"
                  />
                ),
              },
              { key: 'm1dzw13ijo', label: '清洗可视化', children: null },
            ]}
            activeKey=""
            tabPosition="top"
            tabBarGutter={24}
            __component_name="Tabs"
            destroyInactiveTabPane="true"
          />
        </Card>
      </Page>
    );
  }
}

const PageWrapper = () => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/data-handle/detail' }, location.pathname);
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
        <DataHandleDetail$$Page {...dataProps} self={self} appHelper={appHelper} />
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
