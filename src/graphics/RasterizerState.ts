module Zia {
  export enum CullMode {
    Back = 0,
    Front = 1,
    FrontAndBack = 2,
    None = 3
  }
  
  interface IRasterizerStateOptions {
    cullMode: CullMode;
    isFrontClockwise: boolean;
    isPolygonOffsetEnabled: boolean;
    polygonOffsetFactor: number;
    polygonOffsetUnits: number;
  }
  
  export class RasterizerState {
    public cullMode: CullMode;
    public isFrontClockwise: boolean;
    public isPolygonOffsetEnabled: boolean;
    public polygonOffsetFactor: number;
    public polygonOffsetUnits: number;
    
    constructor(options?: IRasterizerStateOptions) {
      options = Zia.ObjectUtil.reverseMerge(options || {}, {
        cullMode: Zia.CullMode.Back,
        isFrontClockwise: false,
        isPolygonOffsetEnabled: false,
        polygonOffsetFactor: 0.0,
        polygonOffsetUnits: 0.0
      });
    
      this.cullMode = options.cullMode;
      this.isFrontClockwise = options.isFrontClockwise;
      this.isPolygonOffsetEnabled = options.isPolygonOffsetEnabled;
      this.polygonOffsetFactor = options.polygonOffsetFactor;
      this.polygonOffsetUnits = options.polygonOffsetUnits;
    }
    
    _apply(gl: WebGLRenderingContext) {
      switch (this.cullMode) {
        case CullMode.Back :
          gl.enable(gl.CULL_FACE);
          gl.cullFace(gl.BACK);
          break;
        case CullMode.Front :
          gl.enable(gl.CULL_FACE);
          gl.cullFace(gl.FRONT);
          break;
        case CullMode.FrontAndBack :
          gl.enable(gl.CULL_FACE);
          gl.cullFace(gl.FRONT_AND_BACK);
          break;
        case CullMode.None :
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
  }
}