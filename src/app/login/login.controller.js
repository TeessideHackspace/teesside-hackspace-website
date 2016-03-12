(function() {
  'use strict';

  angular
    .module('membership')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope, $http, auth, store, $location, $state) {


    $scope.showLogin = function(){
      auth.signin({
        authParams: {
          scope: 'openid name email roles' // Specify the scopes you want to retrieve
        }
      }, function (profile, token) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        if($scope.fromState) {
          $state.go($scope.fromState, $scope.fromParams);
        }else {
          $state.go('main');
        }

      });

    }

    $scope.showLogin();
  }
})();
