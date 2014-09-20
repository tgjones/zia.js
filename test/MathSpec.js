describe('Zia.Math', function () {
  describe('generateUUID function', function () {
    it('generates a random UUID', function () {
      var result = Zia.Math.generateUUID();
      expect(result.length).toBe(36);
    });
  });
});