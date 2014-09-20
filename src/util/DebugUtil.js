(function () {
  function throwOnGLError(err, funcName, args) {
    throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
  }

  function validateNoneOfTheArgsAreUndefined(functionName, args) {
    for (var ii = 0; ii < args.length; ++ii) {
      if (args[ii] === undefined) {
        throw "undefined passed to gl." + functionName + "(" + 
          WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")";
      }
    }
  }

  Zia.DebugUtil = {
    makeDebugContext: function (gl) {
      return WebGLDebugUtils.makeDebugContext(gl, throwOnGLError,
        validateNoneOfTheArgsAreUndefined);
    }
  };
})();