'use strict';

pizzaApp.directive('confirmDelete', function() {
    return {
      replace: true,
      templateUrl: 'templates/Utilities/deleteConfirmation.html',
      scope: {
        onConfirm: '&'
      },
      controller: function($scope) {
        $scope.isDeleting = false;
        $scope.startDelete = function() {
          return $scope.isDeleting = true;
        };
        $scope.cancel = function() {
          return $scope.isDeleting = false;
        };
        return $scope.confirm = function() {
          return $scope.onConfirm();
        };
      }
    };
  })