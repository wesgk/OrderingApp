'use strict';

var pizzaApp = angular.module('pizzaApp', ['ngResource', 'ngRoute', 'ngMessages']);

pizzaApp.config(function($logProvider){
  $logProvider.debugEnabled(false);
});

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
    .when("/account/:id", {
      templateUrl: "templates/Account.html",
      controller: "EditUserController"
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
    .when("/register", {
      templateUrl: "templates/UserRegister.html",
      controller: "UserController"
    })
    .when("/login", {
      templateUrl: "templates/Login.html",
      controller: "AuthController"
    })
    .when("/login/:logout", {
      templateUrl: "templates/Login.html",
      controller: "AuthController"
    })
    .otherwise({redirect: "/login"});
    $locationProvider.html5Mode(true); // removes the hash from URL
    $logProvider.debugEnabled(true);
});
