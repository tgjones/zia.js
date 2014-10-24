/* grunt-doxication - based on v0.0.4, and modified by Tim Jones
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
    cb(err, {
      file: file,
      content: result
    });
  });
}

function stringify(doxicated, options) {
  return ['yml', 'yaml'].indexOf(options.format) !== -1 ?
    YAML.stringify(doxicated, options.yaml.inline, options.yaml.spaces) : JSON.stringify(doxicated, null, options.json.space);
}

module.exports = function (grunt) {

  grunt.registerMultiTask('doxication', 'Dox grunt plugin ', function () {

    var defaultOptions = {
      format: 'json',
      fileName: 'doxicated',
      yaml: {
        inline: 99,
        spaces: 2
      },
      json: {
        space: 2
      }
    };

    var sources = this.filesSrc,
      done = this.async(),
      options = _.extend({}, defaultOptions, this.options()),
      dest = this.data.dest || [options.fileName, options.format].join('.');

    if (path.extname(dest) === '' || (fs.existsSync(dest) && fs.statSync(dest).isDirectory())) {
      dest = path.join(dest, [options.fileName, options.format].join('.'));
    }

    mkdirp(path.dirname(dest), function (err) {
      if (err) {
        throw err;
      }

      async.map(sources, readFileAsyncUtf8, function (err, results) {
        if (err) {
          throw err;
        }

        var doxicated = stringify(results.map(function (fileContentObj) {
          return {
            file: fileContentObj.file,
            dox: dox.parseComments(fileContentObj.content)
          };
        }), options);

        fs.writeFile(dest, doxicated, function (err) {
          if (err) {
            throw err;
          }

          done();
        });
      });
    });
  });
};
