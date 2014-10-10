Zia.ObjectUtil = {
  reverseMerge: function (object, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key) && !(key in object)) {
        object[key] = source[key];
      }
    }
    return object;
  }
};