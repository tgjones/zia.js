module Zia {
  export var ObjectUtil = {
    reverseMerge: function(object: any, source: any) {
      for (var key in source) {
        if (source.hasOwnProperty(key) && !(key in object)) {
          object[key] = source[key];
        }
      }
      return object;
    }
  };
}