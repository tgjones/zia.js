/* Based on grunt-doxication
 * Copyright © 2014 Gion Kunz
 * Free to use under the WTFPL license.
 * http://www.wtfpl.net/
 */
'use strict';

var fs = require('fs'),
  path = require('path'),
  dox = require('dox'),
  async = require('async'),
  _ = require('lodash'),
  YAML = require('yamljs'),
  mkdirp = require('mkdirp');

function readFileAsyncUtf8(file, cb) {
  fs.readFile(file, 'utf8', function (err, result) {
    cb(err, JSON.parse(result));
  });
}

module.exports = function (grunt) {

  grunt.registerMultiTask('jsdoc-assemble', 'JSDoc/Assemble grunt plugin', function () {

    var defaultOptions = {
      fileName: 'jsdoc-assemble.json'
    };

    var sources = this.filesSrc,
      done = this.async(),
      options = _.extend({}, defaultOptions, this.options()),
      dest = this.data.dest || options.fileName;

    mkdirp(path.dirname(dest), function (err) {
      if (err) {
        throw err;
      }

      async.map(sources, readFileAsyncUtf8, function (err, results) {
        if (err) {
          throw err;
        }

        var inputNamespace = results[0]['namespaces'][0];
        var inputClasses = inputNamespace['classes'];

        var outputPages = [];

        outputPages.push({
          "filename": "index",
          "data": {
            "title": "API Reference",
            "nav_title": "API Reference",
            "section": "Docs"
          },
          "content": "<p>This is the API reference for Zia.js.</p>"
        })

        inputClasses.map(function(inputClass) {
          var qualifiedClassName = inputNamespace.name + "." + inputClass.name;
          outputPages.push({
            "filename": inputNamespace.name + "-" + inputClass.name,
            "data": {
              "title": qualifiedClassName + " Class",
              "nav_title": qualifiedClassName,
              "api_types": ['Classes'],
              "section": "Docs",
              "members": [],
              "methods": inputClass.functions
            },
            "content": inputClass.description
          });
        });

        var output = { "pages": outputPages };

        fs.writeFile(dest, JSON.stringify(output, null, 2), function (err) {
          if (err) {
            throw err;
          }

          done();
        });
      });
    });
  });
};
