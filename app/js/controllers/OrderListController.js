'use strict';

pizzaApp.controller("OrderListController", 
  function OrderListController($scope, orderData, $log){
    var getAllOrders = orderData.getAllOrders().
      $promise
      .then(function(response){ $log.debug('success', response); $scope.orders = response; })
      .catch(function(response) { $log.error('failure', response)});
});