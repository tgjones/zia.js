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
  },

  degToRad: function () {
    var degreeToRadiansFactor = Math.PI / 180;
    return function (degrees) {
      return degrees * degreeToRadiansFactor;
    };
  }(),

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

Zia.Matrix3 = function ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

  this.elements = new Float32Array( 9 );

  var te = this.elements;

  te[ 0 ] = ( n11 !== undefined ) ? n11 : 1; te[ 3 ] = n12 || 0; te[ 6 ] = n13 || 0;
  te[ 1 ] = n21 || 0; te[ 4 ] = ( n22 !== undefined ) ? n22 : 1; te[ 7 ] = n23 || 0;
  te[ 2 ] = n31 || 0; te[ 5 ] = n32 || 0; te[ 8 ] = ( n33 !== undefined ) ? n33 : 1;

};

Zia.Matrix3.prototype = {

  constructor: Zia.Matrix3,

  set: function ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

    var te = this.elements;

    te[ 0 ] = n11; te[ 3 ] = n12; te[ 6 ] = n13;
    te[ 1 ] = n21; te[ 4 ] = n22; te[ 7 ] = n23;
    te[ 2 ] = n31; te[ 5 ] = n32; te[ 8 ] = n33;

    return this;

  },

  identity: function () {

    this.set(

      1, 0, 0,
      0, 1, 0,
      0, 0, 1

    );

    return this;

  },

  copy: function ( m ) {

    var me = m.elements;

    this.set(

      me[ 0 ], me[ 3 ], me[ 6 ],
      me[ 1 ], me[ 4 ], me[ 7 ],
      me[ 2 ], me[ 5 ], me[ 8 ]

    );

    return this;

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

        v1.applyMatrix3( this );

        array[ j ]     = v1.x;
        array[ j + 1 ] = v1.y;
        array[ j + 2 ] = v1.z;

      }

      return array;

    };

  }(),

  multiplyScalar: function ( s ) {

    var te = this.elements;

    te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
    te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
    te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

    return this;

  },

  determinant: function () {

    var te = this.elements;

    var a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
      d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
      g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

  },

  getInverse: function ( matrix, throwOnNonInvertible ) {

    // input: Zia.Matrix4
    // ( based on http://code.google.com/p/webgl-mjs/ )

    var me = matrix.elements;
    var te = this.elements;

    te[ 0 ] =   me[ 10 ] * me[ 5 ] - me[ 6 ] * me[ 9 ];
    te[ 1 ] = - me[ 10 ] * me[ 1 ] + me[ 2 ] * me[ 9 ];
    te[ 2 ] =   me[ 6 ] * me[ 1 ] - me[ 2 ] * me[ 5 ];
    te[ 3 ] = - me[ 10 ] * me[ 4 ] + me[ 6 ] * me[ 8 ];
    te[ 4 ] =   me[ 10 ] * me[ 0 ] - me[ 2 ] * me[ 8 ];
    te[ 5 ] = - me[ 6 ] * me[ 0 ] + me[ 2 ] * me[ 4 ];
    te[ 6 ] =   me[ 9 ] * me[ 4 ] - me[ 5 ] * me[ 8 ];
    te[ 7 ] = - me[ 9 ] * me[ 0 ] + me[ 1 ] * me[ 8 ];
    te[ 8 ] =   me[ 5 ] * me[ 0 ] - me[ 1 ] * me[ 4 ];

    var det = me[ 0 ] * te[ 0 ] + me[ 1 ] * te[ 3 ] + me[ 2 ] * te[ 6 ];

    // no inverse

    if ( det === 0 ) {

      var msg = "Matrix3.getInverse(): can't invert matrix, determinant is 0";

      if ( throwOnNonInvertible || false ) {

        throw new Error( msg );

      } else {

        console.warn( msg );

      }

      this.identity();

      return this;

    }

    this.multiplyScalar( 1.0 / det );

    return this;

  },

  transpose: function () {

    var tmp, m = this.elements;

    tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
    tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
    tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

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

    return array;

  },

  getNormalMatrix: function ( m ) {

    // input: Zia.Matrix4

    this.getInverse( m ).transpose();

    return this;

  },

  transposeIntoArray: function ( r ) {

    var m = this.elements;

    r[ 0 ] = m[ 0 ];
    r[ 1 ] = m[ 3 ];
    r[ 2 ] = m[ 6 ];
    r[ 3 ] = m[ 1 ];
    r[ 4 ] = m[ 4 ];
    r[ 5 ] = m[ 7 ];
    r[ 6 ] = m[ 2 ];
    r[ 7 ] = m[ 5 ];
    r[ 8 ] = m[ 8 ];

    return this;

  },

  fromArray: function ( array ) {

    this.elements.set( array );

    return this;

  },

  toArray: function () {

    var te = this.elements;

    return [
      te[ 0 ], te[ 1 ], te[ 2 ],
      te[ 3 ], te[ 4 ], te[ 5 ],
      te[ 6 ], te[ 7 ], te[ 8 ]
    ];

  },

  clone: function () {

    var te = this.elements;

    return new Zia.Matrix3(

      te[ 0 ], te[ 3 ], te[ 6 ],
      te[ 1 ], te[ 4 ], te[ 7 ],
      te[ 2 ], te[ 5 ], te[ 8 ]

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

  makeLookAt: function () {

    var x = new Zia.Vector3();
    var y = new Zia.Vector3();
    var z = new Zia.Vector3();

    return function ( eye, target, up ) {

      var te = this.elements;

      z.subVectors(eye, target).normalize();
      x.crossVectors(up, z).normalize();
      y.crossVectors(z, x);

      var translateX = x.dot(eye);
      var translateY = y.dot(eye);
      var translateZ = z.dot(eye);

      te[0] = x.x; te[4] = x.y; te[8] = x.z;  te[12] = -translateX;
      te[1] = y.x; te[5] = y.y; te[9] = y.z;  te[13] = -translateY;
      te[2] = z.x; te[6] = z.y; te[10] = z.z; te[14] = -translateZ;
      te[3] = 0;   te[7] = 0;   te[11] = 0;   te[15] = 1;

      return this;

    };

  }(),

  multiply: function ( m) {

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

  setPosition: function ( v ) {

    var te = this.elements;

    te[ 12 ] = v.x;
    te[ 13 ] = v.y;
    te[ 14 ] = v.z;

    return this;

  },

  getInverse: function ( m, throwOnNonInvertible ) {

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

      if ( throwOnNonInvertible || false ) {

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

    var ymax = near * Math.tan(fov * 0.5);
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

/**
 * Original code from Zia.js project. https://github.com/mrdoob/Zia.js
 * Original code published with the following license:
 *
 * The MIT License
 * 
 * Copyright &copy; 2010-2014 Zia.js authors
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

 /**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

Zia.Vector4 = function ( x, y, z, w ) {
  this._x = x || 0;
  this._y = y || 0;
  this._z = z || 0;
  this._w = ( w !== undefined ) ? w : 1;
};

Zia.Vector4.prototype = {

  constructor: Zia.Vector4,

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

  get w() {
    return this._w;
  },

  set w(v) {
    this._w = v;
    this._onChangeCallback();
  },

  set: function ( x, y, z, w ) {

    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;

    this._onChangeCallback();

    return this;

  },

  setComponent: function ( index, value ) {

    switch ( index ) {

      case 0: this.x = value; break;
      case 1: this.y = value; break;
      case 2: this.z = value; break;
      case 3: this.w = value; break;
      default: throw new Error( 'index is out of range: ' + index );

    }

  },

  getComponent: function ( index ) {

    switch ( index ) {

      case 0: return this._x;
      case 1: return this._y;
      case 2: return this._z;
      case 3: return this._w;
      default: throw new Error( 'index is out of range: ' + index );

    }

  },

  copy: function ( v ) {

    this._x = v._x;
    this._y = v._y;
    this._z = v._z;
    this._w = ( v._w !== undefined ) ? v._w : 1;

    this._onChangeCallback();

    return this;

  },

  add: function (v) {

    this._x += v._x;
    this._y += v._y;
    this._z += v._z;
    this._w += v._w;

    this._onChangeCallback();

    return this;

  },

  addScalar: function ( s ) {

    this._x += s;
    this._y += s;
    this._z += s;
    this._w += s;

    this._onChangeCallback();

    return this;

  },

  addVectors: function ( a, b ) {

    this._x = a._x + b._x;
    this._y = a._y + b._y;
    this._z = a._z + b._z;
    this._w = a._w + b._w;

    this._onChangeCallback();

    return this;

  },

  sub: function (v) {

    this._x -= v._x;
    this._y -= v._y;
    this._z -= v._z;
    this._w -= v._w;

    this._onChangeCallback();

    return this;

  },

  subVectors: function ( a, b ) {

    this._x = a._x - b._x;
    this._y = a._y - b._y;
    this._z = a._z - b._z;
    this._w = a._w - b._w;

    this._onChangeCallback();

    return this;

  },

  multiplyScalar: function ( scalar ) {

    this._x *= scalar;
    this._y *= scalar;
    this._z *= scalar;
    this._w *= scalar;

    this._onChangeCallback();

    return this;

  },

  applyMatrix4: function ( m ) {

    var x = this._x;
    var y = this._y;
    var z = this._z;
    var w = this._w;

    var e = m.elements;

    this._x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] * w;
    this._y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] * w;
    this._z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] * w;
    this._w = e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] * w;

    this._onChangeCallback();

    return this;

  },

  divideScalar: function ( scalar ) {

    if ( scalar !== 0 ) {

      var invScalar = 1 / scalar;

      this._x *= invScalar;
      this._y *= invScalar;
      this._z *= invScalar;
      this._w *= invScalar;

    } else {

      this._x = 0;
      this._y = 0;
      this._z = 0;
      this._w = 1;

    }

    this._onChangeCallback();

    return this;

  },

  setAxisAngleFromQuaternion: function ( q ) {

    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

    // q is assumed to be normalized

    this._w = 2 * Math.acos( q._w );

    var s = Math.sqrt( 1 - q._w * q._w );

    if ( s < 0.0001 ) {

       this._x = 1;
       this._y = 0;
       this._z = 0;

    } else {

       this._x = _q.x / s;
       this._y = _q.y / s;
       this._z = _q.z / s;

    }

    this._onChangeCallback();

    return this;

  },

  setAxisAngleFromRotationMatrix: function ( m ) {

    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    var angle, x, y, z,   // variables for result
      epsilon = 0.01,   // margin to allow for rounding errors
      epsilon2 = 0.1,   // margin to distinguish between 0 and 180 degrees

      te = m.elements,

      m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
      m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
      m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

    if ( ( Math.abs( m12 - m21 ) < epsilon )
       && ( Math.abs( m13 - m31 ) < epsilon )
       && ( Math.abs( m23 - m32 ) < epsilon ) ) {

      // singularity found
      // first check for identity matrix which must have +1 for all terms
      // in leading diagonal and zero in other terms

      if ( ( Math.abs( m12 + m21 ) < epsilon2 )
         && ( Math.abs( m13 + m31 ) < epsilon2 )
         && ( Math.abs( m23 + m32 ) < epsilon2 )
         && ( Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {

        // this singularity is identity matrix so angle = 0

        this.set( 1, 0, 0, 0 );

        return this; // zero angle, arbitrary axis

      }

      // otherwise this singularity is angle = 180

      angle = Math.PI;

      var xx = ( m11 + 1 ) / 2;
      var yy = ( m22 + 1 ) / 2;
      var zz = ( m33 + 1 ) / 2;
      var xy = ( m12 + m21 ) / 4;
      var xz = ( m13 + m31 ) / 4;
      var yz = ( m23 + m32 ) / 4;

      if ( ( xx > yy ) && ( xx > zz ) ) { // m11 is the largest diagonal term

        if ( xx < epsilon ) {

          x = 0;
          y = 0.707106781;
          z = 0.707106781;

        } else {

          x = Math.sqrt( xx );
          y = xy / x;
          z = xz / x;

        }

      } else if ( yy > zz ) { // m22 is the largest diagonal term

        if ( yy < epsilon ) {

          x = 0.707106781;
          y = 0;
          z = 0.707106781;

        } else {

          y = Math.sqrt( yy );
          x = xy / y;
          z = yz / y;

        }

      } else { // m33 is the largest diagonal term so base result on this

        if ( zz < epsilon ) {

          x = 0.707106781;
          y = 0.707106781;
          z = 0;

        } else {

          z = Math.sqrt( zz );
          x = xz / z;
          y = yz / z;

        }

      }

      this.set( x, y, z, angle );

      return this; // return 180 deg rotation

    }

    // as we have reached here there are no singularities so we can handle normally

    var s = Math.sqrt( ( m32 - m23 ) * ( m32 - m23 )
              + ( m13 - m31 ) * ( m13 - m31 )
              + ( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize

    if ( Math.abs( s ) < 0.001 ) s = 1;

    // prevent divide by zero, should not happen if matrix is orthogonal and should be
    // caught by singularity test above, but I've left it in just in case

    this._x = ( m32 - m23 ) / s;
    this._y = ( m13 - m31 ) / s;
    this._z = ( m21 - m12 ) / s;
    this._w = Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );

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

    if ( this._w > v._w ) {
      this._w = v._w;
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

    if ( this._w < v._w ) {
      this._w = v._w;
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

    if (this._w < min._w) {
      this._w = min._w;
    } else if (this._w > max._w) {
      this._w = max._w;
    }

    this._onChangeCallback();

    return this;

  },

  clampScalar: ( function () {

    var min, max;

    return function ( minVal, maxVal ) {

      if ( min === undefined ) {

        min = new Zia.Vector4();
        max = new Zia.Vector4();

      }

      min.set( minVal, minVal, minVal, minVal );
      max.set( maxVal, maxVal, maxVal, maxVal );

      return this.clamp( min, max );

    };

  } )(),

  floor: function () {

    this._x = Math.floor( this._x );
    this._y = Math.floor( this._y );
    this._z = Math.floor( this._z );
    this._w = Math.floor( this._w );

    this._onChangeCallback();

    return this;

  },

  ceil: function () {

    this._x = Math.ceil( this._x );
    this._y = Math.ceil( this._y );
    this._z = Math.ceil( this._z );
    this._w = Math.ceil( this._w );

    this._onChangeCallback();

    return this;

  },

  round: function () {

    this._x = Math.round( this._x );
    this._y = Math.round( this._y );
    this._z = Math.round( this._z );
    this._w = Math.round( this._w );

    this._onChangeCallback();

    return this;

  },

  roundToZero: function () {

    this._x = ( this._x < 0 ) ? Math.ceil( this._x ) : Math.floor( this._x );
    this._y = ( this._y < 0 ) ? Math.ceil( this._y ) : Math.floor( this._y );
    this._z = ( this._z < 0 ) ? Math.ceil( this._z ) : Math.floor( this._z );
    this._w = ( this._w < 0 ) ? Math.ceil( this._w ) : Math.floor( this._w );

    this._onChangeCallback();

    return this;

  },

  negate: function () {

    this._x = - this._x;
    this._y = - this._y;
    this._z = - this._z;
    this._w = - this._w;

    this._onChangeCallback();

    return this;

  },

  dot: function ( v ) {

    return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

  },

  lengthSq: function () {

    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

  },

  length: function () {

    return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

  },

  lengthManhattan: function () {

    return Math.abs( this._x ) + Math.abs( this._y ) + Math.abs( this._z ) + Math.abs( this._w );

  },

  normalize: function () {

    return this.divideScalar( this.length() );

  },

  setLength: function ( l ) {

    var oldLength = this.length();

    if ( oldLength !== 0 && l !== oldLength ) {

      this.multiplyScalar( l / oldLength );

    }

    return this;

  },

  lerp: function ( v, alpha ) {

    this._x += ( v._x - this._x ) * alpha;
    this._y += ( v._y - this._y ) * alpha;
    this._z += ( v._z - this._z ) * alpha;
    this._w += ( v._w - this._w ) * alpha;

    this._onChangeCallback();

    return this;

  },

  equals: function ( v ) {

    return ( ( v._x === this._x ) && ( v._y === this._y ) && ( v._z === this._z ) && ( v._w === this._w ) );

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

  clone: function () {

    return new Zia.Vector4( this._x, this._y, this._z, this._w );

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

};

Zia.GeometricPrimitive = {

  mergeVertexData: function() {
    var vertexData = [];

    if (arguments.length < 1) {
      throw "You must pass at least one array in to mergeVertexData";
    }

    var vertexCount = arguments[0].length;
    for (var i = 1; i < arguments.length; i++) {
      if (arguments[i].length !== vertexCount) {
        throw "All arrays passed in must have the same length";
      }
    }

    for (var i = 0; i < vertexCount; i++) {
      for (var j = 0; j < arguments.length; j++) {
        Array.prototype.push.apply(vertexData, arguments[j][i].toArray());
      }
    }

    return vertexData;
  },

  convertToModel: function(graphicsDevice, primitive) {
    var vertexData = Zia.GeometricPrimitive.mergeVertexData(
      primitive.positions, primitive.normals,
      primitive.textureCoordinates);

    var vertices = new Float32Array(vertexData);

    var vertexBuffer = new Zia.VertexBuffer(graphicsDevice,
      new Zia.VertexDeclaration(
      [
        new Zia.VertexElement("aVertexPosition", 3, 0),
        new Zia.VertexElement("aVertexNormal", 3, 3 * 4),
        new Zia.VertexElement("aTextureCoord", 2, 6 * 4)
      ]),
      vertices);

    var indexBuffer = new Zia.IndexBuffer(graphicsDevice,
      new Uint16Array(primitive.indices));

    var program = new Zia.BasicProgram(graphicsDevice);

    var model = new Zia.Model(
      [
        new Zia.ModelMesh(graphicsDevice,
          [
            new Zia.ModelMeshPart({
              indexBuffer: indexBuffer,
              startIndex: 0,
              indexCount: primitive.indices.length,
              vertexBuffer: vertexBuffer
            })
          ])
      ]);

    for (var i = 0; i < model.meshes.length; i++) {
      var mesh = model.meshes[i];
      for (var j = 0; j < mesh.meshParts.length; j++) {
        mesh.meshParts[j].program = program;
      }
    }

    return model;
  }

};

(function() {

  // From http://bocoup.com/weblog/counting-uniforms-in-webgl/
  function getProgramInfo(gl, program) {
    var result = {
      attributes: [],
      uniforms: []
    };
    var activeUniforms   = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    var activeAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

    function toSimpleObject(activeInfo, location) {
      return {
        location: location,
        name: activeInfo.name,
        size: activeInfo.size,
        type: activeInfo.type
      };
    }
    
    // Loop through active uniforms
    for (var i = 0; i < activeUniforms; i++) {
      var uniform = gl.getActiveUniform(program, i);
      result.uniforms.push(toSimpleObject(uniform,
        gl.getUniformLocation(program, uniform.name)));
    }
    
    // Loop through active attributes
    for (var i = 0; i < activeAttributes; i++) {
      var attribute = gl.getActiveAttrib(program, i);
      result.attributes.push(toSimpleObject(attribute,
        gl.getAttribLocation(program, attribute.name)));
    }
    
    return result;
  }

  Zia.Program = function (graphicsDevice, vertexShader, fragmentShader) {
    this._graphicsDevice = graphicsDevice;
    var gl = this._gl = graphicsDevice._gl;

    var program = gl.createProgram();

    gl.attachShader(program, vertexShader._shader);
    gl.attachShader(program, fragmentShader._shader);
    gl.linkProgram(program);

    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      var error = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error('Failed to link program: ' + error);
    }

    this._program = program;

    var programInfo = getProgramInfo(this._gl, this._program);
    this._attributes = programInfo.attributes;
    this._uniforms = programInfo.uniforms;

    this._uniformsByName = {};
    for (var i = 0; i < this._uniforms.length; i++) {
      var uniform = this._uniforms[i];
      this._uniformsByName[uniform.name] = uniform;
    }
  };

})();

Zia.Program.prototype = {

  apply: function() {
    this._graphicsDevice._currentProgram = this;
    this._gl.useProgram(this._program);
    this._onApply();
  },

  _onApply: function() { },

  setUniform: (function () {
    var temp = new Zia.Vector4();

    return function (name, value) {
      if (value instanceof Zia.Color4) {
        temp.set(value.r, value.g, value.b, value.a);
        value = temp;
      }

      var uniform = this._uniformsByName[name];

      if (uniform === undefined) {
        return;
      }
      
      var gl = this._gl;

      switch (uniform.type) {
        case gl.FLOAT :
          gl.uniform1f(uniform.location, value);
          break;
        case gl.FLOAT_VEC2 :
          gl.uniform2f(uniform.location, value._x, value._y);
          break;
        case gl.FLOAT_VEC3 :
          gl.uniform3f(uniform.location, value._x, value._y, value._z);
          break;
        case gl.FLOAT_VEC4 :
          gl.uniform4f(uniform.location, value.x, value.y, value.z, value.w);
          break;
        case gl.FLOAT_MAT3 :
          gl.uniformMatrix3fv(uniform.location, false, value.elements);
          break;
        case gl.FLOAT_MAT4 :
          gl.uniformMatrix4fv(uniform.location, false, value.elements);
          break;
        case gl.SAMPLER_2D :
          if (value !== null && value._ready === true) {
            gl.activeTexture(gl.TEXTURE0); // TODO
            gl.bindTexture(gl.TEXTURE_2D, value._texture);
            gl.uniform1i(uniform.location, 0); // TODO
          }
          break;
        default :
          throw "Not implemented for type: " + uniform.type;
      }
    }
  })(),

  destroy: function() {
    var attachedShaders = this._gl.getAttachedShaders(this._program);
    for (var i = 0; i < attachedShaders.length; i++) {
      this._gl.detachShader(this._program, attachedShaders[i]);
    }

    this._gl.deleteProgram(this._program);
  }

};

// Based on EffectHelpers from XNA. Original licence follows:
//-----------------------------------------------------------------------------
// EffectHelpers.cs
//
// Microsoft XNA Community Game Platform
// Copyright (C) Microsoft Corporation. All rights reserved.
//-----------------------------------------------------------------------------

Zia.ProgramDirtyFlags = {
  ModelViewProj : 1,
  Model         : 2,
  EyePosition   : 4,
  MaterialColor : 8,
  SpecularColor : 16,
  SpecularPower : 32,
  Texture       : 64,
  All           : -1
};

Zia.ProgramUtil = {

  /** Sets up the standard key/fill/back lighting rig. */
  enableDefaultLighting: function(light0, light1, light2) {
    // Key light.
    light0.direction = new Zia.Vector3(-0.5265408, -0.5735765, -0.6275069);
    light0.diffuseColor = new Zia.Vector3(1, 0.9607844, 0.8078432);
    light0.specularColor = new Zia.Vector3(1, 0.9607844, 0.8078432);
    light0.enabled = true;

    // Fill light.
    light1.direction = new Zia.Vector3(0.7198464, 0.3420201, 0.6040227);
    light1.diffuseColor = new Zia.Vector3(0.9647059, 0.7607844, 0.4078432);
    light1.specularColor = new Zia.Vector3();
    light1.enabled = true;

    // Back light.
    light2.direction = new Zia.Vector3(0.4545195, -0.7660444, 0.4545195);
    light2.diffuseColor = new Zia.Vector3(0.3231373, 0.3607844, 0.3937255);
    light2.specularColor = new Zia.Vector3(0.3231373, 0.3607844, 0.3937255);
    light2.enabled = true;

    // Ambient light.
    return new Zia.Vector3(0.05333332, 0.09882354, 0.1819608);
  },

  /** Lazily recomputes the model+view+projection matrix based on
   *  the current effect parameter settings.
   */
  setModelViewProj: (function() {
    var modelViewProjectionMatrix = new Zia.Matrix4();

    return function(program, dirtyFlags, model, view, projection, modelView) {
      // Recompute the model+view+projection matrix?
      if ((dirtyFlags & Zia.ProgramDirtyFlags.ModelViewProj) != 0) {
        modelView.multiplyMatrices(view, model);
        modelViewProjectionMatrix.multiplyMatrices(projection, modelView);
        program.setUniform('uMVPMatrix', modelViewProjectionMatrix);
          
        dirtyFlags &= ~Zia.ProgramDirtyFlags.ModelViewProj;
      }
      return dirtyFlags;
    };
  })(),

  /** Sets the diffuse/emissive/alpha material color parameters. */
  setMaterialColor: function(program, lightingEnabled, alpha, diffuseColor, emissiveColor, ambientLightColor) {
    // Desired lighting model:
    //
    //     ((AmbientLightColor + sum(diffuse directional light)) * DiffuseColor) + EmissiveColor
    //
    // When lighting is disabled, ambient and directional lights are ignored, leaving:
    //
    //     DiffuseColor + EmissiveColor
    //
    // For the lighting disabled case, we can save one shader instruction by precomputing
    // diffuse+emissive on the CPU, after which the shader can use DiffuseColor directly,
    // ignoring its emissive parameter.
    //
    // When lighting is enabled, we can merge the ambient and emissive settings. If we
    // set our emissive parameter to emissive+(ambient*diffuse), the shader no longer
    // needs to bother adding the ambient contribution, simplifying its computation to:
    //
    //     (sum(diffuse directional light) * DiffuseColor) + EmissiveColor
    //
    // For further optimization goodness, we merge material alpha with the diffuse
    // color parameter, and premultiply all color values by this alpha.
            
    if (lightingEnabled) {
      var diffuse = new Zia.Vector4(
        diffuseColor.x * alpha, 
        diffuseColor.y * alpha, 
        diffuseColor.z * alpha, 
        alpha);

      var emissive = new Zia.Vector3(
       (emissiveColor.x + ambientLightColor.x * diffuseColor.x) * alpha,
       (emissiveColor.y + ambientLightColor.y * diffuseColor.y) * alpha,
       (emissiveColor.z + ambientLightColor.z * diffuseColor.z) * alpha);

      program.setUniform('uDiffuseColor', diffuse);
      program.setUniform('uEmissiveColor', emissive);
    }
    else
    {
      var diffuse = new Zia.Vector4(
        (diffuseColor.x + emissiveColor.x) * alpha,
        (diffuseColor.y + emissiveColor.y) * alpha,
        (diffuseColor.z + emissiveColor.z) * alpha,
        alpha);

      program.setUniform('uDiffuseColor', diffuse);
    }
  },

  setLightingMatrices: (function() {
    var modelInverseTransposeMatrix = new Zia.Matrix3();
    var viewInverseMatrix = new Zia.Matrix4();
    var eyePosition = new Zia.Vector3();

    return function(program, dirtyFlags, model, view) {
      // Set the world and world inverse transpose matrices.
      if ((dirtyFlags & Zia.ProgramDirtyFlags.Model) != 0) {
        program.setUniform('uMMatrix', model);

        modelInverseTransposeMatrix.getNormalMatrix(model);
        program.setUniform('uMMatrixInverseTranspose', modelInverseTransposeMatrix);
          
        dirtyFlags &= ~Zia.ProgramDirtyFlags.Model;
      }

      // Set the eye position.
      if ((dirtyFlags & Zia.ProgramDirtyFlags.EyePosition) != 0) {
        viewInverseMatrix.getInverse(view);
        eyePosition.setFromMatrixColumn(3, viewInverseMatrix);
        program.setUniform('uEyePosition', eyePosition);

        dirtyFlags &= ~Zia.ProgramDirtyFlags.EyePosition;
      }

      return dirtyFlags;
    }
  })()                                   

};

Zia.Comparison = {
  Never: 0,
  Always: 1,
  Less: 2,
  Equal: 3,
  LessEqual: 4,
  Greater: 5,
  GreaterEqual: 6,
  NotEqual: 7
};

Zia.DepthStencilState = function () {
  this.isDepthEnabled = true;
  this.depthFunction = Zia.Comparison.Less;
};

(function () {
  function mapComparison(comparison, gl) {
    switch (comparison) {
      case Zia.Comparison.Never :        return gl.NEVER;
      case Zia.Comparison.Always :       return gl.ALWAYS;
      case Zia.Comparison.Less :         return gl.LESS;
      case Zia.Comparison.Equal :        return gl.EQUAL;
      case Zia.Comparison.LessEqual :    return gl.LEQUAL;
      case Zia.Comparison.Greater :      return gl.GREATER;
      case Zia.Comparison.GreaterEqual : return gl.GEQUAL;
      case Zia.Comparison.NotEqual :     return gl.NOTEQUAL;
    }
  }

  Zia.DepthStencilState.prototype = {

    _apply: function (gl) {
      if (this.isDepthEnabled) {
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(mapComparison(this.depthFunction, gl));
      }
      else {
        gl.disable(gl.DEPTH_TEST);
      }

    }
  };
})();

Zia.ClearOptions = {
  DepthBuffer: 0,
  StencilBuffer: 1,
  ColorBuffer: 2
};

Zia.PrimitiveType = {
  PointList: 0,
  LineList: 1,
  LineStrip: 2,
  LineLoop: 3,
  TriangleList: 4,
  TriangleStrip: 5,
  TriangleFan: 6
};

Zia.GraphicsDevice = function (canvas, debug) {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  this._canvas = canvas;
  var gl = this._gl = canvas.getContext('webgl', {
    antialias: true
  });

  if (debug) {
    gl = this._gl = Zia.DebugUtil.makeDebugContext(gl);
  }

  // TODO: Handle WebContextLost event.
  
  var viewport = this._viewport = new Zia.Viewport(
    0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  viewport.onChange(function () {
    gl.viewport(viewport._x, viewport._y, viewport._width, viewport._height);
    gl.depthRange(viewport._minDepth, viewport._maxDepth);
  });

  this.rasterizerState = new Zia.RasterizerState();
  this.depthStencilState = new Zia.DepthStencilState();
};

Zia.GraphicsDevice.prototype = {

  get viewport() {
    return this._viewport;
  },

  get rasterizerState() {
    return this._rasterizerState;
  },

  set rasterizerState(value) {
    this._rasterizerState = value;
    this._rasterizerState._apply(this._gl);
  },

  get depthStencilState() {
    return this._depthStencilState;
  },

  set depthStencilState(value) {
    this._depthStencilState = value;
    this._depthStencilState._apply(this._gl);
  },
  
  clear: function(clearOptions, color, depth, stencil) {
    var clearMask = 0;

    if (Zia.EnumUtil.hasFlag(clearOptions, Zia.ClearOptions.DepthBuffer)) {
      clearMask |= this._gl.DEPTH_BUFFER_BIT;
      this._gl.clearDepth(depth);
    }

    if (Zia.EnumUtil.hasFlag(clearOptions, Zia.ClearOptions.StencilBuffer)) {
      clearMask |= this._gl.STENCIL_BUFFER_BIT;
      this._gl.clearStencil(stencil);
    }

    if (Zia.EnumUtil.hasFlag(clearOptions, Zia.ClearOptions.ColorBuffer)) {
      clearMask |= this._gl.COLOR_BUFFER_BIT;
      this._gl.clearColor(color.r, color.g, color.b, color.a);
    }

    this._gl.clear(clearMask);
  },

  setIndexBuffer: function(indexBuffer) {
    this._indexBuffer = indexBuffer;
  },

  setVertexBuffers: function (vertexBuffers) {
    this._vertexBuffers = vertexBuffers;
  },

  setVertexBuffer: function(vertexBuffer) {
    this._vertexBuffers = [vertexBuffer];
  },

  drawIndexedPrimitives: function (primitiveType, startIndex, indexCount) {
    var gl = this._gl;

    var enabledAttributeLocations = this._bindVertexAttributes(gl);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer._buffer);

    gl.drawElements(
      this._getMode(primitiveType),
      indexCount,
      gl.UNSIGNED_SHORT,
      startIndex * 4);

    for (var i = 0; i < enabledAttributeLocations.length; i++) {
      gl.disableVertexAttribArray(enabledAttributeLocations[i]);
    }
  },

  drawPrimitives: function(primitiveType, startVertex, vertexCount) {
    var gl = this._gl;

    var enabledAttributeLocations = this._bindVertexAttributes(gl);

    gl.drawArrays(
      this._getMode(primitiveType),
      startVertex,
      vertexCount);

    for (var i = 0; i < enabledAttributeLocations.length; i++) {
      gl.disableVertexAttribArray(enabledAttributeLocations[i]);
    }
  },

  resize: function () {
    var canvas = this._canvas;

    var width = canvas.clientWidth;
    var height = canvas.clientHeight;

    if (canvas.width != width || canvas.height != height) {
       canvas.width = width;
       canvas.height = height;

      this.viewport.set(0, 0, width, height);

       return true;
    }
    return false;
  },

  _bindVertexAttributes: function (gl) {
    var enabledAttributeLocations = [];
    for (var i = 0; i < this._currentProgram._attributes.length; i++) {
      var attribute = this._currentProgram._attributes[i];
      var vertexBuffer = this._findVertexBuffer(attribute.name);
      if (vertexBuffer) {
        enabledAttributeLocations.push(attribute.location);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.buffer._buffer);
        gl.vertexAttribPointer(attribute.location,
          vertexBuffer.element.numComponents,
          gl.FLOAT, false,
          vertexBuffer.buffer._vertexDeclaration.stride,
          vertexBuffer.element.offset);
        gl.enableVertexAttribArray(attribute.location);
      }
    }
    return enabledAttributeLocations;
  },

  _findVertexBuffer: function (attributeName) {
    for (var i = 0; i < this._vertexBuffers.length; i++) {
      var vertexBuffer = this._vertexBuffers[i];
      for (var j = 0; j < vertexBuffer._vertexDeclaration.elements.length; j++) {
        var element = vertexBuffer._vertexDeclaration.elements[j];
        if (element.attributeName === attributeName) {
          return {
            buffer: vertexBuffer,
            element: element
          };
        }
      }
    }
    return null;
  },

  _getMode: function (primitiveType) {
    switch (primitiveType) {
      case Zia.PrimitiveType.PointList:     return this._gl.POINTS;
      case Zia.PrimitiveType.LineList:      return this._gl.LINES;
      case Zia.PrimitiveType.LineStrip:     return this._gl.LINE_STRIP;
      case Zia.PrimitiveType.LineLoop:      return this._gl.LINE_LOOP;
      case Zia.PrimitiveType.TriangleList:  return this._gl.TRIANGLES;
      case Zia.PrimitiveType.TriangleStrip: return this._gl.TRIANGLE_STRIP;
      case Zia.PrimitiveType.TriangleFan:   return this._gl.TRIANGLE_FAN;
    }
  }

};

Zia.IndexBuffer = function (graphicsDevice, data) {
  this._gl = graphicsDevice._gl;
  this._buffer = this._gl.createBuffer();

  if (data !== undefined) {
    this.setData(data);
  }
};

Zia.IndexBuffer.prototype = {

  setData: function(data) {
    var gl = this._gl;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
  },

  destroy: function() {
    this._gl.deleteBuffer(this._buffer);
  }

};

Zia.Model = function(meshes) {
  this.meshes = meshes;
};

Zia.Model.prototype = {

  draw: function(modelMatrix, viewMatrix, projectionMatrix) {
    for (var i = 0; i < this.meshes.length; i++) {
      var mesh = this.meshes[i];

      for (var j = 0; j < mesh.programs.length; j++) {
        var program = mesh.programs[j];

        program.modelMatrix = modelMatrix;
        program.viewMatrix = viewMatrix;
        program.projectionMatrix = projectionMatrix;
      }

      mesh.draw();
    }
  }

};

Zia.ModelMesh = function(graphicsDevice, meshParts) {
  this.graphicsDevice = graphicsDevice;
  this.meshParts = meshParts;

  for (var i = 0; i < meshParts.length; i++) {
    meshParts[i]._parent = this;
  }

  this.programs = [];
}

Zia.ModelMesh.prototype = {

  draw: function() {

    for (var i = 0; i < this.meshParts.length; i++) {

      var meshPart = this.meshParts[i];
      var program = meshPart.program;

      if (meshPart.indexCount > 0) {

        this.graphicsDevice.setVertexBuffer(meshPart.vertexBuffer);
        this.graphicsDevice.setIndexBuffer(meshPart.indexBuffer);

        program.apply();

        this.graphicsDevice.drawIndexedPrimitives(
          Zia.PrimitiveType.TriangleList,
          meshPart.startIndex, meshPart.indexCount);

      }

    }

  }

};

Zia.ModelMeshPart = function(options) {
  options = Zia.ObjectUtil.reverseMerge(options || {}, {
    indexBuffer: null,
    startIndex: 0,
    indexCount: 0,
    vertexBuffer: null
  });

  this.indexBuffer = options.indexBuffer;
  this.startIndex = options.startIndex;
  this.indexCount = options.indexCount;
  this.vertexBuffer = options.vertexBuffer;

  this._program = null;
  this._parent = null;
};


Zia.ModelMeshPart.prototype = {

  get program() { return this._program; },

  set program(value) {
    if (value === this._program)
      return;

    if (this._program) {
      // First check to see if any other parts are using this program.
      var removeProgram = true;

      for (var i = 0; i < this._parent.meshParts.length; i++) {
        var meshPart = this._parent.meshParts[i];
        if (meshPart !== this && meshPart._program === this._program) {
          removeProgram = false;
          break;
        }
      }

      if (removeProgram) {
        var programIndex = this._parent.programs.indexOf(this._program);
        if (programIndex >= 0) {
          this._parent.programs.splice(programIndex, 1);
        }
      }
    }

    // Set the new program.
    this._program = value;
    this._parent.programs.push(value); // TODO: Check for duplicates?
  }

};

Zia.CullMode = {
  Back: 0,
  Front: 1,
  FrontAndBack: 2,
  None: 3
};

Zia.RasterizerState = function () {
  this.cullMode = Zia.CullMode.Back;
  this.isFrontClockwise = false;
  this.isPolygonOffsetEnabled = false;
  this.polygonOffsetFactor = 0.0;
  this.polygonOffsetUnits = 0.0;
};

Zia.RasterizerState.prototype = {

  _apply: function (gl) {
    switch (this.cullMode) {
      case Zia.CullMode.Back :
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        break;
      case Zia.CullMode.Front :
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);
        break;
      case Zia.CullMode.FrontAndBack :
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT_AND_BACK);
        break;
      case Zia.CullMode.None :
        gl.disable(gl.CULL_FACE);
        break;
    }

    gl.frontFace(this.isFrontClockwise ? gl.CW : gl.CCW);

    if (this.isPolygonOffsetEnabled) {
      gl.enable(gl.POLYGON_OFFSET_FILL);
      gl.polygonOffset(this.polygonOffsetFactor, this.polygonOffsetUnits);
    } else {
      gl.disable(gl.POLYGON_OFFSET_FILL);
    }
  }

};

Zia.Shader = function (graphicsDevice, type, source) {
  var gl = this._gl = graphicsDevice._gl;

  var shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    var error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error('Failed to compile shader: ' + error);
  }

  this._shader = shader;
};

