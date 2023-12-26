/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * Chat
 * @author songsz
 * @date 2023-12-18
 */
import {
  ActionsBar,
  ChatInputArea,
  ChatList as ChatItemsList,
  ChatListProps,
  ChatMessage,
  ChatSendButton,
  Highlighter,
  useControls,
  useCreateStore,
} from '@lobehub/ui';
import { getAuthData } from '@tenx-ui/auth-utils';
import { sdk } from '@yuntijs/arcadia-bff-sdk';
import { Spin } from 'antd';
import classNames from 'classnames';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

import { fetchEventSource } from '@/components/fetchEventSource';
import { formatJson, getCvsMeta } from '@/pages/Chat/Chat/helper';
import Retry from '@/pages/Chat/Chat/retry';

import './index.less';

interface IChat {
  appName: string;
  appNamespace: string;
  // 会话id, 如果有值, 则拉取并继续该会话; 否则新建会话
  conversationId?: string;
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
const Chat: React.FC<IChat> = props => {
  const [conversation, setConversation] = useState<{
    id?: string;
    loadingMsgId?: string;
    data: ChatMessage[];
  }>({
    id: props.conversationId,
    data: [],
  });

  const application = sdk.useGetApplication({
    name: props.appName,
    namespace: props.appNamespace,
  });
  useEffect(() => {
    if (conversation.data?.length) return;
    const app = application?.data?.Application?.getApplication;
    const meta = app?.metadata;
    const prologue = app?.prologue;
    if (meta?.name) {
      setConversation({
        ...conversation,
        data: [
          getCvsMeta(
            prologue ||
              `##### 您好，我是${meta.displayName || meta.name}${
                meta.description ? `\n\n${meta.description}` : ''
              }`,
            props.conversationId || Date.now().toString(),
            false
          ),
        ],
      });
      scrollToBottom();
    }
  }, [conversation, application, props.conversationId]);
  useEffect(() => {
    application.mutate();
  }, []);
  const [input, setInput] = useState<string | undefined>();
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
      setConversation(_conversation => {
        const [first, ...rest] = _conversation.data.reverse();
        return {
          ..._conversation,
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
    [setConversation]
  );
  const fetchConversation = useCallback(
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
          conversation_id: conversation?.id || '',
          app_name: props.appName,
          app_namespace: props.appNamespace,
          // TODO: 防止每次都生成新的对话, 暂时设为true; 引入历史会话后,再修改回来
          debug: true,
          // debug: Boolean(props.debug),
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
          setConversation(_conversation => {
            return {
              ..._conversation,
              id: parsedData.conversation_id,
              data: _conversation.data.map((item, index) => {
                if (index < _conversation.data.length - 1) return item;
                const last = _conversation.data.at(-1);
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
            setLastCvsErr(err);
          }
        },
        onclose() {
          setConversation(_conversation => ({
            ..._conversation,
            loadingMsgId: undefined,
          }));
        },
      });
    },
    [conversation, setConversation]
  );

  useEffect(() => {
    scrollToBottomTimeout = setTimeout(scrollToBottom, 100);
    return () => {
      ctrl.abort();
      if (scrollToBottomTimeout) {
        clearTimeout(scrollToBottomTimeout);
      }
    };
  }, []);
  const onSend = useCallback(() => {
    if (!input) return;
    setConversation(conversation => {
      const userMsgId = Date.now().toString();
      const assistantMsgId = (Date.now() + 10).toString();
      return {
        ...conversation,
        loadingMsgId: assistantMsgId,
        data: [
          ...conversation.data,
          getCvsMeta(input, userMsgId, true),
          getCvsMeta('', assistantMsgId, false),
        ],
      };
    });
    scrollToBottom();
    fetchConversation(input);
    setInput();
  }, [input, setInput, setConversation, fetchConversation]);
  return (
    <div className="chatComponent">
      <div
        className={classNames('chatColumn', {
          chatDebug: props.debug,
        })}
      >
        <div className="chatList">
          <ChatItemsList
            data={conversation?.data}
            loadingId={conversation.loadingMsgId}
            renderActions={ActionsBar}
            renderErrorMessages={{
              error: {
                Render: error => {
                  if (typeof error?.error?.detail?.message === 'string') {
                    return (
                      <Highlighter copyButtonSize="small" language="json" type="pure">
                        {formatJson(error?.error?.detail?.message)}
                      </Highlighter>
                    );
                  }
                  return <div>{error?.detail?.stack?.toString()}</div>;
                },
              },
            }}
            renderMessages={{
              default: ({ id, editableContent }) => <div id={id}>{editableContent}</div>,
            }}
            {...control}
          />
          <div className="safeArea" id={safeAreaId}></div>
        </div>
        <div className="inputArea">
          <ChatInputArea
            bottomAddons={<ChatSendButton onSend={onSend} />}
            onInput={setInput}
            onSend={onSend}
            placeholder="请输入问题，可通过 shift+回车换行"
            value={input}
          />
        </div>
      </div>
    </div>
  );
};
let tmpRefresh;
const ChatComponent: React.FC<IChat> = props => {
  const [_refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (props.refresh === tmpRefresh) {
      return;
    }
    setRefresh(true);
    setTimeout(setRefresh.bind('', false), 500);
    tmpRefresh = props.refresh;
    ctrl.abort(); // 正在生成的对话取消
  }, [setRefresh, props.refresh]);
  if (_refresh)
    return (
      <div className="chatSpin">
        <Spin spinning />
      </div>
    );
  return <Chat {...props} />;
};
export default ChatComponent;
