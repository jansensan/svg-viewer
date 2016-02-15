var config = require('../gulp-config')().optimize,
  gulp = require('gulp'),
  glp = require('gulp-load-plugins')({lazy: true});

// tasks definitions
gulp.task('optimize:useref', ['template-cache'], processUseref);
gulp.task('optimize:post-js', optimizeJS);
gulp.task('optimize:post-css', optimizeCSS);

// methods definitions
function processUseref() {
  return gulp
    .src(config.src)
    .pipe(glp.plumber())
    .pipe(glp.useref())
    .pipe(gulp.dest(config.dest.prod));
}

function optimizeJS() {
  return gulp
    .src(config.post.src.js)
    .pipe(glp.plumber())
    .pipe(glp.ngAnnotate())
    .pipe(glp.uglify())
    .pipe(gulp.dest(config.dest.prodScriptsDir));
}

function optimizeCSS() {
  return gulp
    .src(config.post.src.css)
    .pipe(glp.plumber())
    .pipe(glp.cssnano())
    .pipe(gulp.dest(config.dest.prodStylesDir));
}
