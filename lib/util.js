var del = require('del'),
  chalk = require('chalk');

// public api
module.exports = {
  inform: inform,
  logMethodCall: logMethodCall,
  trash: trash,
  warn: warn
};

// method definitions
function trash(path, done) {
  warn('Deleting: ' + path);
  return del(path, done);
}

function logMethodCall(name) {
  warn('--- ' + name + ' ---');
}

function warn(warning) {
  console.log(chalk.yellow(warning));
}

function inform(info) {
  console.log(chalk.blue(info));
}