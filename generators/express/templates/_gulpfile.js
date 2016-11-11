var gulp = require('gulp');
var clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
//const pngquant = require('imagemin-pngquant'); // $ npm i -D imagemin-pngquant
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uncss = require('gulp-uncss');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var filesize = require('gulp-filesize');

// When calles as gulp task --dir dirname
var src_files, i = process.argv.indexOf("--dir");
if(i>-1) {
    src_files = process.argv[i+1];
    src_files = src_files + '/**/*';
} else {
    src_files = '/**/*';
}

gulp.task('base', function() {
   gulp.src('./assets/template/'+src_files).on('error', gutil.log).pipe(gulp.dest('./static/')
	 );
});

gulp.task('clean', function() {
   gulp.src('./assets/template/'+src_files).pipe(gulp.dest('./static/'));
});


gulp.task('clean', function () {
    return gulp.src('./static/*', {read: false})
		        .pipe(clean());
						});

gulp.task('imagemin', function () {
    return gulp.src('static/images/*')
        .pipe(filesize())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            //use: [pngquant()]
            use: []
        }))
        .pipe(filesize())
        .pipe(gulp.dest('static/img'));
});

gulp.task('cssmin', function () {
	gulp.src('src/**/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('uncss', function () {
    return gulp.src('site.css')
        .pipe(uncss({
            html: ['index.html', 'posts/**/*.html', 'http://example.com']
        }))
        .pipe(gulp.dest('./out'));
});

gulp.task('uglify', function() {
  return gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('source/javascript/**/*.js', ['uglify']);
});
