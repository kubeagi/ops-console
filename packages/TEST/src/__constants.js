const constants = {};

/** 是否为生产环境 */
constants.IS_PROD = function applyThis() {
  return process.env.NODE_ENV === 'production';
}.apply(constants);
export const IS_PROD = constants.IS_PROD;

export default constants;
