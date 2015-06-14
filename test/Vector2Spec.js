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

  it("add", function() {
    var a = new Zia.Vector2( x, y );
    var b = new Zia.Vector2( -x, -y );

    a.add( b );
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);

    var c = Zia.Vector2.add( b, b );
    expect(c.x).toBe(-2*x);
    expect(c.y).toBe(-2*y);
  });

  it("subtract", function() {
    var a = new Zia.Vector2( x, y );
    var b = new Zia.Vector2( -x, -y );

    a.subtract( b );
    expect(a.x).toBe(2*x);
    expect(a.y).toBe(2*y);

    var c = Zia.Vector2.subtract( a, a );
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
