import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { KubeagiModelService } from '@tenx-ui/icon';
import { Form, Select, Space, Tooltip } from 'antd';
import React, { useMemo } from 'react';
import utils from '../../../../utils/__utils';
import { useModalAppDetailContext } from '../../index';
import Container from '../Container';
import styles from '../index.less';
import { SliderItem } from '../Modal';

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
  initialValue: 512,
  min: 10,
  max: 4096,
  precision: 0,
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
      configKey="ConfigModelService"
      icon={<KubeagiModelService />}
      title={'模型服务'}
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
            children: (
              <>
                <SliderItem
                  label={
                    <Space size={3}>
                      温度
                      <Tooltip title="配置 AI 回复的发散程度，较高的数值会使输出更加随机，较低的数值会使输出更加精确，范围为(0, 1]。">
                        <QuestionCircleOutlined className={styles.tooltip} />
                      </Tooltip>
                    </Space>
                  }
                  name="temperature"
                  Config={TEMPERATURE_DEFAULT}
                />
                <SliderItem
                  label={
                    <Space size={3}>
                      最大响应长度
                      <Tooltip title="控制 AI 回复的最大 Tokens，范围为[10，4096],较小的值可以一定程度上减少 AI 的废话，但也可能导致 AI 回复不完整。">
                        <QuestionCircleOutlined className={styles.tooltip} />
                      </Tooltip>
                    </Space>
                  }
                  name="maxLength"
                  Config={MAX_RESPONSE_LENGTH_DEFAULT}
                />
                <SliderItem
                  label={
                    <Space size={3}>
                      对话轮次
                      <Tooltip title="保留多轮对话上下文最多组数，范围为[1,30]。">
                        <QuestionCircleOutlined className={styles.tooltip} />
                      </Tooltip>
                    </Space>
                  }
                  name="conversionWindowSize"
                  Config={SESSION_ROUND_DEFAULT}
                />
              </>
            ),
            handleSave: (values: any) => {},
          },
        },
      ]}
      renderChildren={(form, forceUpdate) => {
        const llm = llmList?.find(item => item.name === form.getFieldValue('llm'));
        const noModelSelect = llm?.provider === 'worker' || !llm;
        return (
          <>
            <Form.Item style={{ marginBottom: noModelSelect ? 0 : 20 }} name="llm">
              <Select
                placeholder="请选择模型服务"
                onChange={v => {
                  forceUpdate();
                  form.setFieldsValue({
                    model: undefined,
                  });
                  setConfigs({
                    ...(configs || {}),
                    ConfigModelService: {
                      ...configs?.ConfigModelService,
                      model: undefined,
                      llm: v,
                    },
                  });
                }}
              >
                {llmList?.map(item => (
                  <Select.Option value={item.name} key={item.name}>
                    {utils.getFullName(item)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {!noModelSelect && (
              <Form.Item style={{ marginBottom: 0 }} name="model">
                <Select
                  placeholder="请选择模型"
                  onChange={v => {
                    setConfigs({
                      ...(configs || {}),
                      ConfigModelService: {
                        ...configs?.ConfigModelService,
                        model: v,
                      },
                    });
                  }}
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
    ></Container>
  );
};

export default ConfigModelService;
