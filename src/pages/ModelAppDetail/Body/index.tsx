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
import Dialogue from './Dialogue';
import RealTimeSearch from './RealTimeSearch';
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
        <Col span={10}>
          <Card className={styles.setting}>
            <Flex className={styles.action} justify="space-between">
              <Typography.Title level={1}>{I18N.ModelApp.zhiNengTiPeiZhi}</Typography.Title>
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
                          tools: [],
                        };
                        delete input.RealTimeSearchUsed;
                        delete input.RealTimeSearchName;
                        if (values.RealTimeSearchUsed && values.RealTimeSearchName) {
                          input.tools = [
                            {
                              name: values.RealTimeSearchName,
                            },
                          ];
                        }
                        delete input.metadata;
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
            </Flex>
            <Form form={form}>
              <ConfigConversationStarter />
              <ConfigModelService />
              <ConfigKnowledge />
              <RealTimeSearch />
              <ConfigPrompt />
              {/* <ConfigAudio /> */}
              <Divider
                __component_name="Divider"
                closeIcon={<CaretDownOutlined />}
                content={
                  <>
                    <ConfigNext />
                    <ViewReference />
                    <ViewResInfo />
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
            </Form>
          </Card>
        </Col>
        <Col className={styles.dialogue} span={14}>
          <Dialogue saveIng={saveIng} />
        </Col>
      </Row>
    </Card>
  );
};

export default Body;
