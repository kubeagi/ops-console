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
  FormilySelect,
  FormilyNumberPicker,
  Progress,
  Table,
  InnerHtmlContainer,
  FormilyInput,
  FormilyFormItem,
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

class $$Page extends React.Component {
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
      configMap: {
        qa_split: 'QAsplitChecked',
        document_chunk: 'TextSegmentationChecked',
        remove_invisible_characters: 'RemoveInvisibleCharactersChecked',
        space_standardization: 'SpaceHandleChecked',
        remove_garbled_text: 'RemoveGarbledCodeChecked',
        traditional_to_simplified: 'ConvertComplexityToSimplicityChecked',
        remove_html_tag: 'RemoveHtmlIdentifyingChecked',
        remove_emojis: 'RemoveEmoteChecked',
        simhash_operator: 'SimhashOperatorChecked',
        remove_email: 'RemoveEmailChecked',
        remove_ip_address: 'RemoveIPAddress',
        remove_number: 'RemoveNumber',
        character_duplication_rate: 'CharacterRepeatFilterChecked',
        word_duplication_rate: 'WordRepeatFilterChecked',
        special_character_rate: 'SpecialCharactersRateChecked',
        pornography_violence_word_rate: 'PornographicViolenceRateChecked',
      },
      step3Data: {
        QAsplitChecked: true,
        TextSegmentationChecked: false,
        TextSegmentationSegmentationLen: undefined,
        TextSegmentationSegmentationRepeatLen: undefined,
        RemoveInvisibleCharactersChecked: false,
        SpaceHandleChecked: false,
        RemoveGarbledCodeChecked: false,
        ConvertComplexityToSimplicityChecked: false,
        RemoveHtmlIdentifyingChecked: false,
        RemoveEmoteChecked: false,
        CharacterRepeatFilterChecked: false,
        CharacterRepeatFilterRate: 0.5,
        WordRepeatFilterChecked: false,
        WordRepeatFilterRate: 0.5,
        SpecialCharactersRateChecked: false,
        SpecialCharactersRateRate: 0.5,
        PornographicViolenceRateChecked: false,
        PornographicViolenceRateRate: 0.5,
        SimhashOperatorChecked: false,
        SimhashOperatorRate: 5,
        RemoveEmailChecked: false,
        RemoveIPAddress: false,
        RemoveNumber: false,
      },
      step4Data: {},
      currentStep: 0,
      step1FormData: {},
      step2FormData: {},
      configEnableMap: {},
      dataSetDataList: [],
      dataSetFileList: [],
      numberInputStep: 0.1,
      dataSetFileTotal: '0',
      fileTableLoading: false,
      selectedFileList: [],
      afterTreatmentData: [
        {
          type: '移除不可见字符',
          before:
            '计量水表安装在住宅<span style="background-color:rgba(250, 205, 145, 0.4);">???</span>的公共部位，供水企业抄表到户，按户计量收费。',
          after: '计量水表安装在住宅的公共部位，供水企业抄表到户，按户计量收费。',
        },
        {
          type: '空格处理',
          before:
            '全然不知对方身份，不断反转的剧情即将揭开层层真相。<span style="background-color:rgba(250, 205, 145, 0.4);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>',
          after: '全然不知对方身份，不断反转的剧情即将揭开层层真相。',
        },
        {
          type: '去除乱码',
          before:
            '原告孟庆连诉被告李成超凭样品买卖<span style="background-color:rgba(250, 205, 145, 0.4);">????</span>合同纠纷一案，本院于2015年8月10日受理',
          after: '原告孟庆连诉被告李成超凭样品买卖合同纠纷一案，本院于2015年8月10日受理',
        },
        {
          type: '繁转简',
          before:
            '<span style="background-color:rgba(250, 205, 145, 0.4);">風</span>暴<span style="background-color:rgba(250, 205, 145, 0.4);">帶</span>來的<span style="background-color:rgba(250, 205, 145, 0.4);">暫</span>停使消防<span style="background-color:rgba(250, 205, 145, 0.4);">員</span>和其他<span style="background-color:rgba(250, 205, 145, 0.4);">緊</span>急反<span style="background-color:rgba(250, 205, 145, 0.4);">應</span>人<span style="background-color:rgba(250, 205, 145, 0.4);">員</span>得以<span style="background-color:rgba(250, 205, 145, 0.4);">進</span>入禁<span style="background-color:rgba(250, 205, 145, 0.4);">區進</span>行<span style="background-color:rgba(250, 205, 145, 0.4);">結構</span>破<span style="background-color:rgba(250, 205, 145, 0.4);">壞評</span>估。',
          after: '风暴带来的暂停使消防员和其他紧急反应人员得以进入禁区进行结构破坏评估。',
        },
        {
          type: '去除网页标识符',
          before:
            '<span style="background-color:rgba(250, 205, 145, 0.4);">&ltdiv class="bolded"&gt&lt/div&gt</span>朗播 SAT 学员成绩单分析报告',
          after: '朗播 SAT 学员成绩单分析报告',
        },
        {
          type: '去除表情',
          before:
            '<span style="background-color:rgba(250, 205, 145, 0.4);">🐰</span>兔子<span style="background-color:rgba(250, 205, 145, 0.4);">👩</span>女孩<span style="background-color:rgba(250, 205, 145, 0.4);">👩</span>女孩<span style="background-color:rgba(250, 205, 145, 0.4);">🐰🧑🏼</span>男孩',
          after: '兔子女孩女孩男孩',
        },
      ],
      dataSetFileSearchParams: {
        keyword: '',
        currentPage: 1,
      },
      fileSelectCheckErrorFlag: false,
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

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  onBack(event) {
    // 点击按钮时的回调
    this.history.push('/data-handle');
  }

