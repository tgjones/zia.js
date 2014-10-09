module.exports = function(grunt) {
  "use strict";

  var vendorFiles = [
    "lib/webgl-debug.js",
  ];

  var srcFiles = [
    "src/Zia.js",
    "src/Quaternion.js",
    "src/Vector3.js",
    "src/*.js",
    "src/graphics/Program.js",
    "src/**/*.js",
  ];

  var testFiles = [
    "test/**/*Spec.js"
  ];

  var helperFiles = [
    "test/support/**/*.js"
  ];

  grunt.initConfig({
    concat: {
      options: {
        separator: "\n\n"
      },
      dist: {
        src: srcFiles,
        dest: 'build/zia.js'
      }
    },

    jasmine: {
      dev: {
        src: srcFiles,
        options: {
          specs: testFiles,
          helpers: helperFiles,
          vendor: vendorFiles,
          outfile: 'test/SpecRunner.html',
          keepRunner: true
        }
      }
    },

    watch: {
      jasmine: {
        files: [ srcFiles, testFiles, helperFiles ],
        tasks: "jasmine:dev:build"
      },
      karma: {
        files: [ srcFiles, testFiles, helperFiles ],
        tasks: [ "concat", "karma:unit:run"]
      }
    },

    karma: {
      options: {
        browsers: ['Chrome'],
        files: [
          vendorFiles,
          srcFiles,
          helperFiles,
          testFiles
        ],
        frameworks: ['jasmine']
      },
      unit: {
        background: true
      },
      ci: {
        singleRun: true
      }
    },

    connect: {
      examples: {
        port: 8080,
        base: '.'
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks('grunt-connect');

  grunt.registerTask("default", [
    "karma:unit:start",  
    "watch"
  ]);
  grunt.registerTask("test", [
    "watch:jasmine"
  ]);
  grunt.registerTask("dist", [
    "karma:ci",
    "concat"
  ]);
};