import { Typography } from '@tenx-ui/materials';
import { Card, Space, Spin, Tag } from 'antd';
import React, { useState } from 'react';

import Icon from '@/assets/img/model-app-bx.png';
import ChatComponent from '@/pages/Chat/Chat';

import { useModalAppDetailContext } from '../../index';
import Modal from '../Modal';

interface DialogueProps {
  saveIng: boolean;
}

const Dialogue: React.FC<DialogueProps> = props => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<any>('reference');
  const [modalData, setModalData] = useState<any>();
  const { data, loading } = useModalAppDetailContext();
  return (
    <Spin spinning={loading}>
      {/* <div
        onClick={() => {
          setModalOpen(true);
        }}
      >
        对话引用弹窗
      </div> */}
      <ChatComponent
        appName={data?.metadata?.name}
        appNamespace={data?.metadata?.namespace}
        debug={true}
        refresh={props.saveIng}
      />
      <Modal
        data={modalData}
        open={modalOpen && modalType === 'reference'}
        setOpen={setModalOpen}
        title={`引用数据（3）`}
      >
        <Card
          title={
            <Space>
              <img src={Icon} width={24} />
              <Typography.Title>aaaawer</Typography.Title>
              <Tag bordered={false} color="green">
                相似度 {0.1}
              </Tag>
            </Space>
          }
        >
          <Typography.Paragraph>Card content</Typography.Paragraph>
          <Typography.Paragraph>Card content</Typography.Paragraph>
        </Card>
      </Modal>
    </Spin>
  );
};

export default Dialogue;
