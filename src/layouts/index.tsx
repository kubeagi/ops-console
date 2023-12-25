import { useModel } from '@@/exports';
import { Outlet } from '@umijs/max';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import React from 'react';

import { useQiankunGlobalState } from '@/utils/helper';

import configProvider from '../../config/config-provider';
import { IS_QIAN_KUN } from '../__constants';
import { getLocale } from '../i18n';

const Layout: React.FC = () => {
  // 调用一次即可
  useQiankunGlobalState();
  // 获取 dock-app 数据使用 useModel('qiankun')
  const { qiankun }: { qiankun: Record<string, any> } = useModel('qiankun');
  const locale = getLocale().toLowerCase();
  if (IS_QIAN_KUN && !qiankun?.theme) return <></>;
  return (
    <ConfigProvider
      locale={locale === 'zh-cn' ? zhCN : enUS}
      theme={{
        token: {
          ...configProvider?.theme?.token,
          colorPrimary: qiankun?.theme?.colorPrimary || configProvider?.theme.token.colorPrimary,
        },
        algorithm: qiankun?.theme?.isDark ? theme.darkAlgorithm : undefined,
      }}
    >
      <Outlet />
    </ConfigProvider>
  );
};

export default Layout;
