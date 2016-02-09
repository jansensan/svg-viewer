(function CanvasBGSelectorModule() {

  'use strict';

  angular
    .module('svgv.components.CanvasBGSelector', [
      'svgv.models.CanvasBGSelectorModel'
    ])
    .controller('CanvasBGSelectorController', CanvasBGSelectorController)
    .directive('svgvCanvasBgSelector', CanvasBGSelectorDirective);

  function CanvasBGSelectorDirective() {
    return {
      restrict: 'E',
      controller: 'CanvasBGSelectorController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
      templateUrl: '/components/canvas-bg-selector/canvas-bg-selector-template.html'
    };
  }

  /* @ngInject */
  function CanvasBGSelectorController(
    $rootScope,
    bgSelectorModel
  ) {

    var vm = this;
    vm.model = bgSelectorModel;

    // auto activation
    activate();

    // methods definitions
    function activate() {
      $('.selected-bg').on('click', onClickedOnSelectedBG);
      $('.bg-option').on('click', onClickedOnBGOption);
    }

    // event handlers
    function onClickedOnSelectedBG() {
      $('.color-list').css('display', 'block');
    }

    function onClickedOnBGOption(event) {
      bgSelectorModel.selectedColor = event.target.classList[2];
      $('.color-list').css('display', 'none');
      $rootScope.$apply();
    }
  }

})();