  async onNext() {
    if (this.state.currentStep === 0) {
      this.getStep1Data();
    } else if (this.state.currentStep === 1) {
      this.getStep2Data();
    } else if (this.state.currentStep === 2) {
      this.onNextStep();
    } else {
      this.onNextStep();
    }
  }

  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  async onFinish() {
    const list = this.convertStep3Data();
    const files = this.state.selectedFileList.map(item => {
      const _item = item.split('/');
      return {
        name: _item[_item.length - 1],
      };
    });
    const { pre_data_set_name, pre_data_set_version } = this.state.step2FormData;
    const versionName = this.getVersionName(pre_data_set_name, pre_data_set_version);
    const data = {
      ...this.state.step1FormData,
      ...this.state.step2FormData,
      version_data_set_name: versionName,
      data_process_config_info: list,
      file_names: files,
      bucket_name: this.utils.getAuthData().project,
    };
    const res = await this.utils.bff.createDataProcessTask({
      input: {
        ...data,
      },
    });
    if (res.dataProcess.createDataProcessTask.status === 200) {
      this.utils.notification.success({
        message: '成功',
      });
      this.history.push('/data-handle');
    } else {
      this.utils.notification.success({
        message: res.dataProcess?.createDataProcessTask?.message || '失败',
      });
    }
  }

  onSearch(event) {
    this.debouncedFunction(event);
  }

  valToKey(obj) {
    const _obj = {};
    for (let key in obj) {
      _obj[obj[key]] = key;
    }
    return _obj;
  }

  async getDataSet() {
    const res = await this.utils.bff.listDatasets({
      input: {
        namespace: this.utils.getAuthData().project,
      },
      versionsInput: {
        namespace: this.utils.getAuthData().project,
      },
      filesInput: {
        keyword: this.state.dataSetFileSearchParams.keyword,
        pageSize: 10,
        page: this.state.dataSetFileSearchParams.currentPage,
      },
    });
    const datasetlist = res.Dataset.listDatasets.nodes.map(item => {
      const versions = item.versions.nodes.map(i => ({
        label: i.displayName,
        value: i.version,
        name: i.name,
        namespace: i.namespace,
      }));
      return {
        label: item.name,
        value: item.name,
        versions: versions,
        namespace: item.namespace,
      };
    });
    this.setState(
      {
        dataSetDataList: datasetlist,
      },
      () => {
        const values = this.form('createDataHandleStep2')?.values;
        const name = this.getVersionName(values?.pre_data_set_name, values?.pre_data_set_version);
        this.getTableList(name);
      }
    );
  }

  onNextStep() {
    // step2 文件检查
    if (this.state.currentStep === 1) {
      if (!this.state.selectedFileList.length) {
        this.setState({
          fileSelectCheckErrorFlag: true,
        });
        // 调试需要关闭此
        //  return;
      }
    }

    const step = this.state.currentStep + 1;
    this.setState(
      {
        currentStep: step,
      },
      () => {
        if (this.state.currentStep === 1) {
          this.form('createDataHandleStep2').setFieldState('pre_data_set_name', {
            dataSource: this.state.dataSetDataList,
          });
          this.form('createDataHandleStep2').setFieldState('post_data_set_name', {
            dataSource: this.state.dataSetDataList,
          });
          this.backToStep2();
        }
        if (this.state.currentStep === 2) {
          // const enableObj = {};
          // const data = this.props.useDataProcessSupportType.data.dataProcess.dataProcessSupportType.data;
          // this.setState({
          //   configEnableMap: enableObj
          // })
        }
      }
    );
  }

  onPrevious() {
    const step = this.state.currentStep - 1;
    this.setState(
      {
        currentStep: step,
      },
      () => {
        if (this.state.currentStep === 0) {
          if (!this.form('createDataHandleStep1')) return;
          this.form('createDataHandleStep1').setValues({
            name: this.state.step1FormData.name || undefined,
            file_type: this.state.step1FormData.file_type || undefined,
          });
        } else if (this.state.currentStep === 1) {
          this.form('createDataHandleStep2').setFieldState('pre_data_set_name', {
            dataSource: this.state.dataSetDataList,
          });
          this.form('createDataHandleStep2').setFieldState('post_data_set_name', {
            dataSource: this.state.dataSetDataList,
          });
          this.backToStep2();
        }
      }
    );
  }

  backToStep2() {
    const { pre_data_set_name, pre_data_set_version } = this.state.step2FormData;
    if (!pre_data_set_name) return;
    this.setDataSetVersionsSource(pre_data_set_name);
    this.form('createDataHandleStep2').setValues({
      pre_data_set_name,
      pre_data_set_version,
      post_data_set_version: pre_data_set_version,
      post_data_set_name: pre_data_set_name,
    });
  }

  getStep1Data() {
    this.form('createDataHandleStep1')
      .validate()
      .then(res => {
        const step1FormData = this.form('createDataHandleStep1').values;
        this.setState({
          step1FormData,
        });
        this.onNextStep();
      });
  }

  getStep2Data() {
    this.form('createDataHandleStep2')
      ?.validate()
      .then(res => {
        const step2FormData = this.form('createDataHandleStep2').values;
        this.setState({
          step2FormData,
        });
        this.onNextStep();
      });
  }

  async getTableList(name) {
    if (!name) return;
    this.setState({
      fileTableLoading: true,
    });
    const res = await this.utils.bff.getVersionedDataset({
      name: name,
      namespace: this.utils.getAuthData().project,
      fileInput: {
        keyword: this.state.dataSetFileSearchParams.keyword,
        pageSize: 10,
        page: this.state.dataSetFileSearchParams.currentPage,
      },
    });
    const data = res.VersionedDataset.getVersionedDataset.files;
    this.setState({
      fileTableLoading: false,
      dataSetFileList:
        (data.nodes || []).map(i => ({
          ...i,
          label: '普通文本',
        })) || [],
      dataSetFileTotal: data.totalCount || 0,
    });
  }

  onPageChange(page) {
    this.setState(
      {
        dataSetFileSearchParams: {
          ...this.state.dataSetFileSearchParams,
          currentPage: page,
        },
      },
      () => {
        this.getDataSet();
      }
    );
  }

