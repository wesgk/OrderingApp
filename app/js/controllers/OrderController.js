"use strict";

pizzaApp.controller('OrderController',
  function OrderController($scope, orderData, $log, $timeout){
    $scope.order = {
      vendor: '',
      customerId: 0,
      items: [
        {
          id: 1,
          type: '',
          size: ''
        }
      ]
    };

    $scope.master = { // default blank 
      vendor: '',
      customerId: 0,
      items: [
        {
          id: 1,
          type: '',
          size: ''
        }
      ]
    };

    $scope.reset = function(){
      $scope.order = angular.copy($scope.master);
    }

    $scope.allOrders = function(){
       orderData.getAllOrders().
        $promise
        .then(function(response){ console.log('success', response)})
        .catch(function(response) { console.log('failure', response)});
    }

    $scope.saveOrder = function(order, newOrderForm){
      
      var customerId;
      orderData.getNextId(function(newId){
        order.id  = newId[0];
        $log.info('order.id: '+ order.id);
        if(newOrderForm.$valid){
        orderData.save(order)
          .$promise
          .then(function(response) { console.log('success', response); $scope.id = order.id; })
          .catch(function(response) { console.log('failure', response)});
        }
      });
    };

    $scope.updateOrder = function(order, newOrderForm){
      $log.info("items : " + order.items);
      $log.info("vendor : " + order.vendor);
      $log.info("newOrderForm : " + newOrderForm);
      var customerId;
      order.id = 9999; // default file name
      orderData.getNextId(function(newId){
        order.id  = newId[0];
        $log.info('order.id: '+ order.id);
        if(newOrderForm.$valid){
        orderData.save(order)
          .$promise
          .then(function(response) {console.log('success', response)})
          .catch(function(response) { console.log('failure', response)});
        }
      });
    };

    var debounceUpdate = function(newVal, oldVal) {
      $log.info('old val: ' + oldVal + ' new val: ' + newVal);
      if (newVal != oldVal) {
        $log.info("id: " + $scope.id);
        if($scope.id){
          $log.info('id exists');
          $scope.updateOrder($scope.order, newOrderForm);
        }else{
          $log.info('no id exists');
          $scope.saveOrder($scope.order, newOrderForm);
        }
      }
    };

    $scope.$watch('order.vendor', debounceUpdate);
    $scope.$watch('order.items.length', debounceUpdate);

    $scope.addItem = function(item){
      var items = $scope.order.items;
      var newId = items.length + 1;
      items.push(
        {
          id: newId,
          type: '',
          size: ''
        }
      );
    }
    
    $scope.removeItem = function(item){
      var items = $scope.order.items;
      var index = item.id - 1;
      if(index >= 0){
        items.splice(index, 1); // remove item
        var id = 1;
        for(var key in items){ // resequence ids
          items[key].id = id;
          id++;
        }
      }
    };
});
