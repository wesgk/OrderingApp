'use strict';

  var pizzaApp = angular.module('pizzaApp', ['ngResource', 'ngRoute']);

  pizzaApp.config(function($routeProvider, $locationProvider){
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
      .otherwise({redirect: "/order"});
      //$locationProvider.html5Mode(true); // removes the hash from URL
  });