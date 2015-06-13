var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Zia;
(function (Zia) {
    Zia.CubeMapFaceUtil = {
        _map: function (gl, face) {
            switch (face) {
                case 1 /* NegativeX */:
                    return gl.TEXTURE_CUBE_MAP_NEGATIVE_X;
                case 3 /* NegativeY */:
                    return gl.TEXTURE_CUBE_MAP_NEGATIVE_Y;
                case 5 /* NegativeZ */:
                    return gl.TEXTURE_CUBE_MAP_NEGATIVE_Z;
                case 0 /* PositiveX */:
                    return gl.TEXTURE_CUBE_MAP_POSITIVE_X;
                case 2 /* PositiveY */:
                    return gl.TEXTURE_CUBE_MAP_POSITIVE_Y;
                case 4 /* PositiveZ */:
                    return gl.TEXTURE_CUBE_MAP_POSITIVE_Z;
                default:
                    throw "Invalid face: " + face;
            }
        }
    };
    var TextureCube = (function (_super) {
        __extends(TextureCube, _super);
        function TextureCube(graphicsDevice, options) {
            _super.call(this, graphicsDevice, options, graphicsDevice.gl.TEXTURE_CUBE_MAP);
        }
        TextureCube.prototype.setData = function (cubeMapFace, data) {
            var size = this.size;
            this._setData(function (gl) {
                gl.texImage2D(Zia.CubeMapFaceUtil._map(gl, cubeMapFace), 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
            }, false);
        };
        TextureCube.createFromImagePaths = function (graphicsDevice, imagePaths, options) {
            if (imagePaths.length !== 6) {
                throw "Must pass an array of 6 URLs";
            }
            var result = new Zia.TextureCube(graphicsDevice, options);
            // Set temporary 1x1 white texture, until images have loaded
            result.size = 1;
            var whitePixel = new Uint8Array([255, 255, 255, 255]);
            for (var i = 0; i < 6; i++) {
                result.setData(i, whitePixel);
            }
            var gl = graphicsDevice.gl;
            var loaded = 0;
            for (var i = 0; i < imagePaths.length; i++) {
                var imagePath = imagePaths[i];
                (function (localI) {
                    var image = new Image();
                    image.onload = function () {
                        result._setData(function () {
                            gl.texImage2D(Zia.CubeMapFaceUtil._map(gl, localI), 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                        }, false);
                        if (image.naturalWidth != image.naturalHeight) {
                            throw "Must use square textures for TextureCube";
                        }
                        if (loaded === 0) {
                            result.size = image.naturalWidth;
                        }
                        else if (image.naturalWidth !== result.size) {
                            throw "All 6 textures must have the same dimensions";
                        }
                        loaded++;
                        if (loaded === 6) {
                            result._generateMipmap();
                        }
                    };
                    image.src = imagePath;
                })(i);
            }
            return result;
        };
        return TextureCube;
    })(Zia.Texture);
    Zia.TextureCube = TextureCube;
})(Zia || (Zia = {}));
