Zia.TextureWrap = {
  Repeat: 0,
  ClampToEdge: 1,
  MirroredRepeat: 2,

  _applyS: function(gl, wrap) {
    Zia.TextureWrap._apply(gl, gl.TEXTURE_WRAP_S, wrap);
  },

  _applyT: function(gl, wrap) {
    Zia.TextureWrap._apply(gl, gl.TEXTURE_WRAP_T, wrap);
  },

  _apply: function(gl, which, wrap) {
    switch (wrap) {
      case Zia.TextureWrap.Repeat:
        gl.texParameteri(gl.TEXTURE_2D, which, gl.REPEAT);
        break;
      case Zia.TextureWrap.ClampToEdge:
        gl.texParameteri(gl.TEXTURE_2D, which, gl.CLAMP_TO_EDGE);
        break;
      case Zia.TextureWrap.MirroredRepeat:
        gl.texParameteri(gl.TEXTURE_2D, which, gl.MIRRORED_REPEAT);
        break;
      default :
        throw "Invalid value: " + filter;
    }
  }
};