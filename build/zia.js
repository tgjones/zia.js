var Zia = {};

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

Zia.Quaternion = function (x, y, z, w) {
  this._x = x || 0;
  this._y = y || 0;
  this._z = z || 0;
  this._w = ( w !== undefined ) ? w : 1;
};

Zia.Quaternion.prototype = {

  constructor: Zia.Quaternion,

  get x() {
    return this._x;
  },

  set x(value) {
    this._x = value;
    this._onChangeCallback();
  },

  get y() {
    return this._y;
  },

  set y(value) {
    this._y = value;
    this._onChangeCallback();
  },

  get z() {
    return this._z;
  },

  set z(value) {
    this._z = value;
    this._onChangeCallback();
  },

  get w() {
    return this._w;
  },

  set w(value) {
    this._w = value;
    this._onChangeCallback();
  },

  set: function (x, y, z, w) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;

    this._onChangeCallback();

    return this;
  },

  copy: function ( quaternion ) {
    this._x = quaternion._x;
    this._y = quaternion._y;
    this._z = quaternion._z;
    this._w = quaternion._w;
    this._onChangeCallback();
    return this;
  },

  setFromEuler: function ( euler, update ) {

    // http://www.mathworks.com/matlabcentral/fileexchange/
    //  20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
    //  content/SpinCalc.m

    var c1 = Math.cos( euler._x / 2 );
    var c2 = Math.cos( euler._y / 2 );
    var c3 = Math.cos( euler._z / 2 );
    var s1 = Math.sin( euler._x / 2 );
    var s2 = Math.sin( euler._y / 2 );
    var s3 = Math.sin( euler._z / 2 );

    if ( euler.order === 'XYZ' ) {

      this._x = s1 * c2 * c3 + c1 * s2 * s3;
      this._y = c1 * s2 * c3 - s1 * c2 * s3;
      this._z = c1 * c2 * s3 + s1 * s2 * c3;
      this._w = c1 * c2 * c3 - s1 * s2 * s3;

    } else if ( euler.order === 'YXZ' ) {

      this._x = s1 * c2 * c3 + c1 * s2 * s3;
      this._y = c1 * s2 * c3 - s1 * c2 * s3;
      this._z = c1 * c2 * s3 - s1 * s2 * c3;
      this._w = c1 * c2 * c3 + s1 * s2 * s3;

    } else if ( euler.order === 'ZXY' ) {

      this._x = s1 * c2 * c3 - c1 * s2 * s3;
      this._y = c1 * s2 * c3 + s1 * c2 * s3;
      this._z = c1 * c2 * s3 + s1 * s2 * c3;
      this._w = c1 * c2 * c3 - s1 * s2 * s3;

    } else if ( euler.order === 'ZYX' ) {

      this._x = s1 * c2 * c3 - c1 * s2 * s3;
      this._y = c1 * s2 * c3 + s1 * c2 * s3;
      this._z = c1 * c2 * s3 - s1 * s2 * c3;
      this._w = c1 * c2 * c3 + s1 * s2 * s3;

    } else if ( euler.order === 'YZX' ) {

      this._x = s1 * c2 * c3 + c1 * s2 * s3;
      this._y = c1 * s2 * c3 + s1 * c2 * s3;
      this._z = c1 * c2 * s3 - s1 * s2 * c3;
      this._w = c1 * c2 * c3 - s1 * s2 * s3;

    } else if ( euler.order === 'XZY' ) {

      this._x = s1 * c2 * c3 - c1 * s2 * s3;
      this._y = c1 * s2 * c3 - s1 * c2 * s3;
      this._z = c1 * c2 * s3 + s1 * s2 * c3;
      this._w = c1 * c2 * c3 + s1 * s2 * s3;

    }

    if ( update !== false ) this._onChangeCallback();

    return this;

  },

  setFromAxisAngle: function ( axis, angle ) {

    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

    // assumes axis is normalized

    var halfAngle = angle / 2, s = Math.sin( halfAngle );

    this._x = axis.x * s;
    this._y = axis.y * s;
    this._z = axis.z * s;
    this._w = Math.cos( halfAngle );

    this._onChangeCallback();

    return this;

  },

  setFromRotationMatrix: function ( m ) {

    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    var te = m.elements,

      m11 = te[0], m12 = te[4], m13 = te[8],
      m21 = te[1], m22 = te[5], m23 = te[9],
      m31 = te[2], m32 = te[6], m33 = te[10],

      trace = m11 + m22 + m33,
      s;

    if ( trace > 0 ) {

      s = 0.5 / Math.sqrt( trace + 1.0 );

      this._w = 0.25 / s;
      this._x = ( m32 - m23 ) * s;
      this._y = ( m13 - m31 ) * s;
      this._z = ( m21 - m12 ) * s;

    } else if ( m11 > m22 && m11 > m33 ) {

      s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

      this._w = (m32 - m23 ) / s;
      this._x = 0.25 * s;
      this._y = (m12 + m21 ) / s;
      this._z = (m13 + m31 ) / s;

    } else if ( m22 > m33 ) {

      s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

      this._w = (m13 - m31 ) / s;
      this._x = (m12 + m21 ) / s;
      this._y = 0.25 * s;
      this._z = (m23 + m32 ) / s;

    } else {

      s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

      this._w = ( m21 - m12 ) / s;
      this._x = ( m13 + m31 ) / s;
      this._y = ( m23 + m32 ) / s;
      this._z = 0.25 * s;

    }

    this._onChangeCallback();

    return this;

  },

  setFromUnitVectors: function () {

    // http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final

    // assumes direction vectors vFrom and vTo are normalized

    var v1, r;

    var EPS = 0.000001;

    return function( vFrom, vTo ) {

      if ( v1 === undefined ) v1 = new Zia.Vector3();

      r = vFrom.dot( vTo ) + 1;

      if ( r < EPS ) {

        r = 0;

        if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

          v1.set( - vFrom.y, vFrom.x, 0 );

        } else {

          v1.set( 0, - vFrom.z, vFrom.y );

        }

      } else {

        v1.crossVectors( vFrom, vTo );

      }

      this._x = v1.x;
      this._y = v1.y;
      this._z = v1.z;
      this._w = r;

      this.normalize();

      return this;

    }

  }(),

  inverse: function () {

    this.conjugate().normalize();

    return this;

  },

  conjugate: function () {

    this._x *= -1;
    this._y *= -1;
    this._z *= -1;

    this._onChangeCallback();

    return this;

  },

  lengthSq: function () {

    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

  },

  length: function () {

    return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

  },

  normalize: function () {

    var l = this.length();

    if ( l === 0 ) {

      this._x = 0;
      this._y = 0;
      this._z = 0;
      this._w = 1;

    } else {

      l = 1 / l;

      this._x = this._x * l;
      this._y = this._y * l;
      this._z = this._z * l;
      this._w = this._w * l;

    }

    this._onChangeCallback();

    return this;

  },

  multiply: function (q) {
    return this.multiplyQuaternions(this, q);
  },

  multiplyQuaternions: function (a, b) {

    // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

    var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
    var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

    this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

    this._onChangeCallback();

    return this;

  },

  slerp: function ( qb, t ) {

    var x = this._x, y = this._y, z = this._z, w = this._w;

    // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

    var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

    if ( cosHalfTheta < 0 ) {

      this._w = -qb._w;
      this._x = -qb._x;
      this._y = -qb._y;
      this._z = -qb._z;

      cosHalfTheta = -cosHalfTheta;

    } else {

      this.copy( qb );

    }

    if ( cosHalfTheta >= 1.0 ) {

      this._w = w;
      this._x = x;
      this._y = y;
      this._z = z;

      return this;

    }

    var halfTheta = Math.acos( cosHalfTheta );
    var sinHalfTheta = Math.sqrt( 1.0 - cosHalfTheta * cosHalfTheta );

    if ( Math.abs( sinHalfTheta ) < 0.001 ) {

      this._w = 0.5 * ( w + this._w );
      this._x = 0.5 * ( x + this._x );
      this._y = 0.5 * ( y + this._y );
      this._z = 0.5 * ( z + this._z );

      return this;

    }

    var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
    ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

    this._w = ( w * ratioA + this._w * ratioB );
    this._x = ( x * ratioA + this._x * ratioB );
    this._y = ( y * ratioA + this._y * ratioB );
    this._z = ( z * ratioA + this._z * ratioB );

    this._onChangeCallback();

    return this;

  },

  equals: function ( quaternion ) {

    return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

  },

  fromArray: function ( array ) {

    this._x = array[ 0 ];
    this._y = array[ 1 ];
    this._z = array[ 2 ];
    this._w = array[ 3 ];

    this._onChangeCallback();

    return this;

  },

  toArray: function () {

    return [ this._x, this._y, this._z, this._w ];

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

  clone: function () {
    return new Zia.Quaternion( this._x, this._y, this._z, this._w );
  },

  toJS: function () {
    return [ this._x, this._y, this._z, this._w ];
  }

};