Zia.Shader.prototype = {
  destroy: function () {
    this._gl.deleteShader(this._shader);
  }
};


Zia.FragmentShader = function (graphicsDevice, source) {
  Zia.Shader.call(this, graphicsDevice, graphicsDevice._gl.FRAGMENT_SHADER, source);
};

Zia.FragmentShader.prototype = Object.create(Zia.Shader.prototype);


Zia.VertexShader = function (graphicsDevice, source) {
  Zia.Shader.call(this, graphicsDevice, graphicsDevice._gl.VERTEX_SHADER, source);
};

Zia.VertexShader.prototype = Object.create(Zia.Shader.prototype);

Zia.Texture = function (graphicsDevice, options) {
  this._gl = graphicsDevice._gl;
  this._texture = this._gl.createTexture();
  this._ready = false;

  this._options = Zia.ObjectUtil.reverseMerge(options || {}, {
    filter: Zia.TextureFilter.MinNearestMagMipLinear,
    wrapS: Zia.TextureWrap.Repeat,
    wrapT: Zia.TextureWrap.Repeat
  });
};

Zia.Texture.createFromImagePath = function (graphicsDevice, imagePath, options) {
  var result = new Zia.Texture(graphicsDevice, options);

  var gl = graphicsDevice._gl;
  var image = new Image();
  image.onload = (function(scope) {
    return function () {
      result._handleImageLoad(function () {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      });
    };
  })(this);
  image.src = imagePath;

  return result;
};

