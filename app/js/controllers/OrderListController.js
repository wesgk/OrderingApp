'use strict';

pizzaApp.controller("OrderListController", 
  function OrderListController($scope, orderData){
    
    $scope.orders = orderData.getAllOrders();

    /*var getAllOrders = orderData.getAllOrders().
        $promise.
        then(function(response){ //$log.debug('success', response); 
          $scope.orders = response; 
        }).
        catch(function(response) { 
          //$log.error('failure', response); 
          $scope.orders = 'error'; 
        });
    */
    // var getAllOrders = orderData.getAllOrders();
    //     getAllOrders.$promise.
    //     then(function(response){ /*$log.debug('success', response);*/ $scope.orders = response; return getAllOrders; }).
    //     catch(function(response) { /*$log.error('failure', response);*/ $scope.orders = 'error'; });


  });