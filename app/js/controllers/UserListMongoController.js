'use strict';

pizzaApp.controller("UserListMongoController", 
  function UserListMongoController($scope, userMongo, $log){

    $scope.users;

    var getAllUsers = userMongo.getAllUsers().
        $promise
        .then(function(response){ $log.debug('success', response); $scope.users = response; })
        .catch(function(response) { $log.error('failure', response)});
  });