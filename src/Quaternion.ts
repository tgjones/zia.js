/*!
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

module Zia {
  /**
   * Represents a 4-dimensional vector which can be used for rotation.
   */
  export class Quaternion {
    private _x: number;
    private _y: number;
    private _z: number;
    private _w: number;

    /**
     * Constructs a new quaternion.
     *
     * @param The value for the x coordinate.
     * @param The value for the y coordinate.
     * @param The value for the z coordinate.
     * @param The value for the w coordinate.
     */
    constructor(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
      this._x = x;
      this._y = y;
      this._z = z;
      this._w = w;
    };

    get x() {
      return this._x;
    }

    set x(value) {
      this._x = value;
      this._onChangeCallback();
    }

    get y() {
      return this._y;
    }

    set y(value) {
      this._y = value;
      this._onChangeCallback();
    }

    get z() {
      return this._z;
    }

    set z(value) {
      this._z = value;
      this._onChangeCallback();
    }

    get w() {
      return this._w;
    }

    set w(value) {
      this._w = value;
      this._onChangeCallback();
    }

    set(x: number, y: number, z: number, w: number) {
      this._x = x;
      this._y = y;
      this._z = z;
      this._w = w;

      this._onChangeCallback();

      return this;
    }

    copy(quaternion: Quaternion) {
      this._x = quaternion._x;
      this._y = quaternion._y;
      this._z = quaternion._z;
      this._w = quaternion._w;
      this._onChangeCallback();
      return this;
    }

    static createFromEuler(euler: Euler, result: Quaternion) {
      // http://www.mathworks.com/matlabcentral/fileexchange/
      //  20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
      //  content/SpinCalc.m

      var c1 = Math.cos(euler.x / 2);
      var c2 = Math.cos(euler.y / 2);
      var c3 = Math.cos(euler.z / 2);
      var s1 = Math.sin(euler.x / 2);
      var s2 = Math.sin(euler.y / 2);
      var s3 = Math.sin(euler.z / 2);

      if ( euler.order === 'XYZ' ) {
        result._x = s1 * c2 * c3 + c1 * s2 * s3;
        result._y = c1 * s2 * c3 - s1 * c2 * s3;
        result._z = c1 * c2 * s3 + s1 * s2 * c3;
        result._w = c1 * c2 * c3 - s1 * s2 * s3;
      } else if ( euler.order === 'YXZ' ) {
        result._x = s1 * c2 * c3 + c1 * s2 * s3;
        result._y = c1 * s2 * c3 - s1 * c2 * s3;
        result._z = c1 * c2 * s3 - s1 * s2 * c3;
        result._w = c1 * c2 * c3 + s1 * s2 * s3;
      } else if ( euler.order === 'ZXY' ) {
        result._x = s1 * c2 * c3 - c1 * s2 * s3;
        result._y = c1 * s2 * c3 + s1 * c2 * s3;
        result._z = c1 * c2 * s3 + s1 * s2 * c3;
        result._w = c1 * c2 * c3 - s1 * s2 * s3;
      } else if ( euler.order === 'ZYX' ) {
        result._x = s1 * c2 * c3 - c1 * s2 * s3;
        result._y = c1 * s2 * c3 + s1 * c2 * s3;
        result._z = c1 * c2 * s3 - s1 * s2 * c3;
        result._w = c1 * c2 * c3 + s1 * s2 * s3;
      } else if ( euler.order === 'YZX' ) {
        result._x = s1 * c2 * c3 + c1 * s2 * s3;
        result._y = c1 * s2 * c3 + s1 * c2 * s3;
        result._z = c1 * c2 * s3 - s1 * s2 * c3;
        result._w = c1 * c2 * c3 - s1 * s2 * s3;
      } else if ( euler.order === 'XZY' ) {
        result._x = s1 * c2 * c3 - c1 * s2 * s3;
        result._y = c1 * s2 * c3 - s1 * c2 * s3;
        result._z = c1 * c2 * s3 + s1 * s2 * c3;
        result._w = c1 * c2 * c3 + s1 * s2 * s3;
      }

      result._onChangeCallback();

      return result;
    }

    static createFromAxisAngle(axis: Vector3, angle: number, result: Quaternion) {
      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
      // assumes axis is normalized

      var halfAngle = angle / 2, s = Math.sin(halfAngle);

      result._x = axis.x * s;
      result._y = axis.y * s;
      result._z = axis.z * s;
      result._w = Math.cos(halfAngle);

      result._onChangeCallback();

      return result;
    }

    static createFromRotationMatrix(m: Matrix4, result: Quaternion) {
      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
      // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

      var te = m.elements,
        m11 = te[0], m12 = te[4], m13 = te[8],
        m21 = te[1], m22 = te[5], m23 = te[9],
        m31 = te[2], m32 = te[6], m33 = te[10],
        trace = m11 + m22 + m33,
        s: number;

      if ( trace > 0 ) {
        s = 0.5 / Math.sqrt( trace + 1.0 );
        result._w = 0.25 / s;
        result._x = ( m32 - m23 ) * s;
        result._y = ( m13 - m31 ) * s;
        result._z = ( m21 - m12 ) * s;
      } else if ( m11 > m22 && m11 > m33 ) {
        s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );
        result._w = (m32 - m23 ) / s;
        result._x = 0.25 * s;
        result._y = (m12 + m21 ) / s;
        result._z = (m13 + m31 ) / s;
      } else if ( m22 > m33 ) {
        s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );
        result._w = (m13 - m31 ) / s;
        result._x = (m12 + m21 ) / s;
        result._y = 0.25 * s;
        result._z = (m23 + m32 ) / s;
      } else {
        s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );
        result._w = ( m21 - m12 ) / s;
        result._x = ( m13 + m31 ) / s;
        result._y = ( m23 + m32 ) / s;
        result._z = 0.25 * s;
      }

      result._onChangeCallback();

      return result;
    }

    static inverse(quaternion: Quaternion, result: Quaternion) {
      result.copy(quaternion);
      result.conjugate();
      result.normalize();
      return result;
    }

    /**
     * Calculates the conjugate of a quaternion.
     */
    conjugate() {
      this._x *= -1;
      this._y *= -1;
      this._z *= -1;
      this._onChangeCallback();
      return this;
    }

    /**
     * Calculates the length squared of a quaternion.
     */
    lengthSquared() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }

    /**
     * Calculates the length of a quaternion.
     */
    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }

    /**
     * Divides each component by the length of the quaternion.
     */
    normalize() {
      var l = this.length();

      if (l === 0) {
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
    }

    static multiply(a: Quaternion, b: Quaternion, result: Quaternion) {
      // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

      var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
      var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

      result._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      result._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      result._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      result._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

      result._onChangeCallback();

      return result;
    }

    multiply(q: Quaternion) {
      return Quaternion.multiply(this, q, this);
    }

    equals(quaternion: Quaternion) {
      return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );
    }

    onChange(callback: () => void) {
      this._onChangeCallback = callback;
      return this;
    }

    _onChangeCallback() {

    }

    suppressChangeCallback(func: () => void) {
      var temp = this._onChangeCallback;
      this._onChangeCallback = () => { };
      func();
      this._onChangeCallback = temp;
    }

    clone() {
      return new Quaternion( this._x, this._y, this._z, this._w );
    }

    toJS() {
      return [ this._x, this._y, this._z, this._w ];
    }

    static slerp(qa: Quaternion, qb: Quaternion, t: number, result: Quaternion) {
      var x = qa._x, y = qa._y, z = qa._z, w = qa._w;

      // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

      var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

      if (cosHalfTheta < 0) {
        result._w = -qb._w;
        result._x = -qb._x;
        result._y = -qb._y;
        result._z = -qb._z;

        cosHalfTheta = -cosHalfTheta;
      } else {
        result.copy(qb);
      }

      if (cosHalfTheta >= 1.0) {
        result._w = qa.w;
        result._x = qa.x;
        result._y = qa.y;
        result._z = qa.z;

        return;
      }

      var halfTheta = Math.acos(cosHalfTheta);
      var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

      if (Math.abs(sinHalfTheta) < 0.001) {
        result._w = 0.5 * ( w + result._w);
        result._x = 0.5 * ( x + result._x);
        result._y = 0.5 * ( y + result._y);
        result._z = 0.5 * ( z + result._z);

        return;
      }

      var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
      var ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

      result._w = (w * ratioA + result._w * ratioB);
      result._x = (x * ratioA + result._x * ratioB);
      result._y = (y * ratioA + result._y * ratioB);
      result._z = (z * ratioA + result._z * ratioB);

      result._onChangeCallback();
    }
  }
}
