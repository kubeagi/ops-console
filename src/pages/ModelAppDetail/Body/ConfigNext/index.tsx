import { KubeagiNextLead } from '@tenx-ui/icon';
import { Form, Switch } from 'antd';
import React from 'react';
import Container from '../Container';

interface ConfigNextProps {}

const ConfigNext: React.FC<ConfigNextProps> = props => {
  return (
    <Container
      changeConfig
      configKey="ConfigNext"
      icon={<KubeagiNextLead />}
      title={'下一步引导'}
      actions={[
        {
          key: 'switch',
          children: (
            <Form.Item name="showNextGuide" style={{ marginBottom: 0 }}>
              <Switch />
            </Form.Item>
          ),
          data: {},
        },
      ]}
    ></Container>
  );
};

export default ConfigNext;
