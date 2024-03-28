// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  Row,
  Col,
  Typography,
  Select,
  Input,
  Table,
  Button,
  Card,
  Image,
  Status,
  Tooltip,
  Space,
  Tabs,
  Descriptions,
  UnifiedLink,
  Flex,
} from '@tenx-ui/materials';

import LccComponentSbva0 from 'confirm';

import LccComponentChj61 from 'kubeagi-knowledge-delete-modal';

import LccComponentXnggv from 'kubeagi-knowledge-edit-modal';

import {
  AntdIconInfoCircleOutlined,
  AntdIconPlusOutlined,
  AntdIconReloadOutlined,
} from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class KnowledgeDetail$$Page extends React.Component {
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

    this.state = {
      addFileModalSearchText: undefined,
      addFilesModalConfirmBtnLoading: false,
      addFilesModalOpen: false,
      dataset: undefined,
      datasetList: [],
      datasetVersion: undefined,
      datasetVersionList: [],
      deleteModalOpen: false,
      editModalOpen: false,
      fileDelBtnsLoading: {},
      fileDelconfirm: {},
      modalFilesList: [],
      modalFilesListLoading: false,
      modalFilesSelectedKeys: [],
      searchText: undefined,
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {
    // console.log('will unmount');
  }

  countFileGroupDetails() {
    const detail = this.getFileGroupDetails();
    let processing = 0;
    let succeeded = 0;
    let failed = 0;
    detail.forEach(d => {
      if (d.phase === 'Processing') {
        processing++;
      } else if (d.phase === 'Succeeded') {
        succeeded++;
      } else if (d.phase === 'Failed') {
        failed++;
      }
    });
    return {
      total: detail.length,
      processing,
      succeeded,
      failed,
    };
  }

  getCurrentDatasetAndVersion() {
    const knowledge = this.getKnowledge();
    const fileGroupDetail = knowledge?.fileGroupDetails?.[0] || {};
    const name = fileGroupDetail.source?.name;
    return {
      dataset: this.state.dataset || name.slice(0, name.lastIndexOf('-')),
      version: this.state.datasetVersion || name,
    };
  }

  async getDatasetList() {
    const knowledge = this.getKnowledge();
    const res = await this.utils.bff.listDatasets({
      input: {
        namespace: knowledge?.namespace,
        page: 1,
        pageSize: 1000,
      },
      versionsInput: {
        namespace: knowledge?.namespace,
        page: 1,
        pageSize: 1000,
      },
      filesInput: {
        keyword: '',
        pageSize: 1,
        page: 1,
      },
    });
    const datasetList = (res.Dataset?.listDatasets?.nodes || []).map(item => {
      const versions = item.versions.nodes.map(i => ({
        label: i.version,
        value: i.name,
        files: i.files.nodes,
      }));
      return {
        label: this.utils.getFullName(item),
        value: item.name,
        contentType: item.contentType,
        versions: versions,
      };
    });
    const dataset = this.getCurrentDatasetAndVersion().dataset;
    this.setState({
      datasetList,
      datasetVersionList: datasetList.find(d => d.value === dataset)?.versions,
    });
  }

  getDefaultModalFilesSelectedKeys(datasetVersion) {
    const fileGroupDetail = this.getOneFileGroupDetail(datasetVersion);
    return fileGroupDetail.map(({ path }) => path);
  }

  getFileGroupDetails() {
    const fileGroupDetails = this.getKnowledge()?.fileGroupDetails || [];
    const filesDetails = [];
    const { searchText } = this.state;
    fileGroupDetails.forEach(fgd => {
      (fgd?.filedetails || []).forEach(detail => {
        if (!searchText || detail.path.toLowerCase().includes(searchText.toLowerCase())) {
          filesDetails.push({
            ...detail,
            source: fgd.source?.name,
          });
        }
      });
    });
    return filesDetails;
  }

  getFileModalCheckboxProps(record) {
    const fileGroupDetail = this.getOneFileGroupDetail(this.getCurrentDatasetAndVersion().version);
    return {
      name: record.path,
      disabled: fileGroupDetail.some(detail => detail.path === record.path),
    };
  }

  getKnowledge() {
    return this.props.useGetKnowledgeBase?.data?.KnowledgeBase?.getKnowledgeBase;
  }

  getModalFilesList() {
    const { modalFilesList, addFileModalSearchText } = this.state;
    if (!addFileModalSearchText) {
      return modalFilesList;
    }
    return modalFilesList.filter(file =>
      file.path.toLowerCase().includes(addFileModalSearchText.toLowerCase())
    );
  }

  getOneFileGroupDetail(name) {
    // 默认取第一个数据集
    const fileGroupDetails = this.getKnowledge()?.fileGroupDetails || [];
    let fileGroupDetail = fileGroupDetails[0];
    if (name) {
      fileGroupDetail = fileGroupDetails.find(fgd => fgd.source?.name === name);
    }
    return (fileGroupDetail?.filedetails || []).map(detail => ({
      ...detail,
      source: fileGroupDetail.source?.name,
    }));
  }

  getStatusType(status) {
    if (status === 'True') {
      return 'success';
    }
    if (status === 'False') {
      return 'error';
    }
    return 'process';
  }

  getTimeCost(timeCost) {
    if (!timeCost) {
      return '-';
    }
    if (timeCost < 1000) {
      return `${timeCost} ms`;
    }
    if (timeCost < 1000 * 60) {
      return `${(timeCost / 1000).toFixed(2)} s`;
    }
    return `${(timeCost / 1000 / 60).toFixed(2)} min`;
  }

  async getVersionedDataset(name) {
    const knowledge = this.getKnowledge();
    const fileGroupDetail = knowledge?.fileGroupDetails?.[0] || {};
    name = name || fileGroupDetail.source?.name;
    if (!name) {
      return;
    }
    this.setState({
      modalFilesListLoading: true,
      modalFilesList: [],
    });
    const res = await this.utils.bff.getVersionedDataset({
      namespace: knowledge?.namespace,
      name,
      fileInput: {
        pageSize: 999,
      },
    });
    this.setState({
      modalFilesListLoading: false,
      modalFilesList: res?.VersionedDataset?.getVersionedDataset?.files?.nodes || [],
    });
  }

  onAddFileModalSearchTextSubmit(value) {
    this.setState({
      addFileModalSearchText: value,
    });
  }

  onAddFilesCancel() {
    this.setState({
      addFilesModalOpen: false,
    });
  }

  async onAddFilesModalOk() {
    const { modalFilesSelectedKeys } = this.state;
    const knowledge = this.getKnowledge();
    const fileGroups = (knowledge.fileGroupDetails || []).map(fgd => ({
      source: fgd.source,
      files: fgd.filedetails.map(detail => ({
        path: detail.path,
      })),
    }));
    const version = this.getCurrentDatasetAndVersion().version;
    const targetFileGroupIndex = fileGroups.findIndex(fg => fg.source?.name === version);
    if (targetFileGroupIndex > -1) {
      fileGroups[targetFileGroupIndex].files = modalFilesSelectedKeys.map(path => ({
        path,
      }));
    } else {
      fileGroups.push({
        source: {
          kind: 'VersionedDataset',
          name: version,
        },
        files: modalFilesSelectedKeys.map(path => ({
          path,
        })),
      });
    }
    const input = {
      name: knowledge.name,
      namespace: knowledge.namespace,
      fileGroups,
    };
    // console.log('input', input)
    // console.log('knowledge', knowledge)
    // console.log('modalFilesSelectedKeys', this.state.modalFilesSelectedKeys)
    this.setState({
      addFilesModalConfirmBtnLoading: true,
    });
    try {
      await this.utils.bff.updateKnowledgeBase({
        input,
      });
      this.refreshData();
      this.setState({
        addFilesModalOpen: false,
      });
    } catch (err) {
      console.warn('updateKnowledgeBase failed', err);
    } finally {
      this.setState({
        addFilesModalConfirmBtnLoading: false,
      });
    }
  }

  onBackBtnClick() {
    this.history.push('/knowledge');
  }

  onDatasetChange(v) {
    const datasetObj = this.state.datasetList.find(item => item.value === v);
    const datasetVersionList = datasetObj?.versions || [];
    const datasetVersion = datasetVersionList[0]?.value;
    // console.log('datasetObj', datasetObj)
    // console.log('datasetVersion', datasetVersion)
    if (datasetVersion) {
      this.getVersionedDataset(datasetVersion);
    }
    this.setState({
      dataset: v,
      datasetVersionList,
      datasetVersion,
      // 切换数据集后，清除之前选择的文件，重置为默认
      modalFilesSelectedKeys: this.getDefaultModalFilesSelectedKeys(datasetVersion),
    });
  }

  onDatasetVersionChange(v) {
    this.getVersionedDataset(v);
  }

  onDeleteModalCancel() {
    this.setState({
      deleteModalOpen: false,
    });
  }

  onDeleteModalOk() {
    this.setState({
      deleteModalOpen: false,
    });
    this.history.replace('/knowledge');
  }

  onEditModalCancel() {
    this.setState({
      editModalOpen: false,
    });
  }

  onEditModalOk() {
    this.refreshData();
    this.setState({
      editModalOpen: false,
    });
  }

  async onFileDelBtnClick(event, extParams) {
    const { path, source } = extParams.record;
    this.setState({
      fileDelconfirm: {
        id: new Date().getTime(),
        title: '删除知识库文件',
        content: `确定删除知识库文件：${source}/${path} ？`,
        onOk: async () => {
          const knowledge = this.getKnowledge();
          const fileGroups = (knowledge.fileGroupDetails || []).map(fgd => ({
            source: fgd.source,
            files: fgd.filedetails
              .filter(detail => detail.path !== path || fgd.source.name !== source)
              .map(detail => ({
                path: detail.path,
              })),
          }));
          const input = {
            name: knowledge.name,
            namespace: knowledge.namespace,
            fileGroups,
          };
          // console.log('input', input)
          // console.log('knowledge', knowledge)
          // console.log('path', path)
          // console.log('source', source)
          try {
            await this.utils.bff.updateKnowledgeBase({
              input,
            });
            this.utils.message.success(`文件 '${path}' 删除成功`);
            this.refreshData();
          } catch (err) {
            console.warn('updateKnowledgeBase failed', err);
            this.utils.message.warning(`文件 '${path}' 删除失败`);
          } finally {
            //
          }
        },
      },
    });
  }

  onFileModalSelectionChange(selectedRowKeys, selectedRows) {
    this.fileModalSelectedRowKeys = selectedRowKeys;
    this.setState({
      modalFilesSelectedKeys: selectedRowKeys,
    });
  }

  async onFileProcessRetyClick() {
    const key = 'onFileProcessRetyClick';
    const knowledge = this.getKnowledge();
    const input = {
      name: knowledge.name,
      namespace: knowledge.namespace,
      annotations: {
        ...knowledge.annotations,
        'arcadia.kubeagi.k8s.com.cn/update-source-file-time': Date.now().toString(),
      },
    };
    try {
      await this.utils.bff.updateKnowledgeBase({
        input,
      });
      this.utils.message.success({
        content: '文件重新处理中',
        key,
      });
      this.refreshData();
    } catch (err) {
      console.warn('updateKnowledgeBase failed', err);
      this.utils.message.warning({
        content: '文件处理重试请求失败',
        key,
      });
    } finally {
      //
    }
  }

  onSearchTextSubmit(value) {
    this.setState({
      searchText: value,
    });
  }

  openAddFilesModal() {
    const version = this.getCurrentDatasetAndVersion().version;
    this.setState({
      addFilesModalOpen: true,
      modalFilesSelectedKeys: this.getDefaultModalFilesSelectedKeys(version),
    });
    this.getDatasetList();
    this.getVersionedDataset(version);
  }

  openDeleteModal() {
    this.setState({
      deleteModalOpen: true,
    });
  }

  openEditModal() {
    this.setState({
      editModalOpen: true,
    });
  }

  refreshData() {
    this.props.useGetKnowledgeBase?.mutate();
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <LccComponentSbva0
          __component_name="LccComponentSbva0"
          data={__$$eval(() => this.state.fileDelconfirm)}
        />
        <Modal
          __component_name="Modal"
          centered={false}
          confirmLoading={__$$eval(() => this.state.addFilesModalConfirmBtnLoading)}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.onAddFilesCancel.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.onAddFilesModalOk.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.addFilesModalOpen)}
          title="新增文件"
          width="800px"
        >
          <Row
            __component_name="Row"
            justify="space-between"
            style={{ marginBottom: '16px' }}
            wrap={false}
          >
            <Col __component_name="Col" span={4}>
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: '', paddingLeft: '10px', paddingTop: '6px' }}
              >
                数据集
              </Typography.Text>
            </Col>
            <Col
              __component_name="Col"
              span={10}
              style={{ paddingLeft: '10px', paddingRight: '0px' }}
            >
              <Select
                __component_name="Select"
                _sdkSwrGetFunc={{}}
                allowClear={false}
                disabled={false}
                onChange={function () {
                  return this.onDatasetChange.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
                options={__$$eval(() => this.state.datasetList)}
                placeholder="请选择数据集"
                showSearch={true}
                style={{ width: '100%' }}
                value={__$$eval(() => this.getCurrentDatasetAndVersion().dataset)}
              />
            </Col>
            <Col __component_name="Col" span={10}>
              <Select
                __component_name="Select"
                _sdkSwrGetFunc={{}}
                allowClear={false}
                disabled={false}
                onChange={function () {
                  return this.onDatasetVersionChange.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
                options={__$$eval(() => this.state.datasetVersionList)}
                placeholder="请选择版本"
                showSearch={true}
                style={{ width: '100%' }}
                value={__$$eval(() => this.getCurrentDatasetAndVersion().version)}
              />
            </Col>
          </Row>
          <Row __component_name="Row" justify="space-between" wrap={false}>
            <Col __component_name="Col" span={4}>
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ paddingLeft: '10px', paddingTop: '6px' }}
              >
                选择文件
              </Typography.Text>
            </Col>
            <Col __component_name="Col" span={20}>
              <Input.Search
                __component_name="Input.Search"
                onSearch={function () {
                  return this.onAddFileModalSearchTextSubmit.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
                placeholder="请输入文件名称搜索"
                style={{ marginBottom: '8px', width: '50%' }}
              />
              <Table
                __component_name="Table"
                columns={[
                  { dataIndex: 'path', ellipsis: { showTitle: true }, key: 'name', title: '名称' },
                  { dataIndex: 'fileType', key: 'age', title: '类型', width: 100 },
                  { dataIndex: 'count', title: '数据量', width: 100 },
                  { dataIndex: 'size', title: '大小', width: 150 },
                ]}
                dataSource={__$$eval(() => this.getModalFilesList())}
                loading={__$$eval(() => this.state.modalFilesListLoading)}
                pagination={{ pageSize: 10 }}
                rowKey="path"
                rowSelection={{
                  getCheckboxProps: function () {
                    return this.getFileModalCheckboxProps.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  onChange: function () {
                    return this.onFileModalSelectionChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  selectedRowKeys: __$$eval(() => this.state.modalFilesSelectedKeys),
                  type: 'checkbox',
                }}
                scroll={{ scrollToFirstRowOnChange: true }}
                showHeader={true}
                size="middle"
              />
            </Col>
          </Row>
        </Modal>
        {!!__$$eval(() => this.state.deleteModalOpen) && (
          <LccComponentChj61
            __component_name="LccComponentChj61"
            displayName={__$$eval(() => this.getKnowledge()?.displayName)}
            name={__$$eval(() => this.getKnowledge()?.name)}
            namespace={__$$eval(() => this.getKnowledge()?.namespace)}
            onCancel={function () {
              return this.onDeleteModalCancel.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            onOk={function () {
              return this.onDeleteModalOk.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
          />
        )}
        {!!__$$eval(() => this.state.editModalOpen) && (
          <LccComponentXnggv
            __component_name="LccComponentXnggv"
            initialValues={__$$eval(() => this.getKnowledge())}
            name={__$$eval(() => this.getKnowledge()?.name)}
            namespace={__$$eval(() => this.getKnowledge()?.namespace)}
            onCancel={function () {
              return this.onEditModalCancel.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            onOk={function () {
              return this.onEditModalOk.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            open="true"
          />
        )}
        <Button.Back
          __component_name="Button.Back"
          onClick={function () {
            return this.onBackBtnClick.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          style={{}}
          title="知识库详情"
          type="primary"
        />
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={false}
              size="default"
              style={{ marginBottom: '16px', marginTop: '17px' }}
              type="default"
            >
              <Row __component_name="Row" justify="space-between" wrap={false}>
                <Col __component_name="Col" span={16}>
                  <Row __component_name="Row" justify="space-between" wrap={false}>
                    <Col __component_name="Col">
                      <Image
                        __component_name="Image"
                        fallback=""
                        height={64}
                        preview={false}
                        src="data:image/png;base64,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"
                        width={64}
                      />
                    </Col>
                    <Col __component_name="Col" flex="64">
                      <Row __component_name="Row" wrap={true}>
                        <Col __component_name="Col" span={24}>
                          <Typography.Title
                            __component_name="Typography.Title"
                            bold={true}
                            bordered={false}
                            ellipsis={true}
                            level={1}
                          >
                            {__$$eval(() => this.utils.getFullName(this.getKnowledge()))}
                          </Typography.Title>
                        </Col>
                        <Col __component_name="Col" span={24}>
                          <Row __component_name="Row" wrap={true}>
                            <Col __component_name="Col" span={6}>
                              <Status
                                __component_name="Status"
                                id={__$$eval(() => this.getStatusType(this.getKnowledge()?.status))}
                                types={[
                                  {
                                    children: '数据处理中',
                                    id: 'process',
                                    tooltip: '',
                                    type: 'primary',
                                  },
                                  {
                                    children: '数据处理完成',
                                    id: 'success',
                                    tooltip: '',
                                    type: 'success',
                                  },
                                  { children: '数据处理失败', id: 'error', type: 'error' },
                                  { children: '删除中', id: 'deleting', type: 'info' },
                                ]}
                              />
                              {!!__$$eval(() =>
                                (() => {
                                  const k = this.getKnowledge();
                                  return k?.status !== 'True' && k.message;
                                })()
                              ) && (
                                <Tooltip
                                  __component_name="Tooltip"
                                  title={__$$eval(() => this.getKnowledge()?.message)}
                                >
                                  <AntdIconInfoCircleOutlined
                                    __component_name="AntdIconInfoCircleOutlined"
                                    style={{ color: '#9b9b9b', marginLeft: '4px' }}
                                  />
                                </Tooltip>
                              )}
                            </Col>
                            <Col __component_name="Col" span={8}>
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                更新时间：
                              </Typography.Text>
                              <Typography.Time
                                __component_name="Typography.Time"
                                format=""
                                relativeTime={false}
                                time={__$$eval(() => this.getKnowledge()?.updateTimestamp)}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col __component_name="Col" style={{ lineHeight: '64px' }}>
                  <Space __component_name="Space" align="center" direction="horizontal">
                    <Button
                      __component_name="Button"
                      block={false}
                      danger={false}
                      disabled={false}
                      ghost={false}
                      onClick={function () {
                        return this.openEditModal.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                    >
                      编辑
                    </Button>
                    <Button
                      __component_name="Button"
                      block={false}
                      danger={false}
                      disabled={false}
                      ghost={false}
                      onClick={function () {
                        return this.openDeleteModal.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                    >
                      删除
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={false}
              size="default"
              type="default"
            >
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={24}>
                  <Tabs
                    __component_name="Tabs"
                    activeKey=""
                    destroyInactiveTabPane="true"
                    items={[
                      {
                        children: (
                          <Row __component_name="Row" wrap={true}>
                            <Col
                              __component_name="Col"
                              span={24}
                              style={{
                                alignItem: 'center',
                                alignItems: 'center',
                                dispalay: 'flex',
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'nowrap',
                                height: '32px',
                                justifyContent: 'flex-start',
                              }}
                            >
                              <Button
                                __component_name="Button"
                                block={false}
                                danger={false}
                                disabled={false}
                                ghost={false}
                                icon={
                                  <AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />
                                }
                                onClick={function () {
                                  return this.openAddFilesModal.apply(
                                    this,
                                    Array.prototype.slice.call(arguments).concat([])
                                  );
                                }.bind(this)}
                                shape="default"
                                style={{ height: '32px', marginRight: '12px' }}
                                type="primary"
                              >
                                新增文件
                              </Button>
                              <Button
                                __component_name="Button"
                                block={false}
                                danger={false}
                                disabled={false}
                                ghost={false}
                                icon={
                                  <AntdIconReloadOutlined __component_name="AntdIconReloadOutlined" />
                                }
                                onClick={function () {
                                  return this.refreshData.apply(
                                    this,
                                    Array.prototype.slice.call(arguments).concat([])
                                  );
                                }.bind(this)}
                                shape="default"
                                style={{ height: '32px', marginRight: '12px' }}
                              >
                                刷新
                              </Button>
                              <Input.Search
                                __component_name="Input.Search"
                                onSearch={function () {
                                  return this.onSearchTextSubmit.apply(
                                    this,
                                    Array.prototype.slice.call(arguments).concat([])
                                  );
                                }.bind(this)}
                                placeholder="请输入文件名称搜索"
                                style={{ height: '32px', marginRight: '12px', width: '240px' }}
                              />
                              <Space __component_name="Space" align="center" direction="horizontal">
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '', paddingRight: '12px' }}
                                >
                                  {__$$eval(
                                    () => `共有文件：${this.countFileGroupDetails().total} 个`
                                  )}
                                </Typography.Text>
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '', paddingRight: '12px' }}
                                >
                                  {__$$eval(
                                    () =>
                                      `文件向量化中：${this.countFileGroupDetails().processing} 个`
                                  )}
                                </Typography.Text>
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '', paddingRight: '12px' }}
                                >
                                  {__$$eval(
                                    () =>
                                      `文件向量化成功：${this.countFileGroupDetails().succeeded} 个`
                                  )}
                                </Typography.Text>
                                <Space
                                  __component_name="Space"
                                  align="center"
                                  direction="horizontal"
                                  size={4}
                                >
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {__$$eval(
                                      () =>
                                        `文件向量化失败：${this.countFileGroupDetails().failed} 个`
                                    )}
                                  </Typography.Text>
                                  {!!__$$eval(() => this.countFileGroupDetails().failed > 0) && (
                                    <Typography.Text
                                      __component_name="Typography.Text"
                                      disabled={false}
                                      ellipsis={true}
                                      onClick={function () {
                                        return this.onFileProcessRetyClick.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([])
                                        );
                                      }.bind(this)}
                                      strong={false}
                                      style={{ cursor: 'pointer', fontSize: '' }}
                                      type="colorPrimary"
                                    >
                                      重试
                                    </Typography.Text>
                                  )}
                                </Space>
                              </Space>
                            </Col>
                            <Col __component_name="Col" span={24}>
                              <Table
                                __component_name="Table"
                                columns={[
                                  { dataIndex: 'path', key: 'path', title: '文件名称' },
                                  {
                                    dataIndex: 'phase',
                                    key: 'age',
                                    render: (text, record, index) =>
                                      (__$$context => (
                                        <Status
                                          __component_name="Status"
                                          id={__$$eval(() => text)}
                                          types={[
                                            { children: '跳过', id: 'Skipped', type: 'disabled' },
                                            { children: '待处理', id: 'Pending', type: 'disabled' },
                                            { children: '失败', id: 'Failed', type: 'error' },
                                            {
                                              children: '已完成',
                                              id: 'Succeeded',
                                              type: 'success',
                                            },
                                            {
                                              children: '处理中',
                                              id: 'Processing',
                                              type: 'primary',
                                            },
                                          ]}
                                        />
                                      ))(
                                        __$$createChildContext(__$$context, { text, record, index })
                                      ),
                                    title: '状态',
                                  },
                                  { dataIndex: 'source', title: '文件来源' },
                                  { dataIndex: 'fileType', title: '类型' },
                                  { dataIndex: 'count', title: '数据量' },
                                  { dataIndex: 'size', title: '文件大小' },
                                  {
                                    dataIndex: 'timeCost',
                                    render: (text, record, index) =>
                                      (__$$context => (
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={false}
                                          style={{ fontSize: '' }}
                                        >
                                          {__$$eval(() => __$$context.getTimeCost(text))}
                                        </Typography.Text>
                                      ))(
                                        __$$createChildContext(__$$context, { text, record, index })
                                      ),
                                    title: '耗时',
                                  },
                                  {
                                    dataIndex: 'updateTimestamp',
                                    render: (text, record, index) =>
                                      (__$$context => (
                                        <Typography.Time
                                          __component_name="Typography.Time"
                                          format=""
                                          relativeTime={true}
                                          time={__$$eval(() => text)}
                                        />
                                      ))(
                                        __$$createChildContext(__$$context, { text, record, index })
                                      ),
                                    title: '导入时间',
                                  },
                                  {
                                    dataIndex: 'operator',
                                    render: /* 插槽容器*/ (text, record, index) =>
                                      (__$$context => (
                                        <Space
                                          __component_name="Space"
                                          align="center"
                                          direction="horizontal"
                                        >
                                          <Button
                                            __component_name="Button"
                                            block={false}
                                            danger={true}
                                            disabled={false}
                                            ghost={false}
                                            onClick={function () {
                                              return this.onFileDelBtnClick.apply(
                                                this,
                                                Array.prototype.slice.call(arguments).concat([
                                                  {
                                                    record: record,
                                                  },
                                                ])
                                              );
                                            }.bind(__$$context)}
                                            shape="default"
                                          >
                                            删除
                                          </Button>
                                        </Space>
                                      ))(
                                        __$$createChildContext(__$$context, { text, record, index })
                                      ),
                                    title: '操作',
                                  },
                                ]}
                                dataSource={__$$eval(() => this.getFileGroupDetails())}
                                loading={__$$eval(() => this.props.useGetKnowledgeBase?.loading)}
                                pagination={{
                                  pageSize: 20,
                                  pagination: { pageSize: 10 },
                                  position: ['bottomRight'],
                                  showQuickJumper: false,
                                  showSizeChanger: false,
                                  simple: true,
                                  size: 'default',
                                  total: __$$eval(() => this.getFileGroupDetails().length),
                                }}
                                rowKey="path"
                                scroll={{ scrollToFirstRowOnChange: true }}
                                showHeader={true}
                                size="middle"
                                style={{}}
                              />
                            </Col>
                          </Row>
                        ),
                        key: 'tab-item-1',
                        label: '数据来源',
                      },
                      {
                        children: (
                          <Descriptions
                            __component_name="Descriptions"
                            bordered={false}
                            borderedBottom={false}
                            borderedBottomDashed={false}
                            colon={true}
                            column={1}
                            id=""
                            items={[
                              {
                                children: (
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    copyable={true}
                                    disabled={false}
                                    ellipsis={false}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {__$$eval(() => this.getKnowledge()?.id || '-')}
                                  </Typography.Text>
                                ),
                                key: '4xwzwtp0wd2',
                                label: 'ID',
                                span: 1,
                              },
                              {
                                _unsafe_MixedSetter_children_select: 'SlotSetter',
                                children: (
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {__$$eval(
                                      () => this.getKnowledge()?.chunkSize + ' 字符' || '-'
                                    )}
                                  </Typography.Text>
                                ),
                                key: '25nyuq5iamm',
                                label: '文本分段长度',
                                span: 1,
                              },
                              {
                                children: (
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {__$$eval(
                                      () => this.getKnowledge()?.chunkOverlap + ' 字符' || '-'
                                    )}
                                  </Typography.Text>
                                ),
                                key: 'jyxi1y2h6ia',
                                label: '分段重叠长度',
                                span: 1,
                              },
                              {
                                children: (
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {__$$eval(() => this.getKnowledge()?.batchSize || '-')}
                                  </Typography.Text>
                                ),
                                key: 'xb4gcoxyqlp',
                                label: '批处理',
                                span: 1,
                              },
                              {
                                children: (
                                  <Typography.Time
                                    __component_name="Typography.Time"
                                    format=""
                                    relativeTime={false}
                                    time={__$$eval(() => this.getKnowledge()?.creationTimestamp)}
                                  />
                                ),
                                key: 'mgbfuraxql',
                                label: '创建时间',
                                span: 1,
                              },
                              {
                                children: (
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {__$$eval(() => this.getKnowledge()?.creator || '未知')}
                                  </Typography.Text>
                                ),
                                key: '6fmv76q6kmh',
                                label: '创建者',
                                span: 24,
                              },
                              {
                                children: (
                                  <Typography.Paragraph
                                    code={false}
                                    delete={false}
                                    disabled={false}
                                    editable={false}
                                    ellipsis={{ rows: 2 }}
                                    mark={false}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                    underline={false}
                                  >
                                    {__$$eval(() => this.getKnowledge()?.description || '-')}
                                  </Typography.Paragraph>
                                ),
                                key: '2uar2gujsj8',
                                label: '描述',
                                span: 24,
                              },
                              {
                                children: (
                                  <UnifiedLink
                                    __component_name="UnifiedLink"
                                    inQianKun={false}
                                    target="_blank"
                                    to={__$$eval(() =>
                                      (() => {
                                        const knowledge = this.getKnowledge();
                                        return `/kubeagi-portal/model-service/detail/${
                                          knowledge?.embedder?.name
                                        }?type=${
                                          knowledge?.embedderType === '3rd_party'
                                            ? 'external'
                                            : 'local'
                                        }`;
                                      })()
                                    )}
                                  >
                                    {__$$eval(() =>
                                      (() => {
                                        const embedder = this.getKnowledge()?.embedder;
                                        return embedder?.displayName || embedder?.name;
                                      })()
                                    )}
                                  </UnifiedLink>
                                ),
                                key: '9n2j21coq6',
                                label: '向量化模型',
                                span: 1,
                              },
                              {
                                children: (
                                  <Flex __component_name="Flex">
                                    <Card
                                      __component_name="Card"
                                      actions={[]}
                                      bordered={true}
                                      hoverable={false}
                                      loading={false}
                                      size="default"
                                      style={{ marginRight: '20px', width: 'calc(50% - 10px)' }}
                                      type="default"
                                    >
                                      <Row
                                        __component_name="Row"
                                        justify="space-between"
                                        wrap={false}
                                      >
                                        <Col __component_name="Col">
                                          <Image
                                            __component_name="Image"
                                            fallback=""
                                            height={120}
                                            preview={false}
                                            src="data:image/png;base64,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"
                                            width={120}
                                          />
                                        </Col>
                                        <Col __component_name="Col">
                                          <Row __component_name="Row" wrap={true}>
                                            <Col __component_name="Col" span={24}>
                                              <Typography.Title
                                                __component_name="Typography.Title"
                                                bold={true}
                                                bordered={false}
                                                ellipsis={true}
                                                level={1}
                                              >
                                                云原生知识库小助手
                                              </Typography.Title>
                                            </Col>
                                            <Col __component_name="Col" span={24}>
                                              <Row __component_name="Row" wrap={true}>
                                                <Col __component_name="Col" span={24}>
                                                  <Typography.Paragraph
                                                    code={false}
                                                    delete={false}
                                                    disabled={false}
                                                    editable={false}
                                                    ellipsis={{
                                                      expandable: false,
                                                      rows: 2,
                                                      tooltip: {
                                                        title:
                                                          '参照你的语义对话生成知识库信息，快速、准确响应，根据行业内权威数据...',
                                                      },
                                                    }}
                                                    mark={false}
                                                    strong={false}
                                                    style={{ fontSize: '' }}
                                                    underline={false}
                                                  >
                                                    参照你的语义对话生成知识库信息，快速、准确响应，根据行业内权威数据...
                                                  </Typography.Paragraph>
                                                </Col>
                                              </Row>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                    </Card>
                                    <Card
                                      __component_name="Card"
                                      actions={[]}
                                      bordered={true}
                                      hoverable={false}
                                      loading={false}
                                      size="default"
                                      style={{ width: 'calc(50% - 10px)' }}
                                      type="default"
                                    >
                                      <Row
                                        __component_name="Row"
                                        justify="space-between"
                                        wrap={false}
                                      >
                                        <Col __component_name="Col">
                                          <Image
                                            __component_name="Image"
                                            fallback=""
                                            height={120}
                                            preview={false}
                                            src="data:image/png;base64,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"
                                            width={120}
                                          />
                                        </Col>
                                        <Col __component_name="Col">
                                          <Row __component_name="Row" wrap={true}>
                                            <Col __component_name="Col" span={24}>
                                              <Typography.Title
                                                __component_name="Typography.Title"
                                                bold={true}
                                                bordered={false}
                                                ellipsis={true}
                                                level={1}
                                              >
                                                代码生成器
                                              </Typography.Title>
                                            </Col>
                                            <Col __component_name="Col" span={24}>
                                              <Typography.Paragraph
                                                code={false}
                                                delete={false}
                                                disabled={false}
                                                editable={false}
                                                ellipsis={{
                                                  rows: 2,
                                                  tooltip: {
                                                    title:
                                                      '参照你的语义对话自动生成代码，搬砖神器！',
                                                  },
                                                }}
                                                mark={false}
                                                strong={false}
                                                style={{ fontSize: '' }}
                                                underline={false}
                                              >
                                                参照你的语义对话自动生成代码，搬砖神器！
                                              </Typography.Paragraph>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                    </Card>
                                  </Flex>
                                ),
                                contentStyle: { display: 'none' },
                                key: 'zokh8se3zlh',
                                label: '关联模型应用',
                                labelStyle: { display: 'none' },
                                span: 24,
                              },
                            ]}
                            labelStyle={{ width: 100 }}
                            layout="horizontal"
                            size="default"
                            title=""
                          />
                        ),
                        key: 'tab-item-2',
                        label: '详细信息',
                      },
                    ]}
                    size="default"
                    tabPosition="top"
                    type="line"
                  />
                </Col>
              </Row>
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
  const match = matchPath({ path: '/knowledge/detail/:name' }, location.pathname);
  history.match = match;
  history.query = qs.parse(location.search);
  const appHelper = {
    utils,
    constants: __$$constants,
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
        params: undefined,
      }}
      sdkSwrFuncs={[
        {
          func: 'useGetKnowledgeBase',
          params: function applyThis() {
            return {
              name: this.match?.params?.name,
              namespace: this.utils.getAuthData()?.project,
            };
          }.apply(self),
          enableLocationSearch: undefined,
        },
      ]}
      render={dataProps => (
        <KnowledgeDetail$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
