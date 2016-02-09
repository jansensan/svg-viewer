(function SVGViewerModule() {

  'use strict';

  angular
    .module('svgv.views.SVGViewer', [
      'svgv.components.Header',
      'svgv.components.Canvas',
      'svgv.components.Loader',
      'svgv.components.QuickTips',
      'svgv.components.About',
      'svgv.components.References',
      'svgv.components.Footer'
    ]);

})();
