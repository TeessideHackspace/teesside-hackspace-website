(function() {
  'use strict';

  angular
    .module('membership')
    .controller('LoginController', SignupController);

  /** @ngInject */
  function SignupController($scope, $http, auth, store, $location) {
    $scope.login = function () {
      auth.signin({}, function (profile, token) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/');
      }, function () {
        // Error callback
      });
    }
  }
})();
