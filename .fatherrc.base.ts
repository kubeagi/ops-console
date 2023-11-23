import { defineConfig } from 'father';
import { join } from 'path';

export const alias = {
  KubeAGIUpload: join(__dirname, './packages/KubeAGIUpload/src'),
};

export default defineConfig({
  alias,
  umd: {
    entry: 'src',
    sourcemap: true,
    externals: {
      lodash: 'var window._',
      dayjs: 'var window.dayjs',
      moment: 'var window.moment',
      react: 'var window.React',
      'react-dom': 'var window.ReactDOM',
      'prop-types': 'var window.PropTypes',
      antd: 'var window.antd',
      '@ant-design/icons': 'var window.icons',
      '@tenx-ui/materials': 'var window.TenxUiMaterials',
      '@tenx-ui/auth-utils': 'var window.authUtils',
    },
  },
  esm: {
    input: 'src', // 默认编译目录
    platform: 'browser', // 默认构建为 Browser 环境的产物
    // transformer: 'babel', // 默认使用 babel 以提供更好的兼容性
  },
});
