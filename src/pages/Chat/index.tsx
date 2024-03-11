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
import React, { useCallback, useState } from 'react';

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
  const { qiankun }: { qiankun: Record<string, any> } = useModel('qiankun');
  return (
    <div className="chatContainer">
      {conversationListDom}
      <div className="chatRight">
        <ChatComponent
          appName={appName as string}
          appNamespace={appNamespace as string}
          conversationId={selectedConversationId}
          isDark={qiankun?.theme?.isDark}
          onNewChat={onNewChat}
          refresh={selectedConversationId || selectedConversationIdEmpty}
        />
      </div>
    </div>
  );
};
export default Chat;
