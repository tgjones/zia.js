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

  it( "constructor", function() {
    var a = new Zia.Matrix4();
    expect(a.determinant()).toBe(1);

    var b = new Zia.Matrix4( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 );
    expect(b.elements[0]).toBe(0 );
    expect(b.elements[1]).toBe(4 );
    expect(b.elements[2]).toBe(8 );
    expect(b.elements[3]).toBe(12);
    expect(b.elements[4]).toBe(1 );
    expect(b.elements[5]).toBe(5 );
    expect(b.elements[6]).toBe(9 );
    expect(b.elements[7]).toBe(13);
    expect(b.elements[8]).toBe(2 );
    expect(b.elements[9]).toBe(6 );
    expect(b.elements[10]).toBe(10 );
    expect(b.elements[11]).toBe(14 );
    expect(b.elements[12]).toBe(3 );
    expect(b.elements[13]).toBe(7 );
    expect(b.elements[14]).toBe(11 );
    expect(b.elements[15]).toBe(15 );

    expect(a).not.toEqualMatrix4(b);
  });

  it( "copy", function() {
    var a = new Zia.Matrix4( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 );
    var b = new Zia.Matrix4().copy( a );

    expect(a).toEqualMatrix4(b);

    // ensure that it is a true copy
    a.elements[0] = 2;
    expect(a).not.toEqualMatrix4(b);
  });

  it( "set", function() {
    var b = new Zia.Matrix4();
    expect( b.determinant()).toBe(1);

    b.set( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 );
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
  });

  it( "identity", function() {
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

    var a = new Zia.Matrix4();
    expect(a).not.toEqualMatrix4(b);

    b.identity();
    expect(a).toEqualMatrix4(b);
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
    var a = new Zia.Matrix4();
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
    var identity = new Zia.Matrix4();

    var a = new Zia.Matrix4();
    var b = new Zia.Matrix4( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );
    var c = new Zia.Matrix4( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );

    expect(a).not.toEqualMatrix4(b);
    Zia.Matrix4.invert(b, a);
    expect(b).toEqualMatrix4(new Zia.Matrix4());

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
      new Zia.Matrix4().makeFrustum( -1, 1, -1, 1, 1, 1000 ),
      new Zia.Matrix4().makeFrustum( -16, 16, -9, 9, 0.1, 10000 ),
      Zia.Matrix4.createTranslation(new Zia.Vector3(1, 2, 3), new Zia.Matrix4())
      ];

    for( var i = 0, il = testMatrices.length; i < il; i ++ ) {
      var m = testMatrices[i];

      var mInverse = Zia.Matrix4.invert(m, new Zia.Matrix4());
      var mSelfInverse = m.clone();
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
    var b = a.clone().transpose();
    expect(a).toEqualMatrix4(b);

    b = new Zia.Matrix4( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 );
    var c = b.clone().transpose();
    expect(b).not.toEqualMatrix4(c);
    c.transpose();
    expect(b).toEqualMatrix4(c);
  });

  it( "clone", function() {
    var a = new Zia.Matrix4( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 );
    var b = a.clone();

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

          var m = new Zia.Matrix4().compose( t, r, s );
          var t2 = new Zia.Vector3();
          var r2 = new Zia.Quaternion();
          var s2 = new Zia.Vector3();

          m.decompose( t2, r2, s2 );

          var m2 = new Zia.Matrix4().compose( t2, r2, s2 );
          expect(m).toEqualMatrix4(m2);
        }
      }
    }
  });
});