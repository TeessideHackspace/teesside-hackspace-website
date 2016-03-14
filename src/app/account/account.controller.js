(function() {
  'use strict';

  angular
    .module('membership')
    .controller('AccountController', AccountController);

  /** @ngInject */
  function AccountController($scope, $http, auth, membershipApi, store) {
    console.log(auth)

    $scope.roles = [];
    $scope.showSignupPrompt = false;
    $scope.subscriptionStatus = 'unpaid';

    if(auth && auth.isAuthenticated && auth.profile && auth.profile.roles) {
      $scope.roles = auth.profile.roles;
    }

    if($scope.roles.indexOf('member') == -1) {
      $scope.showSignupPrompt = true;
    }

    if($scope.roles.indexOf('payment_pending') == -1) {
      $scope.subscriptionStatus = 'payment_pending';
    }

    if($scope.roles.indexOf('paid') == -1) {
      $scope.subscriptionStatus = 'paid';
    }

    $http({
      method: 'GET',
      url: membershipApi.base + 'account',
      headers: {
        Authorization: 'Bearer ' + store.get('token')
      }
    }).then(function(response){
      console.log(response)
      if(response && response.data && response.data.data) {
        $scope.accountDetails = response.data.data;
      }
    });


  }
})();
