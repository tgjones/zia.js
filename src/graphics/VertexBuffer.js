var Zia;
(function (Zia) {
    var VertexBuffer = (function () {
        function VertexBuffer(graphicsDevice, vertexDeclaration, data) {
            this._gl = graphicsDevice.gl;
            this._buffer = this._gl.createBuffer();
            this.vertexDeclaration = vertexDeclaration;
            if (data !== undefined) {
                this.setData(data);
            }
        }
        VertexBuffer.prototype.setData = function (data) {
            var gl = this._gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        };
        VertexBuffer.prototype.destroy = function () {
            this._gl.deleteBuffer(this._buffer);
        };
        return VertexBuffer;
    })();
    Zia.VertexBuffer = VertexBuffer;
})(Zia || (Zia = {}));
