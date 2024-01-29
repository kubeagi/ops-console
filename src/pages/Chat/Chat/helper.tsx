/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */
import { ChatMessage } from '@lobehub/ui';
import { ChatAssistant, ChatUser } from '@tenx-ui/icon';
import React from 'react';

import { Reference } from '@/pages/Chat/Chat/References';

/**
 * helper
 * @author zggmd
 * @date 2023-12-20
 */

export const getCvsMeta = (
  content: string,
  id: string,
  extra: {
    references?: Reference[];
    latency?: number;
  } = {},
  isUser?: boolean
): ChatMessage => {
  const Icon = isUser ? ChatUser : ChatAssistant;
  return {
    extra,
    content,
    createAt: 1_686_437_950_084, // 暂时没用
    updateAt: 1_686_437_950_084,
    id,
    meta: {
      avatar: (
        <div className="customAvatar">
          <Icon />
        </div>
      ),
      title: isUser ? 'You' : 'Assistant',
    },
    role: isUser ? 'user' : 'assistant',
  };
};

export const formatJson = (json: string, space: number = 2): string => {
  try {
    return JSON.stringify(JSON.parse(json), null, space);
  } catch {
    return json;
  }
};
