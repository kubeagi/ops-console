// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import { Component, Table, Status, Typography, Dropdown } from '@tenx-ui/materials';

import LccComponentSbva0 from 'confirm';

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
      },
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    console.log('will unmount');
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

  getProps() {
    if (this.props.isProd) return this.props;
    return {
      dataset: this.mockData.data.Dataset.getDataset,
      datasource: this.mockData.data.Dataset.getDataset.versions.nodes,
    };
  }

  toDetail(event, params) {
    this.history.push(`/dataset/detail/${params.datasetName}/version/${params.versionName}`);
  }

  delVersion(params) {
    this.setState({
      confirm: {
        id: new Date().getTime(),
        title: '删除数据集版本',
        content: `确定删除数据集：${params.dataset.name} - ${params.version.version}？`,
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
      },
      {
        key: 'release',
        label: '发布',
        index: 3,
      }
    );
    return list.sort((a, b) => a.index - b.index);
  }

  onDropdownClick(event, params) {
    if (event.key === 'delete') {
      return this.delVersion(params);
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

  componentDidMount() {
    console.log('did mount', this.getProps());
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Component>
        <LccComponentSbva0
          data={__$$eval(() => this.state.confirm)}
          __component_name="LccComponentSbva0"
        />
        <Table
          size="middle"
          rowKey="version"
          scroll={{ scrollToFirstRowOnChange: true }}
          columns={[
            { key: 'version', title: '版本', dataIndex: 'version' },
            {
              key: 'syncStatus',
              title: '导入状态',
              render: (text, record, index) =>
                (__$$context => (
                  <Status
                    id={__$$eval(() => record.syncStatus)}
                    types={__$$eval(() => __$$context.constants.DATASET_DATA.syncStatus)}
                    __component_name="Status"
                  />
                ))(__$$createChildContext(__$$context, { text, record, index })),
              dataIndex: 'syncStatus',
            },
            {
              key: 'dataProcessStatus',
              title: '数据处理状态',
              render: (text, record, index) =>
                (__$$context => (
                  <Status
                    id={__$$eval(() => record.dataProcessStatus)}
                    types={__$$eval(() => __$$context.constants.DATASET_DATA.dataProcessStatus)}
                    __component_name="Status"
                  />
                ))(__$$createChildContext(__$$context, { text, record, index })),
              dataIndex: 'dataProcessStatus',
            },
            {
              key: 'released',
              title: '发布状态',
              render: (text, record, index) =>
                (__$$context => (
                  <Status
                    id={__$$eval(() => record.released)}
                    types={__$$eval(() => __$$context.constants.DATASET_DATA.released)}
                    __component_name="Status"
                  />
                ))(__$$createChildContext(__$$context, { text, record, index })),
              dataIndex: 'released',
            },
            {
              key: 'files',
              title: '数据量',
              render: (text, record) => text.totalCount,
              dataIndex: 'files',
            },
            {
              key: 'updateTimestamp',
              title: '最后更新时间',
              render: (text, record, index) =>
                (__$$context => (
                  <Typography.Time
                    time={__$$eval(() => text)}
                    format=""
                    relativeTime={true}
                    __component_name="Typography.Time"
                  />
                ))(__$$createChildContext(__$$context, { text, record, index })),
              dataIndex: 'updateTimestamp',
            },
            {
              key: 'action',
              title: '操作',
              render: (text, record, index) =>
                (__$$context => (
                  <Dropdown.Button
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
                    style={{}}
                    danger={false}
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
                    trigger={['hover']}
                    disabled={false}
                    placement="bottomRight"
                    __component_name="Dropdown.Button"
                    destroyPopupOnHide={true}
                  >
                    <Typography.Text
                      style={{ fontSize: '', paddingTop: '3px' }}
                      strong={false}
                      disabled={false}
                      ellipsis={true}
                      __component_name="Typography.Text"
                    >
                      查看详情
                    </Typography.Text>
                  </Dropdown.Button>
                ))(__$$createChildContext(__$$context, { text, record, index })),
              dataIndex: 'action',
            },
          ]}
          dataSource={__$$eval(() => this.getProps().datasource || [])}
          pagination={{
            size: 'default',
            simple: false,
            pageSize: 10,
            position: ['bottomRight'],
            pagination: { pageSize: 10 },
            showQuickJumper: false,
            showSizeChanger: false,
            _unsafe_MixedSetter_position_select: 'ArraySetter',
          }}
          showHeader={true}
          __component_name="Table"
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
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
