Zia.MathUtil = {

  TWO_PI: Math.PI * 2,
  PI_OVER_TWO: Math.PI / 2,
  PI_OVER_FOUR: Math.PI / 4,

  withinEpsilon: function(a, b, epsilon) {
    var num = a - b;
    return ((-epsilon <= num) && (num <= epsilon));
  }
};