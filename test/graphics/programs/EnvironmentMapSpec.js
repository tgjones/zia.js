describe('Zia.EnvironmentMapProgram', function() {
  var graphicsDevice;

  beforeEach(function() {
    graphicsDevice = new Zia.GraphicsDevice(this.canvas);
  });

  describe('with default parameters', function() {

    it('should be valid', function() {
      var result = new Zia.EnvironmentMapProgram(graphicsDevice);
      expect(result.fresnelFactor).toBe(1);
    });
  });
});