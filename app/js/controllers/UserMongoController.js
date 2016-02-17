"use strict";

pizzaApp.controller('UserMongoController',
  function UserMongoController($scope, userMongo, provinces, $log, $timeout){
    $scope.user = userMongo.user;
    $scope.savedMessage = false;
    var savedMessageTO;
    $scope.provinces = provinces;
    $scope.selectedProvince = angular.copy($scope.provinces[0].abbreviation);
    $scope.user.defaultAddress = 0; // auto-set 1st address as default

    $scope.reset = function(){
      userMongo.reset();
    }
    $scope.allUsers = function(){
       userMongo.getAllUsers().
        $promise
        .then(function(response){ $log.debug('success', response)})
        .catch(function(response){ $log.error('failure', response)});
    }
    $scope.saveUser = function(user, newUserForm){
      //userMongo.getNextId(function(newId){
        //user.id  = newId[0];
        //var thisUser = user;
        $log.debug('in saveUser');
        if(newUserForm.$valid){
        userMongo.save(user)
          .$promise
          .then(function(response){ $log.debug('success', response); flashSavedMessage(); })
          .catch(function(response){ $log.error('failure', response)});
        }
      //});
    };
    $scope.updateUser = function(user, newUserForm){
      $log.debug("items : " + user.items + "vendor : " + user.vendor + "newUserForm : " + newUserForm );
      var customerId;
      $log.debug('user.id: '+ user.id);
      if(newUserForm.$valid){
        userMongo.save(user)
          .$promise
          .then(function(response){ $log.debug('success', response); flashSavedMessage(); })
          .catch(function(response){ $log.error('failure', response)});
      }
    };
    function flashSavedMessage(){
      $scope.savedMessage = true;
      savedMessageTO = $timeout(function(){
        $scope.savedMessage = false;
      }, 2000);
    }
    $scope.addAddress = function(addresses){
      userMongo.addAddress(addresses);
    }
    $scope.removeAddress = function(addresses, address, index){
      userMongo.removeAddress(addresses, address, index);
    };
});
