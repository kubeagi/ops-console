// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  Row,
  Col,
  Typography,
  Slider,
  FormilyForm,
  FormilyNumberPicker,
  FormilyTextArea,
  Space,
  Button,
  Steps,
  Divider,
  Card,
  Switch,
  Progress,
  FormilySelect,
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
      afterTreatmentData: [
        {
          _type: 'qa_split',
          type: 'QA拆分',
          before:
            ' 为了保证知识库问答质量，需要对文档做 QA 拆分，QA 拆分时需要选择对应的模型服务。',
          after: `Q：为什么要做 QA 拆分？<br />A：为了保证知识库问答质量。<br />Q：QA 拆分需要注意什么？<br /> A：QA 拆分时需要选择对应的模型服务。`,
        },
        {
          _type: 'remove_invisible_characters',
          type: '移除不可见字符',
          before:
            ' 这是一段不可见字符<span style="background-color:rgba(250, 205, 145, 0.4);">%EF%BF%BD%EF%BF%BD%EF%BF%BD</span>，移除之后并不影响文章内容。',
          after: '这是一段不可见字符，移除之后并不影响文章内容。',
        },
        {
          _type: 'space_standardization',
          type: '空格处理',
          before:
            '这段文字<span style="background-color:rgba(250, 205, 145, 0.4);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>中有<span style="background-color:rgba(250, 205, 145, 0.4);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>很多<span style="background-color:rgba(250, 205, 145, 0.4);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>空格。<span style="background-color:rgba(250, 205, 145, 0.4);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>',
          after: '这段文字中有很多空格。',
        },
        {
          _type: 'remove_garbled_text',
          type: '去除乱码',
          before:
            '%E8%BF%99%E6%AE%B5%E6%96%87%E5%AD%97%E4%B8%AD%E6%9C%89%E5%BE%88%E5%A4%9A%E4%B9%B1%E7%A0%81%EF%BC%8C%3Cspan%20style%3D%22background-color%3Argba(250%2C%20205%2C%20145%2C%200.4)%3B%22%3E%20%20%20%C3%A7%E2%80%9D%C2%B1%C3%A6%C5%93%CB%86%C3%A8%C2%A6%20%C3%A5%C2%A5%C2%BD%C3%A5%C2%A5%C2%BD%C3%A5%C2%AD%C2%A6%C3%A4%C2%B9%20%C3%A5%C2%A4%C2%A9%C3%A5%C2%A4%C2%A9%C3%A5%20%E2%80%98%C3%A4%C2%B8%C5%A0%20%3C%2Fspan%3E%E8%BF%99%E4%BA%9B%E4%B9%B1%E7%A0%81%E6%B2%A1%E6%9C%89%E4%BB%BB%E4%BD%95%E6%84%8F%E4%B9%89%E3%80%82',
          after: '这段文字中有很多乱码，这些乱码没有任何意义。',
        },
        {
          _type: 'traditional_to_simplified',
          type: '繁转简',
          before:
            '新的<span style="background-color:rgba(250, 205, 145, 0.4);">風</span>暴已<span style="background-color:rgba(250, 205, 145, 0.4);">經</span>出<span style="background-color:rgba(250, 205, 145, 0.4);">現</span>，怎<span style="background-color:rgba(250, 205, 145, 0.4);">麽</span>能<span style="background-color:rgba(250, 205, 145, 0.4);">夠</span>停<span style="background-color:rgba(250, 205, 145, 0.4);">滯</span>不前。',
          after: '新的风暴已经出现，怎么能够停滞不前。',
        },
        {
          _type: 'remove_html_tag',
          type: '去除网页标识符',
          before:
            '<span style="background-color:rgba(250, 205, 145, 0.4);">&ltdiv class="bolded"&gt&lt/div&gt</span>这是一段网页标识符',
          after: '这是一段网页标识符',
        },
        {
          _type: 'remove_emojis',
          type: '去除表情',
          before:
            '<span style="background-color:rgba(250, 205, 145, 0.4);">🐰</span>兔子<span style="background-color:rgba(250, 205, 145, 0.4);">👩</span>女孩<span style="background-color:rgba(250, 205, 145, 0.4);">👩</span>女孩<span style="background-color:rgba(250, 205, 145, 0.4);">🐰🧑🏼</span>男孩',
          after: '兔子女孩女孩男孩',
        },
        {
          _type: 'remove_email',
          type: '去除邮箱',
          before:
            '这个文档中的 Email 信息将会被去除，如：<span style="background-color:rgba(250, 205, 145, 0.4);">example@gmail.com</span>',
          after: '这个文档中的 IPv4 或 IPv6 地址信息将会被去除，如：',
        },
        {
          _type: 'remove_ip_address',
          type: '去除IP地址',
          before:
            '这个文档中的 IPv4 或 IPv6 地址信息将会被去除，如：<span style="background-color:rgba(250, 205, 145, 0.4);">192.168.0.1</span>',
          after: '这个文档中的 IPv4 或 IPv6 地址信息将会被去除，如：',
        },
        {
          _type: 'remove_number',
          type: '去除数字',
          before: `这个文档中的电话、身份证号、银行卡号等信息将会被去除，如：手机号
          <span style="background-color:rgba(250, 205, 145, 0.4);">12345678910</span>,
          身份证号<span style="background-color:rgba(250, 205, 145, 0.4);">11020319850801342x</span>,
          银行卡号<span style="background-color:rgba(250, 205, 145, 0.4);">1234 0982 1234 9876
</span>`,
          after:
            '这个文档中的电话、身份证号、银行卡号等信息将会被去除，如：手机号 ，身份证号，银行卡号',
        },
      ],
      cacheqaSplitHighConfig: {},
      configEnableMap: {},
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
        remove_ip_address: 'RemoveIPAddressChecked',
        remove_number: 'RemoveNumberChecked',
        character_duplication_rate: 'CharacterRepeatFilterChecked',
        word_duplication_rate: 'WordRepeatFilterChecked',
        special_character_rate: 'SpecialCharactersRateChecked',
        pornography_violence_word_rate: 'PornographicViolenceRateChecked',
      },
      configVisible: false,
      currentStep: 0,
      dataSetDataList: [],
      dataSetFileList: [],
      dataSetFileSearchParams: {
        keyword: '',
        currentPage: 1,
      },
      dataSetFileTotal: '0',
      fileSelectCheckErrorFlag: false,
      fileTableLoading: false,
      llmList: [],
      max_token_marks: {
        10: '10',
        4096: '4096',
      },
      numberInputStep: 0.1,
      qaSplitHighConfig: {
        temperature: 40,
        max_tokens: 512,
        prompt_template: `{text}

请将上述内容按照问答的方式，提出不超过 25 个问题，并给出每个问题的答案，每个问题必须有 Q 和对应的 A，并严格按照以下方式展示： Q1: 问题。\n A1: 答案。\n Q2: 问题 \n A2: 答案\n  注意，尽可能多的提出问题，但是 Q 不要重复，也不要出现只有 Q 没有 A 的情况。`,
      },
      selectedFileList: [],
      showLlmModel: false,
      step1FormData: {},
      step2FormData: {},
      step3Data: {
        QAsplitChecked: true,
        QAsplitForm: {
          type: undefined,
          model: undefined,
        },
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
        RemoveIPAddressChecked: false,
        RemoveNumberChecked: false,
      },
      step4Data: [],
      temperature_marks: {
        0: '精确',
        100: '随机',
      },
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

  backToStep3Form() {
    if (this.state.step3Data.QAsplitChecked) {
      const { type, model } = this.state.step3Data.QAsplitForm;
      this.form('qa_split').setValues({
        type,
        model,
      });
    }
  }

  convertStep3Data() {
    const list = [];
    const step3Data = this.state.step3Data;
    const vTk = this.valToKey(this.state.configMap);
    for (let k in step3Data) {
      if (k.endsWith('Checked')) {
        const extra =
          k === 'QAsplitChecked' && step3Data.QAsplitChecked
            ? {
                llm_config: {
                  name: this.state.step3Data.QAsplitForm.type,
                  namespace: this.state.llmList.find(
                    item => item.value === this.state.step3Data.QAsplitForm.type
                  ).namespace,
                  model:
                    this.state.llmList.find(
                      item => item.value === this.state.step3Data.QAsplitForm.type
                    ).provider === 'worker'
                      ? this.state.llmList.find(
                          item => item.value === this.state.step3Data.QAsplitForm.type
                        )._models[0]
                      : this.state.step3Data.QAsplitForm.model,
                  ...this.state.qaSplitHighConfig,
                  temperature: this.state.qaSplitHighConfig.temperature / 100,
                },
              }
            : {};
        if (step3Data[k]) {
          list.push({
            type: vTk[k],
            ...extra,
          });
        }
      }
    }
    return list;
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

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  async getDataSet() {
    const res = await this.utils.bff.listDatasets({
      input: {
        namespace: this.utils.getAuthData().project,
        pageSize: 9999,
        page: 1,
      },
      versionsInput: {
        namespace: this.utils.getAuthData().project,
        pageSize: 9999,
        page: 1,
      },
      filesInput: {
        keyword: this.state.dataSetFileSearchParams.keyword,
        pageSize: 10,
        page: this.state.dataSetFileSearchParams.currentPage,
      },
    });
    const datasetlist = res.Dataset.listDatasets.nodes.map(item => {
      const versions = item.versions.nodes.map(i => ({
        label: i.version,
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

  getListWorkers() {
    const namespace = this.utils.getAuthData().project || 'system-tce';
    const input = {
      pageSize: 9999,
      page: 1,
      namespace,
    };
    this.utils.bff
      ?.listLLMs({
        input,
      })
      .then(res => {
        const nodes = res.LLM.listLLMs?.nodes || [];
        const _list = nodes.map(item => {
          return {
            models: item.models?.map(i => ({
              label: i,
              value: i,
            })),
            _models: item.models,
            label: this.utils.getFullName(item),
            value: item.name,
            provider: item.provider,
            baseUrl: item.baseUrl,
            namespace: item.namespace,
          };
        });
        this.setState({
          llmList: _list,
        });
        this.form('qa_split').setFieldState('type', {
          dataSource: _list,
        });
      })
      .catch(err => [
        this.utils.notification.warn({
          message: '获取模型服务失败',
          errors: err?.response?.errors,
        }),
      ]);
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

  getStep3FormData() {
    const promiseList = [];
    // 如果选择了QA拆分
    if (this.state.step3Data.QAsplitChecked) {
      const qaPromise = this.form('qa_split')
        ?.validate()
        .then(res => {
          const values = this.form('qa_split').values;
          this.setState({
            step3Data: {
              ...this.state.step3Data,
              QAsplitForm: {
                ...values,
              },
            },
          });
        });
      promiseList.push(qaPromise);
    }
    Promise.all(promiseList).then(() => {
      this.onNextStep();
    });
  }

  getStep4TableData() {
    const list = this.convertStep3Data();
    const result = [];
    list.forEach(item => {
      const cur = this.state.afterTreatmentData.find(ele => ele._type === item.type);
      if (cur) {
        result.push(cur);
      }
    });
    return result;
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

  getVersionName(dataset, version) {
    if (dataset && version) {
      const datasetObj = this.state.dataSetDataList.find(i => i.value === dataset);
      const versionObj = datasetObj.versions.find(i => i.value === version);
      return versionObj.name;
    }
    return;
  }

  onBack(event) {
    // 点击按钮时的回调
    this.history.push('/data-handle');
  }

  onCloseConfigModal() {
    this.setState({
      configVisible: false,
      qaSplitHighConfig: {
        ...this.state.cacheqaSplitHighConfig,
      },
    });
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

  onDataSetVersionChange(v) {
    this.form('createDataHandleStep2').setValues({
      post_data_set_version: v,
    });
    const { pre_data_set_name } = this.form('createDataHandleStep2').values;
    const name = this.getVersionName(pre_data_set_name, v);
    this.getTableList(name);
  }

  onFinish() {
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
      namespace: this.utils.getAuthData().project,
      creator: this.utils.getAuthData().user?.name,
    };
    this.utils.bff
      .createDataProcessTask({
        input: {
          ...data,
        },
      })
      .then(res => {
        if (res.dataProcess.createDataProcessTask.status === 200) {
          this.utils.notification.success({
            message: '创建成功',
          });
          this.history.push('/data-handle');
        } else {
          this.utils.notification.warn({
            message: res.dataProcess?.createDataProcessTask?.message || '失败',
          });
        }
      })
      .catch(err => [
        this.utils.notification.warn({
          message: '创建数据处理失败',
          errors: err?.response?.errors,
        }),
      ]);
  }

  onLLmChange(value) {
    if (value) {
      const cur = this.state.llmList.find(i => i.value === value);

      // 如果是自己的模型服务，不需要传model
      if (cur.provider === 'worker') {
        if (this.form('qa_split').fields?.model?.required) {
          this.form('qa_split').fields.model.required = false;
        }
        this.setState({
          showLlmModel: false,
        });
      } else {
        if (this.form('qa_split').fields?.model?.required) {
          this.form('qa_split').fields.model.required = true;
        }
        this.form('qa_split').setValues({
          model: undefined,
        });
        this.setState(
          {
            showLlmModel: true,
          },
          () => {
            this.form('qa_split').setFieldState('model', {
              dataSource: cur.models,
            });
          }
        );
      }
    }
  }

  async onNext() {
    if (this.state.currentStep === 0) {
      this.getStep1Data();
    } else if (this.state.currentStep === 1) {
      this.getStep2Data();
    } else if (this.state.currentStep === 2) {
      this.getStep3FormData();
    } else {
      this.onNextStep();
    }
  }

  onNextStep() {
    // step2 文件检查
    if (this.state.currentStep === 1) {
      if (!this.state.selectedFileList.length) {
        this.setState({
          fileSelectCheckErrorFlag: true,
        });
        // 调试需要关闭此
        return;
      }
    }
    if (this.state.currentStep === 2) {
      // 判断是否选了处理的选项。不选不行
      const list = this.convertStep3Data();
      if (!list.length) {
        this.utils.notification.warn({
          message: '请选择处理配置',
        });
        return;
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
          this.backToStep3Form();
          this.getListWorkers();
        }
        if (this.state.currentStep === 3) {
          const list = this.getStep4TableData();
          this.setState({
            step4Data: list,
          });
        }
      }
    );
  }

  onOpenConfigModal() {
    this.setState({
      configVisible: true,
      cacheqaSplitHighConfig: {
        ...this.state.qaSplitHighConfig,
      },
    });
    this.form('temperature_form')?.setValues({
      temperature: this.state.qaSplitHighConfig.temperature / 100,
    });
    this.form('max_tokens_form')?.setValues({
      max_tokens: this.state.qaSplitHighConfig.max_tokens,
    });
    this.form('prompt_template_form')?.setValues({
      prompt_template: this.state.qaSplitHighConfig.prompt_template,
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
        } else if (this.state.currentStep === 2) {
          this.backToStep3Form();
          this.getListWorkers();
        }
      }
    );
  }

  onSearch(event) {
    this.debouncedFunction(event);
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

  onSubmitHighConfig() {
    this.setState({
      configVisible: false,
      cacheqaSplitHighConfig: {
        ...this.state.qaSplitHighConfig,
      },
    });
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

  setQaSplitHighConfigValue(_value, event, extraParams = {}) {
    const fieldName = {
      ...event,
      ...extraParams,
    }.fieldName;
    const times = {
      ...event,
      ...extraParams,
    }.times;
    const value = fieldName === 'prompt_template' ? _value.target.value : _value;
    const qaSplitHighConfig = {
      ...this.state.qaSplitHighConfig,
      [fieldName]: times ? value * times : value,
    };
    this.setState({
      qaSplitHighConfig,
    });
    if (fieldName === 'temperature') {
      this.form('temperature_form').setValues({
        temperature: qaSplitHighConfig.temperature / 100,
      });
    } else if (fieldName === 'max_tokens') {
      this.form('max_tokens_form').setValues({
        max_tokens: value,
      });
    }
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

  valToKey(obj) {
    const _obj = {};
    for (let key in obj) {
      _obj[obj[key]] = key;
    }
    return _obj;
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
        <Modal
          __component_name="Modal"
          centered={false}
          confirmLoading={false}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.onCloseConfigModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.onSubmitHighConfig.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.configVisible)}
          title="模型高级配置"
          width="700px"
        >
          <Row __component_name="Row" wrap={false}>
            <Col
              __component_name="Col"
              flex="120px"
              style={{ paddingLeft: '20px', paddingTop: '8px' }}
            >
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{}}
              >
                温度
              </Typography.Text>
            </Col>
            <Col __component_name="Col" flex="auto">
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={18}>
                  <Slider
                    __component_name="Slider"
                    marks={__$$eval(() => this.state.temperature_marks)}
                    max={100}
                    min={0}
                    onChange={function () {
                      return this.setQaSplitHighConfigValue.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([
                          {
                            fieldName: 'temperature',
                          },
                        ])
                      );
                    }.bind(this)}
                    value={__$$eval(() => this.state.qaSplitHighConfig.temperature)}
                  />
                </Col>
                <Col __component_name="Col" span={6}>
                  <FormilyForm
                    __component_name="FormilyForm"
                    componentProps={{
                      colon: false,
                      labelAlign: 'left',
                      labelCol: 4,
                      layout: 'horizontal',
                      wrapperCol: 20,
                    }}
                    formHelper={{ autoFocus: true }}
                    ref={this._refsManager.linkRef('temperature_form')}
                  >
                    <FormilyNumberPicker
                      __component_name="FormilyNumberPicker"
                      componentProps={{
                        'x-component-props': {
                          max: 1,
                          min: 0,
                          onChange: function () {
                            return this.setQaSplitHighConfigValue.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([
                                {
                                  fieldName: 'temperature',
                                  times: 100,
                                },
                              ])
                            );
                          }.bind(this),
                          placeholder: '请输入',
                          step: __$$eval(() => 1 / 100),
                        },
                      }}
                      decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                      fieldProps={{
                        _unsafe_MixedSetter_default_select: 'VariableSetter',
                        default: __$$eval(() => this.state.qaSplitHighConfig.temperature / 100),
                        name: 'temperature',
                        title: '',
                        'x-validator': [],
                      }}
                    />
                  </FormilyForm>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row __component_name="Row" wrap={false}>
            <Col
              __component_name="Col"
              flex="120px"
              style={{ paddingLeft: '20px', paddingTop: '8px' }}
            >
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: '' }}
              >
                最大响应长度
              </Typography.Text>
            </Col>
            <Col __component_name="Col" flex="auto">
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={18}>
                  <Slider
                    __component_name="Slider"
                    marks={__$$eval(() => this.state.max_token_marks)}
                    max={4096}
                    min={10}
                    onChange={function () {
                      return this.setQaSplitHighConfigValue.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([
                          {
                            fieldName: 'max_tokens',
                          },
                        ])
                      );
                    }.bind(this)}
                    value={__$$eval(() => this.state.qaSplitHighConfig.max_tokens)}
                  />
                </Col>
                <Col __component_name="Col" span={6}>
                  <FormilyForm
                    __component_name="FormilyForm"
                    componentProps={{
                      colon: false,
                      labelAlign: 'left',
                      labelCol: 4,
                      layout: 'horizontal',
                      wrapperCol: 20,
                    }}
                    formHelper={{ autoFocus: true }}
                    ref={this._refsManager.linkRef('max_tokens_form')}
                  >
                    <FormilyNumberPicker
                      __component_name="FormilyNumberPicker"
                      componentProps={{
                        'x-component-props': {
                          max: 4096,
                          min: 10,
                          onChange: function () {
                            return this.setQaSplitHighConfigValue.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([
                                {
                                  fieldName: 'max_tokens',
                                },
                              ])
                            );
                          }.bind(this),
                          placeholder: '请输入',
                        },
                      }}
                      decoratorProps={{
                        'x-decorator-props': {
                          labelCol: 0,
                          labelEllipsis: true,
                          labelWidth: '0px',
                        },
                      }}
                      fieldProps={{
                        _unsafe_MixedSetter_default_select: 'VariableSetter',
                        default: __$$eval(() => this.state.qaSplitHighConfig.max_tokens),
                        name: 'max_tokens',
                        title: '',
                        'x-validator': [],
                      }}
                    />
                  </FormilyForm>
                </Col>
              </Row>
            </Col>
          </Row>
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 5,
              layout: 'horizontal',
              wrapperCol: 19,
            }}
            formHelper={{ autoFocus: true }}
            ref={this._refsManager.linkRef('prompt_template_form')}
          >
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                'x-component-props': {
                  onChange: function () {
                    return this.setQaSplitHighConfigValue.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([
                        {
                          fieldName: 'prompt_template',
                        },
                      ])
                    );
                  }.bind(this),
                  placeholder: '请输入',
                  rows: 15,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true, labelWidth: '120px' } }}
              fieldProps={{
                _unsafe_MixedSetter_default_select: 'VariableSetter',
                default: __$$eval(() => this.state.qaSplitHighConfig.prompt_template),
                name: 'prompt_template',
                title: 'QA 拆分 Prompt',
                'x-component': 'Input.TextArea',
                'x-validator': [],
              }}
            />
          </FormilyForm>
        </Modal>
        <Row __component_name="Row" style={{ marginBottom: '16px' }} wrap={true}>
          <Col __component_name="Col" span={24}>
            <Space __component_name="Space" align="center" direction="horizontal">
              <Button.Back __component_name="Button.Back" title="" type="primary" />
            </Space>
            <Typography.Title
              __component_name="Typography.Title"
              bold={true}
              bordered={false}
              ellipsis={true}
              level={2}
            >
              创建任务
            </Typography.Title>
          </Col>
        </Row>
        <Row
          __component_name="Row"
          align="top"
          gutter={['', '']}
          style={{
            backgroundColor: '#ffffff',
            paddingBottom: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '24px',
          }}
          wrap={true}
        >
          <Col __component_name="Col" span={24} style={{ backgroundColor: '#ffffff' }}>
            <Steps
              __component_name="Steps"
              current={__$$eval(() => this.state.currentStep)}
              items={[
                { title: '基本信息' },
                { title: '选择文件' },
                { title: '数据处理配置' },
                { title: '处理样例' },
              ]}
              style={{
                alignItems: 'center',
                display: 'flex',
                marginTop: '16px',
                paddingBottom: '24px',
                paddingTop: '24px',
              }}
            />
            {!!__$$eval(() => this.state.currentStep === 2) && (
              <Row __component_name="Row" wrap={true}>
                <Col __component_name="Col" span={24}>
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={false}
                    strong={false}
                    style={{ fontSize: '13px' }}
                    type="colorTextSecondary"
                  >
                    配置的展示顺序即为任务的执行顺序，如果选择多个配置，数据处理任务将会按照以下配置顺序执行。如：同时选择异常清洗配置、数据过滤配置、拆分处理，在执行数据处理任务时，将会优先执
                    行异常清洗，再执行数据过滤，最后执行拆分处理。
                  </Typography.Text>
                </Col>
              </Row>
            )}
            {!!__$$eval(() => this.state.currentStep === 2) && (
              <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                <Col
                  __component_name="Col"
                  span={24}
                  style={{ paddingBottom: '0px', paddingTop: '0px' }}
                >
                  <Divider
                    __component_name="Divider"
                    dashed={true}
                    defaultOpen={false}
                    mode="default"
                    orientation="left"
                    orientationMargin={0}
                    style={{ fontWeight: 700 }}
                  >
                    异常清洗配置
                  </Divider>
                </Col>
                <Col __component_name="Col" span={24}>
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        hoverable={true}
                        loading={false}
                        size="default"
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          移除不可见字符
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.RemoveInvisibleCharactersChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={false}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Typography.Paragraph
                                  code={false}
                                  delete={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  mark={false}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                  type="secondary"
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
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        hoverable={true}
                        loading={false}
                        size="default"
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          空格处理
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.SpaceHandleChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={false}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Typography.Paragraph
                                  code={false}
                                  delete={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  mark={false}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                  type="secondary"
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
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        hoverable={false}
                        loading={false}
                        size="default"
                        style={{ height: '118px' }}
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          去除乱码
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.RemoveGarbledCodeChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={false}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Typography.Paragraph
                                  code={false}
                                  delete={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={true}
                                  mark={false}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                  type="secondary"
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
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        hoverable={false}
                        loading={false}
                        size="default"
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          繁转简
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () =>
                                          this.state.step3Data.ConvertComplexityToSimplicityChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={false}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Typography.Paragraph
                                  code={false}
                                  delete={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  mark={false}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                  type="secondary"
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
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        hoverable={false}
                        loading={false}
                        size="default"
                        style={{ height: '118px' }}
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          去除网页标识符
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.RemoveHtmlIdentifyingChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={false}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Typography.Paragraph
                                  code={false}
                                  delete={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  mark={false}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                  type="secondary"
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
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        hoverable={false}
                        loading={false}
                        size="default"
                        style={{ height: '118px' }}
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          去除表情
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.RemoveEmoteChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={false}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Typography.Paragraph
                                  code={false}
                                  delete={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={true}
                                  mark={false}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                  type="secondary"
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
              <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                <Col
                  __component_name="Col"
                  span={24}
                  style={{ paddingBottom: '0px', paddingTop: '0px' }}
                >
                  <Divider
                    __component_name="Divider"
                    dashed={true}
                    defaultOpen={false}
                    mode="default"
                    orientation="left"
                    orientationMargin={0}
                    style={{ fontWeight: 700 }}
                  >
                    数据过滤配置
                  </Divider>
                </Col>
                <Col __component_name="Col" span={24}>
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
                        loading={false}
                        size="default"
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          字重复率过滤
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.CharacterRepeatFilterChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={true}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" wrap={true}>
                                  <Col __component_name="Col" span={24}>
                                    <Row
                                      __component_name="Row"
                                      gutter={[0, 0]}
                                      justify="space-between"
                                      style={{ height: '40px' }}
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span={16}>
                                        <Progress
                                          __component_name="Progress"
                                          percent={__$$eval(
                                            () =>
                                              this.state.step3Data.CharacterRepeatFilterRate * 100
                                          )}
                                        />
                                      </Col>
                                      <Col __component_name="Col">
                                        <FormilyForm
                                          __component_name="FormilyForm"
                                          componentProps={{
                                            colon: false,
                                            labelAlign: 'left',
                                            labelCol: 4,
                                            layout: 'horizontal',
                                            wrapperCol: 20,
                                          }}
                                          formHelper={{ autoFocus: false }}
                                          ref={this._refsManager.linkRef('formily_bu33ve7fnv')}
                                        >
                                          <FormilyNumberPicker
                                            __component_name="FormilyNumberPicker"
                                            componentProps={{
                                              'x-component-props': {
                                                max: 1,
                                                min: 0,
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
                                                placeholder: '',
                                                precision: 1,
                                                step: __$$eval(() => this.state.numberInputStep),
                                              },
                                            }}
                                            decoratorProps={{
                                              'x-decorator-props': {
                                                labelEllipsis: true,
                                                size: 'small',
                                              },
                                            }}
                                            fieldProps={{
                                              _unsafe_MixedSetter_default_select: 'VariableSetter',
                                              default: __$$eval(
                                                () => this.state.step3Data.CharacterRepeatFilterRate
                                              ),
                                              name: null,
                                              title: '',
                                              'x-validator': [],
                                            }}
                                            style={{ width: '60px' }}
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
                          delete={false}
                          disabled={false}
                          editable={false}
                          ellipsis={{ rows: 2 }}
                          mark={false}
                          strong={false}
                          style={{ fontSize: '' }}
                          type="secondary"
                          underline={false}
                        >
                          如果字重复率太高，意味着文档中重复的字太多，文档会被过滤掉
                        </Typography.Paragraph>
                      </Card>
                    </Col>
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
                        loading={false}
                        size="default"
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          {' '}
                                          词重复率过滤
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.WordRepeatFilterChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={true}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Row
                                  __component_name="Row"
                                  gutter={[0, 0]}
                                  justify="space-between"
                                  style={{ height: '40px' }}
                                  wrap={false}
                                >
                                  <Col __component_name="Col" span={16}>
                                    <Progress
                                      __component_name="Progress"
                                      percent={__$$eval(
                                        () => this.state.step3Data.WordRepeatFilterRate * 100
                                      )}
                                    />
                                  </Col>
                                  <Col __component_name="Col">
                                    <FormilyForm
                                      __component_name="FormilyForm"
                                      componentProps={{
                                        colon: false,
                                        labelAlign: 'left',
                                        labelCol: 4,
                                        layout: 'horizontal',
                                        wrapperCol: 20,
                                      }}
                                      formHelper={{ autoFocus: false }}
                                      ref={this._refsManager.linkRef('formilyform-h5d0b6o')}
                                    >
                                      <FormilyNumberPicker
                                        __component_name="FormilyNumberPicker"
                                        componentProps={{
                                          'x-component-props': {
                                            max: 1,
                                            min: 0,
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
                                            step: __$$eval(() => this.state.numberInputStep),
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            labelEllipsis: true,
                                            size: 'small',
                                          },
                                        }}
                                        fieldProps={{
                                          _unsafe_MixedSetter_default_select: 'VariableSetter',
                                          default: __$$eval(
                                            () => this.state.step3Data.WordRepeatFilterRate
                                          ),
                                          name: null,
                                          title: '',
                                          'x-validator': [],
                                        }}
                                        style={{ width: '60px' }}
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
                          delete={false}
                          disabled={false}
                          editable={false}
                          ellipsis={{ rows: 2 }}
                          mark={false}
                          strong={false}
                          style={{ fontSize: '' }}
                          type="secondary"
                          underline={false}
                        >
                          如果词重复率太高，意味着文档中重复的词太多，文档会被过滤掉
                        </Typography.Paragraph>
                      </Card>
                    </Col>
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
                        loading={false}
                        size="default"
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          特殊字符串率
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.SpecialCharactersRateChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={true}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Row
                                  __component_name="Row"
                                  gutter={[0, 0]}
                                  justify="space-between"
                                  style={{ height: '40px' }}
                                  wrap={false}
                                >
                                  <Col __component_name="Col" span={17}>
                                    <Progress
                                      __component_name="Progress"
                                      percent={__$$eval(
                                        () => this.state.step3Data.SpecialCharactersRateRate * 100
                                      )}
                                    />
                                  </Col>
                                  <Col __component_name="Col">
                                    <FormilyForm
                                      __component_name="FormilyForm"
                                      componentProps={{
                                        colon: false,
                                        labelAlign: 'left',
                                        labelCol: 4,
                                        layout: 'horizontal',
                                        wrapperCol: 20,
                                      }}
                                      formHelper={{ autoFocus: false }}
                                      ref={this._refsManager.linkRef('formilyform-kwftate')}
                                    >
                                      <FormilyNumberPicker
                                        __component_name="FormilyNumberPicker"
                                        componentProps={{
                                          'x-component-props': {
                                            max: 1,
                                            min: 0,
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
                                            step: __$$eval(() => this.state.numberInputStep),
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            labelEllipsis: true,
                                            size: 'small',
                                          },
                                        }}
                                        fieldProps={{
                                          _unsafe_MixedSetter_default_select: 'VariableSetter',
                                          default: __$$eval(
                                            () => this.state.step3Data.SpecialCharactersRateRate
                                          ),
                                          name: null,
                                          title: '',
                                          'x-validator': [],
                                        }}
                                        style={{ width: '60px' }}
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
                          delete={false}
                          disabled={false}
                          editable={false}
                          ellipsis={{ rows: 2 }}
                          mark={false}
                          strong={false}
                          style={{ fontSize: '' }}
                          type="secondary"
                          underline={false}
                        >
                          如果特殊字符率太高，意味着文档中特殊字符太多，文档会被过滤掉
                        </Typography.Paragraph>
                      </Card>
                    </Col>
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
                        loading={false}
                        size="default"
                        style={{ height: '158px' }}
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          色情暴力词率
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.PornographicViolenceRateChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={true}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Row
                                  __component_name="Row"
                                  gutter={[0, 0]}
                                  justify="space-between"
                                  style={{ height: '40px' }}
                                  wrap={false}
                                >
                                  <Col __component_name="Col" span={17}>
                                    <Progress
                                      __component_name="Progress"
                                      percent={__$$eval(
                                        () =>
                                          this.state.step3Data.PornographicViolenceRateRate * 100
                                      )}
                                    />
                                  </Col>
                                  <Col __component_name="Col">
                                    <FormilyForm
                                      __component_name="FormilyForm"
                                      componentProps={{
                                        colon: false,
                                        labelAlign: 'left',
                                        labelCol: 4,
                                        layout: 'horizontal',
                                        wrapperCol: 20,
                                      }}
                                      formHelper={{ autoFocus: false }}
                                      ref={this._refsManager.linkRef('formilyform-q8tkxw3')}
                                    >
                                      <FormilyNumberPicker
                                        __component_name="FormilyNumberPicker"
                                        componentProps={{
                                          'x-component-props': {
                                            max: 1,
                                            min: 0,
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
                                            step: __$$eval(() => this.state.numberInputStep),
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            labelEllipsis: true,
                                            size: 'small',
                                          },
                                        }}
                                        fieldProps={{
                                          _unsafe_MixedSetter_default_select: 'VariableSetter',
                                          default: __$$eval(
                                            () => this.state.step3Data.PornographicViolenceRateRate
                                          ),
                                          name: null,
                                          title: '',
                                          'x-validator': [],
                                        }}
                                        style={{ width: '60px' }}
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
                          delete={false}
                          disabled={false}
                          editable={false}
                          ellipsis={{ rows: 2 }}
                          mark={false}
                          strong={false}
                          style={{ fontSize: '' }}
                          type="secondary"
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
              <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                <Col
                  __component_name="Col"
                  span={24}
                  style={{ paddingBottom: '0px', paddingTop: '0px' }}
                >
                  <Divider
                    __component_name="Divider"
                    dashed={true}
                    defaultOpen={false}
                    mode="default"
                    orientation="left"
                    orientationMargin={0}
                    style={{ fontWeight: 700 }}
                  >
                    数据去重配置
                  </Divider>
                </Col>
                <Col __component_name="Col" span={24}>
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
                        loading={false}
                        size="default"
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          Simhash
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.SimhashOperatorChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={true}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Row
                                  __component_name="Row"
                                  gutter={[0, 0]}
                                  justify="space-between"
                                  style={{ height: '40px' }}
                                  wrap={false}
                                >
                                  <Col __component_name="Col" span={16}>
                                    <Progress
                                      __component_name="Progress"
                                      percent={__$$eval(() =>
                                        this.state.step3Data.SimhashOperatorRate === 4
                                          ? 0
                                          : this.state.step3Data.SimhashOperatorRate === 5
                                          ? 50
                                          : 100
                                      )}
                                    />
                                  </Col>
                                  <Col __component_name="Col">
                                    <FormilyForm
                                      __component_name="FormilyForm"
                                      componentProps={{
                                        colon: false,
                                        labelAlign: 'left',
                                        labelCol: 4,
                                        layout: 'horizontal',
                                        wrapperCol: 20,
                                      }}
                                      formHelper={{ autoFocus: false }}
                                      ref={this._refsManager.linkRef('formilyform-zjbf6fy')}
                                    >
                                      <FormilyNumberPicker
                                        __component_name="FormilyNumberPicker"
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
                                            labelEllipsis: true,
                                            size: 'small',
                                          },
                                        }}
                                        fieldProps={{
                                          _unsafe_MixedSetter_default_select: 'VariableSetter',
                                          default: __$$eval(
                                            () => this.state.step3Data.SimhashOperatorRate
                                          ),
                                          name: null,
                                          title: '',
                                          'x-validator': [],
                                        }}
                                        style={{ width: '60px' }}
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
                          delete={false}
                          disabled={false}
                          editable={false}
                          ellipsis={{ rows: 2 }}
                          mark={false}
                          strong={false}
                          style={{ fontSize: '' }}
                          type="secondary"
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
              <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                <Col
                  __component_name="Col"
                  span={24}
                  style={{ paddingBottom: '0px', paddingTop: '0px' }}
                >
                  <Divider
                    __component_name="Divider"
                    dashed={true}
                    defaultOpen={false}
                    mode="default"
                    orientation="left"
                    orientationMargin={0}
                    style={{ fontWeight: 700 }}
                  >
                    数据隐私处理
                  </Divider>
                </Col>
                <Col __component_name="Col" span={24}>
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        hoverable={true}
                        loading={false}
                        size="default"
                        style={{ height: '118px' }}
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          去除Email
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.RemoveEmailChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={false}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Typography.Paragraph
                                  code={false}
                                  delete={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={true}
                                  mark={false}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                  type="secondary"
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
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        hoverable={false}
                        loading={false}
                        size="default"
                        style={{ height: '118px' }}
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          去除IP地址
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.RemoveIPAddressChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={false}
                                      loading={false}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'RemoveIPAddressChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Typography.Paragraph
                                  code={false}
                                  delete={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  mark={false}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                  type="secondary"
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
                    <Col __component_name="Col" span={6}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        hoverable={false}
                        loading={false}
                        size="default"
                        style={{ height: '118px' }}
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          去除数字
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.RemoveNumberChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={false}
                                      loading={false}
                                      onChange={function () {
                                        return this.updateStep3State.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([
                                            {
                                              fieldName: 'RemoveNumberChecked',
                                            },
                                          ])
                                        );
                                      }.bind(this)}
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Typography.Paragraph
                                  code={false}
                                  delete={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  mark={false}
                                  strong={false}
                                  style={{ fontSize: '' }}
                                  type="secondary"
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
            {!!__$$eval(
              () => this.state.currentStep === 2 && this.state.step1FormData.file_type !== 'qa'
            ) && (
              <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                <Col __component_name="Col" span={24} style={{ paddingBottom: '0px' }}>
                  <Divider
                    __component_name="Divider"
                    closeIcon=""
                    content=""
                    dashed={true}
                    defaultOpen={false}
                    mode="default"
                    openIcon=""
                    orientation="left"
                    orientationMargin={0}
                    style={{ fontWeight: 700 }}
                  >
                    拆分处理
                  </Divider>
                </Col>
                <Col __component_name="Col" span={24}>
                  <Row __component_name="Row" wrap={true}>
                    <Col __component_name="Col" span={10}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        className="step3_disabled_style"
                        hoverable={false}
                        loading={false}
                        size="default"
                        style={{ height: '200px', minWidth: '400px' }}
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          文本分段
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(
                                        () => this.state.step3Data.TextSegmentationChecked
                                      )}
                                      defaultChecked={false}
                                      disabled={true}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      />
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col
                                __component_name="Col"
                                span={24}
                                style={{ marginBottom: '0px', paddingBottom: '0px' }}
                              >
                                <FormilyForm
                                  __component_name="FormilyForm"
                                  componentProps={{
                                    colon: false,
                                    labelAlign: 'left',
                                    labelCol: 4,
                                    layout: 'horizontal',
                                    wrapperCol: 20,
                                  }}
                                  formHelper={{ autoFocus: true }}
                                  ref={this._refsManager.linkRef('formily_ob8rkd34dcj')}
                                >
                                  {!!false && (
                                    <FormilySelect
                                      __component_name="FormilySelect"
                                      componentProps={{
                                        'x-component-props': {
                                          _sdkSwrGetFunc: {},
                                          allowClear: false,
                                          disabled: false,
                                          placeholder: '请选择模型',
                                        },
                                      }}
                                      decoratorProps={{
                                        'x-decorator-props': {
                                          labelEllipsis: true,
                                          style: { marginBottom: '0px' },
                                          tooltip: '',
                                        },
                                      }}
                                      fieldProps={{ name: 'Select', 'x-validator': [] }}
                                    />
                                  )}
                                </FormilyForm>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      />
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row __component_name="Row" style={{ marginTop: '8px' }} wrap={true}>
                          <Col __component_name="Col" span={17} style={{}}>
                            <FormilyForm
                              __component_name="FormilyForm"
                              componentProps={{
                                colon: true,
                                labelAlign: 'left',
                                labelCol: 4,
                                layout: 'horizontal',
                                size: 'small',
                                wrapperAlign: '',
                                wrapperCol: 20,
                              }}
                              formHelper={{ autoFocus: false, style: { textAlign: 'right' } }}
                              ref={this._refsManager.linkRef('formily_xv445n80qw')}
                            >
                              <FormilyNumberPicker
                                __component_name="FormilyNumberPicker"
                                componentProps={{
                                  'x-component-props': {
                                    addonAfter: '',
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
                                    suffix: '',
                                  },
                                }}
                                decoratorProps={{
                                  'x-decorator-props': {
                                    addonAfter: '',
                                    fullness: false,
                                    inset: false,
                                    labelAlign: 'left',
                                    labelCol: 100,
                                    labelEllipsis: true,
                                    labelWidth: '100',
                                    labelWrap: false,
                                    layout: 'horizontal',
                                    size: 'small',
                                    style: { marginBottom: '0px' },
                                    tooltipLayout: 'text',
                                    wrapperAlign: 'left',
                                    wrapperWidth: '',
                                    wrapperWrap: false,
                                  },
                                }}
                                fieldProps={{
                                  _unsafe_MixedSetter_default_select: 'VariableSetter',
                                  default: __$$eval(
                                    () => this.state.step3Data.TextSegmentationSegmentationLen
                                  ),
                                  name: null,
                                  required: true,
                                  title: '分段长度',
                                  'x-validator': [],
                                }}
                                style={{ marginBottom: '0px', paddingBottom: '0px', width: '80px' }}
                              />
                              <FormilyNumberPicker
                                __component_name="FormilyNumberPicker"
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
                                    addonAfter: '',
                                    labelCol: 100,
                                    labelEllipsis: true,
                                    labelWidth: '100',
                                    layout: 'horizontal',
                                    size: 'small',
                                    style: { marginBottom: '0px' },
                                  },
                                }}
                                fieldProps={{
                                  _unsafe_MixedSetter_default_select: 'VariableSetter',
                                  default: __$$eval(
                                    () => this.state.step3Data.TextSegmentationSegmentationRepeatLen
                                  ),
                                  name: null,
                                  required: true,
                                  title: '分段重叠长度',
                                  'x-validator': [],
                                }}
                                style={{ width: '80px' }}
                              />
                            </FormilyForm>
                          </Col>
                          <Col __component_name="Col" span={4} style={{ height: '32px' }}>
                            <Row
                              __component_name="Row"
                              gutter={[0, 0]}
                              style={{ textAlign: 'center' }}
                              wrap={true}
                            >
                              <Col
                                __component_name="Col"
                                span={24}
                                style={{ height: '32px', lineHeight: '26px' }}
                              >
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '12px' }}
                                >
                                  字符
                                </Typography.Text>
                              </Col>
                              <Col
                                __component_name="Col"
                                span={24}
                                style={{ height: '32px', lineHeight: '26px' }}
                              >
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: '12px' }}
                                >
                                  字符
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col __component_name="Col" span={10}>
                      <Card
                        __component_name="Card"
                        actions={[]}
                        bordered={true}
                        hoverable={true}
                        loading={false}
                        size="default"
                        style={{ height: '200px', minWidth: '400px' }}
                        type="default"
                      >
                        <Row __component_name="Row" gutter={['', 0]} wrap={true}>
                          <Col __component_name="Col" span={22}>
                            <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col">
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col" span="">
                                        <AntdIconEyeInvisibleFilled
                                          __component_name="AntdIconEyeInvisibleFilled"
                                          style={{ fontSize: 16, marginLeft: '8px' }}
                                        />
                                      </Col>
                                      <Col
                                        __component_name="Col"
                                        style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                      >
                                        <Typography.Text
                                          __component_name="Typography.Text"
                                          disabled={false}
                                          ellipsis={true}
                                          strong={true}
                                          style={{ fontSize: '16' }}
                                        >
                                          QA 拆分
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col __component_name="Col">
                                    <Switch
                                      __component_name="Switch"
                                      checked={__$$eval(() => this.state.step3Data.QAsplitChecked)}
                                      defaultChecked={false}
                                      disabled={false}
                                      loading={false}
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
                                      size="small"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                              <Col __component_name="Col" span={24}>
                                <Row __component_name="Row" gutter={['', 8]} wrap={true}>
                                  <Col
                                    __component_name="Col"
                                    span={24}
                                    style={{ marginBottom: '0px', paddingBottom: '0px' }}
                                  >
                                    <FormilyForm
                                      __component_name="FormilyForm"
                                      componentProps={{
                                        colon: false,
                                        labelAlign: 'left',
                                        labelCol: 4,
                                        layout: 'horizontal',
                                        wrapperCol: 20,
                                      }}
                                      formHelper={{ autoFocus: true }}
                                      ref={this._refsManager.linkRef('qa_split')}
                                    >
                                      <FormilySelect
                                        __component_name="FormilySelect"
                                        componentProps={{
                                          'x-component-props': {
                                            _sdkSwrGetFunc: {},
                                            allowClear: false,
                                            disabled: false,
                                            onChange: function () {
                                              return this.onLLmChange.apply(
                                                this,
                                                Array.prototype.slice.call(arguments).concat([])
                                              );
                                            }.bind(this),
                                            placeholder: '请选择模型',
                                          },
                                        }}
                                        decoratorProps={{
                                          'x-decorator-props': {
                                            labelCol: 8,
                                            labelEllipsis: true,
                                            size: 'default',
                                            style: { marginBottom: '0px' },
                                            tooltip: '',
                                          },
                                        }}
                                        fieldProps={{
                                          _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                                          '_unsafe_MixedSetter_x-validator_select': 'ArraySetter',
                                          name: 'type',
                                          required: true,
                                          title: '模型服务',
                                          'x-validator': [],
                                        }}
                                        style={{ marginBottom: '8px' }}
                                      />
                                      {!!__$$eval(() => this.state.showLlmModel) && (
                                        <FormilySelect
                                          __component_name="FormilySelect"
                                          componentProps={{
                                            'x-component-props': {
                                              _sdkSwrGetFunc: {},
                                              allowClear: false,
                                              disabled: false,
                                              placeholder: '请选择模型',
                                            },
                                          }}
                                          decoratorProps={{
                                            'x-decorator-props': {
                                              labelCol: 8,
                                              labelEllipsis: true,
                                              style: { marginBottom: '0px' },
                                              tooltip: '',
                                            },
                                          }}
                                          fieldProps={{
                                            '_unsafe_MixedSetter_x-validator_select': 'ArraySetter',
                                            name: 'model',
                                            required: __$$eval(
                                              () => this.state.showLlmModel === true
                                            ),
                                            title: '模型版本',
                                            'x-display': 'visible',
                                            'x-validator': [],
                                          }}
                                        />
                                      )}
                                    </FormilyForm>
                                    <Row
                                      __component_name="Row"
                                      justify="space-between"
                                      wrap={false}
                                    >
                                      <Col __component_name="Col">
                                        <Row
                                          __component_name="Row"
                                          justify="space-between"
                                          wrap={false}
                                        >
                                          <Col
                                            __component_name="Col"
                                            style={{ marginLeft: '0px', paddingLeft: '8px' }}
                                          />
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                                <Row __component_name="Row" justify="space-between" wrap={false}>
                                  <Col __component_name="Col" />
                                  <Col __component_name="Col">
                                    <Typography.Text
                                      __component_name="Typography.Text"
                                      disabled={false}
                                      ellipsis={true}
                                      onClick={function () {
                                        return this.onOpenConfigModal.apply(
                                          this,
                                          Array.prototype.slice.call(arguments).concat([])
                                        );
                                      }.bind(this)}
                                      strong={false}
                                      style={{ color: '#4461eb', fontSize: '' }}
                                    >
                                      高级配置
                                    </Typography.Text>
                                  </Col>
                                </Row>
                                <Typography.Paragraph
                                  code={false}
                                  delete={false}
                                  disabled={false}
                                  editable={false}
                                  ellipsis={{ rows: 2 }}
                                  mark={false}
                                  strong={false}
                                  style={{ fontSize: '', paddingTop: '10px' }}
                                  type="secondary"
                                  underline={false}
                                >
                                  根据文件中的文章内容，自动将文件做 QA 拆分处理。
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
            __component_name="Row"
            gutter={[0]}
            style={{
              backgroundColor: '#ffffff',
              paddingBottom: '24px',
              paddingLeft: '24px',
              paddingRight: '24px',
            }}
            wrap={true}
          >
            <Col __component_name="Col" span={24}>
              <Typography.Text
                __component_name="Typography.Text"
                disabled={false}
                ellipsis={true}
                strong={false}
                style={{ fontSize: '14px' }}
              >
                数据处理样例
              </Typography.Text>
            </Col>
            <Col __component_name="Col" span={24}>
              <Table
                __component_name="Table"
                columns={[
                  { dataIndex: 'type', key: 'name', title: '配置内容' },
                  {
                    dataIndex: 'before',
                    key: 'age',
                    render: (text, record, index) =>
                      (__$$context => (
                        <InnerHtmlContainer __component_name="InnerHtmlContainer">
                          {__$$eval(() => decodeURIComponent(text))}
                        </InnerHtmlContainer>
                      ))(__$$createChildContext(__$$context, { text, record, index })),
                    title: '处理前',
                  },
                  {
                    dataIndex: 'after',
                    render: (text, record, index) =>
                      (__$$context => (
                        <InnerHtmlContainer __component_name="InnerHtmlContainer">
                          {__$$eval(() => text)}
                        </InnerHtmlContainer>
                      ))(__$$createChildContext(__$$context, { text, record, index })),
                    title: '处理后',
                  },
                ]}
                dataSource={__$$eval(() => this.state.step4Data)}
                pagination={false}
                rowKey="id"
                scroll={{ scrollToFirstRowOnChange: true }}
                showHeader={true}
                size="middle"
              />
            </Col>
          </Row>
        )}
        {!!__$$eval(() => this.state.currentStep === 0) && (
          <Row __component_name="Row" style={{ marginLeft: '0px', marginRight: '0px' }} wrap={true}>
            <Col
              __component_name="Col"
              span={24}
              style={{ backgroundColor: '#ffffff', height: '130px' }}
            >
              <FormilyForm
                __component_name="FormilyForm"
                componentProps={{
                  colon: false,
                  labelAlign: 'left',
                  labelCol: 4,
                  layout: 'horizontal',
                  wrapperCol: 20,
                }}
                formHelper={{ autoFocus: true }}
                ref={this._refsManager.linkRef('createDataHandleStep1')}
              >
                <Row
                  __component_name="Row"
                  style={{ backgroundColor: '#ffffff', marginLeft: '0px', marginRight: '0px' }}
                  wrap={true}
                >
                  <Col __component_name="Col" span={24} style={{ height: '40px' }}>
                    <FormilyInput
                      __component_name="FormilyInput"
                      componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
                      decoratorProps={{
                        'x-decorator-props': { labelCol: 3, labelEllipsis: true, wrapperCol: 12 },
                      }}
                      fieldProps={{
                        name: 'name',
                        title: '任务名称',
                        'x-validator': [
                          { children: '未知', id: 'disabled', required: true, type: 'disabled' },
                        ],
                      }}
                      style={{ width: '500px' }}
                    />
                  </Col>
                  <Col __component_name="Col" span={24} style={{ height: '40px' }}>
                    <FormilySelect
                      __component_name="FormilySelect"
                      componentProps={{
                        'x-component-props': {
                          _sdkSwrGetFunc: {},
                          allowClear: false,
                          disabled: false,
                          placeholder: '请选择',
                        },
                      }}
                      decoratorProps={{ 'x-decorator-props': { labelCol: 3, labelEllipsis: true } }}
                      fieldProps={{
                        enum: [
                          {
                            children: '',
                            id: 'disabled',
                            label: '普通文本',
                            type: 'disabled',
                            value: 'text',
                          },
                        ],
                        name: 'file_type',
                        required: true,
                        title: '文件类型',
                        'x-validator': [
                          { children: '未知', id: 'disabled', required: true, type: 'disabled' },
                        ],
                      }}
                      style={{ width: '500px' }}
                    />
                  </Col>
                </Row>
              </FormilyForm>
            </Col>
          </Row>
        )}
        {!!__$$eval(() => this.state.currentStep === 1) && (
          <Row
            __component_name="Row"
            style={{
              backgroundColor: '#ffffff',
              marginLeft: '0px',
              marginRight: '0px',
              paddingBottom: '24px',
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingTop: '0px',
            }}
            wrap={true}
          >
            <Col __component_name="Col" span={24} style={{ color: '#ffffff !important' }}>
              <FormilyForm
                __component_name="FormilyForm"
                componentProps={{
                  colon: false,
                  labelAlign: 'left',
                  labelCol: 4,
                  layout: 'horizontal',
                  wrapperCol: 20,
                }}
                formHelper={{ autoFocus: false }}
                ref={this._refsManager.linkRef('createDataHandleStep2')}
              >
                <Row __component_name="Row" wrap={true}>
                  <Col __component_name="Col" span={12}>
                    <FormilySelect
                      __component_name="FormilySelect"
                      componentProps={{
                        'x-component-props': {
                          _sdkSwrGetFunc: __$$eval(() => this.state.dataSetDataList),
                          _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ExpressionSetter',
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
                      decoratorProps={{
                        'x-decorator-props': {
                          labelCol: 6,
                          labelEllipsis: true,
                          wrapperCol: 18,
                          wrapperWidth: '',
                        },
                      }}
                      fieldProps={{
                        _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                        enum: null,
                        name: 'pre_data_set_name',
                        required: true,
                        title: '处理前数据集',
                        'x-validator': [],
                      }}
                      style={{}}
                    />
                  </Col>
                  <Col __component_name="Col" span={12}>
                    <FormilySelect
                      __component_name="FormilySelect"
                      componentProps={{
                        'x-component-props': {
                          _sdkSwrGetFunc: {},
                          _unsafe_MixedSetter__sdkSwrGetFunc_select: 'ObjectSetter',
                          allowClear: false,
                          disabled: false,
                          onChange: function () {
                            return this.onDataSetVersionChange.apply(
                              this,
                              Array.prototype.slice.call(arguments).concat([])
                            );
                          }.bind(this),
                          placeholder: '请选择数据集版本',
                          showSearch: true,
                        },
                      }}
                      decoratorProps={{
                        'x-decorator-props': { labelEllipsis: true, wrapperWidth: '75%' },
                      }}
                      fieldProps={{
                        _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                        enum: null,
                        name: 'pre_data_set_version',
                        required: true,
                        title: '',
                        'x-validator': [],
                      }}
                    />
                  </Col>
                </Row>
                <Row
                  __component_name="Row"
                  style={{ marginBottom: '0px', paddingBottom: '0px' }}
                  wrap={true}
                >
                  <Col __component_name="Col" span={3}>
                    <FormilyFormItem
                      __component_name="FormilyFormItem"
                      decoratorProps={{
                        'x-decorator-props': {
                          asterisk: true,
                          labelCol: 6,
                          labelEllipsis: true,
                          wrapperWidth: '0',
                        },
                      }}
                      fieldProps={{
                        name: 'FormilyFormItem',
                        title: '选择文件',
                        'x-component': 'FormilyFormItem',
                        'x-validator': [],
                      }}
                      style={{}}
                    />
                  </Col>
                  <Col
                    __component_name="Col"
                    span={19}
                    style={{
                      borderColor: '#9b9b9b',
                      borderStyle: 'dashed',
                      borderWidth: '1px',
                      marginBottom: '0px',
                      paddingBottom: '24px',
                      paddingTop: '24px',
                    }}
                  >
                    <Row __component_name="Row" wrap={true}>
                      <Col __component_name="Col" span={24}>
                        <Row __component_name="Row" justify="space-between" wrap={false}>
                          <Col __component_name="Col">
                            <FormilyInput
                              __component_name="FormilyInput"
                              componentProps={{
                                'x-component-props': {
                                  allowClear: true,
                                  onChange: function () {
                                    return this.onSearch.apply(
                                      this,
                                      Array.prototype.slice.call(arguments).concat([])
                                    );
                                  }.bind(this),
                                  placeholder: '请输入',
                                },
                              }}
                              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                              fieldProps={{ name: 'Input', title: '', 'x-validator': [] }}
                              style={{ width: '400px' }}
                            />
                          </Col>
                          <Col __component_name="Col">
                            <Space __component_name="Space" align="center" direction="horizontal">
                              <Row __component_name="Row" justify="space-between" wrap={false}>
                                <Col __component_name="Col" style={{ paddingTop: '6px' }}>
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    共
                                  </Typography.Text>
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    {__$$eval(() => this.state.dataSetFileTotal)}
                                  </Typography.Text>
                                  <Typography.Text
                                    __component_name="Typography.Text"
                                    disabled={false}
                                    ellipsis={true}
                                    strong={false}
                                    style={{ fontSize: '' }}
                                  >
                                    条数据
                                  </Typography.Text>
                                </Col>
                                <Col __component_name="Col">
                                  <Pagination
                                    __component_name="Pagination"
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
                                    simple={false}
                                    style={{ textAlign: 'right' }}
                                    total={__$$eval(() => this.state.dataSetFileTotal)}
                                  />
                                </Col>
                              </Row>
                            </Space>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Table
                      __component_name="Table"
                      bordered={false}
                      columns={[
                        { dataIndex: 'path', key: 'name', title: '文件名称' },
                        { dataIndex: 'label', title: '标签', width: 120 },
                        { dataIndex: 'size', key: 'size', title: '文件大小', width: 100 },
                        { dataIndex: 'count', title: '数据量' },
                      ]}
                      dataSource={__$$eval(() => this.state.dataSetFileList)}
                      expandable={{ expandedRowRender: '' }}
                      loading={__$$eval(() => this.state.fileTableLoading)}
                      pagination={false}
                      rowKey="path"
                      rowSelection={{
                        onChange: function () {
                          return this.onSelectFileChange.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(this),
                        selectedRowKeys: __$$eval(() => this.state.selectedFileList),
                        type: 'checkbox',
                      }}
                      scroll={{ scrollToFirstRowOnChange: true }}
                      showHeader={true}
                      size="default"
                      style={{ width: '800px' }}
                    />
                  </Col>
                </Row>
                <Row __component_name="Row" wrap={true}>
                  <Col __component_name="Col" span={19} style={{ marginBottom: '16px' }}>
                    {!!__$$eval(() => this.state.fileSelectCheckErrorFlag) && (
                      <Typography.Text
                        __component_name="Typography.Text"
                        disabled={false}
                        ellipsis={true}
                        strong={false}
                        style={{ color: '#f85a5a', fontSize: '' }}
                      >
                        请选择文件
                      </Typography.Text>
                    )}
                  </Col>
                </Row>
                <Row __component_name="Row" wrap={true}>
                  <Col __component_name="Col" span={12}>
                    <FormilySelect
                      __component_name="FormilySelect"
                      componentProps={{
                        'x-component-props': {
                          _sdkSwrGetFunc: { func: __$$eval(() => this.state.dataSetDataList) },
                          allowClear: false,
                          disabled: true,
                          placeholder: '请选择数据集',
                        },
                      }}
                      decoratorProps={{
                        'x-decorator-props': { asterisk: true, labelCol: 6, labelEllipsis: true },
                      }}
                      fieldProps={{
                        _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                        enum: null,
                        name: 'post_data_set_name',
                        required: false,
                        title: '处理后数据集',
                        'x-validator': [],
                      }}
                    />
                  </Col>
                  <Col __component_name="Col" span={12}>
                    <FormilySelect
                      __component_name="FormilySelect"
                      componentProps={{
                        'x-component-props': {
                          _sdkSwrGetFunc: {},
                          allowClear: false,
                          disabled: true,
                          placeholder: '请选择数据集版本',
                        },
                      }}
                      decoratorProps={{
                        'x-decorator-props': { labelEllipsis: true, wrapperWidth: '75%' },
                      }}
                      fieldProps={{ name: 'post_data_set_version', title: '', 'x-validator': [] }}
                    />
                  </Col>
                </Row>
              </FormilyForm>
            </Col>
          </Row>
        )}
        {!!__$$eval(() => this.state.currentStep === 1) && (
          <Row
            __component_name="Row"
            style={{ backgroundColor: '#ffffff', marginLeft: '0px', marginRight: '0px' }}
            wrap={true}
          >
            <Col
              __component_name="Col"
              span={24}
              style={{ marginLeft: '0px', marginRight: '0px' }}
            />
          </Row>
        )}
        <Row __component_name="Row" style={{ marginLeft: '0px', marginRight: '0px' }} wrap={true}>
          <Col
            __component_name="Col"
            span={24}
            style={{
              backgroundColor: '#ffffff',
              display: 'inline',
              height: '100px',
              marginLeft: '0px',
              marginRight: '0px',
              paddingTop: '16px',
              textAlign: 'center',
            }}
          >
            <Space
              __component_name="Space"
              align="center"
              direction="horizontal"
              style={{ marginRight: '8px' }}
            >
              <Button
                __component_name="Button"
                block={false}
                danger={false}
                disabled={false}
                ghost={false}
                icon=""
                onClick={function () {
                  return this.onBack.apply(this, Array.prototype.slice.call(arguments).concat([]));
                }.bind(this)}
                shape="default"
                style={{ marginRight: '12px' }}
              >
                取消
              </Button>
              {!!__$$eval(() => this.state.currentStep !== 0) && (
                <Button
                  __component_name="Button"
                  block={false}
                  danger={false}
                  disabled={false}
                  ghost={false}
                  icon=""
                  onClick={function () {
                    return this.onPrevious.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  shape="default"
                  style={{ marginRight: '12px' }}
                >
                  上一步
                </Button>
              )}
            </Space>
            {!!__$$eval(() => this.state.currentStep !== 3) && (
              <Button
                __component_name="Button"
                block={false}
                danger={false}
                disabled={false}
                ghost={false}
                icon=""
                onClick={function () {
                  return this.onNext.apply(this, Array.prototype.slice.call(arguments).concat([]));
                }.bind(this)}
                shape="default"
                style={{ marginRight: '20px' }}
                type="primary"
              >
                下一步
              </Button>
            )}
            {!!__$$eval(() => this.state.currentStep === 3) && (
              <Button
                __component_name="Button"
                block={false}
                danger={false}
                disabled={false}
                ghost={false}
                icon=""
                onClick={function () {
                  return this.onFinish.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
                shape="default"
                style={{ marginRight: '12px' }}
                type="primary"
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
