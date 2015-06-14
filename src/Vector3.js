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
    var Vector3 = (function () {
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
            var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
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
            var ix = qw * x + qy * z - qz * y;
            var iy = qw * y + qz * x - qx * z;
            var iz = qw * z + qx * y - qy * x;
            var iw = -qx * x - qy * y - qz * z;
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
        Vector3.prototype.nearEqual = function (right, epsilon) {
            return Zia.MathUtil.withinEpsilon(this._x, right._x, epsilon._x) &&
                Zia.MathUtil.withinEpsilon(this._y, right._y, epsilon._y) &&
                Zia.MathUtil.withinEpsilon(this._z, right._z, epsilon._z);
        };
        Vector3.prototype.add = function (value) {
            return Vector3.add(this, value, this);
        };
        Vector3.prototype.subtract = function (value) {
            return Vector3.subtract(this, value, this);
        };
        Vector3.prototype.multiply = function (value) {
            return Vector3.multiply(this, value, this);
        };
        Vector3.prototype.multiplyScalar = function (value) {
            return Vector3.multiplyScalar(this, value, this);
        };
        Vector3.prototype.negate = function () {
            return Zia.Vector3.negate(this, this);
        };
        Vector3.prototype.lengthSquared = function () {
            return this._x * this._x + this._y * this._y + this._z * this._z;
        };
        Vector3.prototype.length = function () {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
        };
        Vector3.prototype.normalize = function () {
            return Zia.Vector3.normalize(this, this);
        };
        Vector3.prototype.equals = function (v) {
            return (v._x === this._x) && (v._y === this._y) && (v._z === this._z);
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
            if (result === void 0) { result = new Vector3(); }
            result.set(this._x, this._y, this._z);
            return result;
        };
        Vector3.prototype.toJS = function () {
            return [this._x, this._y, this._z];
        };
        Vector3.prototype.toArray = function () {
            return this.toJS();
        };
        Vector3.add = function (a, b, result) {
            result._x = a._x + b._x;
            result._y = a._y + b._y;
            result._z = a._z + b._z;
            result._onChangeCallback();
            return result;
        };
        Vector3.ceil = function (value, result) {
            result._x = Math.ceil(value._x);
            result._y = Math.ceil(value._y);
            result._z = Math.ceil(value._z);
            result._onChangeCallback();
            return result;
        };
        Vector3.clamp = function (value, min, max, result) {
            if (value._x < min._x) {
                result._x = min._x;
            }
            else if (value._x > max._x) {
                result._x = max._x;
            }
            if (value._y < min._y) {
                result._y = min._y;
            }
            else if (value._y > max._y) {
                result._y = max._y;
            }
            if (value._z < min._z) {
                result._z = min._z;
            }
            else if (value._z > max._z) {
                result._z = max._z;
            }
            result._onChangeCallback();
            return result;
        };
        Vector3.cross = function (a, b, result) {
            if (result === void 0) { result = new Vector3(); }
            var x = a._x, y = a._y, z = a._z;
            result._x = y * b._z - z * b._y;
            result._y = z * b._x - x * b._z;
            result._z = x * b._y - y * b._x;
            result._onChangeCallback();
            return result;
        };
        Vector3.distance = function (value1, value2) {
            return Math.sqrt(Vector3.distanceSquared(value1, value2));
        };
        Vector3.distanceSquared = function (value1, value2) {
            var dx = value1._x - value2._x;
            var dy = value1._y - value2._y;
            var dz = value1._z - value2._z;
            return dx * dx + dy * dy + dz * dz;
        };
        Vector3.divide = function (value1, value2, result) {
            result._x = value1._x / value2._x;
            result._y = value1._y / value2._y;
            result._z = value1._z / value2._z;
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
        Vector3.dot = function (value1, value2) {
            return value1._x * value2._x
                + value1._y * value2._y
                + value1._z * value2._z;
        };
        Vector3.floor = function (value, result) {
            result._x = Math.floor(value._x);
            result._y = Math.floor(value._y);
            result._z = Math.floor(value._z);
            result._onChangeCallback();
            return result;
        };
        Vector3.lerp = function (value1, value2, amount, result) {
            if (result === void 0) { result = new Vector3(); }
            result._x = value1._x + (value2._x - value1._x) * amount;
            result._y = value1._y + (value2._y - value1._y) * amount;
            result._z = value1._z + (value2._z - value1._z) * amount;
            result._onChangeCallback();
            return result;
        };
        Vector3.max = function (value1, value2, result) {
            result._x = (value1._x > value2._x) ? value1._x : value2._x;
            result._y = (value1._y > value2._y) ? value1._y : value2._y;
            result._z = (value1._z > value2._z) ? value1._z : value2._z;
            result._onChangeCallback();
            return result;
        };
        Vector3.min = function (value1, value2, result) {
            result._x = (value1._x < value2._x) ? value1._x : value2._x;
            result._y = (value1._y < value2._y) ? value1._y : value2._y;
            result._z = (value1._z < value2._z) ? value1._z : value2._z;
            result._onChangeCallback();
            return result;
        };
        Vector3.multiply = function (value1, value2, result) {
            result._x = value1._x * value2._x;
            result._y = value1._y * value2._y;
            result._z = value1._z * value2._z;
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
        Vector3.negate = function (value, result) {
            return Vector3.multiplyScalar(value, -1, result);
        };
        Vector3.normalize = function (value, result) {
            return Vector3.divideScalar(value, value.length(), result);
        };
        Vector3.subtract = function (a, b, result) {
            result._x = a._x - b._x;
            result._y = a._y - b._y;
            result._z = a._z - b._z;
            result._onChangeCallback();
            return result;
        };
        Vector3._quaternionTemp = new Zia.Quaternion();
        Vector3.reflect = (function () {
            var v1 = new Vector3();
            return function (value, normal, result) {
                if (result === void 0) { result = new Vector3(); }
                normal.clone(v1);
                Vector3.multiplyScalar(v1, 2 * Vector3.dot(value, normal), v1);
                return Vector3.subtract(value, v1, result);
            };
        })();
        return Vector3;
    })();
    Zia.Vector3 = Vector3;
})(Zia || (Zia = {}));
