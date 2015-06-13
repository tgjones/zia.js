var Zia;
(function (Zia) {
    var Model = (function () {
        function Model(meshes) {
            this.meshes = meshes;
        }
        Model.prototype.draw = function (modelMatrix, viewMatrix, projectionMatrix, programOverride) {
            if (programOverride === void 0) { programOverride = null; }
            for (var i = 0; i < this.meshes.length; i++) {
                var mesh = this.meshes[i];
                for (var j = 0; j < mesh.programs.length; j++) {
                    var program = programOverride || mesh.programs[j];
                    program.modelMatrix = modelMatrix;
                    program.viewMatrix = viewMatrix;
                    program.projectionMatrix = projectionMatrix;
                }
                mesh.draw(programOverride);
            }
        };
        return Model;
    })();
    Zia.Model = Model;
})(Zia || (Zia = {}));
