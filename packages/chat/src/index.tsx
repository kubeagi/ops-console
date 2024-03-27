/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * Chat
 * @author zggmd
 * @date 2023-12-18
 */
import { FileOutlined } from '@ant-design/icons';
import {
  ChatInputArea,
  ChatList as ChatItemsList,
  ChatListProps,
  ChatMessage,
  CopyButton,
  GradientButton,
  Highlighter,
  ThemeProvider,
  useControls,
  useCreateStore,
} from '@lobehub/ui';
// @ts-ignore
import { sdk } from '@yuntijs/arcadia-bff-sdk';
import { Spin, Tag, UploadFile, message, theme } from 'antd';
import { throttle } from 'lodash';
import { StopCircle } from 'lucide-react';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import ChatInputBottomAddons from './ChatInputBottomAddons';
import PromptStarter from './PromptStarter';
import RenderReferences, { Reference } from './References';
import LoadingText from './components/LoadingText';
import { formatJson, getCvsMeta } from './helper';
import useStyles, { GlobalStyles, useChatContainerStyles } from './index.style';
import Retry from './retry';
import { getAuthData } from './utils/auth-utils';
import { fetchEventSource } from './utils/fetchEventSource';
import useGetCommonData from './utils/hooks/useGetCommonData';
import I18N from './utils/kiwiI18N';
import request from './utils/request';

interface IChat {
  appName: string;
  appNamespace: string;
  isDark: boolean;
  // 是否是在gpts中调用
  gpts?: boolean;
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
}, 1000);
let scrollToBottomTimeout: undefined | ReturnType<typeof setTimeout>;
let shouldUpdateConversationId: boolean = false;
let ctrl: undefined | AbortController;
const retry = new Retry(ctrl, 3);

export const RootContext = createContext<{
  appName: string;
  appNamespace: string;
}>({
  appName: '',
  appNamespace: '',
});

