var Zia;
(function (Zia) {
    var Keyboard = (function () {
        function Keyboard() {
            this._pressedKeys = [];
            var that = this;
            this._onKeyDown = function (evt) {
                var index = that._pressedKeys.indexOf(evt.keyCode);
                if (index === -1) {
                    that._pressedKeys.push(evt.keyCode);
                }
            };
            this._onKeyUp = function (evt) {
                var index = that._pressedKeys.indexOf(evt.keyCode);
                if (index >= 0) {
                    that._pressedKeys.splice(index, 1);
                }
            };
            window.addEventListener('keydown', this._onKeyDown);
            window.addEventListener('keyup', this._onKeyUp);
        }
        Keyboard.prototype.getState = function (result) {
            if (result === void 0) { result = new Zia.KeyboardState(); }
            result._setPressedKeys(this._pressedKeys);
            return result;
        };
        Keyboard.prototype.destroy = function () {
            window.removeEventListener('keydown', this._onKeyDown);
            window.removeEventListener('keyup', this._onKeyUp);
        };
        return Keyboard;
    })();
    Zia.Keyboard = Keyboard;
})(Zia || (Zia = {}));
