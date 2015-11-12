'use strict';

pizzaApp.factory('vendorData', function(){
  var resource = $resource('/data/vendor/:id', {id:'@id'}, {"getAll": {method:"GET", isArray:true, params: {something: "foo"}}} );

  return{
    getVendor: function(vendorId){
      return resource.get({id:vendorId});
    },
    getAllVendors: function(){
      return resource.query();
    }
  };
});