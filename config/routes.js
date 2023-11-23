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
        name: '数据源详情',
        path: '/data-source/detail/:id',
        component: '@/pages/DatasourceDetail',
      },
      {
        name: '数据集管理 - 列表',
        path: '/dataset',
        component: '@/pages/Dataset',
      },
      {
        name: '知识库管理',
        path: '/knowledge',
        component: '@/pages/Knowledge',
      },
      {
        name: '知识库管理',
        path: '/knowledge/create',
        component: '@/pages/Knowledge/detail',
      }
    ],
  },
];

export default routes;
