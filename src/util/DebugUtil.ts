module Zia {
  function throwOnGLError(err: number, funcName: string, args: any[]) {
    throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
  }

  function validateNoneOfTheArgsAreUndefined(functionName: string, args: any[]) {
    for (var ii = 0; ii < args.length; ++ii) {
      if (args[ii] === undefined) {
        throw "undefined passed to gl." + functionName + "(" +
          WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")";
      }
    }
  }

  export var DebugUtil = {
    makeDebugContext: function (gl: WebGLRenderingContext) {
      return WebGLDebugUtils.makeDebugContext(gl, throwOnGLError,
        validateNoneOfTheArgsAreUndefined);
    }
  };
}
