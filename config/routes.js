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
        name: '数据源详情',
        path: '/data-source/detail/:id',
        component: '@/pages/DatasourceDetail',
      },
    ],
  },
];

export default routes;
