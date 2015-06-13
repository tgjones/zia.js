var Zia;
(function (Zia) {
    /**
     * A directional light structure, used by several of the built-in `Program` classes.
     */
    var DirectionalLight = (function () {
        /**
         * Constructs a new `DirectionalLight`.
         *
         * @param {Zia.Program} program - The associated program.
         * @param {Number} index - The index of this light (used to set uniforms correctly).
         */
        function DirectionalLight(program, index) {
            this._program = program;
            this._index = index;
            this.direction = new Zia.Vector3();
            this.diffuseColor = new Zia.Vector3();
            this.specularColor = new Zia.Vector3();
            this.enabled = false;
        }
        Object.defineProperty(DirectionalLight.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            set: function (v) {
                this._direction = v;
                this._directionChanged = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DirectionalLight.prototype, "diffuseColor", {
            get: function () {
                return this._diffuseColor;
            },
            set: function (v) {
                this._diffuseColor = v;
                this._diffuseColorChanged = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DirectionalLight.prototype, "specularColor", {
            get: function () {
                return this._specularColor;
            },
            set: function (v) {
                this._specularColor = v;
                this._specularColorChanged = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DirectionalLight.prototype, "enabled", {
            get: function () {
                return this._enabled;
            },
            set: function (v) {
                this._enabled = v;
                this._enabledChanged = true;
            },
            enumerable: true,
            configurable: true
        });
        DirectionalLight.prototype._apply = function () {
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
        };
        DirectionalLight.prototype._setUniform = function (name, value) {
            this._program.setUniform("uDirLight" + this._index + name, value);
        };
        DirectionalLight._zero = new Zia.Vector3();
        return DirectionalLight;
    })();
    Zia.DirectionalLight = DirectionalLight;
})(Zia || (Zia = {}));
