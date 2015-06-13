var Zia;
(function (Zia) {
    var ModelMesh = (function () {
        function ModelMesh(graphicsDevice, meshParts) {
            this.graphicsDevice = graphicsDevice;
            this.meshParts = meshParts;
            for (var i = 0; i < meshParts.length; i++) {
                meshParts[i]._parent = this;
            }
            this.programs = [];
        }
        ModelMesh.prototype.draw = function (programOverride) {
            if (programOverride === void 0) { programOverride = null; }
            for (var i = 0; i < this.meshParts.length; i++) {
                var meshPart = this.meshParts[i];
                var program = programOverride || meshPart.program;
                if (meshPart.indexCount > 0) {
                    this.graphicsDevice.setVertexBuffer(meshPart.vertexBuffer);
                    this.graphicsDevice.setIndexBuffer(meshPart.indexBuffer);
                    program.apply();
                    this.graphicsDevice.drawIndexedPrimitives(4 /* TriangleList */, meshPart.startIndex, meshPart.indexCount);
                }
            }
        };
        return ModelMesh;
    })();
    Zia.ModelMesh = ModelMesh;
})(Zia || (Zia = {}));
