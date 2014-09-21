Zia.ClearOptions = {
  DepthBuffer: 0,
  StencilBuffer: 1,
  ColorBuffer: 2
};

Zia.PrimitiveType = {
  PointList: 0,
  LineList: 1,
  LineStrip: 2,
  LineLoop: 3,
  TriangleList: 4,
  TriangleStrip: 5,
  TriangleFan: 6
};

Zia.GraphicsDevice = function (canvas, debug) {
  this._canvas = canvas;
  var gl = this._gl = canvas.getContext('webgl', {
    antialias: true
  });

  if (debug) {
    gl = this._gl = Zia.DebugUtil.makeDebugContext(gl);
  }

  // TODO: Move this to somewhere else.
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);

  // TODO: Handle WebContextLost event.
  
  var viewport = this._viewport = new Zia.Viewport(
    0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

  viewport.onChange(function () {
    gl.viewport(viewport._x, viewport._y, viewport._width, viewport._height);
    gl.depthRange(viewport._minDepth, viewport._maxDepth);
  });
};

Zia.GraphicsDevice.prototype = {

  get viewport() {
    return this._viewport;
  },
  
  clear: function(clearOptions, color, depth, stencil) {
    var clearMask = 0;

    if (Zia.EnumUtil.hasFlag(clearOptions, Zia.ClearOptions.DepthBuffer)) {
      clearMask |= this._gl.DEPTH_BUFFER_BIT;
      this._gl.clearDepth(depth);
    }

    if (Zia.EnumUtil.hasFlag(clearOptions, Zia.ClearOptions.StencilBuffer)) {
      clearMask |= this._gl.STENCIL_BUFFER_BIT;
      this._gl.clearStencil(stencil);
    }

    if (Zia.EnumUtil.hasFlag(clearOptions, Zia.ClearOptions.ColorBuffer)) {
      clearMask |= this._gl.COLOR_BUFFER_BIT;
      this._gl.clearColor(color.r, color.g, color.b, color.a);
    }

    this._gl.clear(clearMask);
  },

  setIndexBuffer: function(indexBuffer) {
    this._indexBuffer = indexBuffer;
  },

  setVertexBuffer: function(vertexBuffer) {
    this._vertexBuffer = vertexBuffer;
  },

  drawIndexedPrimitives: function(primitiveType, startIndex, indexCount) {
    var gl = this._gl;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);

    gl.drawElements(
      this._getMode(primitiveType),
      indexCount,
      gl.UNSIGNED_SHORT,
      startIndex * 4);
  },

  _getMode: function(primitiveType) {
    switch (primitiveType) {
      case Zia.PrimitiveType.PointList:     return this._gl.POINTS;
      case Zia.PrimitiveType.LineList:      return this._gl.LINES;
      case Zia.PrimitiveType.LineStrip:     return this._gl.LINE_STRIP;
      case Zia.PrimitiveType.LineLoop:      return this._gl.LINE_LOOP;
      case Zia.PrimitiveType.TriangleList:  return this._gl.TRIANGLES;
      case Zia.PrimitiveType.TriangleStrip: return this._gl.TRIANGLE_STRIP;
      case Zia.PrimitiveType.TriangleFan:   return this._gl.TRIANGLE_FAN;
    }
  }

};