var glob = require('handlebars-helpers/lib/utils/glob');
var hljs = require("highlight.js");

module.exports.register = function (Handlebars, options, params)  { 
  Handlebars.registerHelper('includeHtml', function (src)  { 
    var path = "./site/includes/examples/" + src + "-html.html";
    var content = glob.globFiles(path);
    return new Handlebars.SafeString(content);
  });

  Handlebars.registerHelper('exampleHtml', function (src)  { 
    var path = "./site/includes/examples/" + src + "-html.html";
    var content = glob.globFiles(path);
    var highlighted = hljs.highlight('xml', content).value;
    return new Handlebars.SafeString('<pre class="hljs">' + highlighted + "</pre>");
  });
};