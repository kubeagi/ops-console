/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * prod config
 */

import { defineConfig } from '@umijs/max';
import * as constants from './constants.json';

const { basename } = constants;
const publicPath = basename + '-public/';

export default defineConfig({
  hash: true,
  publicPath,
  outputPath: './dist' + publicPath,
  define: {
    'process.env.PUBLIC_DIR': publicPath,
  },
  jsMinifier: 'terser',
  jsMinifierOptions: {},
  base: basename + '/',
  extraBabelPlugins: ['transform-react-remove-prop-types'],
  theme: {},
  metas: [
    {
      name: 'keywords',
      content: 'Hyperledger,Fabric,Kubernetes,Operator',
    },
    {
      name: 'description',
      content: 'Console for best chain',
    },
  ],
  scripts: [],
  links: [{ rel: 'shortcut icon', type: 'image/x-icon', href: '/profile/img/favicon.ico' }],
});
