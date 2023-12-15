import { Card, Typography } from '@tenx-ui/materials';
import { Button, Col, Flex, Row } from 'antd';
import React from 'react';
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
  return (
    <Card loading={false} bordered={false} type="inner" className={styles.card}>
      <Flex justify="space-between" className={styles.action}>
        <Typography.Title level={1}>应用配置</Typography.Title>
        <Button type="primary">保存并预览</Button>
      </Flex>
      <Row justify="space-between" className={styles.content}>
        <Col span={10}>
          <Card className={styles.setting}>
            <ConfigConversationStarter />
            <ConfigModelService />
            <ConfigKnowledge />
            <ConfigPrompt />
            <ConfigAudio />
            <ConfigNext />
          </Card>
        </Col>
        <Col span={12}>
          <Dialogue />
        </Col>
      </Row>
    </Card>
  );
};

export default Body;
