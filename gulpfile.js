//--Include Gulp-----
var gulp = require('gulp');

//--Gulp-Plugins------
var minifyHTML 		= require('gulp-minify-html');	
var sass 			    = require('gulp-sass');
var minifycss 		= require('gulp-minify-css');
var jshint 			  = require('gulp-jshint');







/***************************************************************
************************ Web Server ****************************
***************************************************************/
//var projectRoot = __dirname+'/app/dev/';
var projectRoot = __dirname+'/app/production/';

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static(projectRoot));
  app.listen(4000);
  console.log("....The magic happens on port: 4000!");
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(projectRoot, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}



/***************************************************************
************************ Tasks *********************************
***************************************************************/


//--HTML-----
gulp.task('htmlmin', function() {
  var opts = {comments:false,spare:true};

  gulp.src('app/dev/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('app/production/'));
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









/***************************************************************
************************ Watch *********************************
***************************************************************/

//--Watch-Task-----
gulp.task('watch', function() {
  gulp.watch('app/dev/*.html', ['htmlmin']);
  gulp.watch('app/dev/sass/*.scss', ['sass']);

  gulp.watch('app/dev/*.html', notifyLiveReload);
  gulp.watch('app/dev/css/*.css', notifyLiveReload);
});

//--default task ($ gulp)
gulp.task('default', ['htmlmin', 'sass', 'express', 'livereload', 'watch'], function() {
  console.log("...up to date")
});












