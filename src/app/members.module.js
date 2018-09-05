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
    .run(function ($rootScope, authService, store, jwtHelper, $location, $injector, $window, $state) {
      authService.handleAuthentication();

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
        if (toState.data && toState.data.requiresLogin && !authService.isAuthenticated()) {
          event.preventDefault();
          authService.login($window.location.origin + $window.location.pathname);
        }
      });
    });

})();
