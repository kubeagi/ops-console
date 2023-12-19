/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2023 TenxCloud. All Rights Reserved.
 */

/**
 * Chat
 * @author songsz
 * @date 2023-12-18
 */
import ChatComponent from '@/pages/Chat/Chat';
import * as React from 'react';

interface Chat {}

const Chat: React.FC<Chat> = props => {
  return (
    <>
      <ChatComponent appName="base-chat-english-teacher" appNamespace="arcadia" />
    </>
  );
};
export default Chat;
