Zia.CubeMapFace = {
  PositiveX: 0,
  NegativeX: 1,
  PositiveY: 2,
  NegativeY: 3,
  PositiveZ: 4,
  NegativeZ: 5,

  _map: function(gl, face) {
    switch (face) {
      case Zia.CubeMapFace.NegativeX:
        return gl.TEXTURE_CUBE_MAP_NEGATIVE_X;
      case Zia.CubeMapFace.NegativeY:
        return gl.TEXTURE_CUBE_MAP_NEGATIVE_Y;
      case Zia.CubeMapFace.NegativeZ:
        return gl.TEXTURE_CUBE_MAP_NEGATIVE_Z;
      case Zia.CubeMapFace.PositiveX:
        return gl.TEXTURE_CUBE_MAP_POSITIVE_X;
      case Zia.CubeMapFace.PositiveY:
        return gl.TEXTURE_CUBE_MAP_POSITIVE_Y;
      case Zia.CubeMapFace.PositiveZ:
        return gl.TEXTURE_CUBE_MAP_POSITIVE_Z;
      default :
        throw "Invalid face: " + face;
    }
  }
};

Zia.TextureCube = function(graphicsDevice, options) {
  Zia.Texture.call(this, graphicsDevice, options,
    graphicsDevice._gl.TEXTURE_CUBE_MAP);
};

Zia.TextureCube.prototype = Object.create(Zia.Texture.prototype);

Zia.TextureCube.prototype.setData = function(cubeMapFace, data) {
  var size = this.size;
  this._setData(function(gl) {
    gl.texImage2D(
      Zia.CubeMapFace._map(gl, cubeMapFace),
      0, gl.RGBA,
      size, size,
      0, gl.RGBA,
      gl.UNSIGNED_BYTE,
      data);
  });
};

Zia.TextureCube.createFromImagePaths = function (graphicsDevice, imagePaths, options) {
  if (imagePaths.length !== 6) {
    throw "Must pass an array of 6 URLs";
  }

  var result = new Zia.TextureCube(graphicsDevice, options);

  var gl = graphicsDevice._gl;
  var loaded = 0;
  for (var i = 0; i < imagePaths.length; i++) {
    var imagePath = imagePaths[i];
    (function(localI) {
      var image = new Image();
      image.onload = function() {
        result._setData(function() {
          gl.texImage2D(
            Zia.CubeMapFace._map(gl, localI),
            0, gl.RGBA, gl.RGBA,
            gl.UNSIGNED_BYTE,
            image);
        });

        if (image.naturalWidth != image.naturalHeight) {
          throw "Must use square textures for TextureCube";
        }

        if (loaded === 0) {
          result.size = image.naturalWidth;
        } else if (image.naturalWidth !== result.size) {
          throw "All 6 textures must have the same dimensions";
        }

        loaded++;

        if (loaded === 6) {
          result._generateMipmap();
          result._ready = true;
        }
      };
      image.src = imagePath;
    })(i);
  }

  return result;
};