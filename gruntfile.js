module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            build: {
                files: {
                    'dist/css/weatherApp.css': 'src/css/main.less'
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/weatherApp.min.css': 'dist/css/weatherApp.css'
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'dist/js/weatherApp.js': ['main.js']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/js/weatherApp.min.js': 'dist/js/weatherApp.js'
                }
            }
        },
        watch: {
            stylesheets: {
                files: ['src/**/*.less'],
                tasks: ['less']
            },
            scripts: {
                files: ['src/**/*.js', 'main.js'], tasks: ['browserify', 'test']
            }
        },
        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: [
                        'dist/js/weatherApp.js',
                        'node_modules/angular-mocks/angular-mocks.js',
                        'src/js/**/*Test.js'
                    ]
                }
            }
        },
        jshint: {
            all: ['gruntfile.js', 'src/**/*.js']
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    // Unit Test
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', [
        'jshint',
        'karma'
    ]);


    // Custom Tasks
    grunt.registerTask('build_css', ['less', 'cssmin']);
    grunt.registerTask('build_js', ['browserify', 'uglify']);

    grunt.registerTask('build', ['build_css', 'build_js', 'test']);

};