Zia.Texture.createFromImageData = function (graphicsDevice, imageData, width, height, options) {
  var result = new Zia.Texture(graphicsDevice, options);

  var gl = graphicsDevice._gl;
  result._handleImageLoad(function () {
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA,
      gl.UNSIGNED_BYTE, imageData);
  });

  return result;
};

Zia.Texture.createWhiteTexture = function (engine) {
  var whitePixel = new Uint8Array([255, 255, 255, 255]);
  return Zia.Texture.createFromImageData(graphicsDevice, whitePixel, 1, 1);
};

Zia.Texture.prototype = {

  _handleImageLoad: function (setImageDataCallback) {
    var gl = this._gl;

    gl.bindTexture(gl.TEXTURE_2D, this._texture);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    setImageDataCallback();

    Zia.TextureWrap._applyS(gl, this._options.wrapS);
    Zia.TextureWrap._applyT(gl, this._options.wrapT);

    Zia.TextureFilter._apply(gl, this._options.filter);

    gl.generateMipmap(gl.TEXTURE_2D);
    
    gl.bindTexture(gl.TEXTURE_2D, null);

    this._ready = true;
  },

  unload: function () {
    this._gl.deleteTexture(this._texture);
  }

};

Zia.TextureFilter = {
  MinMagMipNearest: 0,
  MinMagNearestMipLinear: 1,
  MinNearestMagLinearMipNearest: 2,
  MinNearestMagMipLinear: 3,
  MinLinearMagMipNearest: 4,
  MinLinearMagNearestMipLinear: 5,
  MinMagLinearMipNearest: 6,
  MinMagMipLinear: 7,

  MinMagNearest: 8,
  MinNearestMagLinear: 9,
  MinLinearMagNearest: 10,
  MinMagLinear: 11,

  _apply: function(gl, filter) {
    switch (filter) {
      case Zia.TextureFilter.MinMagMipNearest:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        break;
      case Zia.TextureFilter.MinMagNearestMipLinear:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        break;
      case Zia.TextureFilter.MinNearestMagLinearMipNearest:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        break;
      case Zia.TextureFilter.MinNearestMagMipLinear:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        break;
      case Zia.TextureFilter.MinLinearMagMipNearest:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        break;
      case Zia.TextureFilter.MinLinearMagNearestMipLinear:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        break;
      case Zia.TextureFilter.MinMagLinearMipNearest:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        break;
      case Zia.TextureFilter.MinMagMipLinear:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        break;
      case Zia.TextureFilter.MinMagNearest:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        break;
      case Zia.TextureFilter.MinNearestMagLinear:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        break;
      case Zia.TextureFilter.MinLinearMagNearest:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        break;
      case Zia.TextureFilter.MinMagLinear:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        break;
      default :
        throw "Invalid value: " + filter;
    }
  }
};

