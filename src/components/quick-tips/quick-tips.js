(function QuickTipsModule() {

  'use strict';

  angular
    .module('svgv.components.QuickTips', [
      'svgv.Templates'
    ])
    .directive('svgvQuickTips', QuickTipsDirective);

  function QuickTipsDirective() {
    return {
      restrict: 'E',
      templateUrl: '/components/quick-tips/quick-tips-template.html'
    };
  }

})();
