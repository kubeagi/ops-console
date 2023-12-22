/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等
 */

import logo from '@/assets/img/logo.png';
import { _qiankunData } from '@/utils/helper';
import { GlobalOutlined } from '@ant-design/icons';
import { initUnifiedLinkHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import { history, RunTimeLayoutConfig } from '@umijs/max';
import { Modal, Tooltip, Typography } from 'antd';
import React from 'react';
import configProvider from '../config/config-provider';
import { getLocale, setLocale } from './i18n';
import utils from './utils/__utils';
import { basename, IS_PROD, IS_QIAN_KUN } from './__constants';

const notProdOrQiankun = !IS_PROD && !IS_QIAN_KUN;

// TODO：qiankun umi 子应用 window.routerBase 问题，目前需要手动设置一下 routerBase 的值
(window as any).routerBase = notProdOrQiankun ? '/' : basename;

export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    // console.info('app bootstrap:', props);
  },
  // 应用 render 之前触发
  async mount(props) {
    // do something here before render
    props.onGlobalStateChange((state, prev) => {
      // state: 变更后的状态; prev 变更前的状态
      // 给 app.tsx layout 使用
      _qiankunData.state = state;
      _qiankunData.setInitialState?.(state);
    }, true);
  },
  // 应用卸载之后触发
  async unmount(props) {
    // console.info('app unmount', props);
  },
};

const LOCALE_MAP = {
  'en-US': {
    key: 'en-US', // 低代码编译器
    tooltip: '切换为中文',
    change: 'zh-CN',
  },
  'zh-CN': {
    key: 'zh-CN',
    tooltip: 'Chang to English',
    change: 'en-US',
  },
};
const locale = getLocale();
const langInfo = LOCALE_MAP[locale];

const Title = ({ icon }: any) => {
  const authData = utils.getAuthData();
  const userName = authData?.user?.name || 'N/A';
  if (icon) {
    return <div style={{ lineHeight: '28px' }}>{userName.split('')?.[0]}</div>;
  }
  return <div>{userName}</div>;
};

export const getInitialState = () => _qiankunData.state;

export const layout: RunTimeLayoutConfig = initState => {
  const _theme = initState.initialState?.theme;
  initUnifiedLinkHistory(
    initState.initialState?.getHistory?.() ||
      initState.initialState?.history || {
        goBack: history.back,
        ...history,
      }
  );

  return {
    title: false,
    logo: <img alt="logo" src={logo} style={{ height: '36px' }} />,
    siderWidth: 200,
    fixedHeader: true,
    fixSiderbar: true,
    rightContentRender: false, // umi !!!
    headerRender: notProdOrQiankun ? undefined : false,
    // 如果不渲染menu，布局会发生变化，导致 bc-console 无法自动占满页面高度
    // 所以 qiankun 或 prod 下，应该渲染，但要自定义返回空内容，即 () => <></>
    // https://github.com/bestchains/bc-console/issues/52
    menuRender: notProdOrQiankun ? undefined : () => <></>,
    footerRender: false,
    avatarProps: {
      title: <Title />,
      icon: <Title icon />,
      size: 'default',
    },
    actionsRender: () => {
      return [
        <Typography.Link
          key="logout"
          onClick={() => {
            utils.removeAuthData();
            Modal.info({
              title: '退出成功',
              content: '点击确定重新登录',
              okText: '确定',
              onOk: () => window.location.reload(),
            });
          }}
        >
          退出
        </Typography.Link>,
        <Tooltip key="locale" title={langInfo.tooltip}>
          <GlobalOutlined
            onClick={() => {
              setLocale(langInfo.change);
              window.location.reload();
            }}
          />
        </Tooltip>,
      ];
    },
    menuHeaderRender: false,
    layout: notProdOrQiankun ? 'mix' : 'side',
    menu: {
      flatMenu: true,
      hideMenuWhenCollapsed: true,
      collapsedShowTitle: false,
      collapsedShowGroupTitle: true,
      defaultOpenAll: true,
      ignoreFlatMenu: true,
      type: 'group', // 'sub' | 'group';
      autoClose: false,
    },
    settings: {
      //
    },
    token: {
      colorPrimary: _theme?.colorPrimary || configProvider?.theme?.token?.colorPrimary,
      bgLayout: _theme?.colors?.['--background-color'] || '#ffffff',
      sider: {
        // #ffffff
      },
      pageContainer: {
        colorBgPageContainer: _theme?.colors?.['--background-color-body'] || '#f6f6f6',
        paddingInlinePageContainerContent: 0,
        paddingBlockPageContainerContent: 0,
      },
    },
    // 其他属性见：https://procomponents.ant.design/components/layout#prolayout
  };
};
