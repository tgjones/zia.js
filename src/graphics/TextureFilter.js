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

  _apply: function(gl, filter) {
    switch (filter) {
      case Zia.TextureFilter.MinMagMipNearest:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        break;
      case Zia.TextureFilter.MinMagNearestMipLinear:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        break;
      case Zia.TextureFilter.MinNearestMagLinearMipNearest:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        break;
      case Zia.TextureFilter.MinNearestMagMipLinear:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        break;
      case Zia.TextureFilter.MinLinearMagMipNearest:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        break;
      case Zia.TextureFilter.MinLinearMagNearestMipLinear:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        break;
      case Zia.TextureFilter.MinMagLinearMipNearest:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        break;
      case Zia.TextureFilter.MinMagMipLinear:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        break;
      case Zia.TextureFilter.MinMagNearest:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        break;
      case Zia.TextureFilter.MinNearestMagLinear:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        break;
      case Zia.TextureFilter.MinLinearMagNearest:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        break;
      case Zia.TextureFilter.MinMagLinear:
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        break;
      default :
        throw "Invalid value: " + filter;
    }
  }
};