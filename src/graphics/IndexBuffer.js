Zia.IndexBuffer = function (graphicsDevice, data) {
  this._gl = graphicsDevice._gl;
  this._buffer = this._gl.createBuffer();

  if (data !== undefined) {
    this.setData(data);
  }
};

Zia.IndexBuffer.prototype = {

  setData: function(data) {
    var gl = this._gl;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
  },

  destroy: function() {
    this._gl.deleteBuffer(this._buffer);
  }

};