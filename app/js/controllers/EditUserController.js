'use strict';

pizzaApp.controller('EditUserController', 
  function EditUserController($scope, userData, $routeParams, provinces, $timeout, $log){
    $scope.savedMessage = false;
    var savedMessageTO;
    $scope.provinces = userData.provinces;
    
    userData.getUser($routeParams.id, function(user){
      $scope.user = user;
      setSelectedProvinces($scope.user.addresses); // set province dropdown to selected
    });
    function setSelectedProvinces(addressArray){
      for(var i = 0; i < addressArray.length; i++){
        var provincePos = userData.getProvincePos(addressArray[i].province);
        if( $scope.provinces[provincePos].abbreviation !== undefined ){
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
      $log.debug("items : " + user.items + "vendor : " + user.vendor + "newUserForm : " + newUserForm );
      userData.save(user)
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