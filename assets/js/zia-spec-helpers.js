(function() {
  function isCloseTo(actual, expected, precision) {
    precision = precision || 2;
    return Math.abs(expected - actual) < (Math.pow(10, -precision) / 2);
  }

  function vector2ToString(v) {
      return "(" + v.x + "," + v.y + ")";
  }

  function vector3ToString(v) {
      return "(" + v.x + "," + v.y + "," + v.z + ")";
  }

  function vector4ToString(v) {
      return "(" + v.x + "," + v.y + "," + v.z + ", " + v.w + ")";
  }

  function quaternionToString(q) {
      return "(" + q.x + "," + q.y + "," + q.z + "," + q.w + ")";
  }

  function matrix4ToString(m) {
    result = "(";
    for (var i = 0, il = m.elements.length; i < il; i++) {
      result += m.elements[i] + ",";
    }
    result += ")";
    return result;
  }

  function formatMessage(actual, isEqual, expected) {
      return actual + " is " + (!isEqual ? "not" : "") + " equal to " + expected;
  }

  beforeEach(function() {
    jasmine.addMatchers({
      toEqualVector2: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            var result = isCloseTo(actual.x, expected.x)
              && isCloseTo(actual.y, expected.y);
            return {
              pass: result,
              message: formatMessage(
                vector2ToString(actual),
                result,
                vector2ToString(expected))
            };
          }
        };
      },

      toEqualVector3: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            var result = isCloseTo(actual.x, expected.x)
              && isCloseTo(actual.y, expected.y)
              && isCloseTo(actual.z, expected.z);
            return {
              pass: result,
              message: formatMessage(
                vector3ToString(actual),
                result,
                vector3ToString(expected))
            };
          }
        };
      },

      toEqualEuler: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            var result = isCloseTo(actual.x, expected.x)
              && isCloseTo(actual.y, expected.y)
              && isCloseTo(actual.z, expected.z);
            return {
              pass: result,
              message: formatMessage(
                vector3ToString(actual),
                result,
                vector3ToString(expected))
            };
          }
        };
      },

      toEqualVector4: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            var result = isCloseTo(actual.x, expected.x)
              && isCloseTo(actual.y, expected.y)
              && isCloseTo(actual.z, expected.z)
              && isCloseTo(actual.w, expected.w);
            return {
              pass: result,
              message: formatMessage(
                vector4ToString(actual),
                result,
                vector4ToString(expected))
            };
          }
        };
      },

      toEqualQuaternion: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            var result = isCloseTo(actual.x, expected.x)
              && isCloseTo(actual.y, expected.y)
              && isCloseTo(actual.z, expected.z)
              && isCloseTo(actual.w, expected.w);
            return {
              pass: result,
              message: formatMessage(
                quaternionToString(actual),
                result,
                quaternionToString(expected))
            };
          }
        };
      },

      toEqualMatrix4: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            result = actual.elements.length == expected.elements.length;
            for (var i = 0, il = actual.elements.length; i < il; i++) {
              result = result && isCloseTo(actual.elements[i], expected.elements[i]);
            }
            return {
              pass: result,
              message: formatMessage(
                matrix4ToString(actual),
                result,
                matrix4ToString(expected))
            };
          }
        };
      }
    });

    var canvas = window.document.createElement("canvas");
    canvas.id = "canvas";
    canvas.style.width = "400px";
    canvas.style.height = "300px";
    document.body.appendChild(canvas);
    this.canvas = canvas;
  });

  afterEach(function() {
    window.document.body.removeChild(this.canvas);
    this.canvas = null;
  });
})();

var Matrix4Utility = {
  getScale: function(m) {
    var translation = new Zia.Vector3();
    var rotation = new Zia.Quaternion();
    var scale = new Zia.Vector3();
    m.decompose(translation, rotation, scale);
    return scale;
  },

  getRotation: function(m) {
    var translation = new Zia.Vector3();
    var rotation = new Zia.Quaternion();
    var scale = new Zia.Vector3();
    m.decompose(translation, rotation, scale);
    return rotation;
  },

  getPosition: function(m) {
    var translation = new Zia.Vector3();
    var rotation = new Zia.Quaternion();
    var scale = new Zia.Vector3();
    m.decompose(translation, rotation, scale);
    return translation;
  }
};