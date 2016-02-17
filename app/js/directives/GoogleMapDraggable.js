'use strict';

pizzaApp.directive('googleMapDraggable', function($log){
  var defaultLat, defaultLng;
  defaultLat = 49.2827;
  defaultLng = -123.1207;
  return {
    restrict: 'E',
    replace: true,
    scope: {
      myAddress: '=info',
    },
    template: '<div id="map{{myAddress.id}}" class="user-address-map map-marker-popups {{myAddress.streetName}}"></div>',
    link: function($scope){
      var geocoder;
      var map;
      var address;
      var contentString;
      
      function fullAddress(){
        var fields = ['apartmentNumber','buildingNumber', 'streetName', 'city', 'province', 'postalCode'];
        address = '';
        for(var i = 0; i < fields.length; i++){
          address += $scope.myAddress[fields[i]] + ' ' || '';
        }
        contentString = address;
        $log.debug('address: ' + address);
      }
      function initialize() {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(defaultLat, defaultLng);
        var mapOptions = {
          zoom: 8,
          center: latlng
        }
        map = new google.maps.Map(document.getElementById("map{{myAddress.id}}"), mapOptions);
      }
      function codeAddress() {
        console.log('codeAddress : ' + address);
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var markerContent = { 'myContent': contentString };
            var infowindow = new google.maps.InfoWindow({
                content: markerContent.myContent
            });
            var marker = new google.maps.Marker({
                map: map,
                draggable: true, 
                position: results[0].geometry.location,
                myHtmlContent: 'test content'
            });
            marker.addListener('click', function(){
              infowindow.open(map, marker);
            });
            google.maps.event.addListener(marker, 'dragend', function(){
                geocodePosition(marker.getPosition(), function(address){
                  $log.debug('in google.map.dragend callback : ' + address);
                  markerContent.myContent = address;
                  infowindow.setContent(address);
                });
            });
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      }
      function geocodePosition(pos, callback) 
      {
         geocoder = new google.maps.Geocoder();
         geocoder.geocode
          ({
              latLng: pos
          }, 
              function(results, status) 
              {
                  if (status == google.maps.GeocoderStatus.OK) 
                  {
                    $log.debug('new latLong: ' + results[0].formatted_address);
                    $scope.$apply(function(){
                      $scope.myAddress['latLong'] = results[0].formatted_address;
                    });
                    callback(results[0].formatted_address);
                  } 
                  else 
                  {
                      $("#mapErrorMsg").html('Cannot determine address at this location.'+status).show(100);
                  }
              }
          );
      }
      initialize();
      fullAddress();
      codeAddress();
    }
  };
});