module.exports = function(grunt) {

    var copyrights, banner, footer;

    copyrights = '/* http://idesignexperiences.com */\n\n';

    banner = '(function(idex, window, document, undefined) {';
    footer = '}(window.idex = window.idex || {}. window, document));';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: banner,
                footer: footer
            },
            dist: {
                src: ['source/scripts/*.js'],
                dest: 'source/scripts/<%= pkg.name %>.js'
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
        
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/images/'
                }]
            }
        },
        
        watch: {
            files: ['source/**'],
            tasks: ['jshint', 'concat', 'uglify', 'compass']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass', 'imagemin']);
};
