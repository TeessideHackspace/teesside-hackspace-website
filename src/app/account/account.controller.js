(function() {
  'use strict';

  angular
    .module('membership')
    .controller('AccountController', AccountController);

  /** @ngInject */
  function AccountController($scope, $http, authService, membershipApi, store, $state) {

    $scope.roles = [];
    $scope.isMember = true;
    $scope.subscriptionStatus = 'Active';

    $http({
      method: 'GET',
      url: membershipApi.base + 'account',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('id_token')
      }
    }).then(function(response){
      console.log(response)
      if(response && response.data && response.data) {
        $scope.accountDetails = response.data;
        $scope.signupDateString = moment(response.data.user.signup_date).format("dddd, MMMM Do YYYY, h:mm:ss a");

        $scope.roles = $scope.accountDetails.user.roles;

        if($scope.roles.indexOf('member') == -1) {
          $scope.isMember = false;
          $scope.subscriptionStatus = 'Inactive';
        }
      }
    });

    $scope.logout = function(){
      authService.logout();
      $state.go('main')
    }


  }
})();
