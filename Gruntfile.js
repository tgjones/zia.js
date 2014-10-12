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
    assemble: {
      dist: {
        options: {
          flatten: false,
          assets: 'dist/site/assets',
          data: ['site/data/*.json'],
          helpers: ['site/helpers/*.js'],
          partials: ['site/includes/**/*.html'],
          layoutdir: 'site/layouts',
          layout: 'default.html'
        },
        expand: true,
        cwd: 'site/pages',
        src: '**/*.{html,md}',
        dest: 'dist/site/'
      }
    },

    concat: {
      options: {
        separator: "\n\n"
      },
      dist: {
        src: srcFiles,
        dest: 'build/zia.js'
      }
    },

    copy: {
      dist: {
        files: [
          {expand:true, cwd: 'site/assets/', src: ['**/*'], dest: 'dist/site/assets/', filter:'isFile'},
          {expand:true, cwd: 'build/', src: ['*.js'], dest: 'dist/site/assets/js', filter: 'isFile'}
        ]
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
      dev: {
        background: true
      },
      ci: {
        singleRun: true
      }
    },

    clean: ['dist/'],

    connect: {
      examples: {
        port: 8080,
        base: 'dist/site/'
      }
    },

    'gh-pages': {
      options: {
        base: 'dist/site'
      },
      src: '**/*'
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: [ 'Gruntfile.js' ]
      },
      js: {
        files: srcFiles,
        tasks: [ 'concat', 'copy' ]
      },
      jasmine: {
        files: [ srcFiles, testFiles, helperFiles ],
        tasks: "jasmine:dev:build"
      },
      karma: {
        files: [ srcFiles, testFiles, helperFiles ],
        tasks: [ "karma:dev:run"]
      },
      assemble: {
        files: ['site/{helpers,layouts,pages}/**/*.*'],
        tasks: ['assemble'],
        options: { livereload: true }
      },
      site_assets: {
        options: { cwd: 'site/assets/', livereload: true },
        files: ['**/*'],
        tasks: ['copy']
      },
    },
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask("build",   [ "clean", "karma:ci", "concat", "copy", "assemble" ]);
  grunt.registerTask("default", [ "build", "karma:dev:start", "watch" ]);
  grunt.registerTask("deploy",  [ "build", "gh-pages" ]);
};