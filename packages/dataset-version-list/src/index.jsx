// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import { Component, Table, Status, Tooltip, Typography, Dropdown } from '@tenx-ui/materials';

import LccComponentSbva0 from 'confirm';

import { AntdIconInfoCircleOutlined } from '@tenx-ui/icon-materials';

import { DataProvider } from 'shared-components';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from './utils/__utils';

import * as __$$i18n from './i18n';

import __$$constants from './__constants';

import './index.css';

class DatasetVersionList$$Component extends React.Component {
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

    this.state = { confirm: {}, current: 1 };

    this.mockData = {
      data: {
        Dataset: {
          getDataset: {},
        },
      },
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    console.log('will unmount');
  }

  delVersion(params) {
    this.setState({
      confirm: {
        id: new Date().getTime(),
        title: '删除数据集版本',
        content: `确定删除数据集版本：${params.dataset.name} - ${params.version.version}？`,
        onOk: async () => {
          const res = await this.utils.bff
            .deleteVersionedDatasets({
              input: {
                namespace: params.dataset.namespace,
                name: params.version.name,
              },
            })
            .catch(e => {
              this.utils.notification.warn({
                message: '删除数据集版本失败',
              });
            });
          this.utils.notification.success({
            message: '删除数据集版本成功',
          });
          this.props.refresh?.(params);
        },
      },
    });
  }

  dropdownList(record) {
    const list = [
      {
        key: 'delete',
        label: '删除',
        index: 5,
      },
    ];
    if (record.released) return list;
    list.unshift({
      key: 'import',
      label: '导入数据',
      index: 1,
    });
    if (record.syncStatus !== 'FileSyncSuccess') {
      return list;
    }
    list.push(
      {
        key: 'dataProcess',
        label: '数据处理',
        index: 2,
      }
      // , {
      //   key: 'release',
      //   label: '发布',
      //   index: 3
      // }
    );

    return list.sort((a, b) => a.index - b.index);
  }

  getProps() {
    if (this.props.dataset) return this.props;
    return {
      dataset: this.mockData.data?.Dataset?.getDataset || {},
      datasource: this.mockData.data?.Dataset?.getDataset?.versions?.nodes || [],
    };
  }

  onDropdownClick(event, params) {
    if (event.key === 'delete') {
      return this.delVersion(params);
    }
    if (event.key === 'dataProcess') {
      return this.history.push(
        `/data-handle/create?dataset=${params.dataset.name}&datasetVersion=${params.version.version}`
      );
    }
    if (event.key === 'import') {
      return this.props.onImportDataClick(params);
    }
    if (event.key === 'release') {
      return this.release(params);
    }
  }

  onPaginationChange(page, pageSize) {
    // 页码或 pageSize 改变的回调
    this.setState({
      current: page,
    });
  }

  release(params) {
    this.setState({
      confirm: {
        id: new Date().getTime(),
        title: '发布数据集',
        content: `数据发布后不可更改，确定发布：${params.dataset.name} - ${params.version.version}？`,
        onOk: async () => {
          const res = await this.utils.bff
            .updateVersionedDataset({
              input: {
                namespace: params.dataset.namespace,
                name: params.version.name,
                released: 1,
              },
            })
            .then(res => {
              this.utils.notification.success({
                message: '发布数据集版本成功',
              });
              this.props.refresh?.(params);
            })
            .catch(e => {
              this.utils.notification.warn({
                message: '发布数据集版本失败',
              });
            });
        },
      },
    });
  }

