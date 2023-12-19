/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2023 TenxCloud. All Rights Reserved.
 */

/**
 * Chat
 * @author songsz
 * @date 2023-12-18
 */
import { constants } from '@/pages/Chat/Chat/helper';
import { UserOutlined } from '@ant-design/icons';
import {
  ActionsBar,
  ChatInputArea,
  ChatList as ChatItemsList,
  ChatListProps,
  ChatMessage,
  ChatSendButton,
  useControls,
  useCreateStore,
} from '@lobehub/ui';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { debounce } from 'lodash';
import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import './index.less';

interface Chat {
  appName: string;
  appNamespace: string;
}

class RetriableError extends Error {}
class FatalError extends Error {}

const scrollToBottom = debounce(() => {
  window.scrollTo(0, document.body.scrollHeight);
}, 100);
let scrollToBottomTimeout;
const ctrl = new AbortController();

const Chat: React.FC<Chat> = props => {
  const [conversion, setConversion] = useState<{
    id?: string;
    loadingMsgId?: string;
    data: ChatMessage[];
  }>({ data: [] });
  const [input, setInput] = useState<string>();
  const store = useCreateStore();
  const control: ChatListProps | any = useControls(
    {
      showTitle: false,
      type: {
        options: ['doc', 'chat'],
        value: 'chat',
      },
    },
    { store }
  );
  const fetchConversion = useCallback(
    async query => {
      await fetchEventSource(`${window.location.origin}/kubeagi-apis/chat`, {
        method: 'POST',
        signal: ctrl.signal,
        body: JSON.stringify({
          query,
          response_mode: 'streaming',
          conversion_id: conversion?.id || '',
          app_name: props.appName,
          app_namespace: props.appNamespace,
        }),
        async onopen(response) {
          if (response.ok) {
            return; // everything's good
          } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
            // client-side errors are usually non-retriable:
            throw new FatalError();
          } else {
            throw new RetriableError();
          }
        },
        onmessage(event) {
          const parsedData = JSON.parse(event.data);
          setConversion(_conversion => {
            return {
              ..._conversion,
              id: parsedData.conversion_id,
              data: _conversion.data.map((item, index) => {
                if (index < _conversion.data.length - 1) return item;
                const last = _conversion.data[_conversion.data.length - 1];
                return {
                  ...last,
                  content: last.content + (parsedData?.message || ''),
                };
              }),
            };
          });
          scrollToBottom();
        },
        onerror(err) {
          if (err instanceof FatalError) {
            throw err; // rethrow to stop the operation
          } else {
            // do nothing to automatically retry. You can also
            // return a specific retry interval here.
          }
        },
        onclose() {
          setConversion(_conversion => ({
            ..._conversion,
            loadingMsgId: undefined,
          }));
        },
      });
    },
    [conversion, setConversion]
  );

  useEffect(() => {
    scrollToBottomTimeout = setTimeout(scrollToBottom, 100);
    return () => {
      scrollToBottomTimeout && clearTimeout(scrollToBottomTimeout);
    };
  }, []);
  const onSend = useCallback(() => {
    if (!input) return;
    setConversion(conversion => {
      const userMsgId = new Date().getTime().toString();
      const assistantMsgId = (new Date().getTime() + 10).toString();
      return {
        ...conversion,
        loadingMsgId: assistantMsgId,
        data: [
          ...conversion.data,
          {
            content: input,
            createAt: 1_686_437_950_084,
            extra: {},
            id: userMsgId,
            meta: {
              avatar: constants.userAvatar,
              title: 'You',
            },
            role: 'user',
            updateAt: 1_686_437_950_084,
          },
          {
            content: '',
            createAt: 1_686_538_950_084,
            extra: {},
            id: assistantMsgId,
            meta: {
              avatar: constants.assistantAvatar,
              backgroundColor: '#E8DA5A',
              title: 'Assistant',
            },
            role: 'assistant',
            updateAt: 1_686_538_950_084,
          },
        ],
      };
    });
    scrollToBottom();
    fetchConversion(input);
    setInput(undefined);
  }, [input, setInput, setConversion, fetchConversion]);
  return (
    <div className="chatComponent">
      <div className="chatColumn">
        <div className="chatList">
          <ChatItemsList
            data={conversion?.data}
            renderActions={ActionsBar}
            renderMessages={{
              default: ({ id, editableContent }) => <div id={id}>{editableContent}</div>,
            }}
            loadingId={conversion.loadingMsgId}
            {...control}
          />
        </div>
        <div className="safeArea"></div>
        <div className="inputArea">
          <ChatInputArea
            value={input}
            onInput={setInput}
            onSend={onSend}
            placeholder="请输入问题，可通过 shift+回车换行"
            bottomAddons={<ChatSendButton onSend={onSend} />}
          />
        </div>
      </div>
    </div>
  );
};
export default Chat;
