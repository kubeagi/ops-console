/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * Chat
 * @author zggmd
 * @date 2024-01-22
 */
import {
  EditOutlined,
  FieldNumberOutlined,
  FileSearchOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import '@lobehub/ui';
// @ts-ignore
import { Button, Divider, Popover, Space, Spin, Tag, Typography } from 'antd';
import React, { FC, ReactNode } from 'react';

import I18N from '../utils/kiwiI18N';
import { Reference } from './index';
import { usePopoverStyles } from './index.style';

// import './index.less';

const getRelColor = (score: number) => {
  if (score < 0.5) {
    return 'red';
  } else if (score < 0.8) {
    return 'orange';
  } else {
    return 'green';
  }
};

interface IRefContent {
  reference: Reference;
  index: number;
  debug: boolean;
  children: ReactNode;
  open: boolean;
  onMouseLeaveCallback: () => any;
  loading: boolean;
}
const RefContent: FC<IRefContent> = props => {
  const { styles, cx } = usePopoverStyles();
  const { reference, index, open, loading, debug, children } = props;
  const content = reference.content ? (
    <Spin spinning={loading}>
      <div className={cx(styles.popContent, 'popContent')}>
        {reference.content ? (
          <Typography.Title level={4}>
            {I18N.Chat.yinYongShuJu} [{index}]
          </Typography.Title>
        ) : (
          '-'
        )}
        <Divider className="divider" />
        {Boolean(debug) && (
          <>
            <Typography.Title level={5}>{I18N.Chat.zhiShiKu}</Typography.Title>
            <Space>
              <FileTextOutlined />
              <Typography.Text code ellipsis strong>
                {reference.qa_file_path}
              </Typography.Text>
            </Space>
            <Space className="relLine">
              <FieldNumberOutlined />
              <Tag color={getRelColor(reference.score)}>
                {I18N.Chat.xiangSiDu}
                {(reference.score * 100).toFixed(2)}%
              </Tag>
            </Space>
            <div>
              <Typography.Text className="q" strong>
                {reference.question}
              </Typography.Text>
              <Button icon={<EditOutlined />} type="text" />
            </div>
            <Typography.Paragraph italic>{reference.answer}</Typography.Paragraph>
            <Divider className="divider" dashed />
          </>
        )}
        {Boolean(reference.title) && (
          <>
            <Typography.Title level={5}>{I18N.Chat.biaoTi}</Typography.Title>
            {reference.url ? (
              <Typography.Link href={reference.url} target="_blank">
                {reference.title}
              </Typography.Link>
            ) : (
              <Typography.Text>{reference.title}</Typography.Text>
            )}
          </>
        )}
        <Typography.Title level={5}>{I18N.Chat.yuanWen}</Typography.Title>
        <Typography.Paragraph italic>{reference.content}</Typography.Paragraph>
        {reference.file_name && (
          <Space>
            <FileSearchOutlined />
            <Typography.Text code ellipsis>
              {reference.file_name}
            </Typography.Text>{' '}
            -{I18N.Chat.yeMa}
            {reference.page_number}
          </Space>
        )}
      </div>
    </Spin>
  ) : (
    <></>
  );
  return (
    <Popover
      content={content}
      destroyTooltipOnHide
      onOpenChange={props.onMouseLeaveCallback}
      open={open}
      placement="left"
      title={null}
    >
      {children}
    </Popover>
  );
};
export default RefContent;
