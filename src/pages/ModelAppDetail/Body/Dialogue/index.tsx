import { useModel } from '@@/exports';
import { Typography } from '@tenx-ui/materials';
import ChatComponent from '@yuntijs/chat';
import { Card, Space, Spin, Tag } from 'antd';
import React, { useState } from 'react';

import Icon from '@/assets/img/model-app-bx.png';
import I18N from '@/utils/kiwiI18N';

import { useModalAppDetailContext } from '../../index';
import Modal from '../Modal';

interface DialogueProps {
  saveIng: boolean;
}

const Dialogue: React.FC<DialogueProps> = props => {
  const { qiankun }: { qiankun: Record<string, any> } = useModel('qiankun');
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
        isDark={qiankun?.theme?.isDark}
        refresh={props.saveIng}
      />
      <Modal
        data={modalData}
        open={modalOpen && modalType === 'reference'}
        setOpen={setModalOpen}
        title={I18N.ModelApp.yinYongShuJu}
      >
        <Card
          title={
            <Space>
              <img src={Icon} width={24} />
              <Typography.Title>aaaawer</Typography.Title>
              <Tag bordered={false} color="green">
                {I18N.ModelApp.xiangSiDu}
                {0.1}
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
