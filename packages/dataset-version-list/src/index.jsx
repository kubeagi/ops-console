// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import { Component, Table, Typography, Dropdown } from '@tenx-ui/materials';

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

    this.state = {
      dataset: {},
      datasource: [],
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    console.log('will unmount');
  }

  getProps() {
    if (this.props.isProd) return this.props;
    return {
      dataset: this.state.dataset,
      datasource: this.state.datasource,
    };
  }

  delVersion(params) {
    this.utils.Modal.confirm({
      title: '删除数据集版本',
      content: `确定删除数据集：${params.dataset.name} 下版本：${params.version.version}？`,
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
    });
  }

  onDropdownClick(event, params) {
    if (event.key === 'delete') {
      this.delVersion(params);
    }
  }

  componentDidMount() {
    console.log('did mount');
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Component>
        <Table
          size="middle"
          rowKey="id"
          scroll={{ scrollToFirstRowOnChange: true }}
          columns={[
            { key: 'version', title: '版本', dataIndex: 'version' },
            {
              key: 'syncStatus',
              title: '导入状态',
              render: (text, record) =>
                ({
                  FileSyncing: '同步中',
                  FileSyncFailed: '同步失败',
                  FileSyncSuccess: '同步成功',
                }[text] || '未知'),
              dataIndex: 'syncStatus',
            },
            {
              key: 'dataProcessStatus',
              title: '数据处理状态',
              render: (text, record) => text || '未开始',
              dataIndex: 'dataProcessStatus',
            },
            {
              key: 'released',
              title: '发布状态',
              render: (text, record) =>
                ({
                  0: '未发布',
                  1: '已发布',
                }[text] || '未知'),
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
                      items: __$$eval(() =>
                        (() => {
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
                        })()
                      ),
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
          dataSource={__$$eval(() => this.getProps().datasource)}
          pagination={{
            size: 'default',
            total: 15,
            simple: false,
            current: 1,
            pageSize: 10,
            position: ['topRight'],
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

const ComponentWrapper = (props = {}) => {
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
        <DatasetVersionList$$Component
          {...props}
          {...dataProps}
          self={self}
          appHelper={appHelper}
        />
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
