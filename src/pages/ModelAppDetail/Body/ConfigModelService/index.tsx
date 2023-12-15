import { SettingOutlined } from '@ant-design/icons';
import { KubeagiModelService } from '@tenx-ui/icon';
import { Form, Select } from 'antd';
import React from 'react';
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
  return (
    <Container
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
            data: {},
            children: (
              <>
                <SliderItem label="温度" name="name" Config={TEMPERATURE_DEFAULT} />
                <SliderItem
                  label="最大响应长度"
                  name="name1"
                  Config={MAX_RESPONSE_LENGTH_DEFAULT}
                />
                <SliderItem label="对话轮次" name="name2" Config={SESSION_ROUND_DEFAULT} />
              </>
            ),
            handleSave: (values: any) => {},
          },
        },
      ]}
    >
      <Form.Item style={{ marginBottom: 0 }} label="模型服务" name="service">
        <Select placeholder="请选择模型服务">
          <Select.Option value="1">1</Select.Option>
        </Select>
      </Form.Item>
    </Container>
  );
};

export default ConfigModelService;
