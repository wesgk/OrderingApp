var express = require('express');
// var expressJwt = require('express-jwt'); // auth
// var jwt = require('jsonwebtoken'); // auth
var path = require('path');
var vendors = require('./vendorsController');
var orders = require('./ordersController');
var users = require('./usersController');
var dominosApi = require('./dominosController');
var twilioApi = require('./twilioController');
var app = express();
var rootPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');

// var appPizzapi = express();
// appPizzapi.use(bodyParser.urlencoded({extended:true}));

// We are going to protect /api routes with JWT
// app.use('/api', expressJwt({secret: secret}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + '/app')); // static serves 

// Dominos
app.get('/data/vendor/stores/dominos', dominosApi.findNearbyStores);
app.get('/data/vendor/stores/dominos/:id', dominosApi.getInfo);

// Twilio
app.get('/sms/send/:to/:from/:message', twilioApi.sendSms);

// app.get('/data/vendor/:id', vendors.get);
// app.get('/data/vendor', vendors.getAll);
// app.post('/data/vendor/:id', vendors.save);
app.get('/data/order/new', orders.getNextId);
app.get('/data/order/:id', orders.get);
app.post('/data/order/:id', orders.save);
app.get('/data/order', orders.getAll);
app.get('/data/user/new', users.getNextId);
app.get('/data/user/:id', users.get);
app.post('/data/user/:id', users.save);
app.get('/data/user', users.getAll);


app.get('*', function(req, res){ res.sendFile(rootPath + '/app/index.html'); });

app.listen(8000);
console.log('Listening on port 8000...');