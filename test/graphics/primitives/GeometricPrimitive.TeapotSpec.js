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
    expect(result.textureCoordinates[0].y).toBe(0);
    expect(result.indices.length).toBe(12288);
    expect(result.indices[0]).toBe(0);
  });
});