  getVersionName(dataset, version) {
    console.log(dataset, this.state.dataSetDataList);
    if (dataset && version) {
      const datasetObj = this.state.dataSetDataList.find(i => i.value === dataset);
      console.log(datasetObj);
      const versionObj = datasetObj.versions.find(i => i.value === version);
      return versionObj.name;
    }
    return;
  }

  onDataSetChange(v) {
    this.setState({
      dataSetFileList: [],
      selectedFileList: [],
      dataSetFileTotal: '0',
    });
    this.form('createDataHandleStep2').setValues({
      pre_data_set_version: undefined,
      post_data_set_version: undefined,
      post_data_set_name: v,
    });
    this.setDataSetVersionsSource(v);
  }

  convertStep3Data() {
    const list = [];
    const step3Data = this.state.step3Data;
    const vTk = this.valToKey(this.state.configMap);
    console.log(vTk);
    for (let k in step3Data) {
      if (k.endsWith('Checked')) {
        if (step3Data[k]) {
          list.push({
            type: vTk[k],
          });
        }
      }
    }
    return list;
  }

  updateStep3State(value, event, extraParams = {}) {
    const fieldName = {
      ...event,
      ...extraParams,
    }.fieldName;
    const step3 = {
      ...this.state.step3Data,
      [fieldName]: value,
    };
    this.setState({
      step3Data: step3,
    });
  }

  onSelectFileChange(v) {
    if (v.length) {
      this.setState({
        fileSelectCheckErrorFlag: false,
      });
    }
    this.setState({
      selectedFileList: v,
    });
  }

  onDataSetVersionChange(v) {
    this.form('createDataHandleStep2').setValues({
      post_data_set_version: v,
    });
    const { pre_data_set_name } = this.form('createDataHandleStep2').values;
    const name = this.getVersionName(pre_data_set_name, v);
    this.getTableList(name);
  }

  setDataSetVersionsSource(v) {
    const obj = this.state.dataSetDataList.find(item => item.value === v);
    const genOptionList = obj.versions;
    this.form('createDataHandleStep2').setFieldState('pre_data_set_version', {
      dataSource: genOptionList,
    });
    this.form('createDataHandleStep2').setFieldState('post_data_set_version', {
      dataSource: genOptionList,
    });
  }

