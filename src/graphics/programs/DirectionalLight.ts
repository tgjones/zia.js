module Zia {
  /**
   * A directional light structure, used by several of the built-in `Program` classes.
   */
  export class DirectionalLight {
    private _program: Program;
    private _index: number;
    private _direction: Vector3;
    private _directionChanged: boolean;
    private _diffuseColor: Vector3;
    private _diffuseColorChanged: boolean;
    private _specularColor: Vector3;
    private _specularColorChanged: boolean;
    private _enabled: boolean;
    private _enabledChanged: boolean;

    /**
     * Constructs a new `DirectionalLight`.
     *
     * @param {Zia.Program} program - The associated program.
     * @param {Number} index - The index of this light (used to set uniforms correctly).
     */
    constructor(program: Program, index: number) {
      this._program = program;
      this._index = index;

      this.direction = new Vector3();
      this.diffuseColor = new Vector3();
      this.specularColor = new Vector3();
      this.enabled = false;
    }

    get direction() {
      return this._direction;
    }

    set direction(v) {
      this._direction = v;
      this._directionChanged = true;
    }

    get diffuseColor() {
      return this._diffuseColor;
    }

    set diffuseColor(v) {
      this._diffuseColor = v;
      this._diffuseColorChanged = true;
    }

    get specularColor() {
      return this._specularColor;
    }

    set specularColor(v) {
      this._specularColor = v;
      this._specularColorChanged = true;
    }

    get enabled() {
      return this._enabled;
    }

    set enabled(v) {
      this._enabled = v;
      this._enabledChanged = true;
    }

    private static _zero = new Vector3();

    _apply() { // TODO: internal
      if (this._directionChanged) {
        this._setUniform("Direction", this._direction);
        this._directionChanged = false;
      }

      if (this._diffuseColorChanged && this._enabled) {
        this._setUniform("DiffuseColor", this._diffuseColor);
        this._diffuseColorChanged = false;
      }

      if (this._specularColorChanged && this._enabled) {
        this._setUniform("SpecularColor", this._specularColor);
        this._specularColorChanged = false;
      }

      if (this._enabledChanged) {
        if (!this._enabled) {
          this._setUniform("DiffuseColor", DirectionalLight._zero);
          this._setUniform("SpecularColor", DirectionalLight._zero);
        }
        this._enabledChanged = false;
      }
    }

    private _setUniform(name: string, value: any) {
      this._program.setUniform("uDirLight" + this._index + name, value);
    }
  }
}
