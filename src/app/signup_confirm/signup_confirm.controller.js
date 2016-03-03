(function() {
  'use strict';

  angular
    .module('membership')
    .controller('SignupConfirmController', SignupConfirmController);

  /** @ngInject */
  function SignupConfirmController($scope, $location, $http, $window, store) {
    $scope.status = 'pending';

    $http({
      method: 'GET',
      url: 'https://vill7dylal.execute-api.eu-west-1.amazonaws.com/dev/gocardless_confirm'+$window.location.search,
    }).then(function(response){
      $scope.status = 'success';
    }, function(response){
      $scope.status = 'failed';
    })

  }
})();
