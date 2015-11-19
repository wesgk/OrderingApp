'use strict';

pizzaApp.controller("UserListController", 
  function UserListController($scope, userData, $log){

    $scope.users;

    var getAllUsers = userData.getAllUsers().
        $promise
        .then(function(response){ $log.debug('success', response); $scope.users = response; })
        .catch(function(response) { $log.error('failure', response)});
  });