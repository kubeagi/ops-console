import { Button, Col, Page, Row, Space } from '@tenx-ui/materials';
import React, { useContext } from 'react';
import Body from './Body';
import Header from './Header';

import { createContext } from 'react';
export const ModalAppDetailContext = createContext(null);
export const useModalAppDetailContext = () => {
  return useContext(ModalAppDetailContext);
};

interface ModelAppDetailDetailProps {}

const ModelAppDetailDetail: React.FC<ModelAppDetailDetailProps> = () => {
  const data = {};
  const refresh = () => {};
  return (
    <ModalAppDetailContext.Provider
      value={{
        data,
        refresh,
      }}
    >
      <Page>
        <Row wrap={true}>
          <Col span={24}>
            <Space align="center" direction="horizontal">
              <Button.Back type="primary" title="模型应用详情" />
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
