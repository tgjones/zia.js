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
  gl.depthFunc(gl.LEQUAL);

  // TODO: Handle WebContextLost event.
  
  var viewport = this._viewport = new Zia.Viewport(
    0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

  viewport.onChange(function () {
    gl.viewport(viewport._x, viewport._y, viewport._width, viewport._height);
    gl.depthRange(viewport._minDepth, viewport._maxDepth);
  });

  this.rasterizerState = new Zia.RasterizerState();
  this.depthStencilState = new Zia.DepthStencilState();
};

Zia.GraphicsDevice.prototype = {

  get viewport() {
    return this._viewport;
  },

  get rasterizerState() {
    return this._rasterizerState;
  },

  set rasterizerState(value) {
    this._rasterizerState = value;
    this._rasterizerState._apply(this._gl);
  }

  get depthStencilState() {
    return this._depthStencilState;
  },

  set depthStencilState(value) {
    this._depthStencilState = value;
    this._depthStencilState._apply(this._gl);
  }
  
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

  setVertexBuffers: function (vertexBuffers) {
    this._vertexBuffers = vertexBuffers;
  },

  setProgram: function (program) {
    this._currentProgram = program;
  },

  drawIndexedPrimitives: function (primitiveType, startIndex, indexCount) {
    var gl = this._gl;

    var enabledAttributeLocations = [];
    for (var i = 0; i < this._currentProgram._attributes.length; i++) {
      var attribute = this._currentProgram._attributes[i];
      var vertexBuffer = this._findVertexBuffer(attribute.name);
      if (vertexBuffer) {
        enabledAttributeLocations.push(attribute.location);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.buffer._buffer);
        gl.vertexAttribPointer(attribute.location,
          vertexBuffer.element.numComponents,
          gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(attribute.location);
      }
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer._buffer);

    gl.drawElements(
      this._getMode(primitiveType),
      indexCount,
      gl.UNSIGNED_SHORT,
      startIndex * 4);

    for (var i = 0; i < enabledAttributeLocations.length; i++) {
      gl.disableVertexAttribArray(enabledAttributeLocations[i]);
    }
  },

  _findVertexBuffer: function (attributeName) {
    for (var i = 0; i < this._vertexBuffers.length; i++) {
      var vertexBuffer = this._vertexBuffers[i];
      for (var j = 0; j < vertexBuffer._vertexDeclaration.elements.length; j++) {
        var element = vertexBuffer._vertexDeclaration.elements[j];
        if (element.attributeName === attributeName) {
          return {
            buffer: vertexBuffer,
            element: element
          };
        }
      }
    }
    return null;
  },

  _getMode: function (primitiveType) {
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