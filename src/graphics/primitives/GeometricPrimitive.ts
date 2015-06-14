module Zia.GeometricPrimitive {
  export interface IVector {
    toArray: () => number[];
  }

  export function mergeVertexData(...arrays: IVector[][]) {
    var vertexData: number[] = [];

    if (arrays.length < 1) {
      throw "You must pass at least one array in to mergeVertexData";
    }

    var vertexCount = arrays[0].length;
    for (var i = 1; i < arrays.length; i++) {
      if (arrays[i].length !== vertexCount) {
        throw "All arrays passed in must have the same length";
      }
    }

    for (var i = 0; i < vertexCount; i++) {
      for (var j = 0; j < arrays.length; j++) {
        Array.prototype.push.apply(vertexData, arrays[j][i].toJS());
      }
    }

    return vertexData;
  }

  export interface IPrimitive {
    positions: Vector3[];
    normals: Vector3[];
    textureCoordinates: Vector2[];
    indices: number[];
  }

  export function convertToModel(graphicsDevice: GraphicsDevice, primitive: IPrimitive) {
    var vertexData = Zia.GeometricPrimitive.mergeVertexData(
      primitive.positions, primitive.normals,
      primitive.textureCoordinates);

    var vertices = new Float32Array(vertexData);

    var vertexBuffer = new VertexBuffer(graphicsDevice,
      new VertexDeclaration(
      [
        new VertexElement("aVertexPosition", 3, 0),
        new VertexElement("aVertexNormal", 3, 3 * 4),
        new VertexElement("aTextureCoord", 2, 6 * 4)
      ]),
      vertices);

    var indexBuffer = new IndexBuffer(graphicsDevice,
      new Uint16Array(primitive.indices));

    var program = new BasicProgram(graphicsDevice);

    var model = new Model(
      [
        new ModelMesh(graphicsDevice,
          [
            new ModelMeshPart({
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
}
