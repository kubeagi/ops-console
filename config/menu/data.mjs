import * as React from 'react';
// ⚠️ import 时候需要指定扩展名，即加上 .js
import ComponentManagement from '@tenx-ui/icon/lib/ComponentManagement.js';

export const User = 'User';
export const TENANT_ADMIN = 'TenantAdmin';
export const PlatformAdmin = 'PlatformAdmin'; // 3
export const SystemAdmin = 'SystemAdmin'; // 2

const data = [
  {
    id: 'yunti-kubeagi-portal',
    type: 'all-product',
    text: 'KubeAGI 前端 portal',
    textEn: 'kubeagi-portal',
    column: 1000,
    icon: ComponentManagement,
    children: [
      {
        id: 'yunti-kubeagi-portal-index',
        text: 'KubeAGI 前端 portal',
        textEn: 'kubeagi-portal',
        children: [
          {
            id: 'yunti-page-zgb2o',
            text: '测试',
            textEn: '测试',
            pathname: '/test',
            tenant: false,
          },
        ],
      },
    ],
  },
];

export default data;
