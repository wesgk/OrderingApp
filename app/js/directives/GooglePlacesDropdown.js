'use strict';

pizzaApp.directive('googlePlacesDropdown', function(googlePlaces){

  var dropdownList = '';

  return {
    restrict: 'E',
    replace: true,
    scope: false,
    template: function (element, attrs){
      // return '<select ng-model="' + attrs.ngModel + '" class="col-sm-12 col-lg-4" ' + ((attrs.required) ? ' required' : '') + '>' + 
      // '<option disabled="disabled" selected value="">Choose a Pizzeria, Pal!</option>' +
      // '<option ng-repeat="' + attrs.optionexp + '" value="' + attrs.value + '">' + attrs.label + '</option>' + 
      // '</select>';

       return '<select name="vendor" ng-model="' + attrs.ngModel + '" class="col-sm-12 col-lg-4" ' + ((attrs.required) ? ' required' : '') + '>' + 
      '<option disabled="disabled" selected value="">Choose a Pizzeria, Pal!</option>' +
      '<option ng-repeat="' + attrs.optionexp + '" value="' + attrs.value + '">' + attrs.label + '</option>' + 
      '</select>';

      // return '<select></select>';
    }/*,
    controller: function($scope){
      
        var userLocation = googlePlaces.getUserLocation({ returnLatLng: true }, function( locationInfo ){
          var stores = googlePlaces.getStores({ lat: locationInfo.lat, lng: locationInfo.lng, radius: 500 }).then(function( response ){
              
              for(var obj in response.results){ 
                var rec = response.results[obj];
                //var contentString = googlePlaces.getContentString(rec);
                var name = googlePlaces.getName(rec);
                var open = googlePlaces.getOpen(rec);
                var delivery = googlePlaces.getDelivery(rec);
                var address = googlePlaces.getAddress(rec);
                //var marker = googlePlaces.getMarkerName(rec);
                dropdownList += '<option>' + name + ' / ' + open + ' / ' + delivery + ' / ' + address + '</option>';
              }
              console.log('dropdownList: ' + dropdownList);
          });
        });
    }*/
  };
})