'use strict';

// login
pizzaApp.factory('authLogin', function ($q, $window) {
  

  
  var logout = function ($scope, $rootScope){
    $scope.welcome = '';
    $scope.message = '';
    // $scope.isAuthenticated = false;
    $rootScope.isAuthenticated = false;
    delete $window.sessionStorage.token;
  };

  return {
    logout: logout
  };

});


// logout
pizzaApp.factory('authLogout', function ($q, $window) {
  
  var logout = function ($scope, $rootScope){
    $scope.welcome = '';
    $scope.message = '';
    // $scope.isAuthenticated = false;
    $rootScope.isAuthenticated = false;
    delete $window.sessionStorage.token;
  };

  return {
    logout: logout
  };

});

// http interceptor
pizzaApp.factory('authInterceptor', function ($q, $window) {
  
  var request = function (config){
    config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
  }

  var responseError = function (rejection) {
    if (rejection.status === 401) {
      // handle the case where the user is not authenticated
    }
    return $q.reject(rejection);
  }

  return {
    request: request,
    responseError: responseError
  };
});

pizzaApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

// 