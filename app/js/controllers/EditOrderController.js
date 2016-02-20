'use strict';

pizzaApp.controller('EditOrderController', 
  function EditOrderController($scope, orderData, $routeParams, $timeout, $log){
    $scope.savedMessage = false;
    var savedMessageTO;
    
    orderData.getOrder($routeParams.id, function(order){
      $scope.order = order;
      $scope.user.id = $scope.user._id; // handle mongoDB auto id
      console.log('in getOrder');
    });
    $scope.updateOrder = function(order, newOrderForm){
      console.log('in updateOrder');
      //$log.debug("items : " + order.items + "vendor : " + order.vendor + "newOrderForm : " + newOrderForm );
      orderData.save(order)
        .$promise
        .then(function(response) { $log.debug('success', response); flashSavedMessage(); })
        .catch(function(response) { $log.error('failure', response)});
    }
    function flashSavedMessage(){
      $scope.savedMessage = true;
      savedMessageTO = $timeout(function(){
        $scope.savedMessage = false;
      }, 2000);
    }
    $scope.addItem = function(items){
      orderData.addItem(items);
      console.log('in addItem');
    }
    $scope.removeItem = function(items, item, index){
      orderData.removeItem(items, item, index);
    };
});