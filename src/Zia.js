var Zia = {};

Object.prototype.reverseMerge = function (source) {
  for (var key in source) {
    if (source.hasOwnProperty(key) && !(key in this)) {
      this[key] = source[key];
    }
  }
  return this;
};