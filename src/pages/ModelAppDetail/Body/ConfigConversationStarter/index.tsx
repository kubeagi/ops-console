import { KubeagiDialogue } from '@tenx-ui/icon';
import { Form, Input } from 'antd';
import React from 'react';
import Container from '../Container';

interface ConversationStarterProps {}

const ConversationStarter: React.FC<ConversationStarterProps> = props => {
  return (
    <Container
      changeConfig
      configKey="ConfigConversationStarter"
      icon={<KubeagiDialogue />}
      title={'对话开场白'}
    >
      <Form.Item
        style={{ marginBottom: 0 }}
        name="prologue"
        initialValue={'您好，我是考勤知识小助手，请问有什么可以帮您？'}
      >
        <Input.TextArea rows={3} placeholder="请输入对话开场白" />
      </Form.Item>
    </Container>
  );
};

export default ConversationStarter;
