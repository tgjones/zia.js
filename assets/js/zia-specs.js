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

describe('Zia.Euler', function() {
  var eulerZero = new Zia.Euler(0, 0, 0, "XYZ");
  var eulerAxyz = new Zia.Euler(1, 0, 0, "XYZ");
  var eulerAzyx = new Zia.Euler(0, 1, 0, "ZYX");

  it("has a constructor", function() {
    var a = new Zia.Euler();
    expect(a).toEqual(eulerZero);
    expect(a).not.toEqual(eulerAxyz);
    expect(a).not.toEqual(eulerAzyx);
  });

  it("has clone/copy/equals methods", function() {
    var a = eulerAxyz.clone();
    expect(a).toEqual(eulerAxyz);
    expect(a).not.toEqual(eulerZero);
    expect(a).not.toEqual(eulerAzyx);

    a.copy(eulerAzyx);
    expect(a).toEqual(eulerAzyx);
    expect(a).not.toEqual(eulerAxyz);
    expect(a).not.toEqual(eulerZero);
  });

  it("has a set method", function() {
    var a = new Zia.Euler();

    a.set( 0, 1, 0, "ZYX" );
    expect(a).toEqual(eulerAzyx);
    expect(a).not.toEqual(eulerAxyz);
    expect(a).not.toEqual(eulerZero);
  });

  it( "Quaternion.setFromEuler/Euler.fromQuaternion", function() {
    var testValues = [ eulerZero, eulerAxyz, eulerAzyx ];
    for( var i = 0; i < testValues.length; i ++ ) {
      var v = testValues[i];
      var q = new Zia.Quaternion().setFromEuler( v );

      var v2 = new Zia.Euler().setFromQuaternion( q, v.order );
      var q2 = new Zia.Quaternion().setFromEuler( v2 );
      expect(q).toEqualQuaternion(q2);
    }
  });


  it("Matrix4.setFromEuler/Euler.fromRotationMatrix", function() {
    var testValues = [ eulerZero, eulerAxyz, eulerAzyx ];
    for( var i = 0; i < testValues.length; i ++ ) {
      var v = testValues[i];
      var m = new Zia.Matrix4().makeRotationFromEuler( v );

      var v2 = new Zia.Euler().setFromRotationMatrix( m, v.order );
      var m2 = new Zia.Matrix4().makeRotationFromEuler( v2 );
      expect(m).toEqualMatrix4(m2);
    }
  });

  it("has a reorder method", function() {
    var testValues = [ eulerZero, eulerAxyz, eulerAzyx ];
    for( var i = 0; i < testValues.length; i ++ ) {
      var v = testValues[i];
      var q = new Zia.Quaternion().setFromEuler( v );

      v.reorder( 'YZX' );   
      var q2 = new Zia.Quaternion().setFromEuler( v );
      expect(q).toEqualQuaternion(q2);

      v.reorder( 'ZXY' );
      var q3 = new Zia.Quaternion().setFromEuler(v);
      expect(q).toEqualQuaternion(q3);
    }
  });
});

describe('Zia.Math', function () {
  describe('generateUUID function', function () {
    it('generates a random UUID', function () {
      var result = Zia.Math.generateUUID();
      expect(result.length).toBe(36);
    });
  });
});

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

