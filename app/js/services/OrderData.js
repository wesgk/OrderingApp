'use strict';

pizzaApp.factory('orderData', function($resource, $http, $log){
  var resource = $resource('/mongo/order/:id', {id:'@id'}, {"getAll": {method:"GET", isArray:true, params: {something: "foo"}}} );
  
  var masterItem = {
    id: 1,
    amount: '',
    style: '',
    size: ''
  };

  var masterOrder = { // default blank 
    vendor: '',
    customerId: 0,
    items: [
    {
      id: 1,
      amount: '',
      style: '',
      size: ''
    }
    ]
  };

  var order = masterOrder;

  var addItem = function(items){
    var newId = items.length + 1;
    var newItem = {};
    angular.copy(masterItem, newItem);
    newItem.id = newId;
    items.push(newItem);
  }

  var removeItem = function(items, item, index){
    var index = item.id ? (item.id - 1) : index;
    if(index >= 0){
      items.splice(index, 1); // remove item
      var id = 1;
      for(var key in items){ // re-index ids
        items[key].id = id;
        id++;
      }
    }
  }

  var reset = function(){
    $log.debug('in ctrl reset');
    order.vendor = '';
    angular.copy([masterItem], order.items);
  }

  var getOrder = function(orderId, successcb) {
    $log.debug('in getORder getting: '+ orderId);
    $http({method:'GET', url: '/mongo/order/'+orderId}).
      success(function(data, status, headers, config){
        successcb(data); 
      }).
      error(function(data, status, headers, config){
        $log.warn(data, status, headers(), config);
      });
  }

  var getNextId = function(successcb){
    $http({method: 'GET', url: '/data/order/new'}).
      success(function(data, status, headers, config){
        $log.debug("success: " + data);
        successcb(data);
      }).
      error(function(data, status, headers, config){
        $log.warn(data, status, headers, config);
      });
  }

  var processOrder = function(){
    
  }

  return {
      order: order,
      getOrder: getOrder,
      save: function(order){
        return resource.save(order);
      },
      update: function(order){
        return resource.save(order);
      },
      getAllOrders: function(){
        return resource.query(); // like get but expects an array back
      },
      getNextId: getNextId,
      reset: reset,
      addItem: addItem,
      removeItem: removeItem
  };
});