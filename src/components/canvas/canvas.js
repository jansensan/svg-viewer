(function CanvasModule() {

  'use strict';

  angular
    .module('svgv.components.Canvas', [
      'svgv.components.CanvasBGSelector',
      'svgv.components.IconLink',
      'svgv.models.CanvasBGSelectorModel',
      'svgv.models.CanvasModel',
      'svgv.Templates'
    ])
    .controller('CanvasController', CanvasController)
    .directive('svgvCanvas', CanvasDirective);

  function CanvasDirective() {
    return {
      restrict: 'E',
      controller: 'CanvasController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
      templateUrl: '/components/canvas/canvas-template.html'
    };
  }

  /* @ngInject */
  function CanvasController(
    $rootScope,
    bgSelectorModel,
    canvasModel
  ) {
    // vars
    var _aspectRatioIcon;

    // public api
    var vm = this;
    vm.model = canvasModel;
    vm.colorModel = bgSelectorModel;

    // auto activation
    activate();

    // methods definitions
    function activate() {
      _aspectRatioIcon = $('#aspectRatioIcon');
      _aspectRatioIcon.on('click', onAspectRatioIconClicked);
    }

    // event handlers
    function onAspectRatioIconClicked() {
      canvasModel.isAspectRatioLocked = !canvasModel.isAspectRatioLocked;
      $rootScope.$apply();
    }
  }

})();
