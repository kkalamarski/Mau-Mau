module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            build: {
                files: {
                    'dist/css/main.css': 'src/css/main.less'
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/main.min.css': 'dist/css/main.css'
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'dist/js/main.js': ['main.js']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/js/main.min.js': 'dist/js/main.js'
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
                        'dist/js/main.js',
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