describe('Zia.Matrix4', function() {
  
  describe("constructor", function() {
    it('initializes to an empty matrix when no parameters are passed', function() {
      var m = new Zia.Matrix4();
      expect(m.determinant()).toBe(0);
    });
    
    it ('initializes to the specified values when parameters are passed', function() {
      var m = new Zia.Matrix4(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
      expect(m.elements[0]).toBe(0);
      expect(m.elements[1]).toBe(4);
      expect(m.elements[2]).toBe(8);
      expect(m.elements[3]).toBe(12);
      expect(m.elements[4]).toBe(1);
      expect(m.elements[5]).toBe(5);
      expect(m.elements[6]).toBe(9);
      expect(m.elements[7]).toBe(13);
      expect(m.elements[8]).toBe(2);
      expect(m.elements[9]).toBe(6);
      expect(m.elements[10]).toBe(10);
      expect(m.elements[11]).toBe(14);
      expect(m.elements[12]).toBe(3);
      expect(m.elements[13]).toBe(7);
      expect(m.elements[14]).toBe(11);
      expect(m.elements[15]).toBe(15);
    });
  });

  describe('#set method', function() {
    it("set", function() {
      var b = new Zia.Matrix4();
      expect( b.determinant()).toBe(0);

      b.set(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
      expect(b.elements[0]).toBe(0);
      expect(b.elements[1]).toBe(4);
      expect(b.elements[2]).toBe(8);
      expect(b.elements[3]).toBe(12);
      expect(b.elements[4]).toBe(1);
      expect(b.elements[5]).toBe(5);
      expect(b.elements[6]).toBe(9);
      expect(b.elements[7]).toBe(13);
      expect(b.elements[8]).toBe(2);
      expect(b.elements[9]).toBe(6);
      expect(b.elements[10]).toBe(10);
      expect(b.elements[11]).toBe(14);
      expect(b.elements[12]).toBe(3);
      expect(b.elements[13]).toBe(7);
      expect(b.elements[14]).toBe(11);
      expect(b.elements[15]).toBe(15);
    });
  });

  describe('#identity method', function() {
    it('has 1 on the diagonal, 0 elsewhere', function() {
      var m = Zia.Matrix4.createIdentity(new Zia.Matrix4());
      expect(m.elements[0] ).toBe(1);
      expect(m.elements[1] ).toBe(0);
      expect(m.elements[2] ).toBe(0);
      expect(m.elements[3] ).toBe(0);
      expect(m.elements[4] ).toBe(0);
      expect(m.elements[5] ).toBe(1);
      expect(m.elements[6] ).toBe(0);
      expect(m.elements[7] ).toBe(0);
      expect(m.elements[8] ).toBe(0);
      expect(m.elements[9] ).toBe(0);
      expect(m.elements[10]).toBe(1);
      expect(m.elements[11]).toBe(0);
      expect(m.elements[12]).toBe(0);
      expect(m.elements[13]).toBe(0);
      expect(m.elements[14]).toBe(0);
      expect(m.elements[15]).toBe(1);
    });
  });

  it( "multiplyByScalar", function() {
    var b = new Zia.Matrix4( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 );
    expect( b.elements[0] ).toBe(0 );
    expect( b.elements[1] ).toBe(4 );
    expect( b.elements[2] ).toBe(8 );
    expect( b.elements[3] ).toBe(12 );
    expect( b.elements[4] ).toBe(1 );
    expect( b.elements[5] ).toBe(5 );
    expect( b.elements[6] ).toBe(9 );
    expect( b.elements[7] ).toBe(13 );
    expect( b.elements[8] ).toBe(2 );
    expect( b.elements[9] ).toBe(6 );
    expect( b.elements[10]).toBe( 10 );
    expect( b.elements[11]).toBe( 14 );
    expect( b.elements[12]).toBe( 3 );
    expect( b.elements[13]).toBe( 7 );
    expect( b.elements[14]).toBe( 11 );
    expect( b.elements[15]).toBe( 15 );

    Zia.Matrix4.multiplyByScalar(b, 2, b);
    expect( b.elements[0] ).toBe(0*2 );
    expect( b.elements[1] ).toBe(4*2 );
    expect( b.elements[2] ).toBe(8*2 );
    expect( b.elements[3] ).toBe(12*2 );
    expect( b.elements[4] ).toBe(1*2 );
    expect( b.elements[5] ).toBe(5*2 );
    expect( b.elements[6] ).toBe(9*2 );
    expect( b.elements[7] ).toBe(13*2 );
    expect( b.elements[8] ).toBe(2*2 );
    expect( b.elements[9] ).toBe(6*2 );
    expect( b.elements[10]).toBe( 10*2 );
    expect( b.elements[11]).toBe( 14*2 );
    expect( b.elements[12]).toBe( 3*2 );
    expect( b.elements[13]).toBe( 7*2 );
    expect( b.elements[14]).toBe( 11*2 );
    expect( b.elements[15]).toBe( 15*2 );
  });

  it( "determinant", function() {
    var a = Zia.Matrix4.createIdentity(new Zia.Matrix4());
    expect( a.determinant()).toBe(1);

    a.elements[0] = 2;
    expect( a.determinant()).toBe(2);

    a.elements[0] = 0;
    expect( a.determinant()).toBe(0);

    // calculated via http://www.euclideanspace.com/maths/algebra/matrix/functions/determinant/fourD/index.htm
    a.set( 2, 3, 4, 5, -1, -21, -3, -4, 6, 7, 8, 10, -8, -9, -10, -12 );
    expect( a.determinant()).toBe(76);
  });

  it( "invert", function() {
    var identity = Zia.Matrix4.createIdentity(new Zia.Matrix4());

    var a = Zia.Matrix4.createIdentity(new Zia.Matrix4());
    var b = new Zia.Matrix4( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );
    var c = new Zia.Matrix4( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );

    expect(a).not.toEqualMatrix4(b);
    Zia.Matrix4.invert(b, a);
    expect(b).toEqualMatrix4(Zia.Matrix4.createIdentity(new Zia.Matrix4()));

    expect(function() { Zia.Matrix4.invert(b, c); }).toThrow();

    var testMatrices = [
      Zia.Matrix4.createRotationX( 0.3, new Zia.Matrix4()),
      Zia.Matrix4.createRotationX(-0.3, new Zia.Matrix4()),
      Zia.Matrix4.createRotationY( 0.3, new Zia.Matrix4()),
      Zia.Matrix4.createRotationY(-0.3, new Zia.Matrix4()),
      Zia.Matrix4.createRotationZ( 0.3, new Zia.Matrix4()),
      Zia.Matrix4.createRotationZ(-0.3, new Zia.Matrix4()),
      Zia.Matrix4.createScale(new Zia.Vector3(1, 2, 3), new Zia.Matrix4()),
      Zia.Matrix4.createScale(new Zia.Vector3(1/8, 1/2, 1/3), new Zia.Matrix4()),
      Zia.Matrix4.createPerspectiveOffCenter( -1, 1, -1, 1, 1, 1000, new Zia.Matrix4() ),
      Zia.Matrix4.createPerspectiveOffCenter( -16, 16, -9, 9, 0.1, 10000, new Zia.Matrix4() ),
      Zia.Matrix4.createTranslation(new Zia.Vector3(1, 2, 3), new Zia.Matrix4())
      ];

    for( var i = 0, il = testMatrices.length; i < il; i ++ ) {
      var m = testMatrices[i];

      var mInverse = Zia.Matrix4.invert(m, Zia.Matrix4.createIdentity(new Zia.Matrix4()));
      var mSelfInverse = m.clone(new Zia.Matrix4());
      Zia.Matrix4.invert(mSelfInverse, mSelfInverse);


      // self-inverse should the same as inverse
      expect(mSelfInverse).toEqualMatrix4(mInverse);

      // the determinant of the inverse should be the reciprocal
      expect(Math.abs( m.determinant() * mInverse.determinant() - 1 )).toBeLessThan(0.0001);

      var mProduct = Zia.Matrix4.multiply(m, mInverse, new Zia.Matrix4());

      // the determinant of the identity matrix is 1
      expect( Math.abs( mProduct.determinant() - 1 )).toBeLessThan(0.0001);
      expect(mProduct).toEqualMatrix4(identity);
    }
  });

  it( "transpose", function() {
    var a = new Zia.Matrix4();
    var b = a.clone(new Zia.Matrix4());
    Zia.Matrix4.transpose(b, b);
    expect(a).toEqualMatrix4(b);

    b = new Zia.Matrix4( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 );
    var clonedB = b.clone(new Zia.Matrix4());
    var c = Zia.Matrix4.transpose(clonedB, clonedB);
    expect(b).not.toEqualMatrix4(c);
    Zia.Matrix4.transpose(c, c);
    expect(b).toEqualMatrix4(c);
  });

  it( "clone", function() {
    var a = new Zia.Matrix4( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 );
    var b = a.clone(new Zia.Matrix4());

    expect(a).toEqualMatrix4(b);

    // ensure that it is a true copy
    a.elements[0] = 2;
    expect(a).not.toEqualMatrix4(b);
  });


  it( "compose/decompose", function() {
    var tValues = [
      new Zia.Vector3(),
      new Zia.Vector3( 3, 0, 0 ),
      new Zia.Vector3( 0, 4, 0 ),
      new Zia.Vector3( 0, 0, 5 ),
      new Zia.Vector3( -6, 0, 0 ),
      new Zia.Vector3( 0, -7, 0 ),
      new Zia.Vector3( 0, 0, -8 ),
      new Zia.Vector3( -2, 5, -9 ),
      new Zia.Vector3( -2, -5, -9 )
    ];

    var sValues = [
      new Zia.Vector3( 1, 1, 1 ),
      new Zia.Vector3( 2, 2, 2 ),
      new Zia.Vector3( 1, -1, 1 ),
      new Zia.Vector3( -1, 1, 1 ),
      new Zia.Vector3( 1, 1, -1 ),
      new Zia.Vector3( 2, -2, 1 ),
      new Zia.Vector3( -1, 2, -2 ),
      new Zia.Vector3( -1, -1, -1 ),
      new Zia.Vector3( -2, -2, -2 )
    ];

    var rValues = [
      new Zia.Quaternion(),
      new Zia.Quaternion().setFromEuler( new Zia.Euler( 1, 1, 0 ) ),
      new Zia.Quaternion().setFromEuler( new Zia.Euler( 1, -1, 1 ) ),
      new Zia.Quaternion( 0, 0.9238795292366128, 0, 0.38268342717215614 )
    ];


    for( var ti = 0; ti < tValues.length; ti ++ ) {
      for( var si = 0; si < sValues.length; si ++ ) {
        for( var ri = 0; ri < rValues.length; ri ++ ) {
          var t = tValues[ti];
          var s = sValues[si];
          var r = rValues[ri];

          var m = Zia.Matrix4.compose(s, r, t, new Zia.Matrix4());
          var t2 = new Zia.Vector3();
          var r2 = new Zia.Quaternion();
          var s2 = new Zia.Vector3();

          m.decompose(s2, r2, t2);

          var m2 = Zia.Matrix4.compose(s2, r2, t2, new Zia.Matrix4());
          expect(m).toEqualMatrix4(m2);
        }
      }
    }
  });
});

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

describe('Zia.Quaternion', function() {
  var x = 2;
  var y = 3;
  var z = 4;
  var w = 5;

  var orders = [ 'XYZ', 'YXZ', 'ZXY', 'ZYX', 'YZX', 'XZY' ];
  var eulerAngles = new Zia.Euler( 0.1, -0.3, 0.25 );

  var qSub = function ( a, b ) {
    var result = new Zia.Quaternion();
    result.copy( a );

    result.x -= b.x;
    result.y -= b.y;
    result.z -= b.z;
    result.w -= b.w;

    return result;
  };

  it("constructor", function() {
    var a = new Zia.Quaternion();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
    expect(a.z).toBe(0);
    expect(a.w).toBe(1);

    a = new Zia.Quaternion( x, y, z, w );
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
    expect(a.z).toBe(z);
    expect(a.w).toBe(w);
  });

  it("copy", function() {
    var a = new Zia.Quaternion( x, y, z, w );
    var b = new Zia.Quaternion().copy( a );
    expect(b.x).toBe(x);
    expect(b.y).toBe(y);
    expect(b.z).toBe(z);
    expect(b.w).toBe(w);

    // ensure that it is a true copy
    a.x = 0;
    a.y = -1;
    a.z = 0;
    a.w = -1;
    expect(b.x).toBe(x);
    expect(b.y).toBe(y);
  });

  it("set", function() {
    var a = new Zia.Quaternion();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
    expect(a.z).toBe(0);
    expect(a.w).toBe(1);

    a.set( x, y, z, w );
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
    expect(a.z).toBe(z);
    expect(a.w).toBe(w);
  });

  it("setFromAxisAngle", function() {

    // TODO: find cases to validate.
    //ok( true, "Passed!" );

    var zero = new Zia.Quaternion();

    var a = new Zia.Quaternion().setFromAxisAngle( new Zia.Vector3( 1, 0, 0 ), 0 );
    expect(a).toEqual(zero);
    a = new Zia.Quaternion().setFromAxisAngle( new Zia.Vector3( 0, 1, 0 ), 0 );
    expect(a).toEqual(zero);
    a = new Zia.Quaternion().setFromAxisAngle( new Zia.Vector3( 0, 0, 1 ), 0 );
    expect(a).toEqual(zero);

    var b1 = new Zia.Quaternion().setFromAxisAngle( new Zia.Vector3( 1, 0, 0 ), Math.PI );
    expect(a).not.toEqual(b1);
    var b2 = new Zia.Quaternion().setFromAxisAngle( new Zia.Vector3( 1, 0, 0 ), -Math.PI );
    expect(a).not.toEqual(b2);

    b1.multiply( b2 );
    expect(a).toEqual(b1);
  });


  it("setFromEuler/setFromQuaternion", function() {

    var angles = [ new Zia.Vector3( 1, 0, 0 ), new Zia.Vector3( 0, 1, 0 ), new Zia.Vector3( 0, 0, 1 ) ];

    // ensure euler conversion to/from Quaternion matches.
    for( var i = 0; i < orders.length; i ++ ) {
      for( var j = 0; j < angles.length; j ++ ) {
        var eulers2 = new Zia.Euler().setFromQuaternion( new Zia.Quaternion().setFromEuler( new Zia.Euler( angles[j].x, angles[j].y, angles[j].z, orders[i] ) ), orders[i] );
        var newAngle = new Zia.Vector3( eulers2.x, eulers2.y, eulers2.z );
        expect(newAngle.distanceTo(angles[j])).toBeLessThan(0.001);
      }
    }

  });

  it("setFromEuler/setFromRotationMatrix", function() {

    // ensure euler conversion for Quaternion matches that of Matrix4
    for( var i = 0; i < orders.length; i ++ ) {
      var q = new Zia.Quaternion().setFromEuler( eulerAngles, orders[i] );
      var m = new Zia.Matrix4().makeRotationFromEuler( eulerAngles, orders[i] );
      var q2 = new Zia.Quaternion().setFromRotationMatrix( m );

      expect(qSub(q, q2).length()).toBeLessThan(0.001);
    }

  });

  it("normalize/length/lengthSq", function() {
    var a = new Zia.Quaternion( x, y, z, w );
    var b = new Zia.Quaternion( -x, -y, -z, -w );

    expect(a.length()).not.toBe(1);
    expect(a.lengthSq()).not.toBe(1);
    a.normalize();
    expect(a.length()).toBe(1);
    expect(a.lengthSq()).toBe(1);

    a.set( 0, 0, 0, 0 );
    expect(a.lengthSq()).toBe(0);
    expect(a.length()).toBe(0);
    a.normalize();
    expect(a.lengthSq()).toBe(1);
    expect(a.length()).toBe(1);
  });

  it("inverse/conjugate", function() {
    var a = new Zia.Quaternion( x, y, z, w );

    // TODO: add better validation here.

    var b = a.clone().conjugate();

    expect(a.x).toBe(-b.x);
    expect(a.y).toBe(-b.y);
    expect(a.z).toBe(-b.z);
    expect(a.w).toBe(b.w);
  });


  it("multiplyQuaternions/multiply", function() {

    var angles = [ new Zia.Euler( 1, 0, 0 ), new Zia.Euler( 0, 1, 0 ), new Zia.Euler( 0, 0, 1 ) ];

    var q1 = new Zia.Quaternion().setFromEuler( angles[0], "XYZ" );
    var q2 = new Zia.Quaternion().setFromEuler( angles[1], "XYZ" );
    var q3 = new Zia.Quaternion().setFromEuler( angles[2], "XYZ" );

    var q = new Zia.Quaternion().multiplyQuaternions( q1, q2 ).multiply( q3 );

    var m1 = new Zia.Matrix4().makeRotationFromEuler( angles[0], "XYZ" );
    var m2 = new Zia.Matrix4().makeRotationFromEuler( angles[1], "XYZ" );
    var m3 = new Zia.Matrix4().makeRotationFromEuler( angles[2], "XYZ" );

    var m = m1.multiply(m2).multiply(m3);

    var qFromM = new Zia.Quaternion().setFromRotationMatrix( m );

    expect(qSub(q, qFromM).length()).toBeLessThan(0.001);
  });

  it("multiplyVector3", function() {
    
    var angles = [ new Zia.Euler( 1, 0, 0 ), new Zia.Euler( 0, 1, 0 ), new Zia.Euler( 0, 0, 1 ) ];

    // ensure euler conversion for Quaternion matches that of Matrix4
    for( var i = 0; i < orders.length; i ++ ) {
      for( var j = 0; j < angles.length; j ++ ) {
        var q = new Zia.Quaternion().setFromEuler( angles[j], orders[i] );
        var m = new Zia.Matrix4().makeRotationFromEuler( angles[j], orders[i] );

        var v0 = new Zia.Vector3(1, 0, 0);
        var qv = v0.clone().applyQuaternion( q );
        var mv = v0.clone().applyMatrix4( m );
      
        expect(qv.distanceTo(mv)).toBeLessThan(0.001);
      }
    }

  });

  it("equals", function() {
    var a = new Zia.Quaternion( x, y, z, w );
    var b = new Zia.Quaternion( -x, -y, -z, -w );
    
    expect(a.x).not.toEqual(b.x);
    expect(a.y).not.toEqual(b.y);

    expect(a.equals(b)).toBe(false);
    expect(b.equals(a)).toBe(false);

    a.copy( b );
    expect(a.x).toEqual(b.x);
    expect(a.y).toEqual(b.y);

    expect(a.equals(b)).toBe(true);
    expect(b.equals(a)).toBe(true);
  });
});

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

describe('Zia.Vector2', function() {
  var x = 2;
  var y = 3;

  it("constructor", function() {
    var a = new Zia.Vector2();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);

    a = new Zia.Vector2(x, y);
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
  });

  it("copy", function() {
    var a = new Zia.Vector2( x, y );
    var b = new Zia.Vector2().copy( a );
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);

    // ensure that it is a true copy
    a.x = 0;
    a.y = -1;
    expect(b.x).toBe(x);
    expect(b.y).toBe(y);
  });

  it("set", function() {
    var a = new Zia.Vector2();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);

    a.set( x, y );
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
  });

  it("x, y properties", function() {
    var a = new Zia.Vector2();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);

    a.x = x;
    a.y = y;
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
  });

  it("setComponent,getComponent", function() {
    var a = new Zia.Vector2();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);

    a.setComponent( 0, 1 );
    a.setComponent( 1, 2 );
    expect(a.getComponent(0)).toBe(1);
    expect(a.getComponent(1)).toBe(2);
  });

  it("add", function() {
    var a = new Zia.Vector2( x, y );
    var b = new Zia.Vector2( -x, -y );

    a.add( b );
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);

    var c = new Zia.Vector2().addVectors( b, b );
    expect(c.x).toBe(-2*x);
    expect(c.y).toBe(-2*y);
  });

  it("sub", function() {
    var a = new Zia.Vector2( x, y );
    var b = new Zia.Vector2( -x, -y );

    a.sub( b );
    expect(a.x).toBe(2*x);
    expect(a.y).toBe(2*y);

    var c = new Zia.Vector2().subVectors( a, a );
    expect(c.x).toBe(0);
    expect(c.y).toBe(0);
  });

  it("multiply/divide", function() {
    var a = new Zia.Vector2( x, y );
    var b = new Zia.Vector2( -x, -y );

    a.multiplyScalar( -2 );
    expect(a.x).toBe(x*-2);
    expect(a.y).toBe(y*-2);

    b.multiplyScalar( -2 );
    expect(b.x).toBe(x*2);
    expect(b.y).toBe(y*2);

    a.divideScalar( -2 );
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);

    b.divideScalar( -2 );
    expect(b.x).toBe(-x);
    expect(b.y).toBe(-y);
  });

  it("min/max/clamp", function() {
    var a = new Zia.Vector2( x, y );
    var b = new Zia.Vector2( -x, -y );
    var c = new Zia.Vector2();

    c.copy( a ).min( b );
    expect(c.x).toBe(-x);
    expect(c.y).toBe(-y);

    c.copy( a ).max( b );
    expect(c.x).toBe(x);
    expect(c.y).toBe(y);

    c.set( -2*x, 2*y );
    c.clamp( b, a );
    expect(c.x).toBe(-x);
    expect(c.y).toBe(y);

    c.set(-2*x, 2*x);
    c.clampScalar( -x, x );
    expect(c.x).toBe(-x);
    expect(c.y).toBe(x);
  });

  it("rounding", function() {
    expect(new Zia.Vector2( -0.1, 0.1 ).floor()).toEqual(new Zia.Vector2( -1, 0 ));
    expect(new Zia.Vector2( -0.5, 0.5 ).floor()).toEqual(new Zia.Vector2( -1, 0 ));
    expect(new Zia.Vector2( -0.9, 0.9 ).floor()).toEqual(new Zia.Vector2( -1, 0 ));

    expect(new Zia.Vector2( -0.1, 0.1 ).ceil()).toEqualVector2(new Zia.Vector2( 0, 1 ));
    expect(new Zia.Vector2( -0.5, 0.5 ).ceil()).toEqualVector2(new Zia.Vector2( 0, 1 ));
    expect(new Zia.Vector2( -0.9, 0.9 ).ceil()).toEqualVector2(new Zia.Vector2( 0, 1 ));

    expect(new Zia.Vector2( -0.1, 0.1 ).round()).toEqualVector2(new Zia.Vector2( 0, 0 ));
    expect(new Zia.Vector2( -0.5, 0.5 ).round()).toEqualVector2(new Zia.Vector2( 0, 1 ));
    expect(new Zia.Vector2( -0.9, 0.9 ).round()).toEqualVector2(new Zia.Vector2( -1, 1 ));

    expect(new Zia.Vector2( -0.1, 0.1 ).roundToZero()).toEqualVector2(new Zia.Vector2( 0, 0 ));
    expect(new Zia.Vector2( -0.5, 0.5 ).roundToZero()).toEqualVector2(new Zia.Vector2( 0, 0 ));
    expect(new Zia.Vector2( -0.9, 0.9 ).roundToZero()).toEqualVector2(new Zia.Vector2( 0, 0 ));
    expect(new Zia.Vector2( -1.1, 1.1 ).roundToZero()).toEqualVector2(new Zia.Vector2( -1, 1 ));
    expect(new Zia.Vector2( -1.5, 1.5 ).roundToZero()).toEqualVector2(new Zia.Vector2( -1, 1 ));
    expect(new Zia.Vector2( -1.9, 1.9 ).roundToZero()).toEqualVector2(new Zia.Vector2( -1, 1 ));
  });

  it("negate", function() {
    var a = new Zia.Vector2( x, y );

    a.negate();
    expect(a.x).toBe(-x);
    expect(a.y).toBe(-y);
  });

  it("dot", function() {
    var a = new Zia.Vector2( x, y );
    var b = new Zia.Vector2( -x, -y );
    var c = new Zia.Vector2();

    var result = a.dot( b );
    expect(result).toBe(-x*x-y*y);

    result = a.dot( c );
    expect(result).toBe(0);
  });

  it("length/lengthSq", function() {
    var a = new Zia.Vector2( x, 0 );
    var b = new Zia.Vector2( 0, -y );
    var c = new Zia.Vector2();

    expect(a.length()).toBe(x);
    expect(a.lengthSq()).toBe(x*x);
    expect(b.length()).toBe(y);
    expect(b.lengthSq()).toBe(y*y);
    expect(c.length()).toBe(0);
    expect(c.lengthSq()).toBe(0);

    a.set( x, y );
    expect(a.length()).toBe(Math.sqrt(x*x + y*y));
    expect(a.lengthSq()).toBe(x*x + y*y);
  });

  it("normalize", function() {
    var a = new Zia.Vector2( x, 0 );
    var b = new Zia.Vector2( 0, -y );
    var c = new Zia.Vector2();

    a.normalize();
    expect(a.length()).toBe(1);
    expect(a.x).toBe(1);

    b.normalize();
    expect(b.length()).toBe(1);
    expect(b.y).toBe(-1);
  });

  it("distanceTo/distanceToSquared", function() {
    var a = new Zia.Vector2( x, 0 );
    var b = new Zia.Vector2( 0, -y );
    var c = new Zia.Vector2();

    expect(a.distanceTo(c)).toBe(x);
    expect(a.distanceToSquared(c)).toBe(x*x);

    expect(b.distanceTo(c)).toBe(y);
    expect(b.distanceToSquared(c)).toBe(y*y);
  });

  it("setLength", function() {
    var a = new Zia.Vector2( x, 0 );

    expect(a.length()).toBe(x);
    a.setLength( y );
    expect(a.length()).toBe(y);

    a = new Zia.Vector2( 0, 0 );
    expect(a.length()).toBe(0);
    a.setLength(y);
    expect(a.length()).toBe(0);
  });

  it("lerp/clone", function() {
    var a = new Zia.Vector2( x, 0 );
    var b = new Zia.Vector2( 0, -y );

    expect(a.lerp(a, 0)).toEqual(a.lerp(a, 0.5));
    expect(a.lerp(a, 0)).toEqual(a.lerp(a, 1));

    expect(a.clone().lerp(b, 0)).toEqual(a);

    expect(a.clone().lerp(b, 0.5).x).toEqual(x*0.5);
    expect(a.clone().lerp(b, 0.5).y).toEqual(-y*0.5);

    expect(a.clone().lerp(b, 1)).toEqual(b);
  });

  it("equals", function() {
    var a = new Zia.Vector2( x, 0 );
    var b = new Zia.Vector2( 0, -y );

    expect(a.x).not.toEqual(b.x);
    expect(a.y).not.toEqual(b.y);

    expect(a.equals(b)).toBe(false);
    expect(b.equals(a)).toBe(false);

    a.copy(b);
    expect(a.x).toEqual(b.x);
    expect(a.y).toEqual(b.y);

    expect(a.equals(b)).toBe(true);
    expect(b.equals(a)).toBe(true);
  });
});


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

