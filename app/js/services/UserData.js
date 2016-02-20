'use strict';

pizzaApp.factory('userData', function($resource, $q, $http, provinces, $log){
  var resource = $resource('/mongo/user/:id', {id:'@id'}, {"getAll": {method:"GET", isArray:true, params: {something: "foo"}}} );
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
  };

  var addAddress = function(addresses){
    $log.debug('in addAddress service');
    var newId = addresses.length + 1;
    var newAddress = {};
    angular.copy(masterAddress, newAddress);
    newAddress.id = newId;
    addresses.push(newAddress);
  };

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
  };

  var reset = function(userId, successcb){
    if(userId){
      getUser(userId, function(data){
        successcb(data);
      });
    }else{
      angular.copy(masterUser, user);
    }
  };

  var getUser = function(userId, successcb) {
    $log.debug('in getUser getting: '+ userId);
    $http({method:'GET', url: '/mongo/user/'+userId}).
      success(function(data, status, headers, config){
        successcb(data); 
      }).
      error(function(data, status, headers, config){
        $log.warn(data, status, headers(), config);
      });
  };

  var deleteUser = function(userId, successcb) {
    $log.debug('in deleteUser getting: '+ userId);
    $http({method:'DELETE', url: '/mongo/user/'+userId}).
      success(function(data, status, headers, config){
        successcb(data); 
      }).
      error(function(data, status, headers, config){
        $log.warn(data, status, headers(), config);
      });
  };

  // var getUserByEmail = function(userEmail, successcb) {
  //   $log.debug('in getUserByEmail getting: '+ userId);
  //   $http({method:'GET', url: '/mongo/userbyemail/'+userId}).
  //     success(function(data, status, headers, config){
  //       successcb(data); 
  //     }).
  //     error(function(data, status, headers, config){
  //       $log.warn(data, status, headers(), config);
  //     });
  // };

  var getNextId = function(successcb){
    $http({method: 'GET', url: '/mongo/user/new'}).
      success(function(data, status, headers, config){
        $log.debug("success: " + data);
        successcb(data);
      }).
      error(function(data, status, headers, config){
        $log.warn(data, status, headers, config);
      });
  };

  // var isUnique = function(email, id, successcb){
  //   if(email){
  //     $http.get('/mongo/user/count/email/'+email+'/id/'+id).
  //       then(function(data){
  //         console.dir(data.data);
  //         successcb(data.data.length === 0); // true if empty
  //       });
  //   }
  // };

  return {
    user: user,
    getUser: getUser,
    save: function(user){
      return resource.save(user);
    },
    update: function(user){
      return resource.save(user);
    },
    deleteUser: function(user){
      return resource.delete(user);
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