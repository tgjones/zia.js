Zia.Shader = function (graphicsDevice, type, source) {
  var gl = this._gl = graphicsDevice._gl;

  var shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    var error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error('Failed to compile shader: ' + error);
  }

  this._shader = shader;
};

Zia.Shader.prototype = {
  destroy: function () {
    this._gl.deleteShader(this._shader);
  }
};


Zia.FragmentShader = function (graphicsDevice, source) {
  Zia.Shader.call(this, graphicsDevice, graphicsDevice._gl.FRAGMENT_SHADER, source);
};

Zia.FragmentShader.prototype = Object.create(Zia.Shader.prototype);


Zia.VertexShader = function (graphicsDevice, source) {
  Zia.Shader.call(this, graphicsDevice, graphicsDevice._gl.VERTEX_SHADER, source);
};

Zia.VertexShader.prototype = Object.create(Zia.Shader.prototype);