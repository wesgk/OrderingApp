'use strict';

pizzaApp.controller('EditUserMongoController', 
  function EditUserMongoController($scope, userMongo, $routeParams, provinces, $log, $timeout, authLogout){
    $scope.savedMessage = false;
    var savedMessageTO;
    $scope.provinces = userMongo.provinces;
    
    userMongo.getUser($routeParams.id, function(user){
      $scope.user = user;
      $scope.user.id = $scope.user._id;
      setSelectedProvinces($scope.user.addresses); // set province dropdown to selected
    });
    function setSelectedProvinces(addressArray){
      for(var i = 0; i < addressArray.length; i++){
        var provincePos = userMongo.getProvincePos(addressArray[i].province);
        if( provincePos && $scope.provinces[provincePos].abbreviation !== undefined ){
          $scope.user.addresses[i].province = angular.copy($scope.provinces[provincePos].abbreviation);
        }
      }
    }
    $scope.reset = function(){
      userMongo.reset($routeParams.id, function(user){
        $scope.user = user;
      });
    }
    $scope.updateUser = function(user, newUserForm){
      $log.debug("updateUser addresses : " + user.addresses.length + " vendor : " + user.fname + " , " + user.lname + "" );
      console.dir(user);
      console.dir(newUserForm);

      userMongo.update(user)
        .$promise
        .then(function(response) { $log.debug('success', response); flashSavedMessage(); })
        .catch(function(response) { $log.error('failure', response)});
    };
    function flashSavedMessage(){
      $scope.savedMessage = true;
      savedMessageTO = $timeout(function(){
        $scope.savedMessage = false;
      }, 2000);
    }
    function setDefaultAddress(){
      if($scope.user.defaultAddress > $scope.user.addresses.length){
        $log.debug('default > length');
        $scope.user.defaultAddress = $scope.user.addresses.length;
      }else{
        $log.debug('default <= length');
      }
      return;
    }
    $scope.addAddress = function(addresses){
      $log.debug('in addAddress ctrl');
      userMongo.addAddress(addresses);
    }
    $scope.removeAddress = function(addresses, address, index){
      userMongo.removeAddress(addresses, address, index);
      setDefaultAddress();
    };
});