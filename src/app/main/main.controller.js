(function() {
  'use strict';

  angular
    .module('membership')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, auth) {
    $scope.isMember = false;

    if(auth && auth.isAuthenticated && auth.profile && auth.profile.roles && auth.profile.roles.indexOf('member') != -1) {
      $scope.isMember = true;
    }
  }
})();