Zia.TextureWrap = {
  Repeat: 0,
  ClampToEdge: 1,
  MirroredRepeat: 2,

  _applyS: function(gl, wrap) {
    Zia.TextureWrap._apply(gl, gl.TEXTURE_WRAP_S, wrap);
  },

  _applyT: function(gl, wrap) {
    Zia.TextureWrap._apply(gl, gl.TEXTURE_WRAP_T, wrap);
  },

  _apply: function(gl, which, wrap) {
    switch (wrap) {
      case Zia.TextureWrap.Repeat:
        gl.texParameteri(gl.TEXTURE_2D, which, gl.REPEAT);
        break;
      case Zia.TextureWrap.ClampToEdge:
        gl.texParameteri(gl.TEXTURE_2D, which, gl.CLAMP_TO_EDGE);
        break;
      case Zia.TextureWrap.MirroredRepeat:
        gl.texParameteri(gl.TEXTURE_2D, which, gl.MIRRORED_REPEAT);
        break;
      default :
        throw "Invalid value: " + filter;
    }
  }
};

Zia.VertexBuffer = function (graphicsDevice, vertexDeclaration, data) {
  this._gl = graphicsDevice._gl;
  this._buffer = this._gl.createBuffer();

  this._vertexDeclaration = vertexDeclaration;

  if (data !== undefined) {
    this.setData(data);
  }
};

