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

    result.push("varying vec3 vPositionWS;");
    result.push("varying vec3 vNormalWS;");

    result.push("struct ColorPair {");
    result.push("  vec3 Diffuse;");
    result.push("  vec3 Specular;");
    result.push("};");

    result.push("ColorPair ComputeLights(vec3 eyeVector, vec3 worldNormal) {");
    result.push("  mat3 lightDirections;");
    result.push("  mat3 lightDiffuse;");
    result.push("  mat3 lightSpecular;");
    result.push("  mat3 halfVectors;");

    result.push("  for (int i = 0; i < 3; i++) {");
    result.push("    lightDirections[i] = mat3(uDirLight0Direction,     uDirLight1Direction,     uDirLight2Direction)    [i];");
    result.push("    lightDiffuse[i]    = mat3(uDirLight0DiffuseColor,  uDirLight1DiffuseColor,  uDirLight2DiffuseColor) [i];");
    result.push("    lightSpecular[i]   = mat3(uDirLight0SpecularColor, uDirLight1SpecularColor, uDirLight2SpecularColor)[i];");
    result.push("    halfVectors[i] = normalize(eyeVector - lightDirections[i]);");
    result.push("  }");

    result.push("  vec3 dotL = worldNormal * -lightDirections;");
    result.push("  vec3 dotH = worldNormal * halfVectors;");

    result.push("  vec3 zeroL = step(vec3(0.0), dotL);");

    result.push("  vec3 diffuse  = zeroL * dotL;");
    result.push("  vec3 specular = pow(max(dotH, vec3(0.0)) * zeroL, vec3(uSpecularPower));");

    result.push("  ColorPair result;");

    result.push("  result.Diffuse  = (lightDiffuse * diffuse)  * uDiffuseColor.rgb + uEmissiveColor;");
    result.push("  result.Specular = (lightSpecular * specular) * uSpecularColor;");

    result.push("  return result;");
    result.push("}");
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
      result.push("varying vec3 vPositionWS;");
      result.push("varying vec3 vNormalWS;");
    }
    if (options.textureEnabled) {
      result.push("varying vec2 vTextureCoord;");
    }

    // Code
    result.push("void main(void) {");
    result.push("  gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);");
    if (options.lightingEnabled) {
      result.push("  vDiffuseColor = vec4(1, 1, 1, uDiffuseColor.a);");
      result.push("  vPositionWS = (uMMatrix * vec4(aVertexPosition, 1.0)).xyz;");
      result.push("  vNormalWS = normalize(uMMatrixInverseTranspose * aVertexNormal);");
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
      result.push("uniform vec4 uDiffuseColor;");
      result.push("uniform vec3 uEmissiveColor;");
      result.push("uniform vec3 uSpecularColor;");
      result.push("uniform float uSpecularPower;");

      addLighting(result);
    }

    result.push("void main(void) {");
    result.push("  vec4 color = vDiffuseColor;");

    if (options.textureEnabled) {
      result.push("  color *= texture2D(uSampler, vTextureCoord);");
    }

    if (options.lightingEnabled) {
      result.push("  vec3 eyeVector = normalize(uEyePosition - vPositionWS);");
      result.push("  vec3 worldNormal = normalize(vNormalWS);");
      result.push("  ColorPair lightResult = ComputeLights(eyeVector, worldNormal);");
      result.push("  color.rgb *= lightResult.Diffuse;");
    }

    result.push("  gl_FragColor = color;");
    result.push("}");

    return result.join('\n');
  }

  Zia.BasicProgram = function (graphicsDevice, options) {
    this._dirtyFlags = Zia.ProgramDirtyFlags.All;

    this.model = new Zia.Matrix4();
    this.view = new Zia.Matrix4();
    this.projection = new Zia.Matrix4();
    this._modelView = new Zia.Matrix4();
    this.diffuseColor = new Zia.Vector3(1, 1, 1);
    this.emissiveColor = new Zia.Vector3();
    this.ambientLightColor = new Zia.Vector3();
    this.alpha = 1;
    this.texture = null;

    this._directionalLight0 = new Zia.DirectionalLight(this, 0);
    this._directionalLight1 = new Zia.DirectionalLight(this, 1);
    this._directionalLight2 = new Zia.DirectionalLight(this, 2);

    options = Zia.ObjectUtil.reverseMerge(options || {}, {
      lightingEnabled: false,
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
    model: {
      get: function() { return this._model; },
      set: function(v) {
        this._model = v;
        this._dirtyFlags |= DF.Model | DF.ModelViewProj | DF.Fog;
      }
    },

    view: {
      get: function() { return this._view; },
      set: function(v) {
        this._view = v;
        this._dirtyFlags |= DF.ModelViewProj | DF.EyePosition | DF.Fog;
      }
    },

    projection: {
      get: function() { return this._projection;; },
      set: function(v) {
        this._projection = v;
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

    ambientLightColor: {
      get: function() { return this._ambientLightColor; },
      set: function(v) {
        this._ambientLightColor = v;
        this._dirtyFlags |= DF.MaterialColor;
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
        this._textureChanged = true;
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
        this._model, this._view, this._projection,
        this._modelView);
      
      // Recompute the diffuse/emissive/alpha material color parameters?
      if ((this._dirtyFlags & DF.MaterialColor) != 0) {
        Zia.ProgramUtil.setMaterialColor(
          this, this._options.lightingEnabled,
          this._alpha, this._diffuseColor, this._emissiveColor,
          this._ambientLightColor);

        this._dirtyFlags &= ~DF.MaterialColor;
      }

      if (this._options.lightingEnabled) {
          // Recompute the world inverse transpose and eye position?
          this._dirtyFlags = Zia.ProgramUtil.setLightingMatrices(
            this, this._dirtyFlags, this._model, this._view);
      }

      if (this._textureChanged) {
        this.setUniform('uSampler', this._texture);
        this._textureChanged = false;
      }

      this._directionalLight0._apply();
      this._directionalLight1._apply();
      this._directionalLight2._apply();
    };
  })();
})();