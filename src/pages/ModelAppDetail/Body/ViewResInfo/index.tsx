import { KubeagiRes } from '@tenx-ui/icon';
import { Form, Switch } from 'antd';
import React from 'react';

import { useModalAppDetailContext } from '../../index';
import Container from '../Container';

interface ViewResInfoProps {}

const ViewResInfo: React.FC<ViewResInfoProps> = props => {
  const { configs, setConfigs } = useModalAppDetailContext();
  return (
    <Container
      actions={[
        {
          key: 'switch',
          children: (
            <Form.Item name="showRespInfo" style={{ marginBottom: 0 }}>
              <Switch
                onChange={v => {
                  setConfigs({
                    ...configs,
                    ViewResInfo: {
                      ...configs?.ViewResInfo,
                      showRespInfo: v,
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
      configKey="ViewResInfo"
      icon={<KubeagiRes />}
      style={{ paddingTop: 0, marginBottom: 0 }}
      title={'查看响应信息'}
    ></Container>
  );
};

export default ViewResInfo;
