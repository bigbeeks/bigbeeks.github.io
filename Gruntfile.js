module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/styles.css': 'scss/styles.scss'
        }
      }
    },

    shell: {
        jekyllBuild: {
          command: 'jekyll build'
        }
    },

    connect: {
      server: {
        options: {
          port: 4000,
          base: '_site'
        }
      }
    },
/*
    uncss: {
      dist: {
        options: {
          csspath:
            'http://localhost:4000/css/styles.css',
        }
        files: {
          'css/tidy.css'
        }
      }
    },
*/
   uglify: {
     my_target: {
       files: {
         'js/uglified/output.min.js': [
           'bower_components/jquery/dist/jquery.min.js',
           'bower_components/foundation/js/foundation.min.js',
           'bower_components/modernizr/modernizr.js',
           'js/foundation.js',
           'js/foundation.interchange.js',
           'js/app.js'
         ]
       }
     }
   },

    // penthouse: {
    //   extract: {
    //       outfile : '_includes/test.css',
    //       css : 'css/styles.css',
    //       url : 'http://localhost:4000',
    //       width : 1300,
    //       height : 900
    //     }
    //   },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
/*
      uncss: {
        files: 'css/*.css',
        tasks: ['uncss']
      },
*/
      uglify: {
        files: 'js/*.js',
        tasks: ['uglify']
      },
      // penthouse: {
      //   files: 'css/*.css',
      //   tasks: ['penthouse']
      // },
      livereload: {
        files: [
          '_config.yml',
          'index.html',
          'about-us/index.html',
          'case-studies/index.html',
          'contact-us/index.html',
          'privacy-policy/index.html',
          '_layouts/**',
          '_posts/**',
          '_includes/**',
          'scss/**/*.scss'
        ],
        tasks: ['shell:jekyllBuild'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-penthouse');

  grunt.registerTask('build', [
    'sass',
    'uglify',
    // 'penthouse'
    //'uncss'
  ]);
  grunt.registerTask('default', [
    'shell',
    'build',
    'connect',
    'watch'
  ]);

};