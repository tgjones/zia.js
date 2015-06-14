module Zia {
  export enum TextureWrap {
    Repeat = 0,
    ClampToEdge = 1,
    MirroredRepeat = 2
  }

  export var TextureWrapUtil = { // TODO: internal
    _map: function(gl: WebGLRenderingContext, wrap: TextureWrap) {
      switch (wrap) {
        case TextureWrap.Repeat:
          return gl.REPEAT;
        case TextureWrap.ClampToEdge:
          return gl.CLAMP_TO_EDGE;
        case TextureWrap.MirroredRepeat:
          return gl.MIRRORED_REPEAT;
        default :
          throw "Invalid value: " + wrap;
      }
    }
  };
}
