Zia.Model = function(meshes) {
  this.meshes = meshes;
};

Zia.Model.prototype = {

  draw: function(modelMatrix, viewMatrix, projectionMatrix) {
    for (var i = 0; i < this.meshes.length; i++) {
      var mesh = this.meshes[i];

      for (var j = 0; j < mesh.programs.length; j++) {
        var program = mesh.programs[j];

        program.modelMatrix = modelMatrix;
        program.viewMatrix = viewMatrix;
        program.projectionMatrix = projectionMatrix;
      }

      mesh.draw();
    }
  }

};