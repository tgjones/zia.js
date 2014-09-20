Zia.Color4 = function(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
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