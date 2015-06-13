module Zia {
  export class Shader {
    private _gl: WebGLRenderingContext;
    
    public shader: WebGLShader;
    
    constructor(graphicsDevice: GraphicsDevice, type: number, source: string) {
      var gl = this._gl = graphicsDevice.gl;
    
      var shader = gl.createShader(type);
    
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
    
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var error = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error('Failed to compile shader: ' + error);
      }
    
      this.shader = shader;
    };
    
    destroy() {
      this._gl.deleteShader(this.shader);
    }
  }
    
  export class FragmentShader extends Shader {
    constructor(graphicsDevice: GraphicsDevice, source: string) {
      super(graphicsDevice, graphicsDevice.gl.FRAGMENT_SHADER, source);
    };
  }
  
  export class VertexShader extends Shader {
    constructor(graphicsDevice: GraphicsDevice, source: string) {
      super(graphicsDevice, graphicsDevice.gl.VERTEX_SHADER, source);
    };
  }
}