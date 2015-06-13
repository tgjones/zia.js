module Zia {
  export class VertexBuffer {
    private _gl: WebGLRenderingContext;
    public _buffer: WebGLBuffer; // TODO: internal
    public vertexDeclaration: VertexDeclaration;

    constructor(graphicsDevice: GraphicsDevice, vertexDeclaration: VertexDeclaration, data?: ArrayBufferView) {
      this._gl = graphicsDevice.gl;
      this._buffer = this._gl.createBuffer();

      this.vertexDeclaration = vertexDeclaration;

      if (data !== undefined) {
        this.setData(data);
      }
    }

    setData(data: ArrayBufferView) {
      var gl = this._gl;
      gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    }

    destroy() {
      this._gl.deleteBuffer(this._buffer);
    }
  }
}
