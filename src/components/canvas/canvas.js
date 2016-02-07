(function CanvasModule() {

  'use strict';

  angular
    .module('svgv.components.Canvas', [
      'svgv.Templates'
    ])
    .directive('svgvCanvas', CanvasDirective);

  function CanvasDirective() {
    return {
      restrict: 'E',
      templateUrl: '/components/canvas/canvas-template.html'
    };
  }

})();
