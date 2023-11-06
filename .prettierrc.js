module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'avoid',
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [
    require.resolve('prettier-plugin-organize-imports'), // import 排序 组合 去除无用
    require.resolve('prettier-plugin-packagejson'), // package.json 里面的 key 好好排序
  ],
};
