Zia.ClearOptions = {
  DepthBuffer: 0,
  StencilBuffer: 1,
  ColorBuffer: 2
};

Zia.GraphicsDevice = function (canvas, debug) {
  this._canvas = canvas;
  this._gl = canvas.getContext('webgl', {
    antialias: true
  });

  if (debug) {
    this._gl = Zia.DebugUtil.makeDebugContext(this._gl);
  }

  // TODO: Move this to somewhere else.
  this._gl.enable(this._gl.DEPTH_TEST);
  this._gl.depthFunc(this._gl.LESS);

  // TODO: Handle WebContextLost event.
};

Zia.GraphicsDevice.prototype = {
  
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
  }

};