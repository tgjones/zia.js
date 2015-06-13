module Zia {
  function addLighting(result: string[]) {
    result.push("uniform vec3 uDirLight0Direction;");
    result.push("uniform vec3 uDirLight0DiffuseColor;");
    result.push("#define uDirLight0SpecularColor vec3(0,0,0)");

    result.push("uniform vec3 uDirLight1Direction;");
    result.push("uniform vec3 uDirLight1DiffuseColor;");
    result.push("#define uDirLight1SpecularColor vec3(0,0,0)");

    result.push("uniform vec3 uDirLight2Direction;");
    result.push("uniform vec3 uDirLight2DiffuseColor;");
    result.push("#define uDirLight2SpecularColor vec3(0,0,0)");

    result.push("uniform vec3 uEyePosition;");

    result.push("uniform vec3 uEmissiveColor;");
    result.push("#define uSpecularColor vec3(0,0,0)");
    result.push("#define uSpecularPower 0");

    result.push(Zia.SharedProgramCode.lighting);
  }

  function buildVertexShader(options: IEnvironmentMapProgramOptions) {
    var result: string[] = [];

    result.push("precision mediump float;");

    // Attributes
    result.push("attribute vec3 aVertexPosition;");
    result.push("attribute vec3 aVertexNormal;");
    result.push("attribute vec2 aTextureCoord;");

    // Uniforms
    result.push("uniform mat4 uMVPMatrix;");
    result.push("uniform mat4 uMMatrix;");
    result.push("uniform mat3 uMMatrixInverseTranspose;");
    result.push("uniform vec4 uDiffuseColor;");
    result.push("uniform float uEnvironmentMapAmount;");
    result.push("uniform float uFresnelFactor;");

    result.push("uniform vec3 uDirLight0Direction;");
    result.push("uniform vec3 uDirLight0DiffuseColor;");
    result.push("#define uDirLight0SpecularColor vec3(0,0,0)");

    result.push("uniform vec3 uDirLight1Direction;");
    result.push("uniform vec3 uDirLight1DiffuseColor;");
    result.push("#define uDirLight1SpecularColor vec3(0,0,0)");

    result.push("uniform vec3 uDirLight2Direction;");
    result.push("uniform vec3 uDirLight2DiffuseColor;");
    result.push("#define uDirLight2SpecularColor vec3(0,0,0)");

    result.push("uniform vec3 uEyePosition;");

    result.push("uniform vec3 uEmissiveColor;");
    result.push("#define uSpecularColor vec3(0,0,0)");
    result.push("#define uSpecularPower 0");

    result.push(Zia.SharedProgramCode.lighting);

    // Varyings
    result.push("varying vec4 vDiffuseColor;");
    result.push("varying vec3 vSpecularColor;");
    result.push("varying vec2 vTextureCoord;");
    result.push("varying vec3 vEnvCoord;");

    // Code

    result.push("float ComputeFresnelFactor(vec3 eyeVector, vec3 worldNormal) {");
    result.push("  float viewAngle = dot(eyeVector, worldNormal);");
    result.push("  return pow(max(1.0 - abs(viewAngle), 0.0), uFresnelFactor) * uEnvironmentMapAmount;");
    result.push("}");

    result.push("void main(void) {");
    result.push("  gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);");

    result.push("  vec4 positionWS = uMMatrix * vec4(aVertexPosition, 1.0);");
    result.push("  vec3 eyeVector = normalize(uEyePosition - positionWS.xyz);");
    result.push("  vec3 worldNormal = normalize(uMMatrixInverseTranspose * aVertexNormal);");

    result.push("  ColorPair lightResult = ComputeLights(eyeVector, worldNormal);");

    result.push("  vDiffuseColor = vec4(lightResult.Diffuse, uDiffuseColor.a);");

    if (options.fresnelEnabled) {
      result.push("  vSpecularColor.rgb = vec3(ComputeFresnelFactor(eyeVector, worldNormal));");
    } else {
      result.push("  vSpecularColor.rgb = vec3(uEnvironmentMapAmount);");
    }

    result.push("  vTextureCoord = aTextureCoord;");
    result.push("  vEnvCoord = reflect(-eyeVector, worldNormal);");
    result.push("}");

    return result.join('\n');
  }

  function buildFragmentShader(options: IEnvironmentMapProgramOptions) {
    var result: string[] = [];

    result.push("precision mediump float;");

    result.push("varying vec4 vDiffuseColor;");
    result.push("varying vec3 vSpecularColor;");

    result.push("varying vec2 vTextureCoord;");
    result.push("uniform sampler2D uSampler;");

    result.push("varying vec3 vEnvCoord;");
    result.push("uniform samplerCube uEnvironmentMapSampler;");

    result.push("uniform vec3 uEnvironmentMapSpecular;");

    result.push("void main(void) {");
    result.push("  vec4 color = vDiffuseColor;");
    result.push("  color *= texture2D(uSampler, vTextureCoord);");
    result.push("  vec4 envmap = textureCube(uEnvironmentMapSampler, vEnvCoord) * color.a;");

    result.push("  color.rgb = mix(color.rgb, envmap.rgb, vSpecularColor.rgb);");

    if (options.environmentMapSpecularEnabled) {
      result.push("  color.rgb += uEnvironmentMapSpecular * envmap.a;");
    }

    result.push("  gl_FragColor = color;");
    result.push("}");

    return result.join('\n');
  }

  export interface IEnvironmentMapProgramOptions {
    lightingEnabled: boolean;
    environmentMapSpecularEnabled: boolean;
    fresnelEnabled: boolean;
  }

  /**
   * A rendering effect with support for an environment map cube texture.
   */
  export class EnvironmentMapProgram extends Program {
    private _options: IEnvironmentMapProgramOptions;
    private _dirtyFlags: ProgramDirtyFlags;
    private _modelMatrix: Matrix4;
    private _viewMatrix: Matrix4;
    private _projectionMatrix: Matrix4;
    private _diffuseColor: Vector3;
    private _emissiveColor: Vector3;
    private _alpha: number;
    private _texture: Texture2D;
    private _environmentMap: TextureCube;
    private _environmentMapAmount: number;
    private _environmentMapSpecular: Vector3;
    private _fresnelFactor: number;
    private _ambientLightColor: Vector3;
    private _directionalLight0: DirectionalLight;
    private _directionalLight1: DirectionalLight;
    private _directionalLight2: DirectionalLight;

    private _modelView: Matrix4;

    /**
     * Constructs a new `EnvironmentMapProgram`.
     *
     * @param {Zia.GraphicsDevice} graphicsDevice - The graphics device.
     * @param {Object} [options] - TODO
     */
    constructor(graphicsDevice: GraphicsDevice, options: IEnvironmentMapProgramOptions) {
      this._dirtyFlags = Zia.ProgramDirtyFlags.All;

      this.modelMatrix = new Zia.Matrix4();
      this.viewMatrix = new Zia.Matrix4();
      this.projectionMatrix = new Zia.Matrix4();
      this._modelView = new Zia.Matrix4();
      this.diffuseColor = new Zia.Vector3(1, 1, 1);
      this.emissiveColor = new Zia.Vector3();
      this.alpha = 1;
      this.texture = null;
      this.ambientLightColor = new Zia.Vector3();
      this._environmentMap = null;
      this.environmentMapAmount = 1;
      this.environmentMapSpecular = new Zia.Vector3();
      this.fresnelFactor = 1;

      this._directionalLight0 = new Zia.DirectionalLight(this, 0);
      this._directionalLight1 = new Zia.DirectionalLight(this, 1);
      this._directionalLight2 = new Zia.DirectionalLight(this, 2);

      this._directionalLight0.enabled = true;

      options = Zia.ObjectUtil.reverseMerge(options || {}, {
        environmentMapSpecularEnabled: false,
        fresnelEnabled: true
      });
      this._options = options;

      var vertexShader = new Zia.VertexShader(graphicsDevice, buildVertexShader(options));
      var fragmentShader = new Zia.FragmentShader(graphicsDevice, buildFragmentShader(options));

      super(graphicsDevice, vertexShader, fragmentShader);
    }

    get modelMatrix() { return this._modelMatrix; }
    set modelMatrix(v) {
      this._modelMatrix = v;
      this._dirtyFlags |= ProgramDirtyFlags.Model | ProgramDirtyFlags.ModelViewProj;
    }

    get viewMatrix() { return this._viewMatrix; }
    set viewMatrix(v) {
      this._viewMatrix = v;
      this._dirtyFlags |= ProgramDirtyFlags.ModelViewProj | ProgramDirtyFlags.EyePosition;
    }

    get projectionMatrix() { return this._projectionMatrix; }
    set projectionMatrix(v) {
      this._projectionMatrix = v;
      this._dirtyFlags |= ProgramDirtyFlags.ModelViewProj;
    }

    get diffuseColor() { return this._diffuseColor; }
    set diffuseColor(v) {
      this._diffuseColor = v;
      this._dirtyFlags |= ProgramDirtyFlags.MaterialColor;
    }

    get emissiveColor() { return this._emissiveColor; }
    set emissiveColor(v) {
      this._emissiveColor = v;
      this._dirtyFlags |= ProgramDirtyFlags.MaterialColor;
    }

    get alpha() { return this._alpha; }
    set alpha(v) {
      this._alpha = v;
      this._dirtyFlags |= ProgramDirtyFlags.MaterialColor;
    }

    get ambientLightColor() { return this._ambientLightColor; }
    set ambientLightColor(v) {
      this._ambientLightColor = v;
      this._dirtyFlags |= ProgramDirtyFlags.MaterialColor;
    }

    get directionalLight0() { return this._directionalLight0; }
    get directionalLight1() { return this._directionalLight1; }
    get directionalLight2() { return this._directionalLight2; }

    get texture() { return this._texture; }
    set texture(v) { this._texture = v; }

    get environmentMap() { return this._environmentMap; }
    set environmentMap(v) { this._environmentMap = v; }

    get environmentMapAmount() { return this._environmentMapAmount; }
    set environmentMapAmount(v) {
      this._environmentMapAmount = v;
      this._dirtyFlags |= ProgramDirtyFlags.EnvironmentMapAmount;
    }

    get environmentMapSpecular() { return this._environmentMapSpecular; }
    set environmentMapSpecular(v) {
      this._environmentMapSpecular = v;
      this._dirtyFlags |= ProgramDirtyFlags.EnvironmentMapSpecular;
    }

    get fresnelFactor() { return this._fresnelFactor; }
    set fresnelFactor(v) {
      this._fresnelFactor = v;
      this._dirtyFlags |= ProgramDirtyFlags.FresnelFactor;
    }

    enableDefaultLighting() {
      this.ambientLightColor = Zia.ProgramUtil.enableDefaultLighting(
        this._directionalLight0,
        this._directionalLight1,
        this._directionalLight2);
    }

    _onApply() {
      // Recompute the model+view+projection matrix?
      this._dirtyFlags = Zia.ProgramUtil.setModelViewProj(
        this, this._dirtyFlags,
        this._modelMatrix, this._viewMatrix, this._projectionMatrix,
        this._modelView);

      // Recompute the diffuse/emissive/alpha material color parameters?
      if ((this._dirtyFlags & ProgramDirtyFlags.MaterialColor) != 0) {
        Zia.ProgramUtil.setMaterialColor(
          this, this._options.lightingEnabled,
          this._alpha, this._diffuseColor, this._emissiveColor,
          this._ambientLightColor);

        this._dirtyFlags &= ~ProgramDirtyFlags.MaterialColor;
      }

      this.setUniform('uSampler', this._texture);
      this.setUniform('uEnvironmentMapSampler', this._environmentMap);

      if ((this._dirtyFlags & ProgramDirtyFlags.EnvironmentMapAmount) != 0) {
        this.setUniform('uEnvironmentMapAmount', this._environmentMapAmount);
        this._dirtyFlags &= ~ProgramDirtyFlags.EnvironmentMapAmount;
      }

      if ((this._dirtyFlags & ProgramDirtyFlags.EnvironmentMapSpecular) != 0) {
        this.setUniform('uEnvironmentMapSpecular', this._environmentMapSpecular);
        this._dirtyFlags &= ~ProgramDirtyFlags.EnvironmentMapSpecular;
      }

      if ((this._dirtyFlags & ProgramDirtyFlags.FresnelFactor) != 0) {
        this.setUniform('uFresnelFactor', this._fresnelFactor);
        this._dirtyFlags &= ~ProgramDirtyFlags.FresnelFactor;
      }

      // Recompute the world inverse transpose and eye position?
      this._dirtyFlags = Zia.ProgramUtil.setLightingMatrices(
        this, this._dirtyFlags, this._modelMatrix, this._viewMatrix);

      this._directionalLight0._apply();
      this._directionalLight1._apply();
      this._directionalLight2._apply();
    }
  }
}
