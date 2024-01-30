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
import {
  ChatInputArea,
  ChatList as ChatItemsList,
  ChatListProps,
  ChatMessage,
  CopyButton,
  Highlighter,
  useControls,
  useCreateStore,
} from '@lobehub/ui';
import { getAuthData } from '@tenx-ui/auth-utils';
// @ts-ignore
import { sdk } from '@yuntijs/arcadia-bff-sdk';
import { Button, Flex, Spin, Tag, Tooltip, message } from 'antd';
import classNames from 'classnames';
import { throttle } from 'lodash';
import { ArrowBigUp, CornerDownLeft } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

import { fetchEventSource } from '@/components/fetchEventSource';
import useGetCommonData from '@/components/hooks/useGetCommonData';
import RenderReferences, { Reference } from '@/pages/Chat/Chat/References';
import { formatJson, getCvsMeta } from '@/pages/Chat/Chat/helper';
import Retry from '@/pages/Chat/Chat/retry';
import request from '@/utils/request';

import './index.less';

interface IChat {
  appName: string;
  appNamespace: string;
  // 会话id, 如果有值, 则拉取并继续该会话; 否则新建会话
  conversationId?: string;
  // refresh 变化, 触发重新拉取
  refresh?: boolean | number | string | symbol;
  // debug为true,表示临时会话, 测试应用时使用, 不保存
  debug?: boolean;
  // 当第一次建立新会话时, 触发该事件
  onNewChat?: (conversationId: string) => any;
}
const safeAreaId = 'safe-area-id-not-use-in-your-code';
class RetriableError extends Error {}
class FatalError extends Error {}

const addIndexToCvs = data => {
  return {
    ...data,
    data: data?.data?.map((item, index) => ({
      ...item,
      extra: {
        ...item?.extra,
        index,
      },
    })),
  };
};

