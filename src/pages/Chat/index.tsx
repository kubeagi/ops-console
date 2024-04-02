/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * Chat
 * @author zggmd
 * @date 2023-12-18
 */
import { useModel } from '@@/exports';
import { history } from '@umijs/max';
import ChatComponent from '@yuntijs/chat';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import useConversationList, { setQueryConversationId } from '@/pages/Chat/useConversationList';

import './index.less';

interface IChat {}

const selectedConversationIdEmpty = Symbol('selectedConversationIdEmpty');

const Chat: React.FC<IChat> = props => {
  const { appName, appNamespace } = history.location.query;
  const [newConversationId, setNewConversationId] = useState<string>();
  const { dom: conversationListDom, selected: selectedConversationId } =
    useConversationList(newConversationId);
  const onNewChat = useCallback(
    id => {
      setQueryConversationId(id);
      setNewConversationId(id);
    },
    [setNewConversationId]
  );

  // Fix new conversation force refresh experience issue
  const refresh = useMemo(() => {
    if (!selectedConversationId) {
      return '';
    }
    if (newConversationId) {
      return '';
    }
    return selectedConversationId;
  }, [newConversationId, selectedConversationId]);
  useEffect(() => {
    if (
      newConversationId &&
      selectedConversationId &&
      newConversationId !== selectedConversationId
    ) {
      setNewConversationId();
    }
  }, [newConversationId, selectedConversationId, setNewConversationId]);

  const { qiankun }: { qiankun: Record<string, any> } = useModel('qiankun');
  return (
    <div className="chatContainer">
      {conversationListDom}
      <div className="chatRight">
        <ChatComponent
          appName={appName as string}
          appNamespace={appNamespace as string}
          conversationId={selectedConversationId}
          gpts
          isDark={qiankun?.theme?.isDark}
          onNewChat={onNewChat}
          refresh={refresh}
        />
      </div>
    </div>
  );
};
export default Chat;
