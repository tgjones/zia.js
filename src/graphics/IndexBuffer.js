Zia.IndexBuffer = function (graphicsDevice) {
  this._graphicsDevice = graphicsDevice;
  this._buffer = gl.createBuffer();
};

Zia.IndexBuffer.prototype = {

  setData: function(data) {
    var gl = this._graphicsDevice._gl;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
  },

  destroy: function() {
    this._gl.deleteBuffer(this._buffer);
  }

};