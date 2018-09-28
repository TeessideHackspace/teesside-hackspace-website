(function() {
  'use strict';

  var env = 'prod';
  if(document.location.search.indexOf("env=dev") !== -1) {
    env = 'dev';
  }

  angular
    .module('core', [])
    .constant('membershipApi', {
      base: 'https://7guej081l3.execute-api.eu-west-1.amazonaws.com/'+env+'/'
    })
    .constant('moment', window.moment);

})();
