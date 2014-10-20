Zia.Texture = function (graphicsDevice, options, textureType) {
  var gl = this._gl = graphicsDevice._gl;
  this._texture = this._gl.createTexture();
  this._textureType = textureType;
  this._ready = false;

  this._options = Zia.ObjectUtil.reverseMerge(options || {}, {
    filter: Zia.TextureFilter.MinNearestMagMipLinear,
    wrapS: Zia.TextureWrap.Repeat,
    wrapT: Zia.TextureWrap.Repeat
  });

  gl.bindTexture(textureType, this._texture);

  gl.texParameteri(textureType, gl.TEXTURE_WRAP_S,
    Zia.TextureWrap._map(gl, this._options.wrapS));
  gl.texParameteri(textureType, gl.TEXTURE_WRAP_T,
    Zia.TextureWrap._map(gl, this._options.wrapT));

  var mappedFilterValues = Zia.TextureFilter._map(gl, this._options.filter);
  gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, mappedFilterValues[0]);
  gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, mappedFilterValues[1]);
  
  gl.bindTexture(textureType, null);
};

Zia.Texture.prototype = {

  _setData: function (setImageDataCallback) {
    var gl = this._gl;
    var textureType = this._textureType;

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(textureType, this._texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    setImageDataCallback(gl);

    gl.bindTexture(textureType, null);
  },

  _generateMipmap: function() {
    var gl = this._gl;
    var textureType = this._textureType;

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(textureType, this._texture);
    gl.generateMipmap(textureType);
    gl.bindTexture(textureType, null);
  },

  destroy: function () {
    this._gl.deleteTexture(this._texture);
  }

};