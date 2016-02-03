'use strict';

pizzaApp.directive('googlePlacesMap', function($log, googlePlaces, googleGeoLocation){
  var defaultLat, defaultLng, defaultZoom, geocoder, map, markers=[], markerDetails=[], allMarkersInitiated = false, infowindow, latLngVancouver;
  latLngVancouver = { lat: 49.2827, lng: -123.1207 };
  defaultLat = 49.2827;
  defaultLng = -123.1207;
  defaultZoom = 14;
  return {
    restrict: 'E',
    replace: true,
    scope: {
      myAddress: '=info',
    },
    template: '<div id="googlePlaces" class="user-address-map order-location map-marker-popups full-width"></div>',
    controller: function($scope){
      var userLocation = googleGeoLocation.getUserLocation({ returnLatLng: true }, function( locationInfo ){
        var stores = googlePlaces.getStores({ lat: locationInfo.lat, lng: locationInfo.lng, radius: 500 }).then(function( response ){
          initialize(locationInfo);
          // set user address
          // codeAddress(formatted_address, 'you are here: ' + formatted_address, googlePlaces.getMarkerName('current location'), true);
          // set location markers
          // formatAddress(response);
          getDetails(response); // get Google Places Details, then plot markers
        });
        // initialize(locationInfo);
        // getDetails(response);
        // var placeId = googlePlaces.getStoreDetails('').then(function( response ){
        //     markerDetails[rec.place_id] = response;
        //   });
      });
      function initialize(locationInfo) {
        geocoder = new google.maps.Geocoder();
        var mapOptions = {
          zoom: defaultZoom,
          center: locationInfo
        }
        map = new google.maps.Map(document.getElementById("googlePlaces"), mapOptions);
        infowindow = new google.maps.InfoWindow();
      }
      function getDetails(response){
        var markerCount = 0, markerRecieved = 0; // testing
        for(var obj in response.results){ 
          var rec = response.results[obj];
          var placeId = googlePlaces.getStoreDetails(rec).then(function( details ){
            markerDetails[details.result.place_id] = details;
            markerRecieved++;
            if(markerCount === response.results.length && markerRecieved === response.results.length){ // force syncronization
              formatAddress(response); // plot markers
            } 
          });
          markerCount++; // count markers 
        }
      }
      function formatAddress(response){
        var markerCount = 0, markerLimit = 5; // testing
        for(var obj in response.results){ 
          var rec = response.results[obj];
          var details = markerDetails[rec.place_id];
          var contentString = googlePlaces.getContentString(rec, details);
          var address = googlePlaces.getAddress(details);
          var markerImage = googlePlaces.getMarkerName(rec);
          codeAddress(address, contentString, markerImage, false);
          markerCount++; // count markers 
          if(markerCount > markerLimit || markerCount === response.results.length){ // force syncronization
            allMarkersInitiated = true; 
            break; // imposed limitation break for testing
          } 
        }
      }
      function codeAddress(address, contentString, markerImage) {
        // console.log('codeAddress : ' + address + ' Content: ' + contentString + ' markerImage: ' + markerImage );
        geocoder.geocode( { 'address': address }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            // map.setCenter(results[0].geometry.location);
            var markerContent = { 'myContent': contentString };
            var marker = new google.maps.Marker({
              map: map,
              draggable: false, 
              position: results[0].geometry.location,
              animation: google.maps.Animation.DROP
              // icon: '/images/' + markerImage
            });
            marker.addListener('click', function(){
              infowindow.setContent(markerContent.myContent);
              infowindow.open(map, marker);
            });
            markers.push(marker);
            if(allMarkersInitiated === true){ centerAndFit(); }
         } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      }
      function centerAndFit(){
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
         bounds.extend(markers[i].getPosition());
        }
        map.fitBounds(bounds);
      }
      /*function getUserLocation(settings, callback){
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
      }*/
      /*function geocodePosition(pos, callback) {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ latLng: pos }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            $log.debug('new latLong: ' + results[0].formatted_address);
            // $scope.$apply(function(){
            //   $scope.myAddress['latLong'] = results[0].formatted_address;
            // });
            callback(results[0].formatted_address);
          } else {
            $("#mapErrorMsg").html('Cannot determine address at this location.'+status).show(100);
          }
          }
        );
      }*/
    }
  };
 
});