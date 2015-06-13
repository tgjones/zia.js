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
