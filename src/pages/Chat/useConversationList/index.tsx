/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * ConversationList
 * @author zggmd
 * @date 2023-12-26
 */
import { history } from '@@/core/history';
import MessageWarn from '@tenx-ui/icon/lib/MessageWarn.js';
import { Empty } from '@tenx-ui/materials';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
// @ts-ignore
import { sdk } from '@yuntijs/arcadia-bff-sdk';
import { Button, Menu, Space, Spin, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import useGetCommonData from '@/components/hooks/useGetCommonData';

import './index.less';

interface ConversationList {}

interface IConversation {
  id: string;
  app_name: string;
  app_namespace: string;
  started_at: string;
  updated_at: string;
  messages: {
    id: string;
    query: string;
    answer: string;
  }[];
}

export const setQueryConversationId = (conversationId?: string) => {
  const url = new URL(window.location.href);
  if (conversationId) {
    url.searchParams.set('conversationId', conversationId);
  } else {
    url.searchParams.delete('conversationId');
  }
  getUnifiedHistory().replace(url.pathname + url.search + url.hash);
};

type IUseConversationList = (newConversationId?: string) => {
  dom: React.ReactNode;
  selected: string;
};
const useConversationList: IUseConversationList = newConversationId => {
  const { appName, appNamespace, conversationId } = history.location.query as {
    appName?: string;
    appNamespace?: string;
    conversationId?: string;
  };
  const application = sdk.useGetApplication({
    name: appName,
    namespace: appNamespace,
  });
  const [selected, setSelected] = useState<string>(conversationId);
  useEffect(() => {
    newConversationId && setSelected(newConversationId);
  }, [setSelected, newConversationId]);
  const [conversations, conversationsLoading] = useGetCommonData<IConversation[]>({
    url: '/kubeagi-apis/chat/conversations',
    method: 'post',
    options: {
      body: { app_name: appName, app_namespace: appNamespace },
    },
    refresh: newConversationId,
    initValue: [],
    format: data => data.reverse(),
  });
  const selectedConversation = useMemo(() => {
    return conversations.find(cv => cv.id === selected);
  }, [conversations, selected]);

  const onCvsClick = useCallback(
    item => {
      setSelected(item.key);
      setQueryConversationId(item.key);
    },
    [setSelected]
  );
  const addConversation = useCallback(() => {
    setSelected('');
    setQueryConversationId('');
  }, [setSelected]);
  const dom = (
    <div className="conversationList">
      <Space className="space" direction="vertical">
        <div></div>
        <div className="header">
          <img
            className="avatar"
            src={application?.data?.Application?.getApplication?.metadata?.icon}
          />
          <Typography.Title
            className="title"
            ellipsis
            level={5}
            title={application?.data?.Application?.getApplication?.metadata?.displayName}
          >
            {application?.data?.Application?.getApplication?.metadata?.displayName || '-'}
          </Typography.Title>
        </div>
        <Button className="new" onClick={addConversation} type="primary">
          新建对话
        </Button>
        {conversations.length > 0 ? (
          <Menu
            items={conversations.map(cv => ({
              key: cv.id,
              label: cv.messages?.[0]?.query,
              title: cv.messages?.[0]?.query,
              icon: <MessageWarn />,
            }))}
            onClick={onCvsClick}
            selectedKeys={selected ? [selected] : []}
          />
        ) : (
          <Spin spinning={conversationsLoading}>
            <Empty />
          </Spin>
        )}
      </Space>
    </div>
  );
  return {
    dom,
    selected,
    selectedConversation,
  };
};
export default useConversationList;
