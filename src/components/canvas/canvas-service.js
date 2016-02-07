(function CanvasServiceModule() {

  'use strict';

  angular
    .module('svgv.services.CanvasService', [])
    .factory('canvasService', CanvasService);

  function CanvasService() {
    // consts
    var DEFAULT_SIZE = 320;

    // vars
    var _canvas, _canvasBackground;

    // public api
    var _service = {
      clear: clear,
      update: update
    };

    // auto initialization
    init();

    // return api
    return _service;

    // methods definitions
    function init() {
      _canvasBackground = $('#canvasBackground');
      _canvas = $('#canvasDisplay');
    }

    function update(svg) {
      _canvasBackground.width(svg.width);
      _canvasBackground.height(svg.height);
      _canvas.empty();
      _canvas.append(svg);
    }

    function clear() {
      _canvas.empty();
      _canvasBackground.width(DEFAULT_SIZE);
      _canvasBackground.height(DEFAULT_SIZE);
    }
  }

})();
