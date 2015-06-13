var Zia;
(function (Zia) {
    var Viewport = (function () {
        function Viewport(x, y, width, height, minDepth, maxDepth) {
            if (minDepth === void 0) { minDepth = 0.0; }
            if (maxDepth === void 0) { maxDepth = 1.0; }
            this._onChangeCallback = function () { };
            this._x = x;
            this._y = y;
            this._width = width;
            this._height = height;
            this._minDepth = minDepth;
            this._maxDepth = maxDepth;
        }
        ;
        Object.defineProperty(Viewport.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (v) {
                this._x = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Viewport.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (v) {
                this._y = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Viewport.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (v) {
                this._width = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Viewport.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (v) {
                this._height = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Viewport.prototype, "minDepth", {
            get: function () {
                return this._minDepth;
            },
            set: function (v) {
                this._minDepth = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Viewport.prototype, "maxDepth", {
            get: function () {
                return this._maxDepth;
            },
            set: function (v) {
                this._maxDepth = v;
                this._onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Viewport.prototype, "aspectRatio", {
            get: function () {
                if (this._height == 0 || this._width == 0)
                    return 0;
                return this._width / this._height;
            },
            enumerable: true,
            configurable: true
        });
        Viewport.prototype.set = function (x, y, width, height, minDepth, maxDepth) {
            this._x = x;
            this._y = y;
            this._width = width;
            this._height = height;
            if (minDepth !== undefined) {
                this._minDepth = minDepth;
            }
            if (maxDepth !== undefined) {
                this._maxDepth = maxDepth;
            }
            this._onChangeCallback();
        };
        Viewport.prototype.onChange = function (callback) {
            this._onChangeCallback = callback;
            return this;
        };
        Viewport.prototype.suppressChangeCallback = function (func) {
            var temp = this._onChangeCallback;
            this._onChangeCallback = function () { };
            func();
            this._onChangeCallback = temp;
        };
        return Viewport;
    })();
    Zia.Viewport = Viewport;
})(Zia || (Zia = {}));