describe('Zia.Vector3', function() {
  var x = 2;
  var y = 3;
  var z = 4;

  it("has a constructor", function() {
    var a = new Zia.Vector3();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
    expect(a.z).toBe(0);

    a = new Zia.Vector3(x, y, z);
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
    expect(a.z).toBe(z);
  });

  describe('copy method', function() {
    it('copies another vector into this vector', function() {
      var a = new Zia.Vector3(x, y, z);
      var b = new Zia.Vector3().copy(a);
      expect(b.x).toBe(x);
      expect(b.y).toBe(y);
      expect(b.z).toBe(z);

      // ensure that it is a true copy
      a.x = 0;
      a.y = -1;
      a.z = -2;
      expect(b.x).toBe(x);
      expect(b.y).toBe(y);
      expect(b.z).toBe(z);
    });
  });

  describe('set method', function() {
    it("sets another vector into this vector", function() {
      var a = new Zia.Vector3();
      expect(a.x).toBe(0);
      expect(a.y).toBe(0);
      expect(a.z).toBe(0);

      a.set(x, y, z);
      expect(a.x).toBe(x);
      expect(a.y).toBe(y);
      expect(a.z).toBe(z);
    });
  });

  it( "x, y, z properties", function() {
    var a = new Zia.Vector3();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
    expect(a.z).toBe(0);

    a.x = x;
    a.y = y;
    a.z = z;
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
    expect(a.z).toBe(z);
  });

  describe('setComponent method and getComponent method', function() {
    it("sets or gets values at specified index", function() {
      var a = new Zia.Vector3();
      expect(a.x).toBe(0);
      expect(a.y).toBe(0);
      expect(a.z).toBe(0);

      a.setComponent(0, 1);
      a.setComponent(1, 2);
      a.setComponent(2, 3);
      expect(a.getComponent(0)).toBe(1);
      expect(a.getComponent(1)).toBe(2);
      expect(a.getComponent(2)).toBe(3);
    });
  });

  describe('add method and addVector method', function() {
    it("adds another vector to this vector", function() {
      var a = new Zia.Vector3(x, y, z);
      var b = new Zia.Vector3(-x, -y, -z);

      a.add(b);
      expect(a.x).toBe(0);
      expect(a.y).toBe(0);
      expect(a.z).toBe(0);

      var c = new Zia.Vector3().addVectors(b, b);
      expect(c.x).toBe(-2*x);
      expect(c.y).toBe(-2*y);
      expect(c.z).toBe(-2*z);
    });
  });

  it("sub and subVectors", function() {
    var a = new Zia.Vector3(x, y, z);
    var b = new Zia.Vector3(-x, -y, -z);

    a.sub(b);
    expect(a.x).toBe(2*x);
    expect(a.y).toBe(2*y);
    expect(a.z).toBe(2*z);

    var c = new Zia.Vector3().subVectors(a, a);
    expect(c.x).toBe(0);
    expect(c.y).toBe(0);
    expect(c.z).toBe(0);
  });

  it("multiply/divide", function() {
    var a = new Zia.Vector3(x, y, z);
    var b = new Zia.Vector3(-x, -y, -z);

    a.multiplyScalar(-2);
    expect(a.x).toBe(x*-2);
    expect(a.y).toBe(y*-2);
    expect(a.z).toBe(z*-2);

    b.multiplyScalar(-2);
    expect(b.x).toBe(x*2);
    expect(b.y).toBe(y*2);
    expect(b.z).toBe(z*2);

    a.divideScalar(-2);
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
    expect(a.z).toBe(z);

    b.divideScalar(-2);
    expect(b.x).toBe(-x);
    expect(b.y).toBe(-y);
    expect(b.z).toBe(-z);
  });

  it("min/max/clamp", function() {
    var a = new Zia.Vector3(x, y, z);
    var b = new Zia.Vector3(-x, -y, -z);
    var c = new Zia.Vector3();

    c.copy(a).min(b);
    expect(c.x).toBe(-x);
    expect(c.y).toBe(-y);
    expect(c.z).toBe(-z);

    c.copy(a).max(b);
    expect(c.x).toBe(x);
    expect(c.y).toBe(y);
    expect(c.z).toBe(z);

    c.set(-2*x, 2*y, -2*z);
    c.clamp(b, a);
    expect(c.x).toBe(-x);
    expect(c.y).toBe(y);
    expect(c.z).toBe(-z);
  });

  it("negate", function() {
    var a = new Zia.Vector3(x, y, z);

    a.negate();
    expect(a.x).toBe(-x);
    expect(a.y).toBe(-y);
    expect(a.z).toBe(-z);
  });

  it("dot", function() {
    var a = new Zia.Vector3(x, y, z);
    var b = new Zia.Vector3(-x, -y, -z);
    var c = new Zia.Vector3();

    var result = a.dot(b);
    expect(result).toBe(-x*x-y*y-z*z);

    result = a.dot(c);
    expect(result).toBe(0);
  });

  it("length/lengthSq", function() {
    var a = new Zia.Vector3(x, 0, 0);
    var b = new Zia.Vector3(0, -y, 0);
    var c = new Zia.Vector3(0, 0, z);
    var d = new Zia.Vector3();

    expect(a.length()).toBe(x);
    expect(a.lengthSq()).toBe(x*x);
    expect(b.length()).toBe(y);
    expect(b.lengthSq()).toBe(y*y);
    expect(c.length()).toBe(z);
    expect(c.lengthSq()).toBe(z*z);
    expect(d.length()).toBe(0);
    expect(d.lengthSq()).toBe(0);

    a.set(x, y, z);
    expect(a.length()).toBe(Math.sqrt(x*x + y*y + z*z));
    expect(a.lengthSq()).toBe(x*x + y*y + z*z);
  });

  it("normalize", function() {
    var a = new Zia.Vector3(x, 0, 0);
    var b = new Zia.Vector3(0, -y, 0);
    var c = new Zia.Vector3(0, 0, z);

    a.normalize();
    expect(a.length()).toBe(1);
    expect(a.x).toBe(1);

    b.normalize();
    expect(b.length()).toBe(1);
    expect(b.y).toBe(-1);

    c.normalize();
    expect(c.length()).toBe(1);
    expect(c.z).toBe(1);
  });

  it("distanceTo/distanceToSquared", function() {
    var a = new Zia.Vector3(x, 0, 0);
    var b = new Zia.Vector3(0, -y, 0);
    var c = new Zia.Vector3(0, 0, z);
    var d = new Zia.Vector3();

    expect(a.distanceTo(d)).toBe(x);
    expect(a.distanceToSquared(d)).toBe(x*x);

    expect(b.distanceTo(d)).toBe(y);
    expect(b.distanceToSquared(d)).toBe(y*y);

    expect(c.distanceTo(d)).toBe(z);
    expect(c.distanceToSquared(d)).toBe(z*z);
  });

  it("setLength", function() {
    var a = new Zia.Vector3(x, 0, 0);

    expect(a.length()).toBe(x);
    a.setLength(y);
    expect(a.length()).toBe(y);

    a = new Zia.Vector3(0, 0, 0);
    expect(a.length()).toBe(0);
    a.setLength(y);
    expect(a.length()).toBe(0);
  });

  it("projectOnVector", function() {
    var a = new Zia.Vector3(1, 0, 0);
    var b = new Zia.Vector3();
    var normal = new Zia.Vector3(10, 0, 0);

    expect(b.copy(a).projectOnVector(normal)).toEqual(new Zia.Vector3(1, 0, 0));

    a.set(0, 1, 0);
    expect(b.copy(a).projectOnVector(normal)).toEqual(new Zia.Vector3(0, 0, 0));

    a.set(0, 0, -1);
    expect(b.copy(a).projectOnVector(normal)).toEqual(new Zia.Vector3(0, 0, 0));

    a.set(-1, 0, 0);
    expect(b.copy(a).projectOnVector(normal)).toEqualVector3(new Zia.Vector3(-1, 0, 0));
  });

  it("projectOnPlane", function() {
    var a = new Zia.Vector3(1, 0, 0);
    var b = new Zia.Vector3();
    var normal = new Zia.Vector3(1, 0, 0);

    expect(b.copy(a).projectOnPlane(normal)).toEqual(new Zia.Vector3(0, 0, 0));

    a.set(0, 1, 0);
    expect(b.copy(a).projectOnPlane(normal)).toEqual(new Zia.Vector3(0, 1, 0));

    a.set(0, 0, -1);
    expect(b.copy(a).projectOnPlane(normal)).toEqual(new Zia.Vector3(0, 0, -1));

    a.set(-1, 0, 0);
    expect(b.copy(a).projectOnPlane(normal)).toEqual(new Zia.Vector3(0, 0, 0));
  });

  it("reflect", function() {
    var a = new Zia.Vector3();
    var normal = new Zia.Vector3(0, 1, 0);
    var b = new Zia.Vector3();

    a.set(0, -1, 0);
    expect(b.copy(a).reflect(normal)).toEqual(new Zia.Vector3(0, 1, 0));

    a.set(1, -1, 0);
    expect(b.copy(a).reflect(normal)).toEqual(new Zia.Vector3(1, 1, 0));

    a.set(1, -1, 0);
    normal.set(0, -1, 0);
    expect(b.copy(a).reflect(normal)).toEqual(new Zia.Vector3(1, 1, 0));
  });

  it("angleTo", function() {
    var a = new Zia.Vector3( 0, -0.18851655680720186, 0.9820700116639124 );
    var b = new Zia.Vector3( 0, 0.18851655680720186, -0.9820700116639124 );

    expect(a.angleTo(a)).toBe(0);
    expect(a.angleTo(b)).toBe(Math.PI);

    var x = new Zia.Vector3(1, 0, 0);
    var y = new Zia.Vector3(0, 1, 0);
    var z = new Zia.Vector3(0, 0, 1);

    expect(x.angleTo(y)).toBe(Math.PI / 2);
    expect(x.angleTo(z)).toBe(Math.PI / 2);
    expect(z.angleTo(x)).toBe(Math.PI / 2);

    expect(Math.abs(x.angleTo(new Zia.Vector3(1, 1, 0)) - (Math.PI / 4)))
      .toBeLessThan(0.0000001);
  });

  it("lerp/clone", function() {
    var a = new Zia.Vector3(x, 0, z);
    var b = new Zia.Vector3(0, -y, 0);

    expect(a.lerp(a, 0)).toEqual(a.lerp(a, 0.5));
    expect(a.lerp(a, 0)).toEqual(a.lerp(a, 1));

    expect(a.clone().lerp(b, 0)).toEqual(a);

    expect(a.clone().lerp(b, 0.5).x).toEqual(x*0.5);
    expect(a.clone().lerp(b, 0.5).y).toEqual(-y*0.5);
    expect(a.clone().lerp(b, 0.5).z).toEqual(z*0.5);

    expect(a.clone().lerp(b, 1)).toEqual(b);
  });

  it("equals", function() {
    var a = new Zia.Vector3(x, 0, z);
    var b = new Zia.Vector3(0, -y, 0);

    expect(a.x).not.toEqual(b.x);
    expect(a.y).not.toEqual(b.y);
    expect(a.z).not.toEqual(b.z);

    expect(a.equals(b)).toBe(false);
    expect(b.equals(a)).toBe(false);

    a.copy(b);
    expect(a.x).toEqual(b.x);
    expect(a.y).toEqual(b.y);
    expect(a.z).toEqual(b.z);

    expect(a.equals(b)).toBe(true);
    expect(b.equals(a)).toBe(true);
  });
});

