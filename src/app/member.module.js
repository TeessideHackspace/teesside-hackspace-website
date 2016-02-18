(function() {
  'use strict';

  angular
    .module('membership', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'mm.foundation', 'auth0', 'angular-storage', 'angular-jwt'])
    .config(function(authProvider) {
      authProvider.init({
        domain: 'teessidehackspace.eu.auth0.com',
        clientID: 'a2TPwlfe3SUYzIJ7YQcuDpx1nA1tzQPY',
        loginUrl: '/login'
      });
    })
    .run(function(auth) {
      auth.hookEvents();
    });

})();
