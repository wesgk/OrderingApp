'use strict';

  var pizzaApp = angular.module('pizzaApp', ['ngResource', 'ngRoute']);

  pizzaApp.config(function($routeProvider, $locationProvider, $logProvider){
    $routeProvider
      .when("/order/:id", {
        templateUrl: "templates/OrderEdit.html",
        controller: "EditOrderController"
      })
      .when("/order", {
        templateUrl: "templates/Order.html",
        controller: "OrderController"
      })
      .when("/orders", {
        templateUrl: "templates/Orders.html",
        controller: "OrderListController"
      })
      .when("/address", {
        templateUrl: "",
        controller: ""
      })
      .when("/user/:id", {
        templateUrl: "templates/UserEdit.html",
        controller: "EditUserController"
      })
      .when("/user", {
        templateUrl: "templates/User.html",
        controller: "UserController"
      })
      .when("/users", {
        templateUrl: "templates/Users.html",
        controller: "UserListController"
      })
      .otherwise({redirect: "/order"});
      //$locationProvider.html5Mode(true); // removes the hash from URL

      $logProvider.debugEnabled(true);
  });
