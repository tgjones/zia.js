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

/**
 * Represents a 4x4 matrix.
 * @constructor
 */
Zia.Matrix4 = function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

  this.elements = new Float32Array( 16 );

  // TODO: if n11 is undefined, then just set to identity, otherwise copy all other values into matrix
  //   we should not support semi specification of Matrix4, it is just weird.

  var te = this.elements;

  te[ 0 ] = ( n11 !== undefined ) ? n11 : 1; te[ 4 ] = n12 || 0; te[ 8 ] = n13 || 0; te[ 12 ] = n14 || 0;
  te[ 1 ] = n21 || 0; te[ 5 ] = ( n22 !== undefined ) ? n22 : 1; te[ 9 ] = n23 || 0; te[ 13 ] = n24 || 0;
  te[ 2 ] = n31 || 0; te[ 6 ] = n32 || 0; te[ 10 ] = ( n33 !== undefined ) ? n33 : 1; te[ 14 ] = n34 || 0;
  te[ 3 ] = n41 || 0; te[ 7 ] = n42 || 0; te[ 11 ] = n43 || 0; te[ 15 ] = ( n44 !== undefined ) ? n44 : 1;

};

/**
 * Creates a matrix that can be used to translate vectors.
 *
 * @param {Zia.Vector3} translation - Amounts to translate by on the x, y and z axes.
 * @param {Zia.Matrix4} result - The object in which to place the calculated result.
 * 
 * @returns {Zia.Matrix4} The modified result parameter.
 *
 * @example
 * var result = Zia.Matrix4.createTranslation(
 *   new Zia.Vector3(1, 2, -5),
 *   new Zia.Matrix4());
 */
