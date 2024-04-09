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
  Flex,
  Steps,
  Container,
  FormilyForm,
  FormilyInput,
  FormilySelect,
  FormilyNumberPicker,
  FormilyTextArea,
  FormilyFormItem,
  Typography,
  Table,
  Input,
  Divider,
} from '@tenx-ui/materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class KnowledgeCreate$$Page extends React.Component {
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

    this.state = {
      currentStep: 0,
      dataSet: '',
      dataSetDataList: [],
      dataSetFileList: [],
      dataSetFileListLoading: false,
      embedderList: [],
      form: {
        name: '',
        displayName: '',
        dataSetContain: {
          version: null,
          dataset: null,
        },
        embedder: undefined,
        chunkSize: 300,
        chunkOverlap: 30,
        batchSize: 1,
        description: '',
      },
      nextFileList: [],
      selectFiles: [],
      submited: false,
      version: '',
    };
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  checkFileds() {
    try {
      const form = this.getFormInstence();
      form.submit(async values => {
        const {
          name,
          displayName,
          dataSetContain,
          chunkSize,
          chunkOverlap,
          batchSize,
          description,
          embedder,
        } = values;
        const { dataset, version } = dataSetContain;
        if (this.state.currentStep === 0) {
          if (this.state.selectFiles.length === 0) {
            this.utils.message.info('请选择文件');
            return;
          }
          if (chunkOverlap > chunkSize) {
            this.utils.message.info('分段重叠长度必须小于文本分段长度');
            return;
          }
        }
        this.setState({
          currentStep: this.state.currentStep + 1,
          form: {
            name,
            displayName,
            dataSetContain,
            chunkSize,
            chunkOverlap,
            batchSize,
            description,
            embedder,
          },
        });
      });
    } catch (error) {}
  }

  getCheckBox(keys, rows) {
    try {
      const { version } = this.state;
      this.setState({
        selectFiles: keys,
        nextFileList: keys.map(key => {
          return {
            ...this.state.dataSetFileList.find(_item => _item.path === key),
            version,
          };
        }),
      });
    } catch (error) {}
  }

  async getDataSet() {
    try {
      const form = this.getFormInstence();
      const res = await this.utils.bff.listDatasets({
        input: {
          namespace: this.utils.getAuthData().project,
          //'abc'
          page: 1,
          pageSize: 1000,
        },
        versionsInput: {
          namespace: this.utils.getAuthData().project,
          //'abc'
          page: 1,
          pageSize: 1000,
        },
        filesInput: {
          keyword: '',
          pageSize: 1,
          page: 1,
        },
      });
      const datasetlist = res.Dataset.listDatasets.nodes.map(item => {
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
      this.setState(
        {
          dataSetDataList: datasetlist,
        },
        () => {
          // const values = this.form('createDataHandleStep2')?.values;
          // this.getTableList(values?.pre_data_set_name, values?.pre_data_set_version)
        }
      );
      form.setFieldState('dataSetContain.dataset', state => {
        state.dataSource = datasetlist;
      });
    } catch (error) {}
  }

  async getEmbedder() {
    try {
      const form = this.getFormInstence();
      const project = JSON.parse(localStorage.getItem('authData')).project;
      const params = {
        input: {
          namespace: project,
          page: 1,
          pageSize: 99999,
        },
      };
      const { Embedder } = await this.utils.bff.listEmbedders(params);
      let { nodes } = Embedder?.listEmbedders || {};
      nodes = nodes.filter(item => item.status === 'True' || item.status === 'Running');
      this.setState({
        embedderList: nodes.map(item => {
          return {
            ...item,
            label: item.displayName || item.name,
            value: item.name,
          };
        }),
      });
      form.setFieldState('embedder', state => {
        state.dataSource = nodes.map(item => {
          return {
            label: item.displayName || item.name,
            value: item.name,
          };
        });
      });
    } catch (error) {}
  }

  getFormInstence() {
    return this.$('formily_iwuyzsdvrhg')?.formRef?.current?.form;
  }

  getStatus() {
    return {
      type: 'success',
      id: 'success',
      children: ' ',
    };
  }

  async getTableList(pre_data_set_name, pre_data_set_version) {
    this.setState({
      dataSetFileListLoading: true,
    });
    try {
      const res = await this.utils.bff.getVersionedDataset({
        name: pre_data_set_version,
        namespace: this.utils.getAuthData().project,
        fileInput: {
          pageSize: 999,
        },
      });
      const { getVersionedDataset } = res.VersionedDataset || {};
      const { files } = getVersionedDataset;
      this.setState(
        {
          dataSetFileList: files.nodes || [],
        },
        () => {
          // console.log(files,  this.state)
        }
      );
    } catch (error) {
    } finally {
      this.setState({
        dataSetFileListLoading: false,
      });
    }
  }

  handleSave(v) {
    // console.log(v, 'aaaaaaaaaaaaaaaaaaaa')
  }

  handleStep(event, { action }) {
    // console.log(this.state.currentStep, action)
    if (action === 'next') {
      this.checkFileds();
    } else {
      this.setState(
        {
          currentStep: this.state.currentStep - 1,
        },
        () => {
          this.initFormValue();
        }
      );
    }
  }

  handleSubmit() {
    this.setState(
      {
        submited: true,
      },
      async () => {
        const { embedderList, selectFiles, dataSetFileList, form } = this.state;
        const {
          name,
          displayName,
          dataSetContain,
          chunkSize,
          chunkOverlap,
          batchSize,
          description,
          embedder,
        } = form;
        const { dataset, version } = dataSetContain;
        const embedderItem = embedderList.find(item => item.value === embedder);
        const fileGroups = [
          {
            source: {
              kind: 'VersionedDataset',
              name: version,
              namespace: this.utils.getAuthData().project,
            },
            files: selectFiles.map(file => ({
              path: file.path,
              version: file.latestVersion,
            })),
          },
        ];
        try {
          await this.utils.bff.createKnowledgeBase({
            input: {
              name,
              displayName,
              // name: displayName,
              chunkSize,
              chunkOverlap,
              batchSize,
              description,
              embedder: embedderItem.name,
              fileGroups,
              namespace: this.utils.getAuthData().project,
            },
          });
          this.utils.message.success('新增知识库成功');
          this.history.push(`/knowledge/detail/${name}`);
        } catch (err) {
          console.error('新增知识库失败', err);
          this.utils.message.warning('新增知识库失败');
          this.setState({
            submited: false,
          });
        }
      }
    );
  }

  initFormValue() {
    try {
      const form = this.getFormInstence();
      const { name, displayName, dataSetContain, description, embedder } = this.state.form;
      const { dataset, version } = dataSetContain;
      form.setValues(
        {
          displayName,
          dataSetContain: {
            dataset,
            version,
          },
          description,
          embedder,
        },
        'deepMerge'
      );
      // dataSetDataList: datasetlist
      const { dataSetDataList, embedderList } = this.state;
      form.setFieldState('dataSetContain.dataset', state => {
        state.dataSource = dataSetDataList;
      });
      form.setFieldState('embedder', state => {
        state.dataSource = embedderList;
      });
      this.setDataSetAndDataSetVersionsSource(dataset);
    } catch (error) {}
  }

  onDataSetChange(v) {
    try {
      const form = this.getFormInstence();
      this.setState({
        dataSet: v,
        dataSetFileList: [], // 清空表格
      });

      const dataset = this.state.dataSetDataList.find(item => item.value === v);
      const version = dataset?.versions?.[0]?.value;
      if (version) {
        this.onVersionChange(version);
      }
      form.setValues({
        dataSetContain: {
          version,
        },
      });
      this.setDataSetAndDataSetVersionsSource(v);
    } catch (error) {}
  }

  onStepChange(value) {
    this.setState({
      currentStep: value,
    });
  }

  onVersionChange(v) {
    try {
      const form = this.getFormInstence();
      // form.setFieldState('version', { dataSource: [{label: 'v2', value: 'v2'}] })
      this.setState({
        version: v,
      });
      this.getTableList(this.state.dataSet, v);
    } catch (error) {}
  }

  setDataSetAndDataSetVersionsSource(v) {
    try {
      const form = this.getFormInstence();
      const obj = this.state.dataSetDataList.find(item => item.value === v);
      const genOptionList = obj.versions;
      // form.setFieldState('version', { dataSource: genOptionList })
      form.setFieldState('dataSetContain.version', state => {
        state.dataSource = genOptionList;
      });
    } catch (error) {}
  }

  componentDidMount() {
    this.getEmbedder();
    this.getDataSet();
    // this.getTableList()
    this.initFormValue();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Space __component_name="Space" align="center" direction="horizontal">
              <Button.Back
                __component_name="Button.Back"
                name="返回"
                path="/knowledge"
                title="新增知识库"
                type="primary"
              />
            </Space>
          </Col>
          <Col __component_name="Col" span={24}>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={false}
              size="default"
              type="inner"
            >
              <Flex __component_name="Flex" justify="center" style={{ marginBottom: '40px' }}>
                <Steps
                  __component_name="Steps"
                  current={__$$eval(() => this.state.currentStep)}
                  items={[{ subTitle: '', title: '基本信息' }, { title: '文件预览' }]}
                  onChange={function () {
                    return this.onStepChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  style={{ width: '500px' }}
                />
              </Flex>
              <Container
                __component_name="Container"
                style={__$$eval(() => ({
                  display: this.state.currentStep === 0 && !this.state.submited ? 'block' : 'none',
                }))}
              >
                <Row __component_name="Row" wrap={true}>
                  <Col __component_name="Col" span={16}>
                    <FormilyForm
                      __component_name="FormilyForm"
                      componentProps={{
                        colon: false,
                        labelAlign: 'left',
                        labelWidth: '130px',
                        layout: 'horizontal',
                        wrapperCol: 12,
                      }}
                      createFormProps={{
                        initialValues: { batchSize: 1, chunkOverlap: 30, chunkSize: 300 },
                      }}
                      formHelper={{ autoFocus: true }}
                      ref={this._refsManager.linkRef('formily_iwuyzsdvrhg')}
                    >
                      <FormilyInput
                        __component_name="FormilyInput"
                        componentProps={{
                          'x-component-props': { placeholder: '请输入知识库名称' },
                        }}
                        decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                        fieldProps={{
                          'name': 'name',
                          'required': true,
                          'title': '知识库名称',
                          'x-validator': [
                            {
                              children: '未知',
                              id: 'disabled',
                              message:
                                '只能包含小写字母、数字、连字符（-）和点号（.），且必须以字母或数字开头',
                              pattern:
                                '^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$',
                              required: true,
                              type: 'disabled',
                              whitespace: true,
                            },
                          ],
                        }}
                      />
                      <FormilyInput
                        __component_name="FormilyInput"
                        componentProps={{
                          'x-component-props': { placeholder: '请输入知识库别名', suffix: '' },
                        }}
                        decoratorProps={{
                          'x-decorator-props': {
                            labelEllipsis: true,
                            tooltip: '展示名称，可以为中文',
                          },
                        }}
                        fieldProps={{
                          'description': '',
                          'name': 'displayName',
                          'required': false,
                          'title': '知识库别名',
                          'x-validator': [],
                        }}
                      />
                      <FormilySelect
                        __component_name="FormilySelect"
                        componentProps={{
                          'x-component-props': {
                            _sdkSwrGetFunc: { label: '', value: '' },
                            allowClear: false,
                            disabled: false,
                            placeholder: '请选择向量化模型',
                          },
                        }}
                        decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                        fieldProps={{
                          '_unsafe_MixedSetter_enum_select': 'ArraySetter',
                          'description': '',
                          'enum': [],
                          'name': 'embedder',
                          'required': true,
                          'title': '向量化模型',
                          'x-validator': [],
                        }}
                      />
                      <FormilyNumberPicker
                        __component_name="FormilyNumberPicker"
                        componentProps={{
                          'x-component-props': {
                            addonAfter: '字符',
                            min: 1,
                            placeholder: '请输入文本分段长度',
                          },
                        }}
                        decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                        fieldProps={{
                          'name': 'chunkSize',
                          'required': true,
                          'title': '文本分段长度',
                          'x-validator': [],
                        }}
                      />
                      <FormilyNumberPicker
                        __component_name="FormilyNumberPicker"
                        componentProps={{
                          'x-component-props': {
                            addonAfter: '字符',
                            min: 1,
                            placeholder: '请输入分段重叠长度',
                          },
                        }}
                        decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                        fieldProps={{
                          'name': 'chunkOverlap',
                          'required': true,
                          'title': '分段重叠长度',
                          'x-validator': [],
                        }}
                      />
                      <FormilyNumberPicker
                        __component_name="FormilyNumberPicker"
                        componentProps={{
                          'x-component-props': {
                            addonAfter: '',
                            min: 1,
                            placeholder: '请输入批处理数',
                          },
                        }}
                        decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                        fieldProps={{
                          'name': 'batchSize',
                          'required': true,
                          'title': '批处理',
                          'x-validator': [],
                        }}
                        style={{ width: '205px' }}
                      />
                      <FormilyTextArea
                        __component_name="FormilyTextArea"
                        componentProps={{ 'x-component-props': { placeholder: '请输入描述' } }}
                        decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                        fieldProps={{
                          'name': 'description',
                          'title': '描述',
                          'x-component': 'Input.TextArea',
                          'x-validator': [],
                        }}
                      />
                      <FormilyFormItem
                        __component_name="FormilyFormItem"
                        decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                        fieldProps={{
                          'name': 'dataSetContain',
                          'required': true,
                          'title': '处理数据集',
                          'x-component': 'FormilyFormItem',
                          'x-validator': [],
                        }}
                      >
                        <Row __component_name="Row" wrap={true}>
                          <Col __component_name="Col" span={12}>
                            <FormilySelect
                              __component_name="FormilySelect"
                              componentProps={{
                                'x-component-props': {
                                  _sdkSwrGetFunc: { label: '', value: '' },
                                  allowClear: false,
                                  disabled: false,
                                  onChange: function () {
                                    return this.onDataSetChange.apply(
                                      this,
                                      Array.prototype.slice.call(arguments).concat([])
                                    );
                                  }.bind(this),
                                  placeholder: '请选择数据集',
                                  showSearch: true,
                                },
                              }}
                              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                              fieldProps={{
                                'description': '',
                                'name': 'dataset',
                                'required': true,
                                'title': '',
                                'x-validator': [],
                              }}
                            />
                          </Col>
                          <Col __component_name="Col" span={12}>
                            <FormilySelect
                              __component_name="FormilySelect"
                              componentProps={{
                                'x-component-props': {
                                  _sdkSwrGetFunc: { label: 'label', value: 'value' },
                                  _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ObjectSetter',
                                  allowClear: false,
                                  disabled: false,
                                  onChange: function () {
                                    return this.onVersionChange.apply(
                                      this,
                                      Array.prototype.slice.call(arguments).concat([])
                                    );
                                  }.bind(this),
                                  placeholder: '请选择版本',
                                  showSearch: true,
                                },
                              }}
                              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                              fieldProps={{
                                '_unsafe_MixedSetter_enum_select': 'ExpressionSetter',
                                '_unsafe_MixedSetter_x-validator_select': 'ExpressionSetter',
                                'name': 'version',
                                'required': true,
                                'title': '',
                              }}
                            />
                          </Col>
                        </Row>
                      </FormilyFormItem>
                    </FormilyForm>
                  </Col>
                </Row>
                <Row __component_name="Row" wrap={false}>
                  <Col __component_name="Col" flex="130px">
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ fontSize: '', marginLeft: '0px', paddingLeft: '10px' }}
                    >
                      文件选择
                    </Typography.Text>
                  </Col>
                  <Col __component_name="Col" flex="auto">
                    <Table
                      __component_name="Table"
                      columns={[
                        {
                          dataIndex: 'path',
                          key: '',
                          render: (text, record, index) =>
                            (__$$context => (
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(() => text)}
                              </Typography.Text>
                            ))(__$$createChildContext(__$$context, { text, record, index })),
                          title: '名称',
                        },
                        {
                          dataIndex: 'fileType',
                          key: '',
                          render: /* 插槽容器*/ (text, record, index) =>
                            (__$$context => (
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(() => __$$context.fileTyle || '-')}
                              </Typography.Text>
                            ))(__$$createChildContext(__$$context, { text, record, index })),
                          title: '类型',
                        },
                        { dataIndex: 'count', title: '数据量' },
                        { dataIndex: 'size', title: '大小' },
                      ]}
                      dataSource={__$$eval(() => this.state.dataSetFileList)}
                      loading={__$$eval(() => this.state.dataSetFileListLoading)}
                      pagination={{ pageSize: 10 }}
                      rowKey="path"
                      rowSelection={{
                        onChange: function () {
                          return this.getCheckBox.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this),
                        type: 'checkbox',
                      }}
                      scroll={{ scrollToFirstRowOnChange: true }}
                      showHeader={true}
                      size="middle"
                    />
                  </Col>
                </Row>
              </Container>
              {!!__$$eval(() => this.state.currentStep === 1) && (
                <Flex __component_name="Flex" justify="right" vertical={true} wrap="nowrap">
                  <Row
                    __component_name="Row"
                    justify="space-between"
                    style={{ marginBottom: '25px' }}
                    wrap={false}
                  >
                    <Col __component_name="Col">
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ fontSize: '' }}
                      >
                        {__$$eval(() => `共有文件：${this.state.nextFileList.length}`)}
                      </Typography.Text>
                    </Col>
                    <Col __component_name="Col">
                      {!!false && (
                        <Input.Search __component_name="Input.Search" placeholder="请输入" />
                      )}
                    </Col>
                  </Row>
                  {__$$evalArray(() => this.state.nextFileList).map((item, index) =>
                    (__$$context => (
                      <Row __component_name="Row" style={{ marginBottom: '8px' }} wrap={false}>
                        <Col __component_name="Col" flex="auto">
                          <Row
                            __component_name="Row"
                            align="stretch"
                            style={{
                              background: '#FAFAFA',
                              borderRadius: '0px 0px 0px 0px',
                              height: '44px',
                              lineHeight: '44px',
                            }}
                            wrap={true}
                          >
                            <Col __component_name="Col" span={4}>
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(() => item.path)}
                              </Typography.Text>
                            </Col>
                            <Col __component_name="Col" span={4}>
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(() => `文件来源：${item.version || '--'}`)}
                              </Typography.Text>
                            </Col>
                            <Col __component_name="Col" span={4}>
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(() => `类型：${item.fileType || '-'}`)}
                              </Typography.Text>
                            </Col>
                            <Col __component_name="Col" span={4}>
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(() => `数据量：${item.count?.toString() || '-'}`)}
                              </Typography.Text>
                            </Col>
                            <Col __component_name="Col" span={4}>
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: '' }}
                              >
                                {__$$eval(() => item.fileSize?.toString())}
                              </Typography.Text>
                            </Col>
                            <Col __component_name="Col" span={4} />
                          </Row>
                        </Col>
                      </Row>
                    ))(__$$createChildContext(__$$context, { item, index }))
                  )}
                </Flex>
              )}
              <Divider
                __component_name="Divider"
                dashed={false}
                defaultOpen={false}
                mode="line"
                style={{ left: '-24px', position: 'relative', width: 'calc(100% + 48px)' }}
              />
              <Flex __component_name="Flex" justify="center">
                <Button
                  __component_name="Button"
                  block={false}
                  danger={false}
                  disabled={__$$eval(() => this.state.submited)}
                  ghost={false}
                  href="/knowledge"
                  icon=""
                  shape="default"
                  style={{ marginRight: '10px' }}
                >
                  取消
                </Button>
                {!!__$$eval(() => this.state.currentStep > 0) && (
                  <Button
                    __component_name="Button"
                    block={false}
                    danger={false}
                    disabled={__$$eval(() => this.state.submited)}
                    ghost={false}
                    onClick={function () {
                      return this.handleStep.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([
                          {
                            action: 'pre',
                          },
                        ])
                      );
                    }.bind(this)}
                    shape="default"
                    style={{ marginRight: '10px' }}
                  >
                    上一步
                  </Button>
                )}
                {!!__$$eval(() => this.state.currentStep !== 1) && (
                  <Button
                    __component_name="Button"
                    block={false}
                    danger={false}
                    disabled={false}
                    ghost={false}
                    onClick={function () {
                      return this.handleStep.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([
                          {
                            action: 'next',
                          },
                        ])
                      );
                    }.bind(this)}
                    shape="default"
                    style={{ marginRight: '10px' }}
                  >
                    下一步
                  </Button>
                )}
                {!!__$$eval(() => this.state.currentStep === 1) && (
                  <Button
                    __component_name="Button"
                    block={false}
                    danger={false}
                    disabled={false}
                    ghost={false}
                    icon=""
                    loading={__$$eval(() => this.state.submited)}
                    onClick={function () {
                      return this.handleSubmit.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    shape="default"
                    type="primary"
                  >
                    确认
                  </Button>
                )}
              </Flex>
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
  const match = matchPath({ path: '/knowledge/create' }, location.pathname);
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
          params: undefined,
          enableLocationSearch: undefined,
        },
      ]}
      render={dataProps => (
        <KnowledgeCreate$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
