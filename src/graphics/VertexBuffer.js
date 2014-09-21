Zia.VertexBuffer = function (graphicsDevice) {
  this._graphicsDevice = graphicsDevice;
  this._buffer = gl.createBuffer();
};

Zia.VertexBuffer.prototype = {

  setData: function(data) {
    var gl = this._graphicsDevice._gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  },

  destroy: function() {
    this._gl.deleteBuffer(this._buffer);
  }

};