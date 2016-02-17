'use strict';

  var pizzaApp = angular.module('pizzaApp', ['ngResource', 'ngRoute', 'ngMessages']);

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
        controller: "EditUserMongoController"
      })
      .when("/user", {
        templateUrl: "templates/User.html",
        controller: "UserMongoController"
      })
      .when("/users", {
        templateUrl: "templates/Users.html",
        controller: "UserListMongoController"
      })
      .when("/vendor/stores/dominos", {
        templateUrl: "templates/Vendors/Stores/Stores.html",
        controller: "StoreListController"
      })
      .when("/vendor/stores/dominos/:id", {
        templateUrl: "templates/Vendors/Stores/StoreEdit.html",
        controller: "EditStoreController"
      })
      .when("/login", {
        templateUrl: "templates/Login.html",
        controller: "AuthController"
      })
      .when("/login/:logout", {
        templateUrl: "templates/Login.html",
        controller: "AuthController"
      })
      .otherwise({redirect: "/order"});
      $locationProvider.html5Mode(true); // removes the hash from URL

      $logProvider.debugEnabled(true);
  });
