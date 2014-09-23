Zia.CullMode = {
  Back: 0,
  Front: 1,
  FrontAndBack: 2,
  None: 3
};

Zia.RasterizerState = function () {
  this.cullMode = Zia.CullMode.Back;
  this.isFrontClockwise = false;
  this.isPolygonOffsetEnabled = false;
  this.polygonOffsetFactor = 0.0;
  this.polygonOffsetUnits = 0.0;
};

Zia.RasterizerState.prototype = {

  _apply: function (gl) {
    switch (this.cullMode) {
      case Zia.CullMode.Back :
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        break;
      case Zia.CullMode.Front :
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);
        break;
      case Zia.CullMode.FrontAndBack :
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT_AND_BACK);
        break;
      case Zia.CullMode.None :
        gl.disable(gl.CULL_FACE);
        break;
    }

    gl.frontFace(this.isFrontClockwise ? gl.CW : gl.CCW);

    if (this.isPolygonOffsetEnabled) {
      gl.enable(gl.POLYGON_OFFSET_FILL);
      gl.polygonOffset(this.polygonOffsetFactor, this.polygonOffsetUnits);
    } else {
      gl.disable(gl.POLYGON_OFFSET_FILL);
    }
  }

};