var pointerLockedElement = document.getElementById('pointer-locked');
var xElement = document.getElementById('mouse-x');
var yElement = document.getElementById('mouse-y');
var deltaXElement = document.getElementById('mouse-delta-x');
var deltaYElement = document.getElementById('mouse-delta-y');
var scrollWheelElement = document.getElementById('mouse-scroll-wheel');
var leftButtonElement = document.getElementById('mouse-left-button');
var middleButtonElement = document.getElementById('mouse-middle-button');
var rightButtonElement = document.getElementById('mouse-right-button');
var xButton1Element = document.getElementById('mouse-x-button-1');
var xButton2Element = document.getElementById('mouse-x-button-2');

var mouse = new Zia.Mouse(document.body, false);
var mouseState = {};

function updateMouseState() {
  mouse.getState(mouseState);

  pointerLockedElement.innerHTML = mouseState.pointerLocked;

  xElement.innerHTML = mouseState.x;
  yElement.innerHTML = mouseState.y;

  deltaXElement.innerHTML = mouseState.deltaX;
  deltaYElement.innerHTML = mouseState.deltaY;

  scrollWheelElement.innerHTML = mouseState.scrollWheel;

  leftButtonElement.innerHTML = mouseState.leftButton;
  middleButtonElement.innerHTML = mouseState.middleButton;
  rightButtonElement.innerHTML = mouseState.rightButton;
  xButton1Element.innerHTML = mouseState.xButton1;
  xButton2Element.innerHTML = mouseState.xButton2;

  requestAnimationFrame(updateMouseState);
}

updateMouseState();

$(function() {
  $('#lock-pointer-btn').click(function() {
    mouse.lockPointer();
  });
});
