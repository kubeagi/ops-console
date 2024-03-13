import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Card, Divider, Typography, notification } from '@tenx-ui/materials';
import { Button, Col, Flex, Form, Row, Tooltip } from 'antd';
import { isEqual } from 'lodash';
import React, { useState } from 'react';

import I18N from '@/utils/kiwiI18N';

import utils from '../../../utils/__utils';
import { useModalAppDetailContext } from '../index';
import ConfigConversationStarter from './ConfigConversationStarter';
import ConfigKnowledge from './ConfigKnowledge';
import ConfigModelService from './ConfigModelService';
import ConfigNext from './ConfigNext';
import ConfigPrompt from './ConfigPrompt';
import Container from './Container';
import Dialogue from './Dialogue';
import DocNullReturn from './DocNullReturn';
import Plugins from './Plugins';
import ViewReference from './ViewReference';
import ViewResInfo from './ViewResInfo';
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
      <Row className={styles.content}>
        <Col span={12}>
          <Card
            className={styles.setting}
            extra={
              <Tooltip title={isEqual(initConfigs, configs) && I18N.ModelApp.qingXianXiuGaiZhi}>
                <Button
                  disabled={isEqual(initConfigs, configs)}
                  loading={loading}
                  onClick={async () => {
                    form.validateFields().then(async values => {
                      try {
                        setLoading(true);
                        const input = {
                          ...data,
                          name: data?.metadata?.name,
                          namespace: data?.metadata?.namespace,
                          ...values,
                          tools: values.tools?.map(name => ({ name })),
                          docNullReturn: values.showDocNullReturn ? values.docNullReturn : '',
                        };
                        delete input.metadata;
                        delete input.showDocNullReturn;
                        await utils.bff.updateApplicationConfig({
                          input,
                        });
                        refresh && refresh();
                        notification.success({
                          message: I18N.ModelApp.baoCunZhiNengTi2,
                        });
                        setLoading(false);
                        setSaveIng(!saveIng);
                      } catch (error) {
                        setLoading(false);
                        notification.warnings({
                          message: I18N.ModelApp.baoCunZhiNengTi,
                          errors: error?.response?.errors,
                        });
                      }
                    });
                  }}
                  type="primary"
                >
                  {I18N.ModelApp.baoCun}
                </Button>
              </Tooltip>
            }
            headStyle={{ background: 'transparent', padding: '0 20px' }}
            title={<Typography.Title level={1}>{I18N.ModelApp.zhiNengTiPeiZhi}</Typography.Title>}
          >
            <Form form={form}>
              <Flex gap={24}>
                <div style={{ width: '40%' }}>
                  <ConfigPrompt />
                </div>
                <div style={{ width: '60%' }}>
                  <ConfigModelService />
                  <Container title="技能" titleLevel={1}>
                    <Plugins />
                  </Container>
                  <Container title="记忆" titleLevel={1}>
                    <ConfigKnowledge />
                  </Container>
                  {/* <ConfigAudio /> */}
                  <Divider
                    __component_name="Divider"
                    closeIcon={<CaretDownOutlined />}
                    content={
                      <>
                        <ConfigConversationStarter />
                        <DocNullReturn />
                        <ViewResInfo />
                        <ViewReference />
                        <ConfigNext />
                      </>
                    }
                    dashed={true}
                    defaultOpen={false}
                    iconPlacement="right"
                    mode="expanded"
                    openIcon={<CaretRightOutlined />}
                    orientation="left"
                    orientationMargin={0}
                  >
                    {I18N.ModelApp.geXingHuaPeiZhi}
                  </Divider>
                </div>
              </Flex>
            </Form>
          </Card>
        </Col>
        <Col className={styles.dialogue} span={12}>
          <Dialogue saveIng={saveIng} />
        </Col>
      </Row>
    </Card>
  );
};

export default Body;