Zia.VertexBuffer.prototype = {

  setData: function (data) {
    var gl = this._gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  },

  destroy: function () {
    this._gl.deleteBuffer(this._buffer);
  }

};

Zia.VertexElement = function (attributeName, numComponents, offset) {
  this.attributeName = attributeName;
  this.numComponents = numComponents;
  this.offset = (offset !== undefined) ? offset : 0;
};

Zia.VertexDeclaration = function (elements) {
  this.elements = elements;
  this.stride = 4 * elements
    .map(function (v) { return v.numComponents; })
    .reduce(function (p, c) { return p + c; }, 0);
};

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

// -----------------------------------------------------------------------------
// The following code is a port of SharpDX https://github.com/sharpdx/sharpdx
// -----------------------------------------------------------------------------
// Copyright (c) 2010-2014 SharpDX - Alexandre Mutel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// -----------------------------------------------------------------------------
// The following code is a port of DirectXTk http://directxtk.codeplex.com
// -----------------------------------------------------------------------------
// Microsoft Public License (Ms-PL)
//
// This license governs use of the accompanying software. If you use the 
// software, you accept this license. If you do not accept the license, do not
// use the software.
//
// 1. Definitions
// The terms "reproduce," "reproduction," "derivative works," and 
// "distribution" have the same meaning here as under U.S. copyright law.
// A "contribution" is the original software, or any additions or changes to 
// the software.
// A "contributor" is any person that distributes its contribution under this 
// license.
// "Licensed patents" are a contributor's patent claims that read directly on 
// its contribution.
//
// 2. Grant of Rights
// (A) Copyright Grant- Subject to the terms of this license, including the 
// license conditions and limitations in section 3, each contributor grants 
// you a non-exclusive, worldwide, royalty-free copyright license to reproduce
// its contribution, prepare derivative works of its contribution, and 
// distribute its contribution or any derivative works that you create.
// (B) Patent Grant- Subject to the terms of this license, including the license
// conditions and limitations in section 3, each contributor grants you a 
// non-exclusive, worldwide, royalty-free license under its licensed patents to
// make, have made, use, sell, offer for sale, import, and/or otherwise dispose
// of its contribution in the software or derivative works of the contribution 
// in the software.
//
// 3. Conditions and Limitations
// (A) No Trademark License- This license does not grant you rights to use any 
// contributors' name, logo, or trademarks.
// (B) If you bring a patent claim against any contributor over patents that 
// you claim are infringed by the software, your patent license from such 
// contributor to the software ends automatically.
// (C) If you distribute any portion of the software, you must retain all 
// copyright, patent, trademark, and attribution notices that are present in the
// software.
// (D) If you distribute any portion of the software in source code form, you 
// may do so only under this license by including a complete copy of this 
// license with your distribution. If you distribute any portion of the software
// in compiled or object code form, you may only do so under a license that 
// complies with this license.
// (E) The software is licensed "as-is." You bear the risk of using it. The
// contributors give no express warranties, guarantees or conditions. You may
// have additional consumer rights under your local laws which this license 
// cannot change. To the extent permitted under your local laws, the 
// contributors exclude the implied warranties of merchantability, fitness for a
// particular purpose and non-infringement.

