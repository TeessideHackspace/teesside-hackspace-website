(function() {
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
      }).state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController'
    });

    $urlRouterProvider.otherwise('/login');
  }

})();
