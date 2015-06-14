module Zia {
  /**
   * Represents a 4-component color with red, green, blue and alpha components.
   */
  export class Color4 {
    /** The red component. */
    public r: number;

    /** The green component. */
    public g: number;

    /** The blue component. */
    public b: number;

    /** The alpha component. */
    public a: number;

    /**
     * Constructs a new `Color4` object.
     *
     * @param r - The value for the red component.
     * @param g - The value for the green component.
     * @param b - The value for the blue component.
     * @param a - The value for the alpha component.
     */
    constructor(r: number, g: number, b: number, a: number) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }

    copy(other: Color4) {
      this.r = other.r;
      this.g = other.g;
      this.b = other.b;
      this.a = other.a;
      return this;
    }

    multiplyScalar(s: number) {
      this.r *= s;
      this.g *= s;
      this.b *= s;
      return this;
    }

    toJS() {
      return [ this.r, this.g, this.b, this.a ];
    }
  }
}
