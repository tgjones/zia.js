module Zia {
  export class KeyboardState {
    private _pressedKeys: number[];

    _setPressedKeys(pressedKeys: number[]) {
      this._pressedKeys = pressedKeys.slice(0);
    }

    getPressedKeys() {
      return this._pressedKeys;
    }

    isKeyDown(keyCode: number) {
      for (var index = 0; index < this._pressedKeys.length; index++) {
        if (this._pressedKeys[index] === keyCode) {
          return true;
        }
      }
      return false;
    }

    isKeyUp(keyCode: number) {
      return !this.isKeyDown(keyCode);
    }
  }
}
