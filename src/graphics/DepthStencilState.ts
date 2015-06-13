module Zia {
  export enum Comparison {
    Never = 0,
    Always = 1,
    Less = 2,
    Equal = 3,
    LessEqual = 4,
    Greater = 5,
    GreaterEqual = 6,
    NotEqual = 7
  }
  
  export class DepthStencilState {
    public isDepthEnabled = true;
    public depthFunction = Comparison.Less;
    
    private static mapComparison(comparison: Comparison, gl: WebGLRenderingContext) {
      switch (comparison) {
        case Comparison.Never :        return gl.NEVER;
        case Comparison.Always :       return gl.ALWAYS;
        case Comparison.Less :         return gl.LESS;
        case Comparison.Equal :        return gl.EQUAL;
        case Comparison.LessEqual :    return gl.LEQUAL;
        case Comparison.Greater :      return gl.GREATER;
        case Comparison.GreaterEqual : return gl.GEQUAL;
        case Comparison.NotEqual :     return gl.NOTEQUAL;
      }
    }
    
    _apply(gl: WebGLRenderingContext) {
      if (this.isDepthEnabled) {
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(DepthStencilState.mapComparison(this.depthFunction, gl));
      }
      else {
        gl.disable(gl.DEPTH_TEST);
      }
    }
  }
}