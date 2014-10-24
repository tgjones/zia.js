var glob = require('handlebars-helpers/lib/utils/glob');
var hljs = require("highlight.js");

module.exports.register = function (Handlebars, options, params)  { 
  Handlebars.registerHelper('exampleCode', function (src)  { 
    var path = "./site/assets/js/example-" + src + ".js";
    var content = glob.globFiles(path);
    var highlighted = hljs.highlight('js', content).value;
    return new Handlebars.SafeString('<pre class="hljs">' + highlighted + "</pre>");
  });

  Handlebars.registerHelper('inlineCode', function (code)  { 
    var highlighted = hljs.highlight('js', code).value;
    return new Handlebars.SafeString('<pre class="hljs">' + highlighted + "</pre>");
  });

  Handlebars.registerHelper('apiTypeLink', function (type) { 
    var filename = type.replace(/\./, "-") + ".html";
    for (var i = 0; i < params.assemble.options.pages.length; i++) {
      var page = params.assemble.options.pages[i];
      if (page.filename === filename) {
        return new Handlebars.SafeString('<code><a href="' + page.filename + '">' + type + "</a></code>");
      }
    }
    return new Handlebars.SafeString("<code>" + type + "</code>");
  });
};