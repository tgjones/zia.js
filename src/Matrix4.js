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

/**
 * Constructs a new 4x4 matrix. Parameters are supplied in row-major order
 * to aid readability. If called with no parameters, all matrix elements are
 * initialised to 0. If called with any parameters, make sure you supply
 * all 16 values.
 * 
 * @constructor
 *
 * @param {Number} [m11=0.0] - The value for row 0, column 0.
 * @param {Number} [m12=0.0] - The value for row 0, column 1.
 * @param {Number} [m13=0.0] - The value for row 0, column 2.
 * @param {Number} [m14=0.0] - The value for row 0, column 3.
 * @param {Number} [m21=0.0] - The value for row 1, column 0.
 * @param {Number} [m22=0.0] - The value for row 1, column 1.
 * @param {Number} [m23=0.0] - The value for row 1, column 2.
 * @param {Number} [m24=0.0] - The value for row 1, column 3.
 * @param {Number} [m31=0.0] - The value for row 2, column 0.
 * @param {Number} [m32=0.0] - The value for row 2, column 1.
 * @param {Number} [m33=0.0] - The value for row 2, column 2.
 * @param {Number} [m34=0.0] - The value for row 2, column 3.
 * @param {Number} [m41=0.0] - The value for row 3, column 0.
 * @param {Number} [m42=0.0] - The value for row 3, column 1.
 * @param {Number} [m43=0.0] - The value for row 3, column 2.
 * @param {Number} [m44=0.0] - The value for row 3, column 3.
 *
 * @classdesc
 * Represents a 4x4 matrix. The elements are stored in a `Float32Array`
 * in column-major order to optimise handoff to WebGL.
 */
Zia.Matrix4 = function(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
  var values;
  if (m11 === undefined) {
    values = [
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    ];
  } else {
    values = [
      m11, m21, m31, m41,
      m12, m22, m32, m42,
      m13, m23, m33, m43,
      m14, m24, m34, m44
    ];
  }

  /**
   * The matrix elements.
   * @type {Float32Array}
   */
  this.elements = new Float32Array(values);
};

Zia.Matrix4.compose = (function() {
  var temp = new Zia.Matrix4();

  return function(scale, rotation, translation, result) {
    Zia.Matrix4.createFromQuaternion(rotation, result);
    result.multiply(Zia.Matrix4.createScale(scale, temp));
    result.setTranslation(translation);
    return result;
  };
})();

/**
 * Creates a matrix that can be used to translate vectors.
 *
 * @static
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
  );
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

Zia.Matrix4.createFromQuaternion = function(quaternion, result) {
  var te = result.elements;

  var x = quaternion.x, y = quaternion.y, z = quaternion.z, w = quaternion.w;
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

  return result;
};

Zia.Matrix4.createLookAt = (function() {
  var x = new Zia.Vector3();
  var y = new Zia.Vector3();
  var z = new Zia.Vector3();

  return function(eye, target, up, result) {
    var te = result.elements;

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

    return result;
  };
})();

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
Zia.Matrix4.createOrthographicOffCenter = function(left, right, bottom, top, near, far, result) {
  var te = result.elements;
  var w = right - left;
  var h = top - bottom;
  var p = far - near;

  var x = ( right + left ) / w;
  var y = ( top + bottom ) / h;
  var z = ( far + near ) / p;

  te[ 0 ] = 2 / w;  te[ 4 ] = 0;  te[ 8 ] = 0;  te[ 12 ] = -x;
  te[ 1 ] = 0;  te[ 5 ] = 2 / h;  te[ 9 ] = 0;  te[ 13 ] = -y;
  te[ 2 ] = 0;  te[ 6 ] = 0;  te[ 10 ] = -2 / p; te[ 14 ] = -z;
  te[ 3 ] = 0;  te[ 7 ] = 0;  te[ 11 ] = 0; te[ 15 ] = 1;

  return result;
};

Zia.Matrix4.createPerspectiveOffCenter = function(left, right, bottom, top, near, far, result) {
  var te = result.elements;
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

  return result;
};

Zia.Matrix4.createPerspectiveFieldOfView = function (fieldOfView, aspectRatio, near, far, result) {
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
 * Creates an identity matrix.
 *
 * @param {Zia.Matrix4} result - The object in which to place the calculated result.
 * 
 * @returns {Zia.Matrix4} The modified result parameter.
 *
 * @example
 * var result = Zia.Matrix4.createIdentity(new Zia.Matrix4());
 */
Zia.Matrix4.createIdentity = function(result) {
  return result.set(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
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
Zia.Matrix4.transpose = function(matrix, result) {
  var te = matrix.elements;
  var re = result.elements;
  var tmp;

  tmp = te[1]; re[1] = te[4]; re[4] = tmp;
  tmp = te[2]; re[2] = te[8]; re[8] = tmp;
  tmp = te[6]; re[6] = te[9]; re[9] = tmp;

  tmp = te[3]; re[3] = te[12]; re[12] = tmp;
  tmp = te[7]; re[7] = te[13]; re[13] = tmp;
  tmp = te[11]; re[11] = te[14]; re[14] = tmp;

  return result;
};

Zia.Matrix4.prototype.constructor = Zia.Matrix4;

/**
 * Gets the translation component of the current transformation matrix.
 */
Zia.Matrix4.prototype.getTranslation = function(result) {
  var te = this.elements;
  result.x = te[12];
  result.y = te[13];
  result.z = te[14];
  return result;
};

/**
 * Sets the translation component of the current transformation matrix.
 */
Zia.Matrix4.prototype.setTranslation = function(translation) {
  var te = this.elements;
  te[12] = translation.x;
  te[13] = translation.y;
  te[14] = translation.z;
};

Zia.Matrix4.prototype.set = function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
  var te = this.elements;
  te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
  te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
  te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
  te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;
  return this;
};

Zia.Matrix4.prototype.makeRotationFromEuler = function(euler) {
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

};

Zia.Matrix4.prototype.multiply = function(m) {
  return Zia.Matrix4.multiply(this, m, this);
};

/**
 * Calculates the determinant of the current Matrix4 instance.
 * @method
 *
 * @returns {Number} The determinant.
 */
Zia.Matrix4.prototype.determinant = function() {
  var te = this.elements;

  var n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
  var n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
  var n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
  var n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];

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
};

/**
 * Duplicates the current Matrix4 instance.
 * @method
 *
 * @param {Zia.Matrix4} result - The object in which to store the result.
 * @returns {Zia.Matrix4} The modified result parameter.
 */
Zia.Matrix4.prototype.clone = function(result) {
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
Zia.Matrix4.prototype.decompose = (function() {
  var vector = new Zia.Vector3();
  var matrix = new Zia.Matrix4();

  return function (scale, rotation, translation) {
    var te = this.elements;

    var sx = vector.set(te[0], te[1], te[2]).length();
    var sy = vector.set(te[4], te[5], te[6]).length();
    var sz = vector.set(te[8], te[9], te[10]).length();

    // if determinant is negative, we need to invert one scale
    var det = this.determinant();
    if (det < 0) {
      sx = - sx;
    }

    translation.x = te[12];
    translation.y = te[13];
    translation.z = te[14];

    // scale the rotation part

    matrix.elements.set(this.elements); // at this point matrix is incomplete so we can't use .copy()

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

    rotation.setFromRotationMatrix( matrix );

    scale.x = sx;
    scale.y = sy;
    scale.z = sz;

    return true; // TODO: In what situation should we return false?
  };
})();