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