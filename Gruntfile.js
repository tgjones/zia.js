module.exports = function(grunt) {
  "use strict";

  var hljs = require('highlight.js');

  var vendorFiles = [
    "lib/webgl-debug.js",
  ];

  var srcFiles = [
    "src/Zia.js",
    "src/Quaternion.js",
    "src/Vector3.js",
    "src/*.js",
    "src/graphics/primitives/GeometricPrimitive.js",
    "src/graphics/programs/Program.js",
    "src/graphics/programs/ProgramUtil.js",
    "src/**/*.js",
  ];

  var testFiles = [
    "test/**/*Spec.js"
  ];

  var helperFiles = [
    "test/support/**/*.js"
  ];

  // ------ TODO: Refactor this
  var apiPages = [];

  function loadApiPages() {
    apiPages.length = 0;
    if (grunt.file.isFile('.tmp/jsdoc/pages.json')) {
      Array.prototype.push.apply(apiPages,
        grunt.file.readJSON('.tmp/jsdoc/pages.json').pages);
    }
  }
  grunt.task.registerTask(
    'load-api-pages',
    'Reloads pages.json after it is changed',
    loadApiPages);

  loadApiPages();
  // ------

  grunt.initConfig({
    assemble: {
      options: {
        assets: 'dist/site/assets',
        helpers: ['site/helpers/*.js'],
        partials: ['site/includes/**/*.html', 'site/layouts/**/*.html'],
        layoutdir: 'site/layouts',
        layout: 'page.html',
        marked: {
          highlight: function(code, lang) {
            if (lang === undefined) lang = 'bash';
            if (lang === 'html') lang = 'xml';
            if (lang === 'js') lang = 'javascript';
            return hljs.highlight(lang, code).value;
          }
        }
      },
      dist: {
        options: {
          flatten: false,
          data: ['site/data/*.json'],
          collections: [
            {
              name: 'examples',
              sortby: 'order'
            }
          ]
        },
        expand: true,
        cwd: 'site/pages',
        src: '**/*.{html,md}',
        dest: 'dist/site/'
      },
      api: {
        options: {
          pages: apiPages,
          layout: 'api.html',
          collections: [
            {
              name: "api_types"
            }
          ]
        },
        files: {
          'dist/site/docs/api/': []
        }
      }
    },

    concat: {
      options: {
        separator: "\n\n"
      },
      dist: {
        src: srcFiles,
        dest: 'build/zia.js'
      },
      testHelpers: {
        src: helperFiles,
        dest: 'dist/site/assets/js/zia-spec-helpers.js'
      },
      tests: {
        src: testFiles,
        dest: 'dist/site/assets/js/zia-specs.js'
      },
      vendorFiles: {
        src: vendorFiles,
        dest: 'dist/site/assets/js/zia-spec-dependencies.js'
      }
    },

    copy: {
      dist: {
        files: [
          {expand:true, cwd: 'site/assets/', src: ['**/*','!**/*.scss'], dest: 'dist/site/assets/', filter:'isFile'},
          {expand:true, cwd: 'build/', src: ['*.js'], dest: 'dist/site/assets/js', filter: 'isFile'}
        ]
      },
      jasmine: {
        files: [
          { src: 'node_modules/grunt-contrib-jasmine/node_modules/es5-shim/es5-shim.js', dest: 'dist/site/assets/js/jasmine/es5-shim.js' },
          { src: 'node_modules/grunt-contrib-jasmine/vendor/jasmine-2.0.0/jasmine.js', dest: 'dist/site/assets/js/jasmine/jasmine.js' },
          { src: 'node_modules/grunt-contrib-jasmine/vendor/jasmine-2.0.0/jasmine-html.js', dest: 'dist/site/assets/js/jasmine/jasmine-html.js' },
          { src: 'node_modules/grunt-contrib-jasmine/vendor/jasmine-2.0.0/jasmine.css', dest: 'dist/site/assets/css/jasmine/jasmine.css' }
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

    jsdoc : {
      dist : {
        src: ['src/**/*.js'],
        options: {
          destination: '.tmp/jsdoc/',
          destfile: 'api.json',
          template: "site/jsdoc",
          configure: "site/jsdoc/jsdoc.conf.json"
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

    clean: ['dist/', '.tmp'],

    connect: {
      examples: {
        port: 8080,
        base: 'dist/site/'
      }
    },

    'jsdoc-assemble' : {
      all: {
        src: '.tmp/jsdoc/jsdoc.json',
        dest: '.tmp/jsdoc/pages.json'
      }
    },

    'gh-pages': {
      options: {
        base: 'dist/site'
      },
      src: '**/*'
    },

    sass: {
      dist: {
        files: {
          'dist/site/assets/css/site.css': 'site/assets/css/site.scss'
        }
      }
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      dist: {
        files: {
          'build/zia.min.js': ['build/zia.js']
        }
      }
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: [ 'Gruntfile.js' ]
      },
      sass: {
        files: ['site/assets/**/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
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
        files: ['site/{helpers,includes,layouts,pages}/**/*.*', '.tmp/jsdoc/pages.json'],
        tasks: ['load-api-pages', 'assemble'],
        options: { livereload: true }
      },
      doxication: {
        files: srcFiles,
        tasks: ['doxication']
      },
      "jsdoc-assemble": {
        files: ['lib/tasks/jsdoc-assemble.js', '.tmp/jsdoc/jsdoc.json'],
        tasks: ['jsdoc-assemble']
      },
      site_assets: {
        files: ['**/*'],
        tasks: ['copy'],
        options: { cwd: 'site/assets/', livereload: true }
      },
      jsdoc: {
        files: [srcFiles, 'site/jsdoc/**/*.*'],
        tasks: ['jsdoc'],
        options: { livereload: true }
      }
    },
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks('grunt-newer');

  grunt.loadTasks('lib/tasks');

  grunt.registerTask("build",   [ "clean", "sass", "karma:ci", "concat", "copy", "uglify", "jsdoc", "jsdoc-assemble", "load-api-pages", "assemble" ]);
  grunt.registerTask("default", [ "build", "karma:dev:start", "watch" ]);
  grunt.registerTask("deploy",  [ "build", "gh-pages" ]);
};