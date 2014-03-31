'use strict';

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
        tasks: ['build']
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
        tasks: ['concat']
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          src: ['**/*.html', 'favicon.ico'],
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
    },

    concat: {
      dist: {
        src: [
          '<%= yeoman.app %>/js/accordion.js',
          '<%= yeoman.app %>/js/scalesize.js',
          '<%= yeoman.app %>/js/application.js'
        ],
        dest: '<%= yeoman.dist %>/js/application.js'
      }
    }

  });


  // Define Tasks

  grunt.registerTask('dev', [
    'build',
    'connect',
    'watch'
  ]);

  grunt.registerTask('build', [
    'copy',
    'sass',
    'autoprefixer',
    'cssmin',
    'concat'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
