'use strict';

pizzaApp.controller('EditOrderController', 
  function EditOrderController($scope, orderData, $routeParams, $timeout, $log){
    $scope.savedMessage = false;
    var savedMessageTO;
    
    orderData.getOrder($routeParams.id, function(order){
        //return order;
        $scope.order = order;
    });
    
    function updateOrder(order, newOrderForm){
      $log.debug("items : " + order.items + "vendor : " + order.vendor + "newOrderForm : " + newOrderForm );
      orderData.save(order)
        .$promise
        .then(function(response) { $log.debug('success', response); flashSavedMessage(); })
        .catch(function(response) { $log.error('failure', response)});
    };
    function processOrder(order){

    };
    function flashSavedMessage(){
      $scope.savedMessage = true;
      savedMessageTO = $timeout(function(){
        $scope.savedMessage = false;
      }, 2000);
    }
    $scope.addItem = function(items){
      orderData.addItem(items);
    }
    $scope.removeItem = function(items, item, index){
      orderData.removeItem(items, item, index);
    };
});