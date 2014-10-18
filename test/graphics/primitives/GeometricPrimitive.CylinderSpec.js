describe('Zia.GeometricPrimitive.createCylinder', function() {
  it('should create a primitive', function() {
    var result = Zia.GeometricPrimitive.createCylinder();

    expect(result.positions.length).toBe(130);
    expect(result.positions[0].x).toBe(0);
    expect(result.positions[0].y).toBe(0.5);
    expect(result.positions[0].z).toBe(0.5);
    expect(result.normals.length).toBe(130);
    expect(result.normals[0].x).toBe(0);
    expect(result.normals[0].y).toBe(0);
    expect(result.normals[0].z).toBe(1);
    expect(result.textureCoordinates.length).toBe(130);
    expect(result.textureCoordinates[0].x).toBe(0);
    expect(result.textureCoordinates[0].y).toBe(1);
    expect(result.indices.length).toBe(378);
    expect(result.indices[0]).toBe(0);
  });
});