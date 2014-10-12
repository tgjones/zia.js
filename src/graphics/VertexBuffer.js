Zia.VertexBuffer = function (graphicsDevice, vertexDeclaration, data) {
  this._gl = graphicsDevice._gl;
  this._buffer = this._gl.createBuffer();

  this._vertexDeclaration = vertexDeclaration;

  if (data !== undefined) {
    this.setData(data);
  }
};

Zia.VertexBuffer.prototype = {

  setData: function (data) {
    var gl = this._gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  },

  destroy: function () {
    this._gl.deleteBuffer(this._buffer);
  }

};