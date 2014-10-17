Zia.Texture = function (graphicsDevice, options) {
  this._gl = graphicsDevice._gl;
  this._texture = this._gl.createTexture();
  this._ready = false;

  this._options = Zia.ObjectUtil.reverseMerge(options || {}, {
    filter: Zia.TextureFilter.MinNearestMagMipLinear,
    wrapS: Zia.TextureWrap.Repeat,
    wrapT: Zia.TextureWrap.Repeat
  });
};

Zia.Texture.createFromImagePath = function (graphicsDevice, imagePath, options) {
  var result = new Zia.Texture(graphicsDevice, options);

  var gl = graphicsDevice._gl;
  var image = new Image();
  image.onload = (function(scope) {
    return function () {
      result._handleImageLoad(function () {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      });
    };
  })(this);
  image.src = imagePath;

  return result;
};

Zia.Texture.createFromImageData = function (graphicsDevice, imageData, width, height, options) {
  var result = new Zia.Texture(graphicsDevice, options);

  var gl = graphicsDevice._gl;
  result._handleImageLoad(function () {
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA,
      gl.UNSIGNED_BYTE, imageData);
  });

  return result;
};

Zia.Texture.createWhiteTexture = function (engine) {
  var whitePixel = new Uint8Array([255, 255, 255, 255]);
  return Zia.Texture.createFromImageData(graphicsDevice, whitePixel, 1, 1);
};

Zia.Texture.prototype = {

  _handleImageLoad: function (setImageDataCallback) {
    var gl = this._gl;

    gl.bindTexture(gl.TEXTURE_2D, this._texture);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    setImageDataCallback();

    Zia.TextureWrap._applyS(gl, this._options.wrapS);
    Zia.TextureWrap._applyT(gl, this._options.wrapT);

    Zia.TextureFilter._apply(gl, this._options.filter);

    gl.generateMipmap(gl.TEXTURE_2D);
    
    gl.bindTexture(gl.TEXTURE_2D, null);

    this._ready = true;
  },

  unload: function () {
    this._gl.deleteTexture(this._texture);
  }

};