/**
 * Original code from Zia.js project. https://github.com/mrdoob/Zia.js
 * Original code published with the following license:
 *
 * The MIT License
 * 
 * Copyright &copy; 2010-2014 Zia.js authors
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

describe('Zia.Vector4', function() {
  var x = 2;
  var y = 3;
  var z = 4;
  var w = 5;

  it( "constructor", function() {
    var a = new Zia.Vector4();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
    expect(a.z).toBe(0);
    expect(a.w).toBe(1);

    a = new Zia.Vector4( x, y, z, w );
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
    expect(a.z).toBe(z);
    expect(a.w).toBe(w);
  });

  it( "copy", function() {
    var a = new Zia.Vector4( x, y, z, w );
    var b = new Zia.Vector4().copy( a );
    expect(b.x).toBe(x);
    expect(b.y).toBe(y);
    expect(b.z).toBe(z);
    expect(b.w).toBe(w);

    // ensure that it is a true copy
    a.x = 0;
    a.y = -1;
    a.z = -2;
    a.w = -3;
    expect(b.x).toBe(x);
    expect(b.y).toBe(y);
    expect(b.z).toBe(z);
    expect(b.w).toBe(w);
  });

  it( "set", function() {
    var a = new Zia.Vector4();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
    expect(a.z).toBe(0);
    expect(a.w).toBe(1);

    a.set( x, y, z, w );
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
    expect(a.z).toBe(z);
    expect(a.w).toBe(w);
  });

  it( "setComponent,getComponent", function() {
    var a = new Zia.Vector4();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
    expect(a.z).toBe(0);
    expect(a.w).toBe(1);

    a.setComponent( 0, 1 );
    a.setComponent( 1, 2 );
    a.setComponent( 2, 3 );
    a.setComponent( 3, 4 );
    expect( a.getComponent( 0 )).toBe(1);
    expect( a.getComponent( 1 )).toBe(2);
    expect( a.getComponent( 2 )).toBe(3);
    expect( a.getComponent( 3 )).toBe(4);
  });

  it( "add", function() {
    var a = new Zia.Vector4( x, y, z, w );
    var b = new Zia.Vector4( -x, -y, -z, -w );

    a.add( b );
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
    expect(a.z).toBe(0);
    expect(a.w).toBe(0);

    var c = new Zia.Vector4().addVectors( b, b );
    expect(c.x).toBe(-2*x);
    expect(c.y).toBe(-2*y);
    expect(c.z).toBe(-2*z);
    expect(c.w).toBe(-2*w);
  });

  it( "sub", function() {
    var a = new Zia.Vector4( x, y, z, w );
    var b = new Zia.Vector4( -x, -y, -z, -w );

    a.sub( b );
    expect(a.x).toBe(2*x);
    expect(a.y).toBe(2*y);
    expect(a.z).toBe(2*z);
    expect(a.w).toBe(2*w);

    var c = new Zia.Vector4().subVectors( a, a );
    expect(c.x).toBe(0);
    expect(c.y).toBe(0);
    expect(c.z).toBe(0);
    expect(c.w).toBe(0);
  });

  it( "multiply/divide", function() {
    var a = new Zia.Vector4( x, y, z, w );
    var b = new Zia.Vector4( -x, -y, -z, -w );

    a.multiplyScalar( -2 );
    expect(a.x).toBe(x*-2);
    expect(a.y).toBe(y*-2);
    expect(a.z).toBe(z*-2);
    expect(a.w).toBe(w*-2);

    b.multiplyScalar( -2 );
    expect(b.x).toBe(2*x);
    expect(b.y).toBe(2*y);
    expect(b.z).toBe(2*z);
    expect(b.w).toBe(2*w);

    a.divideScalar( -2 );
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
    expect(a.z).toBe(z);
    expect(a.w).toBe(w);

    b.divideScalar( -2 );
    expect(b.x).toBe(-x);
    expect(b.y).toBe(-y);
    expect(b.z).toBe(-z);
    expect(b.w).toBe(-w);
  });

  it( "min/max/clamp", function() {
    var a = new Zia.Vector4( x, y, z, w );
    var b = new Zia.Vector4( -x, -y, -z, -w );
    var c = new Zia.Vector4();

    c.copy( a ).min( b );
    expect(c.x).toBe(-x);
    expect(c.y).toBe(-y);
    expect(c.z).toBe(-z);
    expect(c.w).toBe(-w);

    c.copy( a ).max( b );
    expect(c.x).toBe(x);
    expect(c.y).toBe(y);
    expect(c.z).toBe(z);
    expect(c.w).toBe(w);

    c.set( -2*x, 2*y, -2*z, 2*w );
    c.clamp( b, a );
    expect(c.x).toBe(-x);
    expect(c.y).toBe(y);
    expect(c.z).toBe(-z);
    expect(c.w).toBe(w);
  });

  it( "negate", function() {
    var a = new Zia.Vector4( x, y, z, w );

    a.negate();
    expect(a.x).toBe(-x);
    expect(a.y).toBe(-y);
    expect(a.z).toBe(-z);
    expect(a.w).toBe(-w);
  });

  it( "dot", function() {
    var a = new Zia.Vector4( x, y, z, w );
    var b = new Zia.Vector4( -x, -y, -z, -w );
    var c = new Zia.Vector4( 0, 0, 0, 0 );

    var result = a.dot( b );
    expect(result).toBe(-x*x-y*y-z*z-w*w);

    result = a.dot(c);
    expect(result).toBe(0);
  });

  it( "length/lengthSq", function() {
    var a = new Zia.Vector4( x, 0, 0, 0 );
    var b = new Zia.Vector4( 0, -y, 0, 0 );
    var c = new Zia.Vector4( 0, 0, z, 0 );
    var d = new Zia.Vector4( 0, 0, 0, w );
    var e = new Zia.Vector4( 0, 0, 0, 0 );
    
    expect(a.length()).toBe(x);
    expect(a.lengthSq()).toBe(x*x);
    expect(b.length()).toBe(y);
    expect(b.lengthSq()).toBe(y*y);
    expect(c.length()).toBe(z);
    expect(c.lengthSq()).toBe(z*z);
    expect(d.length()).toBe(w);
    expect(d.lengthSq()).toBe(w*w);
    expect(e.length()).toBe(0);
    expect(e.lengthSq()).toBe(0);

    a.set( x, y, z, w );
    expect(a.length()).toBe(Math.sqrt( x*x + y*y + z*z + w*w ));
    expect(a.lengthSq()).toBe(x*x + y*y + z*z + w*w);
  });

  it( "normalize", function() {
    var a = new Zia.Vector4( x, 0, 0, 0 );
    var b = new Zia.Vector4( 0, -y, 0, 0 );
    var c = new Zia.Vector4( 0, 0, z, 0 );
    var d = new Zia.Vector4( 0, 0, 0, -w );
    
    a.normalize();
    expect( a.length()).toBe(1);
    expect( a.x).toBe(1);

    b.normalize();
    expect( b.length()).toBe(1);
    expect( b.y).toBe(-1);

    c.normalize();
    expect( c.length()).toBe(1);
    expect( c.z).toBe(1);

    d.normalize();
    expect( d.length()).toBe(1);
    expect( d.w).toBe(-1);
  });

  /*
  test( "distanceTo/distanceToSquared", function() {
    var a = new Zia.Vector4( x, 0, 0, 0 );
    var b = new Zia.Vector4( 0, -y, 0, 0 );
    var c = new Zia.Vector4( 0, 0, z, 0 );
    var d = new Zia.Vector4( 0, 0, 0, -w );
    var e = new Zia.Vector4();
    
    ok( a.distanceTo( e ) == x, "Passed!" );
    ok( a.distanceToSquared( e ) == x*x, "Passed!" );

    ok( b.distanceTo( e ) == y, "Passed!" );
    ok( b.distanceToSquared( e ) == y*y, "Passed!" );

    ok( c.distanceTo( e ) == z, "Passed!" );
    ok( c.distanceToSquared( e ) == z*z, "Passed!" );

    ok( d.distanceTo( e ) == w, "Passed!" );
    ok( d.distanceToSquared( e ) == w*w, "Passed!" );
  });
  */


  it( "setLength", function() {
    var a = new Zia.Vector4( x, 0, 0, 0 );

    expect(a.length()).toBe(x);
    a.setLength( y );
    expect(a.length()).toBe(y);

    a = new Zia.Vector4( 0, 0, 0, 0 );
    expect(a.length()).toBe(0);
    a.setLength( y );
    expect(a.length()).toBe(0);
  });

  it( "lerp/clone", function() {
    var a = new Zia.Vector4( x, 0, z, 0 );
    var b = new Zia.Vector4( 0, -y, 0, -w );

    expect( a.lerp( a, 0 ).equals( a.lerp( a, 0.5 ))).toBe(true);
    expect( a.lerp( a, 0 ).equals( a.lerp( a, 1 ))).toBe(true);

    expect( a.clone().lerp( b, 0 ).equals( a )).toBe(true);

    expect( a.clone().lerp( b, 0.5 ).x).toBe(x*0.5);
    expect( a.clone().lerp( b, 0.5 ).y).toBe(-y*0.5);
    expect( a.clone().lerp( b, 0.5 ).z).toBe(z*0.5);
    expect( a.clone().lerp( b, 0.5 ).w).toBe(-w*0.5);

    expect( a.clone().lerp( b, 1 ).equals( b )).toBe(true);
  });

  it( "equals", function() {
    var a = new Zia.Vector4( x, 0, z, 0 );
    var b = new Zia.Vector4( 0, -y, 0, -w );

    expect( a.x).not.toBe(b.x);
    expect( a.y).not.toBe(b.y);
    expect( a.z).not.toBe(b.z);
    expect( a.w).not.toBe(b.w);

    expect( a.equals( b )).toBe(false);
    expect( b.equals( a )).toBe(false);

    a.copy( b );
    expect( a.x).toBe(b.x);
    expect( a.y).toBe(b.y);
    expect( a.z).toBe(b.z);
    expect( a.w).toBe(b.w);

    expect( a.equals( b )).toBe(true);
    expect( b.equals( a )).toBe(true);
  });
});

