var gulp = require('gulp'),
  glp = require('gulp-load-plugins')({lazy: true}),
  requireDir = require('require-dir'),
  runSequence = require('run-sequence');

// require tasks directory
requireDir('./tasks', {recurse: true});

// tasks definitions
gulp.task('help', glp.taskListing);
gulp.task('default', ['help']);

gulp.task('build:dev', buildDev);
gulp.task('dev', dev);

// methods definitions
function buildDev(done) {
  runSequence(
    'clean:template-cache',
    'validate',
    'clean:dev',
    'copy:dev-vendor-css',
    'copy:dev-vendor-js',
    'copy:dev-sources',
    'less',
    'less:watch',
    'build:svg-viewer',
    'clean:template-cache',
    done
  );
}

function dev() {
  runSequence(
    'build:dev',
    'serve:dev'
  );
}