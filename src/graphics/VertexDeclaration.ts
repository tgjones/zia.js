module Zia {
  export class VertexElement {
    constructor(public attributeName: string, public numComponents: number, public offset = 0) {
      
    }
  }
  
  export class VertexDeclaration {
    public stride: number;
    
    constructor(public elements: VertexElement[]) {
      this.elements = elements;
      this.stride = 4 * elements
        .map(function (v) { return v.numComponents; })
        .reduce(function (p, c) { return p + c; }, 0);
    }
  }
}