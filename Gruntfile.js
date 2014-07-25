module.exports = function(grunt) {
    grunt.initConfig({
        assemble: {
            options: {
                partials: ['app/_markup/partials/**/*.hbs'],
                layout: ['app/_markup/layouts/default.hbs'],
                data: ['app/_markup/**/*.json']
            },
            pages: {
                files: [
                    {
                        src: ['app/_markup/pages/*.hbs'],
                        dest: './app/',
                        expand: true,
                        flatten: true
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('assemble');
};