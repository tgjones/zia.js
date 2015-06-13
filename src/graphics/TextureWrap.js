var Zia;
(function (Zia) {
    Zia.TextureWrapUtil = {
        _map: function (gl, wrap) {
            switch (wrap) {
                case 0 /* Repeat */:
                    return gl.REPEAT;
                case 1 /* ClampToEdge */:
                    return gl.CLAMP_TO_EDGE;
                case 2 /* MirroredRepeat */:
                    return gl.MIRRORED_REPEAT;
                default:
                    throw "Invalid value: " + wrap;
            }
        }
    };
})(Zia || (Zia = {}));
