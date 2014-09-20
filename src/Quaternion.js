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
