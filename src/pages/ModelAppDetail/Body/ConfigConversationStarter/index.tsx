import { KubeagiDialogue } from '@tenx-ui/icon';
import { Form, Input } from 'antd';
import React from 'react';

import I18N from '@/utils/kiwiI18N';

import { useModalAppDetailContext } from '../../index';
import Container from '../Container';

interface ConversationStarterProps {}

const ConversationStarter: React.FC<ConversationStarterProps> = props => {
  const { configs, setConfigs } = useModalAppDetailContext();

  return (
    <Container
      changeConfig
      configKey="ConfigConversationStarter"
      icon={<KubeagiDialogue />}
      title={I18N.ModelApp.duiHuaKaiChangBai}
    >
      <Form.Item
        initialValue={I18N.ModelApp.ninHaoWoShiKao}
        name="prologue"
        style={{ marginBottom: 0 }}
      >
        <Input.TextArea
          onChange={e => {
            setConfigs({
              ...configs,
              ConfigConversationStarter: {
                ...configs?.ConfigConversationStarter,
                prologue: e.target.value,
              },
            });
          }}
          placeholder={I18N.ModelApp.qingShuRuDuiHua}
          rows={3}
        />
      </Form.Item>
    </Container>
  );
};

export default ConversationStarter;
