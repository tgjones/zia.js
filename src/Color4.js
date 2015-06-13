var Zia;
(function (Zia) {
    /**
     * Represents a 4-component color with red, green, blue and alpha components.
     */
    var Color4 = (function () {
        /**
         * Constructs a new `Color4` object.
         *
         * @param r - The value for the red component.
         * @param g - The value for the green component.
         * @param b - The value for the blue component.
         * @param a - The value for the alpha component.
         */
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
