(function() {
  'use strict';

  angular
    .module('membership')
    .controller('SignupController', SignupController);

  /** @ngInject */
  function SignupController($scope, $http) {
    $scope.details = {
      account: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      address: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        town: '',
        postcode: ''
      },
      emergencyContact: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  }
})();
