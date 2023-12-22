/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * config
 *
 * @author zhangpc
 * @date 2023-07-14
 */

// 推荐使用相对地址配置 api 地址，这样可以跟生产环境保持一致
// 本地开发时可在 config.local.ts 中为 api 地址配置代理规则，解决跨域等问题
export const apiUrl = '/kubeagi-portal-api/api/v1';

const apiConfig = {
  apiUrl,
};

export default apiConfig;
