// Based on EffectHelpers from XNA. Original licence follows:
//-----------------------------------------------------------------------------
// EffectHelpers.cs
//
// Microsoft XNA Community Game Platform
// Copyright (C) Microsoft Corporation. All rights reserved.
//-----------------------------------------------------------------------------
var Zia;
(function (Zia) {
    (function (ProgramDirtyFlags) {
        ProgramDirtyFlags[ProgramDirtyFlags["ModelViewProj"] = 1] = "ModelViewProj";
        ProgramDirtyFlags[ProgramDirtyFlags["Model"] = 2] = "Model";
        ProgramDirtyFlags[ProgramDirtyFlags["EyePosition"] = 4] = "EyePosition";
        ProgramDirtyFlags[ProgramDirtyFlags["MaterialColor"] = 8] = "MaterialColor";
        ProgramDirtyFlags[ProgramDirtyFlags["SpecularColor"] = 16] = "SpecularColor";
        ProgramDirtyFlags[ProgramDirtyFlags["SpecularPower"] = 32] = "SpecularPower";
        ProgramDirtyFlags[ProgramDirtyFlags["EnvironmentMapAmount"] = 64] = "EnvironmentMapAmount";
        ProgramDirtyFlags[ProgramDirtyFlags["EnvironmentMapSpecular"] = 128] = "EnvironmentMapSpecular";
        ProgramDirtyFlags[ProgramDirtyFlags["FresnelFactor"] = 256] = "FresnelFactor";
        ProgramDirtyFlags[ProgramDirtyFlags["All"] = -1] = "All";
    })(Zia.ProgramDirtyFlags || (Zia.ProgramDirtyFlags = {}));
    var ProgramDirtyFlags = Zia.ProgramDirtyFlags;
    Zia.ProgramUtil = {
        enableDefaultLighting: function (light0, light1, light2) {
            light0.direction = new Zia.Vector3(-0.5265408, -0.5735765, -0.6275069);
            light0.diffuseColor = new Zia.Vector3(1, 0.9607844, 0.8078432);
            light0.specularColor = new Zia.Vector3(1, 0.9607844, 0.8078432);
            light0.enabled = true;
            light1.direction = new Zia.Vector3(0.7198464, 0.3420201, 0.6040227);
            light1.diffuseColor = new Zia.Vector3(0.9647059, 0.7607844, 0.4078432);
            light1.specularColor = new Zia.Vector3();
            light1.enabled = true;
            light2.direction = new Zia.Vector3(0.4545195, -0.7660444, 0.4545195);
            light2.diffuseColor = new Zia.Vector3(0.3231373, 0.3607844, 0.3937255);
            light2.specularColor = new Zia.Vector3(0.3231373, 0.3607844, 0.3937255);
            light2.enabled = true;
            return new Zia.Vector3(0.05333332, 0.09882354, 0.1819608);
        },
        setModelViewProj: (function () {
            var modelViewProjectionMatrix = new Zia.Matrix4();
            return function (program, dirtyFlags, model, view, projection, modelView) {
                if ((dirtyFlags & 1) != 0) {
                    Zia.Matrix4.multiply(view, model, modelView);
                    Zia.Matrix4.multiply(projection, modelView, modelViewProjectionMatrix);
                    program.setUniform('uMVPMatrix', modelViewProjectionMatrix);
                    dirtyFlags &= ~1;
                }
                return dirtyFlags;
            };
        })(),
        setMaterialColor: function (program, lightingEnabled, alpha, diffuseColor, emissiveColor, ambientLightColor) {
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
                var diffuse = new Zia.Vector4(diffuseColor.x * alpha, diffuseColor.y * alpha, diffuseColor.z * alpha, alpha);
                var emissive = new Zia.Vector3((emissiveColor.x + ambientLightColor.x * diffuseColor.x) * alpha, (emissiveColor.y + ambientLightColor.y * diffuseColor.y) * alpha, (emissiveColor.z + ambientLightColor.z * diffuseColor.z) * alpha);
                program.setUniform('uDiffuseColor', diffuse);
                program.setUniform('uEmissiveColor', emissive);
            }
            else {
                var diffuse = new Zia.Vector4((diffuseColor.x + emissiveColor.x) * alpha, (diffuseColor.y + emissiveColor.y) * alpha, (diffuseColor.z + emissiveColor.z) * alpha, alpha);
                program.setUniform('uDiffuseColor', diffuse);
            }
        },
        setLightingMatrices: (function () {
            var modelInverseTransposeMatrix = new Zia.Matrix3();
            var viewInverseMatrix = new Zia.Matrix4();
            var eyePosition = new Zia.Vector3();
            return function (program, dirtyFlags, model, view) {
                if ((dirtyFlags & 2) != 0) {
                    program.setUniform('uMMatrix', model);
                    modelInverseTransposeMatrix.getNormalMatrix(model);
                    program.setUniform('uMMatrixInverseTranspose', modelInverseTransposeMatrix);
                    dirtyFlags &= ~2;
                }
                if ((dirtyFlags & 4) != 0) {
                    Zia.Matrix4.invert(viewInverseMatrix, view);
                    viewInverseMatrix.getTranslation(eyePosition);
                    program.setUniform('uEyePosition', eyePosition);
                    dirtyFlags &= ~4;
                }
                return dirtyFlags;
            };
        })()
    };
})(Zia || (Zia = {}));
