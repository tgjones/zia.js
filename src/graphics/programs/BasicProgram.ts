module Zia {
  function addLighting(result: string[]) {
    result.push("uniform vec3 uDirLight0Direction;");
    result.push("uniform vec3 uDirLight0DiffuseColor;");
    result.push("uniform vec3 uDirLight0SpecularColor;");

    result.push("uniform vec3 uDirLight1Direction;");
    result.push("uniform vec3 uDirLight1DiffuseColor;");
    result.push("uniform vec3 uDirLight1SpecularColor;");

    result.push("uniform vec3 uDirLight2Direction;");
    result.push("uniform vec3 uDirLight2DiffuseColor;");
    result.push("uniform vec3 uDirLight2SpecularColor;");

    result.push("uniform vec3 uEyePosition;");

    result.push("uniform vec3 uEmissiveColor;");
    result.push("uniform vec3 uSpecularColor;");
    result.push("uniform float uSpecularPower;");

    result.push(Zia.SharedProgramCode.lighting);
  }

  function buildVertexShader(options: IBasicProgramOptions) {
    var result: string[] = [];

    result.push("precision mediump float;");

    // Attributes
    result.push("attribute vec3 aVertexPosition;");
    if (options.lightingEnabled) {
      result.push("attribute vec3 aVertexNormal;");
    }
    if (options.vertexColorEnabled) {
      result.push("attribute vec4 aVertexColor;");
    }
    if (options.textureEnabled) {
      result.push("attribute vec2 aTextureCoord;");
    }

    // Uniforms
    result.push("uniform mat4 uMVPMatrix;");
    if (options.lightingEnabled) {
      result.push("uniform mat4 uMMatrix;");
      result.push("uniform mat3 uMMatrixInverseTranspose;");
    }
    result.push("uniform vec4 uDiffuseColor;");

    // Varyings
    result.push("varying vec4 vDiffuseColor;");
    if (options.lightingEnabled) {
      if (options.perPixelLightingEnabled) {
        result.push("varying vec3 vPositionWS;");
        result.push("varying vec3 vNormalWS;");
      } else {
        result.push("varying vec3 vSpecularColor;");
        addLighting(result);
        result.push(Zia.SharedProgramCode.lightingVertex);
      }
    }
    if (options.textureEnabled) {
      result.push("varying vec2 vTextureCoord;");
    }

    // Code
    result.push("void main(void) {");
    result.push("  gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);");
    if (options.lightingEnabled) {
      if (options.perPixelLightingEnabled) {
        result.push("  vDiffuseColor = vec4(1, 1, 1, uDiffuseColor.a);");
        result.push("  vPositionWS = (uMMatrix * vec4(aVertexPosition, 1.0)).xyz;");
        result.push("  vNormalWS = normalize(uMMatrixInverseTranspose * aVertexNormal);");
      } else {
        result.push("  ComputeCommonVSOutputWithLighting(vec4(aVertexPosition, 1.0), aVertexNormal);");
      }
    } else {
      result.push("  vDiffuseColor = uDiffuseColor;");
    }
    if (options.vertexColorEnabled) {
      result.push("  vDiffuseColor *= aVertexColor;");
    }
    if (options.textureEnabled) {
      result.push("  vTextureCoord = aTextureCoord;");
    }
    result.push("}");

    return result.join('\n');
  }

  function buildFragmentShader(options: IBasicProgramOptions) {
    var result: string[] = [];

    result.push("precision mediump float;");

    result.push("varying vec4 vDiffuseColor;");

    if (options.textureEnabled) {
      result.push("varying vec2 vTextureCoord;");
      result.push("uniform sampler2D uSampler;");
    }

    if (options.lightingEnabled) {
      if (options.perPixelLightingEnabled) {
        result.push("uniform vec4 uDiffuseColor;");

        result.push("varying vec3 vPositionWS;");
        result.push("varying vec3 vNormalWS;");

        addLighting(result);
      } else {
        result.push("varying vec3 vSpecularColor;");
      }
    }

    result.push(SharedProgramCode.common);

    result.push("void main(void) {");
    result.push("  vec4 color = vDiffuseColor;");

    if (options.textureEnabled) {
      result.push("  color *= texture2D(uSampler, vTextureCoord);");
    }

    if (options.lightingEnabled) {
      if (options.perPixelLightingEnabled) {
        result.push("  vec3 eyeVector = normalize(uEyePosition - vPositionWS);");
        result.push("  vec3 worldNormal = normalize(vNormalWS);");
        result.push("  ColorPair lightResult = ComputeLights(eyeVector, worldNormal);");
        result.push("  color.rgb *= lightResult.Diffuse;");
        result.push("  AddSpecular(color, lightResult.Specular);");
      } else {
        result.push("  AddSpecular(color, vSpecularColor.rgb);");
      }
    }

    result.push("  gl_FragColor = color;");
    result.push("}");

    return result.join('\n');
  }

  export interface IBasicProgramOptions {
    lightingEnabled: boolean;
    perPixelLightingEnabled: boolean;
    textureEnabled: boolean;
    vertexColorEnabled: boolean;
  }

  /**
   * A basic rendering effect with support for lighting and a single texture.
   */
  export class BasicProgram extends Program {
    private _options: IBasicProgramOptions;
    private _dirtyFlags: ProgramDirtyFlags;
    private _modelMatrix: Matrix4;
    private _viewMatrix: Matrix4;
    private _projectionMatrix: Matrix4;
    private _diffuseColor: Vector3;
    private _emissiveColor: Vector3;
    private _specularColor: Vector3;
    private _specularPower: number;
    private _alpha: number;
    private _texture: Texture2D;
    private _ambientLightColor: Vector3;
    private _directionalLight0: DirectionalLight;
    private _directionalLight1: DirectionalLight;
    private _directionalLight2: DirectionalLight;

    private _modelView: Matrix4;

    /**
     * Constructs a new `BasicProgram`.
     *
     * @param {Zia.GraphicsDevice} graphicsDevice - The graphics device.
     * @param {Boolean} [options.lightingEnabled=false] - Should lighting be enabled?
     * @param {Boolean} [options.perPixelLightingEnabled=true] - Should per-pixel (as opposed to per-vertex) lighting be enabled?.
     * @param {Boolean} [options.textureEnabled=false] - Should textures be enabled?
     * @param {Boolean} [options.vertexColorEnabled=false] - Will you be using vertices that contain a color component?
     */
    constructor(graphicsDevice: GraphicsDevice, options?: IBasicProgramOptions) {
      this._dirtyFlags = ProgramDirtyFlags.All;

      this.modelMatrix = new Matrix4();
      this.viewMatrix = new Matrix4();
      this.projectionMatrix = new Matrix4();
      this._modelView = new Matrix4();
      this.diffuseColor = new Vector3(1, 1, 1);
      this.emissiveColor = new Vector3();
      this.specularColor = new Vector3(1, 1, 1);
      this.specularPower = 16;
      this.alpha = 1;
      this.texture = null;
      this.ambientLightColor = new Vector3();

      this._directionalLight0 = new DirectionalLight(this, 0);
      this._directionalLight1 = new DirectionalLight(this, 1);
      this._directionalLight2 = new DirectionalLight(this, 2);

      this._directionalLight0.enabled = true;

      options = Zia.ObjectUtil.reverseMerge(options || {}, {
        lightingEnabled: false,
        perPixelLightingEnabled: true,
        textureEnabled: false,
        vertexColorEnabled: false
      });
      this._options = options;

      var vertexShader = new VertexShader(graphicsDevice, buildVertexShader(options));
      var fragmentShader = new FragmentShader(graphicsDevice, buildFragmentShader(options));

      super(graphicsDevice, vertexShader, fragmentShader);
    }

    get modelMatrix() {
      return this._modelMatrix;
    }

    set modelMatrix(v) {
      this._modelMatrix = v;
      this._dirtyFlags |= ProgramDirtyFlags.Model | ProgramDirtyFlags.ModelViewProj;
    }

    get viewMatrix() {
      return this._viewMatrix;
    }

    set viewMatrix(v) {
      this._viewMatrix = v;
      this._dirtyFlags |= ProgramDirtyFlags.ModelViewProj | ProgramDirtyFlags.EyePosition;
    }

    get projectionMatrix() {
      return this._projectionMatrix;
    }

    set projectionMatrix(v) {
      this._projectionMatrix = v;
      this._dirtyFlags |= ProgramDirtyFlags.ModelViewProj;
    }

    get diffuseColor() {
      return this._diffuseColor;
    }

    set diffuseColor(v) {
      this._diffuseColor = v;
      this._dirtyFlags |= ProgramDirtyFlags.MaterialColor;
    }

    get emissiveColor() {
      return this._emissiveColor;
    }

    set emissiveColor(v) {
      this._emissiveColor = v;
      this._dirtyFlags |= ProgramDirtyFlags.MaterialColor;
    }

    get specularColor() {
      return this._specularColor;
    }

    set specularColor(v) {
      this._specularColor = v;
      this._dirtyFlags |= ProgramDirtyFlags.SpecularColor;
    }

    get specularPower() {
      return this._specularPower;
    }

    set specularPower(v) {
      this._specularPower = v;
      this._dirtyFlags |= ProgramDirtyFlags.SpecularPower;
    }

    get alpha() {
      return this._alpha;
    }

    set alpha(v) {
      this._alpha = v;
      this._dirtyFlags |= ProgramDirtyFlags.MaterialColor;
    }

    get texture() {
      return this._texture;
    }

    set texture(v) {
      this._texture = v;
    }

    get ambientLightColor() {
      return this._ambientLightColor;
    }

    set ambientLightColor(v) {
      this._ambientLightColor = v;
      this._dirtyFlags |= ProgramDirtyFlags.MaterialColor;
    }

    get directionalLight0() {
      return this._directionalLight0;
    }

    get directionalLight1() {
      return this._directionalLight1;
    }

    get directionalLight2() {
      return this._directionalLight2;
    }

    enableDefaultLighting() {
      if (!this._options.lightingEnabled) {
        throw "Lighting must be enabled when creating this program.";
      }

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

      if ((this._dirtyFlags & ProgramDirtyFlags.SpecularColor) != 0) {
        this.setUniform('uSpecularColor', this._specularColor);
        this._dirtyFlags &= ~ProgramDirtyFlags.SpecularColor;
      }

      if ((this._dirtyFlags & ProgramDirtyFlags.SpecularPower) != 0) {
        this.setUniform('uSpecularPower', this._specularPower);
        this._dirtyFlags &= ~ProgramDirtyFlags.SpecularPower;
      }

      if (this._options.lightingEnabled) {
          // Recompute the world inverse transpose and eye position?
          this._dirtyFlags = Zia.ProgramUtil.setLightingMatrices(
            this, this._dirtyFlags, this._modelMatrix, this._viewMatrix);
      }

      this.setUniform('uSampler', this._texture);

      this._directionalLight0._apply();
      this._directionalLight1._apply();
      this._directionalLight2._apply();
    }
  }
}
