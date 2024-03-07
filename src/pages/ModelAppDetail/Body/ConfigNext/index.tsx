import { KubeagiNextLead } from '@tenx-ui/icon';
import { Form, Switch } from 'antd';
import React from 'react';

import I18N from '@/utils/kiwiI18N';

import { useModalAppDetailContext } from '../../index';
import Container from '../Container';
import styles from '../index.less';

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
      icon={<KubeagiNextLead className={styles.orangeIcon} />}
      isRowItem
      style={{ marginBottom: 8 }}
      title={I18N.ModelApp.wenTiYinDao}
    ></Container>
  );
};

export default ConfigNext;
