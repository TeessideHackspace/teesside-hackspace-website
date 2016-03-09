(function() {
  'use strict';

  angular
    .module('membership')
    .controller('SignupConfirmController', SignupConfirmController);

  /** @ngInject */
  function SignupConfirmController($scope, $http, $stateParams, membershipApi) {

    $http({
      method: 'POST',
      url: membershipApi.base + 'gocardless_confirm',
      data: {data: $stateParams}
    }).then(function(response){
      $scope.message = 'You have successfully set up your Direct Debit membership subscription.'
    }, function(response){
      $scope.message = 'There was error confirming your Direct Debit membership subscription. You should not be charged.'
    });
  }
})();