(function() {

  var cubeFaceCount = 6;

  var faceNormals = [
    new Zia.Vector3(0, 0, 1),
    new Zia.Vector3(0, 0, -1),
    new Zia.Vector3(1, 0, 0),
    new Zia.Vector3(-1, 0, 0),
    new Zia.Vector3(0, 1, 0),
    new Zia.Vector3(0, -1, 0)
  ];

  var textureCoordinates = [
    new Zia.Vector2(1, 1),
    new Zia.Vector2(1, 0),
    new Zia.Vector2(0, 0),
    new Zia.Vector2(0, 1)
  ];

  var side1 = new Zia.Vector3();
  var side2 = new Zia.Vector3();

  /** A cube has six faces, each one pointing in a different direction. */
  Zia.GeometricPrimitive.createCube = function(size) {
    if (size === undefined) {
      size = 1.0;
    }

    var positions = [];
    var normals = [];
    var texCoords = [];
    var indices = [];

    size /= 2.0;

    // Create each face in turn.
    for (var i = 0; i < cubeFaceCount; i++) {
      var normal = faceNormals[i];

      // Get two vectors perpendicular both to the face normal and to each other.
      var basis = (i >= 4) ? new Zia.Vector3(0,0,1) : new Zia.Vector3(0,1,0);

      side1.set(normal.x, normal.y, normal.z);
      side1.cross(basis);

      side2.set(normal.x, normal.y, normal.z);
      side2.cross(side1);

      // Six indices (two triangles) per face.
      var vbase = i * 4;
      indices.push(vbase + 0);
      indices.push(vbase + 2);
      indices.push(vbase + 1);

      indices.push(vbase + 0);
      indices.push(vbase + 3);
      indices.push(vbase + 2);

      // Four vertices per face.

      // (normal - side1 - side2) * size
      positions.push(normal.clone().sub(side1).sub(side2).multiplyScalar(size));

      // (normal - side1 + side2) * size
      positions.push(normal.clone().sub(side1).add(side2).multiplyScalar(size));

      // (normal + side1 + side2) * size
      positions.push(normal.clone().add(side1).add(side2).multiplyScalar(size));

      // (normal + side1 - side2) * size
      positions.push(normal.clone().add(side1).sub(side2).multiplyScalar(size));

      normals.push(normal);
      normals.push(normal);
      normals.push(normal);
      normals.push(normal);

      texCoords.push(textureCoordinates[0]);
      texCoords.push(textureCoordinates[1]);
      texCoords.push(textureCoordinates[2]);
      texCoords.push(textureCoordinates[3]);
    }

    return {
      positions: positions,
      normals: normals,
      textureCoordinates: texCoords,
      indices: indices
    };
  };

})();