describe('Zia', function() {
  it('should exist', function() {
    expect(Zia).not.toBeNull();
  });
});

describe('Zia.GeometricPrimitive.createCube', function() {
  it('should create a primitive', function() {
    var result = Zia.GeometricPrimitive.createCube();

    expect(result.positions.length).toBe(24);
    expect(result.positions[0].x).toBe(0.5);
    expect(result.positions[0].y).toBe(0.5);
    expect(result.positions[0].z).toBe(0.5);
    expect(result.normals.length).toBe(24);
    expect(result.normals[0].x).toBe(0);
    expect(result.normals[0].y).toBe(0);
    expect(result.normals[0].z).toBe(1);
    expect(result.textureCoordinates.length).toBe(24);
    expect(result.textureCoordinates[0].x).toBe(1);
    expect(result.textureCoordinates[0].y).toBe(1);
    expect(result.indices.length).toBe(36);
    expect(result.indices[0]).toBe(0);
  });
});

describe('Zia.GeometricPrimitive.createCylinder', function() {
  it('should create a primitive', function() {
    var result = Zia.GeometricPrimitive.createCylinder();

    expect(result.positions.length).toBe(130);
    expect(result.positions[0].x).toBe(0);
    expect(result.positions[0].y).toBe(0.5);
    expect(result.positions[0].z).toBe(0.5);
    expect(result.normals.length).toBe(130);
    expect(result.normals[0].x).toBe(0);
    expect(result.normals[0].y).toBe(0);
    expect(result.normals[0].z).toBe(1);
    expect(result.textureCoordinates.length).toBe(130);
    expect(result.textureCoordinates[0].x).toBe(0);
    expect(result.textureCoordinates[0].y).toBe(1);
    expect(result.indices.length).toBe(378);
    expect(result.indices[0]).toBe(0);
  });
});

