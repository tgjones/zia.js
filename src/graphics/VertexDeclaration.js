Zia.VertexElement = function (attributeName, numComponents, offset) {
  this.attributeName = attributeName;
  this.numComponents = numComponents;
  this.offset = (offset !== undefined) ? offset : 0;
};

Zia.VertexDeclaration = function (elements) {
  this.elements = elements;
  this.stride = 4 * elements
    .map(function (v) { return v.numComponents; })
    .reduce(function (p, c) { return p + c; }, 0);
};