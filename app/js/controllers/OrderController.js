"use strict";

pizzaApp.controller('OrderController',
  function OrderController($scope, orderData, twilioSms, googlePlaces, $rootScope, $location, $log, $timeout){
    $scope.order = orderData.order;
    $scope.savedMessage = false;
    $scope.reviewFields = false;
    var savedMessageTO;
    
    if(!$rootScope.isAuthenticated){
      $location.path('/login');
    }

    $scope.reset = function(){
      orderData.reset();
    }
    $scope.allOrders = function(){
       orderData.getAllOrders().
        $promise
        .then(function(response){ $log.debug('success', response)})
        .catch(function(response){ $log.error('failure', response)});
    }
    $scope.reviewOrder = function(order, newOrderForm){
      $scope.reviewFields = true;
    };
    $scope.editOrder = function(order, newOrderForm){
      $scope.reviewFields = false;
    };
    $scope.saveOrder = function(order, newOrderForm){
      if(newOrderForm.$valid){
        orderData.save(order)
          .$promise
          .then(function(response){ 
            $log.debug('success', response); 
            sendSmsMessage(order);
          })
          .catch(function(response){ $log.error('failure', response)});
        }
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
    function sendSmsMessage(order){
      twilioSms.sendMessage('16046186619', '16042392881', 'test message monkey').then(function(response){
        flashSavedMessage(); 
        console.log('twilioSms.sendMessage Response: ' + response);
      });
    }
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
    // POPULATE DROPDOWN WITH LIST OF VENDORS
    $scope.getVendorList = function(){
      var userLocation = googlePlaces.getUserLocation({ returnLatLng: true }, function(locationInfo){
        var stores = googlePlaces.getStores({ lat: locationInfo.lat, lng: locationInfo.lng, radius: 500 }).then( function(response){ 
          var dropdownList = [];
          for(var obj in response.results){ 
            var rec = response.results[obj];
            var contentString = googlePlaces.getContentString(rec);
            var id = googlePlaces.getId(rec);
            var name = googlePlaces.getName(rec);
            var open = googlePlaces.getOpen(rec);
            var delivery = googlePlaces.getDelivery(rec);
            var address = googlePlaces.getAddress(rec);
            dropdownList.push( { id: id, value: contentString.replace(/<br>/g,' ') } );
          }
          $scope.vendorList = dropdownList;
        });
      });
    };
    $scope.getVendorList();
});
