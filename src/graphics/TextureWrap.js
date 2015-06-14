var Zia;
(function (Zia) {
    (function (TextureWrap) {
        TextureWrap[TextureWrap["Repeat"] = 0] = "Repeat";
        TextureWrap[TextureWrap["ClampToEdge"] = 1] = "ClampToEdge";
        TextureWrap[TextureWrap["MirroredRepeat"] = 2] = "MirroredRepeat";
    })(Zia.TextureWrap || (Zia.TextureWrap = {}));
    var TextureWrap = Zia.TextureWrap;
    Zia.TextureWrapUtil = {
        _map: function (gl, wrap) {
            switch (wrap) {
                case TextureWrap.Repeat:
                    return gl.REPEAT;
                case TextureWrap.ClampToEdge:
                    return gl.CLAMP_TO_EDGE;
                case TextureWrap.MirroredRepeat:
                    return gl.MIRRORED_REPEAT;
                default:
                    throw "Invalid value: " + wrap;
            }
        }
    };
})(Zia || (Zia = {}));
