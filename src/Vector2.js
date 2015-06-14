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
    var Vector2 = (function () {
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
            return Zia.Vector2.add(this, v, this);
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
        Vector2.prototype.subtract = function (v) {
            return Zia.Vector2.subtract(this, v, this);
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
        Vector2.prototype.toArray = function () {
            return this.toJS();
        };
        Vector2.add = function (value1, value2, result) {
            if (result === void 0) { result = new Vector2(); }
            result._x = value1._x + value2._x;
            result._y = value1._y + value2._y;
            result._onChangeCallback();
            return result;
        };
        Vector2.subtract = function (value1, value2, result) {
            if (result === void 0) { result = new Vector2(); }
            result._x = value1._x - value2._x;
            result._y = value1._y - value2._y;
            result._onChangeCallback();
            return result;
        };
        ;
        Vector2._clampScalarMinTemp = new Vector2();
        Vector2._clampScalarMaxTemp = new Vector2();
        return Vector2;
    })();
    Zia.Vector2 = Vector2;
})(Zia || (Zia = {}));
