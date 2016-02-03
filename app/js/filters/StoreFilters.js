'use strict';

pizzaApp.filter('storeOpen', function(){
  return function(items, openStatus){
    var filtered = [];
    var status = openStatus === 'open' ? true : false;
    for(var i = 0; i < items.length; i++){
      var item = items[i];
      if(item.ServiceIsOpen.Delivery === status) filtered.push(item);
    }
    return filtered;
  };
});