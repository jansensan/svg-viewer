var bowerJson = require('./bower.json'),
  packageJson = require('./package.json'),
  wiredep = require('wiredep');

module.exports = function gulpConfig() {
  var projectName = packageJson.name,
    projectDir = process.env.PWD = process.cwd() + '/',
    srcDir = 'src/',
    testDir = 'src/',
    devDir = '.dev/',
    prodDir = 'www/',
    prodScriptsDir = prodDir + 'scripts/',
    prodStylesDir = prodDir + 'styles/',
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
  var fileNames = {
    css: projectName + '.css',
    less: projectName + '.less',
    app: projectName + '.js',
    templates: projectName + '-templates.js'
  };

  var pipelines = {
    validate: {
      src: filesets.appJS
    },
    less: {
      src: srcDir + 'styles/' + fileNames.less,
      watch: srcDir + '**/*.less',
      dest: devDir + 'styles/'
    },
    copy: {
      src: {
        assets: srcDir + 'assets/**/*',
        scripts: filesets.appJS,
        styles: bowerFiles.css,
        vendors: bowerFiles.dependencies
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
      fileName: fileNames.templates,
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
        templateCacheDev: devDir + 'scripts/src/' + fileNames.templates,
        css: devDir + 'styles/' + fileNames.css
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
        scripts: {
          ignorePath: '/src',
          addPrefix: 'scripts/src'
        },
        templateCache: {
          read: false,
          starttag: '<!-- inject:templates:js -->',
          ignorePath: '.dev/'
        },
        css: {
          read: false,
          starttag: '<!-- inject:css -->',
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
    },
    optimize: {
      src: devDir + 'index.html',
      post: {
        src: {
          js: [
            prodScriptsDir + fileNames.app,
            prodScriptsDir + 'vendors.js'
          ],
          css: [
            prodStylesDir + fileNames.css
          ]
        }
      },
      dest: {
        prod: prodDir,
        prodScriptsDir: prodScriptsDir, 
        prodStylesDir: prodStylesDir
      }
    }
  };
  return pipelines;
}