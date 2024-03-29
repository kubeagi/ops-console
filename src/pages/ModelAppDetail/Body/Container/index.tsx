import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Typography } from '@tenx-ui/materials';
import { Divider, Flex, Space } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';

import { useModalAppDetailContext } from '../../index';
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
  icon?: React.ReactElement;
  title: string;
  actions?: Action[];
  configKey?: string;
  changeConfig?: boolean;
  renderChildren?: (form, forceUpdate, setModalOpen) => React.ReactElement;
  style?: any;
  titleLevel?: number;
  isCollapse?: boolean;
  headerStyle?: any;
  isRowItem?: boolean;
  borderBottom?: boolean;
}

const Container: React.FC<ContainerProps> = props => {
  const {
    children,
    icon,
    title,
    actions,
    configKey,
    changeConfig,
    renderChildren,
    titleLevel,
    isCollapse,
    headerStyle,
    isRowItem = false,
    borderBottom = false,
  } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<any>();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [actionData, setActionData] = useState<Action>();
  const { initConfigs, configs, setConfigs, form, disabled } = useModalAppDetailContext();
  const [collapse, setCollapse] = useState<boolean>(true);
  useEffect(() => {
    form.setFieldsValue(initConfigs?.[configKey] || {});
    forceUpdate();
  }, [initConfigs?.[configKey], form]);

  return (
    <div
      className={`${styles.container} ${isCollapse && styles.isCollapseContainer} ${isRowItem && styles.RowItemContainer} ${borderBottom && styles.borderBottomContainer}`}
      style={props.style}
    >
      <Modal
        form={form}
        open={modalOpen && modalType === actionData.key}
        setOpen={setModalType}
        {...(actionData?.modal || {})}
        configKey={configKey}
      />
      <Flex className={styles.header} justify="space-between" style={headerStyle}>
        <Space size={5}>
          {isCollapse && (
            <span className={styles.click} onClick={() => setCollapse(!collapse)}>
              {collapse ? (
                <a>
                  <CaretDownOutlined />
                </a>
              ) : (
                <CaretRightOutlined />
              )}
            </span>
          )}
          {icon && <span className={styles.titleIcon}>{icon}</span>}
          <Typography.Title
            className={[1, 2].includes(titleLevel) && styles.bold}
            level={titleLevel || 3}
          >
            {title}
          </Typography.Title>
        </Space>
        <Space size={5}>
          {actions?.map((action: Action, i) => {
            const { key, isModal = true, children: actionChildren, icon: actionIcon } = action;
            return (
              <>
                {actionIcon && (
                  <span
                    className={`${styles.icon} ${disabled && styles.disabledIcon}`}
                    onClick={() => {
                      if (!isModal || disabled) return;
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
                  <Divider dashed={false} mode="default" type="vertical" />
                )}
              </>
            );
          })}
        </Space>
      </Flex>
      <div style={isCollapse && !collapse ? { display: 'none' } : {}}>
        {children}
        {renderChildren && renderChildren(form, forceUpdate, setModalOpen)}
      </div>
    </div>
  );
};

export default Container;