const scrollToBottom = throttle(() => {
  document.querySelector(`#${safeAreaId}`)?.scrollIntoView();
}, 200);
let scrollToBottomTimeout;
let shouldUpdateConversationId: boolean = false;
const ctrl = new AbortController();
const retry = new Retry(ctrl, 3);
const Chat: React.FC<IChat> = props => {
  const { qiankun }: { qiankun: Record<string, any> } = useModel('qiankun');
  const isDark = qiankun?.theme?.isDark;
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
  const appData = application?.data?.Application?.getApplication;
  const [messages, messagesLoading] = useGetCommonData<
    { id: string; query: string; answer: string; references: Reference[]; latency?: number }[]
  >({
    url: '/chat/messages',
    method: 'post',
    options: {
      body: {
        app_name: props.appName,
        app_namespace: props.appNamespace,
        conversation_id: props.conversationId,
      },
    },
    initValue: [],
    resStr: 'messages',
    notFetch: !props.conversationId,
  });
  const fetchLastReference = useCallback(
    async (cId, mId) => {
      if (!mId || !cId || !appData?.showRetrievalInfo) return;
      const res = await request
        .post({
          url: `/chat/messages/${mId}/references`,
          options: {
            body: {
              app_name: props.appName,
              app_namespace: props.appNamespace,
              conversation_id: cId,
              message_id: mId,
            },
          },
        })
        .catch(error => {
          //
        });
      if (!res?.length) return;
      setConversation(_conversation => {
        const [first, ...rest] = _conversation.data.reverse();
        return addIndexToCvs({
          ..._conversation,
          loadingMsgId: undefined,
          data: [
            ...rest.reverse(),
            {
              ...first,
              extra: {
                ...first?.extra,
                references: res,
              },
            },
          ],
        });
      });
      scrollToBottom();
    },
    [setConversation, appData?.showRetrievalInfo, props.appName, props.appNamespace]
  );
  useEffect(() => {
    if (conversation.data?.length) return;
    const app = application?.data?.Application?.getApplication;
    let cvList = [
      getCvsMeta(
        app?.prologue ||
          `##### 您好，我是${app?.metadata.displayName || app?.metadata.name}${
            app?.metadata.description ? `\n\n${app?.metadata.description}` : ''
          }`,
        props.conversationId || Date.now().toString(),
        null,
        false
      ),
    ];
    // 存在会话id, 展示历史聊天内容
    if (props.conversationId) {
      if (messagesLoading || !messages?.length) return;
      cvList = messages?.reduce(
        (pre, cur) => [
          ...pre,
          getCvsMeta(cur.query, cur.id + '_query', null, true),
          getCvsMeta(
            cur.answer,
            cur.id + '_answer',
            { references: cur.references, latency: cur.latency },
            false
          ),
        ],
        cvList
      );
    }
    setConversation(
      addIndexToCvs({
        ...conversation,
        data: cvList,
      })
    );
    scrollToBottom();
  }, [conversation, application, props.conversationId, messages, messagesLoading]);
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
      message.warning('系统异常，请稍后重试');
      setConversation(_conversation => {
        const [first, ...rest] = _conversation.data.reverse();
        return addIndexToCvs({
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
        });
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
          debug: Boolean(props.debug),
        }),
        async onopen(response) {
          shouldUpdateConversationId = false;
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
            if (parsedData.conversation_id !== _conversation.id) {
              shouldUpdateConversationId = true;
            }
            return addIndexToCvs({
              ..._conversation,
              id: parsedData.conversation_id,
              data: _conversation.data.map((item, index) => {
                if (index < _conversation.data.length - 1) return item;
                const last = _conversation.data.at(-1);
                return {
                  ...last,
                  id: parsedData.message_id || last.id,
                  content: last.content + (parsedData?.message || ''),
                  extra: {
                    ...last?.extra,
                    latency: parsedData.latency,
                  },
                };
              }),
            });
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
          setConversation(_conversation => {
            if (shouldUpdateConversationId) {
              shouldUpdateConversationId = false;
              props.onNewChat?.(_conversation.id);
            }
            fetchLastReference(
              _conversation.id,
              // "791d25a6-7102-4f7c-afcd-29eee3624250" ||
              _conversation.data.at(-1)?.id
            );
            return addIndexToCvs({
              ..._conversation,
              loadingMsgId: undefined,
            });
          });
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
    const _input = input?.trim();
    if (!_input) return;
    setConversation(conversation => {
      const userMsgId = Date.now().toString();
      const assistantMsgId = (Date.now() + 10).toString();
      return addIndexToCvs({
        ...conversation,
        loadingMsgId: assistantMsgId,
        data: [
          ...conversation.data,
          getCvsMeta(_input, userMsgId, null, true),
          getCvsMeta('', assistantMsgId, null, false),
        ],
      });
    });
    scrollToBottomTimeout = setTimeout(scrollToBottom, 200);
    fetchConversation(_input);
    setInput('');
  }, [input, setInput, setConversation, fetchConversation]);
  return (
    <div className="chatComponent">
      <div
        className={classNames('chatColumn', {
          chatDebug: props.debug,
          chatDark: isDark,
        })}
      >
        <div className="chatList">
          <ChatItemsList
            data={conversation?.data}
            loadingId={conversation.loadingMsgId}
            renderActions={{
              default: item => <CopyButton content={item.content} size="small" />,
            }}
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
                  // @ts-ignore
                  return <div>{error?.detail?.stack?.toString()}</div>;
                },
              },
            }}
            renderMessages={{
              default: ({ id, editableContent }) => <div id={id}>{editableContent}</div>,
            }}
            renderMessagesExtra={{
              default: (chat, s) => {
                return (
                  <>
                    {conversation.loadingMsgId !== chat.id &&
                      Boolean(chat.extra?.index) &&
                      chat.role === 'assistant' &&
                      Boolean(appData?.showRespInfo) && (
                        <div className="extraMsg">
                          {Boolean(chat.extra?.latency) && (
                            <Tag color="green">{(chat.extra?.latency / 1000).toFixed(2)}s</Tag>
                          )}
                          <Tag color="purple">{chat.extra?.index}条上下文</Tag>
                        </div>
                      )}
                    {Boolean(appData?.showRetrievalInfo) && (
                      <RenderReferences chat={chat} debug={props.debug} />
                    )}
                  </>
                );
              },
            }}
            {...control}
          />
          <div className="safeArea" id={safeAreaId}></div>
        </div>
        <div className="inputArea">
          <ChatInputArea
            bottomAddons={
              <Flex align="center" className="sendAction" gap="large" justify="end">
                <span className="keyBindings">
                  <CornerDownLeft size={12} />
                  <span>发送 / </span>
                  <ArrowBigUp size={12} />
                  <CornerDownLeft size={12} />
                  <span>换行</span>
                </span>
                <Tooltip title={appData?.llm ? '' : '暂未关联模型服务，请先关联模型服务再进行对话'}>
                  <Button disabled={!appData?.llm} onClick={onSend} type="primary">
                    发送
                  </Button>
                </Tooltip>
              </Flex>
            }
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
let refreshTimeout;
let tmpRefresh;
const ChatComponent: React.FC<IChat> = props => {
  const [_refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (props.refresh === tmpRefresh) {
      return;
    }
    setRefresh(true);
    refreshTimeout = setTimeout(setRefresh.bind('', false), 500);
    tmpRefresh = props.refresh;
    ctrl.abort(); // 正在生成的对话取消
    return () => {
      refreshTimeout && clearTimeout(refreshTimeout);
    };
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
