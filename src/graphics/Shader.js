var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Zia;
(function (Zia) {
    var Shader = (function () {
        function Shader(graphicsDevice, type, source) {
            var gl = this._gl = graphicsDevice.gl;
            var shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                var error = gl.getShaderInfoLog(shader);
                gl.deleteShader(shader);
                throw new Error('Failed to compile shader: ' + error);
            }
            this.shader = shader;
        }
        ;
        Shader.prototype.destroy = function () {
            this._gl.deleteShader(this.shader);
        };
        return Shader;
    })();
    Zia.Shader = Shader;
    var FragmentShader = (function (_super) {
        __extends(FragmentShader, _super);
        function FragmentShader(graphicsDevice, source) {
            _super.call(this, graphicsDevice, graphicsDevice.gl.FRAGMENT_SHADER, source);
        }
        ;
        return FragmentShader;
    })(Shader);
    Zia.FragmentShader = FragmentShader;
    var VertexShader = (function (_super) {
        __extends(VertexShader, _super);
        function VertexShader(graphicsDevice, source) {
            _super.call(this, graphicsDevice, graphicsDevice.gl.VERTEX_SHADER, source);
        }
        ;
        return VertexShader;
    })(Shader);
    Zia.VertexShader = VertexShader;
})(Zia || (Zia = {}));
