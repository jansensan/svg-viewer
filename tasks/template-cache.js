var config = require('../gulp-config')().templateCache,
  util = require('../lib/util'),
  gulp = require('gulp'),
  glp = require('gulp-load-plugins')({lazy: true});

// tasks definitions
gulp.task('template-cache', writeTemplateCache);
gulp.task('clean:template-cache', cleanTemplateCache);

// methods definitions
function writeTemplateCache() {
  return gulp
    .src(config.src)
    .pipe(glp.minifyHtml({empty: true}))
    .pipe(glp.angularTemplatecache(
      config.fileName,
      config.opts
    ))
    .pipe(gulp.dest(config.dest.dev));
}

function cleanTemplateCache(done) {
  var filePath = config.srcDir.concat(config.fileName);
  return util.trash(filePath, done);
}
