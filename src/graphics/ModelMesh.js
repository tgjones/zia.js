Zia.ModelMesh = function(graphicsDevice, meshParts) {
  this.graphicsDevice = graphicsDevice;
  this.meshParts = meshParts;

  for (var i = 0; i < meshParts.length; i++) {
    meshParts[i]._parent = this;
  }

  this.programs = [];
}

Zia.ModelMesh.prototype = {

  draw: function() {

    for (var i = 0; i < this.meshParts.length; i++) {

      var meshPart = this.meshParts[i];
      var program = meshPart.program;

      if (meshPart.indexCount > 0) {

        this.graphicsDevice.setVertexBuffer(meshPart.vertexBuffer);
        this.graphicsDevice.setIndexBuffer(meshPart.indexBuffer);

        program.apply();

        this.graphicsDevice.drawIndexedPrimitives(
          Zia.PrimitiveType.TriangleList,
          meshPart.startIndex, meshPart.indexCount);

      }

    }

  }

};