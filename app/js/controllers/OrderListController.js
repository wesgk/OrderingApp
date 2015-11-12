'use strict';

pizzaApp.controller("OrderListController", 
  function OrderListController($scope, orderData){

    $scope.orders;

    var getAllOrders = orderData.getAllOrders().
        $promise
        .then(function(response){ console.log('success', response); $scope.orders = response; })
        .catch(function(response) { console.log('failure', response)});

  });