Zia.Quaternion.slerp = function (qa, qb, qm, t) {
  return qm.copy( qa ).slerp(qb, t);
}


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

  cross: function ( v, w ) {

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

Zia.Euler = function ( x, y, z, order ) {

  this._x = x || 0;
  this._y = y || 0;
  this._z = z || 0;
  this._order = order || Zia.Euler.DefaultOrder;

};

Zia.Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

Zia.Euler.DefaultOrder = 'XYZ';

Zia.Euler.prototype = {

  constructor: Zia.Euler,

  _x: 0, _y: 0, _z: 0, _order: Zia.Euler.DefaultOrder,

  get x () {

    return this._x;

  },

  set x ( value ) {

    this._x = value;
    this.onChangeCallback();

  },

  get y () {

    return this._y;

  },

  set y ( value ) {

    this._y = value;
    this.onChangeCallback();

  },

  get z () {

    return this._z;

  },

  set z ( value ) {

    this._z = value;
    this.onChangeCallback();

  },

  get order () {

    return this._order;

  },

  set order ( value ) {

    this._order = value;
    this.onChangeCallback();

  },

  set: function ( x, y, z, order ) {

    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order || this._order;

    this.onChangeCallback();

    return this;

  },

  copy: function ( euler ) {

    this._x = euler._x;
    this._y = euler._y;
    this._z = euler._z;
    this._order = euler._order;

    this.onChangeCallback();

    return this;

  },

  setFromRotationMatrix: function ( m, order ) {

    var clamp = Zia.Math.clamp;

    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    var te = m.elements;
    var m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
    var m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
    var m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

    order = order || this._order;

    if ( order === 'XYZ' ) {

      this._y = Math.asin( clamp( m13, - 1, 1 ) );

      if ( Math.abs( m13 ) < 0.99999 ) {

        this._x = Math.atan2( - m23, m33 );
        this._z = Math.atan2( - m12, m11 );

      } else {

        this._x = Math.atan2( m32, m22 );
        this._z = 0;

      }

    } else if ( order === 'YXZ' ) {

      this._x = Math.asin( - clamp( m23, - 1, 1 ) );

      if ( Math.abs( m23 ) < 0.99999 ) {

        this._y = Math.atan2( m13, m33 );
        this._z = Math.atan2( m21, m22 );

      } else {

        this._y = Math.atan2( - m31, m11 );
        this._z = 0;

      }

    } else if ( order === 'ZXY' ) {

      this._x = Math.asin( clamp( m32, - 1, 1 ) );

      if ( Math.abs( m32 ) < 0.99999 ) {

        this._y = Math.atan2( - m31, m33 );
        this._z = Math.atan2( - m12, m22 );

      } else {

        this._y = 0;
        this._z = Math.atan2( m21, m11 );

      }

    } else if ( order === 'ZYX' ) {

      this._y = Math.asin( - clamp( m31, - 1, 1 ) );

      if ( Math.abs( m31 ) < 0.99999 ) {

        this._x = Math.atan2( m32, m33 );
        this._z = Math.atan2( m21, m11 );

      } else {

        this._x = 0;
        this._z = Math.atan2( - m12, m22 );

      }

    } else if ( order === 'YZX' ) {

      this._z = Math.asin( clamp( m21, - 1, 1 ) );

      if ( Math.abs( m21 ) < 0.99999 ) {

        this._x = Math.atan2( - m23, m22 );
        this._y = Math.atan2( - m31, m11 );

      } else {

        this._x = 0;
        this._y = Math.atan2( m13, m33 );

      }

    } else if ( order === 'XZY' ) {

      this._z = Math.asin( - clamp( m12, - 1, 1 ) );

      if ( Math.abs( m12 ) < 0.99999 ) {

        this._x = Math.atan2( m32, m22 );
        this._y = Math.atan2( m13, m11 );

      } else {

        this._x = Math.atan2( - m23, m33 );
        this._y = 0;

      }

    } else {

      console.warn( 'Zia.Euler: .setFromRotationMatrix() given unsupported order: ' + order )

    }

    this._order = order;

    this.onChangeCallback();

    return this;

  },

  setFromQuaternion: function ( q, order, update ) {

    var clamp = Zia.Math.clamp;

    // q is assumed to be normalized

    // http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m

    var sqx = q.x * q.x;
    var sqy = q.y * q.y;
    var sqz = q.z * q.z;
    var sqw = q.w * q.w;

    order = order || this._order;

    if ( order === 'XYZ' ) {

      this._x = Math.atan2( 2 * ( q.x * q.w - q.y * q.z ), ( sqw - sqx - sqy + sqz ) );
      this._y = Math.asin(  clamp( 2 * ( q.x * q.z + q.y * q.w ), - 1, 1 ) );
      this._z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw + sqx - sqy - sqz ) );

    } else if ( order ===  'YXZ' ) {

      this._x = Math.asin(  clamp( 2 * ( q.x * q.w - q.y * q.z ), - 1, 1 ) );
      this._y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw - sqx - sqy + sqz ) );
      this._z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw - sqx + sqy - sqz ) );

    } else if ( order === 'ZXY' ) {

      this._x = Math.asin(  clamp( 2 * ( q.x * q.w + q.y * q.z ), - 1, 1 ) );
      this._y = Math.atan2( 2 * ( q.y * q.w - q.z * q.x ), ( sqw - sqx - sqy + sqz ) );
      this._z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw - sqx + sqy - sqz ) );

    } else if ( order === 'ZYX' ) {

      this._x = Math.atan2( 2 * ( q.x * q.w + q.z * q.y ), ( sqw - sqx - sqy + sqz ) );
      this._y = Math.asin(  clamp( 2 * ( q.y * q.w - q.x * q.z ), - 1, 1 ) );
      this._z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw + sqx - sqy - sqz ) );

    } else if ( order === 'YZX' ) {

      this._x = Math.atan2( 2 * ( q.x * q.w - q.z * q.y ), ( sqw - sqx + sqy - sqz ) );
      this._y = Math.atan2( 2 * ( q.y * q.w - q.x * q.z ), ( sqw + sqx - sqy - sqz ) );
      this._z = Math.asin(  clamp( 2 * ( q.x * q.y + q.z * q.w ), - 1, 1 ) );

    } else if ( order === 'XZY' ) {

      this._x = Math.atan2( 2 * ( q.x * q.w + q.y * q.z ), ( sqw - sqx + sqy - sqz ) );
      this._y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw + sqx - sqy - sqz ) );
      this._z = Math.asin(  clamp( 2 * ( q.z * q.w - q.x * q.y ), - 1, 1 ) );

    } else {

      console.warn( 'Zia.Euler: .setFromQuaternion() given unsupported order: ' + order )

    }

    this._order = order;

    if ( update !== false ) this.onChangeCallback();

    return this;

  },

  reorder: function () {

    // WARNING: this discards revolution information -bhouston

    var q = new Zia.Quaternion();

    return function ( newOrder ) {

      q.setFromEuler( this );
      this.setFromQuaternion( q, newOrder );

    };


  }(),

  equals: function ( euler ) {

    return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

  },

  fromArray: function ( array ) {

    this._x = array[ 0 ];
    this._y = array[ 1 ];
    this._z = array[ 2 ];
    if ( array[ 3 ] !== undefined ) this._order = array[ 3 ];

    this.onChangeCallback();

    return this;

  },

  toArray: function () {

    return [ this._x, this._y, this._z, this._order ];

  },

  onChange: function ( callback ) {

    this.onChangeCallback = callback;

    return this;

  },

  onChangeCallback: function () {},

  clone: function () {

    return new Zia.Euler( this._x, this._y, this._z, this._order );

  }

};

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

