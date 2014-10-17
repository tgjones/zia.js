(function () {
  function addLighting(result) {
    result.push("uniform vec3 uDirLight0Direction;");
    result.push("uniform vec3 uDirLight0DiffuseColor;");
    result.push("uniform vec3 uDirLight0SpecularColor;");

    result.push("uniform vec3 uDirLight1Direction;");
    result.push("uniform vec3 uDirLight1DiffuseColor;");
    result.push("uniform vec3 uDirLight1SpecularColor;");

    result.push("uniform vec3 uDirLight2Direction;");
    result.push("uniform vec3 uDirLight2DiffuseColor;");
    result.push("uniform vec3 uDirLight2SpecularColor;");

    result.push("uniform vec3 uEyePosition;");

    result.push("uniform vec3 uEmissiveColor;");
    result.push("uniform vec3 uSpecularColor;");
    result.push("uniform float uSpecularPower;");

    result.push(Zia.SharedProgramCode.lighting);
  }

  function buildVertexShader(options) {
    var result = [];

    result.push("precision mediump float;");

    // Attributes
    result.push("attribute vec3 aVertexPosition;");
    if (options.lightingEnabled) {
      result.push("attribute vec3 aVertexNormal;");
    }
    if (options.vertexColorEnabled) {
      result.push("attribute vec4 aVertexColor;");
    }
    if (options.textureEnabled) {
      result.push("attribute vec2 aTextureCoord;");
    }

    // Uniforms
    result.push("uniform mat4 uMVPMatrix;");
    if (options.lightingEnabled) {
      result.push("uniform mat4 uMMatrix;");
      result.push("uniform mat3 uMMatrixInverseTranspose;");
    }
    result.push("uniform vec4 uDiffuseColor;");

    // Varyings
    result.push("varying vec4 vDiffuseColor;");
    if (options.lightingEnabled) {
      if (options.perPixelLightingEnabled) {
        result.push("varying vec3 vPositionWS;");
        result.push("varying vec3 vNormalWS;");
      } else {
        result.push("varying vec3 vSpecularColor;");
        addLighting(result);
        result.push(Zia.SharedProgramCode.lightingVertex);
      }
    }
    if (options.textureEnabled) {
      result.push("varying vec2 vTextureCoord;");
    }

    // Code
    result.push("void main(void) {");
    result.push("  gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);");
    if (options.lightingEnabled) {
      if (options.perPixelLightingEnabled) {
        result.push("  vDiffuseColor = vec4(1, 1, 1, uDiffuseColor.a);");
        result.push("  vPositionWS = (uMMatrix * vec4(aVertexPosition, 1.0)).xyz;");
        result.push("  vNormalWS = normalize(uMMatrixInverseTranspose * aVertexNormal);");
      } else {
        result.push("  ComputeCommonVSOutputWithLighting(vec4(aVertexPosition, 1.0), aVertexNormal);");
      }
    } else {
      result.push("  vDiffuseColor = uDiffuseColor;");
    }
    if (options.vertexColorEnabled) {
      result.push("  vDiffuseColor *= aVertexColor;");
    }
    if (options.textureEnabled) {
      result.push("  vTextureCoord = aTextureCoord;");
    }
    result.push("}");
    
    return result.join('\n');
  }

  function buildFragmentShader(options) {
    var result = [];

    result.push("precision mediump float;");

    result.push("varying vec4 vDiffuseColor;");

    if (options.textureEnabled) {
      result.push("varying vec2 vTextureCoord;");
      result.push("uniform sampler2D uSampler;");
    }

    if (options.lightingEnabled) {
      if (options.perPixelLightingEnabled) {
        result.push("uniform vec4 uDiffuseColor;");

        result.push("varying vec3 vPositionWS;");
        result.push("varying vec3 vNormalWS;");

        addLighting(result);
      } else {
        result.push("varying vec3 vSpecularColor;");
      }
    }

    result.push(Zia.SharedProgramCode.common);

    result.push("void main(void) {");
    result.push("  vec4 color = vDiffuseColor;");

    if (options.textureEnabled) {
      result.push("  color *= texture2D(uSampler, vTextureCoord);");
    }

    if (options.lightingEnabled) {
      if (options.perPixelLightingEnabled) {
        result.push("  vec3 eyeVector = normalize(uEyePosition - vPositionWS);");
        result.push("  vec3 worldNormal = normalize(vNormalWS);");
        result.push("  ColorPair lightResult = ComputeLights(eyeVector, worldNormal);");
        result.push("  color.rgb *= lightResult.Diffuse;");
        result.push("  AddSpecular(color, lightResult.Specular);");
      } else {
        result.push("  AddSpecular(color, vSpecularColor.rgb);");
      }
    }

    result.push("  gl_FragColor = color;");
    result.push("}");

    return result.join('\n');
  }

  Zia.BasicProgram = function (graphicsDevice, options) {
    this._dirtyFlags = Zia.ProgramDirtyFlags.All;

    this.modelMatrix = new Zia.Matrix4();
    this.viewMatrix = new Zia.Matrix4();
    this.projectionMatrix = new Zia.Matrix4();
    this._modelView = new Zia.Matrix4();
    this.diffuseColor = new Zia.Vector3(1, 1, 1);
    this.emissiveColor = new Zia.Vector3();
    this.specularColor = new Zia.Vector3(1, 1, 1);
    this.specularPower = 16;
    this.alpha = 1;
    this.texture = null;
    this.ambientLightColor = new Zia.Vector3();

    this._directionalLight0 = new Zia.DirectionalLight(this, 0);
    this._directionalLight1 = new Zia.DirectionalLight(this, 1);
    this._directionalLight2 = new Zia.DirectionalLight(this, 2);

    this._directionalLight0.enabled = true;

    options = Zia.ObjectUtil.reverseMerge(options || {}, {
      lightingEnabled: false,
      perPixelLightingEnabled: true,
      textureEnabled: false,
      vertexColorEnabled: false
    });
    this._options = options;

    var vertexShader = new Zia.VertexShader(graphicsDevice, buildVertexShader(options));
    var fragmentShader = new Zia.FragmentShader(graphicsDevice, buildFragmentShader(options));

    Zia.Program.call(this, graphicsDevice, vertexShader, fragmentShader);
  };
})();

