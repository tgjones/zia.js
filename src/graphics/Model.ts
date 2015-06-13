module Zia {
  export class Model {
    constructor(public meshes: ModelMesh[]) {

    }

    draw(modelMatrix: Matrix4, viewMatrix: Matrix4, projectionMatrix: Matrix4, programOverride: Program = null) {
      for (var i = 0; i < this.meshes.length; i++) {
        var mesh = this.meshes[i];

        for (var j = 0; j < mesh.programs.length; j++) {
          var program: any = programOverride || mesh.programs[j];

          program.modelMatrix = modelMatrix;
          program.viewMatrix = viewMatrix;
          program.projectionMatrix = projectionMatrix;
        }

        mesh.draw(programOverride);
      }
    }
  }
}
