'use strict';

describe('OrderListController', function(){
  var $controllerConstructor, scope, mockOrderData;

  beforeEach(module("pizzaApp")); // initilize module
  
  beforeEach(inject(function($controller, $rootScope){
    $controllerConstructor = $controller;
    scope = $rootScope.$new();
    mockOrderData = sinon.stub({getAllOrders: function(){} });
  }));

  it('should set the scope orders to the result of orderData.getAllOrders',function(){
    var mockOrders = {};
    mockOrderData.getAllOrders.returns(mockOrders);

    $controllerConstructor("OrderListController", 
      {'$scope': scope, orderData: mockOrderData});
    
    expect(scope.orders).toBe(mockOrders);
    
  });
});