'use strict';

pizzaApp.factory('userData', function($resource, $http, provinces, $log){
  var resource = $resource('/data/user/:id', {id:'@id'}, {"getAll": {method:"GET", isArray:true, params: {something: "foo"}}} );
  
  var masterAddress = {
    id: '0',
    buildingNumber: '',
    apartmentNumber: '',
    streetName: '',
    city: '',
    country: '',
    province: '',
    postalCode: '',
    specialInstructions: ''
  };

  var masterUser = { // default blank 
    fname: '',
    lname: '',
    email: '',
    telephone: '',
    paypalNumber: 0,
    addresses: [
    {
      id: '0',
      buildingNumber: '',
      apartmentNumber: '',
      streetName: '',
      city: '',
      country: 'USA',
      province: '',
      postalCode: '',
      latLong: '',
      specialInstructions: ''
    }
    ],
    defaultAddress: ''
  };

  var user = { // default blank 
    fname: '',
    lname: '',
    email: '',
    telephone: '',
    paypalNumber: 0,
    addresses: [
    {
      id: '0',
      buildingNumber: '',
      apartmentNumber: '',
      streetName: '',
      city: '',
      country: 'USA',
      province: '',
      postalCode: '',
      latLong: '',
      specialInstructions: ''
    }
    ],
    defaultAddress: ''
  };

  // see bottom of the file for list of provinces/states

  var getProvincePos = function(abbr){
    for(var i = 0; i < provinces.length; i++){
      if(provinces[i].abbreviation === abbr) return i;
    }
    return;
  }

  var addAddress = function(addresses){
    $log.debug('in addAddress service');
    var newId = addresses.length + 1;
    var newAddress = {};
    angular.copy(masterAddress, newAddress);
    newAddress.id = newId;
    addresses.push(newAddress);
  }

  var removeAddress = function(addresses, address, index){
    var index = address.id ? (address.id - 1) : index;
    if(index >= 0){
      addresses.splice(index, 1); // remove item
      var id = 1;
      for(var key in addresses){ // re-index ids
        addresses[key].id = id;
        id++;
      }
    }
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
      user: user,
      getUser: getUser,
      save: function(user){
        return resource.save(user);
      },
      update: function(user){
        return resource.save(user);
      },
      getAllUsers: function(){
        return resource.query(); // like get but expects an array back
      },
      getNextId: getNextId,
      reset: reset,
      addAddress: addAddress,
      removeAddress: removeAddress,
      provinces: provinces,
      getProvincePos: getProvincePos
  };
});