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
gulp.task('build', build);
gulp.task('build-and-serve', buildAndServe);

// methods definitions
function buildDev(done) {
  runSequence(
    'clean:template-cache',
    'validate',
    'clean:dev',
    'copy:dev-vendor-css',
    'copy:dev-vendor-js',
    'copy:dev-assets',
    'copy:dev-sources',
    'less',
    'build:svg-viewer',
    'clean:template-cache',
    done
  );
}

function dev() {
  runSequence(
    'build:dev',
    'less:watch',
    'serve:dev'
  );
}

function build(done) {
  runSequence(
    'clean:prod',
    'build:dev',
    'copy:assets',
    'optimize:useref',
    'optimize:post-js',
    'optimize:post-css',
    'clean:dev',
    done
  );
}

function buildAndServe() {
  runSequence(
    'build',
    'serve'
  );
}