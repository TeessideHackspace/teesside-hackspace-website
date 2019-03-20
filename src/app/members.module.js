(function () {
  'use strict';

  angular
    .module('membership', ['core', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'mm.foundation', 'auth0.auth0', 'angular-storage', 'angular-jwt'])
    .config(function (angularAuth0Provider, $windowProvider) {
      var $window = $windowProvider.$get();
      angularAuth0Provider.init({
        domain: 'teessidehackspace.eu.auth0.com',
        clientID: 'bvlZ2mo0J3FofU2nNVPmtQAsURT6Mh4O',
        redirectUri: $window.location.origin + $window.location.pathname
      });
    })
    .run(function ($rootScope, authService, store, jwtHelper, $location, $injector, $window) {
      if(authService.isAuthenticated()) {
        authService.renewTokens();
      } else {
        authService.handleAuthentication();
      }
      /*$rootScope.$on('$stateChangeStart', function (event, toState) {
        if(authService.authInProgress()) {
          event.preventDefault();
        } else if (toState.data && toState.data.requiresLogin && !authService.isAuthenticated()) {
          event.preventDefault();
          authService.login($window.location.origin + $window.location.pathname);
        }
      });*/
    });

})();
