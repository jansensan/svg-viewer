var config = require('../gulp-config')().less,
  u = require('../lib/util'),
  gulp = require('gulp'),
  watch = require('gulp-watch'),
  glp = require('gulp-load-plugins')({lazy: true});

// tasks definitions
gulp.task('less', compileLESS);
gulp.task('less:watch', watchLESS);

// method definitions
function compileLESS() {
  u.inform('Compiling LESS → CSS');
  return gulp
    .src(config.src)
    .pipe(glp.plumber())
    .pipe(glp.less())
    .pipe(glp.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'ff 15', 'android 2.3', 'ie 8']}))
    .pipe(gulp.dest(config.dest));
}

function watchLESS() {
  u.inform('Watching LESS Files from "' + config.watch + '"');
  watch(
    config.watch,
    compileLESS
  );
}
