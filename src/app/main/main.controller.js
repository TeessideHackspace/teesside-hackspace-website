(function() {
  'use strict';

  angular
    .module('membership')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, auth) {
    $scope.isMember = false;
    $scope.hasAccount = false;

    if(auth && auth.isAuthenticated && auth.profile && auth.profile.roles && auth.profile.roles.indexOf('member') != -1) {
      $scope.isMember = true;
    }
    if(auth && auth.isAuthenticated) {
      $scope.hasAccount = true;
    }
  }
})();
