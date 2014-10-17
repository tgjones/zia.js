Zia.GeometricPrimitive = {

  convertToModel: function(graphicsDevice, primitive) {
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

    var program = new Zia.BasicProgram(graphicsDevice);

    var model = new Zia.Model(
      [
        new Zia.ModelMesh(graphicsDevice,
          [
            new Zia.ModelMeshPart({
              indexBuffer: indexBuffer,
              startIndex: 0,
              indexCount: primitive.indices.length,
              vertexBuffer: vertexBuffer
            })
          ])
      ]);

    for (var i = 0; i < model.meshes.length; i++) {
      var mesh = model.meshes[i];
      for (var j = 0; j < mesh.meshParts.length; j++) {
        mesh.meshParts[j].program = program;
      }
    }

    return model;
  }

};