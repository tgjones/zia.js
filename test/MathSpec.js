describe('Zia.Math', function () {
  describe('generateUUID function', function () {
    it('generates a random UUID', function () {
      var result = Zia.MathUtil.generateUUID();
      expect(result.length).toBe(36);
    });
  });
});
