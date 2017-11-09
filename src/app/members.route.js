(function () {
  'use strict';

  angular
    .module('membership')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('signup', {
      url: '/signup',
      templateUrl: 'app/signup/signup.html',
      controller: 'SignupController',
      data: {
        requiresLogin: true
      }
    }).state('login', {
      url: '/login',
      controller: 'LoginController',
      templateUrl: 'app/login/login.html'
    }).state('signup-confirm', {
      url: '/signup-confirm',
      templateUrl: 'app/signup-confirm/signup-confirm.html',
      controller: 'SignupConfirmController',
      data: {
        requiresLogin: true
      }
    }).state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    }).state('account', {
      url: '/account',
      templateUrl: 'app/account/account.html',
      controller: 'AccountController',
      data: {
        requiresLogin: true
      }
    });

    $urlRouterProvider.otherwise('/');
  }

})();
