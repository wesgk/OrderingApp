'use strict';

pizzaApp.controller('EditUserController', 
  function EditUserController($scope, userData, $routeParams, $timeout, $log){
    $scope.savedMessage = false;
    var savedMessageTO;
    userData.getUser($routeParams.id, function(user){
      $scope.user = user;
      $log.debug('user : ' + user);
    });
    $scope.reset = function(){
      userData.reset($routeParams.id, function(user){
        $scope.user = user;
      });
    }
    function updateUser(user, newUserForm){
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
    $scope.addAddress = function(addresses){
      $log.debug('in addAddress ctrl');
      userData.addAddress(addresses);
    }
    $scope.removeAddress = function(addresses, address, index){
      userData.removeAddress(addresses, address, index);
    };
});