(function () {
  function addLighting(result) {
    result.push("uniform vec3 uDirLight0Direction;");
    result.push("uniform vec3 uDirLight0DiffuseColor;");
    result.push("uniform vec3 uDirLight0SpecularColor;");

    result.push("uniform vec3 uDirLight1Direction;");
    result.push("uniform vec3 uDirLight1DiffuseColor;");
    result.push("uniform vec3 uDirLight1SpecularColor;");

    result.push("uniform vec3 uDirLight2Direction;");
    result.push("uniform vec3 uDirLight2DiffuseColor;");
    result.push("uniform vec3 uDirLight2SpecularColor;");

    result.push("uniform vec3 uEyePosition;");

    result.push("varying vec3 vPositionWS;");
    result.push("varying vec3 vNormalWS;");

    result.push(Zia.SharedProgramCode.lighting);
  }

  function buildVertexShader(options) {
    var result = [];

    result.push("precision mediump float;");

    // Attributes
    result.push("attribute vec3 aVertexPosition;");
    if (options.lightingEnabled) {
      result.push("attribute vec3 aVertexNormal;");
    }
    if (options.vertexColorEnabled) {
      result.push("attribute vec4 aVertexColor;");
    }
    if (options.textureEnabled) {
      result.push("attribute vec2 aTextureCoord;");
    }

    // Uniforms
    result.push("uniform mat4 uMVPMatrix;");
    if (options.lightingEnabled) {
      result.push("uniform mat4 uMMatrix;");
      result.push("uniform mat3 uMMatrixInverseTranspose;");
    }
    result.push("uniform vec4 uDiffuseColor;");

    // Varyings
    result.push("varying vec4 vDiffuseColor;");
    if (options.lightingEnabled) {
      result.push("varying vec3 vPositionWS;");
      result.push("varying vec3 vNormalWS;");
    }
    if (options.textureEnabled) {
      result.push("varying vec2 vTextureCoord;");
    }

    // Code
    result.push("void main(void) {");
    result.push("  gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);");
    if (options.lightingEnabled) {
      result.push("  vDiffuseColor = vec4(1, 1, 1, uDiffuseColor.a);");
      result.push("  vPositionWS = (uMMatrix * vec4(aVertexPosition, 1.0)).xyz;");
      result.push("  vNormalWS = normalize(uMMatrixInverseTranspose * aVertexNormal);");
    } else {
      result.push("  vDiffuseColor = uDiffuseColor;");
    }
    if (options.vertexColorEnabled) {
      result.push("  vDiffuseColor *= aVertexColor;");
    }
    if (options.textureEnabled) {
      result.push("  vTextureCoord = aTextureCoord;");
    }
    result.push("}");
    
    return result.join('\n');
  }

  function buildFragmentShader(options) {
    var result = [];

    result.push("precision mediump float;");

    result.push("varying vec4 vDiffuseColor;");

    if (options.textureEnabled) {
      result.push("varying vec2 vTextureCoord;");
      result.push("uniform sampler2D uSampler;");
    }

    if (options.lightingEnabled) {
      result.push("uniform vec4 uDiffuseColor;");
      result.push("uniform vec3 uEmissiveColor;");
      result.push("uniform vec3 uSpecularColor;");
      result.push("uniform float uSpecularPower;");

      addLighting(result);
    }

    result.push(Zia.SharedProgramCode.common);

    result.push("void main(void) {");
    result.push("  vec4 color = vDiffuseColor;");

    if (options.textureEnabled) {
      result.push("  color *= texture2D(uSampler, vTextureCoord);");
    }

    if (options.lightingEnabled) {
      result.push("  vec3 eyeVector = normalize(uEyePosition - vPositionWS);");
      result.push("  vec3 worldNormal = normalize(vNormalWS);");
      result.push("  ColorPair lightResult = ComputeLights(eyeVector, worldNormal);");
      result.push("  color.rgb *= lightResult.Diffuse;");
      result.push("  AddSpecular(color, lightResult.Specular);");
    }

    result.push("  gl_FragColor = color;");
    result.push("}");

    return result.join('\n');
  }

  Zia.BasicProgram = function (graphicsDevice, options) {
    this._dirtyFlags = Zia.ProgramDirtyFlags.All;

    this.modelMatrix = new Zia.Matrix4();
    this.viewMatrix = new Zia.Matrix4();
    this.projectionMatrix = new Zia.Matrix4();
    this._modelView = new Zia.Matrix4();
    this.diffuseColor = new Zia.Vector3(1, 1, 1);
    this.emissiveColor = new Zia.Vector3();
    this.specularColor = new Zia.Vector3(1, 1, 1);
    this.specularPower = 16;
    this.alpha = 1;
    this.texture = null;
    this.ambientLightColor = new Zia.Vector3();

    this._directionalLight0 = new Zia.DirectionalLight(this, 0);
    this._directionalLight1 = new Zia.DirectionalLight(this, 1);
    this._directionalLight2 = new Zia.DirectionalLight(this, 2);

    this._directionalLight0.enabled = true;

    options = Zia.ObjectUtil.reverseMerge(options || {}, {
      lightingEnabled: false,
      textureEnabled: false,
      vertexColorEnabled: false
    });
    this._options = options;

    var vertexShader = new Zia.VertexShader(graphicsDevice, buildVertexShader(options));
    var fragmentShader = new Zia.FragmentShader(graphicsDevice, buildFragmentShader(options));

    Zia.Program.call(this, graphicsDevice, vertexShader, fragmentShader);
  };
})();

(function() {
  var DF = Zia.ProgramDirtyFlags;

  Zia.BasicProgram.prototype = Object.create(Zia.Program.prototype, {
    modelMatrix: {
      get: function() { return this._modelMatrix; },
      set: function(v) {
        this._modelMatrix = v;
        this._dirtyFlags |= DF.Model | DF.ModelViewProj | DF.Fog;
      }
    },

    viewMatrix: {
      get: function() { return this._viewMatrix; },
      set: function(v) {
        this._viewMatrix = v;
        this._dirtyFlags |= DF.ModelViewProj | DF.EyePosition | DF.Fog;
      }
    },

    projectionMatrix: {
      get: function() { return this._projectionMatrix; },
      set: function(v) {
        this._projectionMatrix = v;
        this._dirtyFlags |= DF.ModelViewProj;
      }
    },

    diffuseColor: {
      get: function() { return this._diffuseColor; },
      set: function(v) {
        this._diffuseColor = v;
        this._dirtyFlags |= DF.MaterialColor;
      }
    },

    emissiveColor: {
      get: function() { return this._emissiveColor; },
      set: function(v) {
        this._emissiveColor = v;
        this._dirtyFlags |= DF.MaterialColor;
      }
    },

    specularColor: {
      get: function() { return this._specularColor; },
      set: function(v) {
        this._specularColor = v;
        this._dirtyFlags |= DF.SpecularColor;
      }
    },

    specularPower: {
      get: function() { return this._specularPower; },
      set: function(v) {
        this._specularPower = v;
        this._dirtyFlags |= DF.SpecularPower;
      }
    },

    alpha: {
      get: function() { return this._alpha; },
      set: function(v) {
        this._alpha = v;
        this._dirtyFlags |= DF.MaterialColor;
      }
    },

    texture: {
      get: function() { return this._texture; },
      set: function(v) {
        this._texture = v;
        this._dirtyFlags |= DF.Texture;
      }
    },

    ambientLightColor: {
      get: function() { return this._ambientLightColor; },
      set: function(v) {
        this._ambientLightColor = v;
        this._dirtyFlags |= DF.MaterialColor;
      }
    },

    directionalLight0: {
      get: function() { return this._directionalLight0; }
    },

    directionalLight1: {
      get: function() { return this._directionalLight1; }
    },

    directionalLight2: {
      get: function() { return this._directionalLight2; }
    }
  });

  Zia.BasicProgram.prototype.enableDefaultLighting = function() {
    if (!this._options.lightingEnabled) {
      throw "Lighting must be enabled when creating this program.";
    }

    this.ambientLightColor = Zia.ProgramUtil.enableDefaultLighting(
      this._directionalLight0,
      this._directionalLight1,
      this._directionalLight2);
  };

  Zia.BasicProgram.prototype._onApply = (function() {
    var modelViewProjectionMatrix = new Zia.Matrix4();
    
    var diffuseColor = new Zia.Vector4();

    return function() {

      // Recompute the model+view+projection matrix?
      this._dirtyFlags = Zia.ProgramUtil.setModelViewProj(
        this, this._dirtyFlags,
        this._modelMatrix, this._viewMatrix, this._projectionMatrix,
        this._modelView);
      
      // Recompute the diffuse/emissive/alpha material color parameters?
      if ((this._dirtyFlags & DF.MaterialColor) != 0) {
        Zia.ProgramUtil.setMaterialColor(
          this, this._options.lightingEnabled,
          this._alpha, this._diffuseColor, this._emissiveColor,
          this._ambientLightColor);

        this._dirtyFlags &= ~DF.MaterialColor;
      }

      if ((this._dirtyFlags & DF.SpecularColor) != 0) {
        this.setUniform('uSpecularColor', this._specularColor);
        this._dirtyFlags &= ~DF.SpecularColor;
      }

      if ((this._dirtyFlags & DF.SpecularPower) != 0) {
        this.setUniform('uSpecularPower', this._specularPower);
        this._dirtyFlags &= ~DF.SpecularPower;
      }

      if (this._options.lightingEnabled) {
          // Recompute the world inverse transpose and eye position?
          this._dirtyFlags = Zia.ProgramUtil.setLightingMatrices(
            this, this._dirtyFlags, this._modelMatrix, this._viewMatrix);
      }

      if ((this._dirtyFlags & DF.Texture) != 0) {
        if ((this._texture !== null && this._texture._ready === true) || this._texture === null) {
          this.setUniform('uSampler', this._texture);
          this._dirtyFlags &= ~DF.Texture;
        }
      }

      this._directionalLight0._apply();
      this._directionalLight1._apply();
      this._directionalLight2._apply();
    };
  })();
})();

