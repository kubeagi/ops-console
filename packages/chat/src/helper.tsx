/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */
import { ChatMessage } from '@lobehub/ui';
import React from 'react';

import { Reference } from './References';
import ChatAssistant from './assets/icons/ChatAssistant';
import ChatUser from './assets/icons/ChatUser';

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
    fileList?: {
      name: string;
      size?: number;
      type?: string;
      [key: string]: any;
    }[];
  } = {},
  isUser?: boolean,
  assistantMeta?: any
): ChatMessage => {
  const Icon = isUser ? ChatUser : ChatAssistant;
  return {
    extra,
    content,
    createAt: 1_686_437_950_084, // 暂时没用
    updateAt: 1_686_437_950_084,
    id,
    meta: {
      avatar:
        isUser || (!isUser && !assistantMeta.icon) ? (
          <div className="customAvatar">
            <Icon height={32} width={32} />
          </div>
        ) : (
          <img alt={assistantMeta.displayName || assistantMeta.name} src={assistantMeta.icon} />
        ),
      title: isUser ? 'You' : assistantMeta.displayName || assistantMeta.name || 'Assistant',
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
