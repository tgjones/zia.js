var Zia;
(function (Zia) {
    (function (CullMode) {
        CullMode[CullMode["Back"] = 0] = "Back";
        CullMode[CullMode["Front"] = 1] = "Front";
        CullMode[CullMode["FrontAndBack"] = 2] = "FrontAndBack";
        CullMode[CullMode["None"] = 3] = "None";
    })(Zia.CullMode || (Zia.CullMode = {}));
    var CullMode = Zia.CullMode;
    var RasterizerState = (function () {
        function RasterizerState(options) {
            options = Zia.ObjectUtil.reverseMerge(options || {}, {
                cullMode: Zia.CullMode.Back,
                isFrontClockwise: false,
                isPolygonOffsetEnabled: false,
                polygonOffsetFactor: 0.0,
                polygonOffsetUnits: 0.0
            });
            this.cullMode = options.cullMode;
            this.isFrontClockwise = options.isFrontClockwise;
            this.isPolygonOffsetEnabled = options.isPolygonOffsetEnabled;
            this.polygonOffsetFactor = options.polygonOffsetFactor;
            this.polygonOffsetUnits = options.polygonOffsetUnits;
        }
        RasterizerState.prototype._apply = function (gl) {
            switch (this.cullMode) {
                case CullMode.Back:
                    gl.enable(gl.CULL_FACE);
                    gl.cullFace(gl.BACK);
                    break;
                case CullMode.Front:
                    gl.enable(gl.CULL_FACE);
                    gl.cullFace(gl.FRONT);
                    break;
                case CullMode.FrontAndBack:
                    gl.enable(gl.CULL_FACE);
                    gl.cullFace(gl.FRONT_AND_BACK);
                    break;
                case CullMode.None:
                    gl.disable(gl.CULL_FACE);
                    break;
            }
            gl.frontFace(this.isFrontClockwise ? gl.CW : gl.CCW);
            if (this.isPolygonOffsetEnabled) {
                gl.enable(gl.POLYGON_OFFSET_FILL);
                gl.polygonOffset(this.polygonOffsetFactor, this.polygonOffsetUnits);
            }
            else {
                gl.disable(gl.POLYGON_OFFSET_FILL);
            }
        };
        return RasterizerState;
    })();
    Zia.RasterizerState = RasterizerState;
})(Zia || (Zia = {}));
