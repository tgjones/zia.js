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
var Zia;
(function (Zia) {
    var Quaternion = (function () {
        function Quaternion(x, y, z, w) {
            if (x === void 0) { x = 0.0; }
            if (y === void 0) { y = 0.0; }
            if (z === void 0) { z = 0.0; }
            if (w === void 0) { w = 1.0; }
            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;
        }
        ;
        Object.defineProperty(Quaternion.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (value) {
                this._z = value;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "w", {
            get: function () {
                return this._w;
            },
            set: function (value) {
                this._w = value;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Quaternion.prototype.set = function (x, y, z, w) {
            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;
            this._onChangeCallback();
            return this;
        };
        Quaternion.prototype.copy = function (quaternion) {
            this._x = quaternion._x;
            this._y = quaternion._y;
            this._z = quaternion._z;
            this._w = quaternion._w;
            this._onChangeCallback();
            return this;
        };
        Quaternion.createFromEuler = function (euler, result) {
            // http://www.mathworks.com/matlabcentral/fileexchange/
            //  20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
            //  content/SpinCalc.m
            var c1 = Math.cos(euler.x / 2);
            var c2 = Math.cos(euler.y / 2);
            var c3 = Math.cos(euler.z / 2);
            var s1 = Math.sin(euler.x / 2);
            var s2 = Math.sin(euler.y / 2);
            var s3 = Math.sin(euler.z / 2);
            if (euler.order === 'XYZ') {
                result._x = s1 * c2 * c3 + c1 * s2 * s3;
                result._y = c1 * s2 * c3 - s1 * c2 * s3;
                result._z = c1 * c2 * s3 + s1 * s2 * c3;
                result._w = c1 * c2 * c3 - s1 * s2 * s3;
            }
            else if (euler.order === 'YXZ') {
                result._x = s1 * c2 * c3 + c1 * s2 * s3;
                result._y = c1 * s2 * c3 - s1 * c2 * s3;
                result._z = c1 * c2 * s3 - s1 * s2 * c3;
                result._w = c1 * c2 * c3 + s1 * s2 * s3;
            }
            else if (euler.order === 'ZXY') {
                result._x = s1 * c2 * c3 - c1 * s2 * s3;
                result._y = c1 * s2 * c3 + s1 * c2 * s3;
                result._z = c1 * c2 * s3 + s1 * s2 * c3;
                result._w = c1 * c2 * c3 - s1 * s2 * s3;
            }
            else if (euler.order === 'ZYX') {
                result._x = s1 * c2 * c3 - c1 * s2 * s3;
                result._y = c1 * s2 * c3 + s1 * c2 * s3;
                result._z = c1 * c2 * s3 - s1 * s2 * c3;
                result._w = c1 * c2 * c3 + s1 * s2 * s3;
            }
            else if (euler.order === 'YZX') {
                result._x = s1 * c2 * c3 + c1 * s2 * s3;
                result._y = c1 * s2 * c3 + s1 * c2 * s3;
                result._z = c1 * c2 * s3 - s1 * s2 * c3;
                result._w = c1 * c2 * c3 - s1 * s2 * s3;
            }
            else if (euler.order === 'XZY') {
                result._x = s1 * c2 * c3 - c1 * s2 * s3;
                result._y = c1 * s2 * c3 - s1 * c2 * s3;
                result._z = c1 * c2 * s3 + s1 * s2 * c3;
                result._w = c1 * c2 * c3 + s1 * s2 * s3;
            }
            result._onChangeCallback();
            return result;
        };
        Quaternion.createFromAxisAngle = function (axis, angle, result) {
            // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
            // assumes axis is normalized
            var halfAngle = angle / 2, s = Math.sin(halfAngle);
            result._x = axis.x * s;
            result._y = axis.y * s;
            result._z = axis.z * s;
            result._w = Math.cos(halfAngle);
            result._onChangeCallback();
            return result;
        };
        Quaternion.createFromRotationMatrix = function (m, result) {
            // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
            // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
            var te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33, s;
            if (trace > 0) {
                s = 0.5 / Math.sqrt(trace + 1.0);
                result._w = 0.25 / s;
                result._x = (m32 - m23) * s;
                result._y = (m13 - m31) * s;
                result._z = (m21 - m12) * s;
            }
            else if (m11 > m22 && m11 > m33) {
                s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
                result._w = (m32 - m23) / s;
                result._x = 0.25 * s;
                result._y = (m12 + m21) / s;
                result._z = (m13 + m31) / s;
            }
            else if (m22 > m33) {
                s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
                result._w = (m13 - m31) / s;
                result._x = (m12 + m21) / s;
                result._y = 0.25 * s;
                result._z = (m23 + m32) / s;
            }
            else {
                s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
                result._w = (m21 - m12) / s;
                result._x = (m13 + m31) / s;
                result._y = (m23 + m32) / s;
                result._z = 0.25 * s;
            }
            result._onChangeCallback();
            return result;
        };
        Quaternion.inverse = function (quaternion, result) {
            result.copy(quaternion);
            result.conjugate();
            result.normalize();
            return result;
        };
        Quaternion.prototype.conjugate = function () {
            this._x *= -1;
            this._y *= -1;
            this._z *= -1;
            this._onChangeCallback();
            return this;
        };
        Quaternion.prototype.lengthSquared = function () {
            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
        };
        Quaternion.prototype.length = function () {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
        };
        Quaternion.prototype.normalize = function () {
            var l = this.length();
            if (l === 0) {
                this._x = 0;
                this._y = 0;
                this._z = 0;
                this._w = 1;
            }
            else {
                l = 1 / l;
                this._x = this._x * l;
                this._y = this._y * l;
                this._z = this._z * l;
                this._w = this._w * l;
            }
            this._onChangeCallback();
        };
        Quaternion.multiply = function (a, b, result) {
            // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
            var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
            var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
            result._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
            result._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
            result._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
            result._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
            result._onChangeCallback();
            return result;
        };
        Quaternion.prototype.multiply = function (q) {
            return Quaternion.multiply(this, q, this);
        };
        Quaternion.prototype.equals = function (quaternion) {
            return (quaternion._x === this._x) && (quaternion._y === this._y) && (quaternion._z === this._z) && (quaternion._w === this._w);
        };
        Quaternion.prototype.onChange = function (callback) {
            this._onChangeCallback = callback;
            return this;
        };
        Quaternion.prototype._onChangeCallback = function () {
        };
        Quaternion.prototype.suppressChangeCallback = function (func) {
            var temp = this._onChangeCallback;
            this._onChangeCallback = function () { };
            func();
            this._onChangeCallback = temp;
        };
        Quaternion.prototype.clone = function () {
            return new Quaternion(this._x, this._y, this._z, this._w);
        };
        Quaternion.prototype.toJS = function () {
            return [this._x, this._y, this._z, this._w];
        };
        Quaternion.slerp = function (qa, qb, t, result) {
            var x = qa._x, y = qa._y, z = qa._z, w = qa._w;
            var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;
            if (cosHalfTheta < 0) {
                result._w = -qb._w;
                result._x = -qb._x;
                result._y = -qb._y;
                result._z = -qb._z;
                cosHalfTheta = -cosHalfTheta;
            }
            else {
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
                result._w = 0.5 * (w + result._w);
                result._x = 0.5 * (x + result._x);
                result._y = 0.5 * (y + result._y);
                result._z = 0.5 * (z + result._z);
                return;
            }
            var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
            var ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
            result._w = (w * ratioA + result._w * ratioB);
            result._x = (x * ratioA + result._x * ratioB);
            result._y = (y * ratioA + result._y * ratioB);
            result._z = (z * ratioA + result._z * ratioB);
            result._onChangeCallback();
        };
        return Quaternion;
    })();
    Zia.Quaternion = Quaternion;
})(Zia || (Zia = {}));


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
var Zia;
(function (Zia) {
    /**
     * Represents a 3-dimensional vector.
     */
    var Vector3 = (function () {
        /**
         * Constructs a new 3-dimensional vector.
         *
         * @param {Number} [x=0.0] - The value for the x coordinate.
         * @param {Number} [y=0.0] - The value for the y coordinate.
         * @param {Number} [z=0.0] - The value for the z coordinate.
         */
        function Vector3(x, y, z) {
            if (x === void 0) { x = 0.0; }
            if (y === void 0) { y = 0.0; }
            if (z === void 0) { z = 0.0; }
            this._x = x;
            this._y = y;
            this._z = z;
        }
        ;
        Object.defineProperty(Vector3.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (v) {
                this._x = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (v) {
                this._y = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (v) {
                this._z = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Vector3.prototype.set = function (x, y, z) {
            this._x = x;
            this._y = y;
            this._z = z;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.copy = function (v) {
            this._x = v._x;
            this._y = v._y;
            this._z = v._z;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.add = function (v) {
            this._x += v._x;
            this._y += v._y;
            this._z += v._z;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.addScalar = function (s) {
            this._x += s;
            this._y += s;
            this._z += s;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.addVectors = function (a, b) {
            this._x = a._x + b._x;
            this._y = a._y + b._y;
            this._z = a._z + b._z;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.sub = function (v) {
            this._x -= v._x;
            this._y -= v._y;
            this._z -= v._z;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.subVectors = function (a, b) {
            this._x = a._x - b._x;
            this._y = a._y - b._y;
            this._z = a._z - b._z;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.multiply = function (v) {
            this._x *= v._x;
            this._y *= v._y;
            this._z *= v._z;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.multiplyScalar = function (scalar) {
            this._x *= scalar;
            this._y *= scalar;
            this._z *= scalar;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.multiplyVectors = function (a, b) {
            this._x = a._x * b._x;
            this._y = a._y * b._y;
            this._z = a._z * b._z;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.applyEuler = function (euler) {
            Zia.Quaternion.createFromEuler(euler, Vector3._quaternionTemp);
            this.applyQuaternion(Vector3._quaternionTemp);
            return this;
        };
        Vector3.prototype.applyAxisAngle = function (axis, angle) {
            Zia.Quaternion.createFromAxisAngle(axis, angle, Vector3._quaternionTemp);
            this.applyQuaternion(Vector3._quaternionTemp);
            return this;
        };
        Vector3.prototype.applyMatrix3 = function (m) {
            var x = this._x;
            var y = this._y;
            var z = this._z;
            var e = m.elements;
            this._x = e[0] * x + e[3] * y + e[6] * z;
            this._y = e[1] * x + e[4] * y + e[7] * z;
            this._z = e[2] * x + e[5] * y + e[8] * z;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.applyMatrix4 = function (m) {
            // input: Zia.Matrix4 affine matrix
            var x = this._x, y = this._y, z = this._z;
            var e = m.elements;
            this._x = e[0] * x + e[4] * y + e[8] * z + e[12];
            this._y = e[1] * x + e[5] * y + e[9] * z + e[13];
            this._z = e[2] * x + e[6] * y + e[10] * z + e[14];
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.applyProjection = function (m) {
            // input: Zia.Matrix4 projection matrix
            var x = this._x, y = this._y, z = this._z;
            var e = m.elements;
            var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); // perspective divide
            this._x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
            this._y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
            this._z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.applyQuaternion = function (q) {
            var x = this._x;
            var y = this._y;
            var z = this._z;
            var qx = q.x;
            var qy = q.y;
            var qz = q.z;
            var qw = q.w;
            // calculate quat * vector
            var ix = qw * x + qy * z - qz * y;
            var iy = qw * y + qz * x - qx * z;
            var iz = qw * z + qx * y - qy * x;
            var iw = -qx * x - qy * y - qz * z;
            // calculate result * inverse quat
            this._x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            this._y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            this._z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.transformDirection = function (m) {
            // input: Zia.Matrix4 affine matrix
            // vector interpreted as a direction
            var x = this._x, y = this._y, z = this._z;
            var e = m.elements;
            this._x = e[0] * x + e[4] * y + e[8] * z;
            this._y = e[1] * x + e[5] * y + e[9] * z;
            this._z = e[2] * x + e[6] * y + e[10] * z;
            this._onChangeCallback();
            this.normalize();
            return this;
        };
        Vector3.prototype.divide = function (v) {
            this._x /= v._x;
            this._y /= v._y;
            this._z /= v._z;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.divideScalar = function (scalar) {
            if (scalar !== 0) {
                var invScalar = 1 / scalar;
                this._x *= invScalar;
                this._y *= invScalar;
                this._z *= invScalar;
            }
            else {
                this._x = 0;
                this._y = 0;
                this._z = 0;
            }
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.min = function (v) {
            if (this._x > v._x) {
                this._x = v._x;
            }
            if (this._y > v._y) {
                this._y = v._y;
            }
            if (this._z > v._z) {
                this._z = v._z;
            }
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.max = function (v) {
            if (this._x < v._x) {
                this._x = v._x;
            }
            if (this._y < v._y) {
                this._y = v._y;
            }
            if (this._z < v._z) {
                this._z = v._z;
            }
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.clamp = function (min, max) {
            // This function assumes min < max, if this assumption isn't true it will not operate correctly
            if (this._x < min._x) {
                this._x = min._x;
            }
            else if (this._x > max._x) {
                this._x = max._x;
            }
            if (this._y < min._y) {
                this._y = min._y;
            }
            else if (this._y > max._y) {
                this._y = max._y;
            }
            if (this._z < min._z) {
                this._z = min._z;
            }
            else if (this._z > max._z) {
                this._z = max._z;
            }
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.clampScalar = function (minVal, maxVal) {
            Vector3._clampScalarMinTemp.set(minVal, minVal, minVal);
            Vector3._clampScalarMaxTemp.set(maxVal, maxVal, maxVal);
            return this.clamp(Vector3._clampScalarMinTemp, Vector3._clampScalarMaxTemp);
        };
        Vector3.prototype.floor = function () {
            this._x = Math.floor(this._x);
            this._y = Math.floor(this._y);
            this._z = Math.floor(this._z);
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.ceil = function () {
            this._x = Math.ceil(this._x);
            this._y = Math.ceil(this._y);
            this._z = Math.ceil(this._z);
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.round = function () {
            this._x = Math.round(this._x);
            this._y = Math.round(this._y);
            this._z = Math.round(this._z);
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.roundToZero = function () {
            this._x = (this._x < 0) ? Math.ceil(this._x) : Math.floor(this._x);
            this._y = (this._y < 0) ? Math.ceil(this._y) : Math.floor(this._y);
            this._z = (this._z < 0) ? Math.ceil(this._z) : Math.floor(this._z);
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.negate = function () {
            return this.multiplyScalar(-1);
        };
        Vector3.prototype.nearEqual = function (right, epsilon) {
            return Zia.MathUtil.withinEpsilon(this._x, right._x, epsilon._x) &&
                Zia.MathUtil.withinEpsilon(this._y, right._y, epsilon._y) &&
                Zia.MathUtil.withinEpsilon(this._z, right._z, epsilon._z);
        };
        Vector3.prototype.dot = function (v) {
            return this._x * v._x + this._y * v._y + this._z * v._z;
        };
        Vector3.prototype.lengthSq = function () {
            return this._x * this._x + this._y * this._y + this._z * this._z;
        };
        Vector3.prototype.length = function () {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
        };
        Vector3.prototype.normalize = function () {
            return this.divideScalar(this.length());
        };
        Vector3.prototype.lerp = function (v, alpha) {
            this._x += (v._x - this._x) * alpha;
            this._y += (v._y - this._y) * alpha;
            this._z += (v._z - this._z) * alpha;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.cross = function (v) {
            var x = this._x, y = this._y, z = this._z;
            this._x = y * v._z - z * v._y;
            this._y = z * v._x - x * v._z;
            this._z = x * v._y - y * v._x;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.crossVectors = function (a, b) {
            var ax = a._x, ay = a._y, az = a._z;
            var bx = b._x, by = b._y, bz = b._z;
            this._x = ay * bz - az * by;
            this._y = az * bx - ax * bz;
            this._z = ax * by - ay * bx;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.projectOnVector = function (vector) {
            Vector3._projectOnVectorTemp.copy(vector).normalize();
            var dot = this.dot(Vector3._projectOnVectorTemp);
            return this.copy(Vector3._projectOnVectorTemp).multiplyScalar(dot);
        };
        Vector3.prototype.projectOnPlane = function (planeNormal) {
            Vector3._projectOnPlaneTemp.copy(this).projectOnVector(planeNormal);
            return this.sub(Vector3._projectOnPlaneTemp);
        };
        Vector3.prototype.reflect = function (normal) {
            // reflect incident vector off plane orthogonal to normal
            // normal is assumed to have unit length
            return this.sub(Vector3._reflectTemp.copy(normal).multiplyScalar(2 * this.dot(normal)));
        };
        Vector3.prototype.angleTo = function (v) {
            var theta = this.dot(v) / (this.length() * v.length());
            // clamp, to handle numerical problems
            return Math.acos(Zia.MathUtil.clamp(theta, -1, 1));
        };
        Vector3.prototype.distanceTo = function (v) {
            return Math.sqrt(this.distanceToSquared(v));
        };
        Vector3.prototype.distanceToSquared = function (v) {
            var dx = this._x - v._x;
            var dy = this._y - v._y;
            var dz = this._z - v._z;
            return dx * dx + dy * dy + dz * dz;
        };
        Vector3.prototype.setFromMatrixPosition = function (m) {
            this._x = m.elements[12];
            this._y = m.elements[13];
            this._z = m.elements[14];
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.setFromMatrixScale = function (m) {
            var sx = this.set(m.elements[0], m.elements[1], m.elements[2]).length();
            var sy = this.set(m.elements[4], m.elements[5], m.elements[6]).length();
            var sz = this.set(m.elements[8], m.elements[9], m.elements[10]).length();
            this._x = sx;
            this._y = sy;
            this._z = sz;
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.setFromMatrixColumn = function (index, matrix) {
            var offset = index * 4;
            var me = matrix.elements;
            this._x = me[offset];
            this._y = me[offset + 1];
            this._z = me[offset + 2];
            this._onChangeCallback();
            return this;
        };
        Vector3.prototype.equals = function (v) {
            return ((v._x === this._x) && (v._y === this._y) && (v._z === this._z));
        };
        Vector3.prototype.onChange = function (callback) {
            this._onChangeCallback = callback;
            return this;
        };
        Vector3.prototype._onChangeCallback = function () { };
        Vector3.prototype.suppressChangeCallback = function (func) {
            var temp = this._onChangeCallback;
            this._onChangeCallback = function () { };
            func();
            this._onChangeCallback = temp;
        };
        Vector3.prototype.clone = function (result) {
            result.set(this._x, this._y, this._z);
            return result;
        };
        Vector3.prototype.toJS = function () {
            return [this._x, this._y, this._z];
        };
        Vector3.distance = function (a, b) {
            Zia.Vector3.subtract(a, b, Vector3._distanceTemp);
            return Vector3._distanceTemp.length();
        };
        Vector3.add = function (a, b, result) {
            result._x = a._x + b._x;
            result._y = a._y + b._y;
            result._z = a._z + b._z;
            result._onChangeCallback();
            return result;
        };
        Vector3.subtract = function (a, b, result) {
            result._x = a._x - b._x;
            result._y = a._y - b._y;
            result._z = a._z - b._z;
            result._onChangeCallback();
            return result;
        };
        Vector3.multiplyScalar = function (v, scalar, result) {
            result._x = v._x * scalar;
            result._y = v._y * scalar;
            result._z = v._z * scalar;
            result._onChangeCallback();
            return result;
        };
        Vector3.divideScalar = function (v, scalar, result) {
            result._x = v._x / scalar;
            result._y = v._y / scalar;
            result._z = v._z / scalar;
            result._onChangeCallback();
            return result;
        };
        Vector3.cross = function (a, b, result) {
            var x = a._x, y = a._y, z = a._z;
            result._x = y * b._z - z * b._y;
            result._y = z * b._x - x * b._z;
            result._z = x * b._y - y * b._x;
            result._onChangeCallback();
            return result;
        };
        Vector3._quaternionTemp = new Zia.Quaternion();
        Vector3._clampScalarMinTemp = new Vector3();
        Vector3._clampScalarMaxTemp = new Vector3();
        Vector3._projectOnVectorTemp = new Vector3();
        Vector3._projectOnPlaneTemp = new Vector3();
        Vector3._reflectTemp = new Vector3();
        Vector3._distanceTemp = new Vector3();
        return Vector3;
    })();
    Zia.Vector3 = Vector3;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    /**
     * Represents a 4-component color with red, green, blue and alpha components.
     */
    var Color4 = (function () {
        /**
         * Constructs a new `Color4` object.
         *
         * @param r - The value for the red component.
         * @param g - The value for the green component.
         * @param b - The value for the blue component.
         * @param a - The value for the alpha component.
         */
        function Color4(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        Color4.prototype.copy = function (other) {
            this.r = other.r;
            this.g = other.g;
            this.b = other.b;
            this.a = other.a;
            return this;
        };
        Color4.prototype.multiplyScalar = function (s) {
            this.r *= s;
            this.g *= s;
            this.b *= s;
            return this;
        };
        Color4.prototype.toJS = function () {
            return [this.r, this.g, this.b, this.a];
        };
        return Color4;
    })();
    Zia.Color4 = Color4;
})(Zia || (Zia = {}));


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
var Zia;
(function (Zia) {
    var Euler = (function () {
        function Euler(x, y, z, order) {
            if (x === void 0) { x = 0.0; }
            if (y === void 0) { y = 0.0; }
            if (z === void 0) { z = 0.0; }
            if (order === void 0) { order = Euler.DefaultOrder; }
            this._x = x;
            this._y = y;
            this._z = z;
            this._order = order;
        }
        Object.defineProperty(Euler.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Euler.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Euler.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (value) {
                this._z = value;
                this.onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Euler.prototype, "order", {
            get: function () {
                return this._order;
            },
            set: function (value) {
                this._order = value;
                this.onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Euler.prototype.set = function (x, y, z, order) {
            this._x = x;
            this._y = y;
            this._z = z;
            this._order = order || this._order;
            this.onChangeCallback();
            return this;
        };
        Euler.prototype.copy = function (euler) {
            this._x = euler._x;
            this._y = euler._y;
            this._z = euler._z;
            this._order = euler._order;
            this.onChangeCallback();
            return this;
        };
        Euler.prototype.setFromRotationMatrix = function (m, order) {
            var clamp = Zia.MathUtil.clamp;
            // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
            var te = m.elements;
            var m11 = te[0], m12 = te[4], m13 = te[8];
            var m21 = te[1], m22 = te[5], m23 = te[9];
            var m31 = te[2], m32 = te[6], m33 = te[10];
            order = order || this._order;
            if (order === 'XYZ') {
                this._y = Math.asin(clamp(m13, -1, 1));
                if (Math.abs(m13) < 0.99999) {
                    this._x = Math.atan2(-m23, m33);
                    this._z = Math.atan2(-m12, m11);
                }
                else {
                    this._x = Math.atan2(m32, m22);
                    this._z = 0;
                }
            }
            else if (order === 'YXZ') {
                this._x = Math.asin(-clamp(m23, -1, 1));
                if (Math.abs(m23) < 0.99999) {
                    this._y = Math.atan2(m13, m33);
                    this._z = Math.atan2(m21, m22);
                }
                else {
                    this._y = Math.atan2(-m31, m11);
                    this._z = 0;
                }
            }
            else if (order === 'ZXY') {
                this._x = Math.asin(clamp(m32, -1, 1));
                if (Math.abs(m32) < 0.99999) {
                    this._y = Math.atan2(-m31, m33);
                    this._z = Math.atan2(-m12, m22);
                }
                else {
                    this._y = 0;
                    this._z = Math.atan2(m21, m11);
                }
            }
            else if (order === 'ZYX') {
                this._y = Math.asin(-clamp(m31, -1, 1));
                if (Math.abs(m31) < 0.99999) {
                    this._x = Math.atan2(m32, m33);
                    this._z = Math.atan2(m21, m11);
                }
                else {
                    this._x = 0;
                    this._z = Math.atan2(-m12, m22);
                }
            }
            else if (order === 'YZX') {
                this._z = Math.asin(clamp(m21, -1, 1));
                if (Math.abs(m21) < 0.99999) {
                    this._x = Math.atan2(-m23, m22);
                    this._y = Math.atan2(-m31, m11);
                }
                else {
                    this._x = 0;
                    this._y = Math.atan2(m13, m33);
                }
            }
            else if (order === 'XZY') {
                this._z = Math.asin(-clamp(m12, -1, 1));
                if (Math.abs(m12) < 0.99999) {
                    this._x = Math.atan2(m32, m22);
                    this._y = Math.atan2(m13, m11);
                }
                else {
                    this._x = Math.atan2(-m23, m33);
                    this._y = 0;
                }
            }
            else {
                console.warn('Zia.Euler: .setFromRotationMatrix() given unsupported order: ' + order);
            }
            this._order = order;
            this.onChangeCallback();
            return this;
        };
        Euler.prototype.setFromQuaternion = function (q, order) {
            var clamp = Zia.MathUtil.clamp;
            // q is assumed to be normalized
            // http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m
            var sqx = q.x * q.x;
            var sqy = q.y * q.y;
            var sqz = q.z * q.z;
            var sqw = q.w * q.w;
            order = order || this._order;
            if (order === 'XYZ') {
                this._x = Math.atan2(2 * (q.x * q.w - q.y * q.z), (sqw - sqx - sqy + sqz));
                this._y = Math.asin(clamp(2 * (q.x * q.z + q.y * q.w), -1, 1));
                this._z = Math.atan2(2 * (q.z * q.w - q.x * q.y), (sqw + sqx - sqy - sqz));
            }
            else if (order === 'YXZ') {
                this._x = Math.asin(clamp(2 * (q.x * q.w - q.y * q.z), -1, 1));
                this._y = Math.atan2(2 * (q.x * q.z + q.y * q.w), (sqw - sqx - sqy + sqz));
                this._z = Math.atan2(2 * (q.x * q.y + q.z * q.w), (sqw - sqx + sqy - sqz));
            }
            else if (order === 'ZXY') {
                this._x = Math.asin(clamp(2 * (q.x * q.w + q.y * q.z), -1, 1));
                this._y = Math.atan2(2 * (q.y * q.w - q.z * q.x), (sqw - sqx - sqy + sqz));
                this._z = Math.atan2(2 * (q.z * q.w - q.x * q.y), (sqw - sqx + sqy - sqz));
            }
            else if (order === 'ZYX') {
                this._x = Math.atan2(2 * (q.x * q.w + q.z * q.y), (sqw - sqx - sqy + sqz));
                this._y = Math.asin(clamp(2 * (q.y * q.w - q.x * q.z), -1, 1));
                this._z = Math.atan2(2 * (q.x * q.y + q.z * q.w), (sqw + sqx - sqy - sqz));
            }
            else if (order === 'YZX') {
                this._x = Math.atan2(2 * (q.x * q.w - q.z * q.y), (sqw - sqx + sqy - sqz));
                this._y = Math.atan2(2 * (q.y * q.w - q.x * q.z), (sqw + sqx - sqy - sqz));
                this._z = Math.asin(clamp(2 * (q.x * q.y + q.z * q.w), -1, 1));
            }
            else if (order === 'XZY') {
                this._x = Math.atan2(2 * (q.x * q.w + q.y * q.z), (sqw - sqx + sqy - sqz));
                this._y = Math.atan2(2 * (q.x * q.z + q.y * q.w), (sqw + sqx - sqy - sqz));
                this._z = Math.asin(clamp(2 * (q.z * q.w - q.x * q.y), -1, 1));
            }
            else {
                console.warn('Zia.Euler: .setFromQuaternion() given unsupported order: ' + order);
            }
            this._order = order;
            return this;
        };
        Euler.prototype.reorder = function (newOrder) {
            // WARNING: this discards revolution information -bhouston
            Zia.Quaternion.createFromEuler(this, Euler._reorderTemp);
            this.setFromQuaternion(Euler._reorderTemp, newOrder);
        };
        Euler.prototype.equals = function (euler) {
            return (euler._x === this._x) && (euler._y === this._y) && (euler._z === this._z) && (euler._order === this._order);
        };
        Euler.prototype.onChange = function (callback) {
            this.onChangeCallback = callback;
            return this;
        };
        Euler.prototype.onChangeCallback = function () {
        };
        Euler.prototype.clone = function () {
            return new Euler(this._x, this._y, this._z, this._order);
        };
        Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
        Euler.DefaultOrder = 'XYZ';
        Euler._reorderTemp = new Zia.Quaternion();
        return Euler;
    })();
    Zia.Euler = Euler;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    Zia.MathUtil = {
        TWO_PI: Math.PI * 2,
        PI_OVER_TWO: Math.PI / 2,
        PI_OVER_FOUR: Math.PI / 4,
        withinEpsilon: function (a, b, epsilon) {
            var num = a - b;
            return ((-epsilon <= num) && (num <= epsilon));
        },
        /*!
        Math.uuid.js (v1.4)
        http://www.broofa.com
        mailto:robert@broofa.com
    
        Copyright (c) 2010 Robert Kieffer
        Dual licensed under the MIT and GPL licenses.
        */
        generateUUID: (function () {
            // Private array of chars to use
            var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            return function (len, radix) {
                var chars = CHARS, uuid = [], i;
                radix = radix || chars.length;
                if (len) {
                    // Compact form
                    for (i = 0; i < len; i++)
                        uuid[i] = chars[0 | Math.random() * radix];
                }
                else {
                    // rfc4122, version 4 form
                    var r;
                    // rfc4122 requires these characters
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';
                    // Fill in random data.  At i==19 set the high bits of clock sequence as
                    // per rfc4122, sec. 4.1.5
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random() * 16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }
                return uuid.join('');
            };
        })(),
        // Clamp value to range <a, b>
        clamp: function (x, a, b) {
            return (x < a) ? a : ((x > b) ? b : x);
        },
        degToRad: function () {
            var degreeToRadiansFactor = Math.PI / 180;
            return function (degrees) {
                return degrees * degreeToRadiansFactor;
            };
        }(),
    };
})(Zia || (Zia = {}));


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
var Zia;
(function (Zia) {
    /**
     * Represents a 3x3 matrix. The elements are stored in a `Float32Array`
     * in column-major order to optimise handoff to WebGL.
     */
    var Matrix3 = (function () {
        /**
         * Constructs a new 3x3 matrix. Parameters are supplied in row-major order
         * to aid readability. If called with no parameters, all matrix elements are
         * initialised to 0. If called with any parameters, make sure you supply
         * all 9 values.
         *
         * @summary Constructs a new 4x4 matrix.
         *
         * @param m11 The value for row 0, column 0.
         * @param m12 The value for row 0, column 1.
         * @param m13 The value for row 0, column 2.
         * @param m21 The value for row 1, column 0.
         * @param m22 The value for row 1, column 1.
         * @param m23 The value for row 1, column 2.
         * @param m31 The value for row 2, column 0.
         * @param m32 The value for row 2, column 1.
         * @param m33 The value for row 2, column 2.
         */
        function Matrix3(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
            if (m11 === void 0) { m11 = 1.0; }
            if (m12 === void 0) { m12 = 0.0; }
            if (m13 === void 0) { m13 = 0.0; }
            if (m21 === void 0) { m21 = 0.0; }
            if (m22 === void 0) { m22 = 1.0; }
            if (m23 === void 0) { m23 = 0.0; }
            if (m31 === void 0) { m31 = 0.0; }
            if (m32 === void 0) { m32 = 0.0; }
            if (m33 === void 0) { m33 = 1.0; }
            var values = [
                m11, m21, m31,
                m12, m22, m32,
                m13, m23, m33,
            ];
            this.elements = new Float32Array(values);
        }
        ;
        Matrix3.prototype.set = function (n11, n12, n13, n21, n22, n23, n31, n32, n33) {
            var te = this.elements;
            te[0] = n11;
            te[3] = n12;
            te[6] = n13;
            te[1] = n21;
            te[4] = n22;
            te[7] = n23;
            te[2] = n31;
            te[5] = n32;
            te[8] = n33;
            return this;
        };
        Matrix3.createIdentity = function (result) {
            result.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
            return result;
        };
        Matrix3.prototype.copy = function (m) {
            var me = m.elements;
            this.set(me[0], me[3], me[6], me[1], me[4], me[7], me[2], me[5], me[8]);
            return this;
        };
        Matrix3.prototype.multiplyScalar = function (s) {
            var te = this.elements;
            te[0] *= s;
            te[3] *= s;
            te[6] *= s;
            te[1] *= s;
            te[4] *= s;
            te[7] *= s;
            te[2] *= s;
            te[5] *= s;
            te[8] *= s;
            return this;
        };
        Matrix3.prototype.determinant = function () {
            var te = this.elements;
            var a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i = te[8];
            return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
        };
        Matrix3.prototype.getInverse = function (matrix, throwOnNonInvertible) {
            // input: Zia.Matrix4
            // ( based on http://code.google.com/p/webgl-mjs/ )
            if (throwOnNonInvertible === void 0) { throwOnNonInvertible = false; }
            var me = matrix.elements;
            var te = this.elements;
            te[0] = me[10] * me[5] - me[6] * me[9];
            te[1] = -me[10] * me[1] + me[2] * me[9];
            te[2] = me[6] * me[1] - me[2] * me[5];
            te[3] = -me[10] * me[4] + me[6] * me[8];
            te[4] = me[10] * me[0] - me[2] * me[8];
            te[5] = -me[6] * me[0] + me[2] * me[4];
            te[6] = me[9] * me[4] - me[5] * me[8];
            te[7] = -me[9] * me[0] + me[1] * me[8];
            te[8] = me[5] * me[0] - me[1] * me[4];
            var det = me[0] * te[0] + me[1] * te[3] + me[2] * te[6];
            // no inverse
            if (det === 0) {
                var msg = "Matrix3.getInverse(): can't invert matrix, determinant is 0";
                if (throwOnNonInvertible) {
                    throw new Error(msg);
                }
                else {
                    console.warn(msg);
                }
                Matrix3.createIdentity(this);
                return this;
            }
            this.multiplyScalar(1.0 / det);
            return this;
        };
        Matrix3.prototype.transpose = function () {
            var tmp, m = this.elements;
            tmp = m[1];
            m[1] = m[3];
            m[3] = tmp;
            tmp = m[2];
            m[2] = m[6];
            m[6] = tmp;
            tmp = m[5];
            m[5] = m[7];
            m[7] = tmp;
            return this;
        };
        Matrix3.prototype.getNormalMatrix = function (m) {
            // input: Zia.Matrix4
            this.getInverse(m).transpose();
            return this;
        };
        Matrix3.prototype.clone = function () {
            var te = this.elements;
            return new Zia.Matrix3(te[0], te[3], te[6], te[1], te[4], te[7], te[2], te[5], te[8]);
        };
        return Matrix3;
    })();
    Zia.Matrix3 = Matrix3;
})(Zia || (Zia = {}));


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
var Zia;
(function (Zia) {
    /**
     * Represents a 4x4 matrix. The elements are stored in a `Float32Array`
     * in column-major order to optimise handoff to WebGL.
     */
    var Matrix4 = (function () {
        /**
         * Constructs a new 4x4 matrix. Parameters are supplied in row-major order
         * to aid readability. If called with no parameters, all matrix elements are
         * initialised to 0. If called with any parameters, make sure you supply
         * all 16 values.
         *
         * @summary Constructs a new 4x4 matrix.
         *
         * @param m11 The value for row 0, column 0.
         * @param m12 The value for row 0, column 1.
         * @param m13 The value for row 0, column 2.
         * @param m14 The value for row 0, column 3.
         * @param m21 The value for row 1, column 0.
         * @param m22 The value for row 1, column 1.
         * @param m23 The value for row 1, column 2.
         * @param m24 The value for row 1, column 3.
         * @param m31 The value for row 2, column 0.
         * @param m32 The value for row 2, column 1.
         * @param m33 The value for row 2, column 2.
         * @param m34 The value for row 2, column 3.
         * @param m41 The value for row 3, column 0.
         * @param m42 The value for row 3, column 1.
         * @param m43 The value for row 3, column 2.
         * @param m44 The value for row 3, column 3.
         */
        function Matrix4(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
            if (m11 === void 0) { m11 = 0.0; }
            if (m12 === void 0) { m12 = 0.0; }
            if (m13 === void 0) { m13 = 0.0; }
            if (m14 === void 0) { m14 = 0.0; }
            if (m21 === void 0) { m21 = 0.0; }
            if (m22 === void 0) { m22 = 0.0; }
            if (m23 === void 0) { m23 = 0.0; }
            if (m24 === void 0) { m24 = 0.0; }
            if (m31 === void 0) { m31 = 0.0; }
            if (m32 === void 0) { m32 = 0.0; }
            if (m33 === void 0) { m33 = 0.0; }
            if (m34 === void 0) { m34 = 0.0; }
            if (m41 === void 0) { m41 = 0.0; }
            if (m42 === void 0) { m42 = 0.0; }
            if (m43 === void 0) { m43 = 0.0; }
            if (m44 === void 0) { m44 = 0.0; }
            var values = [
                m11, m21, m31, m41,
                m12, m22, m32, m42,
                m13, m23, m33, m43,
                m14, m24, m34, m44
            ];
            this.elements = new Float32Array(values);
        }
        Matrix4.compose = function (scale, rotation, translation, result) {
            Matrix4.createFromQuaternion(rotation, result);
            result.multiply(Matrix4.createScale(scale, Matrix4._composeTemp));
            result.setTranslation(translation);
            return result;
        };
        /**
         * Creates a matrix that can be used to translate vectors.
         *
         * @param translation - Amounts to translate by on the x, y and z axes.
         * @param result - The object in which to place the calculated result.
         *
         * @returns The modified result parameter.
         *
         * @example
         * var result = Zia.Matrix4.createTranslation(
         *   new Zia.Vector3(1, 2, -5),
         *   new Zia.Matrix4());
         */
        Matrix4.createTranslation = function (translation, result) {
            return result.set(1, 0, 0, translation.x, 0, 1, 0, translation.y, 0, 0, 1, translation.z, 0, 0, 0, 1);
        };
        /**
         * Creates a matrix that can be used to rotate vectors around the x-axis.
         *
         * @param {Number} angle - The amount, in radians, by which to rotate around the x-axis.
         * @param {Zia.Matrix4} result - The object in which to place the calculated result.
         *
         * @returns {Zia.Matrix4} The modified result parameter.
         *
         * @example
         * var result = Zia.Matrix4.createRotationX(Math.PI, new Zia.Matrix4());
         */
        Matrix4.createRotationX = function (angle, result) {
            var c = Math.cos(angle), s = Math.sin(angle);
            return result.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
        };
        /**
         * Creates a matrix that can be used to rotate vectors around the y-axis.
         *
         * @param {Number} angle - The amount, in radians, by which to rotate around the y-axis.
         * @param {Zia.Matrix4} result - The object in which to place the calculated result.
         *
         * @returns {Zia.Matrix4} The modified result parameter.
         *
         * @example
         * var result = Zia.Matrix4.createRotationY(Math.PI, new Zia.Matrix4());
         */
        Matrix4.createRotationY = function (angle, result) {
            var c = Math.cos(angle), s = Math.sin(angle);
            return result.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
        };
        /**
         * Creates a matrix that can be used to rotate vectors around the z-axis.
         *
         * @param {Number} angle - The amount, in radians, by which to rotate around the z-axis.
         * @param {Zia.Matrix4} result - The object in which to place the calculated result.
         *
         * @returns {Zia.Matrix4} The modified result parameter.
         *
         * @example
         * var result = Zia.Matrix4.createRotationZ(Math.PI, new Zia.Matrix4());
         */
        Matrix4.createRotationZ = function (angle, result) {
            var c = Math.cos(angle), s = Math.sin(angle);
            return result.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        };
        /**
         * Creates a matrix that can be used to rotate vectors around an arbitrary axis.
         *
         * @param {Zia.Vector3} axis - The axis to rotate around.
         * @param {Number} angle - The amount, in radians, by which to rotate around the vector.
         * @param {Zia.Matrix4} result - The object in which to place the calculated result.
         *
         * @returns {Zia.Matrix4} The modified result parameter.
         *
         * @example
         * var result = Zia.Matrix4.createFromAxisAngle(
         *   new Zia.Vector3(1, 0, 1).normalize(), Math.PI,
         *   new Zia.Matrix4());
         */
        Matrix4.createFromAxisAngle = function (axis, angle, result) {
            // Based on http://www.gamedev.net/reference/articles/article1199.asp
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var t = 1 - c;
            var x = axis.x, y = axis.y, z = axis.z;
            var tx = t * x, ty = t * y;
            return result.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
        };
        Matrix4.createFromQuaternion = function (quaternion, result) {
            var te = result.elements;
            var x = quaternion.x, y = quaternion.y, z = quaternion.z, w = quaternion.w;
            var x2 = x + x, y2 = y + y, z2 = z + z;
            var xx = x * x2, xy = x * y2, xz = x * z2;
            var yy = y * y2, yz = y * z2, zz = z * z2;
            var wx = w * x2, wy = w * y2, wz = w * z2;
            te[0] = 1 - (yy + zz);
            te[4] = xy - wz;
            te[8] = xz + wy;
            te[1] = xy + wz;
            te[5] = 1 - (xx + zz);
            te[9] = yz - wx;
            te[2] = xz - wy;
            te[6] = yz + wx;
            te[10] = 1 - (xx + yy);
            // last column
            te[3] = 0;
            te[7] = 0;
            te[11] = 0;
            // bottom row
            te[12] = 0;
            te[13] = 0;
            te[14] = 0;
            te[15] = 1;
            return result;
        };
        /**
         * Creates an orthographic projection matrix.
         *
         * @param {Number} left - The minimum x value of the view volume.
         * @param {Number} right - The maximum x value of the view volume.
         * @param {Number} bottom - The minimum y value of the view volume.
         * @param {Number} top - The maximum y value of the view volume.
         * @param {Number} near - The minimum z value of the view volume.
         * @param {Number} far - The maximum z value of the view volume.
         * @param {Zia.Matrix4} result - The object in which to place the calculated result.
         *
         * @returns {Zia.Matrix4} The modified result parameter.
         *
         * @example
         * var result = Zia.Matrix4.createOrthographicOffCenter(
         *   -100, 100, -40, 40, -100, 100,
         *   new Zia.Matrix4());
         */
        Matrix4.createOrthographicOffCenter = function (left, right, bottom, top, near, far, result) {
            var te = result.elements;
            var w = right - left;
            var h = top - bottom;
            var p = far - near;
            var x = (right + left) / w;
            var y = (top + bottom) / h;
            var z = (far + near) / p;
            te[0] = 2 / w;
            te[4] = 0;
            te[8] = 0;
            te[12] = -x;
            te[1] = 0;
            te[5] = 2 / h;
            te[9] = 0;
            te[13] = -y;
            te[2] = 0;
            te[6] = 0;
            te[10] = -2 / p;
            te[14] = -z;
            te[3] = 0;
            te[7] = 0;
            te[11] = 0;
            te[15] = 1;
            return result;
        };
        Matrix4.createPerspectiveOffCenter = function (left, right, bottom, top, near, far, result) {
            var te = result.elements;
            var x = 2 * near / (right - left);
            var y = 2 * near / (top - bottom);
            var a = (right + left) / (right - left);
            var b = (top + bottom) / (top - bottom);
            var c = -(far + near) / (far - near);
            var d = -2 * far * near / (far - near);
            te[0] = x;
            te[4] = 0;
            te[8] = a;
            te[12] = 0;
            te[1] = 0;
            te[5] = y;
            te[9] = b;
            te[13] = 0;
            te[2] = 0;
            te[6] = 0;
            te[10] = c;
            te[14] = d;
            te[3] = 0;
            te[7] = 0;
            te[11] = -1;
            te[15] = 0;
            return result;
        };
        Matrix4.createPerspectiveFieldOfView = function (fieldOfView, aspectRatio, near, far, result) {
            var ymax = near * Math.tan(fieldOfView * 0.5);
            var ymin = -ymax;
            var xmin = ymin * aspectRatio;
            var xmax = ymax * aspectRatio;
            return Zia.Matrix4.createPerspectiveOffCenter(xmin, xmax, ymin, ymax, near, far, result);
        };
        /**
         * Creates a scaling matrix.
         *
         * @param {Zia.Vector3} scale - Amounts to scale by on the x, y and z axes.
         * @param {Zia.Matrix4} result - The object in which to place the calculated result.
         *
         * @returns {Zia.Matrix4} The modified result parameter.
         *
         * @example
         * var result = Zia.Matrix4.createScale(
         *   new Zia.Vector3(1.5, 1, 2),
         *   new Zia.Matrix4());
         */
        Matrix4.createScale = function (scale, result) {
            return result.set(scale.x, 0, 0, 0, 0, scale.y, 0, 0, 0, 0, scale.z, 0, 0, 0, 0, 1);
        };
        /**
         * Creates a uniform scaling matrix.
         *
         * @param {Number} scale - Amount to scale by on all axes.
         * @param {Zia.Matrix4} result - The object in which to place the calculated result.
         *
         * @returns {Zia.Matrix4} The modified result parameter.
         *
         * @example
         * var result = Zia.Matrix4.createUniformScale(2, new Zia.Matrix4());
         */
        Matrix4.createUniformScale = function (scale, result) {
            return result.set(scale, 0, 0, 0, 0, scale, 0, 0, 0, 0, scale, 0, 0, 0, 0, 1);
        };
        /**
         * Creates an identity matrix.
         *
         * @param {Zia.Matrix4} result - The object in which to place the calculated result.
         *
         * @returns {Zia.Matrix4} The modified result parameter.
         *
         * @example
         * var result = Zia.Matrix4.createIdentity(new Zia.Matrix4());
         */
        Matrix4.createIdentity = function (result) {
            return result.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        };
        ;
        /**
         * Multiplies a matrix by another matrix.
         *
         * @param {Zia.Matrix4} left - The first matrix.
         * @param {Zia.Matrix4} right - The second matrix.
         * @param {Zia.Matrix4} result - The object in which to place the calculated result.
         *
         * @returns {Zia.Matrix4} The modified result parameter.
         *
         * @example
         * var result = Zia.Matrix4.multiply(
         *   Zia.Matrix4.createUniformScale(2, new Zia.Matrix4()),
         *   Zia.Matrix4.createRotationX(Math.PI, new Zia.Matrix4(),
         *   new Zia.Matrix4());
         */
        Matrix4.multiply = function (left, right, result) {
            var ae = left.elements;
            var be = right.elements;
            var te = result.elements;
            var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
            var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
            var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
            var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
            var b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
            var b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
            var b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
            var b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
            te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
            te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
            te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
            te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
            te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
            te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
            te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
            te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
            te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
            te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
            te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
            te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
            te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
            te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
            te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
            te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
            return result;
        };
        /**
         * Multiplies a matrix by a scalar value.
         *
         * @param {Zia.Matrix4} matrix - The matrix.
         * @param {Number} scalar - The scalar value.
         * @param {Zia.Matrix4} result - The object in which to place the calculated result.
         *
         * @returns {Zia.Matrix4} The modified result parameter.
         *
         * @example
         * var result = Zia.Matrix4.multiplyByScalar(
         *   Zia.Matrix4.createUniformScale(2, new Zia.Matrix4()), 0.5,
         *   new Zia.Matrix4());
         */
        Matrix4.multiplyByScalar = function (matrix, scalar, result) {
            var te = matrix.elements;
            var re = result.elements;
            re[0] = te[0] * scalar;
            re[1] = te[1] * scalar;
            re[2] = te[2] * scalar;
            re[3] = te[3] * scalar;
            re[4] = te[4] * scalar;
            re[5] = te[5] * scalar;
            re[6] = te[6] * scalar;
            re[7] = te[7] * scalar;
            re[8] = te[8] * scalar;
            re[9] = te[9] * scalar;
            re[10] = te[10] * scalar;
            re[11] = te[11] * scalar;
            re[12] = te[12] * scalar;
            re[13] = te[13] * scalar;
            re[14] = te[14] * scalar;
            re[15] = te[15] * scalar;
            return result;
        };
        /**
         * Inverts a matrix. If the determinant is zero, then the matrix cannot be
         * inverted and an exception will be thrown.
         *
         * @param {Zia.Matrix4} matrix - The matrix to invert.
         * @param {Zia.Matrix4} result - The object in which to place the calculated result.
         *
         * @returns {Zia.Matrix4} The modified result parameter.
         *
         * @example
         * var result = Zia.Matrix4.invert(
         *   Zia.Matrix4.createUniformScale(2, new Zia.Matrix4()),
         *   new Zia.Matrix4());
         */
        Matrix4.invert = function (matrix, result) {
            // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
            var te = matrix.elements;
            var me = result.elements;
            var n11 = me[0], n12 = me[4], n13 = me[8], n14 = me[12];
            var n21 = me[1], n22 = me[5], n23 = me[9], n24 = me[13];
            var n31 = me[2], n32 = me[6], n33 = me[10], n34 = me[14];
            var n41 = me[3], n42 = me[7], n43 = me[11], n44 = me[15];
            te[0] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
            te[4] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
            te[8] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
            te[12] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
            te[1] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
            te[5] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
            te[9] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
            te[13] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
            te[2] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
            te[6] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
            te[10] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
            te[14] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
            te[3] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
            te[7] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
            te[11] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
            te[15] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;
            var det = n11 * te[0] + n21 * te[4] + n31 * te[8] + n41 * te[12];
            if (det === 0) {
                throw new Error("Can't invert matrix, determinant is 0");
            }
            Zia.Matrix4.multiplyByScalar(result, 1 / det, result);
            return result;
        };
        /**
         * Transposes a matrix.
         *
         * @param {Zia.Matrix4} matrix - The matrix to transpose.
         * @param {Zia.Matrix4} result - The object in which to place the calculated result.
         *
         * @returns {Zia.Matrix4} The modified result parameter.
         *
         * @example
         * var result = Zia.Matrix4.transpose(
         *   Zia.Matrix4.createRotationX(Math.PI, new Zia.Matrix4()),
         *   new Zia.Matrix4());
         */
        Matrix4.transpose = function (matrix, result) {
            var te = matrix.elements;
            var re = result.elements;
            var tmp;
            tmp = te[1];
            re[1] = te[4];
            re[4] = tmp;
            tmp = te[2];
            re[2] = te[8];
            re[8] = tmp;
            tmp = te[6];
            re[6] = te[9];
            re[9] = tmp;
            tmp = te[3];
            re[3] = te[12];
            re[12] = tmp;
            tmp = te[7];
            re[7] = te[13];
            re[13] = tmp;
            tmp = te[11];
            re[11] = te[14];
            re[14] = tmp;
            return result;
        };
        ;
        /**
         * Gets the translation component of the current transformation matrix.
         */
        Matrix4.prototype.getTranslation = function (result) {
            var te = this.elements;
            result.x = te[12];
            result.y = te[13];
            result.z = te[14];
            return result;
        };
        /**
         * Sets the translation component of the current transformation matrix.
         */
        Matrix4.prototype.setTranslation = function (translation) {
            var te = this.elements;
            te[12] = translation.x;
            te[13] = translation.y;
            te[14] = translation.z;
        };
        Matrix4.prototype.set = function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
            var te = this.elements;
            te[0] = n11;
            te[4] = n12;
            te[8] = n13;
            te[12] = n14;
            te[1] = n21;
            te[5] = n22;
            te[9] = n23;
            te[13] = n24;
            te[2] = n31;
            te[6] = n32;
            te[10] = n33;
            te[14] = n34;
            te[3] = n41;
            te[7] = n42;
            te[11] = n43;
            te[15] = n44;
            return this;
        };
        Matrix4.prototype.makeRotationFromEuler = function (euler) {
            var te = this.elements;
            var x = euler.x, y = euler.y, z = euler.z;
            var a = Math.cos(x), b = Math.sin(x);
            var c = Math.cos(y), d = Math.sin(y);
            var e = Math.cos(z), f = Math.sin(z);
            if (euler.order === 'XYZ') {
                var ae = a * e, af = a * f, be = b * e, bf = b * f;
                te[0] = c * e;
                te[4] = -c * f;
                te[8] = d;
                te[1] = af + be * d;
                te[5] = ae - bf * d;
                te[9] = -b * c;
                te[2] = bf - ae * d;
                te[6] = be + af * d;
                te[10] = a * c;
            }
            else if (euler.order === 'YXZ') {
                var ce = c * e, cf = c * f, de = d * e, df = d * f;
                te[0] = ce + df * b;
                te[4] = de * b - cf;
                te[8] = a * d;
                te[1] = a * f;
                te[5] = a * e;
                te[9] = -b;
                te[2] = cf * b - de;
                te[6] = df + ce * b;
                te[10] = a * c;
            }
            else if (euler.order === 'ZXY') {
                var ce = c * e, cf = c * f, de = d * e, df = d * f;
                te[0] = ce - df * b;
                te[4] = -a * f;
                te[8] = de + cf * b;
                te[1] = cf + de * b;
                te[5] = a * e;
                te[9] = df - ce * b;
                te[2] = -a * d;
                te[6] = b;
                te[10] = a * c;
            }
            else if (euler.order === 'ZYX') {
                var ae = a * e, af = a * f, be = b * e, bf = b * f;
                te[0] = c * e;
                te[4] = be * d - af;
                te[8] = ae * d + bf;
                te[1] = c * f;
                te[5] = bf * d + ae;
                te[9] = af * d - be;
                te[2] = -d;
                te[6] = b * c;
                te[10] = a * c;
            }
            else if (euler.order === 'YZX') {
                var ac = a * c, ad = a * d, bc = b * c, bd = b * d;
                te[0] = c * e;
                te[4] = bd - ac * f;
                te[8] = bc * f + ad;
                te[1] = f;
                te[5] = a * e;
                te[9] = -b * e;
                te[2] = -d * e;
                te[6] = ad * f + bc;
                te[10] = ac - bd * f;
            }
            else if (euler.order === 'XZY') {
                var ac = a * c, ad = a * d, bc = b * c, bd = b * d;
                te[0] = c * e;
                te[4] = -f;
                te[8] = d * e;
                te[1] = ac * f + bd;
                te[5] = a * e;
                te[9] = ad * f - bc;
                te[2] = bc * f - ad;
                te[6] = b * e;
                te[10] = bd * f + ac;
            }
            // last column
            te[3] = 0;
            te[7] = 0;
            te[11] = 0;
            // bottom row
            te[12] = 0;
            te[13] = 0;
            te[14] = 0;
            te[15] = 1;
            return this;
        };
        Matrix4.prototype.multiply = function (m) {
            return Zia.Matrix4.multiply(this, m, this);
        };
        /**
         * Calculates the determinant of the current Matrix4 instance.
         * @method
         *
         * @returns {Number} The determinant.
         */
        Matrix4.prototype.determinant = function () {
            var te = this.elements;
            var n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
            var n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
            var n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
            var n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
            return (n41 * (+n14 * n23 * n32
                - n13 * n24 * n32
                - n14 * n22 * n33
                + n12 * n24 * n33
                + n13 * n22 * n34
                - n12 * n23 * n34) +
                n42 * (+n11 * n23 * n34
                    - n11 * n24 * n33
                    + n14 * n21 * n33
                    - n13 * n21 * n34
                    + n13 * n24 * n31
                    - n14 * n23 * n31) +
                n43 * (+n11 * n24 * n32
                    - n11 * n22 * n34
                    - n14 * n21 * n32
                    + n12 * n21 * n34
                    + n14 * n22 * n31
                    - n12 * n24 * n31) +
                n44 * (-n13 * n22 * n31
                    - n11 * n23 * n32
                    + n11 * n22 * n33
                    + n13 * n21 * n32
                    - n12 * n21 * n33
                    + n12 * n23 * n31));
        };
        /**
         * Duplicates the current Matrix4 instance.
         * @method
         *
         * @param {Zia.Matrix4} result - The object in which to store the result.
         * @returns {Zia.Matrix4} The modified result parameter.
         */
        Matrix4.prototype.clone = function (result) {
            result.elements.set(this.elements);
            return result;
        };
        /**
         * Extracts the scale, rotation, and translation components of the current
         * Matrix4 instance. Assumes this is a transform matrix.
         * @method
         *
         * @param {Zia.Vector3} scale - The scale component of the transform matrix.
         * @param {Zia.Quaternion} rotation - The rotation component of the transform matrix.
         * @param {Zia.Vector3} translation - The translation component of the transform matrix.
         * @returns {Boolean} True if the matrix can be decomposed, otherwise false.
         */
        Matrix4.prototype.decompose = function (scale, rotation, translation) {
            var te = this.elements;
            var vector = Matrix4._decomposeVectorTemp;
            var matrix = Matrix4._decomposeMatrixTemp;
            var sx = vector.set(te[0], te[1], te[2]).length();
            var sy = vector.set(te[4], te[5], te[6]).length();
            var sz = vector.set(te[8], te[9], te[10]).length();
            // if determinant is negative, we need to invert one scale
            var det = this.determinant();
            if (det < 0) {
                sx = -sx;
            }
            translation.x = te[12];
            translation.y = te[13];
            translation.z = te[14];
            // scale the rotation part
            matrix.elements.set(this.elements); // at this point matrix is incomplete so we can't use .copy()
            var invSX = 1 / sx;
            var invSY = 1 / sy;
            var invSZ = 1 / sz;
            matrix.elements[0] *= invSX;
            matrix.elements[1] *= invSX;
            matrix.elements[2] *= invSX;
            matrix.elements[4] *= invSY;
            matrix.elements[5] *= invSY;
            matrix.elements[6] *= invSY;
            matrix.elements[8] *= invSZ;
            matrix.elements[9] *= invSZ;
            matrix.elements[10] *= invSZ;
            Zia.Quaternion.createFromRotationMatrix(matrix, rotation);
            scale.x = sx;
            scale.y = sy;
            scale.z = sz;
            return true; // TODO: In what situation should we return false?
        };
        Matrix4._composeTemp = new Matrix4();
        Matrix4.createLookAt = (function () {
            var x = new Zia.Vector3();
            var y = new Zia.Vector3();
            var z = new Zia.Vector3();
            return function (eye, target, up, result) {
                var te = result.elements;
                z.subVectors(eye, target).normalize();
                x.crossVectors(up, z).normalize();
                y.crossVectors(z, x);
                var translateX = x.dot(eye);
                var translateY = y.dot(eye);
                var translateZ = z.dot(eye);
                te[0] = x.x;
                te[4] = x.y;
                te[8] = x.z;
                te[12] = -translateX;
                te[1] = y.x;
                te[5] = y.y;
                te[9] = y.z;
                te[13] = -translateY;
                te[2] = z.x;
                te[6] = z.y;
                te[10] = z.z;
                te[14] = -translateZ;
                te[3] = 0;
                te[7] = 0;
                te[11] = 0;
                te[15] = 1;
                return result;
            };
        })();
        Matrix4._decomposeVectorTemp = new Zia.Vector3();
        Matrix4._decomposeMatrixTemp = new Matrix4();
        return Matrix4;
    })();
    Zia.Matrix4 = Matrix4;
})(Zia || (Zia = {}));


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
var Zia;
(function (Zia) {
    /**
     * Represents a 2-dimensional vector.
     */
    var Vector2 = (function () {
        /**
         * Constructs a new 2-dimensional vector.
         *
         * @param x The value for the x coordinate.
         * @param y The value for the y coordinate.
         */
        function Vector2(x, y) {
            if (x === void 0) { x = 0.0; }
            if (y === void 0) { y = 0.0; }
            this._x = x;
            this._y = y;
        }
        Object.defineProperty(Vector2.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (v) {
                this._x = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (v) {
                this._y = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Vector2.prototype.set = function (x, y) {
            this._x = x;
            this._y = y;
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.copy = function (v) {
            this._x = v._x;
            this._y = v._y;
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.add = function (v) {
            this._x += v._x;
            this._y += v._y;
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.addVectors = function (a, b) {
            this._x = a._x + b._x;
            this._y = a._y + b._y;
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.addScalar = function (s) {
            this._x += s;
            this._y += s;
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.sub = function (v) {
            this._x -= v._x;
            this._y -= v._y;
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.subVectors = function (a, b) {
            this._x = a._x - b._x;
            this._y = a._y - b._y;
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.multiply = function (v) {
            this._x *= v._x;
            this._y *= v._y;
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.multiplyScalar = function (s) {
            this._x *= s;
            this._y *= s;
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.divide = function (v) {
            this._x /= v._x;
            this._y /= v._y;
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.divideScalar = function (scalar) {
            if (scalar !== 0) {
                var invScalar = 1 / scalar;
                this._x *= invScalar;
                this._y *= invScalar;
            }
            else {
                this._x = 0;
                this._y = 0;
            }
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.min = function (v) {
            if (this._x > v._x) {
                this._x = v._x;
            }
            if (this._y > v._y) {
                this._y = v._y;
            }
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.max = function (v) {
            if (this._x < v._x) {
                this._x = v._x;
            }
            if (this._y < v._y) {
                this._y = v._y;
            }
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.clamp = function (min, max) {
            // This function assumes min < max, if this assumption isn't true it will not operate correctly
            if (this._x < min._x) {
                this._x = min._x;
            }
            else if (this._x > max._x) {
                this._x = max._x;
            }
            if (this._y < min._y) {
                this._y = min._y;
            }
            else if (this._y > max._y) {
                this._y = max._y;
            }
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.clampScalar = function (minVal, maxVal) {
            Vector2._clampScalarMinTemp.set(minVal, minVal);
            Vector2._clampScalarMaxTemp.set(maxVal, maxVal);
            return this.clamp(Vector2._clampScalarMinTemp, Vector2._clampScalarMaxTemp);
        };
        Vector2.prototype.floor = function () {
            this._x = Math.floor(this._x);
            this._y = Math.floor(this._y);
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.ceil = function () {
            this._x = Math.ceil(this._x);
            this._y = Math.ceil(this._y);
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.round = function () {
            this._x = Math.round(this._x);
            this._y = Math.round(this._y);
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.roundToZero = function () {
            this._x = (this._x < 0) ? Math.ceil(this._x) : Math.floor(this._x);
            this._y = (this._y < 0) ? Math.ceil(this._y) : Math.floor(this._y);
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.negate = function () {
            return this.multiplyScalar(-1);
        };
        Vector2.prototype.dot = function (v) {
            return this._x * v._x + this._y * v._y;
        };
        Vector2.prototype.lengthSq = function () {
            return this._x * this._x + this._y * this._y;
        };
        Vector2.prototype.length = function () {
            return Math.sqrt(this._x * this._x + this._y * this._y);
        };
        Vector2.prototype.normalize = function () {
            return this.divideScalar(this.length());
        };
        Vector2.prototype.distanceTo = function (v) {
            return Math.sqrt(this.distanceToSquared(v));
        };
        Vector2.prototype.distanceToSquared = function (v) {
            var dx = this._x - v._x, dy = this._y - v._y;
            return dx * dx + dy * dy;
        };
        Vector2.prototype.setLength = function (l) {
            var oldLength = this.length();
            if (oldLength !== 0 && l !== oldLength) {
                this.multiplyScalar(l / oldLength);
            }
            return this;
        };
        Vector2.prototype.lerp = function (v, alpha) {
            this._x += (v._x - this._x) * alpha;
            this._y += (v._y - this._y) * alpha;
            this._onChangeCallback();
            return this;
        };
        Vector2.prototype.equals = function (v) {
            return ((v._x === this._x) && (v._y === this._y));
        };
        Vector2.prototype.onChange = function (callback) {
            this._onChangeCallback = callback;
            return this;
        };
        Vector2.prototype._onChangeCallback = function () {
        };
        Vector2.prototype.clone = function () {
            return new Zia.Vector2(this._x, this._y);
        };
        Vector2.prototype.toJS = function () {
            return [this._x, this._y];
        };
        Vector2._clampScalarMinTemp = new Vector2();
        Vector2._clampScalarMaxTemp = new Vector2();
        return Vector2;
    })();
    Zia.Vector2 = Vector2;
})(Zia || (Zia = {}));


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
var Zia;
(function (Zia) {
    /**
     * Represents a 4-dimensional vector.
     */
    var Vector4 = (function () {
        /**
         * Constructs a new 4-dimensional vector.
         *
         * @param x The value for the x coordinate.
         * @param y The value for the y coordinate.
         * @param z The value for the z coordinate.
         * @param w The value for the w coordinate.
         */
        function Vector4(x, y, z, w) {
            if (x === void 0) { x = 0.0; }
            if (y === void 0) { y = 0.0; }
            if (z === void 0) { z = 0.0; }
            if (w === void 0) { w = 1.0; }
            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;
        }
        ;
        Object.defineProperty(Vector4.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (v) {
                this._x = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector4.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (v) {
                this._y = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector4.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (v) {
                this._z = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector4.prototype, "w", {
            get: function () {
                return this._w;
            },
            set: function (v) {
                this._w = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Vector4.prototype.set = function (x, y, z, w) {
            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.copy = function (v) {
            this._x = v._x;
            this._y = v._y;
            this._z = v._z;
            this._w = (v._w !== undefined) ? v._w : 1;
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.add = function (v) {
            this._x += v._x;
            this._y += v._y;
            this._z += v._z;
            this._w += v._w;
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.addScalar = function (s) {
            this._x += s;
            this._y += s;
            this._z += s;
            this._w += s;
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.addVectors = function (a, b) {
            this._x = a._x + b._x;
            this._y = a._y + b._y;
            this._z = a._z + b._z;
            this._w = a._w + b._w;
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.sub = function (v) {
            this._x -= v._x;
            this._y -= v._y;
            this._z -= v._z;
            this._w -= v._w;
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.subVectors = function (a, b) {
            this._x = a._x - b._x;
            this._y = a._y - b._y;
            this._z = a._z - b._z;
            this._w = a._w - b._w;
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.multiplyScalar = function (scalar) {
            this._x *= scalar;
            this._y *= scalar;
            this._z *= scalar;
            this._w *= scalar;
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.applyMatrix4 = function (m) {
            var x = this._x;
            var y = this._y;
            var z = this._z;
            var w = this._w;
            var e = m.elements;
            this._x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
            this._y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
            this._z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
            this._w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.divideScalar = function (scalar) {
            if (scalar !== 0) {
                var invScalar = 1 / scalar;
                this._x *= invScalar;
                this._y *= invScalar;
                this._z *= invScalar;
                this._w *= invScalar;
            }
            else {
                this._x = 0;
                this._y = 0;
                this._z = 0;
                this._w = 1;
            }
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.setAxisAngleFromQuaternion = function (q) {
            // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
            // q is assumed to be normalized
            this._w = 2 * Math.acos(q.w);
            var s = Math.sqrt(1 - q.w * q.w);
            if (s < 0.0001) {
                this._x = 1;
                this._y = 0;
                this._z = 0;
            }
            else {
                this._x = q.x / s;
                this._y = q.y / s;
                this._z = q.z / s;
            }
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.setAxisAngleFromRotationMatrix = function (m) {
            // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
            // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
            var angle, x, y, z, epsilon = 0.01, epsilon2 = 0.1, te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10];
            if ((Math.abs(m12 - m21) < epsilon)
                && (Math.abs(m13 - m31) < epsilon)
                && (Math.abs(m23 - m32) < epsilon)) {
                // singularity found
                // first check for identity matrix which must have +1 for all terms
                // in leading diagonal and zero in other terms
                if ((Math.abs(m12 + m21) < epsilon2)
                    && (Math.abs(m13 + m31) < epsilon2)
                    && (Math.abs(m23 + m32) < epsilon2)
                    && (Math.abs(m11 + m22 + m33 - 3) < epsilon2)) {
                    // this singularity is identity matrix so angle = 0
                    this.set(1, 0, 0, 0);
                    return this; // zero angle, arbitrary axis
                }
                // otherwise this singularity is angle = 180
                angle = Math.PI;
                var xx = (m11 + 1) / 2;
                var yy = (m22 + 1) / 2;
                var zz = (m33 + 1) / 2;
                var xy = (m12 + m21) / 4;
                var xz = (m13 + m31) / 4;
                var yz = (m23 + m32) / 4;
                if ((xx > yy) && (xx > zz)) {
                    if (xx < epsilon) {
                        x = 0;
                        y = 0.707106781;
                        z = 0.707106781;
                    }
                    else {
                        x = Math.sqrt(xx);
                        y = xy / x;
                        z = xz / x;
                    }
                }
                else if (yy > zz) {
                    if (yy < epsilon) {
                        x = 0.707106781;
                        y = 0;
                        z = 0.707106781;
                    }
                    else {
                        y = Math.sqrt(yy);
                        x = xy / y;
                        z = yz / y;
                    }
                }
                else {
                    if (zz < epsilon) {
                        x = 0.707106781;
                        y = 0.707106781;
                        z = 0;
                    }
                    else {
                        z = Math.sqrt(zz);
                        x = xz / z;
                        y = yz / z;
                    }
                }
                this.set(x, y, z, angle);
                return this; // return 180 deg rotation
            }
            // as we have reached here there are no singularities so we can handle normally
            var s = Math.sqrt((m32 - m23) * (m32 - m23)
                + (m13 - m31) * (m13 - m31)
                + (m21 - m12) * (m21 - m12)); // used to normalize
            if (Math.abs(s) < 0.001)
                s = 1;
            // prevent divide by zero, should not happen if matrix is orthogonal and should be
            // caught by singularity test above, but I've left it in just in case
            this._x = (m32 - m23) / s;
            this._y = (m13 - m31) / s;
            this._z = (m21 - m12) / s;
            this._w = Math.acos((m11 + m22 + m33 - 1) / 2);
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.min = function (v) {
            if (this._x > v._x) {
                this._x = v._x;
            }
            if (this._y > v._y) {
                this._y = v._y;
            }
            if (this._z > v._z) {
                this._z = v._z;
            }
            if (this._w > v._w) {
                this._w = v._w;
            }
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.max = function (v) {
            if (this._x < v._x) {
                this._x = v._x;
            }
            if (this._y < v._y) {
                this._y = v._y;
            }
            if (this._z < v._z) {
                this._z = v._z;
            }
            if (this._w < v._w) {
                this._w = v._w;
            }
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.clamp = function (min, max) {
            // This function assumes min < max, if this assumption isn't true it will not operate correctly
            if (this._x < min._x) {
                this._x = min._x;
            }
            else if (this._x > max._x) {
                this._x = max._x;
            }
            if (this._y < min._y) {
                this._y = min._y;
            }
            else if (this._y > max._y) {
                this._y = max._y;
            }
            if (this._z < min._z) {
                this._z = min._z;
            }
            else if (this._z > max._z) {
                this._z = max._z;
            }
            if (this._w < min._w) {
                this._w = min._w;
            }
            else if (this._w > max._w) {
                this._w = max._w;
            }
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.clampScalar = function (minVal, maxVal) {
            if (Vector4._min === undefined) {
                Vector4._min = new Zia.Vector4();
                Vector4._max = new Zia.Vector4();
            }
            Vector4._min.set(minVal, minVal, minVal, minVal);
            Vector4._max.set(maxVal, maxVal, maxVal, maxVal);
            return this.clamp(Vector4._min, Vector4._max);
        };
        ;
        Vector4.prototype.floor = function () {
            this._x = Math.floor(this._x);
            this._y = Math.floor(this._y);
            this._z = Math.floor(this._z);
            this._w = Math.floor(this._w);
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.ceil = function () {
            this._x = Math.ceil(this._x);
            this._y = Math.ceil(this._y);
            this._z = Math.ceil(this._z);
            this._w = Math.ceil(this._w);
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.round = function () {
            this._x = Math.round(this._x);
            this._y = Math.round(this._y);
            this._z = Math.round(this._z);
            this._w = Math.round(this._w);
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.roundToZero = function () {
            this._x = (this._x < 0) ? Math.ceil(this._x) : Math.floor(this._x);
            this._y = (this._y < 0) ? Math.ceil(this._y) : Math.floor(this._y);
            this._z = (this._z < 0) ? Math.ceil(this._z) : Math.floor(this._z);
            this._w = (this._w < 0) ? Math.ceil(this._w) : Math.floor(this._w);
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.negate = function () {
            this._x = -this._x;
            this._y = -this._y;
            this._z = -this._z;
            this._w = -this._w;
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.dot = function (v) {
            return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
        };
        Vector4.prototype.lengthSq = function () {
            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
        };
        Vector4.prototype.length = function () {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
        };
        Vector4.prototype.lengthManhattan = function () {
            return Math.abs(this._x) + Math.abs(this._y) + Math.abs(this._z) + Math.abs(this._w);
        };
        Vector4.prototype.normalize = function () {
            return this.divideScalar(this.length());
        };
        Vector4.prototype.lerp = function (v, alpha) {
            this._x += (v._x - this._x) * alpha;
            this._y += (v._y - this._y) * alpha;
            this._z += (v._z - this._z) * alpha;
            this._w += (v._w - this._w) * alpha;
            this._onChangeCallback();
            return this;
        };
        Vector4.prototype.equals = function (v) {
            return ((v._x === this._x) && (v._y === this._y) && (v._z === this._z) && (v._w === this._w));
        };
        Vector4.prototype.clone = function () {
            return new Zia.Vector4(this._x, this._y, this._z, this._w);
        };
        Vector4.prototype.onChange = function (callback) {
            this._onChangeCallback = callback;
            return this;
        };
        Vector4.prototype._onChangeCallback = function () {
        };
        Vector4.prototype.suppressChangeCallback = function (func) {
            var temp = this._onChangeCallback;
            this._onChangeCallback = function () { };
            func();
            this._onChangeCallback = temp;
        };
        return Vector4;
    })();
    Zia.Vector4 = Vector4;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    var GeometricPrimitive;
    (function (GeometricPrimitive) {
        function mergeVertexData() {
            var arrays = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arrays[_i - 0] = arguments[_i];
            }
            var vertexData = [];
            if (arrays.length < 1) {
                throw "You must pass at least one array in to mergeVertexData";
            }
            var vertexCount = arrays[0].length;
            for (var i = 1; i < arrays.length; i++) {
                if (arrays[i].length !== vertexCount) {
                    throw "All arrays passed in must have the same length";
                }
            }
            for (var i = 0; i < vertexCount; i++) {
                for (var j = 0; j < arrays.length; j++) {
                    Array.prototype.push.apply(vertexData, arrays[j][i].toArray());
                }
            }
            return vertexData;
        }
        GeometricPrimitive.mergeVertexData = mergeVertexData;
        function convertToModel(graphicsDevice, primitive) {
            var vertexData = Zia.GeometricPrimitive.mergeVertexData(primitive.positions, primitive.normals, primitive.textureCoordinates);
            var vertices = new Float32Array(vertexData);
            var vertexBuffer = new Zia.VertexBuffer(graphicsDevice, new Zia.VertexDeclaration([
                new Zia.VertexElement("aVertexPosition", 3, 0),
                new Zia.VertexElement("aVertexNormal", 3, 3 * 4),
                new Zia.VertexElement("aTextureCoord", 2, 6 * 4)
            ]), vertices);
            var indexBuffer = new Zia.IndexBuffer(graphicsDevice, new Uint16Array(primitive.indices));
            var program = new Zia.BasicProgram(graphicsDevice);
            var model = new Zia.Model([
                new Zia.ModelMesh(graphicsDevice, [
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
        GeometricPrimitive.convertToModel = convertToModel;
    })(GeometricPrimitive = Zia.GeometricPrimitive || (Zia.GeometricPrimitive = {}));
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    // From http://bocoup.com/weblog/counting-uniforms-in-webgl/
    function getProgramInfo(gl, program) {
        var result = {
            attributes: [],
            uniforms: [],
            samplers: {}
        };
        var activeUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
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
            result.uniforms.push(toSimpleObject(uniform, gl.getUniformLocation(program, uniform.name)));
        }
        // Loop through active attributes
        for (var i = 0; i < activeAttributes; i++) {
            var attribute = gl.getActiveAttrib(program, i);
            result.attributes.push(toSimpleObject(attribute, gl.getAttribLocation(program, attribute.name)));
        }
        // Loop through samplers
        var samplerIndex = 0;
        for (var i = 0; i < result.uniforms.length; i++) {
            var uniform = result.uniforms[i];
            switch (uniform.type) {
                case gl.SAMPLER_2D:
                case gl.SAMPLER_CUBE:
                    result.samplers[uniform.name] = samplerIndex++;
                    break;
            }
        }
        return result;
    }
    /**
     * Wrapper for a single WebGL Program object.
     */
    var Program = (function () {
        /**
         * Constructs a new program.
         *
         * @param graphicsDevice The graphics device.
         * @param vertexShader The vertex shader.
         * @param fragmentShader The fragmentShader.
         */
        function Program(graphicsDevice, vertexShader, fragmentShader) {
            this._graphicsDevice = graphicsDevice;
            var gl = this._gl = graphicsDevice.gl;
            var program = gl.createProgram();
            gl.attachShader(program, vertexShader.shader);
            gl.attachShader(program, fragmentShader.shader);
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
            this._samplerIndices = programInfo.samplers;
        }
        ;
        Program.prototype.apply = function () {
            this._graphicsDevice._currentProgram = this;
            this._gl.useProgram(this._program);
            this._onApply();
        };
        Program.prototype._onApply = function () {
        };
        Program.prototype.setUniform = function (name, value) {
            if (value instanceof Zia.Color4) {
                Program._temp.set(value.r, value.g, value.b, value.a);
                value = Program._temp;
            }
            var uniform = this._uniformsByName[name];
            if (uniform === undefined) {
                return;
            }
            var gl = this._gl;
            switch (uniform.type) {
                case gl.FLOAT:
                    gl.uniform1f(uniform.location, value);
                    break;
                case gl.FLOAT_VEC2:
                    gl.uniform2f(uniform.location, value._x, value._y);
                    break;
                case gl.FLOAT_VEC3:
                    gl.uniform3f(uniform.location, value._x, value._y, value._z);
                    break;
                case gl.FLOAT_VEC4:
                    gl.uniform4f(uniform.location, value.x, value.y, value.z, value.w);
                    break;
                case gl.FLOAT_MAT3:
                    gl.uniformMatrix3fv(uniform.location, false, value.elements);
                    break;
                case gl.FLOAT_MAT4:
                    gl.uniformMatrix4fv(uniform.location, false, value.elements);
                    break;
                case gl.SAMPLER_2D:
                    this._setUniformSampler(gl, uniform, value, gl.TEXTURE_2D);
                    break;
                case gl.SAMPLER_CUBE:
                    this._setUniformSampler(gl, uniform, value, gl.TEXTURE_CUBE_MAP);
                    break;
                default:
                    throw "Not implemented for type: " + uniform.type;
            }
        };
        Program.prototype._setUniformSampler = function (gl, uniform, value, textureType) {
            var samplerIndex = this._samplerIndices[uniform.name];
            gl.activeTexture(gl.TEXTURE0 + samplerIndex);
            if (value !== null) {
                gl.bindTexture(textureType, value._texture);
                gl.uniform1i(uniform.location, samplerIndex);
            }
            else {
                gl.bindTexture(textureType, null);
            }
        };
        Program.prototype.destroy = function () {
            var attachedShaders = this._gl.getAttachedShaders(this._program);
            for (var i = 0; i < attachedShaders.length; i++) {
                this._gl.detachShader(this._program, attachedShaders[i]);
            }
            this._gl.deleteProgram(this._program);
        };
        Program._temp = new Zia.Vector4();
        return Program;
    })();
    Zia.Program = Program;
})(Zia || (Zia = {}));


// Based on EffectHelpers from XNA. Original licence follows:
//-----------------------------------------------------------------------------
// EffectHelpers.cs
//
// Microsoft XNA Community Game Platform
// Copyright (C) Microsoft Corporation. All rights reserved.
//-----------------------------------------------------------------------------
var Zia;
(function (Zia) {
    Zia.ProgramUtil = {
        /** Sets up the standard key/fill/back lighting rig. */
        enableDefaultLighting: function (light0, light1, light2) {
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
        setModelViewProj: (function () {
            var modelViewProjectionMatrix = new Zia.Matrix4();
            return function (program, dirtyFlags, model, view, projection, modelView) {
                // Recompute the model+view+projection matrix?
                if ((dirtyFlags & 1 /* ModelViewProj */) != 0) {
                    Zia.Matrix4.multiply(view, model, modelView);
                    Zia.Matrix4.multiply(projection, modelView, modelViewProjectionMatrix);
                    program.setUniform('uMVPMatrix', modelViewProjectionMatrix);
                    dirtyFlags &= ~1 /* ModelViewProj */;
                }
                return dirtyFlags;
            };
        })(),
        /** Sets the diffuse/emissive/alpha material color parameters. */
        setMaterialColor: function (program, lightingEnabled, alpha, diffuseColor, emissiveColor, ambientLightColor) {
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
                var diffuse = new Zia.Vector4(diffuseColor.x * alpha, diffuseColor.y * alpha, diffuseColor.z * alpha, alpha);
                var emissive = new Zia.Vector3((emissiveColor.x + ambientLightColor.x * diffuseColor.x) * alpha, (emissiveColor.y + ambientLightColor.y * diffuseColor.y) * alpha, (emissiveColor.z + ambientLightColor.z * diffuseColor.z) * alpha);
                program.setUniform('uDiffuseColor', diffuse);
                program.setUniform('uEmissiveColor', emissive);
            }
            else {
                var diffuse = new Zia.Vector4((diffuseColor.x + emissiveColor.x) * alpha, (diffuseColor.y + emissiveColor.y) * alpha, (diffuseColor.z + emissiveColor.z) * alpha, alpha);
                program.setUniform('uDiffuseColor', diffuse);
            }
        },
        setLightingMatrices: (function () {
            var modelInverseTransposeMatrix = new Zia.Matrix3();
            var viewInverseMatrix = new Zia.Matrix4();
            var eyePosition = new Zia.Vector3();
            return function (program, dirtyFlags, model, view) {
                // Set the world and world inverse transpose matrices.
                if ((dirtyFlags & 2 /* Model */) != 0) {
                    program.setUniform('uMMatrix', model);
                    modelInverseTransposeMatrix.getNormalMatrix(model);
                    program.setUniform('uMMatrixInverseTranspose', modelInverseTransposeMatrix);
                    dirtyFlags &= ~2 /* Model */;
                }
                // Set the eye position.
                if ((dirtyFlags & 4 /* EyePosition */) != 0) {
                    Zia.Matrix4.invert(viewInverseMatrix, view);
                    eyePosition.setFromMatrixColumn(3, viewInverseMatrix);
                    program.setUniform('uEyePosition', eyePosition);
                    dirtyFlags &= ~4 /* EyePosition */;
                }
                return dirtyFlags;
            };
        })()
    };
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    (function (Comparison) {
        Comparison[Comparison["Never"] = 0] = "Never";
        Comparison[Comparison["Always"] = 1] = "Always";
        Comparison[Comparison["Less"] = 2] = "Less";
        Comparison[Comparison["Equal"] = 3] = "Equal";
        Comparison[Comparison["LessEqual"] = 4] = "LessEqual";
        Comparison[Comparison["Greater"] = 5] = "Greater";
        Comparison[Comparison["GreaterEqual"] = 6] = "GreaterEqual";
        Comparison[Comparison["NotEqual"] = 7] = "NotEqual";
    })(Zia.Comparison || (Zia.Comparison = {}));
    var Comparison = Zia.Comparison;
    var DepthStencilState = (function () {
        function DepthStencilState() {
            this.isDepthEnabled = true;
            this.depthFunction = Comparison.Less;
        }
        DepthStencilState.mapComparison = function (comparison, gl) {
            switch (comparison) {
                case Comparison.Never: return gl.NEVER;
                case Comparison.Always: return gl.ALWAYS;
                case Comparison.Less: return gl.LESS;
                case Comparison.Equal: return gl.EQUAL;
                case Comparison.LessEqual: return gl.LEQUAL;
                case Comparison.Greater: return gl.GREATER;
                case Comparison.GreaterEqual: return gl.GEQUAL;
                case Comparison.NotEqual: return gl.NOTEQUAL;
            }
        };
        DepthStencilState.prototype._apply = function (gl) {
            if (this.isDepthEnabled) {
                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(DepthStencilState.mapComparison(this.depthFunction, gl));
            }
            else {
                gl.disable(gl.DEPTH_TEST);
            }
        };
        return DepthStencilState;
    })();
    Zia.DepthStencilState = DepthStencilState;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    /**
     * Main class in Zia. Manages the WebGL rendering context and associated state,
     * and performs rendering.
     */
    var GraphicsDevice = (function () {
        /**
         * Constructs a new `GraphicsDevice` object.
         *
         * @param canvas - The canvas element.
         */
        function GraphicsDevice(canvas, debug) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            this._canvas = canvas;
            var gl = this.gl = canvas.getContext('webgl', {
                antialias: true
            });
            if (debug) {
                gl = this.gl = Zia.DebugUtil.makeDebugContext(gl);
            }
            // TODO: Handle WebContextLost event.
            var viewport = this._viewport = new Zia.Viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            viewport.onChange(function () {
                gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
                gl.depthRange(viewport.minDepth, viewport.maxDepth);
            });
            this.rasterizerState = new Zia.RasterizerState();
            this.depthStencilState = new Zia.DepthStencilState();
        }
        Object.defineProperty(GraphicsDevice.prototype, "viewport", {
            get: function () {
                return this._viewport;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GraphicsDevice.prototype, "rasterizerState", {
            get: function () {
                return this._rasterizerState;
            },
            set: function (value) {
                this._rasterizerState = value;
                this._rasterizerState._apply(this.gl);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GraphicsDevice.prototype, "depthStencilState", {
            get: function () {
                return this._depthStencilState;
            },
            set: function (value) {
                this._depthStencilState = value;
                this._depthStencilState._apply(this.gl);
            },
            enumerable: true,
            configurable: true
        });
        GraphicsDevice.prototype.clear = function (clearOptions, color, depth, stencil) {
            var clearMask = 0;
            if (Zia.EnumUtil.hasFlag(clearOptions, 0 /* DepthBuffer */)) {
                clearMask |= this.gl.DEPTH_BUFFER_BIT;
                this.gl.clearDepth(depth);
            }
            if (Zia.EnumUtil.hasFlag(clearOptions, 1 /* StencilBuffer */)) {
                clearMask |= this.gl.STENCIL_BUFFER_BIT;
                this.gl.clearStencil(stencil);
            }
            if (Zia.EnumUtil.hasFlag(clearOptions, 2 /* ColorBuffer */)) {
                clearMask |= this.gl.COLOR_BUFFER_BIT;
                this.gl.clearColor(color.r, color.g, color.b, color.a);
            }
            this.gl.clear(clearMask);
        };
        GraphicsDevice.prototype.setIndexBuffer = function (indexBuffer) {
            this._indexBuffer = indexBuffer;
        };
        GraphicsDevice.prototype.setVertexBuffers = function (vertexBuffers) {
            this._vertexBuffers = vertexBuffers;
        };
        GraphicsDevice.prototype.setVertexBuffer = function (vertexBuffer) {
            this._vertexBuffers = [vertexBuffer];
        };
        GraphicsDevice.prototype.drawIndexedPrimitives = function (primitiveType, startIndex, indexCount) {
            var gl = this.gl;
            var enabledAttributeLocations = this._bindVertexAttributes(gl);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer._buffer);
            gl.drawElements(this._getMode(primitiveType), indexCount, gl.UNSIGNED_SHORT, startIndex * 4);
            for (var i = 0; i < enabledAttributeLocations.length; i++) {
                gl.disableVertexAttribArray(enabledAttributeLocations[i]);
            }
        };
        GraphicsDevice.prototype.drawPrimitives = function (primitiveType, startVertex, vertexCount) {
            var gl = this.gl;
            var enabledAttributeLocations = this._bindVertexAttributes(gl);
            gl.drawArrays(this._getMode(primitiveType), startVertex, vertexCount);
            for (var i = 0; i < enabledAttributeLocations.length; i++) {
                gl.disableVertexAttribArray(enabledAttributeLocations[i]);
            }
        };
        GraphicsDevice.prototype.resize = function () {
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
        };
        GraphicsDevice.prototype.toggleFullScreen = function () {
            Zia.HtmlUtil.toggleFullScreen(this._canvas);
        };
        GraphicsDevice.prototype._bindVertexAttributes = function (gl) {
            var enabledAttributeLocations = [];
            for (var i = 0; i < this._currentProgram._attributes.length; i++) {
                var attribute = this._currentProgram._attributes[i];
                var vertexBuffer = this._findVertexBuffer(attribute.name);
                if (vertexBuffer) {
                    enabledAttributeLocations.push(attribute.location);
                    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.buffer._buffer);
                    gl.vertexAttribPointer(attribute.location, vertexBuffer.element.numComponents, gl.FLOAT, false, vertexBuffer.buffer.vertexDeclaration.stride, vertexBuffer.element.offset);
                    gl.enableVertexAttribArray(attribute.location);
                }
            }
            return enabledAttributeLocations;
        };
        GraphicsDevice.prototype._findVertexBuffer = function (attributeName) {
            for (var i = 0; i < this._vertexBuffers.length; i++) {
                var vertexBuffer = this._vertexBuffers[i];
                for (var j = 0; j < vertexBuffer.vertexDeclaration.elements.length; j++) {
                    var element = vertexBuffer.vertexDeclaration.elements[j];
                    if (element.attributeName === attributeName) {
                        return {
                            buffer: vertexBuffer,
                            element: element
                        };
                    }
                }
            }
            return null;
        };
        GraphicsDevice.prototype._getMode = function (primitiveType) {
            switch (primitiveType) {
                case 0 /* PointList */: return this.gl.POINTS;
                case 1 /* LineList */: return this.gl.LINES;
                case 2 /* LineStrip */: return this.gl.LINE_STRIP;
                case 3 /* LineLoop */: return this.gl.LINE_LOOP;
                case 4 /* TriangleList */: return this.gl.TRIANGLES;
                case 5 /* TriangleStrip */: return this.gl.TRIANGLE_STRIP;
                case 6 /* TriangleFan */: return this.gl.TRIANGLE_FAN;
            }
        };
        return GraphicsDevice;
    })();
    Zia.GraphicsDevice = GraphicsDevice;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    var IndexBuffer = (function () {
        function IndexBuffer(graphicsDevice, data) {
            this._gl = graphicsDevice.gl;
            this._buffer = this._gl.createBuffer();
            if (data !== undefined) {
                this.setData(data);
            }
        }
        IndexBuffer.prototype.setData = function (data) {
            var gl = this._gl;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
        };
        IndexBuffer.prototype.destroy = function () {
            this._gl.deleteBuffer(this._buffer);
        };
        return IndexBuffer;
    })();
    Zia.IndexBuffer = IndexBuffer;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    var Model = (function () {
        function Model(meshes) {
            this.meshes = meshes;
        }
        Model.prototype.draw = function (modelMatrix, viewMatrix, projectionMatrix, programOverride) {
            if (programOverride === void 0) { programOverride = null; }
            for (var i = 0; i < this.meshes.length; i++) {
                var mesh = this.meshes[i];
                for (var j = 0; j < mesh.programs.length; j++) {
                    var program = programOverride || mesh.programs[j];
                    program.modelMatrix = modelMatrix;
                    program.viewMatrix = viewMatrix;
                    program.projectionMatrix = projectionMatrix;
                }
                mesh.draw(programOverride);
            }
        };
        return Model;
    })();
    Zia.Model = Model;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    var ModelMesh = (function () {
        function ModelMesh(graphicsDevice, meshParts) {
            this.graphicsDevice = graphicsDevice;
            this.meshParts = meshParts;
            for (var i = 0; i < meshParts.length; i++) {
                meshParts[i]._parent = this;
            }
            this.programs = [];
        }
        ModelMesh.prototype.draw = function (programOverride) {
            if (programOverride === void 0) { programOverride = null; }
            for (var i = 0; i < this.meshParts.length; i++) {
                var meshPart = this.meshParts[i];
                var program = programOverride || meshPart.program;
                if (meshPart.indexCount > 0) {
                    this.graphicsDevice.setVertexBuffer(meshPart.vertexBuffer);
                    this.graphicsDevice.setIndexBuffer(meshPart.indexBuffer);
                    program.apply();
                    this.graphicsDevice.drawIndexedPrimitives(4 /* TriangleList */, meshPart.startIndex, meshPart.indexCount);
                }
            }
        };
        return ModelMesh;
    })();
    Zia.ModelMesh = ModelMesh;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    var ModelMeshPart = (function () {
        function ModelMeshPart(options) {
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
        }
        Object.defineProperty(ModelMeshPart.prototype, "program", {
            get: function () {
                return this._program;
            },
            set: function (value) {
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
            },
            enumerable: true,
            configurable: true
        });
        return ModelMeshPart;
    })();
    Zia.ModelMeshPart = ModelMeshPart;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    (function (CullMode) {
        CullMode[CullMode["Back"] = 0] = "Back";
        CullMode[CullMode["Front"] = 1] = "Front";
        CullMode[CullMode["FrontAndBack"] = 2] = "FrontAndBack";
        CullMode[CullMode["None"] = 3] = "None";
    })(Zia.CullMode || (Zia.CullMode = {}));
    var CullMode = Zia.CullMode;
    var RasterizerState = (function () {
        function RasterizerState(options) {
            options = Zia.ObjectUtil.reverseMerge(options || {}, {
                cullMode: Zia.CullMode.Back,
                isFrontClockwise: false,
                isPolygonOffsetEnabled: false,
                polygonOffsetFactor: 0.0,
                polygonOffsetUnits: 0.0
            });
            this.cullMode = options.cullMode;
            this.isFrontClockwise = options.isFrontClockwise;
            this.isPolygonOffsetEnabled = options.isPolygonOffsetEnabled;
            this.polygonOffsetFactor = options.polygonOffsetFactor;
            this.polygonOffsetUnits = options.polygonOffsetUnits;
        }
        RasterizerState.prototype._apply = function (gl) {
            switch (this.cullMode) {
                case CullMode.Back:
                    gl.enable(gl.CULL_FACE);
                    gl.cullFace(gl.BACK);
                    break;
                case CullMode.Front:
                    gl.enable(gl.CULL_FACE);
                    gl.cullFace(gl.FRONT);
                    break;
                case CullMode.FrontAndBack:
                    gl.enable(gl.CULL_FACE);
                    gl.cullFace(gl.FRONT_AND_BACK);
                    break;
                case CullMode.None:
                    gl.disable(gl.CULL_FACE);
                    break;
            }
            gl.frontFace(this.isFrontClockwise ? gl.CW : gl.CCW);
            if (this.isPolygonOffsetEnabled) {
                gl.enable(gl.POLYGON_OFFSET_FILL);
                gl.polygonOffset(this.polygonOffsetFactor, this.polygonOffsetUnits);
            }
            else {
                gl.disable(gl.POLYGON_OFFSET_FILL);
            }
        };
        return RasterizerState;
    })();
    Zia.RasterizerState = RasterizerState;
})(Zia || (Zia = {}));


var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Zia;
(function (Zia) {
    var Shader = (function () {
        function Shader(graphicsDevice, type, source) {
            var gl = this._gl = graphicsDevice.gl;
            var shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                var error = gl.getShaderInfoLog(shader);
                gl.deleteShader(shader);
                throw new Error('Failed to compile shader: ' + error);
            }
            this.shader = shader;
        }
        ;
        Shader.prototype.destroy = function () {
            this._gl.deleteShader(this.shader);
        };
        return Shader;
    })();
    Zia.Shader = Shader;
    var FragmentShader = (function (_super) {
        __extends(FragmentShader, _super);
        function FragmentShader(graphicsDevice, source) {
            _super.call(this, graphicsDevice, graphicsDevice.gl.FRAGMENT_SHADER, source);
        }
        ;
        return FragmentShader;
    })(Shader);
    Zia.FragmentShader = FragmentShader;
    var VertexShader = (function (_super) {
        __extends(VertexShader, _super);
        function VertexShader(graphicsDevice, source) {
            _super.call(this, graphicsDevice, graphicsDevice.gl.VERTEX_SHADER, source);
        }
        ;
        return VertexShader;
    })(Shader);
    Zia.VertexShader = VertexShader;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    var Texture = (function () {
        function Texture(graphicsDevice, options, textureType) {
            var gl = this._gl = graphicsDevice.gl;
            this._texture = this._gl.createTexture();
            this._textureType = textureType;
            this._options = Zia.ObjectUtil.reverseMerge(options || {}, {
                filter: 3 /* MinNearestMagMipLinear */,
                wrapS: 0 /* Repeat */,
                wrapT: 0 /* Repeat */
            });
            gl.bindTexture(textureType, this._texture);
            gl.texParameteri(textureType, gl.TEXTURE_WRAP_S, Zia.TextureWrapUtil._map(gl, this._options.wrapS));
            gl.texParameteri(textureType, gl.TEXTURE_WRAP_T, Zia.TextureWrapUtil._map(gl, this._options.wrapT));
            var mappedFilterValues = Zia.TextureFilterUtil._map(gl, this._options.filter);
            gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, mappedFilterValues[0]);
            gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, mappedFilterValues[1]);
            gl.bindTexture(textureType, null);
        }
        Texture.prototype._setData = function (setImageDataCallback, flipY) {
            var gl = this._gl;
            var textureType = this._textureType;
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(textureType, this._texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
            setImageDataCallback(gl);
            gl.bindTexture(textureType, null);
        };
        Texture.prototype._generateMipmap = function () {
            var gl = this._gl;
            var textureType = this._textureType;
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(textureType, this._texture);
            gl.generateMipmap(textureType);
            gl.bindTexture(textureType, null);
        };
        Texture.prototype.destroy = function () {
            this._gl.deleteTexture(this._texture);
        };
        return Texture;
    })();
    Zia.Texture = Texture;
})(Zia || (Zia = {}));


var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Zia;
(function (Zia) {
    var Texture2D = (function (_super) {
        __extends(Texture2D, _super);
        function Texture2D(graphicsDevice, options) {
            _super.call(this, graphicsDevice, options, graphicsDevice.gl.TEXTURE_2D);
        }
        Texture2D.prototype.setData = function (data) {
            var width = this.width, height = this.height;
            this._setData(function (gl) {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
            }, true);
            this._generateMipmap();
        };
        Texture2D.createFromImagePath = function (graphicsDevice, imagePath, options) {
            var result = new Zia.Texture2D(graphicsDevice, options);
            var gl = graphicsDevice.gl;
            // Set temporary 1x1 white texture, until image has loaded
            result.width = 1;
            result.height = 1;
            result.setData(new Uint8Array([255, 255, 255, 255]));
            var image = new Image();
            image.onload = function () {
                result._setData(function () {
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                }, true);
                result._generateMipmap();
                result.width = image.naturalWidth;
                result.height = image.naturalHeight;
            };
            image.src = imagePath;
            return result;
        };
        Texture2D.createFromImageData = function (graphicsDevice, imageData, width, height, options) {
            var result = new Zia.Texture2D(graphicsDevice, options);
            result.width = width;
            result.height = height;
            var gl = graphicsDevice.gl;
            result.setData(imageData);
            return result;
        };
        Texture2D.createWhiteTexture = function (graphicsDevice) {
            var whitePixel = new Uint8Array([255, 255, 255, 255]);
            return Texture2D.createFromImageData(graphicsDevice, whitePixel, 1, 1);
        };
        return Texture2D;
    })(Zia.Texture);
    Zia.Texture2D = Texture2D;
})(Zia || (Zia = {}));


var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Zia;
(function (Zia) {
    Zia.CubeMapFaceUtil = {
        _map: function (gl, face) {
            switch (face) {
                case 1 /* NegativeX */:
                    return gl.TEXTURE_CUBE_MAP_NEGATIVE_X;
                case 3 /* NegativeY */:
                    return gl.TEXTURE_CUBE_MAP_NEGATIVE_Y;
                case 5 /* NegativeZ */:
                    return gl.TEXTURE_CUBE_MAP_NEGATIVE_Z;
                case 0 /* PositiveX */:
                    return gl.TEXTURE_CUBE_MAP_POSITIVE_X;
                case 2 /* PositiveY */:
                    return gl.TEXTURE_CUBE_MAP_POSITIVE_Y;
                case 4 /* PositiveZ */:
                    return gl.TEXTURE_CUBE_MAP_POSITIVE_Z;
                default:
                    throw "Invalid face: " + face;
            }
        }
    };
    var TextureCube = (function (_super) {
        __extends(TextureCube, _super);
        function TextureCube(graphicsDevice, options) {
            _super.call(this, graphicsDevice, options, graphicsDevice.gl.TEXTURE_CUBE_MAP);
        }
        TextureCube.prototype.setData = function (cubeMapFace, data) {
            var size = this.size;
            this._setData(function (gl) {
                gl.texImage2D(Zia.CubeMapFaceUtil._map(gl, cubeMapFace), 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
            }, false);
        };
        TextureCube.createFromImagePaths = function (graphicsDevice, imagePaths, options) {
            if (imagePaths.length !== 6) {
                throw "Must pass an array of 6 URLs";
            }
            var result = new Zia.TextureCube(graphicsDevice, options);
            // Set temporary 1x1 white texture, until images have loaded
            result.size = 1;
            var whitePixel = new Uint8Array([255, 255, 255, 255]);
            for (var i = 0; i < 6; i++) {
                result.setData(i, whitePixel);
            }
            var gl = graphicsDevice.gl;
            var loaded = 0;
            for (var i = 0; i < imagePaths.length; i++) {
                var imagePath = imagePaths[i];
                (function (localI) {
                    var image = new Image();
                    image.onload = function () {
                        result._setData(function () {
                            gl.texImage2D(Zia.CubeMapFaceUtil._map(gl, localI), 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                        }, false);
                        if (image.naturalWidth != image.naturalHeight) {
                            throw "Must use square textures for TextureCube";
                        }
                        if (loaded === 0) {
                            result.size = image.naturalWidth;
                        }
                        else if (image.naturalWidth !== result.size) {
                            throw "All 6 textures must have the same dimensions";
                        }
                        loaded++;
                        if (loaded === 6) {
                            result._generateMipmap();
                        }
                    };
                    image.src = imagePath;
                })(i);
            }
            return result;
        };
        return TextureCube;
    })(Zia.Texture);
    Zia.TextureCube = TextureCube;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    Zia.TextureFilterUtil = {
        // Returns an array containing [MinFilter, MagFilter]
        _map: function (gl, filter) {
            switch (filter) {
                case 0 /* MinMagMipNearest */:
                    return [gl.NEAREST_MIPMAP_NEAREST, gl.NEAREST];
                case 1 /* MinMagNearestMipLinear */:
                    return [gl.NEAREST_MIPMAP_LINEAR, gl.NEAREST];
                case 2 /* MinNearestMagLinearMipNearest */:
                    return [gl.NEAREST_MIPMAP_NEAREST, gl.LINEAR];
                case 3 /* MinNearestMagMipLinear */:
                    return [gl.NEAREST_MIPMAP_LINEAR, gl.LINEAR];
                case 4 /* MinLinearMagMipNearest */:
                    return [gl.LINEAR_MIPMAP_NEAREST, gl.NEAREST];
                case 5 /* MinLinearMagNearestMipLinear */:
                    return [gl.LINEAR_MIPMAP_LINEAR, gl.NEAREST];
                case 6 /* MinMagLinearMipNearest */:
                    return [gl.LINEAR_MIPMAP_NEAREST, gl.LINEAR];
                case 7 /* MinMagMipLinear */:
                    return [gl.LINEAR_MIPMAP_LINEAR, gl.LINEAR];
                case 8 /* MinMagNearest */:
                    return [gl.NEAREST, gl.NEAREST];
                case 9 /* MinNearestMagLinear */:
                    return [gl.NEAREST, gl.LINEAR];
                case 10 /* MinLinearMagNearest */:
                    return [gl.LINEAR, gl.NEAREST];
                case 11 /* MinMagLinear */:
                    return [gl.LINEAR, gl.LINEAR];
                default:
                    throw "Invalid value: " + filter;
            }
        }
    };
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    Zia.TextureWrapUtil = {
        _map: function (gl, wrap) {
            switch (wrap) {
                case 0 /* Repeat */:
                    return gl.REPEAT;
                case 1 /* ClampToEdge */:
                    return gl.CLAMP_TO_EDGE;
                case 2 /* MirroredRepeat */:
                    return gl.MIRRORED_REPEAT;
                default:
                    throw "Invalid value: " + wrap;
            }
        }
    };
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    var VertexBuffer = (function () {
        function VertexBuffer(graphicsDevice, vertexDeclaration, data) {
            this._gl = graphicsDevice.gl;
            this._buffer = this._gl.createBuffer();
            this.vertexDeclaration = vertexDeclaration;
            if (data !== undefined) {
                this.setData(data);
            }
        }
        VertexBuffer.prototype.setData = function (data) {
            var gl = this._gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        };
        VertexBuffer.prototype.destroy = function () {
            this._gl.deleteBuffer(this._buffer);
        };
        return VertexBuffer;
    })();
    Zia.VertexBuffer = VertexBuffer;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    var VertexElement = (function () {
        function VertexElement(attributeName, numComponents, offset) {
            if (offset === void 0) { offset = 0; }
            this.attributeName = attributeName;
            this.numComponents = numComponents;
            this.offset = offset;
        }
        return VertexElement;
    })();
    Zia.VertexElement = VertexElement;
    var VertexDeclaration = (function () {
        function VertexDeclaration(elements) {
            this.elements = elements;
            this.elements = elements;
            this.stride = 4 * elements
                .map(function (v) { return v.numComponents; })
                .reduce(function (p, c) { return p + c; }, 0);
        }
        return VertexDeclaration;
    })();
    Zia.VertexDeclaration = VertexDeclaration;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    var Viewport = (function () {
        function Viewport(x, y, width, height, minDepth, maxDepth) {
            if (minDepth === void 0) { minDepth = 0.0; }
            if (maxDepth === void 0) { maxDepth = 1.0; }
            this._onChangeCallback = function () { };
            this._x = x;
            this._y = y;
            this._width = width;
            this._height = height;
            this._minDepth = minDepth;
            this._maxDepth = maxDepth;
        }
        ;
        Object.defineProperty(Viewport.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (v) {
                this._x = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Viewport.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (v) {
                this._y = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Viewport.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (v) {
                this._width = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Viewport.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (v) {
                this._height = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Viewport.prototype, "minDepth", {
            get: function () {
                return this._minDepth;
            },
            set: function (v) {
                this._minDepth = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Viewport.prototype, "maxDepth", {
            get: function () {
                return this._maxDepth;
            },
            set: function (v) {
                this._maxDepth = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Viewport.prototype, "aspectRatio", {
            get: function () {
                if (this._height == 0 || this._width == 0)
                    return 0;
                return this._width / this._height;
            },
            enumerable: true,
            configurable: true
        });
        Viewport.prototype.set = function (x, y, width, height, minDepth, maxDepth) {
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
        };
        Viewport.prototype.onChange = function (callback) {
            this._onChangeCallback = callback;
            return this;
        };
        Viewport.prototype.suppressChangeCallback = function (func) {
            var temp = this._onChangeCallback;
            this._onChangeCallback = function () { };
            func();
            this._onChangeCallback = temp;
        };
        return Viewport;
    })();
    Zia.Viewport = Viewport;
})(Zia || (Zia = {}));


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
var Zia;
(function (Zia) {
    var GeometricPrimitive;
    (function (GeometricPrimitive) {
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
        /** Creates a cube primitive. */
        function createCube(size) {
            if (size === void 0) { size = 1.0; }
            var positions = [];
            var normals = [];
            var texCoords = [];
            var indices = [];
            size /= 2.0;
            // Create each face in turn.
            for (var i = 0; i < cubeFaceCount; i++) {
                var normal = faceNormals[i];
                // Get two vectors perpendicular both to the face normal and to each other.
                var basis = (i >= 4) ? new Zia.Vector3(0, 0, 1) : new Zia.Vector3(0, 1, 0);
                side1.set(normal.x, normal.y, normal.z);
                Zia.Vector3.cross(side1, basis, side1);
                side2.set(normal.x, normal.y, normal.z);
                Zia.Vector3.cross(side2, side1, side2);
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
                positions.push(normal.clone(new Zia.Vector3()).sub(side1).sub(side2).multiplyScalar(size));
                // (normal - side1 + side2) * size
                positions.push(normal.clone(new Zia.Vector3()).sub(side1).add(side2).multiplyScalar(size));
                // (normal + side1 + side2) * size
                positions.push(normal.clone(new Zia.Vector3()).add(side1).add(side2).multiplyScalar(size));
                // (normal + side1 - side2) * size
                positions.push(normal.clone(new Zia.Vector3()).add(side1).sub(side2).multiplyScalar(size));
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
        }
        GeometricPrimitive.createCube = createCube;
        ;
    })(GeometricPrimitive = Zia.GeometricPrimitive || (Zia.GeometricPrimitive = {}));
})(Zia || (Zia = {}));


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
var Zia;
(function (Zia) {
    var GeometricPrimitive;
    (function (GeometricPrimitive) {
        // Computes a point on a unit circle, aligned to the x/z plane and centered on the origin.
        function getCircleVector(i, tessellation) {
            var angle = i * 2.0 * Math.PI / tessellation;
            var dx = Math.sin(angle);
            var dz = Math.cos(angle);
            return new Zia.Vector3(dx, 0, dz);
        }
        // Helper creates a triangle fan to close the end of a cylinder.
        var createCylinderCapTemp1 = new Zia.Vector3();
        function createCylinderCap(positions, normals, texCoords, indices, tessellation, height, radius, isTop) {
            // Create cap indices.
            for (var i = 0; i < tessellation - 2; i++) {
                var i1 = (i + 1) % tessellation;
                var i2 = (i + 2) % tessellation;
                if (isTop) {
                    i2 = [i1, i1 = i2][0];
                }
                var vbase = positions.length;
                indices.push(vbase);
                indices.push(vbase + i2);
                indices.push(vbase + i1);
            }
            // Which end of the cylinder is this?
            var normal = new Zia.Vector3(0, 1, 0);
            var textureScale = new Zia.Vector2(-0.5, -0.5);
            if (!isTop) {
                normal.negate();
                textureScale.x = -textureScale.x;
            }
            // Create cap vertices.
            for (var i = 0; i < tessellation; i++) {
                var circleVector = getCircleVector(i, tessellation);
                // (circleVector*radius) + (normal*height)
                var position = circleVector.clone(new Zia.Vector3()).multiplyScalar(radius);
                createCylinderCapTemp1.set(normal.x, normal.y, normal.z);
                createCylinderCapTemp1.multiplyScalar(height);
                position.add(createCylinderCapTemp1);
                positions.push(position);
                normals.push(normal);
                texCoords.push(new Zia.Vector2(circleVector.x * textureScale.x + 0.5, 1.0 - circleVector.z * textureScale.y + 0.5));
            }
        }
        var vector2UnitY = new Zia.Vector2(0, 1);
        /** Creates a cylinder primitive. */
        function createCylinder(height, diameter, tessellation) {
            if (height === void 0) { height = 1.0; }
            if (diameter === void 0) { diameter = 1.0; }
            if (tessellation === void 0) { tessellation = 32; }
            if (tessellation < 3) {
                throw "tessellation must be >= 3";
            }
            var positions = [];
            var normals = [];
            var texCoords = [];
            var indices = [];
            height /= 2;
            var topOffset = new Zia.Vector3(0, 1, 0).multiplyScalar(height);
            var radius = diameter / 2;
            var stride = tessellation + 1;
            // Create a ring of triangles around the outside of the cylinder.
            for (var i = 0; i <= tessellation; i++) {
                var normal = getCircleVector(i, tessellation);
                var sideOffset = normal.clone(new Zia.Vector3()).multiplyScalar(radius);
                var textureCoordinate = new Zia.Vector2(i / tessellation, 1);
                positions.push(sideOffset.clone(new Zia.Vector3()).add(topOffset));
                normals.push(normal);
                texCoords.push(textureCoordinate);
                positions.push(sideOffset.clone(new Zia.Vector3()).sub(topOffset));
                normals.push(normal);
                texCoords.push(textureCoordinate.clone().sub(vector2UnitY));
                indices.push(i * 2);
                indices.push(i * 2 + 1);
                indices.push((i * 2 + 2) % (stride * 2));
                indices.push(i * 2 + 1);
                indices.push((i * 2 + 3) % (stride * 2));
                indices.push((i * 2 + 2) % (stride * 2));
            }
            // Create flat triangle fan caps to seal the top and bottom.
            createCylinderCap(positions, normals, texCoords, indices, tessellation, height, radius, true);
            createCylinderCap(positions, normals, texCoords, indices, tessellation, height, radius, false);
            return {
                positions: positions,
                normals: normals,
                textureCoordinates: texCoords,
                indices: indices
            };
        }
        GeometricPrimitive.createCylinder = createCylinder;
        ;
    })(GeometricPrimitive = Zia.GeometricPrimitive || (Zia.GeometricPrimitive = {}));
})(Zia || (Zia = {}));


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
var Zia;
(function (Zia) {
    var GeometricPrimitive;
    (function (GeometricPrimitive) {
        /** Creates a plane primitive. */
        function createPlane(sizeX, sizeY, tessellation, uvFactor) {
            if (sizeX === void 0) { sizeX = 1.0; }
            if (sizeY === void 0) { sizeY = 1.0; }
            if (tessellation === void 0) { tessellation = 1; }
            if (uvFactor === void 0) { uvFactor = new Zia.Vector2(1, 1); }
            if (tessellation < 1) {
                throw "tessellation must be > 0";
            }
            var lineWidth = tessellation + 1;
            var positions = new Array(lineWidth * lineWidth);
            var normals = new Array(lineWidth * lineWidth);
            var texCoords = new Array(lineWidth * lineWidth);
            var indices = new Array(tessellation * tessellation * 6);
            var deltaX = sizeX / tessellation;
            var deltaY = sizeY / tessellation;
            sizeX /= 2.0;
            sizeY /= 2.0;
            var normal = new Zia.Vector3(0, 1, 0);
            // Create vertices
            var vertexCount = 0;
            for (var y = 0; y < (tessellation + 1); y++) {
                for (var x = 0; x < (tessellation + 1); x++) {
                    positions[vertexCount] = new Zia.Vector3(-sizeX + deltaX * x, 0, sizeY - deltaY * y);
                    normals[vertexCount] = normal;
                    texCoords[vertexCount] = new Zia.Vector2(1.0 - 1.0 * x / tessellation * uvFactor.x, 1.0 - 1.0 * y / tessellation * uvFactor.y);
                    vertexCount++;
                }
            }
            // Create indices
            var indexCount = 0;
            for (var y = 0; y < tessellation; y++) {
                for (var x = 0; x < tessellation; x++) {
                    // Six indices (two triangles) per face.
                    var vbase = lineWidth * y + x;
                    indices[indexCount++] = (vbase + 1);
                    indices[indexCount++] = (vbase + 1 + lineWidth);
                    indices[indexCount++] = (vbase + lineWidth);
                    indices[indexCount++] = (vbase + 1);
                    indices[indexCount++] = (vbase + lineWidth);
                    indices[indexCount++] = (vbase);
                }
            }
            return {
                positions: positions,
                normals: normals,
                textureCoordinates: texCoords,
                indices: indices
            };
        }
        GeometricPrimitive.createPlane = createPlane;
        ;
    })(GeometricPrimitive = Zia.GeometricPrimitive || (Zia.GeometricPrimitive = {}));
})(Zia || (Zia = {}));


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
var Zia;
(function (Zia) {
    var GeometricPrimitive;
    (function (GeometricPrimitive) {
        /** Creates a sphere primitive. */
        function createSphere(diameter, tessellation) {
            if (diameter === void 0) { diameter = 1.0; }
            if (tessellation === void 0) { tessellation = 16; }
            if (tessellation < 3) {
                throw "tessellation must be >= 3";
            }
            var verticalSegments = tessellation;
            var horizontalSegments = tessellation * 2;
            var positions = new Array((verticalSegments + 1) * (horizontalSegments + 1));
            var normals = new Array((verticalSegments + 1) * (horizontalSegments + 1));
            var texCoords = new Array((verticalSegments + 1) * (horizontalSegments + 1));
            var indices = new Array((verticalSegments) * (horizontalSegments + 1) * 6);
            var radius = diameter / 2;
            // Create rings of vertices at progressively higher latitudes.
            var vertexCount = 0;
            for (var i = 0; i <= verticalSegments; i++) {
                var v = 1.0 - i / verticalSegments;
                var latitude = ((i * Math.PI / verticalSegments) - Math.PI / 2.0);
                var dy = Math.sin(latitude);
                var dxz = Math.cos(latitude);
                // Create a single ring of vertices at this latitude.
                for (var j = 0; j <= horizontalSegments; j++) {
                    var u = j / horizontalSegments;
                    var longitude = j * 2.0 * Math.PI / horizontalSegments;
                    var dx = Math.sin(longitude);
                    var dz = Math.cos(longitude);
                    dx *= dxz;
                    dz *= dxz;
                    var normal = new Zia.Vector3(dx, dy, dz);
                    var textureCoordinate = new Zia.Vector2(u, 1 - v);
                    positions[vertexCount] = normal.clone(new Zia.Vector3()).multiplyScalar(radius);
                    normals[vertexCount] = normal;
                    texCoords[vertexCount] = textureCoordinate;
                    vertexCount++;
                }
            }
            // Fill the index buffer with triangles joining each pair of latitude rings.
            var stride = horizontalSegments + 1;
            var indexCount = 0;
            for (var i = 0; i < verticalSegments; i++) {
                for (var j = 0; j <= horizontalSegments; j++) {
                    var nextI = i + 1;
                    var nextJ = (j + 1) % stride;
                    indices[indexCount++] = (i * stride + j);
                    indices[indexCount++] = (i * stride + nextJ);
                    indices[indexCount++] = (nextI * stride + j);
                    indices[indexCount++] = (i * stride + nextJ);
                    indices[indexCount++] = (nextI * stride + nextJ);
                    indices[indexCount++] = (nextI * stride + j);
                }
            }
            return {
                positions: positions,
                normals: normals,
                textureCoordinates: texCoords,
                indices: indices
            };
        }
        GeometricPrimitive.createSphere = createSphere;
        ;
    })(GeometricPrimitive = Zia.GeometricPrimitive || (Zia.GeometricPrimitive = {}));
})(Zia || (Zia = {}));


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
var Zia;
(function (Zia) {
    var GeometricPrimitive;
    (function (GeometricPrimitive) {
        // The teapot model consists of 10 bezier patches. Each patch has 16 control
        // points, plus a flag indicating whether it should be mirrored in the Z axis
        // as well as in X (all of the teapot is symmetrical from left to right, but
        // only some parts are symmetrical from front to back). The control points
        // are stored as integer indices into the TeapotControlPoints array.
        var TeapotPatch = (function () {
            function TeapotPatch(mirrorZ, indices) {
                this.mirrorZ = mirrorZ;
                this.indices = indices;
            }
            return TeapotPatch;
        })();
        // Static data array defines the bezier patches that make up the teapot.
        var teapotPatches = [
            // Rim.
            new TeapotPatch(true, [102, 103, 104, 105, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
            // Body.
            new TeapotPatch(true, [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]),
            new TeapotPatch(true, [24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]),
            // Lid.
            new TeapotPatch(true, [96, 96, 96, 96, 97, 98, 99, 100, 101, 101, 101, 101, 0, 1, 2, 3]),
            new TeapotPatch(true, [0, 1, 2, 3, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117]),
            // Handle.
            new TeapotPatch(false, [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56]),
            new TeapotPatch(false, [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 28, 65, 66, 67]),
            // Spout.
            new TeapotPatch(false, [68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83]),
            new TeapotPatch(false, [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95]),
            // Bottom.
            new TeapotPatch(true, [118, 118, 118, 118, 124, 122, 119, 121, 123, 126, 125, 120, 40, 39, 38, 37])
        ];
        // Static array deines the control point positions that make up the teapot.
        var teapotControlPoints = [
            new Zia.Vector3(0, 0.345, -0.05),
            new Zia.Vector3(-0.028, 0.345, -0.05),
            new Zia.Vector3(-0.05, 0.345, -0.028),
            new Zia.Vector3(-0.05, 0.345, -0),
            new Zia.Vector3(0, 0.3028125, -0.334375),
            new Zia.Vector3(-0.18725, 0.3028125, -0.334375),
            new Zia.Vector3(-0.334375, 0.3028125, -0.18725),
            new Zia.Vector3(-0.334375, 0.3028125, -0),
            new Zia.Vector3(0, 0.3028125, -0.359375),
            new Zia.Vector3(-0.20125, 0.3028125, -0.359375),
            new Zia.Vector3(-0.359375, 0.3028125, -0.20125),
            new Zia.Vector3(-0.359375, 0.3028125, -0),
            new Zia.Vector3(0, 0.27, -0.375),
            new Zia.Vector3(-0.21, 0.27, -0.375),
            new Zia.Vector3(-0.375, 0.27, -0.21),
            new Zia.Vector3(-0.375, 0.27, -0),
            new Zia.Vector3(0, 0.13875, -0.4375),
            new Zia.Vector3(-0.245, 0.13875, -0.4375),
            new Zia.Vector3(-0.4375, 0.13875, -0.245),
            new Zia.Vector3(-0.4375, 0.13875, -0),
            new Zia.Vector3(0, 0.007499993, -0.5),
            new Zia.Vector3(-0.28, 0.007499993, -0.5),
            new Zia.Vector3(-0.5, 0.007499993, -0.28),
            new Zia.Vector3(-0.5, 0.007499993, -0),
            new Zia.Vector3(0, -0.105, -0.5),
            new Zia.Vector3(-0.28, -0.105, -0.5),
            new Zia.Vector3(-0.5, -0.105, -0.28),
            new Zia.Vector3(-0.5, -0.105, -0),
            new Zia.Vector3(0, -0.105, 0.5),
            new Zia.Vector3(0, -0.2175, -0.5),
            new Zia.Vector3(-0.28, -0.2175, -0.5),
            new Zia.Vector3(-0.5, -0.2175, -0.28),
            new Zia.Vector3(-0.5, -0.2175, -0),
            new Zia.Vector3(0, -0.27375, -0.375),
            new Zia.Vector3(-0.21, -0.27375, -0.375),
            new Zia.Vector3(-0.375, -0.27375, -0.21),
            new Zia.Vector3(-0.375, -0.27375, -0),
            new Zia.Vector3(0, -0.2925, -0.375),
            new Zia.Vector3(-0.21, -0.2925, -0.375),
            new Zia.Vector3(-0.375, -0.2925, -0.21),
            new Zia.Vector3(-0.375, -0.2925, -0),
            new Zia.Vector3(0, 0.17625, 0.4),
            new Zia.Vector3(-0.075, 0.17625, 0.4),
            new Zia.Vector3(-0.075, 0.2325, 0.375),
            new Zia.Vector3(0, 0.2325, 0.375),
            new Zia.Vector3(0, 0.17625, 0.575),
            new Zia.Vector3(-0.075, 0.17625, 0.575),
            new Zia.Vector3(-0.075, 0.2325, 0.625),
            new Zia.Vector3(0, 0.2325, 0.625),
            new Zia.Vector3(0, 0.17625, 0.675),
            new Zia.Vector3(-0.075, 0.17625, 0.675),
            new Zia.Vector3(-0.075, 0.2325, 0.75),
            new Zia.Vector3(0, 0.2325, 0.75),
            new Zia.Vector3(0, 0.12, 0.675),
            new Zia.Vector3(-0.075, 0.12, 0.675),
            new Zia.Vector3(-0.075, 0.12, 0.75),
            new Zia.Vector3(0, 0.12, 0.75),
            new Zia.Vector3(0, 0.06375, 0.675),
            new Zia.Vector3(-0.075, 0.06375, 0.675),
            new Zia.Vector3(-0.075, 0.007499993, 0.75),
            new Zia.Vector3(0, 0.007499993, 0.75),
            new Zia.Vector3(0, -0.04875001, 0.625),
            new Zia.Vector3(-0.075, -0.04875001, 0.625),
            new Zia.Vector3(-0.075, -0.09562501, 0.6625),
            new Zia.Vector3(0, -0.09562501, 0.6625),
            new Zia.Vector3(-0.075, -0.105, 0.5),
            new Zia.Vector3(-0.075, -0.18, 0.475),
            new Zia.Vector3(0, -0.18, 0.475),
            new Zia.Vector3(0, 0.02624997, -0.425),
            new Zia.Vector3(-0.165, 0.02624997, -0.425),
            new Zia.Vector3(-0.165, -0.18, -0.425),
            new Zia.Vector3(0, -0.18, -0.425),
            new Zia.Vector3(0, 0.02624997, -0.65),
            new Zia.Vector3(-0.165, 0.02624997, -0.65),
            new Zia.Vector3(-0.165, -0.12375, -0.775),
            new Zia.Vector3(0, -0.12375, -0.775),
            new Zia.Vector3(0, 0.195, -0.575),
            new Zia.Vector3(-0.0625, 0.195, -0.575),
            new Zia.Vector3(-0.0625, 0.17625, -0.6),
            new Zia.Vector3(0, 0.17625, -0.6),
            new Zia.Vector3(0, 0.27, -0.675),
            new Zia.Vector3(-0.0625, 0.27, -0.675),
            new Zia.Vector3(-0.0625, 0.27, -0.825),
            new Zia.Vector3(0, 0.27, -0.825),
            new Zia.Vector3(0, 0.28875, -0.7),
            new Zia.Vector3(-0.0625, 0.28875, -0.7),
            new Zia.Vector3(-0.0625, 0.2934375, -0.88125),
            new Zia.Vector3(0, 0.2934375, -0.88125),
            new Zia.Vector3(0, 0.28875, -0.725),
            new Zia.Vector3(-0.0375, 0.28875, -0.725),
            new Zia.Vector3(-0.0375, 0.298125, -0.8625),
            new Zia.Vector3(0, 0.298125, -0.8625),
            new Zia.Vector3(0, 0.27, -0.7),
            new Zia.Vector3(-0.0375, 0.27, -0.7),
            new Zia.Vector3(-0.0375, 0.27, -0.8),
            new Zia.Vector3(0, 0.27, -0.8),
            new Zia.Vector3(0, 0.4575, -0),
            new Zia.Vector3(0, 0.4575, -0.2),
            new Zia.Vector3(-0.1125, 0.4575, -0.2),
            new Zia.Vector3(-0.2, 0.4575, -0.1125),
            new Zia.Vector3(-0.2, 0.4575, -0),
            new Zia.Vector3(0, 0.3825, -0),
            new Zia.Vector3(0, 0.27, -0.35),
            new Zia.Vector3(-0.196, 0.27, -0.35),
            new Zia.Vector3(-0.35, 0.27, -0.196),
            new Zia.Vector3(-0.35, 0.27, -0),
            new Zia.Vector3(0, 0.3075, -0.1),
            new Zia.Vector3(-0.056, 0.3075, -0.1),
            new Zia.Vector3(-0.1, 0.3075, -0.056),
            new Zia.Vector3(-0.1, 0.3075, -0),
            new Zia.Vector3(0, 0.3075, -0.325),
            new Zia.Vector3(-0.182, 0.3075, -0.325),
            new Zia.Vector3(-0.325, 0.3075, -0.182),
            new Zia.Vector3(-0.325, 0.3075, -0),
            new Zia.Vector3(0, 0.27, -0.325),
            new Zia.Vector3(-0.182, 0.27, -0.325),
            new Zia.Vector3(-0.325, 0.27, -0.182),
            new Zia.Vector3(-0.325, 0.27, -0),
            new Zia.Vector3(0, -0.33, -0),
            new Zia.Vector3(-0.1995, -0.33, -0.35625),
            new Zia.Vector3(0, -0.31125, -0.375),
            new Zia.Vector3(0, -0.33, -0.35625),
            new Zia.Vector3(-0.35625, -0.33, -0.1995),
            new Zia.Vector3(-0.375, -0.31125, -0),
            new Zia.Vector3(-0.35625, -0.33, -0),
            new Zia.Vector3(-0.21, -0.31125, -0.375),
            new Zia.Vector3(-0.375, -0.31125, -0.21)
        ];
        // Creates indices for a patch that is tessellated at the specified level.
        // Calls the specified outputIndex function for each generated index value.
        function createPatchIndices(tessellation, isMirrored, baseIndex) {
            var stride = tessellation + 1;
            // Make a list of six index values (two triangles).
            var indices = new Array(6);
            var result = [];
            for (var i = 0; i < tessellation; i++) {
                for (var j = 0; j < tessellation; j++) {
                    indices[0] = baseIndex + i * stride + j;
                    indices[2] = baseIndex + (i + 1) * stride + j;
                    indices[1] = baseIndex + (i + 1) * stride + j + 1;
                    indices[3] = baseIndex + i * stride + j;
                    indices[5] = baseIndex + (i + 1) * stride + j + 1;
                    indices[4] = baseIndex + i * stride + j + 1;
                    // If this patch is mirrored, reverse indices to fix the winding order.
                    if (isMirrored) {
                        indices.reverse();
                    }
                    for (var k = 0; k < indices.length; k++) {
                        result.push(indices[k]);
                    }
                }
            }
            return result;
        }
        // Performs a cubic bezier interpolation between four control points,
        // returning the value at the specified time (t ranges 0 to 1).
        // This template implementation can be used to interpolate Zia.Vector3,
        // float, or any other types that define suitable * and + operators.
        var cubicInterpolateTemp1 = new Zia.Vector3();
        var cubicInterpolateTemp2 = new Zia.Vector3();
        var cubicInterpolateTemp3 = new Zia.Vector3();
        var cubicInterpolateTemp4 = new Zia.Vector3();
        function cubicInterpolate(p1, p2, p3, p4, t) {
            var t2 = t * t;
            var onet2 = (1 - t) * (1 - t);
            // return p1*(1 - t)*onet2 +
            //        p2*3*t*onet2 +
            //        p3*3*t2*(1 - t) +
            //        p4*t*t2;
            cubicInterpolateTemp1.set(p1.x, p1.y, p1.z).multiplyScalar((1 - t) * onet2);
            cubicInterpolateTemp2.set(p2.x, p2.y, p2.z).multiplyScalar(3 * t * onet2);
            cubicInterpolateTemp3.set(p3.x, p3.y, p3.z).multiplyScalar(3 * t2 * (1 - t));
            cubicInterpolateTemp4.set(p4.x, p4.y, p4.z).multiplyScalar(t * t2);
            return cubicInterpolateTemp1.clone(new Zia.Vector3()).
                add(cubicInterpolateTemp2).
                add(cubicInterpolateTemp3).
                add(cubicInterpolateTemp4);
        }
        // Computes the tangent of a cubic bezier curve at the specified time.
        // Template supports Zia.Vector3, float, or any other types with * and + operators.
        var cubicTangentTemp1 = new Zia.Vector3();
        var cubicTangentTemp2 = new Zia.Vector3();
        var cubicTangentTemp3 = new Zia.Vector3();
        var cubicTangentTemp4 = new Zia.Vector3();
        function cubicTangent(p1, p2, p3, p4, t) {
            var t2 = t * t;
            // return p1*(-1 + 2*t - t2) +
            //        p2*(1 - 4*t + 3*t2) +
            //        p3*(2*t - 3*t2) +
            //        p4*(t2);
            cubicTangentTemp1.set(p1.x, p1.y, p1.z).multiplyScalar(-1 + 2 * t - t2);
            cubicTangentTemp2.set(p2.x, p2.y, p2.z).multiplyScalar(1 - 4 * t + 3 * t2);
            cubicTangentTemp3.set(p3.x, p3.y, p3.z).multiplyScalar(2 * t - 3 * t2);
            cubicTangentTemp4.set(p4.x, p4.y, p4.z).multiplyScalar(t2);
            return cubicTangentTemp1.clone(new Zia.Vector3()).
                add(cubicTangentTemp2).
                add(cubicTangentTemp3).
                add(cubicTangentTemp4);
        }
        // Creates vertices for a patch that is tessellated at the specified level.
        // Calls the specified outputVertex function for each generated vertex,
        // passing the position, normal, and texture coordinate as parameters.
        function createPatchVertices(patch, tessellation, isMirrored, positions, normals, textureCoordinates) {
            for (var i = 0; i <= tessellation; i++) {
                var u = i / tessellation;
                for (var j = 0; j <= tessellation; j++) {
                    var v = j / tessellation;
                    // Perform four horizontal bezier interpolations
                    // between the control points of this patch.
                    var p1 = cubicInterpolate(patch[0], patch[1], patch[2], patch[3], u);
                    var p2 = cubicInterpolate(patch[4], patch[5], patch[6], patch[7], u);
                    var p3 = cubicInterpolate(patch[8], patch[9], patch[10], patch[11], u);
                    var p4 = cubicInterpolate(patch[12], patch[13], patch[14], patch[15], u);
                    // Perform a vertical interpolation between the results of the
                    // previous horizontal interpolations, to compute the position.
                    var position = cubicInterpolate(p1, p2, p3, p4, v);
                    // Perform another four bezier interpolations between the control
                    // points, but this time vertically rather than horizontally.
                    var q1 = cubicInterpolate(patch[0], patch[4], patch[8], patch[12], v);
                    var q2 = cubicInterpolate(patch[1], patch[5], patch[9], patch[13], v);
                    var q3 = cubicInterpolate(patch[2], patch[6], patch[10], patch[14], v);
                    var q4 = cubicInterpolate(patch[3], patch[7], patch[11], patch[15], v);
                    // Compute vertical and horizontal tangent vectors.
                    var tangent1 = cubicTangent(p1, p2, p3, p4, v);
                    var tangent2 = cubicTangent(q1, q2, q3, q4, u);
                    // Cross the two tangent vectors to compute the normal.
                    var normal = new Zia.Vector3().crossVectors(tangent1, tangent2);
                    if (!normal.nearEqual(new Zia.Vector3(), new Zia.Vector3(1e-7))) {
                        normal.normalize();
                        // If this patch is mirrored, we must invert the normal.
                        if (isMirrored) {
                            normal.negate();
                        }
                    }
                    else {
                        // In a tidy and well constructed bezier patch, the preceding
                        // normal computation will always work. But the classic teapot
                        // model is not tidy or well constructed! At the top and bottom
                        // of the teapot, it contains degenerate geometry where a patch
                        // has several control points in the same place, which causes
                        // the tangent computation to fail and produce a zero normal.
                        // We 'fix' these cases by just hard-coding a normal that points
                        // either straight up or straight down, depending on whether we
                        // are on the top or bottom of the teapot. This is not a robust
                        // solution for all possible degenerate bezier patches, but hey,
                        // it's good enough to make the teapot work correctly!
                        normal.x = 0.0;
                        normal.y = position.y < 0.0 ? -1.0 : 1.0;
                        normal.z = 0.0;
                    }
                    // Compute the texture coordinate.
                    var mirroredU = isMirrored ? 1 - u : u;
                    var textureCoordinate = new Zia.Vector2(mirroredU, 1 - v);
                    // Output this vertex.
                    positions.push(position);
                    normals.push(normal);
                    textureCoordinates.push(textureCoordinate);
                }
            }
        }
        // Tessellates the specified bezier patch.
        function tessellatePatch(positions, normals, textureCoordinates, indices, patch, tessellation, scale, isMirrored) {
            // Look up the 16 control points for this patch.
            var controlPoints = new Array(16);
            for (var i = 0; i < 16; i++) {
                controlPoints[i] = teapotControlPoints[patch.indices[i]].clone(new Zia.Vector3()).multiply(scale);
            }
            // Create the index data.
            var vbase = positions.length;
            Array.prototype.push.apply(indices, createPatchIndices(tessellation, isMirrored, vbase));
            createPatchVertices(controlPoints, tessellation, isMirrored, positions, normals, textureCoordinates);
        }
        /** Creates a teapot primitive. */
        function createTeapot(size, tessellation) {
            if (size === void 0) { size = 1.0; }
            if (tessellation === void 0) { tessellation = 8; }
            if (tessellation < 1) {
                throw "tessellation must be > 0";
            }
            var positions = [];
            var normals = [];
            var textureCoordinates = [];
            var indices = [];
            var scaleVector = new Zia.Vector3(size, size, size);
            var scaleNegateX = scaleVector.clone(new Zia.Vector3());
            scaleNegateX.x = -scaleNegateX.x;
            var scaleNegateZ = scaleVector.clone(new Zia.Vector3());
            scaleNegateZ.z = -scaleNegateZ.z;
            var scaleNegateXZ = new Zia.Vector3(-size, size, -size);
            for (var i = 0; i < teapotPatches.length; i++) {
                var patch = teapotPatches[i];
                // Because the teapot is symmetrical from left to right, we only store
                // data for one side, then tessellate each patch twice, mirroring in X.
                tessellatePatch(positions, normals, textureCoordinates, indices, patch, tessellation, scaleVector, false);
                tessellatePatch(positions, normals, textureCoordinates, indices, patch, tessellation, scaleNegateX, true);
                if (patch.mirrorZ) {
                    // Some parts of the teapot (the body, lid, and rim, but not the
                    // handle or spout) are also symmetrical from front to back, so
                    // we tessellate them four times, mirroring in Z as well as X.
                    tessellatePatch(positions, normals, textureCoordinates, indices, patch, tessellation, scaleNegateZ, true);
                    tessellatePatch(positions, normals, textureCoordinates, indices, patch, tessellation, scaleNegateXZ, false);
                }
            }
            return {
                positions: positions,
                normals: normals,
                textureCoordinates: textureCoordinates,
                indices: indices
            };
        }
        GeometricPrimitive.createTeapot = createTeapot;
        ;
    })(GeometricPrimitive = Zia.GeometricPrimitive || (Zia.GeometricPrimitive = {}));
})(Zia || (Zia = {}));


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
var Zia;
(function (Zia) {
    var GeometricPrimitive;
    (function (GeometricPrimitive) {
        /** Creates a torus primitive. */
        function createTorus(diameter, thickness, tessellation) {
            if (diameter === void 0) { diameter = 1.0; }
            if (thickness === void 0) { thickness = 0.33; }
            if (tessellation === void 0) { tessellation = 32; }
            if (tessellation < 3) {
                throw "tessellation parameter out of range";
            }
            var positions = [];
            var normals = [];
            var textureCoordinates = [];
            var indices = [];
            var stride = tessellation + 1;
            var translateTransform = Zia.Matrix4.createTranslation(new Zia.Vector3(diameter / 2, 0, 0), new Zia.Matrix4());
            var transform = new Zia.Matrix4();
            // First we loop around the main ring of the torus.
            for (var i = 0; i <= tessellation; i++) {
                var u = i / tessellation;
                var outerAngle = i * Zia.MathUtil.TWO_PI / tessellation - Zia.MathUtil.PI_OVER_TWO;
                // Create a transform matrix that will align geometry to
                // slice perpendicularly though the current ring position.
                Zia.Matrix4.createRotationY(outerAngle, transform).multiply(translateTransform);
                // Now we loop along the other axis, around the side of the tube.
                for (var j = 0; j <= tessellation; j++) {
                    var v = 1 - j / tessellation;
                    var innerAngle = j * Zia.MathUtil.TWO_PI / tessellation + Math.PI;
                    var dx = Math.cos(innerAngle), dy = Math.sin(innerAngle);
                    // Create a vertex.
                    var normal = new Zia.Vector3(dx, dy, 0);
                    var position = normal.clone(new Zia.Vector3()).multiplyScalar(thickness / 2);
                    var textureCoordinate = new Zia.Vector2(u, 1 - v);
                    position.applyMatrix4(transform);
                    normal.transformDirection(transform);
                    positions.push(position);
                    normals.push(normal);
                    textureCoordinates.push(textureCoordinate);
                    // And create indices for two triangles.
                    var nextI = (i + 1) % stride;
                    var nextJ = (j + 1) % stride;
                    indices.push(i * stride + j);
                    indices.push(nextI * stride + j);
                    indices.push(i * stride + nextJ);
                    indices.push(i * stride + nextJ);
                    indices.push(nextI * stride + j);
                    indices.push(nextI * stride + nextJ);
                }
            }
            return {
                positions: positions,
                normals: normals,
                textureCoordinates: textureCoordinates,
                indices: indices
            };
        }
        GeometricPrimitive.createTorus = createTorus;
        ;
    })(GeometricPrimitive = Zia.GeometricPrimitive || (Zia.GeometricPrimitive = {}));
})(Zia || (Zia = {}));


var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Zia;
(function (Zia) {
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
        result.push("uniform vec3 uEmissiveColor;");
        result.push("uniform vec3 uSpecularColor;");
        result.push("uniform float uSpecularPower;");
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
            if (options.perPixelLightingEnabled) {
                result.push("varying vec3 vPositionWS;");
                result.push("varying vec3 vNormalWS;");
            }
            else {
                result.push("varying vec3 vSpecularColor;");
                addLighting(result);
                result.push(Zia.SharedProgramCode.lightingVertex);
            }
        }
        if (options.textureEnabled) {
            result.push("varying vec2 vTextureCoord;");
        }
        // Code
        result.push("void main(void) {");
        result.push("  gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);");
        if (options.lightingEnabled) {
            if (options.perPixelLightingEnabled) {
                result.push("  vDiffuseColor = vec4(1, 1, 1, uDiffuseColor.a);");
                result.push("  vPositionWS = (uMMatrix * vec4(aVertexPosition, 1.0)).xyz;");
                result.push("  vNormalWS = normalize(uMMatrixInverseTranspose * aVertexNormal);");
            }
            else {
                result.push("  ComputeCommonVSOutputWithLighting(vec4(aVertexPosition, 1.0), aVertexNormal);");
            }
        }
        else {
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
            if (options.perPixelLightingEnabled) {
                result.push("uniform vec4 uDiffuseColor;");
                result.push("varying vec3 vPositionWS;");
                result.push("varying vec3 vNormalWS;");
                addLighting(result);
            }
            else {
                result.push("varying vec3 vSpecularColor;");
            }
        }
        result.push(Zia.SharedProgramCode.common);
        result.push("void main(void) {");
        result.push("  vec4 color = vDiffuseColor;");
        if (options.textureEnabled) {
            result.push("  color *= texture2D(uSampler, vTextureCoord);");
        }
        if (options.lightingEnabled) {
            if (options.perPixelLightingEnabled) {
                result.push("  vec3 eyeVector = normalize(uEyePosition - vPositionWS);");
                result.push("  vec3 worldNormal = normalize(vNormalWS);");
                result.push("  ColorPair lightResult = ComputeLights(eyeVector, worldNormal);");
                result.push("  color.rgb *= lightResult.Diffuse;");
                result.push("  AddSpecular(color, lightResult.Specular);");
            }
            else {
                result.push("  AddSpecular(color, vSpecularColor.rgb);");
            }
        }
        result.push("  gl_FragColor = color;");
        result.push("}");
        return result.join('\n');
    }
    /**
     * A basic rendering effect with support for lighting and a single texture.
     */
    var BasicProgram = (function (_super) {
        __extends(BasicProgram, _super);
        /**
         * Constructs a new `BasicProgram`.
         *
         * @param {Zia.GraphicsDevice} graphicsDevice - The graphics device.
         * @param {Boolean} [options.lightingEnabled=false] - Should lighting be enabled?
         * @param {Boolean} [options.perPixelLightingEnabled=true] - Should per-pixel (as opposed to per-vertex) lighting be enabled?.
         * @param {Boolean} [options.textureEnabled=false] - Should textures be enabled?
         * @param {Boolean} [options.vertexColorEnabled=false] - Will you be using vertices that contain a color component?
         */
        function BasicProgram(graphicsDevice, options) {
            this._dirtyFlags = -1 /* All */;
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
                perPixelLightingEnabled: true,
                textureEnabled: false,
                vertexColorEnabled: false
            });
            this._options = options;
            var vertexShader = new Zia.VertexShader(graphicsDevice, buildVertexShader(options));
            var fragmentShader = new Zia.FragmentShader(graphicsDevice, buildFragmentShader(options));
            _super.call(this, graphicsDevice, vertexShader, fragmentShader);
        }
        Object.defineProperty(BasicProgram.prototype, "modelMatrix", {
            get: function () {
                return this._modelMatrix;
            },
            set: function (v) {
                this._modelMatrix = v;
                this._dirtyFlags |= 2 /* Model */ | 1 /* ModelViewProj */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgram.prototype, "viewMatrix", {
            get: function () {
                return this._viewMatrix;
            },
            set: function (v) {
                this._viewMatrix = v;
                this._dirtyFlags |= 1 /* ModelViewProj */ | 4 /* EyePosition */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgram.prototype, "projectionMatrix", {
            get: function () {
                return this._projectionMatrix;
            },
            set: function (v) {
                this._projectionMatrix = v;
                this._dirtyFlags |= 1 /* ModelViewProj */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgram.prototype, "diffuseColor", {
            get: function () {
                return this._diffuseColor;
            },
            set: function (v) {
                this._diffuseColor = v;
                this._dirtyFlags |= 8 /* MaterialColor */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgram.prototype, "emissiveColor", {
            get: function () {
                return this._emissiveColor;
            },
            set: function (v) {
                this._emissiveColor = v;
                this._dirtyFlags |= 8 /* MaterialColor */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgram.prototype, "specularColor", {
            get: function () {
                return this._specularColor;
            },
            set: function (v) {
                this._specularColor = v;
                this._dirtyFlags |= 16 /* SpecularColor */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgram.prototype, "specularPower", {
            get: function () {
                return this._specularPower;
            },
            set: function (v) {
                this._specularPower = v;
                this._dirtyFlags |= 32 /* SpecularPower */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgram.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (v) {
                this._alpha = v;
                this._dirtyFlags |= 8 /* MaterialColor */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgram.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            set: function (v) {
                this._texture = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgram.prototype, "ambientLightColor", {
            get: function () {
                return this._ambientLightColor;
            },
            set: function (v) {
                this._ambientLightColor = v;
                this._dirtyFlags |= 8 /* MaterialColor */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgram.prototype, "directionalLight0", {
            get: function () {
                return this._directionalLight0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgram.prototype, "directionalLight1", {
            get: function () {
                return this._directionalLight1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicProgram.prototype, "directionalLight2", {
            get: function () {
                return this._directionalLight2;
            },
            enumerable: true,
            configurable: true
        });
        BasicProgram.prototype.enableDefaultLighting = function () {
            if (!this._options.lightingEnabled) {
                throw "Lighting must be enabled when creating this program.";
            }
            this.ambientLightColor = Zia.ProgramUtil.enableDefaultLighting(this._directionalLight0, this._directionalLight1, this._directionalLight2);
        };
        BasicProgram.prototype._onApply = function () {
            // Recompute the model+view+projection matrix?
            this._dirtyFlags = Zia.ProgramUtil.setModelViewProj(this, this._dirtyFlags, this._modelMatrix, this._viewMatrix, this._projectionMatrix, this._modelView);
            // Recompute the diffuse/emissive/alpha material color parameters?
            if ((this._dirtyFlags & 8 /* MaterialColor */) != 0) {
                Zia.ProgramUtil.setMaterialColor(this, this._options.lightingEnabled, this._alpha, this._diffuseColor, this._emissiveColor, this._ambientLightColor);
                this._dirtyFlags &= ~8 /* MaterialColor */;
            }
            if ((this._dirtyFlags & 16 /* SpecularColor */) != 0) {
                this.setUniform('uSpecularColor', this._specularColor);
                this._dirtyFlags &= ~16 /* SpecularColor */;
            }
            if ((this._dirtyFlags & 32 /* SpecularPower */) != 0) {
                this.setUniform('uSpecularPower', this._specularPower);
                this._dirtyFlags &= ~32 /* SpecularPower */;
            }
            if (this._options.lightingEnabled) {
                // Recompute the world inverse transpose and eye position?
                this._dirtyFlags = Zia.ProgramUtil.setLightingMatrices(this, this._dirtyFlags, this._modelMatrix, this._viewMatrix);
            }
            this.setUniform('uSampler', this._texture);
            this._directionalLight0._apply();
            this._directionalLight1._apply();
            this._directionalLight2._apply();
        };
        return BasicProgram;
    })(Zia.Program);
    Zia.BasicProgram = BasicProgram;
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    /**
     * A directional light structure, used by several of the built-in `Program` classes.
     */
    var DirectionalLight = (function () {
        /**
         * Constructs a new `DirectionalLight`.
         *
         * @param {Zia.Program} program - The associated program.
         * @param {Number} index - The index of this light (used to set uniforms correctly).
         */
        function DirectionalLight(program, index) {
            this._program = program;
            this._index = index;
            this.direction = new Zia.Vector3();
            this.diffuseColor = new Zia.Vector3();
            this.specularColor = new Zia.Vector3();
            this.enabled = false;
        }
        Object.defineProperty(DirectionalLight.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            set: function (v) {
                this._direction = v;
                this._directionChanged = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DirectionalLight.prototype, "diffuseColor", {
            get: function () {
                return this._diffuseColor;
            },
            set: function (v) {
                this._diffuseColor = v;
                this._diffuseColorChanged = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DirectionalLight.prototype, "specularColor", {
            get: function () {
                return this._specularColor;
            },
            set: function (v) {
                this._specularColor = v;
                this._specularColorChanged = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DirectionalLight.prototype, "enabled", {
            get: function () {
                return this._enabled;
            },
            set: function (v) {
                this._enabled = v;
                this._enabledChanged = true;
            },
            enumerable: true,
            configurable: true
        });
        DirectionalLight.prototype._apply = function () {
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
                    this._setUniform("DiffuseColor", DirectionalLight._zero);
                    this._setUniform("SpecularColor", DirectionalLight._zero);
                }
                this._enabledChanged = false;
            }
        };
        DirectionalLight.prototype._setUniform = function (name, value) {
            this._program.setUniform("uDirLight" + this._index + name, value);
        };
        DirectionalLight._zero = new Zia.Vector3();
        return DirectionalLight;
    })();
    Zia.DirectionalLight = DirectionalLight;
})(Zia || (Zia = {}));


var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Zia;
(function (Zia) {
    function addLighting(result) {
        result.push("uniform vec3 uDirLight0Direction;");
        result.push("uniform vec3 uDirLight0DiffuseColor;");
        result.push("#define uDirLight0SpecularColor vec3(0,0,0)");
        result.push("uniform vec3 uDirLight1Direction;");
        result.push("uniform vec3 uDirLight1DiffuseColor;");
        result.push("#define uDirLight1SpecularColor vec3(0,0,0)");
        result.push("uniform vec3 uDirLight2Direction;");
        result.push("uniform vec3 uDirLight2DiffuseColor;");
        result.push("#define uDirLight2SpecularColor vec3(0,0,0)");
        result.push("uniform vec3 uEyePosition;");
        result.push("uniform vec3 uEmissiveColor;");
        result.push("#define uSpecularColor vec3(0,0,0)");
        result.push("#define uSpecularPower 0");
        result.push(Zia.SharedProgramCode.lighting);
    }
    function buildVertexShader(options) {
        var result = [];
        result.push("precision mediump float;");
        // Attributes
        result.push("attribute vec3 aVertexPosition;");
        result.push("attribute vec3 aVertexNormal;");
        result.push("attribute vec2 aTextureCoord;");
        // Uniforms
        result.push("uniform mat4 uMVPMatrix;");
        result.push("uniform mat4 uMMatrix;");
        result.push("uniform mat3 uMMatrixInverseTranspose;");
        result.push("uniform vec4 uDiffuseColor;");
        result.push("uniform float uEnvironmentMapAmount;");
        result.push("uniform float uFresnelFactor;");
        result.push("uniform vec3 uDirLight0Direction;");
        result.push("uniform vec3 uDirLight0DiffuseColor;");
        result.push("#define uDirLight0SpecularColor vec3(0,0,0)");
        result.push("uniform vec3 uDirLight1Direction;");
        result.push("uniform vec3 uDirLight1DiffuseColor;");
        result.push("#define uDirLight1SpecularColor vec3(0,0,0)");
        result.push("uniform vec3 uDirLight2Direction;");
        result.push("uniform vec3 uDirLight2DiffuseColor;");
        result.push("#define uDirLight2SpecularColor vec3(0,0,0)");
        result.push("uniform vec3 uEyePosition;");
        result.push("uniform vec3 uEmissiveColor;");
        result.push("#define uSpecularColor vec3(0,0,0)");
        result.push("#define uSpecularPower 0");
        result.push(Zia.SharedProgramCode.lighting);
        // Varyings
        result.push("varying vec4 vDiffuseColor;");
        result.push("varying vec3 vSpecularColor;");
        result.push("varying vec2 vTextureCoord;");
        result.push("varying vec3 vEnvCoord;");
        // Code
        result.push("float ComputeFresnelFactor(vec3 eyeVector, vec3 worldNormal) {");
        result.push("  float viewAngle = dot(eyeVector, worldNormal);");
        result.push("  return pow(max(1.0 - abs(viewAngle), 0.0), uFresnelFactor) * uEnvironmentMapAmount;");
        result.push("}");
        result.push("void main(void) {");
        result.push("  gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);");
        result.push("  vec4 positionWS = uMMatrix * vec4(aVertexPosition, 1.0);");
        result.push("  vec3 eyeVector = normalize(uEyePosition - positionWS.xyz);");
        result.push("  vec3 worldNormal = normalize(uMMatrixInverseTranspose * aVertexNormal);");
        result.push("  ColorPair lightResult = ComputeLights(eyeVector, worldNormal);");
        result.push("  vDiffuseColor = vec4(lightResult.Diffuse, uDiffuseColor.a);");
        if (options.fresnelEnabled) {
            result.push("  vSpecularColor.rgb = vec3(ComputeFresnelFactor(eyeVector, worldNormal));");
        }
        else {
            result.push("  vSpecularColor.rgb = vec3(uEnvironmentMapAmount);");
        }
        result.push("  vTextureCoord = aTextureCoord;");
        result.push("  vEnvCoord = reflect(-eyeVector, worldNormal);");
        result.push("}");
        return result.join('\n');
    }
    function buildFragmentShader(options) {
        var result = [];
        result.push("precision mediump float;");
        result.push("varying vec4 vDiffuseColor;");
        result.push("varying vec3 vSpecularColor;");
        result.push("varying vec2 vTextureCoord;");
        result.push("uniform sampler2D uSampler;");
        result.push("varying vec3 vEnvCoord;");
        result.push("uniform samplerCube uEnvironmentMapSampler;");
        result.push("uniform vec3 uEnvironmentMapSpecular;");
        result.push("void main(void) {");
        result.push("  vec4 color = vDiffuseColor;");
        result.push("  color *= texture2D(uSampler, vTextureCoord);");
        result.push("  vec4 envmap = textureCube(uEnvironmentMapSampler, vEnvCoord) * color.a;");
        result.push("  color.rgb = mix(color.rgb, envmap.rgb, vSpecularColor.rgb);");
        if (options.environmentMapSpecularEnabled) {
            result.push("  color.rgb += uEnvironmentMapSpecular * envmap.a;");
        }
        result.push("  gl_FragColor = color;");
        result.push("}");
        return result.join('\n');
    }
    /**
     * A rendering effect with support for an environment map cube texture.
     */
    var EnvironmentMapProgram = (function (_super) {
        __extends(EnvironmentMapProgram, _super);
        /**
         * Constructs a new `EnvironmentMapProgram`.
         *
         * @param {Zia.GraphicsDevice} graphicsDevice - The graphics device.
         * @param {Object} [options] - TODO
         */
        function EnvironmentMapProgram(graphicsDevice, options) {
            this._dirtyFlags = -1 /* All */;
            this.modelMatrix = new Zia.Matrix4();
            this.viewMatrix = new Zia.Matrix4();
            this.projectionMatrix = new Zia.Matrix4();
            this._modelView = new Zia.Matrix4();
            this.diffuseColor = new Zia.Vector3(1, 1, 1);
            this.emissiveColor = new Zia.Vector3();
            this.alpha = 1;
            this.texture = null;
            this.ambientLightColor = new Zia.Vector3();
            this._environmentMap = null;
            this.environmentMapAmount = 1;
            this.environmentMapSpecular = new Zia.Vector3();
            this.fresnelFactor = 1;
            this._directionalLight0 = new Zia.DirectionalLight(this, 0);
            this._directionalLight1 = new Zia.DirectionalLight(this, 1);
            this._directionalLight2 = new Zia.DirectionalLight(this, 2);
            this._directionalLight0.enabled = true;
            options = Zia.ObjectUtil.reverseMerge(options || {}, {
                environmentMapSpecularEnabled: false,
                fresnelEnabled: true
            });
            this._options = options;
            var vertexShader = new Zia.VertexShader(graphicsDevice, buildVertexShader(options));
            var fragmentShader = new Zia.FragmentShader(graphicsDevice, buildFragmentShader(options));
            _super.call(this, graphicsDevice, vertexShader, fragmentShader);
        }
        Object.defineProperty(EnvironmentMapProgram.prototype, "modelMatrix", {
            get: function () { return this._modelMatrix; },
            set: function (v) {
                this._modelMatrix = v;
                this._dirtyFlags |= 2 /* Model */ | 1 /* ModelViewProj */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "viewMatrix", {
            get: function () { return this._viewMatrix; },
            set: function (v) {
                this._viewMatrix = v;
                this._dirtyFlags |= 1 /* ModelViewProj */ | 4 /* EyePosition */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "projectionMatrix", {
            get: function () { return this._projectionMatrix; },
            set: function (v) {
                this._projectionMatrix = v;
                this._dirtyFlags |= 1 /* ModelViewProj */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "diffuseColor", {
            get: function () { return this._diffuseColor; },
            set: function (v) {
                this._diffuseColor = v;
                this._dirtyFlags |= 8 /* MaterialColor */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "emissiveColor", {
            get: function () { return this._emissiveColor; },
            set: function (v) {
                this._emissiveColor = v;
                this._dirtyFlags |= 8 /* MaterialColor */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "alpha", {
            get: function () { return this._alpha; },
            set: function (v) {
                this._alpha = v;
                this._dirtyFlags |= 8 /* MaterialColor */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "ambientLightColor", {
            get: function () { return this._ambientLightColor; },
            set: function (v) {
                this._ambientLightColor = v;
                this._dirtyFlags |= 8 /* MaterialColor */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "directionalLight0", {
            get: function () { return this._directionalLight0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "directionalLight1", {
            get: function () { return this._directionalLight1; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "directionalLight2", {
            get: function () { return this._directionalLight2; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "texture", {
            get: function () { return this._texture; },
            set: function (v) { this._texture = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "environmentMap", {
            get: function () { return this._environmentMap; },
            set: function (v) { this._environmentMap = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "environmentMapAmount", {
            get: function () { return this._environmentMapAmount; },
            set: function (v) {
                this._environmentMapAmount = v;
                this._dirtyFlags |= 64 /* EnvironmentMapAmount */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "environmentMapSpecular", {
            get: function () { return this._environmentMapSpecular; },
            set: function (v) {
                this._environmentMapSpecular = v;
                this._dirtyFlags |= 128 /* EnvironmentMapSpecular */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "fresnelFactor", {
            get: function () { return this._fresnelFactor; },
            set: function (v) {
                this._fresnelFactor = v;
                this._dirtyFlags |= 256 /* FresnelFactor */;
            },
            enumerable: true,
            configurable: true
        });
        EnvironmentMapProgram.prototype.enableDefaultLighting = function () {
            this.ambientLightColor = Zia.ProgramUtil.enableDefaultLighting(this._directionalLight0, this._directionalLight1, this._directionalLight2);
        };
        EnvironmentMapProgram.prototype._onApply = function () {
            // Recompute the model+view+projection matrix?
            this._dirtyFlags = Zia.ProgramUtil.setModelViewProj(this, this._dirtyFlags, this._modelMatrix, this._viewMatrix, this._projectionMatrix, this._modelView);
            // Recompute the diffuse/emissive/alpha material color parameters?
            if ((this._dirtyFlags & 8 /* MaterialColor */) != 0) {
                Zia.ProgramUtil.setMaterialColor(this, this._options.lightingEnabled, this._alpha, this._diffuseColor, this._emissiveColor, this._ambientLightColor);
                this._dirtyFlags &= ~8 /* MaterialColor */;
            }
            this.setUniform('uSampler', this._texture);
            this.setUniform('uEnvironmentMapSampler', this._environmentMap);
            if ((this._dirtyFlags & 64 /* EnvironmentMapAmount */) != 0) {
                this.setUniform('uEnvironmentMapAmount', this._environmentMapAmount);
                this._dirtyFlags &= ~64 /* EnvironmentMapAmount */;
            }
            if ((this._dirtyFlags & 128 /* EnvironmentMapSpecular */) != 0) {
                this.setUniform('uEnvironmentMapSpecular', this._environmentMapSpecular);
                this._dirtyFlags &= ~128 /* EnvironmentMapSpecular */;
            }
            if ((this._dirtyFlags & 256 /* FresnelFactor */) != 0) {
                this.setUniform('uFresnelFactor', this._fresnelFactor);
                this._dirtyFlags &= ~256 /* FresnelFactor */;
            }
            // Recompute the world inverse transpose and eye position?
            this._dirtyFlags = Zia.ProgramUtil.setLightingMatrices(this, this._dirtyFlags, this._modelMatrix, this._viewMatrix);
            this._directionalLight0._apply();
            this._directionalLight1._apply();
            this._directionalLight2._apply();
        };
        return EnvironmentMapProgram;
    })(Zia.Program);
    Zia.EnvironmentMapProgram = EnvironmentMapProgram;
})(Zia || (Zia = {}));


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
var Zia;
(function (Zia) {
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
        ].join('\n'),
        lightingVertex: [
            "void ComputeCommonVSOutputWithLighting(vec4 position, vec3 normal) {",
            "  vec4 positionWS = uMMatrix * position;",
            "  vec3 eyeVector = normalize(uEyePosition - positionWS.xyz);",
            "  vec3 worldNormal = normalize(uMMatrixInverseTranspose * normal);",
            "  ColorPair lightResult = ComputeLights(eyeVector, worldNormal);",
            "  vDiffuseColor = vec4(lightResult.Diffuse, uDiffuseColor.a);",
            "  vSpecularColor = lightResult.Specular;",
            "}"
        ].join('\n')
    };
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
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
            return WebGLDebugUtils.makeDebugContext(gl, throwOnGLError, validateNoneOfTheArgsAreUndefined);
        }
    };
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    Zia.EnumUtil = {
        hasFlag: function (value, flag) {
            return (value & flag) === flag;
        }
    };
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
    Zia.HtmlUtil = {
        toggleFullScreen: function (element) {
            if (element === void 0) { element = document.documentElement; }
            if (!document.fullscreenElement &&
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement &&
                !document.msFullscreenElement) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                }
                else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
                else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                }
                else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            }
            else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }
    };
})(Zia || (Zia = {}));


var Zia;
(function (Zia) {
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
})(Zia || (Zia = {}));
