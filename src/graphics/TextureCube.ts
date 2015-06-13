module Zia {
  export const enum CubeMapFace {
    PositiveX = 0,
    NegativeX = 1,
    PositiveY = 2,
    NegativeY = 3,
    PositiveZ = 4,
    NegativeZ = 5
  }

  export var CubeMapFaceUtil = {
    _map: function(gl: WebGLRenderingContext, face: CubeMapFace) {
      switch (face) {
        case CubeMapFace.NegativeX:
          return gl.TEXTURE_CUBE_MAP_NEGATIVE_X;
        case CubeMapFace.NegativeY:
          return gl.TEXTURE_CUBE_MAP_NEGATIVE_Y;
        case CubeMapFace.NegativeZ:
          return gl.TEXTURE_CUBE_MAP_NEGATIVE_Z;
        case CubeMapFace.PositiveX:
          return gl.TEXTURE_CUBE_MAP_POSITIVE_X;
        case CubeMapFace.PositiveY:
          return gl.TEXTURE_CUBE_MAP_POSITIVE_Y;
        case CubeMapFace.PositiveZ:
          return gl.TEXTURE_CUBE_MAP_POSITIVE_Z;
        default :
          throw "Invalid face: " + face;
      }
    }
  };

  export class TextureCube extends Texture {
    public size: number;

    constructor(graphicsDevice: GraphicsDevice, options: ITextureOptions) {
      super(graphicsDevice, options, graphicsDevice.gl.TEXTURE_CUBE_MAP);
    }

    setData(cubeMapFace: CubeMapFace, data: ImageDataType) {
      var size = this.size;
      this._setData((gl) => {
        gl.texImage2D(
          CubeMapFaceUtil._map(gl, cubeMapFace),
          0, gl.RGBA,
          size, size,
          0, gl.RGBA,
          gl.UNSIGNED_BYTE,
          data);
      }, false);
    }

    static createFromImagePaths(graphicsDevice: GraphicsDevice, imagePaths: string[], options: ITextureOptions) {
      if (imagePaths.length !== 6) {
        throw "Must pass an array of 6 URLs";
      }

      var result = new Zia.TextureCube(graphicsDevice, options);

      // Set temporary 1x1 white texture, until images have loaded
      result.size = 1;
      var whitePixel = new Uint8Array([255, 255, 255, 255]);
      for (var i = 0; i < 6; i++) {
        result.setData(i, whitePixel);
      }

      var gl = graphicsDevice.gl;
      var loaded = 0;
      for (var i = 0; i < imagePaths.length; i++) {
        var imagePath = imagePaths[i];
        (function(localI: number) {
          var image = new Image();
          image.onload = function() {
            result._setData(function() {
              gl.texImage2D(
                CubeMapFaceUtil._map(gl, localI),
                0, gl.RGBA, gl.RGBA,
                gl.UNSIGNED_BYTE,
                image);
            }, false);

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
            }
          };
          image.src = imagePath;
        })(i);
      }

      return result;
    }
  }
}
