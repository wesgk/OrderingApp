'use strict';

pizzaApp.directive('recordAvailabilityValidator',
  ['$http', function($http) {

  return {
    require : 'ngModel',
    link : function(scope, element, attrs, ngModel) {
      var apiUrl = attrs.recordAvailabilityValidator;

      function setAsLoading(bool) {
        ngModel.$setValidity('recordLoading', !bool); 
      }

      function setAsAvailable(bool) {
        ngModel.$setValidity('recordAvailable', bool); 
      }

      ngModel.$parsers.push(function(value) {
        if(!value || value.length == 0) return;
        // append id to apiUrl if it exists
        // if passed the record from the existing user 
        // will excluded in the validation (this was setup for testing unique email address)
        // var urlQuery = '/' + value;
        var urlQuery = '/' + value + (scope.user.id ? '/id/'+scope.user.id : '');
        // var urlQuery = '/' + value; // append email to query string

        setAsLoading(true);
        setAsAvailable(false);
        
        $http.get(apiUrl + urlQuery)
          .then(function (data) {
            console.dir(data);
            setAsLoading(false);
            setAsAvailable(data.data.length === 0);
          });

        // return value;
      })
    }
  }
}]);