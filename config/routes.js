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
        name: '知识库管理',
        path: '/knowledge',
        component: '@/pages/Knowledge',
      },
    ],
  },
];

export default routes;
