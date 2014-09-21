Zia.Texture = function (graphicsDevice) {
  this._gl = graphicsDevice._gl;
  this._texture = this._gl.createTexture();
  this._ready = false;
};

Zia.Texture.createFromImagePath = function (graphicsDevice, imagePath) {
  var result = new Zia.Texture(graphicsDevice);

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

Zia.Texture.createFromImageData = function (graphicsDevice, imageData, width, height) {
  var result = new Zia.Texture(graphicsDevice);

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

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);

    gl.generateMipmap(gl.TEXTURE_2D);
    
    gl.bindTexture(gl.TEXTURE_2D, null);

    this._ready = true;
  },

  unload: function () {
    this._gl.deleteTexture(this._texture);
  }

};