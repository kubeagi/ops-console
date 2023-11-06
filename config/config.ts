/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2023 TenxCloud. All Rights Reserved.
 */

/**
 * default config
 */

import { defineConfig } from '@umijs/max';
import { execSync } from 'child_process';
import { join } from 'path';
import configProvider from './config-provider';
import routes from './routes';

/**
 * get last commit hash
 */
const getLastCommitHash = () => {
  try {
    return execSync('git rev-parse HEAD').toString().trim();
  } catch (error) {
    console.warn('Get last commit hash faild');
    return '-';
  }
};

const site = 'tenxcloud.com';
const bannerFlag = `@Licensed Materials - Property of ${site}`;
const banner = `${bannerFlag}
(C) Copyright 2023~2024 ${site}. All Rights Reserved.
@date ${Date.now()}
@hash ${getLastCommitHash()}
http://${site}`;

export const alias = {
  'app-card': join(__dirname, '../packages/app-card/src'),
  TEST: join(__dirname, '../packages/TEST/src'),
};

export default defineConfig({
  alias,
  initialState: {},
  model: {},
  /**
   * @name 开启 hash 模式
   * @description 让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存。
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,
  /**
   * @name 快速热更新配置
   * @description 一个不错的热更新组件，更新时可以保留 state
   */
  fastRefresh: true,
  /**
   * @name moment2dayjs 插件
   * @description 将项目中的 moment 替换为 dayjs
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  /**
   * @name antd 插件
   * @description 内置了 babel import 插件
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {
    import: false,
    configProvider,
  },
  /**
   * @name 兼容性设置
   * @description 设置 ie11 不一定完美兼容，需要检查自己使用的所有依赖
   * @doc https://umijs.org/docs/api/config#targets
   */
  targets: {
    chrome: 49,
    firefox: 64,
    safari: 10,
    edge: 13,
    ios: 10,
    // ie: 11,
  },
  /**
   * @name moment 的国际化配置
   * @description 如果对国际化没有要求，打开之后能减少js的包大小
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  historyWithQuery: {},
  history: {
    type: 'browser',
  },
  qiankun: {
    slave: {},
  },
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  layout: {},
  routes,
  lessLoader: {
    modifyVars: {
      '@ant-prefix': 'ant',
    },
    javascriptEnabled: true,
    strictMath: false,
    math: 'parens-division',
  },
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
    },
  },
  favicons: ['/favicon.ico'],
  base: '/',
  publicPath: '/',
  define: {
    'process.env.PUBLIC_DIR': '/',
  },
  chainWebpack() {
    const [memo, { env, webpack }]: any = arguments;
    // add copyright banner
    memo.plugin('banner').use(webpack.BannerPlugin, [
      {
        banner,
        exclude: /\.svg$/,
      },
    ]);
    if (env === 'production') {
      memo.optimization.minimizer('js-terser').tap((args: any) => {
        args[0].terserOptions.format.comments = new RegExp(bannerFlag);
        return args;
      });
    }
    // console.log('webpack config: \n', memo.toString())
  },
});
