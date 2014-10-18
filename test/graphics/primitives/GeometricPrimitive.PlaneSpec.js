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