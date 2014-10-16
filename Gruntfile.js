'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;
  var yeomanConfig = {
      app: 'app',
      dist: 'public'
  };
  grunt.initConfig({
    yeoman: yeomanConfig,
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: 'public/css',
        imagesDir: '<%= yeoman.app %>/img',
        javascriptsDir: 'public/js',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: 'public/components',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      jade: {
        files: ['app/views/**/*.jade'],
        options: { livereload: reloadPort }
      }
    }
    // requirejs: {
    //   compile:{
    //     options:{
    //       baseUrl: '<%= yeoman.app %>/scripts/',
    //       name: 'visionquest',
    //       create: true,
    //       mainConfigFile : '<%= yeoman.app %>/scripts/init.js',
    //       out: "main.js",

    //     }
    //   },
    //   dist: {
    //     // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
    //     options: {
    //       // `name` and `out` is set by grunt-usemin
    //       baseUrl: 'app/scripts',

    //       optimize: 'uglify',
    //       dir: "public/js",
    //        modules: [
    //               //Just specifying a module name means that module will be converted into
    //           //a built file that contains all of its dependencies. If that module or any
    //           //of its dependencies includes i18n bundles, they may not be included in the
    //           //built file unless the locale: section is set above.
    //           {
    //               name: "visionquest",

    //               //create: true can be used to create the modul layer at the given
    //               //name, if it does not already exist in the source location. If
    //               //there is a module at the source location with this name, then
    //               //create: true is superfluous.
    //               create: true,
    //           }
    //         ],
    //       paths: {
    //       },
    //       // TODO: Figure out how to make sourcemaps work with grunt-usemin
    //       // https://github.com/yeoman/grunt-usemin/issues/30
    //       //generateSourceMaps: true,
    //       // required to support SourceMaps
    //       // http://requirejs.org/docs/errors.html#sourcemapcomments
    //       preserveLicenseComments: false,
    //       useStrict: true,
    //       wrap: true,
    //       //uglify2: {} // https://github.com/mishoo/UglifyJS2
    //       // pragmasOnSave: {
    //       //   //removes Handlebars.Parser code (used to compile template strings) set
    //       //   //it to `false` if you need to parse template strings even after build
    //       //   excludeHbsParser : true,
    //       //   // kills the entire plugin set once it's built.
    //       //   excludeHbs: true,
    //       //   // removes i18n precompiler, handlebars and json2
    //       //   excludeAfterBuild: true
    //       // }
    //     }
    //   },
    // },
    // bower: {
    //   target: {
    //       rjsConfig: '<%= yeoman.app %>/scripts/init.js'
    //   }
    // }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', 'compass', ['develop', 'watch']);
};
