import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { KubeagiModelService } from '@tenx-ui/icon';
import { Form, Select, Space, Tooltip } from 'antd';
import React, { useMemo } from 'react';

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
  minMark: '精确',
  maxMark: '随机',
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
  const { configs, setConfigs } = useModalAppDetailContext();

  const { data: llms } = utils.bff.useListLlMs({
    input: {
      pageSize: 9999,
      page: 1,
      namespace: utils.getAuthData().project,
    },
  });

  const llmList = useMemo(() => {
    return llms?.LLM?.listLLMs?.nodes || [];
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
            title: '模型高级配置',
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
                        温度
                        <Tooltip title="配置 AI 回复的发散程度，较高的数值会使输出更加随机，较低的数值会使输出更加精确，范围为[0, 1]。">
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
                        对话轮次
                        <Tooltip title="保留多轮对话上下文最多组数，范围为[0,30]。">
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
                        最大响应长度
                        <Tooltip title="控制 AI 回复的最大字段长度，范围为[10，+∞),较小的值可以一定程度上减少 AI 的废话，但也可能导致 AI 回复不完整。">
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
                        最大 Token
                        <Tooltip title="控制 AI 对话最大 Token，范围为[10，+∞)。Token 涵盖了输入和输出的总 Token 数，这意味着如果用户的输入很长，模型可用于生成回应的 Token 数量会相应减少。">
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
          },
        },
      ]}
      configKey="ConfigModelService"
      icon={<KubeagiModelService />}
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
                      return callback('请选择模型服务');
                    }
                    return callback();
                  },
                },
              ]}
              style={{ marginBottom: noModelSelect ? 0 : 20 }}
            >
              <Select
                onChange={v => {
                  forceUpdate();
                  form.setFieldsValue({
                    model: undefined,
                  });
                  setConfigs({
                    ...configs,
                    ConfigModelService: {
                      ...configs?.ConfigModelService,
                      model: undefined,
                      llm: v,
                    },
                  });
                }}
                placeholder="请选择模型服务"
              >
                {llmList?.map(item => (
                  <Select.Option key={item.name} value={item.name}>
                    {utils.getFullName(item)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {!noModelSelect && (
              <Form.Item
                name="model"
                rules={[
                  {
                    validator: (_, value, callback) => {
                      if (!value) {
                        return callback('请选择模型');
                      }
                      return callback();
                    },
                  },
                ]}
                style={{ marginBottom: 0 }}
              >
                <Select
                  onChange={v => {
                    setConfigs({
                      ...configs,
                      ConfigModelService: {
                        ...configs?.ConfigModelService,
                        model: v,
                      },
                    });
                  }}
                  placeholder="请选择模型"
                >
                  {llm?.models?.map(item => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </>
        );
      }}
      title={'模型服务'}
    ></Container>
  );
};

export default ConfigModelService;
