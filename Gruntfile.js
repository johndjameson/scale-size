'use strict';

/* TO-DO
   * Separate development and distribution files/directories
   * Add 'lint' command
     - CSSLint
     - CSSCSS
     - JSHint
     - Minification statistics
*/

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    yeoman: {
      app: 'app',
      dist: 'dist'
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8000,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      markup: {
        files: [
          '<%= yeoman.app %>/**/*.html'
        ],
        tasks: ['clean', 'copy', 'sass', 'autoprefixer']
      },
      sass: {
        files: [
          '<%= yeoman.app %>/sass/**/*.{scss,sass}'
        ],
        tasks: ['sass', 'autoprefixer']
      },
      javascript: {
        files: [
          '<%= yeoman.app %>/**/*.js'
        ],
        tasks: ['clean', 'copy', 'sass', 'autoprefixer']
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>/*'
          ]
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          src: [
            '**/*.html',
            'js/*.js',
            '!**/_*{,/**}' // not underscored files/directories
          ],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/sass',
          src: '**/*.{scss,sass}',
          dest: '<%= yeoman.dist %>/css',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      single_file: {
        expand: true,
        cwd: '<%= yeoman.dist %>/css',
        src: 'application.css',
        dest: '<%= yeoman.dist %>/css'
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: '<%= yeoman.dist %>/css',
        src: '*.css',
        dest: '<%= yeoman.dist %>/css',
        ext: '.min.css'
      }
    }

  });


  // Define Tasks

  grunt.registerTask('dev', [
    'clean',
    'copy',
    'sass',
    'autoprefixer',
    'cssmin',
    'connect',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'sass',
    'autoprefixer',
    'cssmin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
