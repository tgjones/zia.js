var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Zia;
(function (Zia) {
    var Texture2D = (function (_super) {
        __extends(Texture2D, _super);
        function Texture2D(graphicsDevice, options) {
            _super.call(this, graphicsDevice, options, graphicsDevice.gl.TEXTURE_2D);
        }
        Texture2D.prototype.setData = function (data) {
            var width = this.width, height = this.height;
            this._setData(function (gl) {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
            }, true);
            this._generateMipmap();
        };
        Texture2D.createFromImagePath = function (graphicsDevice, imagePath, options) {
            var result = new Zia.Texture2D(graphicsDevice, options);
            var gl = graphicsDevice.gl;
            // Set temporary 1x1 white texture, until image has loaded
            result.width = 1;
            result.height = 1;
            result.setData(new Uint8Array([255, 255, 255, 255]));
            var image = new Image();
            image.onload = function () {
                result._setData(function () {
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                }, true);
                result._generateMipmap();
                result.width = image.naturalWidth;
                result.height = image.naturalHeight;
            };
            image.src = imagePath;
            return result;
        };
        Texture2D.createFromImageData = function (graphicsDevice, imageData, width, height, options) {
            var result = new Zia.Texture2D(graphicsDevice, options);
            result.width = width;
            result.height = height;
            var gl = graphicsDevice.gl;
            result.setData(imageData);
            return result;
        };
        Texture2D.createWhiteTexture = function (graphicsDevice) {
            var whitePixel = new Uint8Array([255, 255, 255, 255]);
            return Texture2D.createFromImageData(graphicsDevice, whitePixel, 1, 1);
        };
        return Texture2D;
    })(Zia.Texture);
    Zia.Texture2D = Texture2D;
})(Zia || (Zia = {}));
