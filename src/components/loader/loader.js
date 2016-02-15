(function LoaderModule() {

  'use strict';

  angular
    .module('svgv.components.Loader', [
      'svgv.services.CanvasService',
      'svgv.services.LoaderService',
      'svgv.Templates'
    ])
    .controller('LoaderController', LoaderController)
    .directive('svgvLoader', LoaderDirective);

  function LoaderDirective() {
    return {
      restrict: 'E',
      controller: 'LoaderController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
      templateUrl: '/components/loader/loader-template.html'
    };
  }

  /* @ngInject */
  function LoaderController(
    canvasService,
    loaderService
  ) {
    var vm = this;
    vm.load = loaderService.load;
    vm.clear = canvasService.clear;
  }

})();
