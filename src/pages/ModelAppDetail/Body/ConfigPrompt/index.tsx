import { KubeagiPrompt } from '@tenx-ui/icon';
import { Form, Input } from 'antd';
import React from 'react';
import { useModalAppDetailContext } from '../../index';
import Container from '../Container';

interface ConfigPromptProps {}

const ConfigPrompt: React.FC<ConfigPromptProps> = props => {
  const { configs, setConfigs } = useModalAppDetailContext();
  return (
    <Container changeConfig configKey={'ConfigPrompt'} icon={<KubeagiPrompt />} title={'Prompt'}>
      <Form.Item style={{ marginBottom: 0 }} name="userPrompt">
        <Input.TextArea
          onChange={e => {
            setConfigs({
              ...(configs || {}),
              ConfigPrompt: {
                ...configs?.ConfigPrompt,
                userPrompt: e.target.value,
              },
            });
          }}
          rows={3}
          placeholder="请输入 Prompt"
        />
      </Form.Item>
    </Container>
  );
};

export default ConfigPrompt;