describe('Zia.GeometricPrimitive.createPlane', function() {
  it('should create a primitive', function() {
    var result = Zia.GeometricPrimitive.createPlane();

    expect(result.positions.length).toBe(4);
    expect(result.positions[0].x).toBe(-0.5);
    expect(result.positions[0].y).toBe(0);
    expect(result.positions[0].z).toBe(0.5);
    expect(result.normals.length).toBe(4);
    expect(result.normals[0].x).toBe(0);
    expect(result.normals[0].y).toBe(1);
    expect(result.normals[0].z).toBe(0);
    expect(result.textureCoordinates.length).toBe(4);
    expect(result.textureCoordinates[0].x).toBe(1);
    expect(result.textureCoordinates[0].y).toBe(1);
    expect(result.indices.length).toBe(6);
    expect(result.indices[0]).toBe(1);
  });
});

describe('Zia.GeometricPrimitive.createSphere', function() {
  it('should create a primitive', function() {
    var result = Zia.GeometricPrimitive.createSphere();

    expect(result.positions.length).toBe(561);
    expect(result.positions[0].x).toBe(0.0);
    expect(result.positions[0].y).toBe(-0.5);
    expect(result.positions[0].z).toBeCloseTo(0.0, 2);
    expect(result.normals.length).toBe(561);
    expect(result.normals[0].x).toBe(0);
    expect(result.normals[0].y).toBe(-1);
    expect(result.normals[0].z).toBeCloseTo(0.0, 2);
    expect(result.textureCoordinates.length).toBe(561);
    expect(result.textureCoordinates[0].x).toBe(0);
    expect(result.textureCoordinates[0].y).toBe(0);
    expect(result.indices.length).toBe(3168);
    expect(result.indices[0]).toBe(0);
  });
});

