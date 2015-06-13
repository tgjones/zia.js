var Zia;
(function (Zia) {
    /**
     * Main class in Zia. Manages the WebGL rendering context and associated state,
     * and performs rendering.
     */
    var GraphicsDevice = (function () {
        /**
         * Constructs a new `GraphicsDevice` object.
         *
         * @param canvas - The canvas element.
         */
        function GraphicsDevice(canvas, debug) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            this._canvas = canvas;
            var gl = this.gl = canvas.getContext('webgl', {
                antialias: true
            });
            if (debug) {
                gl = this.gl = Zia.DebugUtil.makeDebugContext(gl);
            }
            // TODO: Handle WebContextLost event.
            var viewport = this._viewport = new Zia.Viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            viewport.onChange(function () {
                gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
                gl.depthRange(viewport.minDepth, viewport.maxDepth);
            });
            this.rasterizerState = new Zia.RasterizerState();
            this.depthStencilState = new Zia.DepthStencilState();
        }
        Object.defineProperty(GraphicsDevice.prototype, "viewport", {
            get: function () {
                return this._viewport;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GraphicsDevice.prototype, "rasterizerState", {
            get: function () {
                return this._rasterizerState;
            },
            set: function (value) {
                this._rasterizerState = value;
                this._rasterizerState._apply(this.gl);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GraphicsDevice.prototype, "depthStencilState", {
            get: function () {
                return this._depthStencilState;
            },
            set: function (value) {
                this._depthStencilState = value;
                this._depthStencilState._apply(this.gl);
            },
            enumerable: true,
            configurable: true
        });
        GraphicsDevice.prototype.clear = function (clearOptions, color, depth, stencil) {
            var clearMask = 0;
            if (Zia.EnumUtil.hasFlag(clearOptions, 0 /* DepthBuffer */)) {
                clearMask |= this.gl.DEPTH_BUFFER_BIT;
                this.gl.clearDepth(depth);
            }
            if (Zia.EnumUtil.hasFlag(clearOptions, 1 /* StencilBuffer */)) {
                clearMask |= this.gl.STENCIL_BUFFER_BIT;
                this.gl.clearStencil(stencil);
            }
            if (Zia.EnumUtil.hasFlag(clearOptions, 2 /* ColorBuffer */)) {
                clearMask |= this.gl.COLOR_BUFFER_BIT;
                this.gl.clearColor(color.r, color.g, color.b, color.a);
            }
            this.gl.clear(clearMask);
        };
        GraphicsDevice.prototype.setIndexBuffer = function (indexBuffer) {
            this._indexBuffer = indexBuffer;
        };
        GraphicsDevice.prototype.setVertexBuffers = function (vertexBuffers) {
            this._vertexBuffers = vertexBuffers;
        };
        GraphicsDevice.prototype.setVertexBuffer = function (vertexBuffer) {
            this._vertexBuffers = [vertexBuffer];
        };
        GraphicsDevice.prototype.drawIndexedPrimitives = function (primitiveType, startIndex, indexCount) {
            var gl = this.gl;
            var enabledAttributeLocations = this._bindVertexAttributes(gl);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer._buffer);
            gl.drawElements(this._getMode(primitiveType), indexCount, gl.UNSIGNED_SHORT, startIndex * 4);
            for (var i = 0; i < enabledAttributeLocations.length; i++) {
                gl.disableVertexAttribArray(enabledAttributeLocations[i]);
            }
        };
        GraphicsDevice.prototype.drawPrimitives = function (primitiveType, startVertex, vertexCount) {
            var gl = this.gl;
            var enabledAttributeLocations = this._bindVertexAttributes(gl);
            gl.drawArrays(this._getMode(primitiveType), startVertex, vertexCount);
            for (var i = 0; i < enabledAttributeLocations.length; i++) {
                gl.disableVertexAttribArray(enabledAttributeLocations[i]);
            }
        };
        GraphicsDevice.prototype.resize = function () {
            var canvas = this._canvas;
            var width = canvas.clientWidth;
            var height = canvas.clientHeight;
            if (canvas.width != width || canvas.height != height) {
                canvas.width = width;
                canvas.height = height;
                this.viewport.set(0, 0, width, height);
                return true;
            }
            return false;
        };
        GraphicsDevice.prototype.toggleFullScreen = function () {
            Zia.HtmlUtil.toggleFullScreen(this._canvas);
        };
        GraphicsDevice.prototype._bindVertexAttributes = function (gl) {
            var enabledAttributeLocations = [];
            for (var i = 0; i < this._currentProgram._attributes.length; i++) {
                var attribute = this._currentProgram._attributes[i];
                var vertexBuffer = this._findVertexBuffer(attribute.name);
                if (vertexBuffer) {
                    enabledAttributeLocations.push(attribute.location);
                    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.buffer._buffer);
                    gl.vertexAttribPointer(attribute.location, vertexBuffer.element.numComponents, gl.FLOAT, false, vertexBuffer.buffer.vertexDeclaration.stride, vertexBuffer.element.offset);
                    gl.enableVertexAttribArray(attribute.location);
                }
            }
            return enabledAttributeLocations;
        };
        GraphicsDevice.prototype._findVertexBuffer = function (attributeName) {
            for (var i = 0; i < this._vertexBuffers.length; i++) {
                var vertexBuffer = this._vertexBuffers[i];
                for (var j = 0; j < vertexBuffer.vertexDeclaration.elements.length; j++) {
                    var element = vertexBuffer.vertexDeclaration.elements[j];
                    if (element.attributeName === attributeName) {
                        return {
                            buffer: vertexBuffer,
                            element: element
                        };
                    }
                }
            }
            return null;
        };
        GraphicsDevice.prototype._getMode = function (primitiveType) {
            switch (primitiveType) {
                case 0 /* PointList */: return this.gl.POINTS;
                case 1 /* LineList */: return this.gl.LINES;
                case 2 /* LineStrip */: return this.gl.LINE_STRIP;
                case 3 /* LineLoop */: return this.gl.LINE_LOOP;
                case 4 /* TriangleList */: return this.gl.TRIANGLES;
                case 5 /* TriangleStrip */: return this.gl.TRIANGLE_STRIP;
                case 6 /* TriangleFan */: return this.gl.TRIANGLE_FAN;
            }
        };
        return GraphicsDevice;
    })();
    Zia.GraphicsDevice = GraphicsDevice;
})(Zia || (Zia = {}));
