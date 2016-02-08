(function IconLinkModule() {

  'use strict';

  angular
    .module('svgv.components.IconLink', [
      'svgv.Templates'
    ])
    .directive('svgvIconLink', IconLinkDirective);

  function IconLinkDirective() {
    return {
      restrict: 'E',
      templateUrl: '/components/icon-link/icon-link-template.html'
    };
  }

})();
