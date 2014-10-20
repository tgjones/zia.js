Zia.TextureWrap = {
  Repeat: 0,
  ClampToEdge: 1,
  MirroredRepeat: 2,

  _map: function(gl, wrap) {
    switch (wrap) {
      case Zia.TextureWrap.Repeat:
        return gl.REPEAT;
      case Zia.TextureWrap.ClampToEdge:
        return gl.CLAMP_TO_EDGE;
      case Zia.TextureWrap.MirroredRepeat:
        return gl.MIRRORED_REPEAT;
      default :
        throw "Invalid value: " + filter;
    }
  }
};