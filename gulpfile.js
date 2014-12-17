//--Include Gulp-----
var gulp = require('gulp');

//--Gulp-Plugins------

//html
var minifyHTML 		= require('gulp-minify-html');	





//--HTML-----
gulp.task('html', function() {
  var opts = {comments:false,spare:true};

  gulp.src('app/dev/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('app/production/'))
});
