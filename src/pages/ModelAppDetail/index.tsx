import { Button, Col, Page, Row, Space } from '@tenx-ui/materials';
import { matchPath, useLocation } from '@umijs/max';
import { Form } from 'antd';
import React, { createContext, useContext, useEffect, useState } from 'react';

import utils from '../../utils/__utils';
import Body from './Body';
import Header from './Header';

export const ModalAppDetailContext = createContext(null);
export const useModalAppDetailContext = () => {
  return useContext(ModalAppDetailContext);
};

interface ModelAppDetailDetailProps {}

const ModelAppDetailDetail: React.FC<ModelAppDetailDetailProps> = () => {
  const location = useLocation();
  const match = matchPath({ path: '/model-app/detail/:id' }, location.pathname);
  const [form] = Form.useForm();
  const { data, loading, mutate } = utils.bff.useGetApplication({
    name: match?.params?.id,
    namespace: utils.getAuthData().project,
  });

  const [initConfigs, setInitConfigs] = useState<any>();
  const [configs, setConfigs] = useState<any>();

  useEffect(() => {
    const Application = data?.Application?.getApplication;
    const Config = {
      ConfigConversationStarter: {
        prologue: Application?.prologue || undefined,
      },
      ConfigModelService: {
        llm: Application?.llm || undefined,
        model: Application?.model || undefined,
        temperature: Application?.temperature,
        maxLength: Application?.maxLength,
        conversionWindowSize: Application?.conversionWindowSize,
        maxTokens: Application?.maxTokens,
      },
      ConfigKnowledge: {
        knowledgebase: Application?.knowledgebase || undefined,
        scoreThreshold: Application?.scoreThreshold,
        numDocuments: Application?.numDocuments,
        docNullReturn: Application?.docNullReturn || undefined,
      },
      ConfigPrompt: {
        userPrompt: Application?.userPrompt || undefined,
      },
      ConfigAudio: {},
      ConfigNext: {
        showNextGuide: Application?.showNextGuide,
      },
      ViewResInfo: {
        showRespInfo: Application?.showRespInfo,
      },
      ViewReference: {
        showRetrievalInfo: Application?.showRetrievalInfo,
      },
      RealTimeSearch: {
        // @todo
      },
    };
    setConfigs(Config);
    setInitConfigs(Config);
  }, [data]);
  const refresh = () => {
    mutate();
  };

  return (
    <ModalAppDetailContext.Provider
      value={{
        data: data?.Application?.getApplication,
        refresh,
        loading,
        configs,
        setConfigs,
        initConfigs,
        form,
      }}
    >
      <Page>
        <Row wrap={true}>
          <Col span={24}>
            <Space align="center" direction="horizontal">
              <Button.Back title="智能体详情" type="primary" />
            </Space>
          </Col>
          <Col span={24}>
            <Header />
          </Col>
          <Col span={24}>
            <Body />
          </Col>
        </Row>
      </Page>
    </ModalAppDetailContext.Provider>
  );
};

export default ModelAppDetailDetail;
