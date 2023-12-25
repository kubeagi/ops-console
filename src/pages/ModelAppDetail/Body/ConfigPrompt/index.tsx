import { QuestionCircleOutlined } from '@ant-design/icons';
import { KubeagiPrompt } from '@tenx-ui/icon';
import { Form, Input, Space, Tooltip } from 'antd';
import React from 'react';

import { useModalAppDetailContext } from '../../index';
import Container from '../Container';
import styles from '../index.less';

interface ConfigPromptProps {}

const ConfigPrompt: React.FC<ConfigPromptProps> = props => {
  const { configs, setConfigs } = useModalAppDetailContext();
  return (
    <Container
      changeConfig
      configKey={'ConfigPrompt'}
      icon={<KubeagiPrompt />}
      title={
        <Space size={4}>
          Prompt
          <Tooltip title="提示词可以帮助模型更好地理解用户的意图，并且可以在对话的早期阶段提供必要的指导。该提示词会固定在对话开始之前，适当的提示词可以引导对话的方向。支持使用变量，如{text}。">
            <QuestionCircleOutlined className={styles.tooltip} />
          </Tooltip>
        </Space>
      }
    >
      <Form.Item name="userPrompt" style={{ marginBottom: 0 }}>
        <Input.TextArea
          onChange={e => {
            setConfigs({
              ...configs,
              ConfigPrompt: {
                ...configs?.ConfigPrompt,
                userPrompt: e.target.value,
              },
            });
          }}
          placeholder="请输入 Prompt"
          rows={3}
        />
      </Form.Item>
    </Container>
  );
};

export default ConfigPrompt;
