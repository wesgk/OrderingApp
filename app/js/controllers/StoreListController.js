'use strict';

pizzaApp.controller("StoreListController", 
  function StoreListController($scope, storeData, $log){

    $scope.stores;

    var onStoreComplete = function(data) {
      $scope.stores = data;
    };

    storeData.getAllStores().then(onStoreComplete, onError);

    var onError = function(reason) {
      $scope.error = "Could not fetch the data.";
    };


  });