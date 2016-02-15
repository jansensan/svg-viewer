var config = require('../gulp-config')().serve,
  gulp = require('gulp'),
  glp = require('gulp-load-plugins')({lazy: true});

// allows self signed cert during dev
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// tasks definitions
gulp.task('serve:dev', serveDev);
gulp.task('serve', serveProd);

// methods definitions
function serveDev() {
  return serve('dev');
}

function serveProd() {
  return serve('prod');
}

function serve(key) {
  var webRoot = config.server.webRoot[key];
  return gulp
    .src(webRoot)
    .pipe(glp.webserver({
      host: config.server.host,
      port: config.server.port,
      fallback: 'index.html',
      open: config.localURL
    }));
}
