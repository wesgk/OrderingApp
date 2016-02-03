
var pizzapi = require('../node_modules/pizzapi/dominos-pizza-api');

module.exports.findNearbyStores = function(req, res){
    pizzapi.Util.findNearbyStores('98118', 'Delivery',
    function(storeData) {
        console.log('\n\n##################\nNearby Stores\n##################\n\n',storeData.result.Stores);
        return res.send(storeData.result.Stores);
    }
  );
};

module.exports.getInfo = function(req, res){
    pizzapi.Util.findNearbyStores('63102', 'Delivery',
    function(storeData) {
        
        var Store = new pizzapi.Store(
            {   
                ID: req.params.id
            }
        );

        Store.getInfo(
            function(storeData){
                return res.send(storeData.result);
            }
        )    
    }
  );
};