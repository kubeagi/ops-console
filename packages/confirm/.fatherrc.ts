import { defineConfig } from 'father';

export default defineConfig({
  extends: '../../.fatherrc.base.ts',
  umd: {
    name: 'confirm',
  },
  // prebundle: {},
});
