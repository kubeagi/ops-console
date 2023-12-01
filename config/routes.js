const routes = [
  {
    name: 'kubeagi-portal',
    path: '/',
    component: '@/layouts',
    routes: [
      {
        name: '测试',
        path: '/test',
        component: '@/pages/Test',
      },
      {
        name: '数据处理',
        path: '/data-handle',
        component: '@/pages/DataHandleList',
      },
      {
        path: '/data-handle/create',
        component: '@/pages/CreateDataHandle',
      },
      {
        name: '数据处理详情',
        path: '/data-handle/detail/:id',
        hideInMenu: true,
        component: '@/pages/DataHandleDetail',
      },
      {
        name: '数据源管理',
        path: '/data-source',
        component: '@/pages/DataSource',
      },
      {
        path: '/data-source/create',
        component: '@/pages/DataSourceCreate',
      },
      {
        path: '/data-source/detail/:id',
        component: '@/pages/DatasourceDetail',
      },
      {
        name: '数据集管理 - 列表',
        path: '/dataset',
        component: '@/pages/Dataset',
      },
      {
        name: '数据集管理 - 数据集详情',
        path: '/dataset/detail/:id',
        component: '@/pages/DatasetDetail',
      },
      {
        name: '数据集管理 - 版本详情',
        path: '/dataset/detail/:id/version/:versionId',
        component: '@/pages/DatasetVersionDetail',
      },
      {
        path: '/dataset/create',
        component: '@/pages/DataSetCreate',
      },
      {
        name: '知识库管理',
        path: '/knowledge',
        component: '@/pages/Knowledge',
      },
      {
        path: '/knowledge/create',
        component: '@/pages/KnowledgeCreate',
      },
      {
        path: '/knowledge/detail/:name',
        component: '@/pages/KnowledgeDetail',
      },
      {
        name: '模型仓库',
        path: '/model-warehouse',
        component: '@/pages/ModelWarehouseList',
      },
      {
        path: '/model-warehouse/create',
        component: '@/pages/ModelWarehouseCreate',
      },
      {
        path: '/model-service/detail/:name',
        component: '@/pages/ModelServiceDetail',
      },
      {
        path: '/model-warehouse/detail/:name',
        component: '@/pages/ModelWarehouseDetail',
      },
      {
        path: '/model-warehouse/edit/:name',
        component: '@/pages/ModelWarehouseEdit',
      },
    ],
  },
];

export default routes;
