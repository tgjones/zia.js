/**
 * The root Zia namespace.
 * @namespace
 */
var Zia = {

  /**
   * Returns a if not undefined, otherwise b.
   * Useful for setting a default value for a parameter.
   *
   * @param {Object} a - The parameter value.
   * @param {Object} b - The default value.
   *
   * @example
   * param = Zia.defaultValue(param, 'defaultValue');
   */
  defaultValue: function(a, b) {
    if (a !== undefined) {
      return a;
    }
    return b;
  }

};