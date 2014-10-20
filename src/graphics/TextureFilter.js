Zia.TextureFilter = {
  MinMagMipNearest: 0,
  MinMagNearestMipLinear: 1,
  MinNearestMagLinearMipNearest: 2,
  MinNearestMagMipLinear: 3,
  MinLinearMagMipNearest: 4,
  MinLinearMagNearestMipLinear: 5,
  MinMagLinearMipNearest: 6,
  MinMagMipLinear: 7,

  MinMagNearest: 8,
  MinNearestMagLinear: 9,
  MinLinearMagNearest: 10,
  MinMagLinear: 11,

  // Returns an array containing [MinFilter, MagFilter]
  _map: function(gl, filter) {
    switch (filter) {
      case Zia.TextureFilter.MinMagMipNearest:
        return [ gl.NEAREST_MIPMAP_NEAREST, gl.NEAREST ];
      case Zia.TextureFilter.MinMagNearestMipLinear:
        return [ gl.NEAREST_MIPMAP_LINEAR, gl.NEAREST ];
      case Zia.TextureFilter.MinNearestMagLinearMipNearest:
        return [ gl.NEAREST_MIPMAP_NEAREST, gl.LINEAR ];
      case Zia.TextureFilter.MinNearestMagMipLinear:
        return [ gl.NEAREST_MIPMAP_LINEAR, gl.LINEAR ];
      case Zia.TextureFilter.MinLinearMagMipNearest:
        return [ gl.LINEAR_MIPMAP_NEAREST, gl.NEAREST ];
      case Zia.TextureFilter.MinLinearMagNearestMipLinear:
        return [ gl.LINEAR_MIPMAP_LINEAR, gl.NEAREST ];
      case Zia.TextureFilter.MinMagLinearMipNearest:
        return [ gl.LINEAR_MIPMAP_NEAREST, gl.LINEAR ];
      case Zia.TextureFilter.MinMagMipLinear:
        return [ gl.LINEAR_MIPMAP_LINEAR, gl.LINEAR ];
      case Zia.TextureFilter.MinMagNearest:
        return [ gl.NEAREST, gl.NEAREST ];
      case Zia.TextureFilter.MinNearestMagLinear:
        return [ gl.NEAREST, gl.LINEAR ];
      case Zia.TextureFilter.MinLinearMagNearest:
        return [ gl.LINEAR, gl.NEAREST ];
      case Zia.TextureFilter.MinMagLinear:
        return [ gl.LINEAR, gl.LINEAR ];
      default :
        throw "Invalid value: " + filter;
    }
  }
};