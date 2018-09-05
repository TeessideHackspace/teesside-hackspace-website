(function() {
  'use strict';

  angular
    .module('membership')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, authService, membershipApi) {
    $scope.hasSignedUpBefore = false;
    $http({
      method: 'GET',
      url: membershipApi.base + 'account',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('id_token')
      }
    }).then(function(response){
      if(response.data && response.data.user) {
        $scope.hasSignedUpBefore = true;
      }
    });

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
