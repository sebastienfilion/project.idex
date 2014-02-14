module.exports = function(grunt) {

    var copyrights, banner, footer;

    copyrights = '/* <%= pkg.url %> */\n\n';

    banner = '(function(<%= pkg.name %>, window, document, undefined) {\n';
    footer = '\n }(window.<%= pkg.name %> = window.<%= pkg.name %> || {}, window, document));';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: banner,
                footer: footer
            },
            dist: {
                src: ['source/scripts/*.js'],
                dest: 'assets/scripts/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: copyrights
            },
            dist: {
                files: {
                    'assets/scripts/<%= pkg.name %>.min.js': ['assets/scripts/<%= pkg.name %>.js']
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
        cssmin: {
            add_banner: {
                options: {
                    banner: copyrights
                }
            },
            minify: {
                expand: true,
                cwd: 'assets/stylesheets/',
                src: ['*.css', '!*.min.css'],
                dest: 'assets/stylesheets/',
                ext: '.min.css'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/images/tmp/'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['source/scripts/*.js'],
                tasks: ['jshint', 'concat']
            },
            css: {
                files: ['source/sass/*.scss'],
                tasks: 'compass',
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass', 'cssmin', 'imagemin']);
};
