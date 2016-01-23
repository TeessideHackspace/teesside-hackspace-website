(function() {
  'use strict';

  angular
    .module('teessideHackspaceWebsite')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
