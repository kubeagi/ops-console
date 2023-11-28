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
  FormilyForm,
  FormilyInput,
  FormilySelect,
  FormilyTextArea,
  FormilyFormItem,
  Typography,
  Table,
  Input,
  Status,
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
      form: {
        displayName: '',
        dataSetContain: {
          version: null,
          dataset: null,
        },
        embedder: undefined,
        description: '',
      },
      dataSet: '',
      version: '',
      submited: false,
      contentType: '',
      currentStep: 0,
      selectFiles: [],
      embedderList: [],
      nextFileList: [],
      dataSetDataList: [],
      dataSetFileList: [],
    };
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

  getType() {
    try {
      const contentTypeObj = {
        text: '文本',
        image: '图片',
        video: '视频',
      };
      return contentTypeObj[this.state.contentType];
    } catch (error) {}
  }

  testFunc() {
    console.log('test aliLowcode func');
    return <div className="test-aliLowcode-func">{this.state.test}</div>;
  }

  getStatus() {
    return {
      type: 'success',
      id: 'success',
      children: ' ',
    };
  }

  async getDataSet() {
    try {
      const form = this.getFormInstence();
      const res = await this.utils.bff.listDatasets({
        input: {
          namespace: this.utils.getAuthData().project, //'abc'
        },

        versionsInput: {
          namespace: this.utils.getAuthData().project, //'abc'
        },

        filesInput: {
          keyword: '',
          pageSize: 1,
          page: 999999,
        },
      });
      const datasetlist = res.Dataset.listDatasets.nodes.map(item => {
        const versions = item.versions.nodes.map(i => ({
          label: i.displayName,
          value: i.name,
          files: i.files.nodes,
        }));
        return {
          label: item.name,
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

  handleSave(v) {
    console.log(v, 'aaaaaaaaaaaaaaaaaaaa');
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

  checkFileds() {
    try {
      const form = this.getFormInstence();
      form.submit(async values => {
        const { displayName, dataSetContain, description, embedder } = values;
        const { dataset, version } = dataSetContain;
        console.log('this.state.selectFiles', this.state.selectFiles);
        if (this.state.currentStep === 0) {
          if (this.state.selectFiles.length === 0) {
            this.utils.message.info('请选择文件');
            return;
          }
        }
        this.setState({
          currentStep: this.state.currentStep + 1,
          form: {
            displayName,
            dataSetContain,
            description,
            embedder,
          },
        });
      });
    } catch (error) {}
  }

  getCheckBox(rows) {
    try {
      const { version } = this.state;
      this.setState({
        selectFiles: rows,
        nextFileList: rows.map(item => {
          return {
            ...this.state.dataSetFileList.find(_item => _item.path === item),
            version,
          };
        }),
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
      const { nodes } = Embedder?.listEmbedders || {};
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

  async getTableList(pre_data_set_name, pre_data_set_version) {
    try {
      const res = await this.utils.bff.getVersionedDataset({
        name: pre_data_set_version,
        namespace: this.utils.getAuthData().project,
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
    } catch (error) {}
  }

  handleSubmit() {
    this.setState(
      {
        submited: true,
      },
      async () => {
        const { embedderList, selectFiles, dataSetFileList, form } = this.state;
        const { displayName, dataSetContain, description, embedder } = form;
        const { dataset, version } = dataSetContain;
        const embedderItem = embedderList.find(item => item.value === embedder);
        const fileGroups = [
          {
            source: {
              kind: 'VersionedDataset',
              Name: version,
              Namespace: this.utils.getAuthData().project,
            },
            path: selectFiles,
          },
        ];
        try {
          await this.utils.bff.createKnowledgeBase({
            input: {
              displayName,
              name: displayName,
              description,
              embedder: {
                kind: embedderItem.kind || 'Embedder',
                Name: embedderItem.name,
              },
              fileGroups,
              namespace: this.utils.getAuthData().project,
            },
          });
          this.message.success('新增知识库成功');
        } catch {
          this.message.warn('新增知识库失败');
        }
      }
    );
  }

  onStepChange(value) {
    this.setState({
      currentStep: value,
    });
  }

  initFormValue() {
    try {
      const form = this.getFormInstence();
      const { displayName, dataSetContain, description, embedder } = this.state.form;
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

  getFormInstence() {
    return this.$('formily_iwuyzsdvrhg')?.formRef?.current?.form;
  }

  onDataSetChange(v) {
    // console.log(form.setValues, 'form.setValues')
    try {
      const form = this.getFormInstence();
      this.setState({
        dataSet: v,
        dataSetFileList: [], // 清空表格
      });

      form.setValues({
        dataSetContain: {
          version: null,
        },
      });
      this.setDataSetAndDataSetVersionsSource(v);
    } catch (error) {}
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

  getFileNameFromPath(path) {
    // 使用正则表达式匹配文件名
    const regex = /\/[^/]*$/;
    const filename = path.match(regex)[0].replace(/\//g, '');
    return filename;
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
      this.setState({
        contentType: obj.contentType,
      });
    } catch (error) {}
  }

  componentDidMount() {
    console.log('did mount', this);
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
        <Row wrap={true} __component_name="Row">
          <Col span={24} __component_name="Col">
            <Space align="center" direction="horizontal" __component_name="Space">
              <Button.Back
                name="返回"
                path="/knowledge"
                type="primary"
                title="新增知识库"
                __component_name="Button.Back"
              />
            </Space>
          </Col>
          <Col span={24} __component_name="Col">
            <Card
              size="default"
              type="inner"
              actions={[]}
              loading={false}
              bordered={false}
              hoverable={false}
              __component_name="Card"
            >
              <Flex style={{ marginBottom: '40px' }} justify="center" __component_name="Flex">
                <Steps
                  items={[{ title: '基本信息', subTitle: '' }, { title: '文件预览' }]}
                  style={{ width: '500px' }}
                  current={__$$eval(() => this.state.currentStep)}
                  onChange={function () {
                    return this.onStepChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  __component_name="Steps"
                />
              </Flex>
              <FormilyForm
                ref={this._refsManager.linkRef('step_form')}
                style={{}}
                formHelper={{ autoFocus: true }}
                componentProps={{
                  colon: false,
                  layout: 'horizontal',
                  labelCol: 2,
                  labelAlign: 'left',
                  wrapperCol: 12,
                }}
                __component_name="FormilyForm"
              >
                {!!__$$eval(() => this.state.currentStep === 0 && !this.state.submited) && (
                  <Row wrap={true} __component_name="Row">
                    <Col span={16} __component_name="Col">
                      <FormilyForm
                        ref={this._refsManager.linkRef('formily_iwuyzsdvrhg')}
                        formHelper={{ autoFocus: true }}
                        componentProps={{
                          colon: false,
                          layout: 'horizontal',
                          labelAlign: 'left',
                          labelWidth: '130px',
                          wrapperCol: 12,
                        }}
                        __component_name="FormilyForm"
                      >
                        <FormilyInput
                          fieldProps={{
                            name: 'displayName',
                            title: '知识库名称',
                            required: true,
                            'x-validator': [],
                          }}
                          componentProps={{
                            'x-component-props': { placeholder: '请输入知识库名称' },
                          }}
                          decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                          __component_name="FormilyInput"
                        />
                        <FormilySelect
                          fieldProps={{
                            enum: [],
                            name: 'embedder',
                            title: '向量化模型',
                            required: true,
                            description: '',
                            'x-validator': [],
                            _unsafe_MixedSetter_enum_select: 'ArraySetter',
                          }}
                          componentProps={{
                            'x-component-props': {
                              disabled: false,
                              allowClear: false,
                              placeholder: '请选择向量化模型',
                              _sdkSwrGetFunc: { label: '', value: '' },
                            },
                          }}
                          decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                          __component_name="FormilySelect"
                        />
                        <FormilyTextArea
                          fieldProps={{
                            name: 'description',
                            title: '描述',
                            'x-component': 'Input.TextArea',
                            'x-validator': [],
                          }}
                          componentProps={{ 'x-component-props': { placeholder: '请输入描述' } }}
                          decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                          __component_name="FormilyTextArea"
                        />
                        <FormilyFormItem
                          fieldProps={{
                            name: 'dataSetContain',
                            title: '处理数据集',
                            required: true,
                            'x-component': 'FormilyFormItem',
                            'x-validator': [],
                          }}
                          decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                          __component_name="FormilyFormItem"
                        >
                          <Row wrap={true} __component_name="Row">
                            <Col span={12} __component_name="Col">
                              <FormilySelect
                                fieldProps={{
                                  name: 'dataset',
                                  title: '',
                                  required: true,
                                  description: '',
                                  'x-validator': [],
                                }}
                                componentProps={{
                                  'x-component-props': {
                                    disabled: false,
                                    onChange: function () {
                                      return this.onDataSetChange.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([])
                                      );
                                    }.bind(this),
                                    allowClear: false,
                                    placeholder: '请选择数据集',
                                    _sdkSwrGetFunc: { label: '', value: '' },
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                __component_name="FormilySelect"
                              />
                            </Col>
                            <Col span={12} __component_name="Col">
                              <FormilySelect
                                fieldProps={{
                                  name: 'version',
                                  title: '',
                                  required: true,
                                  _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                                  '_unsafe_MixedSetter_x-validator_select': 'ExpressionSetter',
                                }}
                                componentProps={{
                                  'x-component-props': {
                                    disabled: false,
                                    onChange: function () {
                                      return this.onVersionChange.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([])
                                      );
                                    }.bind(this),
                                    allowClear: false,
                                    showSearch: false,
                                    placeholder: '请选择版本',
                                    _sdkSwrGetFunc: { label: 'label', value: 'value' },
                                    _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ObjectSetter',
                                  },
                                }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                __component_name="FormilySelect"
                              />
                            </Col>
                          </Row>
                        </FormilyFormItem>
                      </FormilyForm>
                    </Col>
                  </Row>
                )}
              </FormilyForm>
              {!!__$$eval(() => this.state.currentStep === 0 && !this.state.submited) && (
                <Row wrap={false} __component_name="Row">
                  <Col flex="130px" __component_name="Col">
                    <Typography.Text
                      style={{ fontSize: '', marginLeft: '0px', paddingLeft: '10px' }}
                      strong={false}
                      disabled={false}
                      ellipsis={true}
                      __component_name="Typography.Text"
                    >
                      文件选择
                    </Typography.Text>
                  </Col>
                  <Col flex="auto" __component_name="Col">
                    <Table
                      size="middle"
                      rowKey="path"
                      scroll={{ scrollToFirstRowOnChange: true }}
                      columns={[
                        {
                          key: '',
                          title: '名称',
                          render: (text, record, index) =>
                            (__$$context => (
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => __$$context.getFileNameFromPath(text))}
                              </Typography.Text>
                            ))(__$$createChildContext(__$$context, { text, record, index })),
                          dataIndex: 'path',
                        },
                        {
                          key: '',
                          title: '类型',
                          render: (text, record, index) =>
                            (__$$context => (
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => __$$context.getType())}
                              </Typography.Text>
                            ))(__$$createChildContext(__$$context, { text, record, index })),
                          dataIndex: 'fileType',
                        },
                        { title: '数据量', dataIndex: 'count' },
                        { title: '大小', dataIndex: 'size' },
                      ]}
                      dataSource={__$$eval(() => this.state.dataSetFileList)}
                      pagination={false}
                      showHeader={true}
                      rowSelection={{
                        type: 'checkbox',
                        onChange: function () {
                          return this.getCheckBox.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this),
                      }}
                      __component_name="Table"
                    />
                  </Col>
                </Row>
              )}
              {!!__$$eval(() => this.state.currentStep === 1 && !this.state.submited) && (
                <Flex wrap="nowrap" justify="right" vertical={true} __component_name="Flex">
                  <Row
                    wrap={false}
                    style={{ marginBottom: '25px' }}
                    justify="space-between"
                    __component_name="Row"
                  >
                    <Col __component_name="Col">
                      <Typography.Text
                        style={{ fontSize: '' }}
                        strong={false}
                        disabled={false}
                        ellipsis={true}
                        __component_name="Typography.Text"
                      >
                        {__$$eval(() => `共有文件：${this.state.nextFileList.length}`)}
                      </Typography.Text>
                    </Col>
                    <Col __component_name="Col">
                      <Input.Search placeholder="请输入" __component_name="Input.Search" />
                    </Col>
                  </Row>
                  {__$$evalArray(() => this.state.nextFileList).map((item, index) =>
                    (__$$context => (
                      <Row wrap={false} style={{ marginBottom: '8px' }} __component_name="Row">
                        <Col flex="auto" __component_name="Col">
                          <Row
                            wrap={true}
                            align="stretch"
                            style={{
                              height: '44px',
                              background: '#FAFAFA',
                              lineHeight: '44px',
                              borderRadius: '0px 0px 0px 0px',
                            }}
                            __component_name="Row"
                          >
                            <Col span={4} __component_name="Col">
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => item.path)}
                              </Typography.Text>
                            </Col>
                            <Col span={4} __component_name="Col">
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => `文件来源：${item.version || '--'}`)}
                              </Typography.Text>
                            </Col>
                            <Col span={4} __component_name="Col">
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => `类型：${__$$context.getType() || '--'}`)}
                              </Typography.Text>
                            </Col>
                            <Col span={4} __component_name="Col">
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => `数据量：${item.count?.toString() || '--'}`)}
                              </Typography.Text>
                            </Col>
                            <Col span={4} __component_name="Col">
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => item.fileSize)}
                              </Typography.Text>
                            </Col>
                            <Col span={4} __component_name="Col">
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
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ))(__$$createChildContext(__$$context, { item, index }))
                  )}
                </Flex>
              )}
              {!!__$$eval(() => this.state.submited) && (
                <Flex wrap="nowrap" justify="right" vertical={true} __component_name="Flex">
                  <Row
                    wrap={false}
                    style={{ marginBottom: '25px' }}
                    justify="space-between"
                    __component_name="Row"
                  >
                    <Col __component_name="Col">
                      <Typography.Text
                        style={{ fontSize: '' }}
                        strong={false}
                        disabled={false}
                        ellipsis={true}
                        __component_name="Typography.Text"
                      >
                        共有文件：113 文件向量化成功：10
                      </Typography.Text>
                    </Col>
                    <Col __component_name="Col">
                      <Input.Search placeholder="请输入" __component_name="Input.Search" />
                    </Col>
                  </Row>
                  {__$$evalArray(() => this.state.nextFileList).map((item, index) =>
                    (__$$context => (
                      <Row wrap={false} style={{ marginBottom: '8px' }} __component_name="Row">
                        <Col
                          flex="20px"
                          style={{ lineHeight: '44px', marginRight: '12px' }}
                          __component_name="Col"
                        >
                          <Status
                            id="disabled"
                            types={[{ id: 'disabled', type: 'disabled', children: '未知' }]}
                            getTypes={function () {
                              return this.getStatus.apply(
                                this,
                                Array.prototype.slice.call(arguments).concat([])
                              );
                            }.bind(__$$context)}
                            __component_name="Status"
                          />
                        </Col>
                        <Col flex="auto" __component_name="Col">
                          <Row
                            wrap={true}
                            align="stretch"
                            style={{
                              height: '44px',
                              background: '#FAFAFA',
                              lineHeight: '44px',
                              borderRadius: '0px 0px 0px 0px',
                            }}
                            __component_name="Row"
                          >
                            <Col span={4} __component_name="Col">
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => __$$context.getFileNameFromPath(item.path))}
                              </Typography.Text>
                            </Col>
                            <Col span={4} __component_name="Col">
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => `文件来源：${item.version || '--'}`)}
                              </Typography.Text>
                            </Col>
                            <Col span={4} __component_name="Col">
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => `类型：${__$$context.getType() || '--'}`)}
                              </Typography.Text>
                            </Col>
                            <Col span={4} __component_name="Col">
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => `数据量：${item.count || '--'}`)}
                              </Typography.Text>
                            </Col>
                            <Col span={4} __component_name="Col">
                              <Typography.Text
                                style={{ fontSize: '' }}
                                strong={false}
                                disabled={false}
                                ellipsis={true}
                                __component_name="Typography.Text"
                              >
                                {__$$eval(() => item.fileSize)}
                              </Typography.Text>
                            </Col>
                            <Col span={4} __component_name="Col">
                              <Button
                                icon=""
                                block={false}
                                ghost={false}
                                shape="default"
                                danger={false}
                                disabled={false}
                                __component_name="Button"
                              >
                                日志
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ))(__$$createChildContext(__$$context, { item, index }))
                  )}
                </Flex>
              )}
              <Divider
                mode="line"
                style={{ left: '-24px', width: 'calc(100% + 48px)', position: 'relative' }}
                dashed={false}
                defaultOpen={false}
                __component_name="Divider"
              />
              <Flex justify="center" __component_name="Flex">
                <Button
                  href="/knowledge"
                  icon=""
                  block={false}
                  ghost={false}
                  shape="default"
                  style={{ marginRight: '10px' }}
                  danger={false}
                  disabled={false}
                  __component_name="Button"
                >
                  {__$$eval(() => `${this.state.submited ? '返回' : '取消'}`)}
                </Button>
                {!!__$$eval(() => this.state.currentStep > 0 && !this.state.submited) && (
                  <Button
                    block={false}
                    ghost={false}
                    shape="default"
                    style={{ marginRight: '10px' }}
                    danger={false}
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
                    disabled={false}
                    __component_name="Button"
                  >
                    上一步
                  </Button>
                )}
                {!!__$$eval(() => this.state.currentStep !== 1) && (
                  <Button
                    block={false}
                    ghost={false}
                    shape="default"
                    style={{ marginRight: '10px' }}
                    danger={false}
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
                    disabled={false}
                    __component_name="Button"
                  >
                    下一步
                  </Button>
                )}
                {!!__$$eval(() => this.state.currentStep === 1 && !this.state.submited) && (
                  <Button
                    icon=""
                    type="primary"
                    block={false}
                    ghost={false}
                    shape="default"
                    danger={false}
                    onClick={function () {
                      return this.handleSubmit.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    disabled={false}
                    __component_name="Button"
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
          func: 'undefined',
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
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
