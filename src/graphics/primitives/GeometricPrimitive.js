Zia.GeometricPrimitive = {

  mergeVertexData: function() {
    var vertexData = [];

    if (arguments.length < 1) {
      throw "You must pass at least one array in to mergeVertexData";
    }

    var vertexCount = arguments[0].length;
    for (var i = 1; i < arguments.length; i++) {
      if (arguments[i].length !== vertexCount) {
        throw "All arrays passed in must have the same length";
      }
    }

    for (var i = 0; i < vertexCount; i++) {
      for (var j = 0; j < arguments.length; j++) {
        Array.prototype.push.apply(vertexData, arguments[j][i].toArray());
      }
    }

    return vertexData;
  },

  convertToModel: function(graphicsDevice, primitive) {
    var vertexData = Zia.GeometricPrimitive.mergeVertexData(
      primitive.positions, primitive.normals,
      primitive.textureCoordinates);

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