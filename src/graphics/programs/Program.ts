module Zia {
  interface IActiveInfo {
    location: WebGLUniformLocation;
    name: string;
    size: number;
    type: number;
  }

  interface IProgramInfo {
    attributes: IActiveInfo[];
    uniforms: IActiveInfo[];
    samplers: { [samplerName: string]: number };
  }

  // From http://bocoup.com/weblog/counting-uniforms-in-webgl/
  function getProgramInfo(gl: WebGLRenderingContext, program: WebGLProgram) {
    let result: IProgramInfo = {
      attributes: [],
      uniforms: [],
      samplers: {}
    };
    let activeUniforms: number = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    let activeAttributes: number = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

    function toSimpleObject(activeInfo: WebGLActiveInfo, location: WebGLUniformLocation): IActiveInfo {
      return {
        location: location,
        name: activeInfo.name,
        size: activeInfo.size,
        type: activeInfo.type
      };
    }

    // Loop through active uniforms
    for (var i = 0; i < activeUniforms; i++) {
      let uniform = gl.getActiveUniform(program, i);
      result.uniforms.push(toSimpleObject(uniform,
        gl.getUniformLocation(program, uniform.name)));
    }

    // Loop through active attributes
    for (var i = 0; i < activeAttributes; i++) {
      let attribute = gl.getActiveAttrib(program, i);
      result.attributes.push(toSimpleObject(attribute,
        gl.getAttribLocation(program, attribute.name)));
    }

    // Loop through samplers
    var samplerIndex = 0;
    for (var i = 0; i < result.uniforms.length; i++) {
      let uniform = result.uniforms[i];
      switch (uniform.type) {
        case gl.SAMPLER_2D :
        case gl.SAMPLER_CUBE :
          result.samplers[uniform.name] = samplerIndex++;
          break;
      }
    }

    return result;
  }

  /**
   * Wrapper for a single WebGL Program object.
   */
  export class Program {
    private _graphicsDevice: GraphicsDevice;
    private _gl: WebGLRenderingContext;
    private _program: WebGLProgram;
    public _attributes: IActiveInfo[]; // TODO: internal
    private _uniforms: IActiveInfo[];
    private _uniformsByName: { [name: string]: IActiveInfo };
    private _samplerIndices: { [samplerName: string]: number };

    /**
     * Constructs a new program.
     *
     * @param graphicsDevice The graphics device.
     * @param vertexShader The vertex shader.
     * @param fragmentShader The fragmentShader.
     */
    constructor(graphicsDevice: GraphicsDevice, vertexShader: VertexShader, fragmentShader: FragmentShader) {
      this._graphicsDevice = graphicsDevice;
      var gl = this._gl = graphicsDevice.gl;

      var program = gl.createProgram();

      gl.attachShader(program, vertexShader.shader);
      gl.attachShader(program, fragmentShader.shader);
      gl.linkProgram(program);

      var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (!linked) {
        var error = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error('Failed to link program: ' + error);
      }

      this._program = program;

      var programInfo = getProgramInfo(this._gl, this._program);
      this._attributes = programInfo.attributes;
      this._uniforms = programInfo.uniforms;

      this._uniformsByName = {};
      for (var i = 0; i < this._uniforms.length; i++) {
        var uniform = this._uniforms[i];
        this._uniformsByName[uniform.name] = uniform;
      }

      this._samplerIndices = programInfo.samplers;
    };

    apply() {
      this._graphicsDevice._currentProgram = this;
      this._gl.useProgram(this._program);
      this._onApply();
    }

    _onApply() {

    }

    private static _temp = new Vector4();

    setUniform(name: string, value: any) {
      if (value instanceof Color4) {
        Program._temp.set(value.r, value.g, value.b, value.a);
        value = Program._temp;
      }

      var uniform = this._uniformsByName[name];

      if (uniform === undefined) {
        return;
      }

      var gl = this._gl;

      switch (uniform.type) {
        case gl.FLOAT :
          gl.uniform1f(uniform.location, value);
          break;
        case gl.FLOAT_VEC2 :
          gl.uniform2f(uniform.location, value._x, value._y);
          break;
        case gl.FLOAT_VEC3 :
          gl.uniform3f(uniform.location, value._x, value._y, value._z);
          break;
        case gl.FLOAT_VEC4 :
          gl.uniform4f(uniform.location, value.x, value.y, value.z, value.w);
          break;
        case gl.FLOAT_MAT3 :
          gl.uniformMatrix3fv(uniform.location, false, value.elements);
          break;
        case gl.FLOAT_MAT4 :
          gl.uniformMatrix4fv(uniform.location, false, value.elements);
          break;
        case gl.SAMPLER_2D :
          this._setUniformSampler(gl, uniform, value, gl.TEXTURE_2D);
          break;
        case gl.SAMPLER_CUBE :
          this._setUniformSampler(gl, uniform, value, gl.TEXTURE_CUBE_MAP);
          break;
        default :
          throw "Not implemented for type: " + uniform.type;
      }
    }

    _setUniformSampler(gl: WebGLRenderingContext, uniform: IActiveInfo, value: any, textureType: number) {
      var samplerIndex = this._samplerIndices[uniform.name];
      gl.activeTexture(gl.TEXTURE0 + samplerIndex);
      if (value !== null) {
        gl.bindTexture(textureType, value._texture);
        gl.uniform1i(uniform.location, samplerIndex);
      } else {
        gl.bindTexture(textureType, null);
      }
    }

    destroy() {
      var attachedShaders = this._gl.getAttachedShaders(this._program);
      for (var i = 0; i < attachedShaders.length; i++) {
        this._gl.detachShader(this._program, attachedShaders[i]);
      }

      this._gl.deleteProgram(this._program);
    }
  }
}
