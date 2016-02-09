(function SVGViewerModule() {

  'use strict';

  angular
    .module('svgv.views.SVGViewer', [
      'svgv.components.Header',
      'svgv.components.Canvas',
      'svgv.components.Loader',
      'svgv.components.References',
      'svgv.components.Footer'
    ]);

})();
