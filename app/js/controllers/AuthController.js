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
  $scope.user = {username: '', password: ''};
  $scope.message = '';

  // test for logout flag
  var logout = $routeParams.logout;
  if(logout){
    authLogout.logout($scope, $rootScope);
    $location.path('/login');
  }

  var authenticate = function(){
    $http
      .post('/authenticate', $scope.user)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $scope.isAuthenticated = true;
        $rootScope.isAuthenticated = true;
        var encodedProfile = data.token.split('.')[1];
        var profile = JSON.parse(url_base64_decode(encodedProfile));
        $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name + ' @ ' + profile.telephone;
        $rootScope.authenticatedId = profile.id;
        $rootScope.isAdmin = (profile.userType === 1 ? true : false ); 
        $rootScope.fname = profile.first_name;
        $rootScope.lname = profile.last_name;
        $rootScope.telephone = profile.telephone;
        $rootScope.authUser = profile;
        $scope.error = ''; // clear existing error messages
        console.dir(profile);
        $location.path('/order');
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        // delete $window.sessionStorage.token;
        authLogout.logout($scope, $rootScope);
        $scope.isAuthenticated = false;
        $rootScope.isAuthenticated = false;
        $rootScope.isAdmin = false;
        // Handle login errors here
        $scope.welcome = '';
        $scope.id = '';
        $scope.error = 'Error: Invalid user or password';
      });
  }

  $scope.submit = function () {
    authenticate();
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

