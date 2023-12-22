import { KubeagiNextLead } from '@tenx-ui/icon';
import { Form, Switch } from 'antd';
import React from 'react';
import { useModalAppDetailContext } from '../../index';
import Container from '../Container';

interface ConfigNextProps {}

const ConfigNext: React.FC<ConfigNextProps> = props => {
  const { configs, setConfigs } = useModalAppDetailContext();
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
            <Form.Item name="showNextGuid" style={{ marginBottom: 0 }}>
              <Switch
                onChange={v => {
                  setConfigs({
                    ...(configs || {}),
                    ConfigNext: {
                      ...configs?.ConfigNext,
                      showNextGuid: v,
                    },
                  });
                }}
              />
            </Form.Item>
          ),
          data: {},
        },
      ]}
    ></Container>
  );
};

export default ConfigNext;
