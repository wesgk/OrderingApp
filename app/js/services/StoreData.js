'use strict';

pizzaApp.factory('storeData', function($resource, $http, $log){
  
  var resource = $resource('/data/vendor/stores', {id:'@id'}, {"getAll": {method:"GET", isArray:true, params: {something: "foo"}}} );
  
  var getAllStores = function(){
    return $http.get("/data/vendor/stores/dominos")
          .then(function(response){
             return response.data; 
          });
  }

  var getInfo = function(storeId, successcb) {
    return $http.get("/data/vendor/stores/dominos/" + storeId)
        .then(function(response){
           return response.data; 
        });
  }

  var reset = function(userId, successcb){
    if(userId){
      getUser(userId, function(data){
        successcb(data);
      });
    }else{
      angular.copy(masterUser, user);
    }
  }

  var getUser = function(userId, successcb) {
    $log.debug('in getUser getting: '+ userId);
    $http({method:'GET', url: '/data/user/'+userId}).
      success(function(data, status, headers, config){
        successcb(data); 
      }).
      error(function(data, status, headers, config){
        $log.warn(data, status, headers(), config);
      });
  }

  var getNextId = function(successcb){
    $http({method: 'GET', url: '/data/user/new'}).
      success(function(data, status, headers, config){
        $log.debug("success: " + data);
        successcb(data);
      }).
      error(function(data, status, headers, config){
        $log.warn(data, status, headers, config);
      });
  }

  return {
      /*user: user,
      getUser: getUser,
      save: function(user){
        return resource.save(user);
      },
      update: function(user){
        return resource.save(user);
      },*/
      getAllStores: getAllStores,
      getInfo: getInfo/*,
      getNextId: getNextId,
      reset: reset,
      addAddress: addAddress,
      removeAddress: removeAddress*/
  };
});