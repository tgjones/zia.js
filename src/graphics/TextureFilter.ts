module Zia {
  export const enum TextureFilter {
    MinMagMipNearest = 0,
    MinMagNearestMipLinear = 1,
    MinNearestMagLinearMipNearest = 2,
    MinNearestMagMipLinear = 3,
    MinLinearMagMipNearest = 4,
    MinLinearMagNearestMipLinear = 5,
    MinMagLinearMipNearest = 6,
    MinMagMipLinear = 7,

    MinMagNearest = 8,
    MinNearestMagLinear = 9,
    MinLinearMagNearest = 10,
    MinMagLinear = 11
  }

  export var TextureFilterUtil = { // TODO: internal
    // Returns an array containing [MinFilter, MagFilter]
    _map: function(gl: WebGLRenderingContext, filter: TextureFilter) {
      switch (filter) {
        case TextureFilter.MinMagMipNearest:
          return [ gl.NEAREST_MIPMAP_NEAREST, gl.NEAREST ];
        case TextureFilter.MinMagNearestMipLinear:
          return [ gl.NEAREST_MIPMAP_LINEAR, gl.NEAREST ];
        case TextureFilter.MinNearestMagLinearMipNearest:
          return [ gl.NEAREST_MIPMAP_NEAREST, gl.LINEAR ];
        case TextureFilter.MinNearestMagMipLinear:
          return [ gl.NEAREST_MIPMAP_LINEAR, gl.LINEAR ];
        case TextureFilter.MinLinearMagMipNearest:
          return [ gl.LINEAR_MIPMAP_NEAREST, gl.NEAREST ];
        case TextureFilter.MinLinearMagNearestMipLinear:
          return [ gl.LINEAR_MIPMAP_LINEAR, gl.NEAREST ];
        case TextureFilter.MinMagLinearMipNearest:
          return [ gl.LINEAR_MIPMAP_NEAREST, gl.LINEAR ];
        case TextureFilter.MinMagMipLinear:
          return [ gl.LINEAR_MIPMAP_LINEAR, gl.LINEAR ];
        case TextureFilter.MinMagNearest:
          return [ gl.NEAREST, gl.NEAREST ];
        case TextureFilter.MinNearestMagLinear:
          return [ gl.NEAREST, gl.LINEAR ];
        case TextureFilter.MinLinearMagNearest:
          return [ gl.LINEAR, gl.NEAREST ];
        case TextureFilter.MinMagLinear:
          return [ gl.LINEAR, gl.LINEAR ];
        default :
          throw "Invalid value: " + filter;
      }
    }
  }
}
