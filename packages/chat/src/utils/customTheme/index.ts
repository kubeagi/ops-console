/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2024 KubeAGI. All Rights Reserved.
 */

/**
 * index
 * @author zggmd
 * @date 2024-03-07
 */
import { createInstance } from 'antd-style';

interface YuntiChatToken {
  chatMaxWidth: string;
}

export const { createStyles, ThemeProvider, createGlobalStyle } = createInstance<YuntiChatToken>({
  key: 'yunti-chat',
  prefixCls: 'yunti-chat-antd',
  speedy: false,
  hashPriority: 'low',
});

export const chatMaxWidth = '876px';
