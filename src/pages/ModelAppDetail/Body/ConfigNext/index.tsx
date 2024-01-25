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
      actions={[
        {
          key: 'switch',
          children: (
            <Form.Item name="showNextGuide" style={{ marginBottom: 0 }}>
              <Switch
                onChange={v => {
                  setConfigs({
                    ...configs,
                    ConfigNext: {
                      ...configs?.ConfigNext,
                      showNextGuide: v,
                    },
                  });
                }}
              />
            </Form.Item>
          ),
          data: {},
        },
      ]}
      changeConfig
      configKey="ConfigNext"
      icon={<KubeagiNextLead />}
      style={{ paddingTop: 0, marginBottom: -8, marginTop: -10 }}
      title={'问题引导'}
    ></Container>
  );
};

export default ConfigNext;
