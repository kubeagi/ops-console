import { Card, Typography, notification } from '@tenx-ui/materials';
import { Button, Col, Flex, Form, Row, Tooltip } from 'antd';
import { isEqual } from 'lodash';
import React, { useState } from 'react';

import utils from '../../../utils/__utils';
import { useModalAppDetailContext } from '../index';
import ConfigConversationStarter from './ConfigConversationStarter';
import ConfigKnowledge from './ConfigKnowledge';
import ConfigModelService from './ConfigModelService';
import ConfigPrompt from './ConfigPrompt';
import Dialogue from './Dialogue';
import styles from './index.less';

interface BodyProps {}

const Body: React.FC<BodyProps> = props => {
  const {
    refresh,
    data,
    configs,
    initConfigs,
    loading: cardLoading,
    form,
  } = useModalAppDetailContext();
  const [loading, setLoading] = useState(false);
  const [saveIng, setSaveIng] = useState(false);

  return (
    <Card bordered={false} className={styles.card} loading={cardLoading} type="inner">
      <Flex className={styles.action} justify="space-between">
        <Typography.Title level={1}>应用配置</Typography.Title>
        <Tooltip title={isEqual(initConfigs, configs) && '请先修改应用配置'}>
          <Button
            disabled={isEqual(initConfigs, configs)}
            loading={loading}
            onClick={async () => {
              try {
                setLoading(true);
                const input = {
                  ...data,
                  name: data?.metadata?.name,
                  namespace: data?.metadata?.namespace,
                  ...form.getFieldsValue(),
                };
                delete input.metadata;
                await utils.bff.updateApplicationConfig({
                  input,
                });
                refresh && refresh();
                notification.success({
                  message: '保存应用配置成功',
                });
                setLoading(false);
                setSaveIng(!saveIng);
              } catch (error) {
                setLoading(false);
                notification.warnings({
                  message: '保存应用配置失败',
                  errors: error?.response?.errors,
                });
              }
            }}
            type="primary"
          >
            保存并预览
          </Button>
        </Tooltip>
      </Flex>
      <Row className={styles.content}>
        <Col span={10}>
          <Card className={styles.setting}>
            <Form form={form}>
              <ConfigConversationStarter />
              <ConfigModelService />
              <ConfigKnowledge />
              <ConfigPrompt />
              {/* <ConfigAudio /> */}
              {/* <ConfigNext /> */}
            </Form>
          </Card>
        </Col>
        <Col span={14}>
          <Dialogue saveIng={saveIng} />
        </Col>
      </Row>
    </Card>
  );
};

export default Body;
