(function() {
  'use strict';

  angular
    .module('membership')
    .controller('ChangeSubscriptionController', ChangeSubscriptionController);

  /** @ngInject */
  function ChangeSubscriptionController($scope, $http, membershipApi, store, $location, $state) {
    $scope.isMember = false;
    $scope.amount = 15;

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
        $scope.amount = response.data.user.subscription_amount;
        if(response.data.user.roles.indexOf('member') !== -1) {
          $scope.isMember = true;
        }
      }
    });

    $scope.changeAmount = function(){
      $http({
        method: 'POST',
        url: membershipApi.base + 'change_amount',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        },
        data: {
          amount: $scope.amount
        }
      }).then(function(response){
        if(response && response.data && response.data.data && response.data.data.gocardless_url) {
          var url = response.data.data.gocardless_url;
          window.location = url;
        } else {
          $state.go('account')
        }
      });
    }

    $scope.cancel = function(){
      $http({
        method: 'POST',
        url: membershipApi.base + 'cancel',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        }
      }).then(function(response){
        $state.go('account')
      });
    }
  }
})();
