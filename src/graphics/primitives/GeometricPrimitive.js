Zia.GeometricPrimitive = {

  createVertexAndIndexBuffers: function(graphicsDevice, primitive) {
    var vertexData = [];
    for (var i = 0; i < primitive.positions.length; i++) {
      vertexData.push(primitive.positions[i].x);
      vertexData.push(primitive.positions[i].y);
      vertexData.push(primitive.positions[i].z);
      vertexData.push(primitive.normals[i].x);
      vertexData.push(primitive.normals[i].y);
      vertexData.push(primitive.normals[i].z);
      vertexData.push(primitive.textureCoordinates[i].x);
      vertexData.push(primitive.textureCoordinates[i].y);
    }

    var vertices = new Float32Array(vertexData);

    var vertexBuffer = new Zia.VertexBuffer(graphicsDevice,
      new Zia.VertexDeclaration(
      [
        new Zia.VertexElement("aVertexPosition", 3, 0),
        new Zia.VertexElement("aVertexNormal", 3, 3 * 4),
        new Zia.VertexElement("aTextureCoord", 2, 6 * 4)
      ]),
      vertices);

    var indexBuffer = new Zia.IndexBuffer(graphicsDevice,
      new Uint16Array(primitive.indices));

    // TODO: Create Model and ModelMesh classes.
    return {
      vertexBuffer: vertexBuffer,
      indexBuffer: indexBuffer
    };
  }

};