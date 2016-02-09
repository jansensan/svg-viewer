(function CanvasServiceModule() {

  'use strict';

  angular
    .module('svgv.services.CanvasService', [
      'svgv.models.CanvasModel'
    ])
    .factory('canvasService', CanvasService);

  /* @ngInject */
  function CanvasService(canvasModel) {
    // consts
    var DEFAULT_WIDTH = 640;
    var DEFAULT_HEIGHT = 320;

    // vars
    var _canvas,
      _canvasBackground,
      _widthInput,
      _heightInput,
      _ratio = 1,
      _dimensions = {
        width: -1,
        height: -1
      };

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
      _widthInput = $('#widthInput');
      _heightInput = $('#heightInput');
      enableInputListeners();
    }

    function update(svg) {
      disableInputListeners();

      // save dimensions
      _dimensions.width = svg.width;
      _dimensions.height = svg.height;
      _ratio = _dimensions.width / _dimensions.height;

      resizeCanvasBackground();
      updateInputs();

      // add loaded image
      _canvas.empty();
      _canvas.append(svg);

      enableInputListeners();
    }

    function clear() {
      // remove doms elements
      _canvas.empty();

      // resize canvas
      _canvasBackground.width(DEFAULT_WIDTH);
      _canvasBackground.height(DEFAULT_HEIGHT);

      // clear inputs
      _widthInput.val('');
      _heightInput.val('');
    }

    function enableInputListeners() {
      _widthInput.on('change', onWidthInputChanged);
      _heightInput.on('change', onHeightInputChanged);
    }

    function disableInputListeners() {
      _widthInput.off('change');
      _heightInput.off('change');
    }

    function resizeCanvasBackground() {
      _canvasBackground.width(_dimensions.width);
      _canvasBackground.height(_dimensions.height);
    }

    function resizeSVG() {
      var svg = $('#canvasDisplay > img');
      svg.attr('preserveAspectRatio', 'none');
      svg.attr('width', _dimensions.width);
      svg.attr('height', _dimensions.height);
    }

    function updateInputs() {
      _widthInput.val(_dimensions.width);
      _heightInput.val(_dimensions.height);
    }

    function updateLayout() {
      disableInputListeners();
      resizeCanvasBackground();
      resizeSVG();
      updateInputs();
      enableInputListeners();
    }

    function calculateWidth(newHeight) {
      var newWidth = _widthInput.val();
      if (canvasModel.isAspectRatioLocked) {
        newWidth = parseInt(newHeight * _ratio, 10);
      }
      return newWidth;
    }

    function calculateHeight(newWidth) {
      var newHeight = _heightInput.val();
      if (canvasModel.isAspectRatioLocked) {
        newHeight = parseInt(newWidth / _ratio, 10);
      }
      return newHeight;
    }

    // event handlers
    function onWidthInputChanged() {
      _dimensions.width = _widthInput.val();
      _dimensions.height = calculateHeight(_widthInput.val());
      updateLayout();
    }

    function onHeightInputChanged() {
      _dimensions.height = _heightInput.val();
      _dimensions.width = calculateWidth(_heightInput.val());
      updateLayout();
    }
  }

})();
