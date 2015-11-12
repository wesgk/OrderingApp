'use strict';

pizzaApp.factory('orderData', function($resource, $http, $log){
  var resource = $resource('/data/order/:id', {id:'@id'}, {"getAll": {method:"GET", isArray:true, params: {something: "foo"}}} );
  return {
      getOrder: function(orderId, successcb) {
        $log.info('in getORder getting: '+ orderId);
        $http({method:'GET', url: '/data/order/'+orderId}).
          success(function(data, status, headers, config){
            successcb(data); 
          }).
          error(function(data, status, headers, config){
            $log.warn(data, status, headers(), config);
          });
      },
      save: function(order){
        return resource.save(order);
      },
      getAllOrders: function(){
        return resource.query(); // like get but expects an array back
        //return resource.get();
      },
      getNextId: function(successcb){
        $http({method: 'GET', url: '/data/order/new'}).
          success(function(data, status, headers, config){
            $log.info("success: " + data);
            successcb(data);
          }).
          error(function(data, status, headers, config){
            $log.warn(data, status, headers, config);
          });

      }
  };
});