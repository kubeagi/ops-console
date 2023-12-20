import { Card, notification, Typography } from '@tenx-ui/materials';
import { Button, Col, Flex, Row } from 'antd';
import React from 'react';
import utils from '../../../utils/__utils';
import { useModalAppDetailContext } from '../index';
import ConfigAudio from './ConfigAudio';
import ConfigConversationStarter from './ConfigConversationStarter';
import ConfigKnowledge from './ConfigKnowledge';
import ConfigModelService from './ConfigModelService';
import ConfigNext from './ConfigNext';
import ConfigPrompt from './ConfigPrompt';
import Dialogue from './Dialogue';
import styles from './index.less';
interface BodyProps {}

const Body: React.FC<BodyProps> = props => {
  const { refresh, data, configs } = useModalAppDetailContext();
  return (
    <Card loading={false} bordered={false} type="inner" className={styles.card}>
      <Flex justify="space-between" className={styles.action}>
        <Typography.Title level={1}>应用配置</Typography.Title>
        <Button
          type="primary"
          onClick={async () => {
            try {
              let input = {
                name: data?.metadata?.name,
                namespace: data?.metadata?.namespace,
              };
              Object.values(configs || {}).map(config => {
                input = Object.assign(input, config);
              });
              await utils.bff.updateApplicationConfig({
                input,
              });
              refresh && refresh();
              notification.success({
                message: '保存应用配置成功',
              });
            } catch (error) {
              notification.warnings({
                message: '保存应用配置失败',
                errors: error?.response?.errors,
              });
            }
          }}
        >
          保存并预览
        </Button>
      </Flex>
      <Row className={styles.content}>
        <Col span={10}>
          <Card className={styles.setting}>
            <ConfigConversationStarter />
            <ConfigModelService />
            <ConfigKnowledge />
            <ConfigPrompt />
            {/* <ConfigAudio /> */}
            <ConfigNext />
          </Card>
        </Col>
        <Col span={14}>
          <Dialogue />
        </Col>
      </Row>
    </Card>
  );
};

export default Body;
