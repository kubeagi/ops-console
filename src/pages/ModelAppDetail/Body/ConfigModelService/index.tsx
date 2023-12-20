import { SettingOutlined } from '@ant-design/icons';
import { KubeagiModelService } from '@tenx-ui/icon';
import { Form, Select } from 'antd';
import React, { useMemo } from 'react';
import utils from '../../../../utils/__utils';
import { useModalAppDetailContext } from '../../index';
import Container from '../Container';
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
            children: (
              <>
                <SliderItem label="温度" name="temperature" Config={TEMPERATURE_DEFAULT} />
                <SliderItem
                  label="最大响应长度"
                  name="maxLength"
                  Config={MAX_RESPONSE_LENGTH_DEFAULT}
                />
                <SliderItem
                  label="对话轮次"
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
            <Form.Item
              labelAlign="left"
              labelCol={{ span: 3 }}
              style={{ marginBottom: 20 }}
              label="模型服务"
              name="llm"
            >
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
              <Form.Item
                labelAlign="left"
                labelCol={{ span: 3 }}
                style={{ marginBottom: 0 }}
                label="模型"
                name="model"
              >
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
