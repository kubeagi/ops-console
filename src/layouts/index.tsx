import { useQiankunGlobalState } from '@/utils/helper';
import { useModel } from '@@/exports';
import { Outlet } from '@umijs/max';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import React from 'react';
import configProvider from '../../config/config-provider';
import { getLocale } from '../i18n';
import { IS_QIAN_KUN } from '../__constants';

const Layout: React.FC = () => {
  // 调用一次即可
  useQiankunGlobalState();
  // 获取 dock-app 数据使用 useModel('qiankun')
  const { qiankun } = useModel('qiankun');
  const locale = getLocale().toLowerCase();
  if (IS_QIAN_KUN && !qiankun?.theme) return <></>;
  return (
    <ConfigProvider
      theme={{
        token: {
          ...(configProvider?.theme?.token || {}),
          colorPrimary: qiankun?.theme?.colorPrimary || configProvider?.theme.token.colorPrimary,
        },
        algorithm: qiankun?.theme?.isDark ? theme.darkAlgorithm : undefined,
      }}
      locale={locale === 'zh-cn' ? zhCN : enUS}
    >
      <Outlet />
    </ConfigProvider>
  );
};

export default Layout;
