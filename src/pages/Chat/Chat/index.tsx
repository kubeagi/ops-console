/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * Chat
 * @author songsz
 * @date 2023-12-18
 */
import { fetchEventSource } from '@/components/fetchEventSource';
import { getCvsMeta } from '@/pages/Chat/Chat/helper';
import Retry from '@/pages/Chat/Chat/retry';
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
import { getAuthData } from '@tenx-ui/auth-utils';
import { sdk } from '@yuntijs/arcadia-bff-sdk';
import classNames from 'classnames';
import { debounce } from 'lodash';
import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import './index.less';

interface Chat {
  appName: string;
  appNamespace: string;
  // refresh 变化, 触发重新拉取
  refresh?: boolean | number | string;
  // debug为true,表示临时会话, 测试应用时使用, 不保存
  debug?: boolean;
}
const safeAreaId = 'safe-area-id-not-use-in-your-code';
class RetriableError extends Error {}
class FatalError extends Error {}

const scrollToBottom = debounce(() => {
  document.querySelector(`#${safeAreaId}`)?.scrollIntoView();
}, 100);
let scrollToBottomTimeout;
const ctrl = new AbortController();
const retry = new Retry(ctrl, 3);
const Chat: React.FC<Chat> = props => {
  const [conversion, setConversion] = useState<{
    id?: string;
    loadingMsgId?: string;
    data: ChatMessage[];
  }>({ data: [] });

  const application = sdk.useGetApplication({
    name: props.appName,
    namespace: props.appNamespace,
  });
  useEffect(() => {
    if (conversion.data?.length) return;
    const app = application?.data?.Application?.getApplication;
    const meta = app?.metadata;
    const prologue = app?.prologue;
    if (meta?.name) {
      setConversion({
        ...conversion,
        data: [
          getCvsMeta(
            prologue ||
              `##### 您好，我是${meta.displayName || meta.name}${
                meta.description ? `\n\n${meta.description}` : ''
              }`,
            new Date().getTime().toString(),
            false
          ),
        ],
      });
      scrollToBottom();
    }
  }, [conversion, application]);
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
  const setLastCvsErr = useCallback(
    (err: Error) => {
      setConversion(_conversion => {
        const [first, ...rest] = _conversion.data.reverse();
        return {
          ..._conversion,
          loadingMsgId: undefined,
          data: [
            ...rest.reverse(),
            {
              ...first,
              error: {
                message: '请求出错',
                type: 'error',
                detail: err,
              },
            },
          ],
        };
      });
    },
    [setConversion]
  );
  const fetchConversion = useCallback(
    async query => {
      await fetchEventSource(`${window.location.origin}/kubeagi-apis/chat`, {
        method: 'POST',
        signal: ctrl.signal,
        openWhenHidden: true,
        headers: {
          Authorization: `bearer ${getAuthData()?.token.id_token}`,
        },
        body: JSON.stringify({
          query,
          response_mode: 'streaming',
          conversion_id: conversion?.id || '',
          app_name: props.appName,
          app_namespace: props.appNamespace,
          debug: Boolean(props.debug),
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
          const retryRes = retry.retry();
          if (retryRes === retry.abortFlag) {
            setLastCvsErr(err);
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
      ctrl.abort();
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
          getCvsMeta(input, userMsgId, true),
          getCvsMeta('', assistantMsgId, false),
        ],
      };
    });
    scrollToBottom();
    fetchConversion(input);
    setInput(undefined);
  }, [input, setInput, setConversion, fetchConversion]);
  return (
    <div className="chatComponent">
      <div
        className={classNames('chatColumn', {
          chatDebug: props.debug,
        })}
      >
        <div className="chatList">
          <ChatItemsList
            data={conversion?.data}
            renderActions={ActionsBar}
            renderMessages={{
              default: ({ id, editableContent }) => <div id={id}>{editableContent}</div>,
            }}
            renderErrorMessages={{
              error: {
                Render: ({ id, error, ...res }) => <div>{error.detail?.stack?.toString()}</div>,
              },
            }}
            loadingId={conversion.loadingMsgId}
            {...control}
          />
          <div className="safeArea" id={safeAreaId}></div>
        </div>
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