  componentDidMount() {
    this.debouncedFunction = this.debounce(event => {
      // 执行你的逻辑
      this.setState(
        {
          dataSetFileSearchParams: {
            keyword: event.target.value,
            currentPage: 1,
          },
        },
        () => {
          const values = this.form('createDataHandleStep2')?.values;
          const name = this.getVersionName(values?.pre_data_set_name, values?.pre_data_set_version);
          this.getTableList(name);
        }
      );
    }, 1000); // 1000 毫秒的防抖延迟
    this.getDataSet();
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
                { title: '处理样例' },
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
            {!!__$$eval(
              () => this.state.currentStep === 2 && this.state.step1FormData.file_type !== 'qa'
            ) && (
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
                        style={{ height: '182px' }}
                        actions={[]}
                        loading={false}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
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
                                      checked={__$$eval(
                                        () => this.state.step3Data.TextSegmentationChecked
                                      )}
                                      loading={false}
                                      disabled={true}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'TextSegmentationChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      />
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row wrap={true} gutter={['', 8]} __component_name="Row">
                              <Col
                                span={24}
                                style={{ marginBottom: '0px', paddingBottom: '0px' }}
                                __component_name="Col"
                              >
                                <FormilyForm
                                  ref={this._refsManager.linkRef('formily_ob8rkd34dcj')}
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
                                  {!!false && (
                                    <FormilySelect
                                      fieldProps={{ name: 'Select', 'x-validator': [] }}
                                      componentProps={{
                                        'x-component-props': {
                                          disabled: false,
                                          allowClear: false,
                                          placeholder: '请选择模型',
                                          _sdkSwrGetFunc: {},
                                        },
                                      }}
                                      decoratorProps={{
                                        'x-decorator-props': {
                                          style: { marginBottom: '0px' },
                                          tooltip: '',
                                          labelEllipsis: true,
                                        },
                                      }}
                                      __component_name="FormilySelect"
                                    />
                                  )}
                                </FormilyForm>
                                <Row wrap={false} justify="space-between" __component_name="Row">
                                  <Col __component_name="Col">
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                        __component_name="Col"
                                      />
                                    </Row>
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
                              formHelper={{ style: { textAlign: 'right' }, autoFocus: false }}
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
                                  name: null,
                                  title: '分段长度',
                                  default: __$$eval(
                                    () => this.state.step3Data.TextSegmentationSegmentationLen
                                  ),
                                  required: true,
                                  'x-validator': [],
                                  _unsafe_MixedSetter_default_select: 'VariableSetter',
                                }}
                                componentProps={{
                                  'x-component-props': {
                                    suffix: '',
                                    onChange: function () {
                                      return this.updateStep3State.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([
                                          {
                                            fieldName: 'TextSegmentationSegmentationLen',
                                          },
                                        ])
                                      );
                                    }.bind(this),
                                    addonAfter: '',
                                  },
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
                                  name: null,
                                  title: '分段重叠长度',
                                  default: __$$eval(
                                    () => this.state.step3Data.TextSegmentationSegmentationRepeatLen
                                  ),
                                  required: true,
                                  'x-validator': [],
                                  _unsafe_MixedSetter_default_select: 'VariableSetter',
                                }}
                                componentProps={{
                                  'x-component-props': {
                                    onChange: function () {
                                      return this.updateStep3State.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([
                                          {
                                            fieldName: 'TextSegmentationSegmentationRepeatLen',
                                          },
                                        ])
                                      );
                                    }.bind(this),
                                    placeholder: '',
                                  },
                                }}
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
                                  style={{ fontSize: '12px' }}
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
                                  style={{ fontSize: '12px' }}
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
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        style={{ height: '182px' }}
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
                                      checked={__$$eval(() => this.state.step3Data.QAsplitChecked)}
                                      loading={false}
                                      disabled={false}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'QAsplitChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Row wrap={true} gutter={['', 8]} __component_name="Row">
                                  <Col
                                    span={24}
                                    style={{ marginBottom: '0px', paddingBottom: '0px' }}
                                    __component_name="Col"
                                  >
                                    <FormilyForm
                                      ref={this._refsManager.linkRef('formilyform-04uiotn')}
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
                                      {!!false && (
                                        <FormilySelect
                                          fieldProps={{ name: 'Select', 'x-validator': [] }}
                                          componentProps={{
                                            'x-component-props': {
                                              disabled: false,
                                              allowClear: false,
                                              placeholder: '请选择模型',
                                              _sdkSwrGetFunc: {},
                                            },
                                          }}
                                          decoratorProps={{
                                            'x-decorator-props': {
                                              style: { marginBottom: '0px' },
                                              tooltip: '',
                                              labelEllipsis: true,
                                            },
                                          }}
                                          __component_name="FormilySelect"
                                        />
                                      )}
                                    </FormilyForm>
                                    <Row
                                      wrap={false}
                                      justify="space-between"
                                      __component_name="Row"
                                    >
                                      <Col __component_name="Col">
                                        <Row
                                          wrap={false}
                                          justify="space-between"
                                          __component_name="Row"
                                        >
                                          <Col
                                            style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                            __component_name="Col"
                                          />
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                                <Typography.Paragraph
                                  code={false}
                                  mark={false}
                                  type="secondary"
                                  style={{ fontSize: '', paddingTop: '10px' }}
                                  delete={false}
                                  strong={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  underline={false}
                                >
                                  根据文件中的文章与图表标题，自动将文件做 QA 拆分处理。
                                </Typography.Paragraph>
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
                                      checked={__$$eval(
                                        () => this.state.step3Data.RemoveInvisibleCharactersChecked
                                      )}
                                      loading={false}
                                      disabled={false}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'RemoveInvisibleCharactersChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Paragraph
                                  code={false}
                                  mark={false}
                                  type="secondary"
                                  style={{ fontSize: '' }}
                                  delete={false}
                                  strong={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  underline={false}
                                >
                                  移除ASCII中的一些不可见字符, 如0-32 和127-160这两个范围
                                </Typography.Paragraph>
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
                                      checked={__$$eval(
                                        () => this.state.step3Data.SpaceHandleChecked
                                      )}
                                      loading={false}
                                      disabled={false}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'SpaceHandleChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Paragraph
                                  code={false}
                                  mark={false}
                                  type="secondary"
                                  style={{ fontSize: '' }}
                                  delete={false}
                                  strong={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  underline={false}
                                >
                                  移 除文档中的开头和结尾的空格tab等，如‘\n’, ‘\r’,
                                  ‘\t’等。将段落内不同的 unicode 空格比如  u2008，转成正常的空格
                                </Typography.Paragraph>
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
                        style={{ height: '118px' }}
                        actions={[]}
                        loading={false}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
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
                                      checked={__$$eval(
                                        () => this.state.step3Data.RemoveGarbledCodeChecked
                                      )}
                                      loading={false}
                                      disabled={true}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'RemoveGarbledCodeChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Paragraph
                                  code={false}
                                  mark={false}
                                  type="secondary"
                                  style={{ fontSize: '' }}
                                  delete={false}
                                  strong={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={true}
                                  underline={false}
                                >
                                  去除乱码和无意义的unicode
                                </Typography.Paragraph>
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
                        className="step3_disabled_style"
                        hoverable={false}
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
                                      checked={__$$eval(
                                        () =>
                                          this.state.step3Data.ConvertComplexityToSimplicityChecked
                                      )}
                                      loading={false}
                                      disabled={true}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'ConvertComplexityToSimplicityChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Paragraph
                                  code={false}
                                  mark={false}
                                  type="secondary"
                                  style={{ fontSize: '' }}
                                  delete={false}
                                  strong={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  underline={false}
                                >
                                  繁体转简体，如“不經意，妳的笑容”清洗成“不经意，你的笑容”
                                </Typography.Paragraph>
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
                        style={{ height: '118px' }}
                        actions={[]}
                        loading={false}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
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
                                      checked={__$$eval(
                                        () => this.state.step3Data.RemoveHtmlIdentifyingChecked
                                      )}
                                      loading={false}
                                      disabled={true}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'RemoveHtmlIdentifyingChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Paragraph
                                  code={false}
                                  mark={false}
                                  type="secondary"
                                  style={{ fontSize: '' }}
                                  delete={false}
                                  strong={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  underline={false}
                                >
                                  移除文档中的html标签，如&#60;html&#62;,&#60;dev&#62;,&#60;p&#62;等
                                </Typography.Paragraph>
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
                        style={{ height: '118px' }}
                        actions={[]}
                        loading={false}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
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
                                      checked={__$$eval(
                                        () => this.state.step3Data.RemoveEmoteChecked
                                      )}
                                      loading={false}
                                      disabled={true}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'RemoveEmoteChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Paragraph
                                  code={false}
                                  mark={false}
                                  type="secondary"
                                  style={{ fontSize: '' }}
                                  delete={false}
                                  strong={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={true}
                                  underline={false}
                                >
                                  去除文 档中的表情，如‘🐰’, ‘🧑🏼’等
                                </Typography.Paragraph>
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
                        className="step3_disabled_style"
                        hoverable={false}
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
                                      checked={__$$eval(
                                        () => this.state.step3Data.CharacterRepeatFilterChecked
                                      )}
                                      loading={false}
                                      disabled={true}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'CharacterRepeatFilterChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
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
                                      <Col span={16} __component_name="Col">
                                        <Progress
                                          percent={__$$eval(
                                            () =>
                                              this.state.step3Data.CharacterRepeatFilterRate * 100
                                          )}
                                          __component_name="Progress"
                                        />
                                      </Col>
                                      <Col __component_name="Col">
                                        <FormilyForm
                                          ref={this._refsManager.linkRef('formily_bu33ve7fnv')}
                                          formHelper={{ autoFocus: false }}
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
                                            style={{ width: '60px' }}
                                            fieldProps={{
                                              name: null,
                                              title: '',
                                              default: __$$eval(
                                                () => this.state.step3Data.CharacterRepeatFilterRate
                                              ),
                                              'x-validator': [],
                                              _unsafe_MixedSetter_default_select: 'VariableSetter',
                                            }}
                                            componentProps={{
                                              'x-component-props': {
                                                max: 1,
                                                min: 0,
                                                step: __$$eval(() => this.state.numberInputStep),
                                                onChange: function () {
                                                  return this.updateStep3State.apply(
                                                    this,
                                                    Array.prototype.slice.call(arguments).concat([
                                                      {
                                                        fieldName: 'CharacterRepeatFilterRate',
                                                      },
                                                    ])
                                                  );
                                                }.bind(this),
                                                precision: 1,
                                                placeholder: '',
                                              },
                                            }}
                                            decoratorProps={{
                                              'x-decorator-props': {
                                                size: 'small',
                                                labelEllipsis: true,
                                              },
                                            }}
                                            __component_name="FormilyNumberPicker"
                                          />
                                        </FormilyForm>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Typography.Paragraph
                          code={false}
                          mark={false}
                          type="secondary"
                          style={{ fontSize: '' }}
                          delete={false}
                          strong={false}
                          disabled={false}
                          editable={false}
                          ellipsis={{ rows: 2 }}
                          underline={false}
                        >
                          如果字重复率太高，意味着文档中重复的字太多，文档会被过滤掉
                        </Typography.Paragraph>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
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
                                          {' '}
                                          词重复率过滤
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={__$$eval(
                                        () => this.state.step3Data.WordRepeatFilterChecked
                                      )}
                                      loading={false}
                                      disabled={true}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'WordRepeatFilterChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
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
                                  <Col span={16} __component_name="Col">
                                    <Progress
                                      percent={__$$eval(
                                        () => this.state.step3Data.WordRepeatFilterRate * 100
                                      )}
                                      __component_name="Progress"
                                    />
                                  </Col>
                                  <Col __component_name="Col">
                                    <FormilyForm
                                      ref={this._refsManager.linkRef('formilyform-h5d0b6o')}
                                      formHelper={{ autoFocus: false }}
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
                                        style={{ width: '60px' }}
                                        fieldProps={{
                                          name: null,
                                          title: '',
                                          default: __$$eval(
                                            () => this.state.step3Data.WordRepeatFilterRate
                                          ),
                                          'x-validator': [],
                                          _unsafe_MixedSetter_default_select: 'VariableSetter',
                                        }}
                                        componentProps={{
                                          'x-component-props': {
                                            max: 1,
                                            min: 0,
                                            step: __$$eval(() => this.state.numberInputStep),
                                            onChange: function () {
                                              return this.updateStep3State.apply(
                                                this,
                                                Array.prototype.slice.call(arguments).concat([
                                                  {
                                                    fieldName: 'WordRepeatFilterRate',
                                                  },
                                                ])
                                              );
                                            }.bind(this),
                                            placeholder: '',
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            size: 'small',
                                            labelEllipsis: true,
                                          },
                                        }}
                                        __component_name="FormilyNumberPicker"
                                      />
                                    </FormilyForm>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Typography.Paragraph
                          code={false}
                          mark={false}
                          type="secondary"
                          style={{ fontSize: '' }}
                          delete={false}
                          strong={false}
                          disabled={false}
                          editable={false}
                          ellipsis={{ rows: 2 }}
                          underline={false}
                        >
                          如果词重复率太高，意味着文档中重复的词太多，文档会被过滤掉
                        </Typography.Paragraph>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        actions={[]}
                        loading={false}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
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
                                      checked={__$$eval(
                                        () => this.state.step3Data.SpecialCharactersRateChecked
                                      )}
                                      loading={false}
                                      disabled={true}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'SpecialCharactersRateChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
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
                                  <Col span={17} __component_name="Col">
                                    <Progress
                                      percent={__$$eval(
                                        () => this.state.step3Data.SpecialCharactersRateRate * 100
                                      )}
                                      __component_name="Progress"
                                    />
                                  </Col>
                                  <Col __component_name="Col">
                                    <FormilyForm
                                      ref={this._refsManager.linkRef('formilyform-kwftate')}
                                      formHelper={{ autoFocus: false }}
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
                                        style={{ width: '60px' }}
                                        fieldProps={{
                                          name: null,
                                          title: '',
                                          default: __$$eval(
                                            () => this.state.step3Data.SpecialCharactersRateRate
                                          ),
                                          'x-validator': [],
                                          _unsafe_MixedSetter_default_select: 'VariableSetter',
                                        }}
                                        componentProps={{
                                          'x-component-props': {
                                            max: 1,
                                            min: 0,
                                            step: __$$eval(() => this.state.numberInputStep),
                                            onChange: function () {
                                              return this.updateStep3State.apply(
                                                this,
                                                Array.prototype.slice.call(arguments).concat([
                                                  {
                                                    fieldName: 'SpecialCharactersRateRate',
                                                  },
                                                ])
                                              );
                                            }.bind(this),
                                            placeholder: '',
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            size: 'small',
                                            labelEllipsis: true,
                                          },
                                        }}
                                        __component_name="FormilyNumberPicker"
                                      />
                                    </FormilyForm>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Typography.Paragraph
                          code={false}
                          mark={false}
                          type="secondary"
                          style={{ fontSize: '' }}
                          delete={false}
                          strong={false}
                          disabled={false}
                          editable={false}
                          ellipsis={{ rows: 2 }}
                          underline={false}
                        >
                          如果特殊字符率太高，意味着文档中特殊字符太多，文档会被过滤掉
                        </Typography.Paragraph>
                      </Card>
                    </Col>
                    <Col span={6} __component_name="Col">
                      <Card
                        size="default"
                        type="default"
                        style={{ height: '158px' }}
                        actions={[]}
                        loading={false}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
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
                                      checked={__$$eval(
                                        () => this.state.step3Data.PornographicViolenceRateChecked
                                      )}
                                      loading={false}
                                      disabled={true}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'PornographicViolenceRateChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
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
                                  <Col span={17} __component_name="Col">
                                    <Progress
                                      percent={__$$eval(
                                        () =>
                                          this.state.step3Data.PornographicViolenceRateRate * 100
                                      )}
                                      __component_name="Progress"
                                    />
                                  </Col>
                                  <Col __component_name="Col">
                                    <FormilyForm
                                      ref={this._refsManager.linkRef('formilyform-q8tkxw3')}
                                      formHelper={{ autoFocus: false }}
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
                                        style={{ width: '60px' }}
                                        fieldProps={{
                                          name: null,
                                          title: '',
                                          default: __$$eval(
                                            () => this.state.step3Data.PornographicViolenceRateRate
                                          ),
                                          'x-validator': [],
                                          _unsafe_MixedSetter_default_select: 'VariableSetter',
                                        }}
                                        componentProps={{
                                          'x-component-props': {
                                            max: 1,
                                            min: 0,
                                            step: __$$eval(() => this.state.numberInputStep),
                                            onChange: function () {
                                              return this.updateStep3State.apply(
                                                this,
                                                Array.prototype.slice.call(arguments).concat([
                                                  {
                                                    fieldName: 'PornographicViolenceRateRate',
                                                  },
                                                ])
                                              );
                                            }.bind(this),
                                            placeholder: '',
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            size: 'small',
                                            labelEllipsis: true,
                                          },
                                        }}
                                        __component_name="FormilyNumberPicker"
                                      />
                                    </FormilyForm>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Typography.Paragraph
                          code={false}
                          mark={false}
                          type="secondary"
                          style={{ fontSize: '' }}
                          delete={false}
                          strong={false}
                          disabled={false}
                          editable={false}
                          ellipsis={{ rows: 2 }}
                          underline={false}
                        >
                          如果色情暴力词率太高，文档会被过滤掉
                        </Typography.Paragraph>
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
                        className="step3_disabled_style"
                        hoverable={false}
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
                                          Simhash
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={__$$eval(
                                        () => this.state.step3Data.SimhashOperatorChecked
                                      )}
                                      loading={false}
                                      disabled={true}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'SimhashOperatorChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
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
                                  <Col span={16} __component_name="Col">
                                    <Progress
                                      percent={__$$eval(() =>
                                        this.state.step3Data.SimhashOperatorRate === 4
                                          ? 0
                                          : this.state.step3Data.SimhashOperatorRate === 5
                                          ? 50
                                          : 100
                                      )}
                                      __component_name="Progress"
                                    />
                                  </Col>
                                  <Col __component_name="Col">
                                    <FormilyForm
                                      ref={this._refsManager.linkRef('formilyform-zjbf6fy')}
                                      formHelper={{ autoFocus: false }}
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
                                        style={{ width: '60px' }}
                                        fieldProps={{
                                          name: null,
                                          title: '',
                                          default: __$$eval(
                                            () => this.state.step3Data.SimhashOperatorRate
                                          ),
                                          'x-validator': [],
                                          _unsafe_MixedSetter_default_select: 'VariableSetter',
                                        }}
                                        componentProps={{
                                          'x-component-props': {
                                            max: 6,
                                            min: 4,
                                            onChange: function () {
                                              return this.updateStep3State.apply(
                                                this,
                                                Array.prototype.slice.call(arguments).concat([
                                                  {
                                                    fieldName: 'SimhashOperatorRate',
                                                  },
                                                ])
                                              );
                                            }.bind(this),
                                            placeholder: '',
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            size: 'small',
                                            labelEllipsis: true,
                                          },
                                        }}
                                        __component_name="FormilyNumberPicker"
                                      />
                                    </FormilyForm>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Typography.Paragraph
                          code={false}
                          mark={false}
                          type="secondary"
                          style={{ fontSize: '' }}
                          delete={false}
                          strong={false}
                          disabled={false}
                          editable={false}
                          ellipsis={{ rows: 2 }}
                          underline={false}
                        >
                          根据 Hamming 距离计算文档相似度,
                          相似度&#60;=海明距离，认为两个文档相似。（范围：4-6）
                        </Typography.Paragraph>
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
                        style={{ height: '118px' }}
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
                                          去除Email
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      size="small"
                                      checked={__$$eval(
                                        () => this.state.step3Data.RemoveEmailChecked
                                      )}
                                      loading={false}
                                      disabled={false}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'RemoveEmailChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Paragraph
                                  code={false}
                                  mark={false}
                                  type="secondary"
                                  style={{ fontSize: '' }}
                                  delete={false}
                                  strong={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={true}
                                  underline={false}
                                >
                                  去除email地址
                                </Typography.Paragraph>
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
                        style={{ height: '118px' }}
                        actions={[]}
                        loading={false}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
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
                                      checked={__$$eval(() => this.state.step3Data.RemoveIPAddress)}
                                      loading={false}
                                      disabled={true}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'RemoveIPAddress',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Paragraph
                                  code={false}
                                  mark={false}
                                  type="secondary"
                                  style={{ fontSize: '' }}
                                  delete={false}
                                  strong={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  underline={false}
                                >
                                  去除IPv4 或者 IPv6 地址
                                </Typography.Paragraph>
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
                        style={{ height: '118px' }}
                        actions={[]}
                        loading={false}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
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
                                      checked={__$$eval(() => this.state.step3Data.RemoveNumber)}
                                      loading={false}
                                      disabled={true}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'RemoveNumber',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
                                      defaultChecked={false}
                                      __component_name="Switch"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={24} __component_name="Col">
                                <Typography.Paragraph
                                  code={false}
                                  mark={false}
                                  type="secondary"
                                  style={{ fontSize: '' }}
                                  delete={false}
                                  strong={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  underline={false}
                                >
                                  去除数字和字母数字标识符，如电话号码、信用卡号、十六进制散列等，同时跳过年份和简单数字的实例
                                </Typography.Paragraph>
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
                数据处理样例
              </Typography.Text>
            </Col>
            <Col span={24} __component_name="Col">
              <Table
                size="middle"
                rowKey="id"
                scroll={{ scrollToFirstRowOnChange: true }}
                columns={[
                  { key: 'name', title: '配置内容', dataIndex: 'type' },
                  {
                    key: 'age',
                    title: '处理前',
                    render: (text, record, index) =>
                      (__$$context => (
                        <InnerHtmlContainer __component_name="InnerHtmlContainer">
                          {__$$eval(() => text)}
                        </InnerHtmlContainer>
                      ))(__$$createChildContext(__$$context, { text, record, index })),
                    dataIndex: 'before',
                  },
                  {
                    title: '处理后',
                    render: (text, record, index) =>
                      (__$$context => (
                        <Typography.Text
                          style={{ fontSize: '' }}
                          strong={false}
                          disabled={false}
                          ellipsis={true}
                          __component_name="Typography.Text"
                        >
                          {__$$eval(() => text)}
                        </Typography.Text>
                      ))(__$$createChildContext(__$$context, { text, record, index })),
                    dataIndex: 'after',
                  },
                ]}
                dataSource={__$$eval(() => this.state.afterTreatmentData)}
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
                ref={this._refsManager.linkRef('createDataHandleStep1')}
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
                      style={{ width: '500px' }}
                      fieldProps={{
                        name: 'name',
                        title: '任务名称',
                        'x-validator': [
                          { id: 'disabled', type: 'disabled', children: '未知', required: true },
                        ],
                      }}
                      componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
                      decoratorProps={{
                        'x-decorator-props': { labelCol: 3, wrapperCol: 12, labelEllipsis: true },
                      }}
                      __component_name="FormilyInput"
                    />
                  </Col>
                  <Col span={24} style={{ height: '40px' }} __component_name="Col">
                    <FormilySelect
                      style={{ width: '500px' }}
                      fieldProps={{
                        enum: [
                          {
                            id: 'disabled',
                            type: 'disabled',
                            label: '普通文本',
                            value: 'text',
                            children: '',
                          },
                          {
                            id: 'disabled',
                            type: 'disabled',
                            label: 'QA文本',
                            value: 'qa',
                            children: '',
                          },
                        ],
                        name: 'file_type',
                        title: '文件类型',
                        required: true,
                        'x-validator': [
                          { id: 'disabled', type: 'disabled', children: '未知', required: true },
                        ],
                      }}
                      componentProps={{
                        'x-component-props': {
                          disabled: false,
                          allowClear: false,
                          placeholder: '请选择',
                          _sdkSwrGetFunc: {},
                        },
                      }}
                      decoratorProps={{ 'x-decorator-props': { labelCol: 3, labelEllipsis: true } }}
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
                ref={this._refsManager.linkRef('createDataHandleStep2')}
                formHelper={{ autoFocus: false }}
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
                      style={{}}
                      fieldProps={{
                        enum: null,
                        name: 'pre_data_set_name',
                        title: '处理前数据集',
                        required: true,
                        'x-validator': [],
                        _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
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
                          showSearch: false,
                          placeholder: '请选择数据集',
                          _sdkSwrGetFunc: __$$eval(() => this.state.dataSetDataList),
                          _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ExpressionSetter',
                        },
                      }}
                      decoratorProps={{
                        'x-decorator-props': {
                          labelCol: 6,
                          wrapperCol: 18,
                          wrapperWidth: '',
                          labelEllipsis: true,
                        },
                      }}
                      __component_name="FormilySelect"
                    />
                  </Col>
                  <Col span={12} __component_name="Col">
                    <FormilySelect
                      fieldProps={{
                        enum: null,
                        name: 'pre_data_set_version',
                        title: '',
                        required: true,
                        'x-validator': [],
                        _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                      }}
                      componentProps={{
                        'x-component-props': {
                          disabled: false,
                          onChange: function () {
                            return this.onDataSetVersionChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                          allowClear: false,
                          placeholder: '请选择数据集版本',
                          _sdkSwrGetFunc: {},
                          _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ObjectSetter',
                        },
                      }}
                      decoratorProps={{
                        'x-decorator-props': { wrapperWidth: '75%', labelEllipsis: true },
                      }}
                      __component_name="FormilySelect"
                    />
                  </Col>
                </Row>
                <Row
                  wrap={true}
                  style={{ marginBottom: '0px', paddingBottom: '0px' }}
                  __component_name="Row"
                >
                  <Col span={3} __component_name="Col">
                    <FormilyFormItem
                      style={{}}
                      fieldProps={{
                        name: 'FormilyFormItem',
                        title: '选择文件',
                        'x-component': 'FormilyFormItem',
                        'x-validator': [],
                      }}
                      decoratorProps={{
                        'x-decorator-props': {
                          asterisk: true,
                          labelCol: 6,
                          wrapperWidth: '0',
                          labelEllipsis: true,
                        },
                      }}
                      __component_name="FormilyFormItem"
                    />
                  </Col>
                  <Col
                    span={19}
                    style={{
                      paddingTop: '24px',
                      borderColor: '#9b9b9b',
                      borderStyle: 'dashed',
                      borderWidth: '1px',
                      marginBottom: '0px',
                      paddingBottom: '24px',
                    }}
                    __component_name="Col"
                  >
                    <Row wrap={true} __component_name="Row">
                      <Col span={24} __component_name="Col">
                        <Row wrap={false} justify="space-between" __component_name="Row">
                          <Col __component_name="Col">
                            <FormilyInput
                              style={{ width: '400px' }}
                              fieldProps={{ name: 'Input', title: '', 'x-validator': [] }}
                              componentProps={{
                                'x-component-props': {
                                  onChange: function () {
                                    return this.onSearch.apply(
                                      this,
                                      Array.prototype.slice.call(arguments).concat([])
                                    );
                                  }.bind(this),
                                  allowClear: true,
                                  placeholder: '请输入',
                                },
                              }}
                              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                              __component_name="FormilyInput"
                            />
                          </Col>
                          <Col __component_name="Col">
                            <Space align="center" direction="horizontal" __component_name="Space">
                              <Row wrap={false} justify="space-between" __component_name="Row">
                                <Col style={{ paddingTop: '6px' }} __component_name="Col">
                                  <Typography.Text
                                    style={{ fontSize: '' }}
                                    strong={false}
                                    disabled={false}
                                    ellipsis={true}
                                    __component_name="Typography.Text"
                                  >
                                    共
                                  </Typography.Text>
                                  <Typography.Text
                                    style={{ fontSize: '' }}
                                    strong={false}
                                    disabled={false}
                                    ellipsis={true}
                                    __component_name="Typography.Text"
                                  >
                                    {__$$eval(() => this.state.dataSetFileTotal)}
                                  </Typography.Text>
                                  <Typography.Text
                                    style={{ fontSize: '' }}
                                    strong={false}
                                    disabled={false}
                                    ellipsis={true}
                                    __component_name="Typography.Text"
                                  >
                                    条数据
                                  </Typography.Text>
                                </Col>
                                <Col __component_name="Col">
                                  <Pagination
                                    style={{ textAlign: 'right' }}
                                    total={__$$eval(() => this.state.dataSetFileTotal)}
                                    simple={false}
                                    current={__$$eval(
                                      () => this.state.dataSetFileSearchParams.currentPage
                                    )}
                                    onChange={function () {
                                      return this.onPageChange.apply(
                                        this,
                                        Array.prototype.slice.call(arguments).concat([])
                                      );
                                    }.bind(this)}
                                    pageSize={10}
                                    __component_name="Pagination"
                                  />
                                </Col>
                              </Row>
                            </Space>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Table
                      size="default"
                      style={{ width: '800px' }}
                      rowKey="path"
                      scroll={{ scrollToFirstRowOnChange: true }}
                      columns={[
                        { key: 'name', title: '文件名称', dataIndex: 'path' },
                        { title: '标签', width: 120, dataIndex: 'label' },
                        { key: 'size', title: '文件大小', width: 100, dataIndex: 'size' },
                      ]}
                      loading={__$$eval(() => this.state.fileTableLoading)}
                      bordered={false}
                      dataSource={__$$eval(() => this.state.dataSetFileList)}
                      expandable={{ expandedRowRender: '' }}
                      pagination={false}
                      showHeader={true}
                      rowSelection={{
                        type: 'checkbox',
                        onChange: function () {
                          return this.onSelectFileChange.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this),
                        selectedRowKeys: __$$eval(() => this.state.selectedFileList),
                      }}
                      __component_name="Table"
                    />
                  </Col>
                </Row>
                <Row wrap={true} __component_name="Row">
                  <Col span={19} style={{ marginBottom: '16px' }} __component_name="Col">
                    {!!__$$eval(() => this.state.fileSelectCheckErrorFlag) && (
                      <Typography.Text
                        style={{ color: '#f85a5a', fontSize: '' }}
                        strong={false}
                        disabled={false}
                        ellipsis={true}
                        __component_name="Typography.Text"
                      >
                        请选择文件
                      </Typography.Text>
                    )}
                  </Col>
                </Row>
                <Row wrap={true} __component_name="Row">
                  <Col span={12} __component_name="Col">
                    <FormilySelect
                      fieldProps={{
                        enum: null,
                        name: 'post_data_set_name',
                        title: '处理后数据集',
                        required: false,
                        'x-validator': [],
                        _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                      }}
                      componentProps={{
                        'x-component-props': {
                          disabled: true,
                          allowClear: false,
                          placeholder: '请选择数据集',
                          _sdkSwrGetFunc: { func: __$$eval(() => this.state.dataSetDataList) },
                        },
                      }}
                      decoratorProps={{
                        'x-decorator-props': { asterisk: true, labelCol: 6, labelEllipsis: true },
                      }}
                      __component_name="FormilySelect"
                    />
                  </Col>
                  <Col span={12} __component_name="Col">
                    <FormilySelect
                      fieldProps={{ name: 'post_data_set_version', title: '', 'x-validator': [] }}
                      componentProps={{
                        'x-component-props': {
                          disabled: true,
                          allowClear: false,
                          placeholder: '请选择数据集版本',
                          _sdkSwrGetFunc: {},
                        },
                      }}
                      decoratorProps={{
                        'x-decorator-props': { wrapperWidth: '75%', labelEllipsis: true },
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
            style={{ marginLeft: '0px', marginRight: '0px', backgroundColor: '#ffffff' }}
            __component_name="Row"
          >
            <Col
              span={24}
              style={{ marginLeft: '0px', marginRight: '0px' }}
              __component_name="Col"
            />
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
            <Space
              align="center"
              style={{ marginRight: '8px' }}
              direction="horizontal"
              __component_name="Space"
            >
              <Button
                icon=""
                block={false}
                ghost={false}
                shape="default"
                style={{ marginRight: '12px' }}
                danger={false}
                onClick={function () {
                  return this.onBack.apply(this, Array.prototype.slice.call(arguments).concat([]));
                }.bind(this)}
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
                style={{ marginRight: '20px' }}
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
                  return this.onFinish.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
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

const PageWrapper = (props = {}) => {
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
      render={dataProps => <$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />}
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
