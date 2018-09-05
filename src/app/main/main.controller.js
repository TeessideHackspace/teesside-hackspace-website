(function() {
  'use strict';

  angular
    .module('membership')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, authService) {
    $scope.isMember = false;
    $scope.hasAccount = false;
    $scope.loggedIn = false;

    if(authService && authService.isAuthenticated()) {
      $scope.loggedIn = true;
    }
    if(authService && authService.isAuthenticated() && authService.profile && authService.profile.roles && authService.profile.roles.indexOf('member') != -1) {
      $scope.isMember = true;
    }
    if(authService && authService.isAuthenticated()) {
      $scope.hasAccount = true;
    }

    $scope.auth = authService;
  }
})();
