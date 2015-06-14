module Zia {
  export enum ClearOptions {
    DepthBuffer = 0,
    StencilBuffer = 1,
    ColorBuffer = 2
  }

  export enum PrimitiveType {
    PointList = 0,
    LineList = 1,
    LineStrip = 2,
    LineLoop = 3,
    TriangleList = 4,
    TriangleStrip = 5,
    TriangleFan = 6
  }

  /**
   * Main class in Zia. Manages the WebGL rendering context and associated state,
   * and performs rendering.
   */
  export class GraphicsDevice {
    public gl: WebGLRenderingContext;

    private _viewport: Viewport;
    private _canvas: HTMLCanvasElement;
    private _rasterizerState: RasterizerState;
    private _depthStencilState: DepthStencilState;
    private _indexBuffer: IndexBuffer;
    private _vertexBuffers: VertexBuffer[];
    public _currentProgram: Program; // TODO: internal

    /**
     * Constructs a new `GraphicsDevice` object.
     *
     * @param canvas - The canvas element.
     */
    constructor(canvas: HTMLCanvasElement, debug: boolean) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      this._canvas = canvas;
      var gl = this.gl = <WebGLRenderingContext>canvas.getContext('webgl', {
        antialias: true
      });

      if (debug) {
        gl = this.gl = DebugUtil.makeDebugContext(gl);
      }

      // TODO: Handle WebContextLost event.

      var viewport = this._viewport = new Viewport(
        0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

      viewport.onChange(function() {
        gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
        gl.depthRange(viewport.minDepth, viewport.maxDepth);
      });

      this.rasterizerState = new RasterizerState();
      this.depthStencilState = new DepthStencilState();
    }

    get viewport() {
      return this._viewport;
    }

    get rasterizerState() {
      return this._rasterizerState;
    }

    set rasterizerState(value) {
      this._rasterizerState = value;
      this._rasterizerState._apply(this.gl);
    }

    get depthStencilState() {
      return this._depthStencilState;
    }

    set depthStencilState(value) {
      this._depthStencilState = value;
      this._depthStencilState._apply(this.gl);
    }

    clear(clearOptions: ClearOptions, color: Color4, depth: number, stencil: number) {
      var clearMask = 0;

      if (EnumUtil.hasFlag(clearOptions, Zia.ClearOptions.DepthBuffer)) {
        clearMask |= this.gl.DEPTH_BUFFER_BIT;
        this.gl.clearDepth(depth);
      }

      if (EnumUtil.hasFlag(clearOptions, Zia.ClearOptions.StencilBuffer)) {
        clearMask |= this.gl.STENCIL_BUFFER_BIT;
        this.gl.clearStencil(stencil);
      }

      if (EnumUtil.hasFlag(clearOptions, Zia.ClearOptions.ColorBuffer)) {
        clearMask |= this.gl.COLOR_BUFFER_BIT;
        this.gl.clearColor(color.r, color.g, color.b, color.a);
      }

      this.gl.clear(clearMask);
    }

    setIndexBuffer(indexBuffer: IndexBuffer) {
      this._indexBuffer = indexBuffer;
    }

    setVertexBuffers(vertexBuffers: VertexBuffer[]) {
      this._vertexBuffers = vertexBuffers;
    }

    setVertexBuffer(vertexBuffer: VertexBuffer) {
      this._vertexBuffers = [vertexBuffer];
    }

    drawIndexedPrimitives(primitiveType: PrimitiveType, startIndex: number, indexCount: number) {
      var gl = this.gl;

      var enabledAttributeLocations = this._bindVertexAttributes(gl);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer._buffer);

      gl.drawElements(
        this._getMode(primitiveType),
        indexCount,
        gl.UNSIGNED_SHORT,
        startIndex * 4);

      for (var i = 0; i < enabledAttributeLocations.length; i++) {
        gl.disableVertexAttribArray(<number>enabledAttributeLocations[i]);
      }
    }

    drawPrimitives(primitiveType: PrimitiveType, startVertex: number, vertexCount: number) {
      var gl = this.gl;

      var enabledAttributeLocations = this._bindVertexAttributes(gl);

      gl.drawArrays(
        this._getMode(primitiveType),
        startVertex,
        vertexCount);

      for (var i = 0; i < enabledAttributeLocations.length; i++) {
        gl.disableVertexAttribArray(<number>enabledAttributeLocations[i]);
      }
    }

    resize() {
      var canvas = this._canvas;

      var width = canvas.clientWidth;
      var height = canvas.clientHeight;

      if (canvas.width != width || canvas.height != height) {
        canvas.width = width;
        canvas.height = height;

        this.viewport.set(0, 0, width, height);

        return true;
      }
      return false;
    }

    toggleFullScreen() {
      HtmlUtil.toggleFullScreen(this._canvas);
    }

    _bindVertexAttributes(gl: WebGLRenderingContext) {
      var enabledAttributeLocations: WebGLUniformLocation[] = [];
      for (var i = 0; i < this._currentProgram._attributes.length; i++) {
        var attribute = this._currentProgram._attributes[i];
        var vertexBuffer = this._findVertexBuffer(attribute.name);
        if (vertexBuffer) {
          enabledAttributeLocations.push(attribute.location);
          gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.buffer._buffer);
          gl.vertexAttribPointer(<number>attribute.location,
            vertexBuffer.element.numComponents,
            gl.FLOAT, false,
            vertexBuffer.buffer.vertexDeclaration.stride,
            vertexBuffer.element.offset);
          gl.enableVertexAttribArray(<number>attribute.location);
        }
      }
      return enabledAttributeLocations;
    }

    _findVertexBuffer(attributeName: string) {
      for (var i = 0; i < this._vertexBuffers.length; i++) {
        var vertexBuffer = this._vertexBuffers[i];
        for (var j = 0; j < vertexBuffer.vertexDeclaration.elements.length; j++) {
          var element = vertexBuffer.vertexDeclaration.elements[j];
          if (element.attributeName === attributeName) {
            return {
              buffer: vertexBuffer,
              element: element
            };
          }
        }
      }
      return null;
    }

    _getMode(primitiveType: PrimitiveType) {
      switch (primitiveType) {
        case PrimitiveType.PointList: return this.gl.POINTS;
        case PrimitiveType.LineList: return this.gl.LINES;
        case PrimitiveType.LineStrip: return this.gl.LINE_STRIP;
        case PrimitiveType.LineLoop: return this.gl.LINE_LOOP;
        case PrimitiveType.TriangleList: return this.gl.TRIANGLES;
        case PrimitiveType.TriangleStrip: return this.gl.TRIANGLE_STRIP;
        case PrimitiveType.TriangleFan: return this.gl.TRIANGLE_FAN;
      }
    }
  }
}
