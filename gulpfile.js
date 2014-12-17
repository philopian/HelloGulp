//--Include Gulp-----
var gulp = require('gulp');

//--Gulp-Plugins------
var minifyHTML 		= require('gulp-minify-html');	
var sass 			= require('gulp-sass');
var minifycss 		= require('gulp-minify-css');
var autoprefixer 	= require('gulp-autoprefixer');
var jshint 			= require('gulp-jshint');



//--HTML-----
gulp.task('html', function() {
  var opts = {comments:false,spare:true};

  gulp.src('app/dev/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('app/production/'))
});



//--SASS------
gulp.task('sass', function() {
      return gulp.src('app/dev/sass/*.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulp.dest('app/dev/css/'))
        .pipe(minifycss())
        .pipe(gulp.dest('app/production/css/'));
});



//--JavaScript-----
// JS hint task
gulp.task('jshint', function() {
  gulp.src('./app/dev/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});







