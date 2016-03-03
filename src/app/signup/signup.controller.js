(function() {
  'use strict';

  angular
    .module('membership')
    .controller('SignupController', SignupController);

  /** @ngInject */
  function SignupController($scope, $http, auth, store) {
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
        url: 'https://vill7dylal.execute-api.eu-west-1.amazonaws.com/dev/signup',
        headers: {
          Authorization: 'Bearer ' + store.get('token')
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
