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

function prepareProperty(element) {
  element.memberType = "property";
  element.displayName = element.name;
  return element;
}

function prepareMethod(element) {
  element.memberType = "method";
  element.displayName = element.name;
  return element;
}

function prepareConstructor(constructor) {
  constructor.memberType = "constructor";
  constructor.displayName = "new " + constructor.name;
  return constructor;
}

function memberSort(a, b) {
  return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
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
            "layout": "api-index.html",
            "title": "API Reference",
            "nav_title": "API Reference",
            "section": "API"
          }
        })

        inputClasses.map(function(inputClass) {
          var qualifiedClassName = inputNamespace.name + "." + inputClass.name;
          outputPages.push({
            "filename": inputNamespace.name + "-" + inputClass.name,
            "data": {
              "title": qualifiedClassName + " Class",
              "nav_title": qualifiedClassName,
              "api_types": ['Classes'],
              "section": "API",
              "description": inputClass.description,
              "constructor": prepareConstructor(inputClass.constructor),
              "properties": (inputClass.properties || []).map(prepareProperty).sort(memberSort),
              "methods": (inputClass.functions || []).map(prepareMethod).sort(memberSort)
            },
            "content": inputClass.description
          });
        });

        outputPages.sort(function(a, b) {
          return (a.filename < b.filename) ? -1 : (a.filename > b.filename) ? 1 : 0;
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
