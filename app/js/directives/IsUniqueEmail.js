'use strict';

pizzaApp.directive('isUnique', function(userMongo, $timeout){

  var initializing = true; // supress initial $watch call/error on blank fields

  return {
     restrict: 'A',
     require: 'ngModel',
     link: function (scope, element, attrs, ngModel) {
        ngModel.$validators.required = function(modelValue) {
              //true or false based on required validation
        };

        ngModel.$validators.customdir= function(modelValue) {
              //true or false based on custome dir validation
        };
     }
  };
});