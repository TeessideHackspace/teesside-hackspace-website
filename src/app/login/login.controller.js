(function() {
  'use strict';

  angular
    .module('membership')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope, $http, auth, store, $location) {
    auth.signin({
      authParams: {
        scope: 'openid name email roles' // Specify the scopes you want to retrieve
      }
    }, function (profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/');
    }, function (err) {
      $location.path('/login');
      //window.location.replace("/");
      //console.log(err)
    });
  }
})();
