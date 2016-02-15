(function CanvasModelModule() {

  'use strict';

  angular
    .module('svgv.models.CanvasModel', [])
    .factory('canvasModel', CanvasModel);

  function CanvasModel() {
    var _model = {
      isAspectRatioLocked: true
    };
    return _model;
  }

})();
