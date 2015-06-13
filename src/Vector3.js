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
