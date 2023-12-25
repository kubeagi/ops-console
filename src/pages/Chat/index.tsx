/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * Chat
 * @author songsz
 * @date 2023-12-18
 */
import { history } from '@umijs/max';
import React from 'react';

import ChatComponent from '@/pages/Chat/Chat';

interface IChat {}

const Chat: React.FC<IChat> = props => {
  return (
    <>
      <ChatComponent
        appName={(history.location.query.appName || '') as string}
        appNamespace={(history.location.query.appNamespace || '') as string}
      />
    </>
  );
};
export default Chat;
