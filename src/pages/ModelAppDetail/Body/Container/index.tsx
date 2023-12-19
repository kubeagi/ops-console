import { Typography } from '@tenx-ui/materials';
import { Divider, Flex, Form, Space } from 'antd';
import React, { useState } from 'react';
import Modal, { SettingProps } from '../Modal';
import styles from './index.less';
interface Action {
  key: string;
  isModal?: boolean;
  icon?: React.ReactElement;
  children?: React.ReactElement;
  data: any;
  modal?: SettingProps;
}

interface ContainerProps {
  children?: React.ReactElement;
  icon: React.ReactElement;
  title: string;
  actions?: Action[];
}

const Container: React.FC<ContainerProps> = props => {
  const { children, icon, title, actions } = props;
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<any>();

  const [actionData, setActionData] = useState<Action>();
  return (
    <Form form={form} className={styles.container}>
      <Modal
        form={form}
        open={modalOpen && modalType === actionData.key}
        setOpen={setModalType}
        {...(actionData?.modal || {})}
      />
      <Flex justify="space-between" className={styles.header}>
        <Space size={5}>
          <span className={styles.titleIcon}>{icon}</span>
          <Typography.Title level={3}>{title}</Typography.Title>
        </Space>
        <Space size={5}>
          {actions?.map((action: Action, i) => {
            const { key, isModal = true, children: actionChildren, icon: actionIcon } = action;
            return (
              <>
                {actionIcon && (
                  <span
                    className={styles.icon}
                    onClick={() => {
                      if (!isModal) return;
                      setModalOpen(true);
                      setModalType(key);
                      setActionData(action);
                    }}
                  >
                    {actionIcon}
                  </span>
                )}
                {actionChildren}
                {i !== actions.length - 1 && (
                  <Divider mode="default" type="vertical" dashed={false} />
                )}
              </>
            );
          })}
        </Space>
      </Flex>
      {children}
    </Form>
  );
};

export default Container;
