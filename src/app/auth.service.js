// app/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('membership')
    .service('authService', authService);

  authService.$inject = ['$state', 'angularAuth0', '$timeout', '$q'];

  function authService($state, angularAuth0, $timeout, $q) {

    // ...
    function handleAuthentication() {
      return $q(function(resolve, reject) {
        angularAuth0.parseHash(function(err, authResult) {
          if(err) {
            reject(err);
          } else {
            if (authResult && authResult.accessToken && authResult.idToken) {
              setSession(authResult);
            }
            resolve();
          }
        });
      })
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
        responseType: 'token',
        redirectUri: redirect
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
      var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    return {
      // ...
      handleAuthentication: handleAuthentication,
      login: login,
      logout: logout,
      isAuthenticated: isAuthenticated
    }
  }
})();
