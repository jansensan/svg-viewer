var gulp = require('gulp'),
  util = require('../lib/util');

// tasks definitions
gulp.task('clean:dev', cleanDev);
gulp.task('clean:prod', cleanProd);
gulp.task('clean:coverage', cleanCoverage);

// method definitions
function cleanDev(done) {
  return util.trash('.dev', done);
}

function cleanProd(done) {
  return util.trash('www', done);
}

function cleanCoverage(done) {
  return util.trash('reports/coverage', done);
}
