import { defineConfig } from 'father';

export default defineConfig({
  extends: '../../.fatherrc.base.ts',
  umd: {
    extractCSS: true,
    entry: {
      'src/index.tsx': {
        name: 'yunti-chat',
      },
    },
  },
  // prebundle: {},
});
