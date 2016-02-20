'use strict';

pizzaApp.controller('EditAccountController', 
  function EditAccountController($scope, userData, $routeParams, provinces, $log, $timeout, authLogout){
    $scope.savedMessage = false;
    var savedMessageTO;
    $scope.provinces = userData.provinces;
    
    userData.getUser($routeParams.id, function(user){
      $scope.user = user;
      $scope.user.id = $scope.user._id; // handle mongoDB auto id
      setSelectedProvinces($scope.user.addresses); // set province dropdown to selected
    });
    
    function setSelectedProvinces(addressArray){
      for(var i = 0; i < addressArray.length; i++){
        var provincePos = userData.getProvincePos(addressArray[i].province);
        if( provincePos && $scope.provinces[provincePos].abbreviation !== undefined ){
          $scope.user.addresses[i].province = angular.copy($scope.provinces[provincePos].abbreviation);
        }
      }
    }
    $scope.reset = function(){
      userData.reset($routeParams.id, function(user){
        $scope.user = user;
      });
    }
    $scope.updateUser = function(user, newUserForm){
      $log.debug("updateUser addresses : " + user.addresses.length + " vendor : " + user.fname + " , " + user.lname + "" );
      console.dir(user);
      console.dir(newUserForm);

      userData.update(user)
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
      userData.addAddress(addresses);
    }
    $scope.removeAddress = function(addresses, address, index){
      userData.removeAddress(addresses, address, index);
      setDefaultAddress();
    };
});