var config = require('../gulp-config')().validate,
  gulp = require('gulp'),
  validatePipeline = require('pipeline-validate-js')();

// tasks definitions
gulp.task('validate', validate);

// method definitions
function validate() {
  return gulp
    .src(config.src)
    .pipe(validatePipeline.validateJS());
}
