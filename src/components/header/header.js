(function HeaderModule() {

  'use strict';

  angular
    .module('svgv.components.Header', [
      'svgv.Templates'
    ])
    .directive('svgvHeader', HeaderDirective);

  function HeaderDirective() {
    return {
      restrict: 'E',
      templateUrl: '/components/header/header-template.html'
    };
  }

})();
