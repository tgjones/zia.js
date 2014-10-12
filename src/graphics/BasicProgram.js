(function () {
  function buildVertexShader(options) {
    var result = [];

    result.push("precision mediump float;");

    // Attributes
    result.push("attribute vec3 aVertexPosition;");
    if (options.vertexColorEnabled) {
      result.push("attribute vec4 aVertexColor;");
    }
    if (options.textureEnabled) {
      result.push("attribute vec2 aTextureCoord;");
    }

    // Uniforms
    result.push("uniform mat4 uMVPMatrix;");
    result.push("uniform vec4 uDiffuseColor;");

    // Varyings
    result.push("varying vec4 vDiffuseColor;");
    if (options.textureEnabled) {
      result.push("varying vec2 vTextureCoord;");
    }

    // Code
    result.push("void main(void) {");
    result.push("  gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);");
    result.push("  vDiffuseColor = uDiffuseColor;");
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

    result.push("void main(void) {");
    result.push("  vec4 color = vDiffuseColor;");

    if (options.textureEnabled) {
      result.push("  color *= texture2D(uSampler, vTextureCoord);");
    }

    result.push("  gl_FragColor = color;");
    result.push("}");

    return result.join('\n');
  }

  Zia.BasicProgram = function (graphicsDevice, options) {
    this.model = new Zia.Matrix4();
    this.view = new Zia.Matrix4();
    this.projection = new Zia.Matrix4();
    this.diffuseColor = new Zia.Vector3(1, 1, 1);
    this.alpha = 1;
    this.texture = null;

    options = Zia.ObjectUtil.reverseMerge(options || {}, {
      textureEnabled: false,
      vertexColorEnabled: false
    });

    var vertexShader = new Zia.VertexShader(graphicsDevice, buildVertexShader(options));
    var fragmentShader = new Zia.FragmentShader(graphicsDevice, buildFragmentShader(options));

    Zia.Program.call(this, graphicsDevice, vertexShader, fragmentShader);
  };
})();

Zia.BasicProgram.prototype = Object.create(Zia.Program.prototype, {
  model: {
    get: function() { return this._model; },
    set: function(v) { this._model = v; this._matrixChanged = true; }
  },

  view: {
    get: function() { return this._view; },
    set: function(v) { this._view = v; this._matrixChanged = true; }
  },

  projection: {
    get: function() { return this._projection;; },
    set: function(v) { this._projection = v; this._matrixChanged = true; }
  },

  diffuseColor: {
    get: function() { return this._diffuseColor; },
    set: function(v) { this._diffuseColor = v; this._diffuseColorChanged = true; }
  },

  alpha: {
    get: function() { return this._alpha; },
    set: function(v) { this._alpha = v; this._diffuseColorChanged = true; }
  },

  texture: {
    get: function() { return this._texture; },
    set: function(v) { this._texture = v; this._textureChanged = true; }
  },
});

Zia.BasicProgram.prototype._onApply = (function() {
  var modelViewProjectionMatrix = new Zia.Matrix4();
  var diffuseColor = new Zia.Vector4();

  return function() {
    if (this._matrixChanged) {
      modelViewProjectionMatrix.multiplyMatrices(this._projection, this._view);
      modelViewProjectionMatrix.multiply(this._model);
      this.setUniform('uMVPMatrix', modelViewProjectionMatrix);

      this._matrixChanged = false;
    }

    if (this._diffuseColorChanged) {
      var diffuse = this._diffuseColor;
      diffuseColor.set(diffuse.x, diffuse.y, diffuse.z, this._alpha);
      this.setUniform('uDiffuseColor', diffuseColor);
    }

    if (this._textureChanged) {
      this.setUniform('uSampler', this._texture);
    }
  };
})();