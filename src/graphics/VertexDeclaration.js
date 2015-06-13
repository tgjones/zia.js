var Zia;
(function (Zia) {
    var VertexElement = (function () {
        function VertexElement(attributeName, numComponents, offset) {
            if (offset === void 0) { offset = 0; }
            this.attributeName = attributeName;
            this.numComponents = numComponents;
            this.offset = offset;
        }
        return VertexElement;
    })();
    Zia.VertexElement = VertexElement;
    var VertexDeclaration = (function () {
        function VertexDeclaration(elements) {
            this.elements = elements;
            this.elements = elements;
            this.stride = 4 * elements
                .map(function (v) { return v.numComponents; })
                .reduce(function (p, c) { return p + c; }, 0);
        }
        return VertexDeclaration;
    })();
    Zia.VertexDeclaration = VertexDeclaration;
})(Zia || (Zia = {}));
