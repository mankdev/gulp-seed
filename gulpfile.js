var gulp = require('gulp'),
    rimraf = require('rimraf');


require('gulp-grunt')(gulp);

gulp.task('markup-clean', function() {
	rimraf.sync('app/index.html');
	rimraf.sync('app/inner.html');
});

gulp.task('markup-build', ['markup-clean'], function() {
    return gulp.start('grunt-assemble');
});

gulp.task('styles-clean', function() {
	rimraf.sync('./app/inc/css');
});

gulp.task('styles-build', ['styles-clean'], function() {
	var stylus = require('gulp-stylus'),
		nib = require('nib'),
		prefix = require('gulp-autoprefixer');

    return gulp.src('./app/inc/styl/*.styl')
        .pipe(stylus({
            'include css': true,
            use: [nib()]
        }))
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest('app/inc/css'));
});


gulp.task('lib-clean', function() {
	rimraf.sync('./app/inc/js/lib.js');
});

gulp.task('lib-build', ['lib-clean'], function() {
	var bowerFiles = require('main-bower-files'),
		concat = require('gulp-concat-sourcemap');

	return gulp.src(bowerFiles())
		.pipe(concat('lib.js', {sourcesContent: true}))
		.pipe(gulp.dest('./app/inc/js'))
});

gulp.task('scripts-clean', function() {
	rimraf.sync('./app/inc/js/build.js');
});

gulp.task('scripts-build', ['scripts-clean'], function() {
	var concat = require('gulp-concat-sourcemap');

	return gulp.src(['./app/inc/js/src/all/**/*.js', './app/inc/js/src/initialize.js'])
		.pipe(concat('build.js', {sourcesContent: true}))
		.pipe(gulp.dest('./app/inc/js'))
});

gulp.task('build', ['markup-build', 'styles-build', 'lib-build', 'scripts-build']);

gulp.task('default', function() {
	var watch = require('gulp-watch'),
		livereload = require('gulp-livereload');

	livereload.listen();

	watch({glob: "app/_markup/**/*"}, function() {
		gulp.start('markup-build', livereload.changed);
	});

	watch({glob: "app/**/*.styl"}, function() {
		gulp.start('styles-build', livereload.changed);
	});

	watch({glob: "./lib/**/*"}, function() {
		gulp.start('lib-build', livereload.changed);
	});

	watch({glob: "./app/inc/js/**/*"}, function() {
		gulp.start('scripts-build', livereload.changed);
	});
});