Zia.Matrix4.createTranslation = function(translation, result) {
  return result.set(
    1, 0, 0, translation.x,
    0, 1, 0, translation.y,
    0, 0, 1, translation.z,
    0, 0, 0, 1
  );
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
Zia.Matrix4.createRotationX = function(angle, result) {
  var c = Math.cos(angle), s = Math.sin(angle);

  return result.set(
    1, 0,  0, 0,
    0, c, -s, 0,
    0, s,  c, 0,
    0, 0,  0, 1
  )
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
Zia.Matrix4.createRotationY = function(angle, result) {
  var c = Math.cos(angle), s = Math.sin(angle);

  return result.set(
    c, 0, s, 0,
    0, 1, 0, 0,
   -s, 0, c, 0,
    0, 0, 0, 1
  )
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
Zia.Matrix4.createRotationZ = function(angle, result) {
  var c = Math.cos(angle), s = Math.sin(angle);

  return result.set(
    c, -s, 0, 0,
    s,  c, 0, 0,
    0,  0, 1, 0,
    0,  0, 0, 1
  )
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
Zia.Matrix4.createFromAxisAngle = function(axis, angle, result) {
  // Based on http://www.gamedev.net/reference/articles/article1199.asp

  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var t = 1 - c;
  var x = axis.x, y = axis.y, z = axis.z;
  var tx = t * x, ty = t * y;

  return result.set(
    tx * x + c,     tx * y - s * z, tx * z + s * y, 0,
    tx * y + s * z, ty * y + c,     ty * z - s * x, 0,
    tx * z - s * y, ty * z + s * x, t * z * z + c,  0,
    0, 0, 0, 1
  );
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
Zia.Matrix4.createScale = function(scale, result) {
  return result.set(
    scale.x, 0,       0,       0,
    0,       scale.y, 0,       0,
    0,       0,       scale.z, 0,
    0, 0, 0, 1
  );
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
Zia.Matrix4.createUniformScale = function(scale, result) {
  return result.set(
    scale, 0,     0,     0,
    0,     scale, 0,     0,
    0,     0,     scale, 0,
    0, 0, 0, 1
  );
};

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
Zia.Matrix4.multiply = function(left, right, result) {
  var ae = left.elements;
  var be = right.elements;
  var te = result.elements;

  var a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
  var a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
  var a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
  var a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

  var b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
  var b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
  var b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
  var b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

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
Zia.Matrix4.multiplyByScalar = function(matrix, scalar, result) {
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
Zia.Matrix4.invert = function(matrix, result) {
  // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
  var te = matrix.elements;
  var me = result.elements;

  var n11 = me[ 0 ], n12 = me[ 4 ], n13 = me[ 8 ], n14 = me[ 12 ];
  var n21 = me[ 1 ], n22 = me[ 5 ], n23 = me[ 9 ], n24 = me[ 13 ];
  var n31 = me[ 2 ], n32 = me[ 6 ], n33 = me[ 10 ], n34 = me[ 14 ];
  var n41 = me[ 3 ], n42 = me[ 7 ], n43 = me[ 11 ], n44 = me[ 15 ];

  te[ 0 ] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
  te[ 4 ] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
  te[ 8 ] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
  te[ 12 ] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
  te[ 1 ] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
  te[ 5 ] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
  te[ 9 ] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
  te[ 13 ] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
  te[ 2 ] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
  te[ 6 ] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
  te[ 10 ] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
  te[ 14 ] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
  te[ 3 ] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
  te[ 7 ] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
  te[ 11 ] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
  te[ 15 ] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;

  var det = n11 * te[ 0 ] + n21 * te[ 4 ] + n31 * te[ 8 ] + n41 * te[ 12 ];

  if (det === 0) {
    throw new Error("Matrix4.getInverse(): can't invert matrix, determinant is 0");
  }

  Zia.Matrix4.multiplyByScalar(result, 1 / det, result);

  return result;
};

Zia.Matrix4.prototype = {

  constructor: Zia.Matrix4,

  set: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

    var te = this.elements;

    te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
    te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
    te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
    te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

    return this;

  },

  identity: function () {

    this.set(

      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1

    );

    return this;

  },

  copy: function ( m ) {

    this.elements.set( m.elements );

    return this;

  },

  copyPosition: function ( m ) {

    var te = this.elements;
    var me = m.elements;

    te[ 12 ] = me[ 12 ];
    te[ 13 ] = me[ 13 ];
    te[ 14 ] = me[ 14 ];

    return this;

  },

  extractRotation: function () {

    var v1 = new Zia.Vector3();

    return function ( m ) {

      var te = this.elements;
      var me = m.elements;

      var scaleX = 1 / v1.set( me[ 0 ], me[ 1 ], me[ 2 ] ).length();
      var scaleY = 1 / v1.set( me[ 4 ], me[ 5 ], me[ 6 ] ).length();
      var scaleZ = 1 / v1.set( me[ 8 ], me[ 9 ], me[ 10 ] ).length();

      te[ 0 ] = me[ 0 ] * scaleX;
      te[ 1 ] = me[ 1 ] * scaleX;
      te[ 2 ] = me[ 2 ] * scaleX;

      te[ 4 ] = me[ 4 ] * scaleY;
      te[ 5 ] = me[ 5 ] * scaleY;
      te[ 6 ] = me[ 6 ] * scaleY;

      te[ 8 ] = me[ 8 ] * scaleZ;
      te[ 9 ] = me[ 9 ] * scaleZ;
      te[ 10 ] = me[ 10 ] * scaleZ;

      return this;

    };

  }(),

  makeRotationFromEuler: function ( euler ) {

    if ( euler instanceof Zia.Euler === false ) {

      console.error( 'Zia.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );

    }

    var te = this.elements;

    var x = euler.x, y = euler.y, z = euler.z;
    var a = Math.cos( x ), b = Math.sin( x );
    var c = Math.cos( y ), d = Math.sin( y );
    var e = Math.cos( z ), f = Math.sin( z );

    if ( euler.order === 'XYZ' ) {

      var ae = a * e, af = a * f, be = b * e, bf = b * f;

      te[ 0 ] = c * e;
      te[ 4 ] = - c * f;
      te[ 8 ] = d;

      te[ 1 ] = af + be * d;
      te[ 5 ] = ae - bf * d;
      te[ 9 ] = - b * c;

      te[ 2 ] = bf - ae * d;
      te[ 6 ] = be + af * d;
      te[ 10 ] = a * c;

    } else if ( euler.order === 'YXZ' ) {

      var ce = c * e, cf = c * f, de = d * e, df = d * f;

      te[ 0 ] = ce + df * b;
      te[ 4 ] = de * b - cf;
      te[ 8 ] = a * d;

      te[ 1 ] = a * f;
      te[ 5 ] = a * e;
      te[ 9 ] = - b;

      te[ 2 ] = cf * b - de;
      te[ 6 ] = df + ce * b;
      te[ 10 ] = a * c;

    } else if ( euler.order === 'ZXY' ) {

      var ce = c * e, cf = c * f, de = d * e, df = d * f;

      te[ 0 ] = ce - df * b;
      te[ 4 ] = - a * f;
      te[ 8 ] = de + cf * b;

      te[ 1 ] = cf + de * b;
      te[ 5 ] = a * e;
      te[ 9 ] = df - ce * b;

      te[ 2 ] = - a * d;
      te[ 6 ] = b;
      te[ 10 ] = a * c;

    } else if ( euler.order === 'ZYX' ) {

      var ae = a * e, af = a * f, be = b * e, bf = b * f;

      te[ 0 ] = c * e;
      te[ 4 ] = be * d - af;
      te[ 8 ] = ae * d + bf;

      te[ 1 ] = c * f;
      te[ 5 ] = bf * d + ae;
      te[ 9 ] = af * d - be;

      te[ 2 ] = - d;
      te[ 6 ] = b * c;
      te[ 10 ] = a * c;

    } else if ( euler.order === 'YZX' ) {

      var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

      te[ 0 ] = c * e;
      te[ 4 ] = bd - ac * f;
      te[ 8 ] = bc * f + ad;

      te[ 1 ] = f;
      te[ 5 ] = a * e;
      te[ 9 ] = - b * e;

      te[ 2 ] = - d * e;
      te[ 6 ] = ad * f + bc;
      te[ 10 ] = ac - bd * f;

    } else if ( euler.order === 'XZY' ) {

      var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

      te[ 0 ] = c * e;
      te[ 4 ] = - f;
      te[ 8 ] = d * e;

      te[ 1 ] = ac * f + bd;
      te[ 5 ] = a * e;
      te[ 9 ] = ad * f - bc;

      te[ 2 ] = bc * f - ad;
      te[ 6 ] = b * e;
      te[ 10 ] = bd * f + ac;

    }

    // last column
    te[ 3 ] = 0;
    te[ 7 ] = 0;
    te[ 11 ] = 0;

    // bottom row
    te[ 12 ] = 0;
    te[ 13 ] = 0;
    te[ 14 ] = 0;
    te[ 15 ] = 1;

    return this;

  },

  makeRotationFromQuaternion: function ( q ) {

    var te = this.elements;

    var x = q.x, y = q.y, z = q.z, w = q.w;
    var x2 = x + x, y2 = y + y, z2 = z + z;
    var xx = x * x2, xy = x * y2, xz = x * z2;
    var yy = y * y2, yz = y * z2, zz = z * z2;
    var wx = w * x2, wy = w * y2, wz = w * z2;

    te[ 0 ] = 1 - ( yy + zz );
    te[ 4 ] = xy - wz;
    te[ 8 ] = xz + wy;

    te[ 1 ] = xy + wz;
    te[ 5 ] = 1 - ( xx + zz );
    te[ 9 ] = yz - wx;

    te[ 2 ] = xz - wy;
    te[ 6 ] = yz + wx;
    te[ 10 ] = 1 - ( xx + yy );

    // last column
    te[ 3 ] = 0;
    te[ 7 ] = 0;
    te[ 11 ] = 0;

    // bottom row
    te[ 12 ] = 0;
    te[ 13 ] = 0;
    te[ 14 ] = 0;
    te[ 15 ] = 1;

    return this;

  },

  makeLookAt: function () {

    var x = new Zia.Vector3();
    var y = new Zia.Vector3();
    var z = new Zia.Vector3();

    return function ( eye, target, up ) {

      var te = this.elements;

      z.subVectors(eye, target).normalize();
      x.crossVectors(up, z).normalize();
      y.crossVectors(z, x);

      var translateX = x.dot(eye);
      var translateY = y.dot(eye);
      var translateZ = z.dot(eye);

      te[0] = x.x; te[4] = x.y; te[8] = x.z;  te[12] = -translateX;
      te[1] = y.x; te[5] = y.y; te[9] = y.z;  te[13] = -translateY;
      te[2] = z.x; te[6] = z.y; te[10] = z.z; te[14] = -translateZ;
      te[3] = 0;   te[7] = 0;   te[11] = 0;   te[15] = 1;

      return this;

    };

  }(),

  multiply: function(m) {
    return Zia.Matrix4.multiply(this, m, this);
  },

  multiplyToArray: function ( a, b, r ) {

    var te = this.elements;

    this.multiplyMatrices( a, b );

    r[ 0 ] = te[ 0 ]; r[ 1 ] = te[ 1 ]; r[ 2 ] = te[ 2 ]; r[ 3 ] = te[ 3 ];
    r[ 4 ] = te[ 4 ]; r[ 5 ] = te[ 5 ]; r[ 6 ] = te[ 6 ]; r[ 7 ] = te[ 7 ];
    r[ 8 ]  = te[ 8 ]; r[ 9 ]  = te[ 9 ]; r[ 10 ] = te[ 10 ]; r[ 11 ] = te[ 11 ];
    r[ 12 ] = te[ 12 ]; r[ 13 ] = te[ 13 ]; r[ 14 ] = te[ 14 ]; r[ 15 ] = te[ 15 ];

    return this;

  },

  applyToVector3Array: function () {

    var v1 = new Zia.Vector3();

    return function ( array, offset, length ) {

      if ( offset === undefined ) offset = 0;
      if ( length === undefined ) length = array.length;

      for ( var i = 0, j = offset, il; i < length; i += 3, j += 3 ) {

        v1.x = array[ j ];
        v1.y = array[ j + 1 ];
        v1.z = array[ j + 2 ];

        v1.applyMatrix4( this );

        array[ j ]     = v1.x;
        array[ j + 1 ] = v1.y;
        array[ j + 2 ] = v1.z;

      }

      return array;

    };

  }(),

  determinant: function () {

    var te = this.elements;

    var n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
    var n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
    var n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
    var n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

    //TODO: make this more efficient
    //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

    return (
      n41 * (
        + n14 * n23 * n32
         - n13 * n24 * n32
         - n14 * n22 * n33
         + n12 * n24 * n33
         + n13 * n22 * n34
         - n12 * n23 * n34
      ) +
      n42 * (
        + n11 * n23 * n34
         - n11 * n24 * n33
         + n14 * n21 * n33
         - n13 * n21 * n34
         + n13 * n24 * n31
         - n14 * n23 * n31
      ) +
      n43 * (
        + n11 * n24 * n32
         - n11 * n22 * n34
         - n14 * n21 * n32
         + n12 * n21 * n34
         + n14 * n22 * n31
         - n12 * n24 * n31
      ) +
      n44 * (
        - n13 * n22 * n31
         - n11 * n23 * n32
         + n11 * n22 * n33
         + n13 * n21 * n32
         - n12 * n21 * n33
         + n12 * n23 * n31
      )

    );

  },

  transpose: function () {

    var te = this.elements;
    var tmp;

    tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
    tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
    tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

    tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
    tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
    tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

    return this;

  },

  flattenToArrayOffset: function ( array, offset ) {

    var te = this.elements;

    array[ offset     ] = te[ 0 ];
    array[ offset + 1 ] = te[ 1 ];
    array[ offset + 2 ] = te[ 2 ];
    array[ offset + 3 ] = te[ 3 ];

    array[ offset + 4 ] = te[ 4 ];
    array[ offset + 5 ] = te[ 5 ];
    array[ offset + 6 ] = te[ 6 ];
    array[ offset + 7 ] = te[ 7 ];

    array[ offset + 8 ]  = te[ 8 ];
    array[ offset + 9 ]  = te[ 9 ];
    array[ offset + 10 ] = te[ 10 ];
    array[ offset + 11 ] = te[ 11 ];

    array[ offset + 12 ] = te[ 12 ];
    array[ offset + 13 ] = te[ 13 ];
    array[ offset + 14 ] = te[ 14 ];
    array[ offset + 15 ] = te[ 15 ];

    return array;

  },

  setPosition: function ( v ) {

    var te = this.elements;

    te[ 12 ] = v.x;
    te[ 13 ] = v.y;
    te[ 14 ] = v.z;

    return this;

  },

  scale: function ( v ) {

    var te = this.elements;
    var x = v.x, y = v.y, z = v.z;

    te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
    te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
    te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
    te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

    return this;

  },

  getMaxScaleOnAxis: function () {

    var te = this.elements;

    var scaleXSq = te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] + te[ 2 ] * te[ 2 ];
    var scaleYSq = te[ 4 ] * te[ 4 ] + te[ 5 ] * te[ 5 ] + te[ 6 ] * te[ 6 ];
    var scaleZSq = te[ 8 ] * te[ 8 ] + te[ 9 ] * te[ 9 ] + te[ 10 ] * te[ 10 ];

    return Math.sqrt( Math.max( scaleXSq, Math.max( scaleYSq, scaleZSq ) ) );

  },

  compose: function ( position, quaternion, scale ) {

    this.makeRotationFromQuaternion( quaternion );
    this.scale( scale );
    this.setPosition( position );

    return this;

  },

  decompose: function () {

    var vector = new Zia.Vector3();
    var matrix = new Zia.Matrix4();

    return function ( position, quaternion, scale ) {

      var te = this.elements;

      var sx = vector.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
      var sy = vector.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
      var sz = vector.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

      // if determine is negative, we need to invert one scale
      var det = this.determinant();
      if ( det < 0 ) {
        sx = - sx;
      }

      position.x = te[ 12 ];
      position.y = te[ 13 ];
      position.z = te[ 14 ];

      // scale the rotation part

      matrix.elements.set( this.elements ); // at this point matrix is incomplete so we can't use .copy()

      var invSX = 1 / sx;
      var invSY = 1 / sy;
      var invSZ = 1 / sz;

      matrix.elements[ 0 ] *= invSX;
      matrix.elements[ 1 ] *= invSX;
      matrix.elements[ 2 ] *= invSX;

      matrix.elements[ 4 ] *= invSY;
      matrix.elements[ 5 ] *= invSY;
      matrix.elements[ 6 ] *= invSY;

      matrix.elements[ 8 ] *= invSZ;
      matrix.elements[ 9 ] *= invSZ;
      matrix.elements[ 10 ] *= invSZ;

      quaternion.setFromRotationMatrix( matrix );

      scale.x = sx;
      scale.y = sy;
      scale.z = sz;

      return this;

    };

  }(),

  makeFrustum: function ( left, right, bottom, top, near, far ) {

    var te = this.elements;
    var x = 2 * near / ( right - left );
    var y = 2 * near / ( top - bottom );

    var a = ( right + left ) / ( right - left );
    var b = ( top + bottom ) / ( top - bottom );
    var c = - ( far + near ) / ( far - near );
    var d = - 2 * far * near / ( far - near );

    te[ 0 ] = x;  te[ 4 ] = 0;  te[ 8 ] = a;  te[ 12 ] = 0;
    te[ 1 ] = 0;  te[ 5 ] = y;  te[ 9 ] = b;  te[ 13 ] = 0;
    te[ 2 ] = 0;  te[ 6 ] = 0;  te[ 10 ] = c; te[ 14 ] = d;
    te[ 3 ] = 0;  te[ 7 ] = 0;  te[ 11 ] = - 1; te[ 15 ] = 0;

    return this;

  },

  makePerspective: function ( fov, aspect, near, far ) {

    var ymax = near * Math.tan(fov * 0.5);
    var ymin = - ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return this.makeFrustum( xmin, xmax, ymin, ymax, near, far );

  },

  makeOrthographic: function ( left, right, top, bottom, near, far ) {

    var te = this.elements;
    var w = right - left;
    var h = top - bottom;
    var p = far - near;

    var x = ( right + left ) / w;
    var y = ( top + bottom ) / h;
    var z = ( far + near ) / p;

    te[ 0 ] = 2 / w;  te[ 4 ] = 0;  te[ 8 ] = 0;  te[ 12 ] = - x;
    te[ 1 ] = 0;  te[ 5 ] = 2 / h;  te[ 9 ] = 0;  te[ 13 ] = - y;
    te[ 2 ] = 0;  te[ 6 ] = 0;  te[ 10 ] = - 2 / p; te[ 14 ] = - z;
    te[ 3 ] = 0;  te[ 7 ] = 0;  te[ 11 ] = 0; te[ 15 ] = 1;

    return this;

  },

  fromArray: function ( array ) {

    this.elements.set( array );

    return this;

  },

  toArray: function () {

    var te = this.elements;

    return [
      te[ 0 ], te[ 1 ], te[ 2 ], te[ 3 ],
      te[ 4 ], te[ 5 ], te[ 6 ], te[ 7 ],
      te[ 8 ], te[ 9 ], te[ 10 ], te[ 11 ],
      te[ 12 ], te[ 13 ], te[ 14 ], te[ 15 ]
    ];

  }
};

/**
 * Duplicates the current Matrix4 instance.
 * @method
 *
 * @param {Zia.Matrix4} [result] - The object in which to store the result.
 * @returns {Zia.Matrix4} The modified result parameter, or a new Matrix4 instance if none was supplied.
 */
Zia.Matrix4.prototype.clone = function(result) {
  if (result === undefined) {
    result = new Zia.Matrix4();
  }

  var te = this.elements;

  result.set(
    te[ 0 ], te[ 4 ], te[ 8 ], te[ 12 ],
    te[ 1 ], te[ 5 ], te[ 9 ], te[ 13 ],
    te[ 2 ], te[ 6 ], te[ 10 ], te[ 14 ],
    te[ 3 ], te[ 7 ], te[ 11 ], te[ 15 ]
  );

  return result;
};