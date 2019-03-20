(function() {
  'use strict';

  angular
    .module('membership')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, $state, authService, membershipApi) {
    $scope.noAccount = false;

    if(authService && authService.isAuthenticated()) {
      $http({
        method: 'GET',
        url: membershipApi.base + 'account',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        }
      }).then(function(response){
        if(response.data && response.data.user) {
          $state.go('account');
        } else {
          $scope.noAccount = true;
        }
      });
    }

    $scope.auth = authService;
  }
})();
