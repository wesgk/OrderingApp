"use strict";pizzaApp.controller("UserController",function(t,n,r,i){function o(){t.savedMessage=!0;s=i(function(){t.savedMessage=!1},2e3)}t.user=n.user;t.savedMessage=!1;var s;t.reset=function(){n.reset()};t.allUsers=function(){n.getAllUsers().$promise.then(function(e){r.debug("success",e)}).catch(function(e){r.error("failure",e)})};t.saveUser=function(e,t){n.getNextId(function(i){e.id=i[0];var s=e;r.debug("user.id: "+e.id);t.$valid&&n.save(e).$promise.then(function(e){r.debug("success",e);o()}).catch(function(e){r.error("failure",e)})})};t.updateUser=function(e,t){r.debug("items : "+e.items+"vendor : "+e.vendor+"newUserForm : "+t);var i;r.debug("user.id: "+e.id);t.$valid&&n.save(e).$promise.then(function(e){r.debug("success",e);o()}).catch(function(e){r.error("failure",e)})};t.addAddress=function(e){n.addAddress(e)};t.removeAddress=function(e,t,r){n.removeAddress(e,t,r)}});