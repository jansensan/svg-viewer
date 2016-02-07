(function ReferencesModule() {

  'use strict';

  angular
    .module('svgv.components.References', [
      'svgv.Templates'
    ])
    .directive('svgvReferences', ReferencesDirective);

  function ReferencesDirective() {
    return {
      restrict: 'E',
      templateUrl: '/components/references/references-template.html'
    };
  }

})();
