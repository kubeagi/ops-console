import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Form, Select, Space, Tooltip } from 'antd';
import React, { useMemo } from 'react';

import I18N from '@/utils/kiwiI18N';

import utils from '../../../../utils/__utils';
import { useModalAppDetailContext } from '../../index';
import Container from '../Container';
import { SliderItem } from '../Modal';
import styles from '../index.less';

interface ConfigModelServiceProps {}
const TEMPERATURE_DEFAULT = {
  initialValue: 0,
  min: 0,
  max: 1,
  precision: 2,
  minMark: I18N.ModelApp.jingQue,
  maxMark: I18N.ModelApp.suiJi,
};
const MAX_RESPONSE_LENGTH_DEFAULT = {
  initialValue: 2048,
  min: 10,
  precision: 0,
};
const MAX_RESPONSE_TOKEN_DEFAULT = {
  initialValue: 2048,
  min: 10,
  precision: 0,
  minAlias: 'maxLength',
};
const SESSION_ROUND_DEFAULT = {
  initialValue: 5,
  min: 0,
  max: 30,
  precision: 0,
};
const ConfigModelService: React.FC<ConfigModelServiceProps> = props => {
  const { configs, setConfigs, disabled } = useModalAppDetailContext();

  const { data: llms } = utils.bff.useListLlMs({
    input: {
      pageSize: 9999,
      page: 1,
      namespace: utils.getAuthData().project,
    },
  });

  const llmList = useMemo(() => {
    return (
      llms?.LLM?.listLLMs?.nodes?.filter(
        (item: any) => item.status === 'True' || item.status === 'Running'
      ) || []
    );
  }, [llms]);

  return (
    <Container
      actions={[
        {
          key: 'string',
          icon: <SettingOutlined />,
          // children?: React.ReactElement
          data: {},
          modal: {
            title: I18N.ModelApp.moXingGaoJiPei,
            refresh: () => {},
            type: 'edit',
            width: 540,
            renderChildren: (form, forceUpdate) => {
              return (
                <>
                  <SliderItem
                    Config={TEMPERATURE_DEFAULT}
                    label={
                      <Space size={3}>
                        {I18N.DataHandle.wenDu}
                        <Tooltip title={I18N.ModelApp.peiZhiAIHui}>
                          <QuestionCircleOutlined className={styles.tooltip} />
                        </Tooltip>
                      </Space>
                    }
                    name="temperature"
                  />
                  <SliderItem
                    Config={SESSION_ROUND_DEFAULT}
                    label={
                      <Space size={3}>
                        {I18N.ModelApp.duiHuaLunCi}
                        <Tooltip title={I18N.ModelApp.baoLiuDuoLunDui}>
                          <QuestionCircleOutlined className={styles.tooltip} />
                        </Tooltip>
                      </Space>
                    }
                    name="conversionWindowSize"
                  />
                  <SliderItem
                    Config={MAX_RESPONSE_LENGTH_DEFAULT}
                    forceUpdate={forceUpdate}
                    label={
                      <Space size={3}>
                        {I18N.ModelApp.zuiDaXiangYingChang}
                        <Tooltip title={I18N.ModelApp.kongZhiAIHui}>
                          <QuestionCircleOutlined className={styles.tooltip} />
                        </Tooltip>
                      </Space>
                    }
                    name="maxLength"
                    noSlider
                  />
                  <SliderItem
                    Config={MAX_RESPONSE_TOKEN_DEFAULT}
                    label={
                      <Space size={3}>
                        {I18N.DataHandle.zuiDaXiangYingChang}
                        <Tooltip title={I18N.ModelApp.kongZhiAIDui}>
                          <QuestionCircleOutlined className={styles.tooltip} />
                        </Tooltip>
                      </Space>
                    }
                    name="maxTokens"
                    noSlider
                  />
                </>
              );
            },
            handleSave: (values: any) => {},
            validateNames: ['temperature', 'maxTokens', 'conversionWindowSize', 'maxLength'],
          },
        },
      ]}
      configKey="ConfigModelService"
      // icon={<KubeagiModelService />}
      renderChildren={(form, forceUpdate) => {
        const llm = llmList?.find(item => item.name === form.getFieldValue('llm'));
        const noModelSelect = llm?.provider === 'worker' || !llm;
        return (
          <>
            <Form.Item
              name="llm"
              rules={[
                {
                  validator: (_, value, callback) => {
                    if (!value) {
                      return callback(I18N.ModelApp.qingXuanZeMoXing2);
                    }
                    return callback();
                  },
                },
              ]}
              style={{ marginBottom: noModelSelect ? 0 : 20 }}
            >
              <Select
                disabled={disabled}
                onChange={v => {
                  forceUpdate();
                  const llm = llmList?.find(item => item.name === v);
                  const model = llm?.models?.[0];
                  form.setFieldsValue({
                    model,
                  });
                  setConfigs({
                    ...configs,
                    ConfigModelService: {
                      ...configs?.ConfigModelService,
                      model,
                      llm: v,
                    },
                  });
                }}
                placeholder={I18N.ModelApp.qingXuanZeMoXing2}
              >
                {llmList?.map(item => (
                  <Select.Option key={item.name} value={item.name}>
                    {utils.getFullName(item)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="model"
              rules={[
                {
                  validator: (_, value, callback) => {
                    if (!value && !noModelSelect) {
                      return callback(I18N.ModelApp.qingXuanZeMoXing);
                    }
                    return callback();
                  },
                },
              ]}
              style={noModelSelect ? { display: 'none', marginBottom: 0 } : { marginBottom: 0 }}
            >
              <Select
                disabled={disabled}
                onChange={v => {
                  setConfigs({
                    ...configs,
                    ConfigModelService: {
                      ...configs?.ConfigModelService,
                      model: v,
                    },
                  });
                }}
                placeholder={I18N.ModelApp.qingXuanZeMoXing}
              >
                {llm?.models?.map(item => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </>
        );
      }}
      title={I18N.ModelApp.moXingFuWu}
      titleLevel={1}
    ></Container>
  );
};

export default ConfigModelService;
