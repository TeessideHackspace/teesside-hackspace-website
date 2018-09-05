(function() {
  'use strict';

  angular
    .module('membership')
    .controller('SignupController', SignupController);

  /** @ngInject */
  function SignupController($scope, $http, store, membershipApi) {
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


    $scope.details = {
      user: {
        first_name: '',
        last_name: '',
        billing_address1: '',
        billing_address2: '',
        billing_town: '',
        billing_postcode: ''
      },
      emergency_contact: {
        first_name: '',
        last_name: '',
        phone: ''
      },
      subscription: {
        amount: 15,
        interval: 'month'
      }
    }

    $scope.signup = function() {
      $http({
        method: 'POST',
        url: membershipApi.base + 'signup',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        },
        data: {data: $scope.details}
      }).then(function(response){
        if(response && response.data && response.data.data && response.data.data.gocardless_url) {
          var url = response.data.data.gocardless_url;
          window.location = url;
        }
      })
    }
  }
})();
