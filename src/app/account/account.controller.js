(function() {
  'use strict';

  angular
    .module('membership')
    .controller('AccountController', AccountController);

  /** @ngInject */
  function AccountController($scope, $http, auth, membershipApi, store, $state) {
    console.log(auth)

    $scope.roles = [];
    $scope.showSignupPrompt = false;
    $scope.subscriptionStatus = 'Unpaid';

    if(auth && auth.isAuthenticated && auth.profile && auth.profile.roles) {
      $scope.roles = auth.profile.roles;
    }

    if($scope.roles.indexOf('member') == -1) {
      $scope.showSignupPrompt = true;
    }

    if($scope.roles.indexOf('payment_pending') != -1) {
      $scope.subscriptionStatus = 'Payment Pending';
    }

    if($scope.roles.indexOf('paid') != -1) {
      $scope.subscriptionStatus = 'Paid';
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
        $scope.signupDateString = moment(response.data.data.signup_date).format("dddd, MMMM Do YYYY, h:mm:ss a");
      }
    });

    $scope.logout = function(){
      store.remove('token')
      store.remove('profile')
      auth.signout();
      $state.go('main')
    }


  }
})();
