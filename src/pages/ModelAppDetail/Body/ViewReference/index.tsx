import { KubeagiQuote } from '@tenx-ui/icon';
import { Form, Switch } from 'antd';
import React from 'react';

import I18N from '@/utils/kiwiI18N';

import { useModalAppDetailContext } from '../../index';
import Container from '../Container';

interface ViewReferenceProps {}

const ViewReference: React.FC<ViewReferenceProps> = props => {
  const { configs, setConfigs } = useModalAppDetailContext();
  return (
    <Container
      actions={[
        {
          key: 'switch',
          children: (
            <Form.Item name="showRetrievalInfo" style={{ marginBottom: 0 }}>
              <Switch
                onChange={v => {
                  setConfigs({
                    ...configs,
                    ViewReference: {
                      ...configs?.ViewReference,
                      showRetrievalInfo: v,
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
      configKey="ViewReference"
      icon={<KubeagiQuote />}
      style={{ paddingTop: 0, marginBottom: -8 }}
      title={I18N.ModelApp.chaKanYinYong}
    ></Container>
  );
};

export default ViewReference;
