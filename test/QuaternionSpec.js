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