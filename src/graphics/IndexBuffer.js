var Zia;
(function (Zia) {
    var IndexBuffer = (function () {
        function IndexBuffer(graphicsDevice, data) {
            this._gl = graphicsDevice.gl;
            this._buffer = this._gl.createBuffer();
            if (data !== undefined) {
                this.setData(data);
            }
        }
        IndexBuffer.prototype.setData = function (data) {
            var gl = this._gl;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
        };
        IndexBuffer.prototype.destroy = function () {
            this._gl.deleteBuffer(this._buffer);
        };
        return IndexBuffer;
    })();
    Zia.IndexBuffer = IndexBuffer;
})(Zia || (Zia = {}));
