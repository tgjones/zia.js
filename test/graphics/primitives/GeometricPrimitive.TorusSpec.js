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
    expect(result.textureCoordinates[0].y).toBe(1);
    expect(result.indices.length).toBe(6534);
    expect(result.indices[0]).toBe(0);
  });
});