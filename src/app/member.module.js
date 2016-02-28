(function() {
  'use strict';

  angular
    .module('membership', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'mm.foundation', 'auth0', 'angular-storage', 'angular-jwt'])
    .config(function(authProvider) {
      authProvider.init({
        domain: 'teessidehackspace.eu.auth0.com',
        clientID: 'a2TPwlfe3SUYzIJ7YQcuDpx1nA1tzQPY',
        loginState: 'login'
      });
    })
    .run(function($rootScope, auth, store, jwtHelper, $location) {
      auth.hookEvents();

      $rootScope.$on('$stateChangeStart', function() {
        var token = store.get('token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            if (!auth.isAuthenticated) {
              auth.authenticate(store.get('profile'), token);
            }
          } else {
            // Either show the login page or use the refresh token to get a new idToken
            $location.path('/');
          }
        }
      });
    });

})();
