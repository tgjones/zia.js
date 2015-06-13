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

module Zia {
  export class Euler {
    private _x: number;
    private _y: number;
    private _z: number;
    private _order: string;

    constructor(x = 0.0, y = 0.0, z = 0.0, order = Euler.DefaultOrder) {
      this._x = x;
      this._y = y;
      this._z = z;
      this._order = order;
    }

    static RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

    static DefaultOrder = 'XYZ';

    get x () {
      return this._x;
    }

    set x(value) {
      this._x = value;
      this.onChangeCallback();
    }

    get y () {
      return this._y;
    }

    set y ( value ) {
      this._y = value;
      this.onChangeCallback();
    }

    get z () {
      return this._z;
    }

    set z ( value ) {
      this._z = value;
      this.onChangeCallback();
    }

    get order () {
      return this._order;
    }

    set order ( value ) {
      this._order = value;
      this.onChangeCallback();
    }

    set(x: number, y: number, z: number, order: string) {
      this._x = x;
      this._y = y;
      this._z = z;
      this._order = order || this._order;

      this.onChangeCallback();

      return this;
    }

    copy(euler: Euler) {
      this._x = euler._x;
      this._y = euler._y;
      this._z = euler._z;
      this._order = euler._order;

      this.onChangeCallback();

      return this;
    }

    setFromRotationMatrix(m: Matrix4, order: string) {

      var clamp = MathUtil.clamp;

      // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

      var te = m.elements;
      var m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
      var m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
      var m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

      order = order || this._order;

      if ( order === 'XYZ' ) {

        this._y = Math.asin( clamp( m13, - 1, 1 ) );

        if ( Math.abs( m13 ) < 0.99999 ) {

          this._x = Math.atan2( - m23, m33 );
          this._z = Math.atan2( - m12, m11 );

        } else {

          this._x = Math.atan2( m32, m22 );
          this._z = 0;

        }

      } else if ( order === 'YXZ' ) {

        this._x = Math.asin( - clamp( m23, - 1, 1 ) );

        if ( Math.abs( m23 ) < 0.99999 ) {

          this._y = Math.atan2( m13, m33 );
          this._z = Math.atan2( m21, m22 );

        } else {

          this._y = Math.atan2( - m31, m11 );
          this._z = 0;

        }

      } else if ( order === 'ZXY' ) {

        this._x = Math.asin( clamp( m32, - 1, 1 ) );

        if ( Math.abs( m32 ) < 0.99999 ) {

          this._y = Math.atan2( - m31, m33 );
          this._z = Math.atan2( - m12, m22 );

        } else {

          this._y = 0;
          this._z = Math.atan2( m21, m11 );

        }

      } else if ( order === 'ZYX' ) {

        this._y = Math.asin( - clamp( m31, - 1, 1 ) );

        if ( Math.abs( m31 ) < 0.99999 ) {

          this._x = Math.atan2( m32, m33 );
          this._z = Math.atan2( m21, m11 );

        } else {

          this._x = 0;
          this._z = Math.atan2( - m12, m22 );

        }

      } else if ( order === 'YZX' ) {

        this._z = Math.asin( clamp( m21, - 1, 1 ) );

        if ( Math.abs( m21 ) < 0.99999 ) {

          this._x = Math.atan2( - m23, m22 );
          this._y = Math.atan2( - m31, m11 );

        } else {

          this._x = 0;
          this._y = Math.atan2( m13, m33 );

        }

      } else if ( order === 'XZY' ) {

        this._z = Math.asin( - clamp( m12, - 1, 1 ) );

        if ( Math.abs( m12 ) < 0.99999 ) {

          this._x = Math.atan2( m32, m22 );
          this._y = Math.atan2( m13, m11 );

        } else {

          this._x = Math.atan2( - m23, m33 );
          this._y = 0;

        }

      } else {

        console.warn( 'Zia.Euler: .setFromRotationMatrix() given unsupported order: ' + order )

      }

      this._order = order;

      this.onChangeCallback();

      return this;
    }

    setFromQuaternion(q: Quaternion, order: string) {
      var clamp = MathUtil.clamp;

      // q is assumed to be normalized

      // http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m

      var sqx = q.x * q.x;
      var sqy = q.y * q.y;
      var sqz = q.z * q.z;
      var sqw = q.w * q.w;

      order = order || this._order;

      if ( order === 'XYZ' ) {

        this._x = Math.atan2( 2 * ( q.x * q.w - q.y * q.z ), ( sqw - sqx - sqy + sqz ) );
        this._y = Math.asin(  clamp( 2 * ( q.x * q.z + q.y * q.w ), - 1, 1 ) );
        this._z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw + sqx - sqy - sqz ) );

      } else if ( order ===  'YXZ' ) {

        this._x = Math.asin(  clamp( 2 * ( q.x * q.w - q.y * q.z ), - 1, 1 ) );
        this._y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw - sqx - sqy + sqz ) );
        this._z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw - sqx + sqy - sqz ) );

      } else if ( order === 'ZXY' ) {

        this._x = Math.asin(  clamp( 2 * ( q.x * q.w + q.y * q.z ), - 1, 1 ) );
        this._y = Math.atan2( 2 * ( q.y * q.w - q.z * q.x ), ( sqw - sqx - sqy + sqz ) );
        this._z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw - sqx + sqy - sqz ) );

      } else if ( order === 'ZYX' ) {

        this._x = Math.atan2( 2 * ( q.x * q.w + q.z * q.y ), ( sqw - sqx - sqy + sqz ) );
        this._y = Math.asin(  clamp( 2 * ( q.y * q.w - q.x * q.z ), - 1, 1 ) );
        this._z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw + sqx - sqy - sqz ) );

      } else if ( order === 'YZX' ) {

        this._x = Math.atan2( 2 * ( q.x * q.w - q.z * q.y ), ( sqw - sqx + sqy - sqz ) );
        this._y = Math.atan2( 2 * ( q.y * q.w - q.x * q.z ), ( sqw + sqx - sqy - sqz ) );
        this._z = Math.asin(  clamp( 2 * ( q.x * q.y + q.z * q.w ), - 1, 1 ) );

      } else if ( order === 'XZY' ) {

        this._x = Math.atan2( 2 * ( q.x * q.w + q.y * q.z ), ( sqw - sqx + sqy - sqz ) );
        this._y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw + sqx - sqy - sqz ) );
        this._z = Math.asin(  clamp( 2 * ( q.z * q.w - q.x * q.y ), - 1, 1 ) );

      } else {

        console.warn( 'Zia.Euler: .setFromQuaternion() given unsupported order: ' + order )

      }

      this._order = order;

      return this;

    }

    private static _reorderTemp = new Quaternion();

    reorder(newOrder: string) {
      // WARNING: this discards revolution information -bhouston
      Quaternion.createFromEuler(this, Euler._reorderTemp);
      this.setFromQuaternion(Euler._reorderTemp, newOrder);
    }

    equals(euler: Euler) {
      return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );
    }

    onChange(callback: () => void) {
      this.onChangeCallback = callback;
      return this;
    }

    onChangeCallback() {

    }

    clone() {
      return new Euler(this._x, this._y, this._z, this._order);
    }
  }
}
