// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Row,
  Col,
  Typography,
  Card,
  Tabs,
  Space,
  Button,
  Input,
  Select,
  List,
  Dropdown,
  Image,
  Divider,
  Descriptions,
  Status,
} from '@tenx-ui/materials';

import {
  AntdIconPlusOutlined,
  TenxIconRefresh,
  AntdIconSettingOutlined,
} from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class ModelService$$Page extends React.Component {
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

  onClickToDetail(e, { id }) {
    // 事件的 handler
    console.log(e, 'onClick');
    this.history.push(`/model-service/detail/${id}?type=local`);
  }

  localMenuOnClick(e) {
    // onClick	点击 MenuItem 调用此函数
    console.log('onDropDownClick', e);
    switch (e.key) {
      case 'offline':
        break;
      case 'edit':
        this.history.push('/model-service/createModelService?type=edit');
        break;
    }
  }

  onClickCreatModel(event) {
    // 点击按钮时的回调
    console.log('onClick', event);
    this.history.push('/model-service/createModelService');
  }

  onClickOutToDetail(e, { id }) {
    // 事件的 handler
    console.log(e, 'onClick');
    this.history.push(`/model-service/detail/${id}?type=external`);
  }

  externalMenuOnClick(e) {
    // onClick	点击 MenuItem 调用此函数
    console.log('onDropDownClick', e);
    switch (e.key) {
      case 'offline':
        break;
      case 'edit':
        this.history.push('/model-service/createOutsideModelService?type=edit');
        break;
    }
  }

  onClickCreatOutsideModel(event) {
    // 点击按钮时的回调
    console.log('onClick', event);
    this.history.push('/model-service/createOutsideModelService');
  }

  componentDidMount() {
    console.log('did mount');
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Row wrap={true} __component_name="Row">
          <Col span={24} __component_name="Col">
            <Typography.Title
              bold={true}
              level={1}
              bordered={false}
              ellipsis={true}
              __component_name="Typography.Title"
            >
              {this.i18n('i18n-t06rg1nj') /* 模型服务 */}
            </Typography.Title>
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
              <Tabs
                size="default"
                type="line"
                items={[
                  {
                    key: 'local-model',
                    label: this.i18n('i18n-5bh3fx4n') /* 本地模型服务 */,
                    children: (
                      <Row wrap={true} __component_name="Row">
                        <Col span={24} __component_name="Col">
                          <Row wrap={false} justify="space-between" __component_name="Row">
                            <Col span={8} __component_name="Col">
                              <Space align="center" direction="horizontal" __component_name="Space">
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
                                    return this.onClickCreatModel.apply(
                                      this,
                                      Array.prototype.slice.call(arguments).concat([])
                                    );
                                  }.bind(this)}
                                  disabled={false}
                                  __component_name="Button"
                                >
                                  {this.i18n('i18n-d43b7hfv') /* 新增模型服务 */}
                                </Button>
                                <Button
                                  icon={<TenxIconRefresh __component_name="TenxIconRefresh" />}
                                  block={false}
                                  ghost={false}
                                  shape="default"
                                  danger={false}
                                  disabled={false}
                                  __component_name="Button"
                                >
                                  {this.i18n('i18n-jch93moe') /* 刷新 */}
                                </Button>
                                <Input.Search
                                  placeholder={
                                    this.i18n('i18n-f591ezbf') /* 请输入模型服务名称搜索 */
                                  }
                                  __component_name="Input.Search"
                                />
                              </Space>
                            </Col>
                            <Col __component_name="Col">
                              <Row wrap={false} justify="space-between" __component_name="Row">
                                <Col __component_name="Col">
                                  <Select
                                    open={false}
                                    style={{ width: 200 }}
                                    value={[]}
                                    options={[
                                      { label: 'A', value: 'A' },
                                      { label: 'B', value: 'B' },
                                      { label: 'C', value: 'C' },
                                    ]}
                                    children=""
                                    disabled={false}
                                    allowClear={true}
                                    showSearch={true}
                                    placeholder="请选择"
                                    _sdkSwrGetFunc={{ label: '', params: [] }}
                                    __component_name="Select"
                                  />
                                </Col>
                                <Col __component_name="Col">
                                  <Select
                                    style={{ width: 200 }}
                                    options={[
                                      { label: 'A', value: 'A' },
                                      { label: 'B', value: 'B' },
                                      { label: 'C', value: 'C' },
                                    ]}
                                    disabled={false}
                                    allowClear={true}
                                    showSearch={true}
                                    placeholder="请选择"
                                    _sdkSwrGetFunc={{}}
                                    __component_name="Select"
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={24} __component_name="Col">
                          <List
                            grid={{
                              lg: 4,
                              md: 4,
                              sm: 4,
                              xl: 4,
                              xs: 4,
                              xxl: 4,
                              column: 4,
                              gutter: 20,
                            }}
                            size="small"
                            split={false}
                            rowKey="id"
                            bordered={false}
                            dataSource={[
                              {
                                id: 'modelservice1',
                                text: 'Racing car sprays burning fuel into crowd.',
                                title: '模型服务1',
                              },
                              {
                                id: 'modelservice2',
                                text: 'Japanese princess to wed commoner.',
                                title: '模型服务2',
                              },
                              {
                                id: 'modelservice3',
                                text: 'Australian walks 100km after outback crash.',
                                title: '模型服务3',
                              },
                              {
                                id: 'modelservice4',
                                text: 'Man charged over missing wedding girl.',
                                title: '模型服务4',
                              },
                              {
                                id: 'modelservice5',
                                text: 'Los Angeles battles huge wildfires.',
                                title: '模型服务5',
                              },
                            ]}
                            gridEnable={true}
                            itemLayout="horizontal"
                            pagination={{
                              size: 'default',
                              simple: false,
                              position: 'bottom',
                              pagination: { pageSize: 5 },
                              showQuickJumper: false,
                              showSizeChanger: false,
                            }}
                            renderItem={item =>
                              (__$$context => (
                                <List.Item>
                                  <Card
                                    size="default"
                                    type="default"
                                    style={{ border: '1px solid #E2E2E2' }}
                                    actions={[]}
                                    loading={false}
                                    bordered={false}
                                    hoverable={false}
                                    __component_name="Card"
                                  >
                                    <Row wrap={true} gutter={[0, 0]} __component_name="Row">
                                      <Col span={24} __component_name="Col">
                                        <Row wrap={true} __component_name="Row">
                                          <Col
                                            span={24}
                                            style={{
                                              float: 'right',
                                              right: '0px',
                                              height: '0',
                                              zIndex: '1',
                                              display: 'flex',
                                              position: 'relative',
                                              justifyContent: 'flex-end',
                                            }}
                                            __component_name="Col"
                                          >
                                            <Dropdown
                                              menu={{
                                                items: [
                                                  {
                                                    key: 'offline',
                                                    label: this.i18n('i18n-vy7xpbxn') /* 下线 */,
                                                  },
                                                  {
                                                    key: 'edit',
                                                    label: this.i18n('i18n-str3pnrc') /* 编辑 */,
                                                  },
                                                  {
                                                    key: 'delete',
                                                    label: this.i18n('i18n-z0idrepg') /* 删除 */,
                                                  },
                                                ],
                                                onClick: function () {
                                                  return this.localMenuOnClick.apply(
                                                    this,
                                                    Array.prototype.slice.call(arguments).concat([])
                                                  );
                                                }.bind(__$$context),
                                              }}
                                              style={{ display: 'flex' }}
                                              trigger={['hover']}
                                              disabled={false}
                                              placement="bottomLeft"
                                              __component_name="Dropdown"
                                              destroyPopupOnHide={true}
                                            >
                                              <Button
                                                icon={
                                                  <AntdIconSettingOutlined __component_name="AntdIconSettingOutlined" />
                                                }
                                                type="link"
                                                block={false}
                                                ghost={false}
                                                shape="default"
                                                style={{
                                                  display: 'flex',
                                                  justifyContent: 'flex-end',
                                                }}
                                                danger={false}
                                                disabled={false}
                                                __component_name="Button"
                                              />
                                            </Dropdown>
                                          </Col>
                                        </Row>
                                        <Row
                                          wrap={false}
                                          style={{
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                          }}
                                          onClick={function () {
                                            return this.onClickToDetail.apply(
                                              this,
                                              Array.prototype.slice.call(arguments).concat([
                                                {
                                                  id: item?.id,
                                                },
                                              ])
                                            );
                                          }.bind(__$$context)}
                                          __component_name="Row"
                                        >
                                          <Col flex="40px" __component_name="Col">
                                            <Image
                                              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                              width={40}
                                              height={40}
                                              preview={false}
                                              fallback=""
                                              __component_name="Image"
                                            />
                                          </Col>
                                          <Col flex="auto" __component_name="Col">
                                            <Row
                                              wrap={true}
                                              style={{ paddingLeft: '10px' }}
                                              gutter={[0, 0]}
                                              __component_name="Row"
                                            >
                                              <Col
                                                span={24}
                                                style={{ marginBottom: '10px' }}
                                                __component_name="Col"
                                              >
                                                <Typography.Title
                                                  bold={true}
                                                  level={1}
                                                  bordered={false}
                                                  ellipsis={true}
                                                  __component_name="Typography.Title"
                                                >
                                                  {__$$eval(() => item?.title)}
                                                </Typography.Title>
                                              </Col>
                                              <Col span={24} __component_name="Col">
                                                <Typography.Paragraph
                                                  code={false}
                                                  mark={false}
                                                  style={{ fontSize: '' }}
                                                  delete={false}
                                                  strong={false}
                                                  disabled={false}
                                                  editable={false}
                                                  ellipsis={{ rows: 2 }}
                                                  underline={false}
                                                >
                                                  {__$$eval(() => item.text)}
                                                </Typography.Paragraph>
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Col span={24} __component_name="Col">
                                        <Divider
                                          mode="line"
                                          style={{
                                            width: 'calc(100% + 48px)',
                                            marginLeft: '-24px',
                                          }}
                                          dashed={false}
                                          defaultOpen={false}
                                          __component_name="Divider"
                                        />
                                        <Descriptions
                                          id=""
                                          size="default"
                                          colon={false}
                                          items={[
                                            {
                                              key: 'rtilj4ro9ua',
                                              span: 1,
                                              label: this.i18n('i18n-p7mextst') /* 状态 */,
                                              children: (
                                                <Status
                                                  id="publish"
                                                  types={[
                                                    {
                                                      id: 'publish',
                                                      type: 'success',
                                                      children: '已发布',
                                                    },
                                                    {
                                                      id: 'loading',
                                                      type: 'info',
                                                      children: '部署中',
                                                    },
                                                    {
                                                      id: 'disabled',
                                                      type: 'disabled',
                                                      children: '未知',
                                                    },
                                                  ]}
                                                  __component_name="Status"
                                                />
                                              ),
                                            },
                                            {
                                              key: '2yzo8dyskna',
                                              span: 1,
                                              label: this.i18n('i18n-uag94ndq') /* 更新时间 */,
                                              children: (
                                                <Typography.Time
                                                  time=""
                                                  format=""
                                                  relativeTime={false}
                                                  __component_name="Typography.Time"
                                                />
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
                                        />
                                      </Col>
                                    </Row>
                                  </Card>
                                </List.Item>
                              ))(__$$createChildContext(__$$context, { item }))
                            }
                            __component_name="List"
                          />
                        </Col>
                      </Row>
                    ),
                  },
                  {
                    key: 'outside-model',
                    label: this.i18n('i18n-aayy2k5c') /* 外部模型服务 */,
                    children: (
                      <Row wrap={true} __component_name="Row">
                        <Col span={24} __component_name="Col">
                          <Row wrap={false} justify="space-between" __component_name="Row">
                            <Col __component_name="Col">
                              <Space align="center" direction="horizontal" __component_name="Space">
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
                                    return this.onClickCreatOutsideModel.apply(
                                      this,
                                      Array.prototype.slice.call(arguments).concat([])
                                    );
                                  }.bind(this)}
                                  disabled={false}
                                  __component_name="Button"
                                >
                                  {this.i18n('i18n-d43b7hfv') /* 新增模型服务 */}
                                </Button>
                                <Button
                                  icon={<TenxIconRefresh __component_name="TenxIconRefresh" />}
                                  block={false}
                                  ghost={false}
                                  shape="default"
                                  danger={false}
                                  disabled={false}
                                  __component_name="Button"
                                >
                                  {this.i18n('i18n-qpx0jbpu') /* 刷新 */}
                                </Button>
                                <Input.Search
                                  placeholder={
                                    this.i18n('i18n-f591ezbf') /* 请输入模型服务名称搜索 */
                                  }
                                  __component_name="Input.Search"
                                />
                              </Space>
                            </Col>
                            <Col __component_name="Col">
                              <Row wrap={false} justify="space-between" __component_name="Row">
                                <Col __component_name="Col">
                                  <Select
                                    style={{ width: 200 }}
                                    options={[
                                      { label: 'A', value: 'A' },
                                      { label: 'B', value: 'B' },
                                      { label: 'C', value: 'C' },
                                    ]}
                                    disabled={false}
                                    allowClear={true}
                                    showSearch={true}
                                    placeholder="请选择"
                                    _sdkSwrGetFunc={{}}
                                    __component_name="Select"
                                  />
                                </Col>
                                <Col __component_name="Col">
                                  <Select
                                    style={{ width: 200 }}
                                    options={[
                                      { label: 'A', value: 'A' },
                                      { label: 'B', value: 'B' },
                                      { label: 'C', value: 'C' },
                                    ]}
                                    disabled={false}
                                    allowClear={true}
                                    showSearch={true}
                                    placeholder="请选择"
                                    _sdkSwrGetFunc={{}}
                                    __component_name="Select"
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={24} __component_name="Col">
                          <List
                            grid={{
                              lg: 4,
                              md: 4,
                              sm: 4,
                              xl: 4,
                              xs: 4,
                              xxl: 4,
                              column: 4,
                              gutter: 20,
                            }}
                            size="small"
                            split={false}
                            rowKey="id"
                            bordered={false}
                            dataSource={[
                              {
                                id: 'outmodelservice1',
                                text: 'Racing car sprays burning fuel into crowd.',
                                title: '外部模型服务1',
                              },
                              {
                                id: 'outmodelservice2',
                                text: 'Japanese princess to wed commoner.',
                                title: '外部模型服务2',
                              },
                              {
                                id: 'outmodelservice3',
                                text: 'Australian walks 100km after outback crash.',
                                title: '外部模型服务3',
                              },
                              {
                                id: 'outmodelservice4',
                                text: 'Man charged over missing wedding girl.',
                                title: '外部模型服务4',
                              },
                              {
                                id: 'outmodelservice5',
                                text: 'Los Angeles battles huge wildfires.',
                                title: '外部模型服务5',
                              },
                            ]}
                            itemLayout="horizontal"
                            pagination={{
                              size: 'default',
                              simple: false,
                              position: 'bottom',
                              pagination: { pageSize: 5 },
                              showQuickJumper: false,
                              showSizeChanger: false,
                            }}
                            renderItem={item =>
                              (__$$context => (
                                <List.Item>
                                  <Card
                                    size="default"
                                    type="default"
                                    style={{ border: '1px solid #E2E2E2' }}
                                    actions={[]}
                                    loading={false}
                                    bordered={false}
                                    hoverable={false}
                                    __component_name="Card"
                                  >
                                    <Row wrap={true} __component_name="Row">
                                      <Col
                                        span={24}
                                        style={{
                                          float: 'right',
                                          right: '0px',
                                          height: '0',
                                          zIndex: '1',
                                          display: 'flex',
                                          position: 'relative',
                                          justifyContent: 'flex-end',
                                        }}
                                        __component_name="Col"
                                      >
                                        <Dropdown
                                          menu={{
                                            items: [
                                              {
                                                key: 'offline',
                                                label: this.i18n('i18n-vy7xpbxn') /* 下线 */,
                                              },
                                              {
                                                key: 'edit',
                                                label: this.i18n('i18n-iljnr6om') /* 编辑 */,
                                              },
                                              {
                                                key: 'delete',
                                                label: this.i18n('i18n-z0idrepg') /* 删除 */,
                                              },
                                            ],
                                            onClick: function () {
                                              return this.externalMenuOnClick.apply(
                                                this,
                                                Array.prototype.slice.call(arguments).concat([])
                                              );
                                            }.bind(__$$context),
                                          }}
                                          style={{ display: 'flex' }}
                                          trigger={['hover']}
                                          disabled={false}
                                          placement="bottomLeft"
                                          __component_name="Dropdown"
                                          destroyPopupOnHide={true}
                                        >
                                          <Button
                                            icon={
                                              <AntdIconSettingOutlined __component_name="AntdIconSettingOutlined" />
                                            }
                                            type="link"
                                            block={false}
                                            ghost={false}
                                            shape="default"
                                            style={{ display: 'flex', justifyContent: 'flex-end' }}
                                            danger={false}
                                            disabled={false}
                                            __component_name="Button"
                                          />
                                        </Dropdown>
                                      </Col>
                                    </Row>
                                    <Row wrap={true} gutter={[0, 0]} __component_name="Row">
                                      <Col span={24} __component_name="Col">
                                        <Row
                                          wrap={false}
                                          style={{
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                          }}
                                          gutter={[0, 0]}
                                          onClick={function () {
                                            return this.onClickOutToDetail.apply(
                                              this,
                                              Array.prototype.slice.call(arguments).concat([
                                                {
                                                  id: item?.id,
                                                },
                                              ])
                                            );
                                          }.bind(__$$context)}
                                          __component_name="Row"
                                        >
                                          <Col flex="40px" __component_name="Col">
                                            <Image
                                              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                              width={40}
                                              height={40}
                                              preview={false}
                                              fallback=""
                                              __component_name="Image"
                                            />
                                          </Col>
                                          <Col flex="auto" __component_name="Col">
                                            <Row
                                              wrap={true}
                                              style={{ paddingLeft: '10px' }}
                                              gutter={[0, 0]}
                                              __component_name="Row"
                                            >
                                              <Col
                                                span={24}
                                                style={{ marginBottom: '10px' }}
                                                __component_name="Col"
                                              >
                                                <Typography.Title
                                                  bold={true}
                                                  level={1}
                                                  bordered={false}
                                                  ellipsis={true}
                                                  __component_name="Typography.Title"
                                                >
                                                  {__$$eval(() => item?.title)}
                                                </Typography.Title>
                                              </Col>
                                              <Col span={24} __component_name="Col">
                                                <Typography.Paragraph
                                                  code={false}
                                                  mark={false}
                                                  style={{ fontSize: '' }}
                                                  delete={false}
                                                  strong={false}
                                                  disabled={false}
                                                  editable={false}
                                                  ellipsis={{ rows: 2 }}
                                                  underline={false}
                                                >
                                                  {__$$eval(() => item.text)}
                                                </Typography.Paragraph>
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Col __component_name="Col">
                                        <Divider
                                          mode="line"
                                          style={{
                                            width: 'calc(100% + 48px)',
                                            marginLeft: '-24px',
                                          }}
                                          dashed={false}
                                          defaultOpen={false}
                                          __component_name="Divider"
                                        />
                                        <Descriptions
                                          id=""
                                          size="default"
                                          colon={false}
                                          items={[
                                            {
                                              key: 'fz8dylsbyxk',
                                              span: 1,
                                              label: this.i18n('i18n-p7mextst') /* 状态 */,
                                              children: (
                                                <Status
                                                  id="deploying"
                                                  types={[
                                                    {
                                                      id: 'deploying',
                                                      type: 'info',
                                                      children:
                                                        this.i18n('i18n-chz7ktkd') /* 部署中 */,
                                                    },
                                                    {
                                                      id: 'disabled',
                                                      type: 'disabled',
                                                      children: '未知',
                                                    },
                                                  ]}
                                                  __component_name="Status"
                                                />
                                              ),
                                            },
                                            {
                                              key: 'bnjy5sx3ya8',
                                              span: 1,
                                              label: this.i18n('i18n-uag94ndq') /* 更新时间 */,
                                              children: (
                                                <Typography.Time
                                                  time=""
                                                  format=""
                                                  relativeTime={false}
                                                  __component_name="Typography.Time"
                                                />
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
                                        />
                                      </Col>
                                    </Row>
                                  </Card>
                                </List.Item>
                              ))(__$$createChildContext(__$$context, { item }))
                            }
                            __component_name="List"
                          />
                        </Col>
                      </Row>
                    ),
                  },
                ]}
                style={{ border: '1px solid #E2E2E2' }}
                activeKey=""
                tabPosition="top"
                __component_name="Tabs"
                defaultActiveKey="local-model"
                destroyInactiveTabPane="true"
              />
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/model-service' }, location.pathname);
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
      sdkSwrFuncs={[]}
      render={dataProps => (
        <ModelService$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