const Chat: React.FC<IChat> = props => {
  const { styles, cx } = useStyles();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [showNextGuide, setShowNextGuide] = useState(true);
  const [conversation, setConversation] = useState<{
    id?: string;
    loadingMsgId?: string;
    data: ChatMessage[];
  }>({
    id: props.conversationId,
    data: [],
  });
  const conversationId = useMemo(() => {
    return props.conversationId || conversation.id;
  }, [props.conversationId, conversation.id]);
  const application = sdk.useGetApplication({
    name: props.appName,
    namespace: props.appNamespace,
  });
  const app = application?.data?.Application?.getApplication;
  const [messages, messagesLoading] = useGetCommonData<TMessage[]>({
    url: '/chat/messages',
    method: 'post',
    options: {
      body: {
        app_name: props.appName,
        app_namespace: props.appNamespace,
        conversation_id: conversationId,
      },
      headers: {
        namespace: props.appNamespace,
      },
    },
    initValue: [],
    resStr: 'messages',
    notFetch: !conversationId,
    // 类型为 UPLOAD 的消息, 是发送附件类的消息时单独调用了上传文件接口自动生成的消息, 应该过滤掉
    format: messages => messages?.filter(msg => msg.action !== 'UPLOAD'),
  });
  const fetchLastReference = useCallback(
    async (cId, mId) => {
      if (!mId || !cId || !app?.showRetrievalInfo) return;
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
            headers: {
              namespace: props.appNamespace,
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
    [setConversation, app?.showRetrievalInfo, props.appName, props.appNamespace]
  );
  useEffect(() => {
    if (conversation.data?.length) return;
    if (!app?.metadata.name) return;
    const defaultPrologue = I18N.template(I18N.Chat.ninHaoWoShiA, {
      val1: `${app?.metadata.displayName || app?.metadata.name}${app?.metadata.description ? `\n\n${app?.metadata.description}` : ''}`,
    });
    let cvList = [
      getCvsMeta(
        app?.prologue || defaultPrologue,
        conversationId || Date.now().toString(),
        null,
        false,
        app?.metadata
      ),
    ];
    // 存在会话id, 展示历史聊天内容
    if (conversationId) {
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
            false,
            app?.metadata
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
  }, [conversation, app, conversationId, messages, messagesLoading]);
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);
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
              extra: {
                ...first?.extra,
              },
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
  const sendChatFile = useCallback(
    async (__fileList: UploadFile[]) => {
      const _fileList = __fileList || fileList;
      const formData = new FormData();
      for (const [key, value] of Object.entries({
        app_name: props.appName,
        app_namespace: props.appNamespace || '',
        conversation_id: conversationId || '',
      })) {
        formData.append(key, value);
      }
      for (const file of _fileList) {
        formData.append('file', file.originFileObj, file.originFileObj.name);
      }
      const res = await request
        .post({
          url: `/chat/conversations/file`,
          options: {
            body: formData,
            timeout: 1000 * 60 * 10,
            headers: {
              namespace: props.appNamespace,
            },
          },
        })
        .catch(_error => {
          setFileList([]);
        });
      if (res?.conversation_id) {
        setConversation(conversation => {
          return {
            ...conversation,
            id: res.conversation_id,
          };
        });
      }
      return res;
    },
    [fileList, setFileList, setConversation, conversationId]
  );
  const fetchConversation = useCallback(
    async (query: string, __fileList: UploadFile[]) => {
      const _fileList = __fileList || fileList;
      const withDocs = Boolean(_fileList?.length);
      const body = {
        query,
        response_mode: 'streaming',
        conversation_id: conversation?.id || '',
        app_name: props.appName,
        app_namespace: props.appNamespace,
        debug: Boolean(props.debug),
      };
      if (withDocs) {
        const fileRes = await sendChatFile(_fileList);
        body.files = [fileRes?.document?.object];
        body.conversation_id = fileRes?.conversation_id;
      }
      ctrl = new AbortController();
      await fetchEventSource(`${window.location.origin}/kubeagi-apis/chat`, {
        method: 'POST',
        signal: ctrl.signal,
        openWhenHidden: true,
        headers: {
          Authorization: `bearer ${getAuthData()?.token.id_token}`,
          Namespace: props.appNamespace,
        },
        body: JSON.stringify(body),
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
        },
        onerror(err) {
          setFileList([]);
          const retryRes = retry.retry();
          if (retryRes === retry.abortFlag) {
            setLastCvsErr(err);
            throw err; // rethrow to stop the operation
          } else {
            setLastCvsErr(err);
          }
        },
        onclose() {
          setFileList([]);
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
                  },
                },
              ],
            });
          });
        },
      });
    },
    [conversation, setConversation, fileList, setFileList]
  );

  useEffect(() => {
    application.mutate();
    scrollToBottomTimeout = setTimeout(scrollToBottom, 100);
    return () => {
      ctrl?.abort();
      scrollToBottomTimeout && clearTimeout(scrollToBottomTimeout);
    };
  }, []);
  const onSend = useCallback(
    (__input: string, __fileList: UploadFile[]) => {
      const _input = __input?.trim();
      const _fileList = __fileList || fileList;
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
              _fileList?.length
                ? {
                    fileList: _fileList.map(file => ({
                      name: file.name,
                      size: file.size,
                      type: file.type,
                    })),
                  }
                : null,
              true
            ),
            getCvsMeta('', assistantMsgId, {}, false, app?.metadata),
          ],
        });
      });
      fetchConversation(_input, _fileList);
      setInput('');
      setShowNextGuide(false);
    },
    [setInput, setConversation, fetchConversation, setShowNextGuide, fileList, app]
  );
  const onPromptClick = useCallback(
    value => {
      onSend(value);
      setShowNextGuide(false);
    },
    [onSend, setShowNextGuide]
  );
  const onFileListChange = useCallback(
    async (fileList: UploadFile[]) => {
      setFileList(fileList);
      onSend(input || '总结一下', fileList);
    },
    [setFileList, input, fileList]
  );
  const stop = useCallback(() => {
    ctrl?.abort();
    setConversation(conversations => {
      return {
        ...conversations,
        loadingMsgId: undefined,
      };
    });
  }, [ctrl, setConversation]);
  return (
    <RootContext.Provider
      value={{
        appName: props.appName,
        appNamespace: props.appNamespace,
      }}
    >
      <div className={cx(styles.chatComponent, 'chatComponent')}>
        <GlobalStyles />
        <div
          className={cx(
            'chatColumn',
            props.debug && 'chatDebug',
            props.isDark && 'chatDark',
            props.gpts && 'gpts'
          )}
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
                      {!chat.content && conversation.loadingMsgId ? (
                        <LoadingText delay={400} />
                      ) : undefined}
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
                        Boolean(app?.showRespInfo) && (
                          <div className="extraMsg">
                            {Boolean(chat.extra?.latency) && (
                              <Tag color="green">{(chat.extra?.latency / 1000).toFixed(2)}s</Tag>
                            )}
                            <Tag color="purple">
                              {I18N.template(I18N.Chat.tiaoShangXiaWen, {
                                val1: chat.extra?.index,
                              })}
                            </Tag>
                          </div>
                        )}
                      {Boolean(app?.showRetrievalInfo) && (
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
          {!conversationId && // 历史对话不展示引导
            app?.showNextGuide && // 根据智能体个性化配置展示引导
            showNextGuide && ( // 智能体 debug 时, 问过后就不再展示引导
              <PromptStarter
                appName={props.appName}
                appNamespace={props.appNamespace}
                onPromptClick={onPromptClick}
              />
            )}
          {Boolean(conversation.loadingMsgId) && (
            <GradientButton
              className="stop"
              icon={<StopCircle size={12} />}
              onClick={stop}
              size="small"
              type="dashed"
            >
              {I18N.Chat.tingZhi}
            </GradientButton>
          )}
          <div className="inputArea">
            <ChatInputArea
              bottomAddons={
                <ChatInputBottomAddons
                  appData={app}
                  fileList={fileList}
                  input={input}
                  loading={Boolean(conversation.loadingMsgId)}
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
    </RootContext.Provider>
  );
};
let refreshTimeout;
let tmpRefresh;
const ChatComponent: React.FC<IChat> = props => {
  const { styles, cx } = useChatContainerStyles();
  const themeToken = theme.useToken();
  const [_refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (props.refresh === tmpRefresh) {
      return;
    }
    setRefresh(true);
    refreshTimeout = setTimeout(setRefresh.bind('', false), 500);
    tmpRefresh = props.refresh;
    ctrl?.abort(); // 正在生成的对话取消
    return () => {
      refreshTimeout && clearTimeout(refreshTimeout);
    };
  }, [setRefresh, props.refresh]);
  if (_refresh)
    return (
      <div className={cx(styles.chatSpin, 'chatSpin')}>
        <Spin spinning />
      </div>
    );
  if (!props.isDark || props.gpts) {
    return <Chat {...props} />;
  }
  // FIXME: 在ops-console 黑暗模式下必须加上lobe-ui的ThemeProvider, 才能真正的黑暗模式, 但会导致 antd的colorPrimary变成 #222222
  return (
    <ThemeProvider appearance="dark" customToken={theme => themeToken.token}>
      <Chat {...props} />
    </ThemeProvider>
  );
};
export default ChatComponent;
