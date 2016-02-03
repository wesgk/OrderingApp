'use strict';

pizzaApp.controller("EditStoreController", 
  function EditStoreController($scope, $routeParams, storeData, $log){

    $scope.store;

    var onStoreComplete = function(data) {
      $scope.store = data;
    };

    storeData.getInfo($routeParams.id).then(onStoreComplete, onError);

    var onError = function(reason) {
      $scope.error = "Could not fetch the data.";
    };

});