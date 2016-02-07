var bowerJson = require('./bower.json'),
  wiredep = require('wiredep');

module.exports = function gulpConfig() {
  var projectDir = process.env.PWD = process.cwd() + '/',
    srcDir = 'src/',
    testDir = 'src/',
    devDir = '.dev/',
    prodDir = 'www/',
    prodScriptsDir = prodDir + 'scripts/',
    prodStylesDir = prodDir + 'assets/css/',
    localDomain = 'local.svg-viewer.com',
    localPort = 5678,
    localURL = 'http://' + localDomain + ':' + localPort;

  var bowerFiles = {
    devDependencies: wiredep({devDependencies: true}).js,
    dependencies: wiredep().js,
    css: wiredep().css
  };
  var bowerConfig = {
    json: bowerJson,
    directory: 'bower_components/',
    ignorePath: '../bower_components',
    exclude: []
  };
  var filesets = {
    allJS: [
      srcDir + '*.js',
      srcDir + '**/*.js'
    ],
    appJS: [
      srcDir + '**/*.js',
      '!' + srcDir + '**/*-spec.js',
      '!' + srcDir + '**/*-mock*.js'
    ],
    docJs: [],
    specs: [
      testDir + '*-spec.js',
      testDir + '**/*-spec.js'
    ]
  };

  var pipelines = {
    copy: {
      src: {
        vendors: bowerFiles.dependencies,
        scripts: filesets.appJS,
        styles: bowerFiles.css
      },
      dest: {
        dev: {
          vendors: devDir + 'scripts/vendor',
          scripts: devDir + 'scripts/src',
          styles: devDir + 'styles/vendor',
          assets: devDir + 'assets'
        },
        prod: {
          styles: prodDir + 'styles/vendor',
          assets: prodDir + 'assets'
        }
      }
    },
    templateCache: {
      srcDir: srcDir,
      src: [
        srcDir.concat('**/*-template.html')
      ],
      dest: {
        dev: devDir + 'scripts/src'
      },
      fileName: 'svg-viewer-templates.js',
      opts: {
        module: 'svgv.Templates',
        root: '/',
        standalone: true
      }
    },
    build: {
      src: {
        index: srcDir + 'index.html',
        scripts: filesets.appJS,
        templateCacheDev: devDir + 'scripts/src/svg-viewer-templates.js'
      },
      dest: devDir,
      options: {
        wiredep: {
          bowerJson: bowerConfig.json,
          directory: bowerConfig.directory,
          ignorePath: bowerConfig.ignorePath,
          exclude: bowerConfig.exclude,
          fileTypes: {
            html: {
              replace: {
                js: '<script src="/scripts/vendor{{filePath}}"></script>',
                css: '<link rel="stylesheet" href="/styles/vendor{{filePath}}" />'
              }
            }
          }
        },
        inject: {
          ignorePath: '/src',
          addPrefix: 'scripts/src'
        },
        templateCache: {
          read: false,
          starttag: '<!-- inject:templates:js -->',
          ignorePath: '.dev/'
        }
      }
    },
    serve: {
      server: {
        host: localDomain,
        port: localPort,
        webRoot: {
          dev: devDir,
          prod: prodDir
        }
      },
      localURL: localURL
    }
  };
  return pipelines;
}