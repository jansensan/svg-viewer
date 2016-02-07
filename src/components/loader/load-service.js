/* globals loadImage */
(function LoaderServiceModule() {

  'use strict';

  angular
    .module('svgv.services.LoaderService', [
      'svgv.services.CanvasService'
    ])
    .factory('loaderService', LoaderService);

  /* @ngInject */
  function LoaderService(canvasService) {
    // vars
    var _input;

    // public api
    var _service = {
      load: load
    };

    // auto initialization
    init();

    // return api
    return _service;

    // methods definitions
    function init() {
      _input = $('#loadInput');
      _input.on('change', onInputChanged);
    }

    function load() {
      _input.click();
    }

    // event handlers
    function onInputChanged(event) {
      // get file from input
      var svgFile = event.target.files[0];

      // load image (blue imp method)
      var options = {};
      loadImage(
        svgFile,
        onImageLoaded,
        options
      );
    }

    function onImageLoaded(svg) {
      canvasService.update(svg);
    }
  }

})();
