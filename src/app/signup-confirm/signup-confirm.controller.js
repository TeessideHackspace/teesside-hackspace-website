(function() {
  'use strict';

  angular
    .module('membership')
    .controller('SignupConfirmController', SignupConfirmController);

  /** @ngInject */
  function SignupConfirmController($scope, $http, $stateParams, membershipApi) {

    $http({
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('id_token')
      },
      url: membershipApi.base + 'gocardless_confirm',
      data: {data: getQueryParams()}
    }).then(function(){
      $scope.message = 'You have successfully set up your Direct Debit membership subscription.'
    }, function(){
      $scope.message = 'There was error confirming your Direct Debit membership subscription. You should not be charged.'
    });


    function getQueryParams(str) {
      return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
    }
  }
})();
