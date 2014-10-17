Zia.MathUtil = {
  withinEpsilon: function(a, b, epsilon) {
    var num = a - b;
    return ((-epsilon <= num) && (num <= epsilon));
  }
};