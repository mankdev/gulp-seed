var gulp = require('gulp'),
    clean = require('gulp-clean'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    realStylus = require('gulp-stylus/node_modules/stylus'),
    prefix = require('gulp-autoprefixer'),
	connect = require('gulp-connect'),
	launch = require('open');


require('gulp-grunt')(gulp);

gulp.task('markup-clean', function() {
    gulp.src('app/*.html')
        .pipe(clean());
});

gulp.task('markup-build', ['markup-clean'], function() {
    gulp.start('grunt-assemble', function() {
		gulp.src('app/*.html')
			.pipe(connect.reload());
    });
});

gulp.task('styles-clean', function() {
    gulp.src('./app/inc/css/*.css')
        .pipe(clean({read: false}));
});

gulp.task('styles-build', ['styles-clean'], function() {
    gulp.src('./app/inc/styl/*.styl')
        .pipe(stylus({
            'include css': true,
            define: {
                url: realStylus.resolver({ paths: [__dirname + '/app/inc/css'] })
            },
            use: [nib()]
        }))
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest('app/inc/css'))
        .pipe(connect.reload())
});

gulp.task('build', ['markup-build', 'styles-build']);

gulp.task('default', function() {
	connect.server({
		port: 3000,
		livereload: true
	});

    gulp.watch('app/_markup/**/*').on('change', function() {
        gulp.start('markup-build');
    });

    gulp.watch('app/**/*.styl').on('change', function() {
        gulp.start('styles-build');
    });

	launch('http://localhost:3000/app', 'Google Chrome');
});