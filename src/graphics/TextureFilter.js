var Zia;
(function (Zia) {
    (function (TextureFilter) {
        TextureFilter[TextureFilter["MinMagMipNearest"] = 0] = "MinMagMipNearest";
        TextureFilter[TextureFilter["MinMagNearestMipLinear"] = 1] = "MinMagNearestMipLinear";
        TextureFilter[TextureFilter["MinNearestMagLinearMipNearest"] = 2] = "MinNearestMagLinearMipNearest";
        TextureFilter[TextureFilter["MinNearestMagMipLinear"] = 3] = "MinNearestMagMipLinear";
        TextureFilter[TextureFilter["MinLinearMagMipNearest"] = 4] = "MinLinearMagMipNearest";
        TextureFilter[TextureFilter["MinLinearMagNearestMipLinear"] = 5] = "MinLinearMagNearestMipLinear";
        TextureFilter[TextureFilter["MinMagLinearMipNearest"] = 6] = "MinMagLinearMipNearest";
        TextureFilter[TextureFilter["MinMagMipLinear"] = 7] = "MinMagMipLinear";
        TextureFilter[TextureFilter["MinMagNearest"] = 8] = "MinMagNearest";
        TextureFilter[TextureFilter["MinNearestMagLinear"] = 9] = "MinNearestMagLinear";
        TextureFilter[TextureFilter["MinLinearMagNearest"] = 10] = "MinLinearMagNearest";
        TextureFilter[TextureFilter["MinMagLinear"] = 11] = "MinMagLinear";
    })(Zia.TextureFilter || (Zia.TextureFilter = {}));
    var TextureFilter = Zia.TextureFilter;
    Zia.TextureFilterUtil = {
        _map: function (gl, filter) {
            switch (filter) {
                case TextureFilter.MinMagMipNearest:
                    return [gl.NEAREST_MIPMAP_NEAREST, gl.NEAREST];
                case TextureFilter.MinMagNearestMipLinear:
                    return [gl.NEAREST_MIPMAP_LINEAR, gl.NEAREST];
                case TextureFilter.MinNearestMagLinearMipNearest:
                    return [gl.NEAREST_MIPMAP_NEAREST, gl.LINEAR];
                case TextureFilter.MinNearestMagMipLinear:
                    return [gl.NEAREST_MIPMAP_LINEAR, gl.LINEAR];
                case TextureFilter.MinLinearMagMipNearest:
                    return [gl.LINEAR_MIPMAP_NEAREST, gl.NEAREST];
                case TextureFilter.MinLinearMagNearestMipLinear:
                    return [gl.LINEAR_MIPMAP_LINEAR, gl.NEAREST];
                case TextureFilter.MinMagLinearMipNearest:
                    return [gl.LINEAR_MIPMAP_NEAREST, gl.LINEAR];
                case TextureFilter.MinMagMipLinear:
                    return [gl.LINEAR_MIPMAP_LINEAR, gl.LINEAR];
                case TextureFilter.MinMagNearest:
                    return [gl.NEAREST, gl.NEAREST];
                case TextureFilter.MinNearestMagLinear:
                    return [gl.NEAREST, gl.LINEAR];
                case TextureFilter.MinLinearMagNearest:
                    return [gl.LINEAR, gl.NEAREST];
                case TextureFilter.MinMagLinear:
                    return [gl.LINEAR, gl.LINEAR];
                default:
                    throw "Invalid value: " + filter;
            }
        }
    };
})(Zia || (Zia = {}));