Zia.Math = {

  /*!
  Math.uuid.js (v1.4)
  http://www.broofa.com
  mailto:robert@broofa.com

  Copyright (c) 2010 Robert Kieffer
  Dual licensed under the MIT and GPL licenses.
  */
  generateUUID: (function() {
    // Private array of chars to use
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    return function (len, radix) {
      var chars = CHARS, uuid = [], i;
      radix = radix || chars.length;

      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
      } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random()*16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
          }
        }
      }

      return uuid.join('');
    };
  })(),

  // Clamp value to range <a, b>

  clamp: function (x, a, b) {
    return ( x < a ) ? a : ( ( x > b ) ? b : x );
  }

};

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

Zia.Matrix4 = function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

  this.elements = new Float32Array( 16 );

  // TODO: if n11 is undefined, then just set to identity, otherwise copy all other values into matrix
  //   we should not support semi specification of Matrix4, it is just weird.

  var te = this.elements;

  te[ 0 ] = ( n11 !== undefined ) ? n11 : 1; te[ 4 ] = n12 || 0; te[ 8 ] = n13 || 0; te[ 12 ] = n14 || 0;
  te[ 1 ] = n21 || 0; te[ 5 ] = ( n22 !== undefined ) ? n22 : 1; te[ 9 ] = n23 || 0; te[ 13 ] = n24 || 0;
  te[ 2 ] = n31 || 0; te[ 6 ] = n32 || 0; te[ 10 ] = ( n33 !== undefined ) ? n33 : 1; te[ 14 ] = n34 || 0;
  te[ 3 ] = n41 || 0; te[ 7 ] = n42 || 0; te[ 11 ] = n43 || 0; te[ 15 ] = ( n44 !== undefined ) ? n44 : 1;

};

