import * as React from 'react';
// ⚠️ import 时候需要指定扩展名，即加上 .js
import KubeagiModelService from '@tenx-ui/icon/lib/KubeagiModelService.js';
import KubeagiDataSource from '@tenx-ui/icon/lib/KubeagiDataSource.js';
import KubeagiDataset from '@tenx-ui/icon/lib/KubeagiDataset.js';
import KubeagiDataHandle from '@tenx-ui/icon/lib/KubeagiDataHandle.js';
import KubeagiKnowledge from '@tenx-ui/icon/lib/KubeagiKnowledge.js';
import KubeagiModelApp from '@tenx-ui/icon/lib/KubeagiModelApp.js';
import KubebbWarehouse from '@tenx-ui/icon/lib/KubebbWarehouse.js';
import MessageWarn from '@tenx-ui/icon/lib/MessageWarn.js';

export const User = 'User';
export const TENANT_ADMIN = 'TenantAdmin';
export const PlatformAdmin = 'PlatformAdmin'; // 3
export const SystemAdmin = 'SystemAdmin'; // 2

const data = [
  {
    id: 'yunti-kubeagi-portal',
    type: 'all-product',
    text: 'LLMOps',
    textEn: 'LLMOps',
    column: 1,
    icon: KubeagiModelService,
    children: [
      {
        id: 'yunti-kubeagi-portal-data',
        text: '数据管理',
        textEn: '数据管理',
        children: [
          {
            id: 'yunti-kubeagi-portal-data-source',
            text: '数据源',
            textEn: '数据源',
            icon: KubeagiDataSource,
            pathname: '/data-source',
            tenant: true,
            project: true,
          },
          {
            id: 'yunti-kubeagi-portal-dataset',
            text: '数据集',
            textEn: '数据集',
            icon: KubeagiDataset,
            pathname: '/dataset',
            tenant: true,
            project: true,
          },
          {
            id: 'yunti-kubeagi-portal-data-handle',
            text: '数据处理',
            textEn: '数据处理',
            icon: KubeagiDataHandle,
            pathname: '/data-handle',
            tenant: true,
            project: true,
          },
          {
            id: 'yunti-kubeagi-portal-knowledge',
            text: '知识库',
            textEn: '知识库',
            icon: KubeagiKnowledge,
            pathname: '/knowledge',
            tenant: true,
            project: true,
          },
        ],
      },
      {
        id: 'yunti-kubeagi-portal-model',
        text: '模型管理',
        textEn: '模型管理',
        children: [
          {
            id: 'yunti-kubeagi-portal-model-warehouse',
            text: '模型仓库',
            textEn: '模型仓库',
            icon: KubebbWarehouse,
            pathname: '/model-warehouse',
            tenant: true,
            project: true,
          },
          {
            id: 'yunti-kubeagi-portal-model-service',
            text: '模型服务',
            textEn: '模型服务',
            icon: KubeagiModelService,
            pathname: '/model-service',
            tenant: true,
            project: true,
          },
        ],
      },
      {
        id: 'yunti-kubeagi-portal-app',
        text: '应用管理',
        textEn: '应用管理',
        children: [
          {
            id: 'yunti-kubeagi-portal-model-app',
            text: '模型应用',
            textEn: '模型应用',
            icon: KubeagiModelApp,
            pathname: '/model-app',
            tenant: true,
            project: true,
          },
          {
            id: 'yunti-kubeagi-portal-chat',
            text: '对话管理',
            textEn: '对话管理',
            icon: MessageWarn,
            pathname: '/chat',
            tenant: true,
            project: true,
          },
        ],
      },
    ],
  },
];

export default data;
