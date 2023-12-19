import Icon from '@/assets/img/model-app-bx.png';
import { Typography } from '@tenx-ui/materials';
import { Card, Space, Tag } from 'antd';
import React, { useState } from 'react';
import Modal from '../Modal';

interface DialogueProps {}

const Dialogue: React.FC<DialogueProps> = props => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<any>('reference');
  const [modalData, setModalData] = useState<any>();

  return (
    <>
      <div
        onClick={() => {
          setModalOpen(true);
        }}
      >
        对话引用弹窗
      </div>
      <Modal
        title={`引用数据（3）`}
        open={modalOpen && modalType === 'reference'}
        setOpen={setModalOpen}
        data={modalData}
      >
        <Card
          title={
            <Space>
              <img src={Icon} width={24} />
              <Typography.Title>aaaawer</Typography.Title>
              <Tag color="green" bordered={false}>
                相似度 {0.1}
              </Tag>
            </Space>
          }
        >
          <Typography.Paragraph>Card content</Typography.Paragraph>
          <Typography.Paragraph>Card content</Typography.Paragraph>
        </Card>
      </Modal>
    </>
  );
};

export default Dialogue;
