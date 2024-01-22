import { KubeagiSearch } from '@tenx-ui/icon';
import { Form, Switch } from 'antd';
import React from 'react';

import { useModalAppDetailContext } from '../../index';
import Container from '../Container';

interface RealTimeSearchProps {}

const RealTimeSearch: React.FC<RealTimeSearchProps> = props => {
  const { configs, setConfigs } = useModalAppDetailContext();
  return (
    <Container
      actions={[
        {
          key: 'switch',
          children: (
            // @todo
            <Form.Item name="showRespInfo" style={{ marginBottom: 0 }}>
              <Switch
                onChange={v => {
                  setConfigs({
                    ...configs,
                    RealTimeSearch: {
                      ...configs?.RealTimeSearch,
                      // @todo
                      // showRespInfo: v,
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
      configKey="RealTimeSearch"
      icon={<KubeagiSearch />}
      title={'问题引导'}
    ></Container>
  );
};

export default RealTimeSearch;
