"use strict";pizzaApp.factory("orderData",function(e,t,n){var r=e("/data/order/:id",{id:"@id"},{getAll:{method:"GET",isArray:!0,params:{something:"foo"}}}),i={id:1,count:"",type:"",size:""},s={vendor:"",customerId:0,items:[{id:1,count:"",type:"",size:""}]},o=s,u=function(e){var t=e.length+1,n={};angular.copy(i,n);n.id=t;e.push(n)},a=function(e,t,n){var n=t.id?t.id-1:n;if(n>=0){e.splice(n,1);var r=1;for(var i in e){e[i].id=r;r++}}},f=function(){n.debug("in ctrl reset");o.vendor="";angular.copy([i],o.items)},l=function(e,r){n.debug("in getORder getting: "+e);t({method:"GET",url:"/data/order/"+e}).success(function(e,t,n,i){r(e)}).error(function(e,t,r,i){n.warn(e,t,r(),i)})},c=function(e){t({method:"GET",url:"/data/order/new"}).success(function(t,r,i,s){n.debug("success: "+t);e(t)}).error(function(e,t,r,i){n.warn(e,t,r,i)})};return{order:o,getOrder:l,save:function(e){return r.save(e)},update:function(e){return r.save(e)},getAllOrders:function(){return r.query()},getNextId:c,reset:f,addItem:u,removeItem:a}});