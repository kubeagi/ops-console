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

import { Reference } from '@/pages/Chat/Chat/References/index';

import './index.less';

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
  const { reference, index, open, loading, debug, children } = props;
  const content = reference?.answer ? (
    <Spin spinning={loading}>
      <div className="popContent">
        {reference?.answer ? (
          <Typography.Title level={4}>引用数据 [{index}]</Typography.Title>
        ) : (
          '-'
        )}
        <Divider className="divider" />
        <Typography.Title level={5}>知识库</Typography.Title>
        <Space>
          <FileTextOutlined />
          <Typography.Text code ellipsis strong>
            {reference.qa_file_path}
          </Typography.Text>
        </Space>
        <Space className="relLine">
          <FieldNumberOutlined />
          <Tag color={getRelColor(reference.score)}>
            相似度: {(reference.score * 100).toFixed(2)}%
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
        <Typography.Title level={5}>原文</Typography.Title>
        <Typography.Paragraph italic>{reference.content}</Typography.Paragraph>
        <Space>
          <FileSearchOutlined />
          <Typography.Text code ellipsis>
            {reference.file_name}
          </Typography.Text>{' '}
          - 页码: {reference.page_number}
        </Space>
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
