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
