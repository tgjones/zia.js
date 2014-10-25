/**
 * Constructs a new `DirectionalLight`. 
 *
 * @constructor
 *
 * @param {Zia.Program} program - The associated program.
 * @param {Number} index - The index of this light (used to set uniforms correctly).
 *
 * @classdesc
 * A directional light structure, used by several of the built-in `Program` classes.
 */
Zia.DirectionalLight = function(program, index) {
  this._program = program;
  this._index = index;

  this.direction = new Zia.Vector3();
  this.diffuseColor = new Zia.Vector3();
  this.specularColor = new Zia.Vector3();
  this.enabled = false;
};

Zia.DirectionalLight.prototype = {

  get direction() {
    return this._direction;
  },

  set direction(v) {
    this._direction = v;
    this._directionChanged = true;
  },

  get diffuseColor() {
    return this._diffuseColor;
  },

  set diffuseColor(v) {
    this._diffuseColor = v;
    this._diffuseColorChanged = true;
  },

  get specularColor() {
    return this._specularColor;
  },

  set specularColor(v) {
    this._specularColor = v;
    this._specularColorChanged = true;
  },

  get enabled() {
    return this._enabled;
  },

  set enabled(v) {
    this._enabled = v;
    this._enabledChanged = true;
  },

  _apply: (function() {
    var zero = new Zia.Vector3();

    return function() {
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
          this._setUniform("DiffuseColor", zero);
          this._setUniform("SpecularColor", zero);
        }
        this._enabledChanged = false;
      }
    };
  })(),

  _setUniform: function(name, value) {
    this._program.setUniform("uDirLight" + this._index + name, value);
  }

};