import { KubeagiPrompt } from '@tenx-ui/icon';
import { Form, Input } from 'antd';
import React from 'react';
import Container from '../Container';

interface ConfigPromptProps {}

const ConfigPrompt: React.FC<ConfigPromptProps> = props => {
  return (
    <Container icon={<KubeagiPrompt />} title={'Prompt'}>
      <Form.Item style={{ marginBottom: 0 }} name="prompt">
        <Input.TextArea rows={3} placeholder="请输入 Prompt" />
      </Form.Item>
    </Container>
  );
};

export default ConfigPrompt;
