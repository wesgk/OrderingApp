"use strict";

pizzaApp.controller('OrderController',
  function OrderController($scope, orderData, $log, $timeout){
    $scope.order = orderData.order;
    $scope.savedMessage = false;
    var savedMessageTO;
    $scope.reset = function(){
      orderData.reset();
    }
    $scope.allOrders = function(){
       orderData.getAllOrders().
        $promise
        .then(function(response){ $log.debug('success', response)})
        .catch(function(response){ $log.error('failure', response)});
    }
    $scope.saveOrder = function(order, newOrderForm){
      orderData.getNextId(function(newId){
        order.id  = newId[0];
        $log.debug('order.id: '+ order.id);
        if(newOrderForm.$valid){
        orderData.save(order)
          .$promise
          .then(function(response){ $log.debug('success', response); flashSavedMessage(); })
          .catch(function(response){ $log.error('failure', response)});
        }
      });
    };
    $scope.updateOrder = function(order, newOrderForm){
      $log.debug("items : " + order.items + "vendor : " + order.vendor + "newOrderForm : " + newOrderForm );
      var customerId;
      $log.debug('order.id: '+ order.id);
      if(newOrderForm.$valid){
        orderData.save(order)
          .$promise
          .then(function(response){ $log.debug('success', response); flashSavedMessage(); })
          .catch(function(response){ $log.error('failure', response)});
      }
    };
    function flashSavedMessage(){
      $scope.savedMessage = true;
      savedMessageTO = $timeout(function(){
        $scope.savedMessage = false;
      }, 2000);
    }
    $scope.addItem = function(order){
      orderData.addItem(order);
    }
    $scope.removeItem = function(order, item, index){
      orderData.removeItem(order, item);
    };
});
