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
      var q = Zia.Quaternion.createFromEuler( v, new Zia.Quaternion() );

      var v2 = new Zia.Euler().setFromQuaternion( q, v.order );
      var q2 = Zia.Quaternion.createFromEuler( v2, new Zia.Quaternion() );
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
      var q = Zia.Quaternion.createFromEuler( v, new Zia.Quaternion() );

      v.reorder( 'YZX' );
      var q2 = Zia.Quaternion.createFromEuler( v, new Zia.Quaternion() );
      expect(q).toEqualQuaternion(q2);

      v.reorder( 'ZXY' );
      var q3 = Zia.Quaternion.createFromEuler(v, new Zia.Quaternion());
      expect(q).toEqualQuaternion(q3);
    }
  });
});
