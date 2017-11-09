(function() {
  'use strict';

  angular
    .module('membership', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'mm.foundation', 'auth0', 'angular-storage', 'angular-jwt'])
    .config(function(authProvider) {
      authProvider.init({
        domain: 'teessidehackspace.eu.auth0.com',
        clientID: 'bvlZ2mo0J3FofU2nNVPmtQAsURT6Mh4O'
      });
    })
    .run(function($rootScope, auth, store, jwtHelper, $location, $injector) {
      auth.hookEvents();

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
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

        if (!auth.config.initialized) {
          return;
        }
        if (toState.data && toState.data.requiresLogin) {
          if (!auth.isAuthenticated && !auth.refreshTokenPromise) {
            event.preventDefault();
            $rootScope.fromState = toState;
            $rootScope.fromParams = toParams;
            $injector.get('$state').go('login');
          }
        }

      });
    });

})();
