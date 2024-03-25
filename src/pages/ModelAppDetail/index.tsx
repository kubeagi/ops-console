import { Button, Col, Page, Row, Space } from '@tenx-ui/materials';
import { matchPath, useLocation } from '@umijs/max';
import { Form } from 'antd';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import I18N from '@/utils/kiwiI18N';

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
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>();

  const mutate = useCallback(async () => {
    if (!match?.params?.id || !utils.getAuthData().project) return;
    try {
      setLoading(true);
      const res = await utils.bff.getApplication({
        name: match?.params?.id,
        namespace: utils.getAuthData().project,
      });
      setData(res);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [match?.params?.id, utils.getAuthData().project]);

  useEffect(() => {
    mutate();
  }, []);

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
      Skill: {
        tools: Application?.tools?.map(item => item.name),
      },
      DocNullReturn: {
        docNullReturn: Application?.docNullReturn || undefined,
        showDocNullReturn: !!Application?.docNullReturn,
      },
      Rerank: {
        enableRerank: Application?.enableRerank || false,
        rerankModel: Application?.rerankModel || undefined,
      },
      MultiSearch: {
        enableMultiQuery: Application?.enableMultiQuery || false,
      },
      SearchLimit: {
        showSearchLimit:
          Application?.knowledgebase || Application?.enableRerank || Application?.enableMultiQuery,
        scoreThreshold: Application?.scoreThreshold,
        numDocuments: Application?.numDocuments,
      },
      DialogeTimeout: {
        chatTimeout: Application?.chatTimeout || 60,
      },
      DocDialoge: {
        enableUploadFile: Application?.enableUploadFile || false,
        chunkSize: Application?.chunkSize || 300,
        chunkOverlap: Application?.chunkOverlap || 10,
        batchSize: Application?.batchSize || 1,
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
              <Button.Back title={I18N.ModelApp.zhiNengTiXiangQing} type="primary" />
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
