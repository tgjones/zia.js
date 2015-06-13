var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Zia;
(function (Zia) {
    function addLighting(result) {
        result.push("uniform vec3 uDirLight0Direction;");
        result.push("uniform vec3 uDirLight0DiffuseColor;");
        result.push("#define uDirLight0SpecularColor vec3(0,0,0)");
        result.push("uniform vec3 uDirLight1Direction;");
        result.push("uniform vec3 uDirLight1DiffuseColor;");
        result.push("#define uDirLight1SpecularColor vec3(0,0,0)");
        result.push("uniform vec3 uDirLight2Direction;");
        result.push("uniform vec3 uDirLight2DiffuseColor;");
        result.push("#define uDirLight2SpecularColor vec3(0,0,0)");
        result.push("uniform vec3 uEyePosition;");
        result.push("uniform vec3 uEmissiveColor;");
        result.push("#define uSpecularColor vec3(0,0,0)");
        result.push("#define uSpecularPower 0");
        result.push(Zia.SharedProgramCode.lighting);
    }
    function buildVertexShader(options) {
        var result = [];
        result.push("precision mediump float;");
        // Attributes
        result.push("attribute vec3 aVertexPosition;");
        result.push("attribute vec3 aVertexNormal;");
        result.push("attribute vec2 aTextureCoord;");
        // Uniforms
        result.push("uniform mat4 uMVPMatrix;");
        result.push("uniform mat4 uMMatrix;");
        result.push("uniform mat3 uMMatrixInverseTranspose;");
        result.push("uniform vec4 uDiffuseColor;");
        result.push("uniform float uEnvironmentMapAmount;");
        result.push("uniform float uFresnelFactor;");
        result.push("uniform vec3 uDirLight0Direction;");
        result.push("uniform vec3 uDirLight0DiffuseColor;");
        result.push("#define uDirLight0SpecularColor vec3(0,0,0)");
        result.push("uniform vec3 uDirLight1Direction;");
        result.push("uniform vec3 uDirLight1DiffuseColor;");
        result.push("#define uDirLight1SpecularColor vec3(0,0,0)");
        result.push("uniform vec3 uDirLight2Direction;");
        result.push("uniform vec3 uDirLight2DiffuseColor;");
        result.push("#define uDirLight2SpecularColor vec3(0,0,0)");
        result.push("uniform vec3 uEyePosition;");
        result.push("uniform vec3 uEmissiveColor;");
        result.push("#define uSpecularColor vec3(0,0,0)");
        result.push("#define uSpecularPower 0");
        result.push(Zia.SharedProgramCode.lighting);
        // Varyings
        result.push("varying vec4 vDiffuseColor;");
        result.push("varying vec3 vSpecularColor;");
        result.push("varying vec2 vTextureCoord;");
        result.push("varying vec3 vEnvCoord;");
        // Code
        result.push("float ComputeFresnelFactor(vec3 eyeVector, vec3 worldNormal) {");
        result.push("  float viewAngle = dot(eyeVector, worldNormal);");
        result.push("  return pow(max(1.0 - abs(viewAngle), 0.0), uFresnelFactor) * uEnvironmentMapAmount;");
        result.push("}");
        result.push("void main(void) {");
        result.push("  gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);");
        result.push("  vec4 positionWS = uMMatrix * vec4(aVertexPosition, 1.0);");
        result.push("  vec3 eyeVector = normalize(uEyePosition - positionWS.xyz);");
        result.push("  vec3 worldNormal = normalize(uMMatrixInverseTranspose * aVertexNormal);");
        result.push("  ColorPair lightResult = ComputeLights(eyeVector, worldNormal);");
        result.push("  vDiffuseColor = vec4(lightResult.Diffuse, uDiffuseColor.a);");
        if (options.fresnelEnabled) {
            result.push("  vSpecularColor.rgb = vec3(ComputeFresnelFactor(eyeVector, worldNormal));");
        }
        else {
            result.push("  vSpecularColor.rgb = vec3(uEnvironmentMapAmount);");
        }
        result.push("  vTextureCoord = aTextureCoord;");
        result.push("  vEnvCoord = reflect(-eyeVector, worldNormal);");
        result.push("}");
        return result.join('\n');
    }
    function buildFragmentShader(options) {
        var result = [];
        result.push("precision mediump float;");
        result.push("varying vec4 vDiffuseColor;");
        result.push("varying vec3 vSpecularColor;");
        result.push("varying vec2 vTextureCoord;");
        result.push("uniform sampler2D uSampler;");
        result.push("varying vec3 vEnvCoord;");
        result.push("uniform samplerCube uEnvironmentMapSampler;");
        result.push("uniform vec3 uEnvironmentMapSpecular;");
        result.push("void main(void) {");
        result.push("  vec4 color = vDiffuseColor;");
        result.push("  color *= texture2D(uSampler, vTextureCoord);");
        result.push("  vec4 envmap = textureCube(uEnvironmentMapSampler, vEnvCoord) * color.a;");
        result.push("  color.rgb = mix(color.rgb, envmap.rgb, vSpecularColor.rgb);");
        if (options.environmentMapSpecularEnabled) {
            result.push("  color.rgb += uEnvironmentMapSpecular * envmap.a;");
        }
        result.push("  gl_FragColor = color;");
        result.push("}");
        return result.join('\n');
    }
    /**
     * A rendering effect with support for an environment map cube texture.
     */
    var EnvironmentMapProgram = (function (_super) {
        __extends(EnvironmentMapProgram, _super);
        /**
         * Constructs a new `EnvironmentMapProgram`.
         *
         * @param {Zia.GraphicsDevice} graphicsDevice - The graphics device.
         * @param {Object} [options] - TODO
         */
        function EnvironmentMapProgram(graphicsDevice, options) {
            this._dirtyFlags = -1 /* All */;
            this.modelMatrix = new Zia.Matrix4();
            this.viewMatrix = new Zia.Matrix4();
            this.projectionMatrix = new Zia.Matrix4();
            this._modelView = new Zia.Matrix4();
            this.diffuseColor = new Zia.Vector3(1, 1, 1);
            this.emissiveColor = new Zia.Vector3();
            this.alpha = 1;
            this.texture = null;
            this.ambientLightColor = new Zia.Vector3();
            this._environmentMap = null;
            this.environmentMapAmount = 1;
            this.environmentMapSpecular = new Zia.Vector3();
            this.fresnelFactor = 1;
            this._directionalLight0 = new Zia.DirectionalLight(this, 0);
            this._directionalLight1 = new Zia.DirectionalLight(this, 1);
            this._directionalLight2 = new Zia.DirectionalLight(this, 2);
            this._directionalLight0.enabled = true;
            options = Zia.ObjectUtil.reverseMerge(options || {}, {
                environmentMapSpecularEnabled: false,
                fresnelEnabled: true
            });
            this._options = options;
            var vertexShader = new Zia.VertexShader(graphicsDevice, buildVertexShader(options));
            var fragmentShader = new Zia.FragmentShader(graphicsDevice, buildFragmentShader(options));
            _super.call(this, graphicsDevice, vertexShader, fragmentShader);
        }
        Object.defineProperty(EnvironmentMapProgram.prototype, "modelMatrix", {
            get: function () { return this._modelMatrix; },
            set: function (v) {
                this._modelMatrix = v;
                this._dirtyFlags |= 2 /* Model */ | 1 /* ModelViewProj */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "viewMatrix", {
            get: function () { return this._viewMatrix; },
            set: function (v) {
                this._viewMatrix = v;
                this._dirtyFlags |= 1 /* ModelViewProj */ | 4 /* EyePosition */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "projectionMatrix", {
            get: function () { return this._projectionMatrix; },
            set: function (v) {
                this._projectionMatrix = v;
                this._dirtyFlags |= 1 /* ModelViewProj */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "diffuseColor", {
            get: function () { return this._diffuseColor; },
            set: function (v) {
                this._diffuseColor = v;
                this._dirtyFlags |= 8 /* MaterialColor */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "emissiveColor", {
            get: function () { return this._emissiveColor; },
            set: function (v) {
                this._emissiveColor = v;
                this._dirtyFlags |= 8 /* MaterialColor */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "alpha", {
            get: function () { return this._alpha; },
            set: function (v) {
                this._alpha = v;
                this._dirtyFlags |= 8 /* MaterialColor */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "ambientLightColor", {
            get: function () { return this._ambientLightColor; },
            set: function (v) {
                this._ambientLightColor = v;
                this._dirtyFlags |= 8 /* MaterialColor */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "directionalLight0", {
            get: function () { return this._directionalLight0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "directionalLight1", {
            get: function () { return this._directionalLight1; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "directionalLight2", {
            get: function () { return this._directionalLight2; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "texture", {
            get: function () { return this._texture; },
            set: function (v) { this._texture = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "environmentMap", {
            get: function () { return this._environmentMap; },
            set: function (v) { this._environmentMap = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "environmentMapAmount", {
            get: function () { return this._environmentMapAmount; },
            set: function (v) {
                this._environmentMapAmount = v;
                this._dirtyFlags |= 64 /* EnvironmentMapAmount */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "environmentMapSpecular", {
            get: function () { return this._environmentMapSpecular; },
            set: function (v) {
                this._environmentMapSpecular = v;
                this._dirtyFlags |= 128 /* EnvironmentMapSpecular */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMapProgram.prototype, "fresnelFactor", {
            get: function () { return this._fresnelFactor; },
            set: function (v) {
                this._fresnelFactor = v;
                this._dirtyFlags |= 256 /* FresnelFactor */;
            },
            enumerable: true,
            configurable: true
        });
        EnvironmentMapProgram.prototype.enableDefaultLighting = function () {
            this.ambientLightColor = Zia.ProgramUtil.enableDefaultLighting(this._directionalLight0, this._directionalLight1, this._directionalLight2);
        };
        EnvironmentMapProgram.prototype._onApply = function () {
            // Recompute the model+view+projection matrix?
            this._dirtyFlags = Zia.ProgramUtil.setModelViewProj(this, this._dirtyFlags, this._modelMatrix, this._viewMatrix, this._projectionMatrix, this._modelView);
            // Recompute the diffuse/emissive/alpha material color parameters?
            if ((this._dirtyFlags & 8 /* MaterialColor */) != 0) {
                Zia.ProgramUtil.setMaterialColor(this, this._options.lightingEnabled, this._alpha, this._diffuseColor, this._emissiveColor, this._ambientLightColor);
                this._dirtyFlags &= ~8 /* MaterialColor */;
            }
            this.setUniform('uSampler', this._texture);
            this.setUniform('uEnvironmentMapSampler', this._environmentMap);
            if ((this._dirtyFlags & 64 /* EnvironmentMapAmount */) != 0) {
                this.setUniform('uEnvironmentMapAmount', this._environmentMapAmount);
                this._dirtyFlags &= ~64 /* EnvironmentMapAmount */;
            }
            if ((this._dirtyFlags & 128 /* EnvironmentMapSpecular */) != 0) {
                this.setUniform('uEnvironmentMapSpecular', this._environmentMapSpecular);
                this._dirtyFlags &= ~128 /* EnvironmentMapSpecular */;
            }
            if ((this._dirtyFlags & 256 /* FresnelFactor */) != 0) {
                this.setUniform('uFresnelFactor', this._fresnelFactor);
                this._dirtyFlags &= ~256 /* FresnelFactor */;
            }
            // Recompute the world inverse transpose and eye position?
            this._dirtyFlags = Zia.ProgramUtil.setLightingMatrices(this, this._dirtyFlags, this._modelMatrix, this._viewMatrix);
            this._directionalLight0._apply();
            this._directionalLight1._apply();
            this._directionalLight2._apply();
        };
        return EnvironmentMapProgram;
    })(Zia.Program);
    Zia.EnvironmentMapProgram = EnvironmentMapProgram;
})(Zia || (Zia = {}));