Zia.DirectionalLight = function(program, index) {
  this._program = program;
  this._index = index;

  this.direction = new Zia.Vector3();
  this.diffuseColor = new Zia.Vector3();
  this.specularColor = new Zia.Vector3();
  this.enabled = false;
};

Zia.DirectionalLight.prototype = {

  get direction() {
    return this._direction;
  },

  set direction(v) {
    this._direction = v;
    this._directionChanged = true;
  },

  get diffuseColor() {
    return this._diffuseColor;
  },

  set diffuseColor(v) {
    this._diffuseColor = v;
    this._diffuseColorChanged = true;
  },

  get specularColor() {
    return this._specularColor;
  },

  set specularColor(v) {
    this._specularColor = v;
    this._specularColorChanged = true;
  },

  get enabled() {
    return this._enabled;
  },

  set enabled(v) {
    this._enabled = v;
    this._enabledChanged = true;
  },

  _apply: (function() {
    var zero = new Zia.Vector3();

    return function() {
      if (this._directionChanged) {
        this._setUniform("Direction", this._direction);
        this._directionChanged = false;
      }

      if (this._diffuseColorChanged && this._enabled) {
        this._setUniform("DiffuseColor", this._diffuseColor);
        this._diffuseColorChanged = false;
      }
      
      if (this._specularColorChanged && this._enabled) {
        this._setUniform("SpecularColor", this._specularColor);
        this._specularColorChanged = false;
      }

      if (this._enabledChanged) {
        if (!this._enabled) {
          this._setUniform("DiffuseColor", zero);
          this._setUniform("SpecularColor", zero);
        }
        this._enabledChanged = false;
      }
    };
  })(),

  _setUniform: function(name, value) {
    this._program.setUniform("uDirLight" + this._index + name, value);
  }

};

// Copyright (c) 2010-2014 SharpDX - Alexandre Mutel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// -----------------------------------------------------------------------------
// The following code is a port of XNA StockEffects http://xbox.create.msdn.com/en-US/education/catalog/sample/stock_effects
// -----------------------------------------------------------------------------
// Microsoft Public License (Ms-PL)
//
// This license governs use of the accompanying software. If you use the 
// software, you accept this license. If you do not accept the license, do not
// use the software.
//
// 1. Definitions
// The terms "reproduce," "reproduction," "derivative works," and 
// "distribution" have the same meaning here as under U.S. copyright law.
// A "contribution" is the original software, or any additions or changes to 
// the software.
// A "contributor" is any person that distributes its contribution under this 
// license.
// "Licensed patents" are a contributor's patent claims that read directly on 
// its contribution.
//
// 2. Grant of Rights
// (A) Copyright Grant- Subject to the terms of this license, including the 
// license conditions and limitations in section 3, each contributor grants 
// you a non-exclusive, worldwide, royalty-free copyright license to reproduce
// its contribution, prepare derivative works of its contribution, and 
// distribute its contribution or any derivative works that you create.
// (B) Patent Grant- Subject to the terms of this license, including the license
// conditions and limitations in section 3, each contributor grants you a 
// non-exclusive, worldwide, royalty-free license under its licensed patents to
// make, have made, use, sell, offer for sale, import, and/or otherwise dispose
// of its contribution in the software or derivative works of the contribution 
// in the software.
//
// 3. Conditions and Limitations
// (A) No Trademark License- This license does not grant you rights to use any 
// contributors' name, logo, or trademarks.
// (B) If you bring a patent claim against any contributor over patents that 
// you claim are infringed by the software, your patent license from such 
// contributor to the software ends automatically.
// (C) If you distribute any portion of the software, you must retain all 
// copyright, patent, trademark, and attribution notices that are present in the
// software.
// (D) If you distribute any portion of the software in source code form, you 
// may do so only under this license by including a complete copy of this 
// license with your distribution. If you distribute any portion of the software
// in compiled or object code form, you may only do so under a license that 
// complies with this license.
// (E) The software is licensed "as-is." You bear the risk of using it. The
// contributors give no express warranties, guarantees or conditions. You may
// have additional consumer rights under your local laws which this license 
// cannot change. To the extent permitted under your local laws, the 
// contributors exclude the implied warranties of merchantability, fitness for a
// particular purpose and non-infringement.
//-----------------------------------------------------------------------------
// Common.fxh
//
// Microsoft XNA Community Game Platform
// Copyright (C) Microsoft Corporation. All rights reserved.
//-----------------------------------------------------------------------------

Zia.SharedProgramCode = {

  common: [
    "void AddSpecular(inout vec4 color, vec3 specular) {",
    "  color.rgb += specular * color.a;",
    "}"
  ].join('\n'),

  lighting: [
    "struct ColorPair {",
    "  vec3 Diffuse;",
    "  vec3 Specular;",
    "};",

    "ColorPair ComputeLights(vec3 eyeVector, vec3 worldNormal) {",
    "  mat3 lightDirections;",
    "  mat3 lightDiffuse;",
    "  mat3 lightSpecular;",
    "  mat3 halfVectors;",

    "  for (int i = 0; i < 3; i++) {",
    "    lightDirections[i] = mat3(uDirLight0Direction,     uDirLight1Direction,     uDirLight2Direction)    [i];",
    "    lightDiffuse[i]    = mat3(uDirLight0DiffuseColor,  uDirLight1DiffuseColor,  uDirLight2DiffuseColor) [i];",
    "    lightSpecular[i]   = mat3(uDirLight0SpecularColor, uDirLight1SpecularColor, uDirLight2SpecularColor)[i];",
    "    halfVectors[i] = normalize(eyeVector - lightDirections[i]);",
    "  }",

    "  vec3 dotL = worldNormal * -lightDirections;",
    "  vec3 dotH = worldNormal * halfVectors;",

    "  vec3 zeroL = step(vec3(0.0), dotL);",

    "  vec3 diffuse  = zeroL * dotL;",
    "  vec3 specular = pow(max(dotH, vec3(0.0)) * zeroL, vec3(uSpecularPower));",

    "  ColorPair result;",

    "  result.Diffuse  = (lightDiffuse * diffuse)  * uDiffuseColor.rgb + uEmissiveColor;",
    "  result.Specular = (lightSpecular * specular) * uSpecularColor;",

    "  return result;",
    "}"
  ].join('\n')

};

(function () {
  function throwOnGLError(err, funcName, args) {
    throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
  }

  function validateNoneOfTheArgsAreUndefined(functionName, args) {
    for (var ii = 0; ii < args.length; ++ii) {
      if (args[ii] === undefined) {
        throw "undefined passed to gl." + functionName + "(" + 
          WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")";
      }
    }
  }

  Zia.DebugUtil = {
    makeDebugContext: function (gl) {
      return WebGLDebugUtils.makeDebugContext(gl, throwOnGLError,
        validateNoneOfTheArgsAreUndefined);
    }
  };
})();

Zia.EnumUtil = {
  hasFlag: function (value, flag) {
    return (value & flag) === flag;
  }
};

Zia.ObjectUtil = {
  reverseMerge: function (object, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key) && !(key in object)) {
        object[key] = source[key];
      }
    }
    return object;
  }
};