(function() {
  var DF = Zia.ProgramDirtyFlags;

  Zia.BasicProgram.prototype = Object.create(Zia.Program.prototype, {
    modelMatrix: {
      get: function() { return this._modelMatrix; },
      set: function(v) {
        this._modelMatrix = v;
        this._dirtyFlags |= DF.Model | DF.ModelViewProj | DF.Fog;
      }
    },

    viewMatrix: {
      get: function() { return this._viewMatrix; },
      set: function(v) {
        this._viewMatrix = v;
        this._dirtyFlags |= DF.ModelViewProj | DF.EyePosition | DF.Fog;
      }
    },

    projectionMatrix: {
      get: function() { return this._projectionMatrix; },
      set: function(v) {
        this._projectionMatrix = v;
        this._dirtyFlags |= DF.ModelViewProj;
      }
    },

    diffuseColor: {
      get: function() { return this._diffuseColor; },
      set: function(v) {
        this._diffuseColor = v;
        this._dirtyFlags |= DF.MaterialColor;
      }
    },

    emissiveColor: {
      get: function() { return this._emissiveColor; },
      set: function(v) {
        this._emissiveColor = v;
        this._dirtyFlags |= DF.MaterialColor;
      }
    },

    specularColor: {
      get: function() { return this._specularColor; },
      set: function(v) {
        this._specularColor = v;
        this._dirtyFlags |= DF.SpecularColor;
      }
    },

    specularPower: {
      get: function() { return this._specularPower; },
      set: function(v) {
        this._specularPower = v;
        this._dirtyFlags |= DF.SpecularPower;
      }
    },

    alpha: {
      get: function() { return this._alpha; },
      set: function(v) {
        this._alpha = v;
        this._dirtyFlags |= DF.MaterialColor;
      }
    },

    texture: {
      get: function() { return this._texture; },
      set: function(v) {
        this._texture = v;
        this._dirtyFlags |= DF.Texture;
      }
    },

    ambientLightColor: {
      get: function() { return this._ambientLightColor; },
      set: function(v) {
        this._ambientLightColor = v;
        this._dirtyFlags |= DF.MaterialColor;
      }
    },

    directionalLight0: {
      get: function() { return this._directionalLight0; }
    },

    directionalLight1: {
      get: function() { return this._directionalLight1; }
    },

    directionalLight2: {
      get: function() { return this._directionalLight2; }
    }
  });

  Zia.BasicProgram.prototype.enableDefaultLighting = function() {
    if (!this._options.lightingEnabled) {
      throw "Lighting must be enabled when creating this program.";
    }

    this.ambientLightColor = Zia.ProgramUtil.enableDefaultLighting(
      this._directionalLight0,
      this._directionalLight1,
      this._directionalLight2);
  };

  Zia.BasicProgram.prototype._onApply = (function() {
    var modelViewProjectionMatrix = new Zia.Matrix4();
    
    var diffuseColor = new Zia.Vector4();

    return function() {

      // Recompute the model+view+projection matrix?
      this._dirtyFlags = Zia.ProgramUtil.setModelViewProj(
        this, this._dirtyFlags,
        this._modelMatrix, this._viewMatrix, this._projectionMatrix,
        this._modelView);
      
      // Recompute the diffuse/emissive/alpha material color parameters?
      if ((this._dirtyFlags & DF.MaterialColor) != 0) {
        Zia.ProgramUtil.setMaterialColor(
          this, this._options.lightingEnabled,
          this._alpha, this._diffuseColor, this._emissiveColor,
          this._ambientLightColor);

        this._dirtyFlags &= ~DF.MaterialColor;
      }

      if ((this._dirtyFlags & DF.SpecularColor) != 0) {
        this.setUniform('uSpecularColor', this._specularColor);
        this._dirtyFlags &= ~DF.SpecularColor;
      }

      if ((this._dirtyFlags & DF.SpecularPower) != 0) {
        this.setUniform('uSpecularPower', this._specularPower);
        this._dirtyFlags &= ~DF.SpecularPower;
      }

      if (this._options.lightingEnabled) {
          // Recompute the world inverse transpose and eye position?
          this._dirtyFlags = Zia.ProgramUtil.setLightingMatrices(
            this, this._dirtyFlags, this._modelMatrix, this._viewMatrix);
      }

      if ((this._dirtyFlags & DF.Texture) != 0) {
        if ((this._texture !== null && this._texture._ready === true) || this._texture === null) {
          this.setUniform('uSampler', this._texture);
          this._dirtyFlags &= ~DF.Texture;
        }
      }

      this._directionalLight0._apply();
      this._directionalLight1._apply();
      this._directionalLight2._apply();
    };
  })();
})();