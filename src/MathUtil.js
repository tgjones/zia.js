var Zia;
(function (Zia) {
    Zia.MathUtil = {
        TWO_PI: Math.PI * 2,
        PI_OVER_TWO: Math.PI / 2,
        PI_OVER_FOUR: Math.PI / 4,
        withinEpsilon: function (a, b, epsilon) {
            var num = a - b;
            return ((-epsilon <= num) && (num <= epsilon));
        },
        /*!
        Math.uuid.js (v1.4)
        http://www.broofa.com
        mailto:robert@broofa.com
    
        Copyright (c) 2010 Robert Kieffer
        Dual licensed under the MIT and GPL licenses.
        */
        generateUUID: (function () {
            // Private array of chars to use
            var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            return function (len, radix) {
                var chars = CHARS, uuid = [], i;
                radix = radix || chars.length;
                if (len) {
                    // Compact form
                    for (i = 0; i < len; i++)
                        uuid[i] = chars[0 | Math.random() * radix];
                }
                else {
                    // rfc4122, version 4 form
                    var r;
                    // rfc4122 requires these characters
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';
                    // Fill in random data.  At i==19 set the high bits of clock sequence as
                    // per rfc4122, sec. 4.1.5
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random() * 16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }
                return uuid.join('');
            };
        })(),
        // Clamp value to range <a, b>
        clamp: function (x, a, b) {
            return (x < a) ? a : ((x > b) ? b : x);
        },
        degToRad: function () {
            var degreeToRadiansFactor = Math.PI / 180;
            return function (degrees) {
                return degrees * degreeToRadiansFactor;
            };
        }(),
    };
})(Zia || (Zia = {}));
