/**
 * Original code from three.js project. https://github.com/mrdoob/three.js
 * Original code published with the following license:
 *
 * The MIT License
 * 
 * Copyright &copy; 2010-2014 three.js authors
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

Zia.Vector2 = function(x, y) {
  this._x = x || 0;
  this._y = y || 0;
};

Zia.Vector2.prototype = {
  constructor: Zia.Vector2,

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

  set: function(x, y) {
    this._x = x;
    this._y = y;
    this._onChangeCallback();
    return this;
  },

  setComponent: function (index, value) {
    switch (index) {
      case 0: this.x = value; break;
      case 1: this.y = value; break;
      default: throw new Error("index is out of range: " + index);
    }
  },

  getComponent: function (index) {
    switch (index) {
      case 0: return this._x;
      case 1: return this._y;
      default: throw new Error("index is out of range: " + index);
    }
  },

  copy: function (v) {
    this._x = v._x;
    this._y = v._y;
    this._onChangeCallback();
    return this;
  },

  add: function (v) {
    this._x += v._x;
    this._y += v._y;
    this._onChangeCallback();
    return this;
  },

  addVectors: function (a, b) {
    this._x = a._x + b._x;
    this._y = a._y + b._y;
    this._onChangeCallback();
    return this;
  },

  addScalar: function (s) {
    this._x += s;
    this._y += s;
    this._onChangeCallback();
    return this;
  },

  sub: function (v, w) {
    this._x -= v._x;
    this._y -= v._y;
    this._onChangeCallback();
    return this;
  },

  subVectors: function (a, b) {
    this._x = a._x - b._x;
    this._y = a._y - b._y;
    this._onChangeCallback();
    return this;
  },
  
  multiply: function (v) {
    this._x *= v._x;
    this._y *= v._y;
    this._onChangeCallback();
    return this;
  },

  multiplyScalar: function (s) {
    this._x *= s;
    this._y *= s;
    this._onChangeCallback();
    return this;
  },

  divide: function (v) {
    this._x /= v._x;
    this._y /= v._y;
    this._onChangeCallback();
    return this;
  },

  divideScalar: function (scalar) {
    if (scalar !== 0) {
      var invScalar = 1 / scalar;
      this._x *= invScalar;
      this._y *= invScalar;
    } else {
      this._x = 0;
      this._y = 0;
    }
    this._onChangeCallback();
    return this;
  },

  min: function (v) {
    if (this._x > v._x) {
      this._x = v._x;
    }

    if (this._y > v._y ) {
      this._y = v._y;
    }

    this._onChangeCallback();

    return this;
  },

  max: function (v) {
    if (this._x < v._x) {
      this._x = v._x;
    }

    if (this._y < v._y) {
      this._y = v._y;
    }

    this._onChangeCallback();

    return this;
  },

  clamp: function (min, max) {

    // This function assumes min < max, if this assumption isn't true it will not operate correctly

    if ( this._x < min._x ) {
      this._x = min._x;
    } else if ( this._x > max._x ) {
      this._x = max._x;
    }

    if ( this._y < min._y ) {
      this._y = min._y;
    } else if ( this._y > max._y ) {
      this._y = max._y;
    }

    this._onChangeCallback();

    return this;
  },

  clampScalar: (function () {

    var min, max;

    return function (minVal, maxVal) {
      if (min === undefined) {
        min = new Zia.Vector2();
        max = new Zia.Vector2();
      }

      min.set(minVal, minVal);
      max.set(maxVal, maxVal);

      return this.clamp(min, max);
    };
    
  })(),

  floor: function () {
    this._x = Math.floor(this._x);
    this._y = Math.floor(this._y);
    this._onChangeCallback();
    return this;
  },

  ceil: function () {
    this._x = Math.ceil(this._x);
    this._y = Math.ceil(this._y);
    this._onChangeCallback();
    return this;
  },

  round: function () {
    this._x = Math.round(this._x);
    this._y = Math.round(this._y);
    this._onChangeCallback();
    return this;
  },

  roundToZero: function () {
    this._x = (this._x < 0) ? Math.ceil(this._x) : Math.floor(this._x);
    this._y = (this._y < 0) ? Math.ceil(this._y) : Math.floor(this._y);
    this._onChangeCallback();
    return this;
  },

  negate: function () {
    return this.multiplyScalar(-1);
  },

  dot: function (v) {
    return this._x * v._x + this._y * v._y;
  },

  lengthSq: function () {
    return this._x * this._x + this._y * this._y;
  },

  length: function () {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  },

  normalize: function () {
    return this.divideScalar(this.length());
  },

  distanceTo: function (v) {
    return Math.sqrt(this.distanceToSquared(v));
  },

  distanceToSquared: function (v) {
    var dx = this._x - v._x, dy = this._y - v._y;
    return dx * dx + dy * dy;
  },

  setLength: function (l) {
    var oldLength = this.length();
    if (oldLength !== 0 && l !== oldLength) {
      this.multiplyScalar(l / oldLength);
    }
    return this;
  },

  lerp: function (v, alpha) {
    this._x += (v._x - this._x) * alpha;
    this._y += (v._y - this._y) * alpha;
    this._onChangeCallback();
    return this;
  },

  equals: function( v ) {
    return ((v._x === this._x) && (v._y === this._y));
  },

  fromArray: function (array) {
    this._x = array[0];
    this._y = array[1];
    this._onChangeCallback();
    return this;
  },

  toArray: function () {
    return [this._x, this._y];
  },

  onChange: function (callback) {
    this._onChangeCallback = callback;
    return this;
  },

  _onChangeCallback: function () {},

  clone: function () {
    return new Zia.Vector2(this._x, this._y);
  },

  toJS: function () {
    return [ this._x, this._y ];
  }

};