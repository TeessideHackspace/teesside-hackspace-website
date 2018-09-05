(function () {
  'use strict';

  angular
    .module('stats', ['core', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'mm.foundation', "googlechart"])
    .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
      url: '/',
      templateUrl: 'app/stats/stats.html',
      controller: 'StatsController'
    });

    $urlRouterProvider.otherwise('/');
  });

})();
