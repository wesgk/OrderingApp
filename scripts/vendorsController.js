var fs = require('fs');  

module.exports.get = function(req, res){
  var vendor = fs.readFileSync('app/data/vendor/' + req.params.id + '.json', 'utf8');
  res.setHeader('Content-Type', 'application/json');
  res.send(vendor);
};

module.exports.save = function(req, res){
  var vendor = req.body;
  fs.writeFileSync('app/data/vendor/' + req.params.id + '.json', JSON.stringify(vendor));
  res.send(vendor);
};

module.exports.getVendorLocations = function(req, res){
  // var path = 'app/data/vendor/';
  // var files = [];
  // try{
  //   files = fs.readdirSync(path);
  // }
  // catch(e){
  //   res.send('[]');
  //   res.end('[]');
  // }
  // var results = "[";
  // for(var idx = 0; idx < json.length; idx++){
  //   if(json[idx].indexOf(".json") == json[idx].length - 5){
      
  //     results += fs.readFileSync(path + "/" + json[idx]) + ",";
  //   }
  // }
  // results = results.substr(0, results.length-1);
  // results += "]";

  // res.setHeader('Content-Type', 'application/json');
  // res.send('res: ' + res);
  // res.end();
  return res.send(req);
};