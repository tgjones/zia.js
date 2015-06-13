module Zia {
  export class IndexBuffer {
    private _gl: WebGLRenderingContext;
    public _buffer: WebGLBuffer; // TODO: internal

    constructor(graphicsDevice: GraphicsDevice, data?: ArrayBufferView) {
      this._gl = graphicsDevice.gl;
      this._buffer = this._gl.createBuffer();

      if (data !== undefined) {
        this.setData(data);
      }
    }

    setData(data: ArrayBufferView) {
      var gl = this._gl;
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
    }

    destroy() {
      this._gl.deleteBuffer(this._buffer);
    }
  }
}
