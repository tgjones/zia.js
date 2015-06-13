var Zia;
(function (Zia) {
    Zia.TextureFilterUtil = {
        // Returns an array containing [MinFilter, MagFilter]
        _map: function (gl, filter) {
            switch (filter) {
                case 0 /* MinMagMipNearest */:
                    return [gl.NEAREST_MIPMAP_NEAREST, gl.NEAREST];
                case 1 /* MinMagNearestMipLinear */:
                    return [gl.NEAREST_MIPMAP_LINEAR, gl.NEAREST];
                case 2 /* MinNearestMagLinearMipNearest */:
                    return [gl.NEAREST_MIPMAP_NEAREST, gl.LINEAR];
                case 3 /* MinNearestMagMipLinear */:
                    return [gl.NEAREST_MIPMAP_LINEAR, gl.LINEAR];
                case 4 /* MinLinearMagMipNearest */:
                    return [gl.LINEAR_MIPMAP_NEAREST, gl.NEAREST];
                case 5 /* MinLinearMagNearestMipLinear */:
                    return [gl.LINEAR_MIPMAP_LINEAR, gl.NEAREST];
                case 6 /* MinMagLinearMipNearest */:
                    return [gl.LINEAR_MIPMAP_NEAREST, gl.LINEAR];
                case 7 /* MinMagMipLinear */:
                    return [gl.LINEAR_MIPMAP_LINEAR, gl.LINEAR];
                case 8 /* MinMagNearest */:
                    return [gl.NEAREST, gl.NEAREST];
                case 9 /* MinNearestMagLinear */:
                    return [gl.NEAREST, gl.LINEAR];
                case 10 /* MinLinearMagNearest */:
                    return [gl.LINEAR, gl.NEAREST];
                case 11 /* MinMagLinear */:
                    return [gl.LINEAR, gl.LINEAR];
                default:
                    throw "Invalid value: " + filter;
            }
        }
    };
})(Zia || (Zia = {}));
