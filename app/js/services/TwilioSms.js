'use strict';

pizzaApp.factory('twilioSms', function($http){

  // var sendMessage = function(numbers, message, callback){
  var sendMessage = function(to, from, message){
    var server = "/sms/send";
    var to = "/+1" + to;
    var from = "/+1" + from;
    var message = '/' + encodeURI(message);
    var url_api = server + to + from + message; // /sms/send/:to/:from/:message
    
    return $http.get(url_api)
      .then(function(response){
        console.dir(response);
        return response.message;
      });
  };

  return{
    sendMessage: sendMessage
  }

});