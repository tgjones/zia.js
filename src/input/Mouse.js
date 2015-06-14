var Zia;
(function (Zia) {
    (function (ButtonState) {
        ButtonState[ButtonState["Released"] = 0] = "Released";
        ButtonState[ButtonState["Pressed"] = 1] = "Pressed";
    })(Zia.ButtonState || (Zia.ButtonState = {}));
    var ButtonState = Zia.ButtonState;
    var MouseState = (function () {
        function MouseState() {
        }
        return MouseState;
    })();
    Zia.MouseState = MouseState;
    var Mouse = (function () {
        function Mouse(element, noPreventDefault) {
            this._element = element;
            this._pointerLocked = false;
            var state = this._state = new MouseState();
            state.pointerLocked = false;
            state.x = null;
            state.y = null;
            state.deltaX = null;
            state.deltaY = null;
            state.scrollWheel = null;
            state.leftButton = ButtonState.Released;
            state.middleButton = ButtonState.Released;
            state.rightButton = ButtonState.Released;
            state.xButton1 = ButtonState.Released;
            state.xButton2 = ButtonState.Released;
            var previousState = null;
            var pressedButtons = [];
            var that = this;
            var getButtonState = function (button) {
                for (var i = 0; i < pressedButtons.length; i++) {
                    if (pressedButtons[i] === button) {
                        return ButtonState.Pressed;
                    }
                }
                return ButtonState.Released;
            };
            var updateState = function (evt, updateButtons) {
                state.pointerLocked = that._pointerLocked;
                if (state.pointerLocked) {
                    state.x = null;
                    state.y = null;
                    state.deltaX = (evt.movementX !== undefined) ? evt.movementX : evt.mozMovementX;
                    state.deltaY = (evt.movementY !== undefined) ? evt.movementY : evt.mozMovementY;
                }
                else {
                    state.x = evt.clientX;
                    state.y = evt.clientY;
                    if (previousState === null) {
                        previousState = {
                            x: state.x,
                            y: state.y
                        };
                    }
                    state.deltaX = state.x - previousState.x;
                    state.deltaY = state.y - previousState.y;
                }
                if (evt.type === "wheel") {
                    state.scrollWheel = (evt.deltaY < 0) ? 1 : -1;
                }
                else {
                    state.scrollWheel = 0;
                }
                if (updateButtons) {
                    state.leftButton = getButtonState(0);
                    state.middleButton = getButtonState(1);
                    state.rightButton = getButtonState(2);
                    state.xButton1 = getButtonState(3);
                    state.xButton2 = getButtonState(4);
                }
                previousState = {
                    x: state.x,
                    y: state.y
                };
                if (!noPreventDefault) {
                    evt.preventDefault();
                }
            };
            this._onMouseDown = function (evt) {
                if (evt.button !== -1) {
                    var index = pressedButtons.indexOf(evt.button);
                    if (index === -1) {
                        pressedButtons.push(evt.button);
                    }
                }
                updateState(evt, true);
            };
            this._onMouseUp = function (evt) {
                if (evt.button !== -1) {
                    var index = pressedButtons.indexOf(evt.button);
                    if (index != -1) {
                        pressedButtons.splice(index, 1);
                    }
                }
                updateState(evt, true);
            };
            this._onMouseOut = function (evt) {
                updateState(evt, false);
            };
            this._onMouseMove = function (evt) {
                updateState(evt, false);
            };
            this._onWheel = function (evt) {
                updateState(evt, false);
            };
            this._onContextMenu = function (evt) {
                if (!noPreventDefault) {
                    evt.preventDefault();
                }
            };
            element.addEventListener('mousedown', this._onMouseDown);
            element.addEventListener('mouseup', this._onMouseUp);
            element.addEventListener('mouseout', this._onMouseOut);
            element.addEventListener('mousemove', this._onMouseMove);
            element.addEventListener('wheel', this._onWheel);
            element.addEventListener('contextmenu', this._onContextMenu);
            element.requestPointerLock = element.requestPointerLock ||
                element.msRequestPointerLock ||
                element.mozRequestPointerLock ||
                element.webkitRequestPointerLock;
            document.exitPointerLock = document.exitPointerLock ||
                document.msExitPointerLock ||
                document.mozExitPointerLock ||
                document.webkitExitPointerLock;
            this._onPointerLockChange = function (evt) {
                that._pointerLocked = (document.pointerLockElement === element
                    || document.msPointerLockElement === element
                    || document.mozPointerLockElement === element
                    || document.webkitPointerLockElement === element);
            };
            document.addEventListener('pointerlockchange', this._onPointerLockChange);
            document.addEventListener('mspointerlockchange', this._onPointerLockChange);
            document.addEventListener('mozpointerlockchange', this._onPointerLockChange);
            document.addEventListener('webkitpointerlockchange', this._onPointerLockChange);
        }
        Object.defineProperty(Mouse.prototype, "canLockPointer", {
            get: function () {
                return !!this._element.requestPointerLock;
            },
            enumerable: true,
            configurable: true
        });
        Mouse.prototype.lockPointer = function () {
            if (this._element.requestPointerLock) {
                this._element.requestPointerLock();
            }
        };
        Mouse.prototype.unlockPointer = function () {
            if (!this._pointerLocked) {
                return;
            }
            document.exitPointerLock();
        };
        Mouse.prototype.getState = function (result) {
            if (result === void 0) { result = new MouseState(); }
            var state = this._state;
            result.pointerLocked = state.pointerLocked;
            result.x = state.x;
            result.y = state.y;
            result.deltaX = state.deltaX;
            result.deltaY = state.deltaY;
            result.scrollWheel = state.scrollWheel;
            result.leftButton = state.leftButton;
            result.middleButton = state.middleButton;
            result.rightButton = state.rightButton;
            result.xButton1 = state.xButton1;
            result.xButton2 = state.xButton2;
            return result;
        };
        Mouse.prototype.destroy = function () {
            this.unlockPointer();
            this._element.removeEventListener('mousedown', this._onMouseDown);
            this._element.removeEventListener('mouseup', this._onMouseUp);
            this._element.removeEventListener('mouseout', this._onMouseOut);
            this._element.removeEventListener('mousemove', this._onMouseMove);
            this._element.removeEventListener('wheel', this._onWheel);
            this._element.removeEventListener('contextmenu', this._onContextMenu);
            document.removeEventListener('pointerlockchange', this._onPointerLockChange);
            document.removeEventListener('mspointerlockchange', this._onPointerLockChange);
            document.removeEventListener('mozpointerlockchange', this._onPointerLockChange);
            document.removeEventListener('webkitpointerlockchange', this._onPointerLockChange);
        };
        return Mouse;
    })();
    Zia.Mouse = Mouse;
})(Zia || (Zia = {}));
