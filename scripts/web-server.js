var express = require('express');
var path = require('path');
var vendors = require('./vendorsController');
var orders = require('./ordersController');
var app = express();
var rootPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + '/app')); // static serves 
// the pages in a given directory without processing them at all

app.get('/data/vendor/:id', vendors.get);
app.get('/data/vendor', vendors.getAll);
app.post('/data/vendor/:id', vendors.save);
app.get('/data/order/new', orders.getNextId);
app.get('/data/order/:id', orders.get);
app.post('/data/order/:id', orders.save);
app.get('/data/order', orders.getAll);

app.get('*', function(req, res){ res.sendFile(rootPath + '/app/index.html'); });

app.listen(8000);
console.log('Listening on port 8000...');