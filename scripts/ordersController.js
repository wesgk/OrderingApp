var fs = require('fs');  

module.exports.get = function(req, res){
  var order = fs.readFileSync('app/data/order/' + req.params.id + '.json', 'utf8');
  res.setHeader('Content-Type', 'application/json');
  res.send(order);
};

module.exports.save = function(req, res){
  var order = req.body;
  fs.writeFileSync('app/data/order/' + req.params.id + '.json', JSON.stringify(order));
  res.send(order);
};

module.exports.getAll = function(req, res){
  var path = 'app/data/order/';
  var files = [];
  try{
    files = fs.readdirSync(path);
  }
  catch(e){
    res.send('[]');
    res.end('[]');
  }
  var results = "[";
  for(var idx = 0; idx < files.length; idx++){
    if(files[idx].indexOf(".json") == files[idx].length - 5){
      results += fs.readFileSync(path + "/" + files[idx]) + ",";
    }
  }
  results = results.substr(0, results.length-1);
  results += "]";

  res.setHeader('Content-Type', 'application/json');
  res.send(results);
  res.end();
};

module.exports.getNextId = function(req, res){
  var path = 'app/data/order/';
  var files = [];
  try{
    files = fs.readdirSync(path);
  }
  catch(e){
    res.send('[]');
    res.end('[]');
  }
  fileNames = new Array();
  for(var idx = 0; idx < files.length; idx++){
    if(files[idx].indexOf(".json") == files[idx].length - 5){
      fileNames.push(files[idx].substr(0,files[idx].length - 5));
    }
  }
  console.log('fileNames: ' + fileNames);
  fileNames.sort(function(a,b){ return b-a; }); 
  console.log('files post: ' + fileNames);
  var results = "[";
  fileName = parseInt(fileNames[0])+1;
  results += String(fileName);
  results += "]";

  res.setHeader('Content-Type', 'application/json');
  res.sendStatus(results);
  res.end();
};