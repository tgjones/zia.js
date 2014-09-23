Zia.Comparison = {
  Never: 0,
  Always: 1,
  Less: 2,
  Equal: 3,
  LessEqual: 4,
  Greater: 5,
  GreaterEqual: 6,
  NotEqual: 7
};

Zia.DepthStencilState = function () {
  this.isDepthEnabled = true;
  this.depthFunction = Zia.Comparison.Less;
};

(function () {
  function mapComparison(comparison, gl) {
    switch (comparison) {
      case Zia.Comparison.Never :        return gl.NEVER;
      case Zia.Comparison.Always :       return gl.ALWAYS;
      case Zia.Comparison.Less :         return gl.LESS;
      case Zia.Comparison.Equal :        return gl.EQUAL;
      case Zia.Comparison.LessEqual :    return gl.LEQUAL;
      case Zia.Comparison.Greater :      return gl.GREATER;
      case Zia.Comparison.GreaterEqual : return gl.GEQUAL;
      case Zia.Comparison.NotEqual :     return gl.NOTEQUAL;
    }
  }

  Zia.DepthStencilState.prototype = {

    _apply: function (gl) {
      if (this.isDepthEnabled) {
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(mapComparison(this.depthFunction, gl));
      }
      else {
        gl.disable(gl.DEPTH_TEST);
      }

    };
})();