var config = require('../gulp-config')().copy,
  gulp = require('gulp');

// tasks definitions
gulp.task('copy:dev-sources', copyDevSources);
gulp.task('copy:dev-vendor-js', copyDevVendorJS);
gulp.task('copy:dev-vendor-css', copyDevVendorCSS);

// methods definitions
function copyDevSources() {
  return gulp
    .src(config.src.scripts)
    .pipe(gulp.dest(config.dest.dev.scripts));
}

function copyDevVendorJS() {
  return gulp
    .src(config.src.vendors, {base: 'bower_components/'})
    .pipe(gulp.dest(config.dest.dev.vendors));
}

function copyDevVendorCSS() {
  return copyVendorCSS(config.dest.dev.styles);
}

function copyProdVendorCSS() {
  return copyVendorCSS(config.dest.prod.styles);
}

function copyVendorCSS(dest) {
  return gulp
    .src(config.src.styles, {base: 'bower_components/'})
    .pipe(gulp.dest(dest));
}