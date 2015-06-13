module Zia {
  export class Texture2D extends Texture {
    public width: number;
    public height: number;

    constructor(graphicsDevice: GraphicsDevice, options: ITextureOptions) {
      super(graphicsDevice, options, graphicsDevice.gl.TEXTURE_2D);
    }

    setData(data: ImageDataType) {
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
    }

    static createFromImagePath(graphicsDevice: GraphicsDevice, imagePath: string, options: ITextureOptions) {
      var result = new Zia.Texture2D(graphicsDevice, options);

      var gl = graphicsDevice.gl;

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
    }

    static createFromImageData(graphicsDevice: GraphicsDevice, imageData: ImageDataType, width: number, height: number, options?: ITextureOptions) {
      var result = new Zia.Texture2D(graphicsDevice, options);
      result.width = width;
      result.height = height;

      var gl = graphicsDevice.gl;
      result.setData(imageData);

      return result;
    }

    static createWhiteTexture(graphicsDevice: GraphicsDevice) {
      var whitePixel = new Uint8Array([255, 255, 255, 255]);
      return Texture2D.createFromImageData(graphicsDevice, whitePixel, 1, 1);
    }
  }
}
