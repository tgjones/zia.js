module Zia {
  export class Viewport {
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _minDepth: number;
    private _maxDepth: number;
    
    private _onChangeCallback = () => {};
    
    constructor(x: number, y: number, width: number, height: number, minDepth: number = 0.0, maxDepth: number = 1.0) {
      this._x = x;
      this._y = y;
      this._width = width;
      this._height = height;
      this._minDepth = minDepth;
      this._maxDepth = maxDepth;
    };
    
    get x() {
      return this._x;
    }
  
    set x(v) {
      this._x = v;
      this._onChangeCallback();
    }
  
    get y() {
      return this._y;
    }
  
    set y(v) {
      this._y = v;
      this._onChangeCallback();
    }
  
    get width() {
      return this._width;
    }
  
    set width(v) {
      this._width = v;
      this._onChangeCallback();
    }
  
    get height() {
      return this._height;
    }
  
    set height(v) {
      this._height = v;
      this._onChangeCallback();
    }
  
    get minDepth() {
      return this._minDepth;
    }
  
    set minDepth(v) {
      this._minDepth = v;
      this._onChangeCallback();
    }
  
    get maxDepth() {
      return this._maxDepth;
    }
  
    set maxDepth(v) {
      this._maxDepth = v;
      this._onChangeCallback();
    }
  
    get aspectRatio() {
      if (this._height == 0 || this._width == 0)
        return 0;
      return this._width / this._height;
    }
  
    set(x: number, y: number, width: number, height: number, minDepth?: number, maxDepth?: number) {
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
    }
  
    onChange(callback: () => void) {
      this._onChangeCallback = callback;
      return this;
    }
  
    suppressChangeCallback(func: () => void) {
      var temp = this._onChangeCallback;
      this._onChangeCallback = () => { };
      func();
      this._onChangeCallback = temp;
    }
  }
}