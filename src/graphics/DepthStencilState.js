var Zia;
(function (Zia) {
    (function (Comparison) {
        Comparison[Comparison["Never"] = 0] = "Never";
        Comparison[Comparison["Always"] = 1] = "Always";
        Comparison[Comparison["Less"] = 2] = "Less";
        Comparison[Comparison["Equal"] = 3] = "Equal";
        Comparison[Comparison["LessEqual"] = 4] = "LessEqual";
        Comparison[Comparison["Greater"] = 5] = "Greater";
        Comparison[Comparison["GreaterEqual"] = 6] = "GreaterEqual";
        Comparison[Comparison["NotEqual"] = 7] = "NotEqual";
    })(Zia.Comparison || (Zia.Comparison = {}));
    var Comparison = Zia.Comparison;
    var DepthStencilState = (function () {
        function DepthStencilState() {
            this.isDepthEnabled = true;
            this.depthFunction = Comparison.Less;
        }
        DepthStencilState.mapComparison = function (comparison, gl) {
            switch (comparison) {
                case Comparison.Never: return gl.NEVER;
                case Comparison.Always: return gl.ALWAYS;
                case Comparison.Less: return gl.LESS;
                case Comparison.Equal: return gl.EQUAL;
                case Comparison.LessEqual: return gl.LEQUAL;
                case Comparison.Greater: return gl.GREATER;
                case Comparison.GreaterEqual: return gl.GEQUAL;
                case Comparison.NotEqual: return gl.NOTEQUAL;
            }
        };
        DepthStencilState.prototype._apply = function (gl) {
            if (this.isDepthEnabled) {
                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(DepthStencilState.mapComparison(this.depthFunction, gl));
            }
            else {
                gl.disable(gl.DEPTH_TEST);
            }
        };
        return DepthStencilState;
    })();
    Zia.DepthStencilState = DepthStencilState;
})(Zia || (Zia = {}));
