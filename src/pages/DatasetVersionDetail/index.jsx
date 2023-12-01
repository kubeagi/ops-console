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
  Divider,
  Tabs,
  Descriptions,
  Pagination,
  Table,
} from '@tenx-ui/materials';

import { TenxIconCircle } from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class DatasetVersionDetail$$Page extends React.Component {
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

  data() {
    console.log(
      'data',
      this.props.useGetVersionedDataset.data?.VersionedDataset?.getVersionedDataset || {}
    );
    return {
      ...this.props.useGetVersionedDataset,
      data: this.props.useGetVersionedDataset.data?.VersionedDataset?.getVersionedDataset || {},
    };
  }

  testFunc() {
    console.log('test aliLowcode func');
    return <div className="test-aliLowcode-func">{this.state.test}</div>;
  }

  componentDidMount() {
    console.log('did mount', this, this.utils, this.constants);
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Row wrap={true} __component_name="Row">
          <Col span={24} style={{ marginBottom: '16px' }} __component_name="Col">
            <Space align="center" direction="horizontal" __component_name="Space">
              <Button.Back
                type="ghost"
                title={this.i18n('i18n-k7qioby7') /* 数据集版本详情 */}
                __component_name="Button.Back"
              />
            </Space>
          </Col>
        </Row>
        <Card
          size="default"
          type="default"
          style={{ marginBottom: '16px' }}
          actions={[]}
          loading={false}
          bordered={false}
          hoverable={false}
          __component_name="Card"
        >
          <Row __component_name="Row">
            <Col flex="470px" __component_name="Col">
              <Row wrap={true} __component_name="Row">
                <Col span={4} __component_name="Col">
                  <Image
                    src={__$$eval(() => this.constants.DATASET_DATA.versionImg)}
                    width={64}
                    height={64}
                    preview={false}
                    fallback=""
                    __component_name="Image"
                  />
                </Col>
                <Col span={6} __component_name="Col">
                  <Row wrap={true} __component_name="Row">
                    <Col span={24} __component_name="Col">
                      <Typography.Title
                        bold={true}
                        level={1}
                        bordered={false}
                        ellipsis={true}
                        __component_name="Typography.Title"
                      >
                        {__$$eval(() => this.data().data?.version || '-')}
                      </Typography.Title>
                    </Col>
                    <Col flex="" span={24} __component_name="Col">
                      <Space
                        align="center"
                        style={{ width: '300px' }}
                        direction="horizontal"
                        __component_name="Space"
                      >
                        <Row wrap={true} __component_name="Row">
                          <Col span={24} style={{ display: 'flex' }} __component_name="Col">
                            <TenxIconCircle
                              style={{ marginRight: '4px' }}
                              __component_name="TenxIconCircle"
                            />
                            <Typography.Text
                              style={{ fontSize: '' }}
                              strong={false}
                              disabled={false}
                              ellipsis={true}
                              __component_name="Typography.Text"
                            >
                              {__$$eval(
                                () =>
                                  ({
                                    FileSyncing: '同步中',
                                    FileSyncFailed: '同步失败',
                                    FileSyncSuccess: '同步成功',
                                  }[this.data().data?.syncStatus] || '未知')
                              )}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <Divider
                          mode="default"
                          type="vertical"
                          dashed={false}
                          defaultOpen={false}
                          __component_name="Divider"
                        />
                        <Typography.Text
                          style={{ fontSize: '', paddingBottom: '3px' }}
                          strong={false}
                          disabled={false}
                          ellipsis={true}
                          __component_name="Typography.Text"
                        >
                          更新时间:
                        </Typography.Text>
                        <Typography.Time
                          time={__$$eval(() => this.data().data?.updateTimestamp)}
                          format=""
                          relativeTime={true}
                          __component_name="Typography.Time"
                        />
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col
              flex="auto"
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
              __component_name="Col"
            >
              <Space align="center" direction="horizontal" __component_name="Space">
                <Button
                  block={false}
                  ghost={false}
                  shape="default"
                  danger={false}
                  disabled={false}
                  __component_name="Button"
                >
                  删除
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
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
                key: 'tab-item-1',
                label: this.i18n('i18n-1gikmooh') /* 详细信息 */,
                children: (
                  <Descriptions
                    id=""
                    size="default"
                    colon={false}
                    items={[
                      {
                        key: '0whadic76h29',
                        span: 24,
                        label: '名称',
                        children: __$$eval(() => this.data().data?.name),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                      {
                        key: '2y97byqciee',
                        span: 24,
                        label: 'ID',
                        children: __$$eval(() => this.data().data?.ID || '-'),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                      {
                        key: 'xvcp3obfu',
                        span: 24,
                        label: this.i18n('i18n-ks28cpqo') /* 导入状态 */,
                        children: __$$eval(
                          () =>
                            ({
                              FileSyncing: '同步中',
                              FileSyncFailed: '同步失败',
                              FileSyncSuccess: '同步成功',
                            }[this.data().data?.syncStatus] || '未知')
                        ),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                      {
                        key: 'er0ptk5lill',
                        span: 24,
                        label: this.i18n('i18n-p5qipded') /* 数据处理状态 */,
                        children: __$$eval(() => this.data().data?.dataProcessStatus || '未开始'),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                      {
                        key: 'vu3tjo4pcas',
                        span: 24,
                        label: '发布状态',
                        children: __$$eval(
                          () =>
                            ({
                              0: '未发布',
                              1: '已发布',
                            }[this.data().data?.released] || '未知')
                        ),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                      {
                        key: 'ww04wf6evps',
                        span: 24,
                        label: this.i18n('i18n-qjodl1nn') /* 创建时间 */,
                        children: (
                          <Typography.Time
                            time={__$$eval(() => this.data().data?.creationTimestamp)}
                            format=""
                            relativeTime={true}
                            __component_name="Typography.Time"
                          />
                        ),
                        _unsafe_MixedSetter_children_select: 'SlotSetter',
                      },
                      {
                        key: 'ajc9nhn140i',
                        span: 24,
                        label: this.i18n('i18n-sg7nu8tx') /* 创建者 */,
                        children: __$$eval(() => this.data().data?.creator || '-'),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                      {
                        key: '3p5bkjlrh9u',
                        span: 24,
                        label: this.i18n('i18n-txt5kh4m') /* 描述 */,
                        children: __$$eval(() => this.data().data?.description || '-'),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                    ]}
                    title=""
                    column={3}
                    layout="horizontal"
                    bordered={false}
                    labelStyle={{ width: 100 }}
                    borderedBottom={false}
                    __component_name="Descriptions"
                    borderedBottomDashed={false}
                  />
                ),
              },
              {
                key: 'fxyz5e43ztm',
                label: '文件',
                children: [
                  <Row wrap={false} __component_name="Row" key="node_oclpkviwvr1">
                    <Col flex="270px" __component_name="Col">
                      <Space
                        align="center"
                        style={{}}
                        direction="horizontal"
                        __component_name="Space"
                      >
                        <Button
                          type="primary"
                          block={false}
                          ghost={false}
                          shape="default"
                          danger={false}
                          disabled={false}
                          __component_name="Button"
                        >
                          新增文件
                        </Button>
                        <Button
                          block={false}
                          ghost={false}
                          shape="default"
                          style={{}}
                          danger={false}
                          disabled={false}
                          __component_name="Button"
                        >
                          删除
                        </Button>
                      </Space>
                    </Col>
                    <Col
                      flex="auto"
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                      __component_name="Col"
                    >
                      <Pagination
                        total={__$$eval(() => this.data().data?.files.totalCount)}
                        simple={false}
                        current={1}
                        pageSize={10}
                        __component_name="Pagination"
                      />
                    </Col>
                  </Row>,
                  <Table
                    size="middle"
                    style={{}}
                    rowKey="id"
                    scroll={{ scrollToFirstRowOnChange: true }}
                    columns={[
                      {
                        key: 'path',
                        title: '文件',
                        ellipsis: { showTitle: true },
                        dataIndex: 'path',
                      },
                      { key: 'fileType', title: '标签', dataIndex: 'fileType' },
                      { key: 'size', title: '文件大小', dataIndex: 'size' },
                      {
                        key: 'time',
                        title: '创建时间',
                        render: (text, record, index) =>
                          (__$$context => (
                            <Typography.Time
                              time={__$$eval(() => record.time)}
                              format=""
                              relativeTime={true}
                              __component_name="Typography.Time"
                            />
                          ))(__$$createChildContext(__$$context, { text, record, index })),
                        dataIndex: 'time',
                      },
                      {
                        key: 'action',
                        title: '操作',
                        render: (text, record, index) =>
                          (__$$context => (
                            <Button
                              icon=""
                              block={false}
                              ghost={false}
                              shape="default"
                              danger={false}
                              disabled={false}
                              __component_name="Button"
                            >
                              删除
                            </Button>
                          ))(__$$createChildContext(__$$context, { text, record, index })),
                        dataIndex: '',
                      },
                    ]}
                    dataSource={__$$eval(() => this.data().data?.files?.nodes || [])}
                    pagination={false}
                    showHeader={true}
                    __component_name="Table"
                    key="node_oclpktaw526"
                  />,
                ],
              },
            ]}
            style={{ marginTop: '-20px' }}
            activeKey=""
            tabPosition="top"
            __component_name="Tabs"
            destroyInactiveTabPane="true"
          />
        </Card>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/dataset/detail/:id/version/:versionId' }, location.pathname);
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
      sdkSwrFuncs={[
        {
          func: 'useGetVersionedDataset',
          params: function applyThis() {
            return {
              name: this.match?.params?.versionId,
              namespace: this.utils.getAuthData?.()?.project,
            };
          }.apply(self),
          enableLocationSearch: undefined,
        },
      ]}
      render={dataProps => (
        <DatasetVersionDetail$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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