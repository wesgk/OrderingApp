"use strict";pizzaApp.factory("orderData",function(e,t,n){var r=e("/data/order/:id",{id:"@id"},{getAll:{method:"GET",isArray:!0,params:{something:"foo"}}});return{getOrder:function(e,r){n.info("in getORder getting: "+e);t({method:"GET",url:"/data/order/"+e}).success(function(e,t,n,i){r(e)}).error(function(e,t,r,i){n.warn(e,t,r(),i)})},save:function(e){return r.save(e)},getAllOrders:function(){return r.query()},getNextId:function(e){t({method:"GET",url:"/data/order/new"}).success(function(t,r,i,s){n.info("success: "+t);e(t)}).error(function(e,t,r,i){n.warn(e,t,r,i)})}}});