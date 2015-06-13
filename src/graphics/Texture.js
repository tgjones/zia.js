var Zia;
(function (Zia) {
    var Texture = (function () {
        function Texture(graphicsDevice, options, textureType) {
            var gl = this._gl = graphicsDevice.gl;
            this._texture = this._gl.createTexture();
            this._textureType = textureType;
            this._options = Zia.ObjectUtil.reverseMerge(options || {}, {
                filter: 3 /* MinNearestMagMipLinear */,
                wrapS: 0 /* Repeat */,
                wrapT: 0 /* Repeat */
            });
            gl.bindTexture(textureType, this._texture);
            gl.texParameteri(textureType, gl.TEXTURE_WRAP_S, Zia.TextureWrapUtil._map(gl, this._options.wrapS));
            gl.texParameteri(textureType, gl.TEXTURE_WRAP_T, Zia.TextureWrapUtil._map(gl, this._options.wrapT));
            var mappedFilterValues = Zia.TextureFilterUtil._map(gl, this._options.filter);
            gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, mappedFilterValues[0]);
            gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, mappedFilterValues[1]);
            gl.bindTexture(textureType, null);
        }
        Texture.prototype._setData = function (setImageDataCallback, flipY) {
            var gl = this._gl;
            var textureType = this._textureType;
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(textureType, this._texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
            setImageDataCallback(gl);
            gl.bindTexture(textureType, null);
        };
        Texture.prototype._generateMipmap = function () {
            var gl = this._gl;
            var textureType = this._textureType;
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(textureType, this._texture);
            gl.generateMipmap(textureType);
            gl.bindTexture(textureType, null);
        };
        Texture.prototype.destroy = function () {
            this._gl.deleteTexture(this._texture);
        };
        return Texture;
    })();
    Zia.Texture = Texture;
})(Zia || (Zia = {}));
