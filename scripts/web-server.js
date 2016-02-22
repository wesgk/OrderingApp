
var express = require('express');
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname + '/../'); // text files
var bodyParser = require('body-parser'); // text files

// Parse data files // JWT includes formerly positioned ^
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + '/app')); // static serves 

// Redirect unauthorized
app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});

/**
 * Mongoose
 */

var mongoose = require('mongoose'); // mongoose
mongoose.connect('mongodb://localhost:27017/pizzaApp', function(err) {
  if(err) {
      console.log('connection error', err);
  } else {
      console.log('connection successful');
  }
});

var mongooseObjectId = require('mongoose').Types.ObjectId;; // mongoose
var mongoUser = require('./userSchema').User; // mongo controller
var mongoOrder = require('./orderSchema').Order; // mongo controller

/**
 * MongoDB - Orders
 */
 
var orders = require('./ordersController');
app.get('/mongo/order', orders.getAll);
app.post('/mongo/order', orders.post);
app.get('/mongo/order/:id', orders.get);
app.post('/mongo/order/:id', orders.update);

/**
 * MongoDB - Users
 */

var users = require('./usersController');

app.get('/mongo/user', users.getAll);
app.get('/mongo/user/:id', users.get);
app.post('/mongo/user/:id', users.update);
app.delete('/mongo/user/:id', users.delete);
app.get('/mongo/user/count/email/:email/id/:id', users.getEmailCountFilterId);
app.get('/mongo/user/availability/email/:email/id/:id', users.getEmailExistsFilterId);
app.get('/mongo/user/availability/email/:email', users.getEmailExists);

/**
 * Twilio
 */

var twilioApi = require('./twilioController'); // twilio
app.get('/sms/send/:to/:from/:message', twilioApi.sendSms);

/**
 * JWT - athentication
 */

var expressJwt = require('express-jwt'); // auth
var jwt = require('jsonwebtoken'); // auth
var secret = 'this is the secret secret secret 12356'; // auth
app.use('/api', expressJwt({secret: secret})); // protect api routes with JWT

app.post('/authenticate', function (req, res) {
  var userRec; 
  mongoUser.find({ email: req.body.username /*, password: req.body.password */ }, function (err, post) {
    if (err) return res.status(401).send('Wrong user or password');
    if (!post[0]){ // no user found in db
      return res.status(401).send('Wrong user or password');
    }else{
      var user = post[0]._doc;
      var profile = {
        first_name: user.fname,
        last_name: user.lname,
        email: user.email,
        telephone: user.telephone,
        userType: user.userType,
        id: user._id
      };
      // We are sending the profile inside the token
      var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });
      res.json({ token: token });
    }
  });
});

app.get('/api/restricted', function (req, res) {
  // console.log('user ' + req.user.email + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});

/**
 * Let's go!
 */

app.get('*', function(req, res){ res.sendFile(rootPath + '/app/index.html'); });

app.listen(8000);
console.log('Listening on port 8000...');