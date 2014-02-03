module.exports = function(grunt) {

    var copyrights, banner, footer;

    copyrights = '/* http://idesignexperiences.com */\n\n';

    banner = '(function(<%= pkg.name %>, window, document, undefined) {';
    footer = '}(window.<%= pkg.name %> = window.<%= pkg.name %> || {}. window, document));';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: banner,
                footer: footer
            },
            dist: {
                src: ['source/scripts/*.js'],
                dest: 'source/scripts/temp/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: copyrights
            },
            dist: {
                files: {
                    'assets/scripts/<%= pkg.name %>.min.js': ['source/scripts/<%= pkg.name %>.js']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'source/scripts/*.js'],
            options: {
                globals: {
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'source/sass',
                    cssDir: 'assets/stylesheets'
                }
            }
        },
        watch: {
            files: ['source/**'],
            tasks: ['jshint', 'concat', 'compass']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass']);
};
