// Based on EffectHelpers from XNA. Original licence follows:
//-----------------------------------------------------------------------------
// EffectHelpers.cs
//
// Microsoft XNA Community Game Platform
// Copyright (C) Microsoft Corporation. All rights reserved.
//-----------------------------------------------------------------------------

module Zia {
  export const enum ProgramDirtyFlags {
    ModelViewProj          = 1,
    Model                  = 2,
    EyePosition            = 4,
    MaterialColor          = 8,
    SpecularColor          = 16,
    SpecularPower          = 32,
    EnvironmentMapAmount   = 64,
    EnvironmentMapSpecular = 128,
    FresnelFactor          = 256,
    All                    = -1
  }

  export var ProgramUtil = {
    /** Sets up the standard key/fill/back lighting rig. */
    enableDefaultLighting: function(light0: DirectionalLight, light1: DirectionalLight, light2: DirectionalLight) {
      // Key light.
      light0.direction = new Vector3(-0.5265408, -0.5735765, -0.6275069);
      light0.diffuseColor = new Vector3(1, 0.9607844, 0.8078432);
      light0.specularColor = new Vector3(1, 0.9607844, 0.8078432);
      light0.enabled = true;

      // Fill light.
      light1.direction = new Vector3(0.7198464, 0.3420201, 0.6040227);
      light1.diffuseColor = new Vector3(0.9647059, 0.7607844, 0.4078432);
      light1.specularColor = new Vector3();
      light1.enabled = true;

      // Back light.
      light2.direction = new Vector3(0.4545195, -0.7660444, 0.4545195);
      light2.diffuseColor = new Vector3(0.3231373, 0.3607844, 0.3937255);
      light2.specularColor = new Vector3(0.3231373, 0.3607844, 0.3937255);
      light2.enabled = true;

      // Ambient light.
      return new Vector3(0.05333332, 0.09882354, 0.1819608);
    },

    /** Lazily recomputes the model+view+projection matrix based on
     *  the current effect parameter settings.
     */
    setModelViewProj: (function() {
      var modelViewProjectionMatrix = new Zia.Matrix4();

      return function(program: Program, dirtyFlags: ProgramDirtyFlags, model: Matrix4, view: Matrix4, projection: Matrix4, modelView: Matrix4) {
        // Recompute the model+view+projection matrix?
        if ((dirtyFlags & ProgramDirtyFlags.ModelViewProj) != 0) {
          Zia.Matrix4.multiply(view, model, modelView);
          Zia.Matrix4.multiply(projection, modelView, modelViewProjectionMatrix);
          program.setUniform('uMVPMatrix', modelViewProjectionMatrix);

          dirtyFlags &= ~ProgramDirtyFlags.ModelViewProj;
        }
        return dirtyFlags;
      };
    })(),

    /** Sets the diffuse/emissive/alpha material color parameters. */
    setMaterialColor: function(program: Program, lightingEnabled: boolean, alpha: number, diffuseColor: Vector3, emissiveColor: Vector3, ambientLightColor: Vector3) {
      // Desired lighting model:
      //
      //     ((AmbientLightColor + sum(diffuse directional light)) * DiffuseColor) + EmissiveColor
      //
      // When lighting is disabled, ambient and directional lights are ignored, leaving:
      //
      //     DiffuseColor + EmissiveColor
      //
      // For the lighting disabled case, we can save one shader instruction by precomputing
      // diffuse+emissive on the CPU, after which the shader can use DiffuseColor directly,
      // ignoring its emissive parameter.
      //
      // When lighting is enabled, we can merge the ambient and emissive settings. If we
      // set our emissive parameter to emissive+(ambient*diffuse), the shader no longer
      // needs to bother adding the ambient contribution, simplifying its computation to:
      //
      //     (sum(diffuse directional light) * DiffuseColor) + EmissiveColor
      //
      // For further optimization goodness, we merge material alpha with the diffuse
      // color parameter, and premultiply all color values by this alpha.

      if (lightingEnabled) {
        var diffuse = new Zia.Vector4(
          diffuseColor.x * alpha,
          diffuseColor.y * alpha,
          diffuseColor.z * alpha,
          alpha);

        var emissive = new Zia.Vector3(
         (emissiveColor.x + ambientLightColor.x * diffuseColor.x) * alpha,
         (emissiveColor.y + ambientLightColor.y * diffuseColor.y) * alpha,
         (emissiveColor.z + ambientLightColor.z * diffuseColor.z) * alpha);

        program.setUniform('uDiffuseColor', diffuse);
        program.setUniform('uEmissiveColor', emissive);
      }
      else
      {
        var diffuse = new Zia.Vector4(
          (diffuseColor.x + emissiveColor.x) * alpha,
          (diffuseColor.y + emissiveColor.y) * alpha,
          (diffuseColor.z + emissiveColor.z) * alpha,
          alpha);

        program.setUniform('uDiffuseColor', diffuse);
      }
    },

    setLightingMatrices: (function() {
      var modelInverseTransposeMatrix = new Matrix3();
      var viewInverseMatrix = new Matrix4();
      var eyePosition = new Vector3();

      return function(program: Program, dirtyFlags: ProgramDirtyFlags, model: Matrix4, view: Matrix4) {
        // Set the world and world inverse transpose matrices.
        if ((dirtyFlags & ProgramDirtyFlags.Model) != 0) {
          program.setUniform('uMMatrix', model);

          modelInverseTransposeMatrix.getNormalMatrix(model);
          program.setUniform('uMMatrixInverseTranspose', modelInverseTransposeMatrix);

          dirtyFlags &= ~Zia.ProgramDirtyFlags.Model;
        }

        // Set the eye position.
        if ((dirtyFlags & Zia.ProgramDirtyFlags.EyePosition) != 0) {
          Matrix4.invert(viewInverseMatrix, view);
          viewInverseMatrix.getTranslation(eyePosition);
          program.setUniform('uEyePosition', eyePosition);

          dirtyFlags &= ~Zia.ProgramDirtyFlags.EyePosition;
        }

        return dirtyFlags;
      }
    })()
  };
}
