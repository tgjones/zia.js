Zia.Viewport = function(x, y, width, height, minDepth, maxDepth) {
  this._x = x;
  this._y = y;
  this._width = width;
  this._height = height;
  this._minDepth = (minDepth !== undefined) ? minDepth : 0.0;
  this._maxDepth = (maxDepth !== undefined) ? maxDepth : 1.0;
};

Zia.Viewport.prototype = {
  get x() {
    return this._x;
  },

  set x(v) {
    this._x = v;
    this._onChangeCallback();
  },

  get y() {
    return this._y;
  },

  set y(v) {
    this._y = v;
    this._onChangeCallback();
  },

  get width() {
    return this._width;
  },

  set width(v) {
    this._width = v;
    this._onChangeCallback();
  },

  get height() {
    return this._height;
  },

  set height(v) {
    this._height = v;
    this._onChangeCallback();
  },

  get minDepth() {
    return this._minDepth;
  },

  set minDepth(v) {
    this._minDepth = v;
    this._onChangeCallback();
  },

  get maxDepth() {
    return this._maxDepth;
  },

  set maxDepth(v) {
    this._maxDepth = v;
    this._onChangeCallback();
  },

  get aspectRatio() {
    if (this._height == 0 || this._width == 0)
      return 0;
    return this._width / this._height;
  },

  set: function(x, y, width, height, minDepth, maxDepth) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    if (minDepth !== undefined) {
      this._minDepth = minDepth;
    }
    if (maxDepth !== undefined) {
      this._maxDepth = maxDepth;
    }

    this._onChangeCallback();
  },

  onChange: function ( callback ) {
    this._onChangeCallback = callback;
    return this;
  },

  _onChangeCallback: function () {},

  suppressChangeCallback: function (func) {
    var temp = this._onChangeCallback;
    this._onChangeCallback = function () { };
    func();
    this._onChangeCallback = temp;
  },
};