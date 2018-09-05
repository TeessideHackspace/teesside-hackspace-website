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
    }).state('changeSubscription', {
      url: '/changeSubscription',
      controller: 'ChangeSubscriptionController',
      templateUrl: 'app/changeSubscription/changeSubscription.html'
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
    }).state('stats', {
      url: '/stats',
      templateUrl: 'app/stats/stats.html',
      controller: 'StatsController',
      data: {
        requiresLogin: true
      }
    });

    $urlRouterProvider.otherwise('/');
  }

})();
