var Zia;
(function (Zia) {
    var Color4 = (function () {
        function Color4(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        Color4.prototype.copy = function (other) {
            this.r = other.r;
            this.g = other.g;
            this.b = other.b;
            this.a = other.a;
            return this;
        };
        Color4.prototype.multiplyScalar = function (s) {
            this.r *= s;
            this.g *= s;
            this.b *= s;
            return this;
        };
        Color4.prototype.toJS = function () {
            return [this.r, this.g, this.b, this.a];
        };
        return Color4;
    })();
    Zia.Color4 = Color4;
})(Zia || (Zia = {}));
