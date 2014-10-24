Zia.Texture2D = function(graphicsDevice, options) {
  Zia.Texture.call(this, graphicsDevice, options,
    graphicsDevice._gl.TEXTURE_2D);
};

Zia.Texture2D.prototype = Object.create(Zia.Texture.prototype);

Zia.Texture2D.prototype.setData = function(data) {
  var width = this.width, height = this.height;
  this._setData(function(gl) {
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA,
      width, height,
      0, gl.RGBA,
      gl.UNSIGNED_BYTE,
      data);
  }, true);
  this._generateMipmap();
};

Zia.Texture2D.createFromImagePath = function (graphicsDevice, imagePath, options) {
  var result = new Zia.Texture2D(graphicsDevice, options);

  var gl = graphicsDevice._gl;

  // Set temporary 1x1 white texture, until image has loaded
  result.width = 1;
  result.height = 1;
  result.setData(new Uint8Array([255, 255, 255, 255]));

  var image = new Image();
  image.onload = function() {
    result._setData(function() {
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
        gl.UNSIGNED_BYTE, image);
    }, true);
    result._generateMipmap();
    result.width = image.naturalWidth;
    result.height = image.naturalHeight;
  };
  image.src = imagePath;

  return result;
};

Zia.Texture2D.createFromImageData = function (graphicsDevice, imageData, width, height, options) {
  var result = new Zia.Texture2D(graphicsDevice, options);
  result.width = width;
  result.height = height;

  var gl = graphicsDevice._gl;
  result.setData(imageData);

  return result;
};

Zia.Texture2D.createWhiteTexture = function (graphicsDevice) {
  var whitePixel = new Uint8Array([255, 255, 255, 255]);
  return Zia.Texture2D.createFromImageData(graphicsDevice, whitePixel, 1, 1);
};