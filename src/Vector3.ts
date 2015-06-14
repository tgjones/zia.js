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
   * Represents a 3-dimensional vector.
   */
  export class Vector3 {
    private _x: number;
    private _y: number;
    private _z: number;

    /**
     * Constructs a new 3-dimensional vector.
     *
     * @param {Number} [x=0.0] - The value for the x coordinate.
     * @param {Number} [y=0.0] - The value for the y coordinate.
     * @param {Number} [z=0.0] - The value for the z coordinate.
     */
    constructor(x = 0.0, y = 0.0, z = 0.0) {
      this._x = x;
      this._y = y;
      this._z = z;
    };

    get x() {
      return this._x;
    }

    set x(v) {
      this._x = v;
      this._onChangeCallback();
    }

    get y() {
      return this._y;
    }

    set y(v) {
      this._y = v;
      this._onChangeCallback();
    }

    get z() {
      return this._z;
    }

    set z(v) {
      this._z = v;
      this._onChangeCallback();
    }

    set(x: number, y: number, z: number) {
      this._x = x;
      this._y = y;
      this._z = z;
      this._onChangeCallback();
      return this;
    }

    private static _quaternionTemp = new Quaternion();

    applyEuler(euler: Euler) {
      Quaternion.createFromEuler(euler, Vector3._quaternionTemp);
      this.applyQuaternion(Vector3._quaternionTemp);
      return this;
    }

    applyAxisAngle(axis: Vector3, angle: number) {
      Quaternion.createFromAxisAngle(axis, angle, Vector3._quaternionTemp);
      this.applyQuaternion(Vector3._quaternionTemp);
      return this;
    }

    applyMatrix3(m: Matrix3) {
      var x = this._x;
      var y = this._y;
      var z = this._z;

      var e = m.elements;

      this._x = e[0] * x + e[3] * y + e[6] * z;
      this._y = e[1] * x + e[4] * y + e[7] * z;
      this._z = e[2] * x + e[5] * y + e[8] * z;

      this._onChangeCallback();

      return this;
    }

    applyMatrix4(m: Matrix4) {

      // input: Zia.Matrix4 affine matrix

      var x = this._x, y = this._y, z = this._z;

      var e = m.elements;

      this._x = e[0] * x + e[4] * y + e[8]  * z + e[12];
      this._y = e[1] * x + e[5] * y + e[9]  * z + e[13];
      this._z = e[2] * x + e[6] * y + e[10] * z + e[14];

      this._onChangeCallback();

      return this;

    }

    applyProjection(m: Matrix4) {

      // input: Zia.Matrix4 projection matrix

      var x = this._x, y = this._y, z = this._z;

      var e = m.elements;
      var d = 1 / ( e[3] * x + e[7] * y + e[11] * z + e[15] ); // perspective divide

      this._x = ( e[0] * x + e[4] * y + e[8]  * z + e[12] ) * d;
      this._y = ( e[1] * x + e[5] * y + e[9]  * z + e[13] ) * d;
      this._z = ( e[2] * x + e[6] * y + e[10] * z + e[14] ) * d;

      this._onChangeCallback();

      return this;

    }

    applyQuaternion(q: Quaternion) {
      var x = this._x;
      var y = this._y;
      var z = this._z;

      var qx = q.x;
      var qy = q.y;
      var qz = q.z;
      var qw = q.w;

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
    }

    transformDirection(m: Matrix4) {
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
    }

    nearEqual(right: Vector3, epsilon: Vector3) {
      return Zia.MathUtil.withinEpsilon(this._x, right._x, epsilon._x) &&
        Zia.MathUtil.withinEpsilon(this._y, right._y, epsilon._y) &&
        Zia.MathUtil.withinEpsilon(this._z, right._z, epsilon._z);
    }

    add(value: Vector3) {
      return Vector3.add(this, value, this);
    }

    subtract(value: Vector3) {
      return Vector3.subtract(this, value, this);
    }

    multiply(value: Vector3) {
      return Vector3.multiply(this, value, this);
    }

    multiplyScalar(value: number) {
      return Vector3.multiplyScalar(this, value, this);
    }

    negate() {
      return Zia.Vector3.negate(this, this);
    }

    /**
     * Returns the square of the length of this vector.
     * @method
     *
     * @returns {Zia.Vector3} The square of the length of this vector.
     */
    lengthSquared() {
      return this._x * this._x + this._y * this._y + this._z * this._z;
    }

    /**
     * Returns the length of this vector.
     * @method
     *
     * @returns {Zia.Vector3} The square of the length of this vector.
     */
    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    }

    /**
     * Turns this vector into a unit vector.
     * @method
     */
    normalize() {
      return Zia.Vector3.normalize(this, this);
    }

    /**
     * Tests if this vector and the specified vector have the same coordinates.
     * @method
     *
     * @param {Zia.Vector3} other - The other vector to test for equality against.
     * @returns {Boolean} True if the vectors have the same coordinates, otherwise false.
     */
    equals(v: Vector3) {
      return (v._x === this._x) && (v._y === this._y) && (v._z === this._z);
    }

    onChange(callback: () => void) {
      this._onChangeCallback = callback;
      return this;
    }

    _onChangeCallback() {}

    suppressChangeCallback(func: () => void) {
      var temp = this._onChangeCallback;
      this._onChangeCallback = function () { };
      func();
      this._onChangeCallback = temp;
    }

    /**
     * Duplicates the current Vector3 instance.
     * @method
     *
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    clone(result = new Vector3()) {
      result.set(this._x, this._y, this._z);
      return result;
    }

    toJS() {
      return [ this._x, this._y, this._z ];
    }

    toArray() {
      return this.toJS();
    }

    /**
     * Adds two vectors.
     * @method
     *
     * @param {Zia.Vector3} value1 - The first vector.
     * @param {Zia.Vector3} value2 - The second vector.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static add(a: Vector3, b: Vector3, result: Vector3) {
      result._x = a._x + b._x;
      result._y = a._y + b._y;
      result._z = a._z + b._z;
      result._onChangeCallback();
      return result;
    }

    /**
     * Calls Math.ceil on each of the components of the specified vector.
     * @method
     *
     * @param {Zia.Vector3} value - The vector to perform the ceil operation on.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static ceil(value: Vector3, result: Vector3) {
      result._x = Math.ceil(value._x);
      result._y = Math.ceil(value._y);
      result._z = Math.ceil(value._z);
      result._onChangeCallback();
      return result;
    }

    /**
     * Restricts a value to be within a specified range.
     * @method
     *
     * @param {Zia.Vector3} value - The value to clamp.
     * @param {Zia.Vector3} min - The minimum value.
     * @param {Zia.Vector3} max - The maximum value.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static clamp(value: Vector3, min: Vector3, max: Vector3, result: Vector3) {
      if (value._x < min._x) {
        result._x = min._x;
      } else if (value._x > max._x) {
        result._x = max._x;
      }

      if (value._y < min._y) {
        result._y = min._y;
      } else if (value._y > max._y) {
        result._y = max._y;
      }

      if (value._z < min._z) {
        result._z = min._z;
      } else if (value._z > max._z) {
        result._z = max._z;
      }

      result._onChangeCallback();
      return result;
    }

    /**
     * Calculates the cross product of two vectors.
     * @method
     *
     * @param {Zia.Vector3} value1 - The first vector.
     * @param {Zia.Vector3} value2 - The second vector.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static cross(a: Vector3, b: Vector3, result = new Vector3()) {
      var x = a._x, y = a._y, z = a._z;

      result._x = y * b._z - z * b._y;
      result._y = z * b._x - x * b._z;
      result._z = x * b._y - y * b._x;

      result._onChangeCallback();

      return result;
    }

    /**
     * Calculates the distance between two vectors.
     * @method
     *
     * @param {Zia.Vector3} value1 - The first vector.
     * @param {Zia.Vector3} value2 - The second vector.
     * @returns {Number} The distance between the two vectors.
     */
    static distance(value1: Vector3, value2: Vector3) {
      return Math.sqrt(Vector3.distanceSquared(value1, value2));
    }

    /**
     * Calculates the square of the distance between two vectors.
     * @method
     *
     * @param {Zia.Vector3} value1 - The first vector.
     * @param {Zia.Vector3} value2 - The second vector.
     * @returns {Number} Square of the distance between the two vectors.
     */
    static distanceSquared(value1: Vector3, value2: Vector3) {
      var dx = value1._x - value2._x;
      var dy = value1._y - value2._y;
      var dz = value1._z - value2._z;
      return dx * dx + dy * dy + dz * dz;
    }

    /**
     * Divides two vectors. This is a simple division of the corresponding
     * components of each vector.
     * @method
     *
     * @param {Zia.Vector3} value1 - The first vector.
     * @param {Zia.Vector3} value2 - The second vector.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static divide(value1: Vector3, value2: Vector3, result: Vector3) {
      result._x = value1._x / value2._x;
      result._y = value1._y / value2._y;
      result._z = value1._z / value2._z;
      result._onChangeCallback();
      return result;
    }

    /**
     * Divides a vector by a scalar value.
     * @method
     *
     * @param {Zia.Vector3} value - The vector.
     * @param {Number} scalar - The scalar value.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static divideScalar(v: Vector3, scalar: number, result: Vector3) {
      result._x = v._x / scalar;
      result._y = v._y / scalar;
      result._z = v._z / scalar;

      result._onChangeCallback();

      return result;
    }

    /**
     * Calculates the dot product of two vectors.
     * @method
     *
     * @param {Zia.Vector3} value1 - The first vector.
     * @param {Zia.Vector3} value2 - The second vector.
     * @returns {Number} The dot product.
     */
    static dot(value1: Vector3, value2: Vector3) {
      return value1._x * value2._x
           + value1._y * value2._y
           + value1._z * value2._z;
    }

    /**
     * Calls Math.floor on each of the components of the specified vector.
     * @method
     *
     * @param {Zia.Vector3} value - The vector to perform the floor operation on.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static floor(value: Vector3, result: Vector3) {
      result._x = Math.floor(value._x);
      result._y = Math.floor(value._y);
      result._z = Math.floor(value._z);
      result._onChangeCallback();
      return result;
    }

    /**
     * Performs a linear interpolation between two vectors.
     * @method
     *
     * @param {Zia.Vector3} value1 - The first vector.
     * @param {Zia.Vector3} value2 - The second vector.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static lerp(value1: Vector3, value2: Vector3, amount: number, result = new Vector3()) {
      result._x = value1._x + (value2._x - value1._x) * amount;
      result._y = value1._y + (value2._y - value1._y) * amount;
      result._z = value1._z + (value2._z - value1._z) * amount;
      result._onChangeCallback();
      return result;
    }

    /**
     * Computes a vector that contains the largest components of the specified vectors.
     * @method
     *
     * @param {Zia.Vector3} value1 - The first vector.
     * @param {Zia.Vector3} value2 - The second vector.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static max(value1: Vector3, value2: Vector3, result: Vector3) {
      result._x = (value1._x > value2._x) ? value1._x : value2._x;
      result._y = (value1._y > value2._y) ? value1._y : value2._y;
      result._z = (value1._z > value2._z) ? value1._z : value2._z;
      result._onChangeCallback();
      return result;
    }

    /**
     * Computes a vector that contains the smallest components of the specified vectors.
     * @method
     *
     * @param {Zia.Vector3} value1 - The first vector.
     * @param {Zia.Vector3} value2 - The second vector.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static min(value1: Vector3, value2: Vector3, result: Vector3) {
      result._x = (value1._x < value2._x) ? value1._x : value2._x;
      result._y = (value1._y < value2._y) ? value1._y : value2._y;
      result._z = (value1._z < value2._z) ? value1._z : value2._z;
      result._onChangeCallback();
      return result;
    }

    /**
     * Multiplies two vectors. Note that this is not a dot product or cross product,
     * but a simple multiplication of the components of each vector.
     * @method
     *
     * @param {Zia.Vector3} value1 - The first vector.
     * @param {Zia.Vector3} value2 - The second vector.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static multiply(value1: Vector3, value2: Vector3, result: Vector3) {
      result._x = value1._x * value2._x;
      result._y = value1._y * value2._y;
      result._z = value1._z * value2._z;
      result._onChangeCallback();
      return result;
    }

    /**
     * Multiplies a vector by a scalar value.
     * @method
     *
     * @param {Zia.Vector3} value - The vector.
     * @param {Number} scalar - The scalar value.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static multiplyScalar(v: Vector3, scalar: number, result: Vector3) {
      result._x = v._x * scalar;
      result._y = v._y * scalar;
      result._z = v._z * scalar;

      result._onChangeCallback();

      return result;
    }

    /**
     * Calculates a vector pointing in the opposite direction.
     * @method
     *
     * @param {Zia.Vector3} value - The vector to negate.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static negate(value: Vector3, result: Vector3) {
      return Vector3.multiplyScalar(value, -1, result);
    }

    /**
     * Turns a vector into a unit vector.
     * @method
     *
     * @param {Zia.Vector3} value - The vector to normalize.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static normalize(value: Vector3, result: Vector3) {
      return Vector3.divideScalar(value, value.length(), result);
    }

    /**
     * Computes the reflection of a vector from a surface with the specified normal.
     * @method
     *
     * @param {Zia.Vector3} value - The vector.
     * @param {Zia.Vector3} value - The surface normal.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static reflect = (function() {
      // reflect incident vector off plane orthogonal to normal
      // normal is assumed to have unit length
      var v1 = new Vector3();

      return function(value: Vector3, normal: Vector3, result = new Vector3()) {
        normal.clone(v1);
        Vector3.multiplyScalar(v1, 2 * Vector3.dot(value, normal), v1);
        return Vector3.subtract(value, v1, result);
      };
    })();

    /**
     * Subtracts one vector from another.
     * @method
     *
     * @param {Zia.Vector3} value1 - The first vector.
     * @param {Zia.Vector3} value2 - The second vector.
     * @param {Zia.Vector3} result - The object in which to store the result.
     * @returns {Zia.Vector3} The modified result parameter.
     */
    static subtract(a: Vector3, b: Vector3, result: Vector3) {
      result._x = a._x - b._x;
      result._y = a._y - b._y;
      result._z = a._z - b._z;

      result._onChangeCallback();

      return result;
    }
  }
}
