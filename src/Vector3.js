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

Zia.Vector3 = function(x, y, z) {
  this._x = x || 0;
  this._y = y || 0;
  this._z = z || 0;
};

Zia.Vector3.prototype = {

  constructor: Zia.Vector3,

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

  get z() {
    return this._z;
  },

  set z(v) {
    this._z = v;
    this._onChangeCallback();
  },

  set: function(x, y, z) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._onChangeCallback();
    return this;
  },

  setComponent: function(index, value) {
    switch (index) {
      case 0: this.x = value; break;
      case 1: this.y = value; break;
      case 2: this.z = value; break;
      default: throw new Error("index is out of range: " + index);
    }
  },

  getComponent: function(index) {
    switch (index) {
      case 0: return this._x;
      case 1: return this._y;
      case 2: return this._z;
      default: throw new Error("index is out of range: " + index);
    }
  },

  copy: function (v) {
    this._x = v._x;
    this._y = v._y;
    this._z = v._z;

    this._onChangeCallback();

    return this;
  },

  add: function(v) {
    this._x += v._x;
    this._y += v._y;
    this._z += v._z;

    this._onChangeCallback();

    return this;
  },

  addScalar: function (s) {
    this._x += s;
    this._y += s;
    this._z += s;

    this._onChangeCallback();

    return this;
  },

  addVectors: function(a, b) {
    this._x = a._x + b._x;
    this._y = a._y + b._y;
    this._z = a._z + b._z;

    this._onChangeCallback();

    return this;
  },

  sub: function (v) {
    this._x -= v._x;
    this._y -= v._y;
    this._z -= v._z;

    this._onChangeCallback();

    return this;
  },

  subVectors: function(a, b) {
    this._x = a._x - b._x;
    this._y = a._y - b._y;
    this._z = a._z - b._z;

    this._onChangeCallback();

    return this;
  },

  multiply: function(v) {
    this._x *= v._x;
    this._y *= v._y;
    this._z *= v._z;

    this._onChangeCallback();

    return this;
  },

  multiplyScalar: function(scalar) {
    this._x *= scalar;
    this._y *= scalar;
    this._z *= scalar;

    this._onChangeCallback();

    return this;
  },

  multiplyVectors: function(a, b) {
    this._x = a._x * b._x;
    this._y = a._y * b._y;
    this._z = a._z * b._z;

    this._onChangeCallback();

    return this;
  },

  applyEuler: function() {

    var quaternion;

    return function (euler) {
      if (quaternion === undefined)
        quaternion = new Zia.Quaternion();

      this.applyQuaternion(quaternion.setFromEuler(euler));

      return this;
    };

  }(),

  applyAxisAngle: function() {

    var quaternion;

    return function (axis, angle) {

      if ( quaternion === undefined ) quaternion = new Zia.Quaternion();

      this.applyQuaternion( quaternion.setFromAxisAngle( axis, angle ) );

      return this;

    };

  }(),

  applyMatrix3: function ( m ) {

    var x = this._x;
    var y = this._y;
    var z = this._z;

    var e = m.elements;

    this._x = e[0] * x + e[3] * y + e[6] * z;
    this._y = e[1] * x + e[4] * y + e[7] * z;
    this._z = e[2] * x + e[5] * y + e[8] * z;

    this._onChangeCallback();

    return this;

  },

  applyMatrix4: function ( m ) {

    // input: Zia.Matrix4 affine matrix

    var x = this._x, y = this._y, z = this._z;

    var e = m.elements;

    this._x = e[0] * x + e[4] * y + e[8]  * z + e[12];
    this._y = e[1] * x + e[5] * y + e[9]  * z + e[13];
    this._z = e[2] * x + e[6] * y + e[10] * z + e[14];

    this._onChangeCallback();

    return this;

  },

  applyProjection: function ( m ) {

    // input: Zia.Matrix4 projection matrix

    var x = this._x, y = this._y, z = this._z;

    var e = m.elements;
    var d = 1 / ( e[3] * x + e[7] * y + e[11] * z + e[15] ); // perspective divide

    this._x = ( e[0] * x + e[4] * y + e[8]  * z + e[12] ) * d;
    this._y = ( e[1] * x + e[5] * y + e[9]  * z + e[13] ) * d;
    this._z = ( e[2] * x + e[6] * y + e[10] * z + e[14] ) * d;

    this._onChangeCallback();

    return this;

  },

  applyQuaternion: function ( q ) {

    var x = this._x;
    var y = this._y;
    var z = this._z;

    var qx = q._x;
    var qy = q._y;
    var qz = q._z;
    var qw = q._w;

    // calculate quat * vector

    var ix =  qw * x + qy * z - qz * y;
    var iy =  qw * y + qz * x - qx * z;
    var iz =  qw * z + qx * y - qy * x;
    var iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat

    this._x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    this._y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    this._z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

    this._onChangeCallback();

    return this;

  },

  transformDirection: function ( m ) {

    // input: Zia.Matrix4 affine matrix
    // vector interpreted as a direction

    var x = this._x, y = this._y, z = this._z;

    var e = m.elements;

    this._x = e[0] * x + e[4] * y + e[8]  * z;
    this._y = e[1] * x + e[5] * y + e[9]  * z;
    this._z = e[2] * x + e[6] * y + e[10] * z;

    this._onChangeCallback();

    this.normalize();

    return this;

  },

  divide: function ( v ) {
    this._x /= v._x;
    this._y /= v._y;
    this._z /= v._z;

    this._onChangeCallback();

    return this;
  },

  divideScalar: function ( scalar ) {
    if ( scalar !== 0 ) {
      var invScalar = 1 / scalar;
      this._x *= invScalar;
      this._y *= invScalar;
      this._z *= invScalar;
    } else {
      this._x = 0;
      this._y = 0;
      this._z = 0;
    }

    this._onChangeCallback();

    return this;
  },

  min: function ( v ) {

    if ( this._x > v._x ) {
      this._x = v._x;
    }

    if ( this._y > v._y ) {
      this._y = v._y;
    }

    if ( this._z > v._z ) {
      this._z = v._z;
    }

    this._onChangeCallback();

    return this;

  },

  max: function ( v ) {

    if ( this._x < v._x ) {
      this._x = v._x;
    }

    if ( this._y < v._y ) {
      this._y = v._y;
    }

    if ( this._z < v._z ) {
      this._z = v._z;
    }

    this._onChangeCallback();

    return this;

  },

  clamp: function ( min, max ) {

    // This function assumes min < max, if this assumption isn't true it will not operate correctly

    if (this._x < min._x) {
      this._x = min._x;
    } else if (this._x > max._x) {
      this._x = max._x;
    }

    if (this._y < min._y) {
      this._y = min._y;
    } else if (this._y > max._y) {
      this._y = max._y;
    }

    if (this._z < min._z) {
      this._z = min._z;
    } else if (this._z > max._z) {
      this._z = max._z;
    }

    this._onChangeCallback();

    return this;

  },

  clampScalar: (function () {

    var min, max;

    return function (minVal, maxVal) {
      if (min === undefined) {
        min = new Zia.Vector3();
        max = new Zia.Vector3();
      }

      min.set(minVal, minVal, minVal);
      max.set(maxVal, maxVal, maxVal);

      return this.clamp(min, max);
    };

  })(),

  floor: function () {

    this._x = Math.floor(this._x);
    this._y = Math.floor(this._y);
    this._z = Math.floor(this._z);

    this._onChangeCallback();

    return this;
  },

  ceil: function () {

    this._x = Math.ceil(this._x);
    this._y = Math.ceil(this._y);
    this._z = Math.ceil(this._z);

    this._onChangeCallback();

    return this;

  },

  round: function () {

    this._x = Math.round(this._x);
    this._y = Math.round(this._y);
    this._z = Math.round(this._z);

    this._onChangeCallback();

    return this;

  },

  roundToZero: function () {

    this._x = (this._x < 0) ? Math.ceil(this._x) : Math.floor(this._x);
    this._y = (this._y < 0) ? Math.ceil(this._y) : Math.floor(this._y);
    this._z = (this._z < 0) ? Math.ceil(this._z) : Math.floor(this._z);

    this._onChangeCallback();

    return this;

  },

  negate: function () {

    return this.multiplyScalar(-1);

  },

  dot: function ( v ) {

    return this._x * v._x + this._y * v._y + this._z * v._z;

  },

  lengthSq: function () {

    return this._x * this._x + this._y * this._y + this._z * this._z;

  },

  length: function () {

    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);

  },

  lengthManhattan: function () {

    return Math.abs(this._x) + Math.abs(this._y) + Math.abs(this._z);

  },

  normalize: function () {

    return this.divideScalar(this.length());

  },

  setLength: function ( l ) {

    var oldLength = this.length();

    if (oldLength !== 0 && l !== oldLength) {
      this.multiplyScalar(l / oldLength);
    }

    return this;

  },

  lerp: function ( v, alpha ) {

    this._x += (v._x - this._x) * alpha;
    this._y += (v._y - this._y) * alpha;
    this._z += (v._z - this._z) * alpha;

    this._onChangeCallback();

    return this;

  },

  cross: function ( v ) {

    var x = this._x, y = this._y, z = this._z;

    this._x = y * v._z - z * v._y;
    this._y = z * v._x - x * v._z;
    this._z = x * v._y - y * v._x;

    this._onChangeCallback();

    return this;

  },

  crossVectors: function(a, b) {

    var ax = a._x, ay = a._y, az = a._z;
    var bx = b._x, by = b._y, bz = b._z;

    this._x = ay * bz - az * by;
    this._y = az * bx - ax * bz;
    this._z = ax * by - ay * bx;

    this._onChangeCallback();

    return this;

  },

  projectOnVector: function() {

    var v1, dot;

    return function(vector) {
      if (v1 === undefined)
        v1 = new Zia.Vector3();

      v1.copy(vector).normalize();

      dot = this.dot(v1);

      return this.copy(v1).multiplyScalar(dot);
    };

  }(),

  projectOnPlane: function () {

    var v1;

    return function ( planeNormal ) {

      if ( v1 === undefined ) v1 = new Zia.Vector3();

      v1.copy( this ).projectOnVector( planeNormal );

      return this.sub( v1 );

    }

  }(),

  reflect: function () {

    // reflect incident vector off plane orthogonal to normal
    // normal is assumed to have unit length

    var v1;

    return function ( normal ) {

      if ( v1 === undefined ) v1 = new Zia.Vector3();

      return this.sub( v1.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

    }

  }(),

  angleTo: function (v) {

    var theta = this.dot(v) / (this.length() * v.length());

    // clamp, to handle numerical problems

    return Math.acos(Zia.Math.clamp(theta, -1, 1));

  },

  distanceTo: function (v) {

    return Math.sqrt(this.distanceToSquared(v));

  },

  distanceToSquared: function ( v ) {

    var dx = this._x - v._x;
    var dy = this._y - v._y;
    var dz = this._z - v._z;

    return dx * dx + dy * dy + dz * dz;

  },

  setFromMatrixPosition: function ( m ) {

    this._x = m.elements[12];
    this._y = m.elements[13];
    this._z = m.elements[14];

    this._onChangeCallback();

    return this;

  },

  setFromMatrixScale: function ( m ) {

    var sx = this.set(m.elements[0], m.elements[1], m.elements[ 2]).length();
    var sy = this.set(m.elements[4], m.elements[5], m.elements[ 6]).length();
    var sz = this.set(m.elements[8], m.elements[9], m.elements[10]).length();

    this._x = sx;
    this._y = sy;
    this._z = sz;

    this._onChangeCallback();

    return this;

  },

  setFromMatrixColumn: function (index, matrix) {

    var offset = index * 4;

    var me = matrix.elements;

    this._x = me[offset];
    this._y = me[offset + 1];
    this._z = me[offset + 2];

    this._onChangeCallback();

    return this;

  },

  equals: function ( v ) {

    return ((v._x === this._x) && (v._y === this._y) && (v._z === this._z));

  },

  fromArray: function(array) {
    this._x = array[0];
    this._y = array[1];
    this._z = array[2];

    this._onChangeCallback();

    return this;
  },

  toArray: function () {
    return [this._x, this._y, this._z];
  },

  onChange: function (callback) {
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

  clone: function() {
    return new Zia.Vector3(this._x, this._y, this._z);
  },

  toJS: function () {
    return [ this._x, this._y, this._z ];
  }

};