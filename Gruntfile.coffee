module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    coffee:
      src:
        options:
          bare: true
        files:
          'lib/moment-readable.js': 'src/moment-readable.coffee'
      spec:
        files:
          'spec/readable-spec.js': 'spec/readable-spec.coffee'

    watch:
      spec:
        files: ['spec/**/*.coffee']
        tasks: ['coffee:spec', 'umd']
      src:
        files: ['src/**/*.coffee']
        tasks: ['coffee:src']
      jasmine:
        files: ['lib/**/*.js', 'specs/**/*.js']
        tasks: 'jasmine:test:build'
      umd:
        files: ['umd.hbs']
        tasks: ['umd']

    jasmine:
      test:
        src: ['lib/**/*.js']
        options:
          outfile: 'spec/index.html'
          specs: 'spec/readable-spec.js'
          vendor: [
            'bower_components/moment/moment.js'
            'bower_components/moment/locale/zh-cn.js'
            'bower_components/moment-timezone/builds/moment-timezone-with-data.js'
          ]

    umd:
      all:
        src: 'lib/moment-readable.js'
        template: 'umd.hbs'
        amdModuleId: 'moment-readable'
        objectToExport: 'readable'
        globalAlias: 'readable'
        deps:
          'default': ['moment']
          amd: ['moment']
          cjs: ['moment']
          global:
            items: ['moment']
            prefix: ''

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-umd'

  grunt.registerTask 'default', ['coffee', 'umd', 'jasmine:test:build', 'watch']