Zia.Matrix4.prototype = {

  constructor: Zia.Matrix4,

  set: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

    var te = this.elements;

    te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
    te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
    te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
    te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

    return this;

  },

  identity: function () {

    this.set(

      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1

    );

    return this;

  },

  copy: function ( m ) {

    this.elements.set( m.elements );

    return this;

  },

  extractPosition: function ( m ) {

    console.warn( 'ZiaMatrix4: .extractPosition() has been renamed to .copyPosition().' );
    return this.copyPosition( m );

  },

  copyPosition: function ( m ) {

    var te = this.elements;
    var me = m.elements;

    te[ 12 ] = me[ 12 ];
    te[ 13 ] = me[ 13 ];
    te[ 14 ] = me[ 14 ];

    return this;

  },

  extractRotation: function () {

    var v1 = new Zia.Vector3();

    return function ( m ) {

      var te = this.elements;
      var me = m.elements;

      var scaleX = 1 / v1.set( me[ 0 ], me[ 1 ], me[ 2 ] ).length();
      var scaleY = 1 / v1.set( me[ 4 ], me[ 5 ], me[ 6 ] ).length();
      var scaleZ = 1 / v1.set( me[ 8 ], me[ 9 ], me[ 10 ] ).length();

      te[ 0 ] = me[ 0 ] * scaleX;
      te[ 1 ] = me[ 1 ] * scaleX;
      te[ 2 ] = me[ 2 ] * scaleX;

      te[ 4 ] = me[ 4 ] * scaleY;
      te[ 5 ] = me[ 5 ] * scaleY;
      te[ 6 ] = me[ 6 ] * scaleY;

      te[ 8 ] = me[ 8 ] * scaleZ;
      te[ 9 ] = me[ 9 ] * scaleZ;
      te[ 10 ] = me[ 10 ] * scaleZ;

      return this;

    };

  }(),

  makeRotationFromEuler: function ( euler ) {

    if ( euler instanceof Zia.Euler === false ) {

      console.error( 'Zia.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );

    }

    var te = this.elements;

    var x = euler.x, y = euler.y, z = euler.z;
    var a = Math.cos( x ), b = Math.sin( x );
    var c = Math.cos( y ), d = Math.sin( y );
    var e = Math.cos( z ), f = Math.sin( z );

    if ( euler.order === 'XYZ' ) {

      var ae = a * e, af = a * f, be = b * e, bf = b * f;

      te[ 0 ] = c * e;
      te[ 4 ] = - c * f;
      te[ 8 ] = d;

      te[ 1 ] = af + be * d;
      te[ 5 ] = ae - bf * d;
      te[ 9 ] = - b * c;

      te[ 2 ] = bf - ae * d;
      te[ 6 ] = be + af * d;
      te[ 10 ] = a * c;

    } else if ( euler.order === 'YXZ' ) {

      var ce = c * e, cf = c * f, de = d * e, df = d * f;

      te[ 0 ] = ce + df * b;
      te[ 4 ] = de * b - cf;
      te[ 8 ] = a * d;

      te[ 1 ] = a * f;
      te[ 5 ] = a * e;
      te[ 9 ] = - b;

      te[ 2 ] = cf * b - de;
      te[ 6 ] = df + ce * b;
      te[ 10 ] = a * c;

    } else if ( euler.order === 'ZXY' ) {

      var ce = c * e, cf = c * f, de = d * e, df = d * f;

      te[ 0 ] = ce - df * b;
      te[ 4 ] = - a * f;
      te[ 8 ] = de + cf * b;

      te[ 1 ] = cf + de * b;
      te[ 5 ] = a * e;
      te[ 9 ] = df - ce * b;

      te[ 2 ] = - a * d;
      te[ 6 ] = b;
      te[ 10 ] = a * c;

    } else if ( euler.order === 'ZYX' ) {

      var ae = a * e, af = a * f, be = b * e, bf = b * f;

      te[ 0 ] = c * e;
      te[ 4 ] = be * d - af;
      te[ 8 ] = ae * d + bf;

      te[ 1 ] = c * f;
      te[ 5 ] = bf * d + ae;
      te[ 9 ] = af * d - be;

      te[ 2 ] = - d;
      te[ 6 ] = b * c;
      te[ 10 ] = a * c;

    } else if ( euler.order === 'YZX' ) {

      var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

      te[ 0 ] = c * e;
      te[ 4 ] = bd - ac * f;
      te[ 8 ] = bc * f + ad;

      te[ 1 ] = f;
      te[ 5 ] = a * e;
      te[ 9 ] = - b * e;

      te[ 2 ] = - d * e;
      te[ 6 ] = ad * f + bc;
      te[ 10 ] = ac - bd * f;

    } else if ( euler.order === 'XZY' ) {

      var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

      te[ 0 ] = c * e;
      te[ 4 ] = - f;
      te[ 8 ] = d * e;

      te[ 1 ] = ac * f + bd;
      te[ 5 ] = a * e;
      te[ 9 ] = ad * f - bc;

      te[ 2 ] = bc * f - ad;
      te[ 6 ] = b * e;
      te[ 10 ] = bd * f + ac;

    }

    // last column
    te[ 3 ] = 0;
    te[ 7 ] = 0;
    te[ 11 ] = 0;

    // bottom row
    te[ 12 ] = 0;
    te[ 13 ] = 0;
    te[ 14 ] = 0;
    te[ 15 ] = 1;

    return this;

  },

  setRotationFromQuaternion: function ( q ) {

    console.warn( 'Zia.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().' );

    return this.makeRotationFromQuaternion( q );

  },

  makeRotationFromQuaternion: function ( q ) {

    var te = this.elements;

    var x = q.x, y = q.y, z = q.z, w = q.w;
    var x2 = x + x, y2 = y + y, z2 = z + z;
    var xx = x * x2, xy = x * y2, xz = x * z2;
    var yy = y * y2, yz = y * z2, zz = z * z2;
    var wx = w * x2, wy = w * y2, wz = w * z2;

    te[ 0 ] = 1 - ( yy + zz );
    te[ 4 ] = xy - wz;
    te[ 8 ] = xz + wy;

    te[ 1 ] = xy + wz;
    te[ 5 ] = 1 - ( xx + zz );
    te[ 9 ] = yz - wx;

    te[ 2 ] = xz - wy;
    te[ 6 ] = yz + wx;
    te[ 10 ] = 1 - ( xx + yy );

    // last column
    te[ 3 ] = 0;
    te[ 7 ] = 0;
    te[ 11 ] = 0;

    // bottom row
    te[ 12 ] = 0;
    te[ 13 ] = 0;
    te[ 14 ] = 0;
    te[ 15 ] = 1;

    return this;

  },

  lookAt: function () {

    var x = new Zia.Vector3();
    var y = new Zia.Vector3();
    var z = new Zia.Vector3();

    return function ( eye, target, up ) {

      var te = this.elements;

      z.subVectors( eye, target ).normalize();

      if ( z.length() === 0 ) {

        z.z = 1;

      }

      x.crossVectors( up, z ).normalize();

      if ( x.length() === 0 ) {

        z.x += 0.0001;
        x.crossVectors( up, z ).normalize();

      }

      y.crossVectors( z, x );


      te[ 0 ] = x.x; te[ 4 ] = y.x; te[ 8 ] = z.x;
      te[ 1 ] = x.y; te[ 5 ] = y.y; te[ 9 ] = z.y;
      te[ 2 ] = x.z; te[ 6 ] = y.z; te[ 10 ] = z.z;

      return this;

    };

  }(),

  multiply: function ( m, n ) {

    if ( n !== undefined ) {

      console.warn( 'Zia.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.' );
      return this.multiplyMatrices( m, n );

    }

    return this.multiplyMatrices( this, m );

  },

  multiplyMatrices: function ( a, b ) {

    var ae = a.elements;
    var be = b.elements;
    var te = this.elements;

    var a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
    var a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
    var a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
    var a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

    var b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
    var b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
    var b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
    var b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

    te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return this;

  },

  multiplyToArray: function ( a, b, r ) {

    var te = this.elements;

    this.multiplyMatrices( a, b );

    r[ 0 ] = te[ 0 ]; r[ 1 ] = te[ 1 ]; r[ 2 ] = te[ 2 ]; r[ 3 ] = te[ 3 ];
    r[ 4 ] = te[ 4 ]; r[ 5 ] = te[ 5 ]; r[ 6 ] = te[ 6 ]; r[ 7 ] = te[ 7 ];
    r[ 8 ]  = te[ 8 ]; r[ 9 ]  = te[ 9 ]; r[ 10 ] = te[ 10 ]; r[ 11 ] = te[ 11 ];
    r[ 12 ] = te[ 12 ]; r[ 13 ] = te[ 13 ]; r[ 14 ] = te[ 14 ]; r[ 15 ] = te[ 15 ];

    return this;

  },

  multiplyScalar: function ( s ) {

    var te = this.elements;

    te[ 0 ] *= s; te[ 4 ] *= s; te[ 8 ] *= s; te[ 12 ] *= s;
    te[ 1 ] *= s; te[ 5 ] *= s; te[ 9 ] *= s; te[ 13 ] *= s;
    te[ 2 ] *= s; te[ 6 ] *= s; te[ 10 ] *= s; te[ 14 ] *= s;
    te[ 3 ] *= s; te[ 7 ] *= s; te[ 11 ] *= s; te[ 15 ] *= s;

    return this;

  },

  multiplyVector3: function ( vector ) {

    console.warn( 'Zia.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.' );
    return vector.applyProjection( this );

  },

  multiplyVector4: function ( vector ) {

    console.warn( 'Zia.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.' );
    return vector.applyMatrix4( this );

  },

  multiplyVector3Array: function ( a ) {

    console.warn( 'Zia.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.' );
    return this.applyToVector3Array( a );

  },

  applyToVector3Array: function () {

    var v1 = new Zia.Vector3();

    return function ( array, offset, length ) {

      if ( offset === undefined ) offset = 0;
      if ( length === undefined ) length = array.length;

      for ( var i = 0, j = offset, il; i < length; i += 3, j += 3 ) {

        v1.x = array[ j ];
        v1.y = array[ j + 1 ];
        v1.z = array[ j + 2 ];

        v1.applyMatrix4( this );

        array[ j ]     = v1.x;
        array[ j + 1 ] = v1.y;
        array[ j + 2 ] = v1.z;

      }

      return array;

    };

  }(),

  rotateAxis: function ( v ) {

    console.warn( 'Zia.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.' );

    v.transformDirection( this );

  },

  crossVector: function ( vector ) {

    console.warn( 'Zia.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.' );
    return vector.applyMatrix4( this );

  },

  determinant: function () {

    var te = this.elements;

    var n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
    var n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
    var n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
    var n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

    //TODO: make this more efficient
    //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

    return (
      n41 * (
        + n14 * n23 * n32
         - n13 * n24 * n32
         - n14 * n22 * n33
         + n12 * n24 * n33
         + n13 * n22 * n34
         - n12 * n23 * n34
      ) +
      n42 * (
        + n11 * n23 * n34
         - n11 * n24 * n33
         + n14 * n21 * n33
         - n13 * n21 * n34
         + n13 * n24 * n31
         - n14 * n23 * n31
      ) +
      n43 * (
        + n11 * n24 * n32
         - n11 * n22 * n34
         - n14 * n21 * n32
         + n12 * n21 * n34
         + n14 * n22 * n31
         - n12 * n24 * n31
      ) +
      n44 * (
        - n13 * n22 * n31
         - n11 * n23 * n32
         + n11 * n22 * n33
         + n13 * n21 * n32
         - n12 * n21 * n33
         + n12 * n23 * n31
      )

    );

  },

  transpose: function () {

    var te = this.elements;
    var tmp;

    tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
    tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
    tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

    tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
    tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
    tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

    return this;

  },

  flattenToArrayOffset: function ( array, offset ) {

    var te = this.elements;

    array[ offset     ] = te[ 0 ];
    array[ offset + 1 ] = te[ 1 ];
    array[ offset + 2 ] = te[ 2 ];
    array[ offset + 3 ] = te[ 3 ];

    array[ offset + 4 ] = te[ 4 ];
    array[ offset + 5 ] = te[ 5 ];
    array[ offset + 6 ] = te[ 6 ];
    array[ offset + 7 ] = te[ 7 ];

    array[ offset + 8 ]  = te[ 8 ];
    array[ offset + 9 ]  = te[ 9 ];
    array[ offset + 10 ] = te[ 10 ];
    array[ offset + 11 ] = te[ 11 ];

    array[ offset + 12 ] = te[ 12 ];
    array[ offset + 13 ] = te[ 13 ];
    array[ offset + 14 ] = te[ 14 ];
    array[ offset + 15 ] = te[ 15 ];

    return array;

  },

  getPosition: function () {

    var v1 = new Zia.Vector3();

    return function () {

      console.warn( 'Zia.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.' );

      var te = this.elements;
      return v1.set( te[ 12 ], te[ 13 ], te[ 14 ] );

    };

  }(),

  setPosition: function ( v ) {

    var te = this.elements;

    te[ 12 ] = v.x;
    te[ 13 ] = v.y;
    te[ 14 ] = v.z;

    return this;

  },

  getInverse: function ( m, throwOnInvertible ) {

    // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
    var te = this.elements;
    var me = m.elements;

    var n11 = me[ 0 ], n12 = me[ 4 ], n13 = me[ 8 ], n14 = me[ 12 ];
    var n21 = me[ 1 ], n22 = me[ 5 ], n23 = me[ 9 ], n24 = me[ 13 ];
    var n31 = me[ 2 ], n32 = me[ 6 ], n33 = me[ 10 ], n34 = me[ 14 ];
    var n41 = me[ 3 ], n42 = me[ 7 ], n43 = me[ 11 ], n44 = me[ 15 ];

    te[ 0 ] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
    te[ 4 ] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
    te[ 8 ] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
    te[ 12 ] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
    te[ 1 ] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
    te[ 5 ] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
    te[ 9 ] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
    te[ 13 ] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
    te[ 2 ] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
    te[ 6 ] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
    te[ 10 ] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
    te[ 14 ] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
    te[ 3 ] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
    te[ 7 ] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
    te[ 11 ] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
    te[ 15 ] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;

    var det = n11 * te[ 0 ] + n21 * te[ 4 ] + n31 * te[ 8 ] + n41 * te[ 12 ];

    if ( det == 0 ) {

      var msg = "Matrix4.getInverse(): can't invert matrix, determinant is 0";

      if ( throwOnInvertible || false ) {

        throw new Error( msg );

      } else {

        console.warn( msg );

      }

      this.identity();

      return this;
    }

    this.multiplyScalar( 1 / det );

    return this;

  },

  translate: function ( v ) {

    console.warn( 'Zia.Matrix4: .translate() has been removed.' );

  },

  rotateX: function ( angle ) {

    console.warn( 'Zia.Matrix4: .rotateX() has been removed.' );

  },

  rotateY: function ( angle ) {

    console.warn( 'Zia.Matrix4: .rotateY() has been removed.' );

  },

  rotateZ: function ( angle ) {

    console.warn( 'Zia.Matrix4: .rotateZ() has been removed.' );

  },

  rotateByAxis: function ( axis, angle ) {

    console.warn( 'Zia.Matrix4: .rotateByAxis() has been removed.' );

  },

  scale: function ( v ) {

    var te = this.elements;
    var x = v.x, y = v.y, z = v.z;

    te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
    te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
    te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
    te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

    return this;

  },

  getMaxScaleOnAxis: function () {

    var te = this.elements;

    var scaleXSq = te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] + te[ 2 ] * te[ 2 ];
    var scaleYSq = te[ 4 ] * te[ 4 ] + te[ 5 ] * te[ 5 ] + te[ 6 ] * te[ 6 ];
    var scaleZSq = te[ 8 ] * te[ 8 ] + te[ 9 ] * te[ 9 ] + te[ 10 ] * te[ 10 ];

    return Math.sqrt( Math.max( scaleXSq, Math.max( scaleYSq, scaleZSq ) ) );

  },

  makeTranslation: function ( x, y, z ) {

    this.set(

      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1

    );

    return this;

  },

  makeRotationX: function ( theta ) {

    var c = Math.cos( theta ), s = Math.sin( theta );

    this.set(

      1, 0,  0, 0,
      0, c, - s, 0,
      0, s,  c, 0,
      0, 0,  0, 1

    );

    return this;

  },

  makeRotationY: function ( theta ) {

    var c = Math.cos( theta ), s = Math.sin( theta );

    this.set(

       c, 0, s, 0,
       0, 1, 0, 0,
      - s, 0, c, 0,
       0, 0, 0, 1

    );

    return this;

  },

  makeRotationZ: function ( theta ) {

    var c = Math.cos( theta ), s = Math.sin( theta );

    this.set(

      c, - s, 0, 0,
      s,  c, 0, 0,
      0,  0, 1, 0,
      0,  0, 0, 1

    );

    return this;

  },

  makeRotationAxis: function ( axis, angle ) {

    // Based on http://www.gamedev.net/reference/articles/article1199.asp

    var c = Math.cos( angle );
    var s = Math.sin( angle );
    var t = 1 - c;
    var x = axis.x, y = axis.y, z = axis.z;
    var tx = t * x, ty = t * y;

    this.set(

      tx * x + c, tx * y - s * z, tx * z + s * y, 0,
      tx * y + s * z, ty * y + c, ty * z - s * x, 0,
      tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
      0, 0, 0, 1

    );

     return this;

  },

  makeScale: function ( x, y, z ) {

    this.set(

      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1

    );

    return this;

  },

  compose: function ( position, quaternion, scale ) {

    this.makeRotationFromQuaternion( quaternion );
    this.scale( scale );
    this.setPosition( position );

    return this;

  },

  decompose: function () {

    var vector = new Zia.Vector3();
    var matrix = new Zia.Matrix4();

    return function ( position, quaternion, scale ) {

      var te = this.elements;

      var sx = vector.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
      var sy = vector.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
      var sz = vector.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

      // if determine is negative, we need to invert one scale
      var det = this.determinant();
      if ( det < 0 ) {
        sx = - sx;
      }

      position.x = te[ 12 ];
      position.y = te[ 13 ];
      position.z = te[ 14 ];

      // scale the rotation part

      matrix.elements.set( this.elements ); // at this point matrix is incomplete so we can't use .copy()

      var invSX = 1 / sx;
      var invSY = 1 / sy;
      var invSZ = 1 / sz;

      matrix.elements[ 0 ] *= invSX;
      matrix.elements[ 1 ] *= invSX;
      matrix.elements[ 2 ] *= invSX;

      matrix.elements[ 4 ] *= invSY;
      matrix.elements[ 5 ] *= invSY;
      matrix.elements[ 6 ] *= invSY;

      matrix.elements[ 8 ] *= invSZ;
      matrix.elements[ 9 ] *= invSZ;
      matrix.elements[ 10 ] *= invSZ;

      quaternion.setFromRotationMatrix( matrix );

      scale.x = sx;
      scale.y = sy;
      scale.z = sz;

      return this;

    };

  }(),

  makeFrustum: function ( left, right, bottom, top, near, far ) {

    var te = this.elements;
    var x = 2 * near / ( right - left );
    var y = 2 * near / ( top - bottom );

    var a = ( right + left ) / ( right - left );
    var b = ( top + bottom ) / ( top - bottom );
    var c = - ( far + near ) / ( far - near );
    var d = - 2 * far * near / ( far - near );

    te[ 0 ] = x;  te[ 4 ] = 0;  te[ 8 ] = a;  te[ 12 ] = 0;
    te[ 1 ] = 0;  te[ 5 ] = y;  te[ 9 ] = b;  te[ 13 ] = 0;
    te[ 2 ] = 0;  te[ 6 ] = 0;  te[ 10 ] = c; te[ 14 ] = d;
    te[ 3 ] = 0;  te[ 7 ] = 0;  te[ 11 ] = - 1; te[ 15 ] = 0;

    return this;

  },

  makePerspective: function ( fov, aspect, near, far ) {

    var ymax = near * Math.tan( Zia.Math.degToRad( fov * 0.5 ) );
    var ymin = - ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return this.makeFrustum( xmin, xmax, ymin, ymax, near, far );

  },

  makeOrthographic: function ( left, right, top, bottom, near, far ) {

    var te = this.elements;
    var w = right - left;
    var h = top - bottom;
    var p = far - near;

    var x = ( right + left ) / w;
    var y = ( top + bottom ) / h;
    var z = ( far + near ) / p;

    te[ 0 ] = 2 / w;  te[ 4 ] = 0;  te[ 8 ] = 0;  te[ 12 ] = - x;
    te[ 1 ] = 0;  te[ 5 ] = 2 / h;  te[ 9 ] = 0;  te[ 13 ] = - y;
    te[ 2 ] = 0;  te[ 6 ] = 0;  te[ 10 ] = - 2 / p; te[ 14 ] = - z;
    te[ 3 ] = 0;  te[ 7 ] = 0;  te[ 11 ] = 0; te[ 15 ] = 1;

    return this;

  },

  fromArray: function ( array ) {

    this.elements.set( array );

    return this;

  },

  toArray: function () {

    var te = this.elements;

    return [
      te[ 0 ], te[ 1 ], te[ 2 ], te[ 3 ],
      te[ 4 ], te[ 5 ], te[ 6 ], te[ 7 ],
      te[ 8 ], te[ 9 ], te[ 10 ], te[ 11 ],
      te[ 12 ], te[ 13 ], te[ 14 ], te[ 15 ]
    ];

  },

  clone: function () {

    var te = this.elements;

    return new Zia.Matrix4(

      te[ 0 ], te[ 4 ], te[ 8 ], te[ 12 ],
      te[ 1 ], te[ 5 ], te[ 9 ], te[ 13 ],
      te[ 2 ], te[ 6 ], te[ 10 ], te[ 14 ],
      te[ 3 ], te[ 7 ], te[ 11 ], te[ 15 ]

    );

  }

};

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

  add: function (v, w) {
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