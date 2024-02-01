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
import { FileOutlined, LoadingOutlined } from '@ant-design/icons';
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
import { Spin, Tag, UploadFile, message } from 'antd';
import classNames from 'classnames';
import { throttle } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

import { fetchEventSource } from '@/components/fetchEventSource';
import useGetCommonData from '@/components/hooks/useGetCommonData';
import ChatInputBottomAddons from '@/pages/Chat/Chat/ChatInputBottomAddons';
import PromptStarter from '@/pages/Chat/Chat/PromptStarter';
import RenderReferences, { Reference } from '@/pages/Chat/Chat/References';
import { formatJson, getCvsMeta } from '@/pages/Chat/Chat/helper';
import Retry from '@/pages/Chat/Chat/retry';
import I18N from '@/utils/kiwiI18N';
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
type TMessage = {
  id: string;
  query: string;
  answer: string;
  references: Reference[];
  latency?: number;
  documents: {
    id: string;
    name: string;
    summary: string;
  }[];
};
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
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const isDark = qiankun?.theme?.isDark;
  const [showNextGuide, setShowNextGuide] = useState(true);
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
  const [messages, messagesLoading] = useGetCommonData<TMessage[]>({
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
        .catch(() => {
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
    const defaultPrologue = I18N.template(I18N.Chat.ninHaoWoShiA, {
      val1: `${app?.metadata.displayName || app?.metadata.name}${app?.metadata.description ? `\n\n${app?.metadata.description}` : ''}`,
    });
    let cvList = [
      getCvsMeta(
        app?.prologue || defaultPrologue,
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
          getCvsMeta(
            cur.query,
            cur.id + '_query',
            cur.documents?.length
              ? {
                  fileList: cur.documents,
                }
              : null,
            true
          ),
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
      message.warning(I18N.Chat.xiTongYiChangQing);
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
                message: I18N.Chat.qingQiuChuCuo,
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
  const sendChatWithFile = useCallback(async () => {
    const formData = new FormData();
    for (const [key, value] of Object.entries({
      app_name: props.appName,
      app_namespace: props.appNamespace || '',
      conversation_id: props.conversationId || '',
      query: 'DOC:ABSTRACT',
      response_mode: 'blocking', // 目前不支持 streaming
    })) {
      formData.append(key, value);
    }
    for (const file of fileList) {
      formData.append('docs', file.originFileObj, file.originFileObj.name);
    }

    const res = await request
      .post({
        url: `/chat/conversations/docs`,
        options: {
          body: formData,
        },
      })
      .catch(() => {
        setFileList([]);
      });
    setFileList([]);
    if (!res.message_id) {
      return;
    }
    setConversation(_conversation => {
      const [first, ...rest] = _conversation.data.reverse();
      return addIndexToCvs({
        ..._conversation,
        loadingMsgId: undefined,
        data: [
          ...rest.reverse(),
          {
            ...first,
            content: res.message,
            extra: {
              ...first?.extra,
              fileParsing: false,
            },
          },
        ],
      });
    });
  }, [input, fileList, setFileList]);
  const onSend = useCallback(
    (__input: string) => {
      const _input = __input?.trim();
      if (!_input) return;
      setConversation(conversation => {
        const userMsgId = Date.now().toString();
        const assistantMsgId = (Date.now() + 10).toString();
        return addIndexToCvs({
          ...conversation,
          loadingMsgId: assistantMsgId,
          data: [
            ...conversation.data,
            getCvsMeta(
              _input,
              userMsgId,
              fileList?.length
                ? {
                    fileList: fileList.map(file => ({
                      name: file.name,
                      size: file.size,
                      type: file.type,
                    })),
                  }
                : null,
              true
            ),
            getCvsMeta(
              '',
              assistantMsgId,
              {
                fileParsing: Boolean(fileList?.length),
              },
              false
            ),
          ],
        });
      });
      scrollToBottomTimeout = setTimeout(scrollToBottom, 200);
      fileList?.length ? sendChatWithFile() : fetchConversation(_input);
      setInput('');
      setShowNextGuide(false);
    },
    [setInput, setConversation, fetchConversation, setShowNextGuide, fileList, sendChatWithFile]
  );
  const onPromptClick = useCallback(
    value => {
      onSend(value);
      setShowNextGuide(false);
    },
    [onSend, setShowNextGuide]
  );
  const onFileListChange = useCallback(
    (fileList: UploadFile[]) => {
      setFileList(fileList);
    },
    [onSend]
  );
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
              default: chat => {
                return (
                  <>
                    {chat.extra?.fileParsing && (
                      <span>
                        <Spin indicator={<LoadingOutlined spin />} />
                        <span>&nbsp;</span>
                        文档解析中
                      </span>
                    )}
                    {Boolean(chat.extra.fileList?.length) && (
                      <div>
                        {chat.extra.fileList.map((file, index) => (
                          <Tag key={index}>
                            <FileOutlined /> {file.name}
                          </Tag>
                        ))}
                      </div>
                    )}
                    {conversation.loadingMsgId !== chat.id &&
                      Boolean(chat.extra?.index) &&
                      chat.role === 'assistant' &&
                      Boolean(appData?.showRespInfo) && (
                        <div className="extraMsg">
                          {Boolean(chat.extra?.latency) && (
                            <Tag color="green">{(chat.extra?.latency / 1000).toFixed(2)}s</Tag>
                          )}
                          <Tag color="purple">
                            {I18N.template(I18N.Chat.tiaoShangXiaWen, { val1: chat.extra?.index })}
                          </Tag>
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
        {!props.conversationId && // 历史对话不展示引导
          appData?.showNextGuide && // 根据智能体个性化配置展示引导
          showNextGuide && ( // 智能体 debug 时, 问过后就不再展示引导
            <PromptStarter
              appName={props.appName}
              appNamespace={props.appNamespace}
              onPromptClick={onPromptClick}
            />
          )}
        <div className="inputArea">
          <ChatInputArea
            bottomAddons={
              <ChatInputBottomAddons
                appData={appData}
                fileList={fileList}
                input={input}
                onFileListChange={onFileListChange}
                onSend={onSend}
              />
            }
            onInput={setInput}
            onSend={onSend.bind('', input)}
            placeholder={I18N.Chat.qingShuRuWenTi}
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
