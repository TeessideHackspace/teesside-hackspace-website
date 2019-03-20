// app/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('membership')
    .service('authService', authService);

  authService.$inject = ['$state', 'angularAuth0', '$timeout', '$q', '$rootScope'];

  function authService($state, angularAuth0, $timeout, $q) {

    function handleAuthentication() {
      angularAuth0.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          setSession(authResult);
          $state.go('main', {}, {reload: true});
        } else if (err) {
          $timeout(function() {
            $state.go('main', {}, {reload: true});
          });
          console.log(err);
        }
      });
    }

    function setSession(authResult) {
      // Set the time that the Access Token will expire at
      var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }

    function login(redirect) {
      angularAuth0.authorize({
        responseType: 'token id_token'
      });
    }

    function logout() {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
    }

    function isAuthenticated() {
      // Check whether the current time is past the
      // Access Token's expiry time
      var expiresAt = localStorage.getItem('expires_at');
      if(!expiresAt) {
        return false;
      }
      expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    function renewTokens() {
      angularAuth0.checkSession({
          responseType: 'token id_token'
        },
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            setSession(result);
          }
        }
      );
    }

    return {
      // ...
      handleAuthentication: handleAuthentication,
      login: login,
      logout: logout,
      isAuthenticated: isAuthenticated,
      renewTokens: renewTokens
    }
  }
})();
