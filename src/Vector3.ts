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

    copy(v: Vector3) {
      this._x = v._x;
      this._y = v._y;
      this._z = v._z;

      this._onChangeCallback();

      return this;
    }

    add(v: Vector3) {
      this._x += v._x;
      this._y += v._y;
      this._z += v._z;

      this._onChangeCallback();

      return this;
    }

    addScalar(s: number) {
      this._x += s;
      this._y += s;
      this._z += s;

      this._onChangeCallback();

      return this;
    }

    addVectors(a: Vector3, b: Vector3) {
      this._x = a._x + b._x;
      this._y = a._y + b._y;
      this._z = a._z + b._z;

      this._onChangeCallback();

      return this;
    }

    sub(v: Vector3) {
      this._x -= v._x;
      this._y -= v._y;
      this._z -= v._z;

      this._onChangeCallback();

      return this;
    }

    subVectors(a: Vector3, b: Vector3) {
      this._x = a._x - b._x;
      this._y = a._y - b._y;
      this._z = a._z - b._z;

      this._onChangeCallback();

      return this;
    }

    multiply(v: Vector3) {
      this._x *= v._x;
      this._y *= v._y;
      this._z *= v._z;

      this._onChangeCallback();

      return this;
    }

    multiplyScalar(scalar: number) {
      this._x *= scalar;
      this._y *= scalar;
      this._z *= scalar;

      this._onChangeCallback();

      return this;
    }

    multiplyVectors(a: Vector3, b: Vector3) {
      this._x = a._x * b._x;
      this._y = a._y * b._y;
      this._z = a._z * b._z;

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

    divide(v: Vector3) {
      this._x /= v._x;
      this._y /= v._y;
      this._z /= v._z;

      this._onChangeCallback();

      return this;
    }

    divideScalar(scalar: number) {
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
    }

    min(v: Vector3) {

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

    }

    max( v: Vector3 ) {

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

    }

    clamp( min: Vector3, max: Vector3 ) {

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

    }

    private static _clampScalarMinTemp = new Vector3();
    private static _clampScalarMaxTemp = new Vector3();

    clampScalar(minVal: number, maxVal: number) {
      Vector3._clampScalarMinTemp.set(minVal, minVal, minVal);
      Vector3._clampScalarMaxTemp.set(maxVal, maxVal, maxVal);

      return this.clamp(Vector3._clampScalarMinTemp, Vector3._clampScalarMaxTemp);
    }

    floor() {
      this._x = Math.floor(this._x);
      this._y = Math.floor(this._y);
      this._z = Math.floor(this._z);

      this._onChangeCallback();

      return this;
    }

    ceil() {
      this._x = Math.ceil(this._x);
      this._y = Math.ceil(this._y);
      this._z = Math.ceil(this._z);

      this._onChangeCallback();

      return this;
    }

    round() {
      this._x = Math.round(this._x);
      this._y = Math.round(this._y);
      this._z = Math.round(this._z);

      this._onChangeCallback();

      return this;
    }

    roundToZero() {
      this._x = (this._x < 0) ? Math.ceil(this._x) : Math.floor(this._x);
      this._y = (this._y < 0) ? Math.ceil(this._y) : Math.floor(this._y);
      this._z = (this._z < 0) ? Math.ceil(this._z) : Math.floor(this._z);

      this._onChangeCallback();

      return this;
    }

    negate() {
      return this.multiplyScalar(-1);
    }

    nearEqual(right: Vector3, epsilon: Vector3) {
      return Zia.MathUtil.withinEpsilon(this._x, right._x, epsilon._x) &&
        Zia.MathUtil.withinEpsilon(this._y, right._y, epsilon._y) &&
        Zia.MathUtil.withinEpsilon(this._z, right._z, epsilon._z);
    }

    dot(v: Vector3) {
      return this._x * v._x + this._y * v._y + this._z * v._z;
    }

    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z;
    }

    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    }

    normalize() {
      return this.divideScalar(this.length());
    }

    lerp(v: Vector3, alpha: number) {
      this._x += (v._x - this._x) * alpha;
      this._y += (v._y - this._y) * alpha;
      this._z += (v._z - this._z) * alpha;

      this._onChangeCallback();

      return this;
    }

    cross(v: Vector3) {
      var x = this._x, y = this._y, z = this._z;

      this._x = y * v._z - z * v._y;
      this._y = z * v._x - x * v._z;
      this._z = x * v._y - y * v._x;

      this._onChangeCallback();

      return this;
    }

    crossVectors(a: Vector3, b: Vector3) {
      var ax = a._x, ay = a._y, az = a._z;
      var bx = b._x, by = b._y, bz = b._z;

      this._x = ay * bz - az * by;
      this._y = az * bx - ax * bz;
      this._z = ax * by - ay * bx;

      this._onChangeCallback();

      return this;
    }

    private static _projectOnVectorTemp = new Vector3();

    projectOnVector(vector: Vector3) {
      Vector3._projectOnVectorTemp.copy(vector).normalize();
      var dot = this.dot(Vector3._projectOnVectorTemp);
      return this.copy(Vector3._projectOnVectorTemp).multiplyScalar(dot);
    }

    private static _projectOnPlaneTemp = new Vector3();

    projectOnPlane(planeNormal: Vector3) {
      Vector3._projectOnPlaneTemp.copy(this).projectOnVector(planeNormal);
      return this.sub(Vector3._projectOnPlaneTemp);
    }

    private static _reflectTemp = new Vector3();

    reflect(normal: Vector3) {
      // reflect incident vector off plane orthogonal to normal
      // normal is assumed to have unit length
      return this.sub(Vector3._reflectTemp.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }

    angleTo(v: Vector3) {
      var theta = this.dot(v) / (this.length() * v.length());

      // clamp, to handle numerical problems
      return Math.acos(MathUtil.clamp(theta, -1, 1));
    }

    distanceTo(v: Vector3) {
      return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared(v: Vector3) {
      var dx = this._x - v._x;
      var dy = this._y - v._y;
      var dz = this._z - v._z;

      return dx * dx + dy * dy + dz * dz;
    }

    setFromMatrixPosition(m: Matrix4) {
      this._x = m.elements[12];
      this._y = m.elements[13];
      this._z = m.elements[14];

      this._onChangeCallback();

      return this;
    }

    setFromMatrixScale(m: Matrix4) {
      var sx = this.set(m.elements[0], m.elements[1], m.elements[ 2]).length();
      var sy = this.set(m.elements[4], m.elements[5], m.elements[ 6]).length();
      var sz = this.set(m.elements[8], m.elements[9], m.elements[10]).length();

      this._x = sx;
      this._y = sy;
      this._z = sz;

      this._onChangeCallback();

      return this;
    }

    setFromMatrixColumn(index: number, matrix: Matrix4) {
      var offset = index * 4;

      var me = matrix.elements;

      this._x = me[offset];
      this._y = me[offset + 1];
      this._z = me[offset + 2];

      this._onChangeCallback();

      return this;
    }

    equals(v: Vector3) {
      return ((v._x === this._x) && (v._y === this._y) && (v._z === this._z));
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

    clone(result: Vector3) {
      result.set(this._x, this._y, this._z);
      return result;
    }

    toJS() {
      return [ this._x, this._y, this._z ];
    }

    toArray() {
      return this.toJS();
    }

    private static _distanceTemp = new Vector3();

    static distance(a: Vector3, b: Vector3) {
      Zia.Vector3.subtract(a, b, Vector3._distanceTemp);
      return Vector3._distanceTemp.length();
    }

    static add(a: Vector3, b: Vector3, result: Vector3) {
      result._x = a._x + b._x;
      result._y = a._y + b._y;
      result._z = a._z + b._z;

      result._onChangeCallback();

      return result;
    }

    static subtract(a: Vector3, b: Vector3, result: Vector3) {
      result._x = a._x - b._x;
      result._y = a._y - b._y;
      result._z = a._z - b._z;

      result._onChangeCallback();

      return result;
    }

    static multiplyScalar(v: Vector3, scalar: number, result: Vector3) {
      result._x = v._x * scalar;
      result._y = v._y * scalar;
      result._z = v._z * scalar;

      result._onChangeCallback();

      return result;
    }

    static divideScalar(v: Vector3, scalar: number, result: Vector3) {
      result._x = v._x / scalar;
      result._y = v._y / scalar;
      result._z = v._z / scalar;

      result._onChangeCallback();

      return result;
    }

    static cross(a: Vector3, b: Vector3, result: Vector3) {
      var x = a._x, y = a._y, z = a._z;

      result._x = y * b._z - z * b._y;
      result._y = z * b._x - x * b._z;
      result._z = x * b._y - y * b._x;

      result._onChangeCallback();

      return result;
    }
  }
}
