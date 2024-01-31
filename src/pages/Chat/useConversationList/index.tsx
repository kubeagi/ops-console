/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * ConversationList
 * @author zggmd
 * @date 2023-12-26
 */
import { history } from '@@/core/history';
import { DeleteOutlined, LeftOutlined } from '@ant-design/icons';
import MessageWarn from '@tenx-ui/icon/lib/MessageWarn.js';
import { Empty } from '@tenx-ui/materials';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
// @ts-ignore
import { sdk } from '@yuntijs/arcadia-bff-sdk';
import { Button, Menu, Popconfirm, Space, Spin, Typography, message } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import useGetCommonData from '@/components/hooks/useGetCommonData';
import I18N from '@/utils/kiwiI18N';
import request from '@/utils/request';

import './index.less';

interface ConversationList {}

interface IConversation {
  id: string;
  app_name: string;
  app_namespace: string;
  started_at: string;
  updated_at: string;
  messages: {
    id: string;
    query: string;
    answer: string;
  }[];
}

export const setQueryConversationId = (conversationId?: string) => {
  const url = new URL(window.location.href);
  if (conversationId) {
    url.searchParams.set('conversationId', conversationId);
  } else {
    url.searchParams.delete('conversationId');
  }
  getUnifiedHistory().replace(url.pathname + url.search + url.hash);
};

type IUseConversationList = (newConversationId?: string) => {
  dom: React.ReactNode;
  selected: string;
};
let sureDel;
const useConversationList: IUseConversationList = newConversationId => {
  const { appName, appNamespace, conversationId } = history.location.query as {
    appName?: string;
    appNamespace?: string;
    conversationId?: string;
  };
  const application = sdk.useGetApplication({
    name: appName,
    namespace: appNamespace,
  });
  const [forceUpdate, setForceUpdate] = useReducer(x => x + 1, 0);
  const [selected, setSelected] = useState<string>(conversationId);
  useEffect(() => {
    newConversationId && setSelected(newConversationId);
  }, [setSelected, newConversationId]);
  const [conversations, conversationsLoading] = useGetCommonData<IConversation[]>({
    url: '/chat/conversations',
    method: 'post',
    options: {
      body: { app_name: appName, app_namespace: appNamespace },
    },
    refresh: `${newConversationId}-${forceUpdate}`,
    initValue: [],
    format: data =>
      data.sort((a, b) => dayjs(b.updated_at).valueOf() - dayjs(a.updated_at).valueOf()),
  });
  const selectedConversation = useMemo(() => {
    return conversations.find(cv => cv.id === selected);
  }, [conversations, selected]);

  const onCvsClick = useCallback(
    item => {
      setSelected(item.key);
      setQueryConversationId(item.key);
    },
    [setSelected]
  );
  const addConversation = useCallback(() => {
    setSelected('');
    setQueryConversationId('');
  }, [setSelected]);
  const del = useCallback(
    async id => {
      const res = await request
        .delete({
          url: `/chat/conversations/${id}`,
        })
        .catch(error => {
          //
        });
      if (res?.message === 'ok') {
        message.success(I18N.Chat.shanChuChengGong);
        setForceUpdate();
        if (id === conversationId) {
          addConversation();
        }
      }
    },
    [conversationId, addConversation]
  );
  const [currentMenu, setCurrentMenu] = useState<IConversation | null>();
  const dom = (
    <div className="conversationList">
      <Space className="space" direction="vertical">
        <div />
        {/*add padding*/}
        <div className="header">
          <LeftOutlined className="back" onClick={getUnifiedHistory().go.bind('', -1)} />
          <img
            className="avatar"
            src={application?.data?.Application?.getApplication?.metadata?.icon}
          />
          <Typography.Title
            className="title"
            ellipsis
            level={5}
            title={application?.data?.Application?.getApplication?.metadata?.displayName}
          >
            {application?.data?.Application?.getApplication?.metadata?.displayName || '-'}
          </Typography.Title>
        </div>
        <Button className="new" onClick={addConversation} type="primary">
          {I18N.Chat.xinJianDuiHua}
        </Button>
        {conversations.length > 0 ? (
          <span className="cvsList">
            <Menu
              items={conversations.map(cv => ({
                key: cv.id,
                label: (
                  <span
                    className="cvItem"
                    onMouseEnter={setCurrentMenu.bind('', cv)}
                    onMouseLeave={() => !sureDel && setCurrentMenu(null)}
                  >
                    <span className="cvTitle">
                      <Typography.Text ellipsis>{cv.messages?.[0]?.query}</Typography.Text>
                    </span>
                    <span className="time">
                      {currentMenu?.id === cv.id ? (
                        <Popconfirm
                          cancelText={I18N.Chat.quXiao}
                          description={I18N.Chat.queDingShanChuDui}
                          okText={I18N.Chat.queDing}
                          onConfirm={del.bind('', cv.id)}
                          onOpenChange={open => (sureDel = open)}
                          onPopupClick={e => e.stopPropagation()}
                          title={I18N.Chat.shanChuDuiHua}
                        >
                          <DeleteOutlined
                            className="del"
                            onClick={e => {
                              e.stopPropagation();
                              sureDel = true;
                            }}
                          />
                        </Popconfirm>
                      ) : (
                        <>
                          {dayjs(cv.updated_at).isSame(dayjs(), 'day')
                            ? I18N.Chat.jinTian
                            : dayjs(cv.updated_at).format('MM-DD')}
                        </>
                      )}
                    </span>
                  </span>
                ),
                title: cv.messages?.[0]?.query,
                icon: <MessageWarn />,
              }))}
              onClick={onCvsClick}
              selectedKeys={selected ? [selected] : []}
            />
          </span>
        ) : (
          <Spin spinning={conversationsLoading}>
            <Empty />
          </Spin>
        )}
      </Space>
    </div>
  );
  return {
    dom,
    selected,
    selectedConversation,
  };
};
export default useConversationList;
