const constants = {};

/** aaa */
constants.test = function applyThis() {
  return 'aaa';
}.apply(constants);
export const test = constants.test;

export default constants;
