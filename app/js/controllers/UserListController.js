'use strict';

pizzaApp.controller("UserListController", 
  function UserListController($scope, userData, $log){
    $scope.users;
    
    var getAllUsers = function(){ 
      userData.getAllUsers().
      $promise
      .then(function(response){ 
        $log.debug('success', response); 
        $scope.users = response; 
      })
      .catch(function(response) { $log.error('failure', response)});
    };

    $scope.deleteUser = function(user){
      user.id = user._id; // set .id field to handle standard routing variables
      userData.deleteUser(user)
      .$promise
      .then(function(response){ 
        $log.debug('success', response); 
        getAllUsers();
      })
      .catch(function(response){ $log.error('failure', response); });
      $log.debug('in deleteUser');
    };

    getAllUsers();
});