/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * Chat
 * @author zggmd
 * @date 2024-01-22
 */
import { FieldNumberOutlined, FileSearchOutlined, FileTextOutlined } from '@ant-design/icons';
import '@lobehub/ui';
// @ts-ignore
import { ConfigProvider, Divider, Popover, Space, Spin, Tag, Typography } from 'antd';
import React, { FC, ReactNode, useCallback, useState } from 'react';

import I18N from '../utils/kiwiI18N';
import EditModal, { type EditData } from './EditModal';
import { Reference } from './index';
import { usePopoverStyles } from './index.style';

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

  const [editData, setEditData] = useState<EditData>({
    visible: false,
    reference: undefined,
  });
  const onEditRefClick = useCallback(
    (ref: Reference) => {
      setEditData({
        visible: true,
        reference: ref,
      });
    },
    [setEditData]
  );

  const content = (
    <Spin spinning={loading}>
      <div className={cx(styles.popContent, 'popContent')}>
        <Typography.Title level={4}>
          {I18N.Chat.yinYongShuJu} [{index}]
        </Typography.Title>
        <Divider className="divider" />
        {Boolean(debug) && (
          <>
            <Typography.Title level={5}>{I18N.Chat.zhiShiKu}</Typography.Title>
            {Boolean(reference.qa_file_path) && (
              <Space>
                <FileTextOutlined />
                <Typography.Text
                  className="filePath"
                  code
                  ellipsis={{ tooltip: reference.qa_file_path }}
                  strong
                >
                  {reference.qa_file_path}
                </Typography.Text>
              </Space>
            )}
            {Boolean(reference.score) && (
              <Space className="relLine">
                <FieldNumberOutlined />
                <Tag color={getRelColor(reference.score)}>
                  {I18N.Chat.xiangSiDu}
                  {(reference.score * 100).toFixed(2)}%
                </Tag>
              </Space>
            )}
            {Boolean(reference.question) && (
              <div>
                <Typography.Paragraph
                  className="q"
                  editable={
                    Boolean(reference.qa_file_path) && {
                      editing: false,
                      onStart: onEditRefClick.bind('', reference),
                    }
                  }
                  ellipsis={{ rows: 4, expandable: true, tooltip: reference.question }}
                  strong
                >
                  {reference.question}
                </Typography.Paragraph>
              </div>
            )}
            {Boolean(reference.answer) && (
              <Typography.Paragraph
                ellipsis={{ rows: 5, expandable: true, tooltip: reference.answer }}
              >
                {reference.answer}
              </Typography.Paragraph>
            )}
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
            <Divider className="divider" dashed />
          </>
        )}
        <Typography.Title level={5}>{I18N.Chat.yuanWen}</Typography.Title>
        {Boolean(reference.content) && (
          <Typography.Paragraph
            ellipsis={{ rows: 5, expandable: true, tooltip: reference.answer }}
            italic
          >
            {reference.content}
          </Typography.Paragraph>
        )}
        {Boolean(reference.file_name) && (
          <Space>
            <FileSearchOutlined />
            <Typography.Text className="filePath" code ellipsis={{ tooltip: reference.file_name }}>
              {reference.file_name}
            </Typography.Text>
          </Space>
        )}
        {Boolean(reference.page_number) && (
          <Space className="relLine">
            {I18N.Chat.yeMa}
            {reference.page_number}
          </Space>
        )}
      </div>
    </Spin>
  );
  return (
    <>
      {Boolean(editData?.visible) && <EditModal data={editData} setData={setEditData} />}
      <Popover
        content={
          <ConfigProvider
            theme={{
              components: {
                Descriptions: {
                  titleMarginBottom: 0,
                  itemPaddingBottom: 0,
                },
              },
            }}
          >
            {content}
          </ConfigProvider>
        }
        destroyTooltipOnHide
        onOpenChange={props.onMouseLeaveCallback}
        open={open}
        placement="left"
        title={null}
      >
        {children}
      </Popover>
    </>
  );
};
export default RefContent;
