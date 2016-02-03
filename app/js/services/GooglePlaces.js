'use strict';

pizzaApp.factory('googlePlaces', function($resource, $http, $log){
    var googlePlacesKey, defaultLat, defaultLng, defaultRadius;
    defaultLat = 49.2827;
    defaultLng = -123.1207;
    defaultRadius = 250;
    googlePlacesKey = 'AIzaSyBfobtJ4mzfR7RDoVsKgVmVjLlqXEWya8c';
    
    var getStores = function(rec){
      var lat, lng, radius, types, name, rankby, url;
      lat = rec.lat;
      lng = rec.lng;
      radius = rec.radius || defaultRadius;
      types = rec.type || 'food';
      name = 'pizza';
      rankby = 'distance';
      url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
      // return $http.get( url + "?location=" + lat + "," + lng + "&radius=" + radius + "&types=" + types + "&name=" + name + "&rankby=" + rankby + "&key=" + googlePlacesKey)
      return $http.get( url + "?location=" + lat + "," + lng + "&radius=" + radius + "&types=" + types + "&name=" + name + "&key=" + googlePlacesKey)
         .then(function(response){
              return response.data; 
          });
    };
    var getStoreDetails = function(rec){
      var placeId, url;
      placeId = rec.place_id;
      // placeId = 'ChIJ83_jy1dxhlQRNXcIYCGxRL4';
      url = 'https://maps.googleapis.com/maps/api/place/details/json';
      return $http.get( url + "?placeid=" + placeId + "&key=" + googlePlacesKey)
         .then(function(response){
              return response.data; 
          });
    };
    var getContentString = function (rec, details){
      var open = getOpen(rec);
      var delivery = getDelivery(rec);
      var telephone = getTelephone(details);
      return rec.name + ' <br> ' + open + ' / ' + delivery + ' <br> ' + telephone + '<br> ' + rec.vicinity ;
    };
    var getId = function (rec){
      return rec.id;
    };
    var getName = function (rec){
      return rec.vicinity;
    };
    var getAddress = function (rec){
      return rec.vicinity;
    };
    var getTelephone = function (details){ // Google Details
      return (details) ? details.result.formatted_phone_number : 'n/a';
    };
    var getOpen = function (rec){
      return (rec.hasOwnProperty('opening_hours') ? ( rec.opening_hours.open_now ? 'open now' : 'closed now' ) : 'hours not listed');
    };
    var getDelivery = function (rec){
      return contains.call(rec.types, 'meal_delivery') ? 'delivers' : 'no delivery';
    };
    var getMarkerName = function (rec){
      var marker, open = getOpen(rec);
      var thumbs = {
        'delivers' : 'map_icon_delivers_open.png',
        'no delivery': 'map_icon_no_delivery_open.png',
        'hours not listed': 'map_icon_hours_not_listed.png',
        'closed': 'map_icon_closed.png',
        'current location': 'map_icon_current_location.png'
      }
      if( open === 'open now'){
        marker = thumbs[getDelivery(rec)];
      }else if( open === 'hours not listed'){
        marker = thumbs[open];
      }else{
        marker = thumbs['closed'];
      }
      return marker;
    };
    var getUserLocation = function (settings, callback){
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              if(settings.returnLatLng === true){
                callback(pos);
                return;
              }
              geocodePosition(pos, function(formatted_address){
                callback(formatted_address);
              });
            }, function() {
              handleLocationError(true, infowindow, map.getCenter());
            });
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infowindow, map.getCenter());
          }
        
          function handleLocationError(browserHasGeolocation, infowindow, pos) {
          infowindow.setPosition(pos);
          infowindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
        }
      };

    var contains = function(needle) {
      // Per spec, the way to identify NaN is that it is not equal to itself
      var findNaN = needle !== needle;
      var indexOf;
      if(!findNaN && typeof Array.prototype.indexOf === 'function') {
          indexOf = Array.prototype.indexOf;
      } else {
          indexOf = function(needle) {
              var i = -1, index = -1;
              for(i = 0; i < this.length; i++) {
                  var item = this[i];
                  if((findNaN && item !== item) || item === needle) {
                      index = i;
                      break;
                  }
              }
              return index;
          };
      }
      return indexOf.call(this, needle) > -1;
    };

    return { 
      getStores: getStores,
      getStoreDetails: getStoreDetails, 
      getContentString: getContentString,
      getId: getId,
      getName: getName,
      getAddress: getAddress, 
      getTelephone: getTelephone, 
      getOpen: getOpen,
      getDelivery: getDelivery,
      getMarkerName: getMarkerName,
      getUserLocation: getUserLocation
    };
});