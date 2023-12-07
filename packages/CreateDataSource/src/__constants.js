const constants = {};

/** - */
constants.DESCRIPTION_LENGTH_REG = function applyThis() {
  return '^.{0,200}$';
}.apply(constants);
export const DESCRIPTION_LENGTH_REG = constants.DESCRIPTION_LENGTH_REG;

export default constants;
