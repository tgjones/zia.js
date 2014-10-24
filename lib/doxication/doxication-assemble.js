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

  grunt.registerMultiTask('doxication-assemble', 'Dox Assemble grunt plugin', function () {

    var defaultOptions = {
      fileName: 'dox-assemble.json'
    };

    var sources = this.filesSrc,
      done = this.async(),
      options = _.extend({}, defaultOptions, this.options()),
      dest = this.data.dest || options.fileName;

    var input = [];

    mkdirp(path.dirname(dest), function (err) {
      if (err) {
        throw err;
      }

      async.map(sources, readFileAsyncUtf8, function (err, results) {
        if (err) {
          throw err;
        }

        results.forEach(function(x) {
          input = input.concat(x);
        });

        var outputPages = [];

        input.map(function(doxFile) {
          // TODO: This is just the filename, not actually the class name.
          var className = path.basename(doxFile.file, path.extname(doxFile.file));
          outputPages.push({
            "filename": className,
            "data": {
              "title": className
            },
            "content": "Foo"
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
