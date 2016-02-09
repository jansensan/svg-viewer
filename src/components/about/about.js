(function AboutModule() {

  'use strict';

  angular
    .module('svgv.components.About', [
      'svgv.Templates'
    ])
    .directive('svgvAbout', AboutDirective);

  function AboutDirective() {
    return {
      restrict: 'E',
      templateUrl: '/components/about/about-template.html'
    };
  }

})();
