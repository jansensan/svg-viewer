(function GridBGColorModule() {

  'use strict';

  angular
    .module('svgv.constants.GridBGColor', [])
    .constant('GridBGColor', getGridBGColor());

  function getGridBGColor() {
    return {
      BLACK: 'black',
      GRID: 'grid',
      WHITE: 'white'
    };
  }

})();
