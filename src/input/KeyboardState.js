var Zia;
(function (Zia) {
    var KeyboardState = (function () {
        function KeyboardState() {
        }
        KeyboardState.prototype._setPressedKeys = function (pressedKeys) {
            this._pressedKeys = pressedKeys.slice(0);
        };
        KeyboardState.prototype.getPressedKeys = function () {
            return this._pressedKeys;
        };
        KeyboardState.prototype.isKeyDown = function (keyCode) {
            for (var index = 0; index < this._pressedKeys.length; index++) {
                if (this._pressedKeys[index] === keyCode) {
                    return true;
                }
            }
            return false;
        };
        KeyboardState.prototype.isKeyUp = function (keyCode) {
            return !this.isKeyDown(keyCode);
        };
        return KeyboardState;
    })();
    Zia.KeyboardState = KeyboardState;
})(Zia || (Zia = {}));
