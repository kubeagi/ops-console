const constants = {};

/** 是否为生产环境 */
constants.IS_PROD = function applyThis() {
  return process.env.NODE_ENV === 'production';
}.apply(constants);
export const IS_PROD = constants.IS_PROD;

/** 应用路由前缀 */
constants.basename = function applyThis() {
  return '/kubeagi-portal';
}.apply(constants);
export const basename = constants.basename;

/** 是否为乾坤微前端环境 */
constants.IS_QIAN_KUN = function applyThis() {
  return window.__POWERED_BY_QIANKUN__;
}.apply(constants);
export const IS_QIAN_KUN = constants.IS_QIAN_KUN;

export default constants;
