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
