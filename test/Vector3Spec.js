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

  describe('add method and addVector method', function() {
    it("adds another vector to this vector", function() {
      var a = new Zia.Vector3(x, y, z);
      var b = new Zia.Vector3(-x, -y, -z);

      Zia.Vector3.add(a, b, a);
      expect(a.x).toBe(0);
      expect(a.y).toBe(0);
      expect(a.z).toBe(0);

      var c = Zia.Vector3.add(b, b, new Zia.Vector3());
      expect(c.x).toBe(-2*x);
      expect(c.y).toBe(-2*y);
      expect(c.z).toBe(-2*z);
    });
  });

  it("sub and subVectors", function() {
    var a = new Zia.Vector3(x, y, z);
    var b = new Zia.Vector3(-x, -y, -z);

    Zia.Vector3.subtract(a, b, a);
    expect(a.x).toBe(2*x);
    expect(a.y).toBe(2*y);
    expect(a.z).toBe(2*z);

    var c = Zia.Vector3.subtract(a, a, new Zia.Vector3());
    expect(c.x).toBe(0);
    expect(c.y).toBe(0);
    expect(c.z).toBe(0);
  });

  it("multiply/divide", function() {
    var a = new Zia.Vector3(x, y, z);
    var b = new Zia.Vector3(-x, -y, -z);

    Zia.Vector3.multiplyScalar(a, -2, a);
    expect(a.x).toBe(x*-2);
    expect(a.y).toBe(y*-2);
    expect(a.z).toBe(z*-2);

    Zia.Vector3.multiplyScalar(b, -2, b);
    expect(b.x).toBe(x*2);
    expect(b.y).toBe(y*2);
    expect(b.z).toBe(z*2);

    Zia.Vector3.divideScalar(a, -2, a);
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
    expect(a.z).toBe(z);

    Zia.Vector3.divideScalar(b, -2, b);
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

    expect(a.clone(new Zia.Vector3()).lerp(b, 0)).toEqual(a);

    expect(a.clone(new Zia.Vector3()).lerp(b, 0.5).x).toEqual(x*0.5);
    expect(a.clone(new Zia.Vector3()).lerp(b, 0.5).y).toEqual(-y*0.5);
    expect(a.clone(new Zia.Vector3()).lerp(b, 0.5).z).toEqual(z*0.5);

    expect(a.clone(new Zia.Vector3()).lerp(b, 1)).toEqual(b);
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