  toDetail(event, params) {
    this.history.push(`/dataset/detail/${params.datasetName}/version/${params.versionName}`);
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Component>
        <LccComponentSbva0
          __component_name="LccComponentSbva0"
          data={__$$eval(() => this.state.confirm)}
        />
        <Table
          __component_name="Table"
          columns={[
            { dataIndex: 'version', key: 'version', title: '版本' },
            {
              dataIndex: 'syncStatus',
              key: 'syncStatus',
              render: (text, record, index) =>
                (__$$context => [
                  <Status
                    __component_name="Status"
                    id={__$$eval(() => record.syncStatus || 'no')}
                    types={__$$eval(() => __$$context.constants.DATASET_DATA.syncStatus)}
                    key="node_oclq0j0t8v2"
                  />,
                  !!__$$eval(() => Boolean(record.syncMsg)) && (
                    <Tooltip
                      __component_name="Tooltip"
                      title={__$$eval(() => record.syncMsg)}
                      key="node_oclrfqj3ub5"
                    >
                      <AntdIconInfoCircleOutlined
                        __component_name="AntdIconInfoCircleOutlined"
                        style={{ marginLeft: '4px' }}
                      />
                    </Tooltip>
                  ),
                ])(__$$createChildContext(__$$context, { text, record, index })),
              title: '导入状态',
            },
            {
              dataIndex: 'dataProcessStatus',
              key: 'dataProcessStatus',
              render: (text, record, index) =>
                (__$$context => [
                  <Status
                    __component_name="Status"
                    id={__$$eval(() => record.dataProcessStatus || 'no')}
                    types={__$$eval(() => __$$context.constants.DATASET_DATA.dataProcessStatus)}
                    key="node_oclq0j0wvo2"
                  />,
                  !!__$$eval(() => Boolean(record.dataProcessMsg)) && (
                    <Tooltip
                      __component_name="Tooltip"
                      title={__$$eval(() => record.dataProcessMsg)}
                      key="node_oclrfqj3ub2"
                    >
                      <AntdIconInfoCircleOutlined
                        __component_name="AntdIconInfoCircleOutlined"
                        style={{ marginLeft: '4px' }}
                      />
                    </Tooltip>
                  ),
                ])(__$$createChildContext(__$$context, { text, record, index })),
              title: '数据处理状态',
            },
            {
              dataIndex: 'files',
              key: 'files',
              render: (text, record) => text.totalCount,
              title: '文件数量',
            },
            {
              dataIndex: 'updateTimestamp',
              key: 'updateTimestamp',
              render: (text, record, index) =>
                (__$$context => (
                  <Typography.Time
                    __component_name="Typography.Time"
                    format=""
                    relativeTime={true}
                    time={__$$eval(() => text)}
                  />
                ))(__$$createChildContext(__$$context, { text, record, index })),
              title: '最后更新时间',
            },
            {
              dataIndex: 'action',
              key: 'action',
              render: (text, record, index) =>
                (__$$context => (
                  <Dropdown.Button
                    __component_name="Dropdown.Button"
                    danger={false}
                    destroyPopupOnHide={true}
                    disabled={false}
                    menu={{
                      items: __$$eval(() => __$$context.dropdownList(record)),
                      onClick: function () {
                        return this.onDropdownClick.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([
                            {
                              version: record,
                              dataset: this.getProps().dataset,
                            },
                          ])
                        );
                      }.bind(__$$context),
                    }}
                    onClick={function () {
                      return this.toDetail.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([
                          {
                            versionName: record.name,
                            datasetName: this.getProps().dataset.name,
                          },
                        ])
                      );
                    }.bind(__$$context)}
                    placement="bottomRight"
                    style={{}}
                    trigger={['hover']}
                  >
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '', paddingTop: '3px' }}
                    >
                      查看详情
                    </Typography.Text>
                  </Dropdown.Button>
                ))(__$$createChildContext(__$$context, { text, record, index })),
              title: '操作',
            },
          ]}
          dataSource={__$$eval(() => this.getProps().datasource || [])}
          pagination={{
            _unsafe_MixedSetter_position_select: 'ArraySetter',
            pageSize: 10,
            pagination: { pageSize: 10 },
            position: ['bottomRight'],
            showQuickJumper: false,
            showSizeChanger: false,
            simple: false,
            size: 'default',
          }}
          rowKey="version"
          scroll={{ scrollToFirstRowOnChange: true }}
          showHeader={true}
          size="middle"
        />
      </Component>
    );
  }
}

const ComponentWrapper = React.forwardRef((props = {}, ref) => {
  const history = getUnifiedHistory();
  const appHelper = {
    utils,
    constants: __$$constants,
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
      sdkSwrFuncs={[]}
      render={dataProps => (
        <DatasetVersionList$$Component
          ref={ref}
          {...props}
          {...dataProps}
          self={self}
          appHelper={appHelper}
        />
      )}
    />
  );
});
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
