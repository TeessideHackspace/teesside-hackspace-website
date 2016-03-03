(function () {
  'use strict';

  angular
    .module('membership')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/signup/signup.html',
        controller: 'SignupController',
        data: {
          requiresLogin: true
        }
      })
      .state('signup_confirm', {
        url: '/signup_confirm',
        templateUrl: 'app/signup_confirm/signup_confirm.html',
        controller: 'SignupConfirmController',
        data: {
          requiresLogin: true
        }
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController'
      });

    $urlRouterProvider.otherwise('/login');
  }

})();
