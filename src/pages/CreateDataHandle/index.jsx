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
  FormilyNumberPicker,
  Progress,
  Table,
  FormilyInput,
  FormilySelect,
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
      step3Data: {
        QAsplitChecked: true,
        TextSegmentationChecked: false,
        TextSegmentationSegmentationLen: undefined,
        TextSegmentationSegmentationRepeatLen: undefined,
        RemoveInvisibleCharactersChecked: true,
        SpaceHandleChecked: true,
        RemoveGarbledCodeChecked: true,
        ConvertComplexityToSimplicityChecked: true,
        RemoveHtmlIdentifyingChecked: true,
        RemoveEmoteChecked: true,
        CharacterRepeatFilterChecked: true,
        CharacterRepeatFilterRate: 0.5,
        WordRepeatFilterChecked: true,
        WordRepeatFilterRate: 0.5,
        SpecialCharactersRateChecked: true,
        SpecialCharactersRateRate: 0.5,
        PornographicViolenceRateChecked: true,
        PornographicViolenceRateRate: 0.5,
        SimhashOperatorChecked: true,
        SimhashOperatorRate: 5,
        RemoveEmailChecked: true,
        RemoveIPAddress: true,
        RemoveNumber: true,
      },
      step4Data: {},
      currentStep: 0,
      mockDataSet: [
        {
          value: 'file01',
          label: '文件1',
          version: ['1.0', '2.0', '3.0'],
        },
        {
          value: 'file02',
          label: '文件2',
          version: ['11.0', '12.0', '13.0'],
        },
        {
          value: 'file03',
          label: '文件2',
          version: ['21.0', '22.0', '23.0'],
        },
      ],
      stepForm1Ref: undefined,
      stepForm2Ref: undefined,
      step2FormData: {},
      stepForm1Data: {},
      numberInputStep: 0.1,
      afterTreatmentData: [
        {
          type: '移除不可见字符',
          before: '计量水表安装在住宅的公共部位，供水企业抄表到户，按户计量收费。',
          after: '计量水表安装在住宅的公共部位，供水企业抄表到户，按户计量收费。',
        },
        {
          type: '空格处理',
          before: '全然不知对方身份，不断反转的剧情即将揭开层层真相。',
          after: '全然不知对方身份，不断反转的剧情即将揭开层层真相。',
        },
        {
          type: '去除乱 码',
          before: '原告孟庆连诉被告李成超凭样品买卖   合同纠纷一案，本院于2015年8月10日受理',
          after: '原告孟庆连诉被告李成超凭样品买卖合同纠纷一案，本院于2015年8月10日受理',
        },
        {
          type: '繁转简',
          before: '風暴帶來的暫停使消防員和其他緊急反應人員得以進入禁區進行結構破壞評估。',
          after: '风暴带来的暂停使消防员和其他紧急反应人员得以进入禁区进行结构破坏评估。',
        },
        {
          type: '去除网页标识符',
          before: "<div class='center'><span class='bolded'>朗播 SAT 学员成绩单分析报告",
          after: '朗播 SAT 学员成绩单分析报告',
        },
        {
          type: '去除表情',
          before: '🐰兔子👩女孩👩女孩🐰🧑🏼男孩',
          after: '兔子女孩女孩男孩',
        },
      ],
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

  onNext() {
    if (this.state.currentStep === 0) {
      this.getStep1Data();
    } else if (this.state.currentStep === 1) {
      this.getStep2Data();
      // this.onNextStep()
    } else if (this.state.currentStep === 2) {
      this.onNextStep();
    } else {
      this.onNextStep();
    }
  }

  onFinish() {
    this.utils.notification.success({
      message: '成功',
    });
    this.history.push('/data-handle');
  }

  onNextStep() {
    const step = this.state.currentStep + 1;
    this.setState({
      currentStep: step,
    });
  }

  onPrevious() {
    const step = this.state.currentStep - 1;
    this.setState({
      currentStep: step,
    });
  }

  getStep1Data() {
    this.stepForm1Ref.validate().then(res => {
      this.stepForm1Data = res;
      this.onNextStep();
    });
  }

  getStep2Data() {
    if (!this.stepForm2Ref) {
      this.stepForm2Ref = this.form('createDataHandleStep2');
    }
    this.stepForm2Ref.validate().then(res => {
      this.step2FormData = res;
      this.onNextStep();
    });
  }

  onDataSetChange(v) {
    this.stepForm2Ref = this.form('createDataHandleStep2');
    this.stepForm2Ref.setValues({
      dataset_version: undefined,
    });
    const obj = this.state.mockDataSet.find(item => item.value === v);
    const genOptionList = obj.version.map(item => ({
      label: item,
      value: item,
    }));
    this.stepForm2Ref.setFieldState('dataset_version', {
      dataSource: genOptionList,
    });
  }

  updateStep3State(value, event, extraParams = {}) {
    const fieldName = {
      ...event,
      ...extraParams,
    }.fieldName;
    const step3 = {
      ...this.state.step3Data,
      [fieldName]: value,
      ...(fieldName === 'QAsplitChecked'
        ? {
            TextSegmentationChecked: !this.state.step3Data.TextSegmentationChecked,
          }
        : {}),
      ...(fieldName === 'TextSegmentationChecked'
        ? {
            QAsplitChecked: !this.state.step3Data.QAsplitChecked,
          }
        : {}),
    };
    this.setState({
      step3Data: step3,
    });
  }

  componentDidMount() {
    this.stepForm1Ref = this.form('createDataHandleStep1');
    console.log('did mount');
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
                { title: '处理预览' },
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
            {!!__$$eval(() => this.state.currentStep === 2) && (
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
                        style={{ width: '270px', height: '142px' }}
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
                                  根据文件中的文章与图表标题，自动将文件做 QA 拆分处理。
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
                                      disabled={false}
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
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row wrap={true} style={{ marginTop: '8px' }} __component_name="Row">
                          <Col span={17} style={{}} __component_name="Col">
                            <FormilyForm
                              ref={this._refsManager.linkRef('formily_xv445n80qw')}
                              formHelper={{ style: { textAlign: 'right' }, autoFocus: true }}
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
                                  style={{ fontSize: '' }}
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
                                  style={{ fontSize: '' }}
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
                                      disabled={false}
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
                                      disabled={false}
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
                                      disabled={false}
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
                                      disabled={false}
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
                                      disabled={false}
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
                                      disabled={false}
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
                                      disabled={false}
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
                                      disabled={false}
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
                                      disabled={false}
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
                                      disabled={false}
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
                                      disabled={false}
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
                数据处理预览
              </Typography.Text>
            </Col>
            <Col span={24} __component_name="Col">
              <Table
                size="middle"
                rowKey="id"
                scroll={{ scrollToFirstRowOnChange: true }}
                columns={[
                  { key: 'name', title: '配置内容', dataIndex: 'type' },
                  { key: 'age', title: '处理前', dataIndex: 'before' },
                  { title: '处理后', dataIndex: 'after' },
                ]}
                dataSource={__$$eval(() => this.state.afterTreatmentData)}
                pagination={{
                  size: 'default',
                  simple: false,
                  showQuickJumper: false,
                  showSizeChanger: false,
                }}
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
                createFormProps={{ values: __$$eval(() => this.state.step1Form) }}
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
                        name: 'task_name',
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
                <Row wrap={true} __component_name="Row">
                  <Col span={12} __component_name="Col">
                    <FormilySelect
                      style={{}}
                      fieldProps={{
                        enum: __$$eval(() => this.state.mockDataSet),
                        name: 'dataset_name',
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
                          placeholder: this.i18n('i18n-387znqzg') /* 请选择数据集 */,
                          _sdkSwrGetFunc: {},
                        },
                      }}
                      decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                      __component_name="FormilySelect"
                    />
                  </Col>
                  <Col span={12} __component_name="Col">
                    <FormilySelect
                      fieldProps={{
                        enum: null,
                        name: 'dataset_version',
                        title: '',
                        required: true,
                        'x-validator': [],
                        _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                      }}
                      componentProps={{
                        'x-component-props': {
                          disabled: false,
                          allowClear: false,
                          placeholder: '请选择数据集版本',
                          _sdkSwrGetFunc: {},
                          _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ObjectSetter',
                        },
                      }}
                      decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                      __component_name="FormilySelect"
                    />
                  </Col>
                </Row>
                <Row wrap={true} __component_name="Row">
                  <Col span={24} __component_name="Col">
                    <FormilyFormItem
                      fieldProps={{
                        name: 'FormilyFormItem',
                        title: '选择文件',
                        'x-component': 'FormilyFormItem',
                        'x-validator': [],
                      }}
                      decoratorProps={{
                        'x-decorator-props': { asterisk: true, labelCol: 2, labelEllipsis: true },
                      }}
                      __component_name="FormilyFormItem"
                    >
                      <Row wrap={true} __component_name="Row">
                        <Col
                          span={24}
                          style={{
                            paddingTop: '24px',
                            borderColor: '#9b9b9b',
                            borderStyle: 'dashed',
                            borderWidth: '1px',
                            marginBottom: '16px',
                            paddingBottom: '24px',
                          }}
                          __component_name="Col"
                        >
                          <Row wrap={true} __component_name="Row">
                            <Col span={24} __component_name="Col">
                              <FormilyInput
                                style={{ width: '400px' }}
                                fieldProps={{ name: 'Input', title: '', 'x-validator': [] }}
                                componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
                                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                                __component_name="FormilyInput"
                              />
                            </Col>
                          </Row>
                          <Table
                            size="default"
                            style={{ width: '500px' }}
                            rowKey="id"
                            scroll={{ scrollToFirstRowOnChange: true }}
                            columns={[
                              {
                                key: 'name',
                                title: '文件名称',
                                render: (text, record, index) =>
                                  (__$$context => (
                                    <Row wrap={true} __component_name="Row">
                                      <Col span={24} __component_name="Col">
                                        <Typography.Text
                                          style={{ fontSize: '' }}
                                          strong={false}
                                          disabled={false}
                                          ellipsis={true}
                                          __component_name="Typography.Text"
                                        >
                                          text
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  ))(__$$createChildContext(__$$context, { text, record, index })),
                                dataIndex: 'name',
                              },
                              { key: 'age', title: '文件大小', dataIndex: 'size' },
                            ]}
                            bordered={false}
                            dataSource={[
                              { id: '1', name: '胡彦斌', size: '50G' },
                              { id: '2', name: '王一博', size: '100 G' },
                            ]}
                            pagination={false}
                            showHeader={true}
                            rowSelection={{ type: 'checkbox' }}
                            __component_name="Table"
                          />
                        </Col>
                      </Row>
                    </FormilyFormItem>
                  </Col>
                </Row>
                <Row wrap={true} __component_name="Row">
                  <Col span={12} __component_name="Col">
                    <FormilySelect
                      fieldProps={{
                        enum: __$$eval(() => this.state.mockDataSet),
                        name: 'dataset_after_name',
                        title: '处理后数据集',
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
                          placeholder: this.i18n('i18n-387znqzg') /* 请选择数据集 */,
                          _sdkSwrGetFunc: {},
                        },
                      }}
                      decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                      __component_name="FormilySelect"
                    />
                  </Col>
                  <Col span={12} __component_name="Col">
                    <FormilySelect
                      fieldProps={{
                        enum: null,
                        name: 'dataset_version',
                        title: '',
                        required: true,
                        'x-validator': [],
                        _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                      }}
                      componentProps={{
                        'x-component-props': {
                          disabled: false,
                          allowClear: false,
                          placeholder: '请选择数据集版本',
                          _sdkSwrGetFunc: {},
                          _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ObjectSetter',
                        },
                      }}
                      decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                      __component_name="FormilySelect"
                    />
                  </Col>
                </Row>
                <Row wrap={true} justify="end" __component_name="Row">
                  <Col span={12} __component_name="Col">
                    <Pagination
                      style={{ textAlign: 'right' }}
                      total={50}
                      simple={false}
                      current={1}
                      pageSize={10}
                      __component_name="Pagination"
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

const PageWrapper = () => {
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
      render={dataProps => <$$Page {...dataProps} self={self} appHelper={appHelper} />}
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
