module Zia {
  export class ModelMesh {
    public programs: Program[];

    constructor(public graphicsDevice: GraphicsDevice, public meshParts: ModelMeshPart[]) {
      for (var i = 0; i < meshParts.length; i++) {
        meshParts[i]._parent = this;
      }

      this.programs = [];
    }

    draw(programOverride: Program = null) {
      for (var i = 0; i < this.meshParts.length; i++) {
        var meshPart = this.meshParts[i];
        var program = programOverride || meshPart.program;

        if (meshPart.indexCount > 0) {
          this.graphicsDevice.setVertexBuffer(meshPart.vertexBuffer);
          this.graphicsDevice.setIndexBuffer(meshPart.indexBuffer);

          program.apply();

          this.graphicsDevice.drawIndexedPrimitives(
            PrimitiveType.TriangleList,
            meshPart.startIndex, meshPart.indexCount);
        }
      }
    }
  }
}
