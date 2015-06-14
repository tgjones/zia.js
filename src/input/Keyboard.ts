module Zia {
  export class Keyboard {
    private _pressedKeys: number[];
    private _onKeyDown: (evt: KeyboardEvent) => void;
    private _onKeyUp: (evt: KeyboardEvent) => void;
    
    constructor() {
      this._pressedKeys = [];

      var that = this;

      this._onKeyDown = function(evt) {
        var index = that._pressedKeys.indexOf(evt.keyCode);
        if (index === -1) {
          that._pressedKeys.push(evt.keyCode);
        }
      };

      this._onKeyUp = function(evt) {
        var index = that._pressedKeys.indexOf(evt.keyCode);
        if (index >= 0) {
          that._pressedKeys.splice(index, 1);
        }
      };

      window.addEventListener('keydown', this._onKeyDown);
      window.addEventListener('keyup', this._onKeyUp);

      // TODO: blur event handler
    }

    getState(result = new KeyboardState()) {
      result._setPressedKeys(this._pressedKeys);
      return result;
    }

    destroy() {
      window.removeEventListener('keydown', this._onKeyDown);
      window.removeEventListener('keyup', this._onKeyUp);
    }
  }
}
