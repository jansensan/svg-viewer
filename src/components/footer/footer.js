(function FooterModule() {

  'use strict';

  angular
    .module('svgv.components.Footer', [])
    .directive('svgvFooter', FooterDirective);

  function FooterDirective() {
    return {
      restrict: 'E',
      templateUrl: '/components/footer/footer-template.html'
    };
  }

})();
