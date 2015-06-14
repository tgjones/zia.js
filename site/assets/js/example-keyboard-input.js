var pressedKeysElement = document.getElementById('pressed-keys');
var spaceKeyDownElement = document.getElementById('space-key-down');
var aKeyUpElement = document.getElementById('a-key-up');

var keyboard = new Zia.Keyboard();
var keyboardState = new Zia.KeyboardState();

function updatePressedKeys() {
  keyboard.getState(keyboardState);
  var pressedKeys = keyboardState.getPressedKeys();

  var output = "";
  for (var i = 0; i < pressedKeys.length; i++) {
    output += pressedKeys[i];
    if (i < pressedKeys.length - 1) {
      output += ", ";
    }
  }
  pressedKeysElement.innerHTML = output;

  spaceKeyDownElement.innerHTML = keyboardState.isKeyDown(32) ? "Yes" : "No";
  aKeyUpElement.innerHTML = keyboardState.isKeyUp(65) ? "Yes" : "No";

  requestAnimationFrame(updatePressedKeys);
}

updatePressedKeys();
