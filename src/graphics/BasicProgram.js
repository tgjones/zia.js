(function () {
  function buildVertexShader(options) {
    var result = [];

    // TODO: Add uMVPMatrix for combined model-view-projection matrix.

    result.push("attribute vec3 aVertexPosition;");
    result.push("attribute vec2 aTextureCoord;");

    result.push("uniform mat4 uMMatrix;");
    result.push("uniform mat4 uVMatrix;");
    result.push("uniform mat4 uPMatrix;");

    if (options.textureEnabled) {
      result.push("varying highp vec2 vTextureCoord;");
    }

    result.push("void main(void) {");
    result.push("  gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aVertexPosition, 1.0);");
    if (options.textureEnabled) {
      result.push("  vTextureCoord = aTextureCoord;");
    }
    result.push("}");
    
    return result.join('\n');
  }

  function buildFragmentShader(options) {
    var result = [];

    if (options.textureEnabled) {
      result.push("varying highp vec2 vTextureCoord;");
      result.push("uniform sampler2D uSampler;");
    }

    result.push("void main(void) {");

    if (options.textureEnabled) {
      result.push("  gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));");
    }

    result.push("}");

    return result.join('\n');
  }

  Zia.BasicProgram = function (graphicsDevice, options) {
    options = Zia.ObjectUtil.reverseMerge(options || {}, {
      textureEnabled: false
    });

    var vertexShader = new Zia.VertexShader(graphicsDevice, buildVertexShader(options));
    var fragmentShader = new Zia.FragmentShader(graphicsDevice, buildFragmentShader(options));

    Zia.Program.call(this, graphicsDevice, vertexShader, fragmentShader);
  };
})();

Zia.BasicProgram.prototype = Object.create(Zia.Program.prototype, {
  model: {
    get: function() { throw "Not implemented"; },
    set: function(v) { this.setUniform('uMMatrix', v); }
  },

  view: {
    get: function() { throw "Not implemented"; },
    set: function(v) { this.setUniform('uVMatrix', v); }
  },

  projection: {
    get: function() { throw "Not implemented"; },
    set: function(v) { this.setUniform('uPMatrix', v); }
  },

  texture: {
    get: function() { throw "Not implemented"; },
    set: function(v) { this.setUniform('uSampler', v); }
  },
});

// projection, view, model