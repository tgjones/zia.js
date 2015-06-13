module Zia {
  export type ImageDataType = ImageData|ArrayBufferView|HTMLCanvasElement|HTMLImageElement;

  export interface ITextureOptions {
    filter: TextureFilter;
    wrapS: TextureWrap;
    wrapT: TextureWrap;
  }

  export class Texture {
    private _gl: WebGLRenderingContext;
    private _texture: WebGLTexture;
    private _textureType: number;
    private _options: ITextureOptions;

    constructor(graphicsDevice: GraphicsDevice, options: ITextureOptions, textureType: number) {
      var gl = this._gl = graphicsDevice.gl;
      this._texture = this._gl.createTexture();
      this._textureType = textureType;

      this._options = ObjectUtil.reverseMerge(options || {}, {
        filter: TextureFilter.MinNearestMagMipLinear,
        wrapS: TextureWrap.Repeat,
        wrapT: TextureWrap.Repeat
      });

      gl.bindTexture(textureType, this._texture);

      gl.texParameteri(textureType, gl.TEXTURE_WRAP_S,
        TextureWrapUtil._map(gl, this._options.wrapS));
      gl.texParameteri(textureType, gl.TEXTURE_WRAP_T,
        TextureWrapUtil._map(gl, this._options.wrapT));

      var mappedFilterValues = TextureFilterUtil._map(gl, this._options.filter);
      gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, mappedFilterValues[0]);
      gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, mappedFilterValues[1]);

      gl.bindTexture(textureType, null);
    }

    protected _setData(setImageDataCallback: (gl: WebGLRenderingContext) => void, flipY: boolean) {
      var gl = this._gl;
      var textureType = this._textureType;

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(textureType, this._texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);

      setImageDataCallback(gl);

      gl.bindTexture(textureType, null);
    }

    protected _generateMipmap() {
      var gl = this._gl;
      var textureType = this._textureType;

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(textureType, this._texture);
      gl.generateMipmap(textureType);
      gl.bindTexture(textureType, null);
    }

    destroy() {
      this._gl.deleteTexture(this._texture);
    }
  }
}
