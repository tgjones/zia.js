/**
 * Constructs a new `Color4` object.
 *
 * @constructor
 * 
 * @param {Number} r - The value for the red component.
 * @param {Number} g - The value for the green component.
 * @param {Number} b - The value for the blue component.
 * @param {Number} a - The value for the alpha component.
 *
 * @classdesc
 * Represents a 4-component color with red, green, blue and alpha components.
 */
Zia.Color4 = function(r, g, b, a) {
  /**
   * The red component.
   * @type {Number}
   */
  this.r = r;

  /**
   * The green component.
   * @type {Number}
   */
  this.g = g;

  /**
   * The blue component.
   * @type {Number}
   */
  this.b = b;

  /**
   * The alpha component.
   * @type {Number}
   */
  this.a = a;
};

Zia.Color4.prototype = {
  copy: function(other) {
    this.r = other.r;
    this.g = other.g;
    this.b = other.b;
    this.a = other.a;
    return this;
  },

  multiplyScalar: function(s) {
    this.r *= s;
    this.g *= s;
    this.b *= s;
    return this;
  },

  toJS: function () {
    return [ this.r, this.g, this.b, this.a ];
  }
};