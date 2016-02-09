(function CanvasBGSelectorModelModule() {

  'use strict';

  angular
    .module('svgv.models.CanvasBGSelectorModel', [
      'svgv.constants.GridBGColor'
    ])
    .factory('bgSelectorModel', CanvasBGSelectorModel);

  /* @ngInject */
  function CanvasBGSelectorModel(GridBGColor) {
    var _model = {
      selectedColor: GridBGColor.GRID
    };
    return _model;
  }

})();
