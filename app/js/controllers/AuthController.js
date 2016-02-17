'use strict';

//this is used to parse the profile
function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}

pizzaApp.controller('AuthController', function ($scope, $routeParams, $rootScope, authLogout, $http, $location, $window) {
  $scope.user = {username: 'john.doe', password: 'foobar'};
  $scope.message = '';

  // test for logout flag
  var logout = $routeParams.logout;
  if(logout){
    authLogout.logout($scope, $rootScope);
    $location.path('/login');
  }

  $scope.submit = function () {
    $http
      .post('/authenticate', $scope.user)
      .success(function (data, status, headers, config) {

      $window.sessionStorage.token = data.token;
        $scope.isAuthenticated = true;
        $rootScope.isAuthenticated = true;
        var encodedProfile = data.token.split('.')[1];
        var profile = JSON.parse(url_base64_decode(encodedProfile));
        $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
        $scope.error = ''; // clear existing error messages
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        // delete $window.sessionStorage.token;
        authLogout.logout($scope, $rootScope);
        $scope.isAuthenticated = false;
        $rootScope.isAuthenticated = false;

        // Handle login errors here
        $scope.error = 'Error: Invalid user or password';
        // $scope.welcome = '';
      });
  };



  $scope.callRestricted = function () {
    $http({url: '/api/restricted', method: 'GET'})
    .success(function (data, status, headers, config) {
      $scope.message = $scope.message + ' ' + data.name; // Should log 'foo'
    })
    .error(function (data, status, headers, config) {
      alert(data);
    });
  };

});

