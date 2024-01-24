/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * local config
 */
import { defineConfig } from '@umijs/max';

import apiConfig from './api';

export default defineConfig({
  // 这里可为 api 地址配置代理规则，解决跨域等问题
  // 配置详见 https://github.com/chimurai/http-proxy-middleware#http-proxy-options
  proxy: {
    '/kubeagi-apis': {
      /** 目标地址 */
      target: apiConfig.devProxyTarget,
      /** 是否改变请求的 origin 为目标地址 */
      changeOrigin: true,
      /** https 证书校验 */
      secure: false,
      /** 是否代理 websocket */
      ws: false,
      /** 重写目标路径，一般用于去除手动添加的路径前缀 */
      // pathRewrite: { '^/prefix-need-to-remove': '' },
    },
    // 可配置多条代理规则，格式参考上面
    // '/api': {},
  },
});
