var config = require('../gulp-config')().build,
  gulp = require('gulp'),
  wiredep = require('wiredep').stream,
  glp = require('gulp-load-plugins')({lazy: true});

// tasks definitions
gulp.task('build:svg-viewer', ['template-cache'], buildDevPages);

// methods definitions
function buildDevPages() {
  return gulp
    .src(config.src.index)
    // inject bower dependencies in html
    .pipe(wiredep(config.options.wiredep))
    // inject sources in html
    .pipe(glp.inject(
      gulp
        .src(config.src.scripts)
        .pipe(glp.angularFilesort()), config.options.scripts)
    )
    // inject template cache in html
    .pipe(glp.inject(
      gulp.src(config.src.templateCacheDev), config.options.templateCache)
    )
    // inject project css in html
    .pipe(glp.inject(
      gulp.src(config.src.css), config.options.css)
    )
    // output file
    .pipe(gulp.dest(config.dest));
}