describe('Zia.GeometricPrimitive.createTeapot', function() {
  it('should create a primitive', function() {
    var result = Zia.GeometricPrimitive.createTeapot();

    expect(result.positions.length).toBe(2592);
    expect(result.positions[0].x).toBe(0);
    expect(result.positions[0].y).toBe(0.27);
    expect(result.positions[0].z).toBe(-0.35);
    expect(result.normals.length).toBe(2592);
    expect(result.normals[0].x).toBe(0);
    expect(result.normals[0].y).toBeCloseTo(-0.43, 2);
    expect(result.normals[0].z).toBeCloseTo(0.90, 2);
    expect(result.textureCoordinates.length).toBe(2592);
    expect(result.textureCoordinates[0].x).toBe(0);
    expect(result.textureCoordinates[0].y).toBe(1);
    expect(result.indices.length).toBe(12288);
    expect(result.indices[0]).toBe(0);
  });
});

describe('Zia.GeometricPrimitive.createTorus', function() {
  it('should create a primitive', function() {
    var result = Zia.GeometricPrimitive.createTorus();

    expect(result.positions.length).toBe(1089);
    expect(result.positions[0].x).toBeCloseTo(0.00, 2);
    expect(result.positions[0].y).toBeCloseTo(0.00, 2);
    expect(result.positions[0].z).toBeCloseTo(0.33, 2);
    expect(result.normals.length).toBe(1089);
    expect(result.normals[0].x).toBeCloseTo(0.00, 2);
    expect(result.normals[0].y).toBeCloseTo(0.00, 2);
    expect(result.normals[0].z).toBeCloseTo(-1.00, 2);
    expect(result.textureCoordinates.length).toBe(1089);
    expect(result.textureCoordinates[0].x).toBe(0);
    expect(result.textureCoordinates[0].y).toBe(0);
    expect(result.indices.length).toBe(6534);
    expect(result.indices[0]).toBe(0);
  });
});

describe('Zia.EnvironmentMapProgram', function() {
  var graphicsDevice;

  beforeEach(function() {
    graphicsDevice = new Zia.GraphicsDevice(this.canvas);
  });

  describe('with default parameters', function() {

    it('should be valid', function() {
      var result = new Zia.EnvironmentMapProgram(graphicsDevice);
      expect(result.fresnelFactor).toBe(1);
    });
  });
});