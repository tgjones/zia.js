var glob = require('handlebars-helpers/lib/utils/glob');
var utils = require('handlebars-helpers/lib/utils/utils');
var hljs = require("highlight.js");

module.exports.register = function (Handlebars, options, params)  { 
  Handlebars.registerHelper('exampleCode', function (src)  { 
    var path = "./site/assets/js/example_" + src + ".js";
    var content = glob.globFiles(path);
    var highlighted = hljs.highlight('js', content).value;
    return new Handlebars.SafeString('<pre class="hljs">' + highlighted + "</pre>");
  });
};