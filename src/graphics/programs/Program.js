(function() {

  // From http://bocoup.com/weblog/counting-uniforms-in-webgl/
  function getProgramInfo(gl, program) {
    var result = {
      attributes: [],
      uniforms: [],
      samplers: {}
    };
    var activeUniforms   = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    var activeAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

    function toSimpleObject(activeInfo, location) {
      return {
        location: location,
        name: activeInfo.name,
        size: activeInfo.size,
        type: activeInfo.type
      };
    }
    
    // Loop through active uniforms
    for (var i = 0; i < activeUniforms; i++) {
      var uniform = gl.getActiveUniform(program, i);
      result.uniforms.push(toSimpleObject(uniform,
        gl.getUniformLocation(program, uniform.name)));
    }
    
    // Loop through active attributes
    for (var i = 0; i < activeAttributes; i++) {
      var attribute = gl.getActiveAttrib(program, i);
      result.attributes.push(toSimpleObject(attribute,
        gl.getAttribLocation(program, attribute.name)));
    }

    // Loop through samplers
    var samplerIndex = 0;
    for (var i = 0; i < result.uniforms.length; i++) {
      var uniform = result.uniforms[i];
      switch (uniform.type) {
        case gl.SAMPLER_2D :
        case gl.SAMPLER_CUBE :
          result.samplers[uniform.name] = samplerIndex++;
          break;
      }
    }
    
    return result;
  }

  /**
   * A wrapper for a WebGL Program object.
   * @constructor
   */
  Zia.Program = function (graphicsDevice, vertexShader, fragmentShader) {
    this._graphicsDevice = graphicsDevice;
    var gl = this._gl = graphicsDevice._gl;

    var program = gl.createProgram();

    gl.attachShader(program, vertexShader._shader);
    gl.attachShader(program, fragmentShader._shader);
    gl.linkProgram(program);

    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      var error = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error('Failed to link program: ' + error);
    }

    this._program = program;

    var programInfo = getProgramInfo(this._gl, this._program);
    this._attributes = programInfo.attributes;
    this._uniforms = programInfo.uniforms;

    this._uniformsByName = {};
    for (var i = 0; i < this._uniforms.length; i++) {
      var uniform = this._uniforms[i];
      this._uniformsByName[uniform.name] = uniform;
    }

    this._samplerIndices = programInfo.samplers;
  };

})();

Zia.Program.prototype = {

  apply: function() {
    this._graphicsDevice._currentProgram = this;
    this._gl.useProgram(this._program);
    this._onApply();
  },

  _onApply: function() { },

  setUniform: (function () {
    var temp = new Zia.Vector4();

    return function (name, value) {
      if (value instanceof Zia.Color4) {
        temp.set(value.r, value.g, value.b, value.a);
        value = temp;
      }

      var uniform = this._uniformsByName[name];

      if (uniform === undefined) {
        return;
      }
      
      var gl = this._gl;

      switch (uniform.type) {
        case gl.FLOAT :
          gl.uniform1f(uniform.location, value);
          break;
        case gl.FLOAT_VEC2 :
          gl.uniform2f(uniform.location, value._x, value._y);
          break;
        case gl.FLOAT_VEC3 :
          gl.uniform3f(uniform.location, value._x, value._y, value._z);
          break;
        case gl.FLOAT_VEC4 :
          gl.uniform4f(uniform.location, value.x, value.y, value.z, value.w);
          break;
        case gl.FLOAT_MAT3 :
          gl.uniformMatrix3fv(uniform.location, false, value.elements);
          break;
        case gl.FLOAT_MAT4 :
          gl.uniformMatrix4fv(uniform.location, false, value.elements);
          break;
        case gl.SAMPLER_2D :
          this._setUniformSampler(gl, uniform, value, gl.TEXTURE_2D);
          break;
        case gl.SAMPLER_CUBE :
          this._setUniformSampler(gl, uniform, value, gl.TEXTURE_CUBE_MAP);
          break;
        default :
          throw "Not implemented for type: " + uniform.type;
      }
    }
  })(),

  _setUniformSampler: function(gl, uniform, value, textureType) {
    var samplerIndex = this._samplerIndices[uniform.name];
    gl.activeTexture(gl.TEXTURE0 + samplerIndex);
    if (value !== null) {
      gl.bindTexture(textureType, value._texture);
      gl.uniform1i(uniform.location, samplerIndex);
    } else {
      gl.bindTexture(textureType, null);
    }
  },

  destroy: function() {
    var attachedShaders = this._gl.getAttachedShaders(this._program);
    for (var i = 0; i < attachedShaders.length; i++) {
      this._gl.detachShader(this._program, attachedShaders[i]);
    }

    this._gl.deleteProgram(this._program);
  }

};