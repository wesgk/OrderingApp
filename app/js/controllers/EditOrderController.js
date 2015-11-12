'use strict';

pizzaApp.controller('EditOrderController', 
  function EditOrderController($scope, orderData, $routeParams, $timeout, $log){

    $log.info("loaded EditOrderController");

    $scope.savedMessage = false;
    var savedMessageTO;

    orderData.getOrder($routeParams.id, function(order){
      $scope.order = order;
      $log.info('order : ' + order);
    });

    function updateOrder(order, newOrderForm){
      $log.info("updateOrder:items : " + order.items);
      $log.info("updateOrder:vendor : " + order.vendor);
      $log.info("updateOrder:newOrderForm : " + newOrderForm);
      
      // if(newOrderForm.$valid){
      orderData.save(order)
        .$promise
        .then(function(response) {console.log('success', response); flashSavedMessage(); })
        .catch(function(response) { console.log('failure', response)});
      // }
      
    };

    var debounceUpdate = function(newVal, oldVal, scope) {
      $log.info('old val: ' + oldVal + ' new val: ' + newVal);
      if (newVal != oldVal) {
        $log.info("id: " + scope.order.id);
        if(scope.order.id){
          $log.info('id exists');
          updateOrder(scope.order, newOrderForm);
        }else{
          $log.info('no id exists');
        }
      }
    };

    var watchTO = $timeout(function(){
      $scope.$watch('order.vendor', debounceUpdate);
      $scope.$watch('order.items', debounceUpdate, true);
    }, 1000);

    function flashSavedMessage(){
      $log.warn('in flashSavedMessage');
      $scope.savedMessage = true;
      savedMessageTO = $timeout(function(){
        $scope.savedMessage = false;
      }, 2000);
    }
    
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