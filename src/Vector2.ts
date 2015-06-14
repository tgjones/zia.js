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
   * Represents a 2-dimensional vector.
   */
  export class Vector2 {
    private _x: number;
    private _y: number;

    /**
     * Constructs a new 2-dimensional vector.
     *
     * @param x The value for the x coordinate.
     * @param y The value for the y coordinate.
     */
    constructor(x = 0.0, y = 0.0) {
      this._x = x;
      this._y = y;
    }

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

    set(x: number, y: number) {
      this._x = x;
      this._y = y;
      this._onChangeCallback();
      return this;
    }

    copy(v: Vector2) {
      this._x = v._x;
      this._y = v._y;
      this._onChangeCallback();
      return this;
    }

    add(v: Vector2) {
      this._x += v._x;
      this._y += v._y;
      this._onChangeCallback();
      return this;
    }

    addVectors(a: Vector2, b: Vector2) {
      this._x = a._x + b._x;
      this._y = a._y + b._y;
      this._onChangeCallback();
      return this;
    }

    addScalar(s: number) {
      this._x += s;
      this._y += s;
      this._onChangeCallback();
      return this;
    }

    sub(v: Vector2) {
      this._x -= v._x;
      this._y -= v._y;
      this._onChangeCallback();
      return this;
    }

    subVectors(a: Vector2, b: Vector2) {
      this._x = a._x - b._x;
      this._y = a._y - b._y;
      this._onChangeCallback();
      return this;
    }

    multiply(v: Vector2) {
      this._x *= v._x;
      this._y *= v._y;
      this._onChangeCallback();
      return this;
    }

    multiplyScalar(s: number) {
      this._x *= s;
      this._y *= s;
      this._onChangeCallback();
      return this;
    }

    divide(v: Vector2) {
      this._x /= v._x;
      this._y /= v._y;
      this._onChangeCallback();
      return this;
    }

    divideScalar(scalar: number) {
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
    }

    min(v: Vector2) {
      if (this._x > v._x) {
        this._x = v._x;
      }

      if (this._y > v._y ) {
        this._y = v._y;
      }

      this._onChangeCallback();

      return this;
    }

    max(v: Vector2) {
      if (this._x < v._x) {
        this._x = v._x;
      }

      if (this._y < v._y) {
        this._y = v._y;
      }

      this._onChangeCallback();

      return this;
    }

    clamp(min: Vector2, max: Vector2) {

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
    }

    private static _clampScalarMinTemp = new Vector2();
    private static _clampScalarMaxTemp = new Vector2();

    clampScalar(minVal: number, maxVal: number) {
      Vector2._clampScalarMinTemp.set(minVal, minVal);
      Vector2._clampScalarMaxTemp.set(maxVal, maxVal);

      return this.clamp(Vector2._clampScalarMinTemp, Vector2._clampScalarMaxTemp);
    }

    floor() {
      this._x = Math.floor(this._x);
      this._y = Math.floor(this._y);
      this._onChangeCallback();
      return this;
    }

    ceil() {
      this._x = Math.ceil(this._x);
      this._y = Math.ceil(this._y);
      this._onChangeCallback();
      return this;
    }

    round() {
      this._x = Math.round(this._x);
      this._y = Math.round(this._y);
      this._onChangeCallback();
      return this;
    }

    roundToZero() {
      this._x = (this._x < 0) ? Math.ceil(this._x) : Math.floor(this._x);
      this._y = (this._y < 0) ? Math.ceil(this._y) : Math.floor(this._y);
      this._onChangeCallback();
      return this;
    }

    negate() {
      return this.multiplyScalar(-1);
    }

    dot(v: Vector2) {
      return this._x * v._x + this._y * v._y;
    }

    lengthSq() {
      return this._x * this._x + this._y * this._y;
    }

    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    normalize() {
      return this.divideScalar(this.length());
    }

    distanceTo(v: Vector2) {
      return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared(v: Vector2) {
      var dx = this._x - v._x, dy = this._y - v._y;
      return dx * dx + dy * dy;
    }

    setLength(l: number) {
      var oldLength = this.length();
      if (oldLength !== 0 && l !== oldLength) {
        this.multiplyScalar(l / oldLength);
      }
      return this;
    }

    lerp(v: Vector2, alpha: number) {
      this._x += (v._x - this._x) * alpha;
      this._y += (v._y - this._y) * alpha;
      this._onChangeCallback();
      return this;
    }

    equals(v: Vector2) {
      return ((v._x === this._x) && (v._y === this._y));
    }

    onChange(callback: () => void) {
      this._onChangeCallback = callback;
      return this;
    }

    _onChangeCallback() {

    }

    clone() {
      return new Zia.Vector2(this._x, this._y);
    }

    toJS() {
      return [ this._x, this._y ];
    }

    toArray() {
      return this.toJS();
    }
  }
}
