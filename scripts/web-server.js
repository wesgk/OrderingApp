var express = require('express');
var expressJwt = require('express-jwt'); // auth
var jwt = require('jsonwebtoken'); // auth
var secret = 'this is the secret secret secret 12356'; // auth
var mongoose = require('mongoose'); // mongoose
var mongooseObjectId = require('mongoose').Types.ObjectId;; // mongoose
var mongo = require('./mongoController'); // mongo controller
var twilioApi = require('./twilioController'); // twilio

var path = require('path');
var vendors = require('./vendorsController');
var orders = require('./ordersController');
var users = require('./usersController');

var app = express();
var rootPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: secret}));

// Parse data files
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
 * MongoDB / Mongoose
 *
 * @param param-type  param-name param-desc
 *
 * @return json
 */

mongoose.connect('mongodb://localhost:27017/pizzaApp', function(err) {
  if(err) {
      console.log('connection error', err);
  } else {
      console.log('connection successful');
  }
});

app.get('/mongo/user', function(req, res, next) {
  mongo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

app.post('/mongo/user', function(req, res, next) {
  mongo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.get('/mongo/user/:id', function(req, res, next) {
  mongo.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.post('/mongo/user/:id', function(req, res, next) {
  mongo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.delete('/mongo/user/:id', function(req, res, next) {
  mongo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.get('/mongo/user/count/email/:email/id/:id', function(req, res, next) {
  var objId = new mongooseObjectId(req.params.id);
  mongo.find({ _id: { $ne: objId }, email: req.params.email }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.get('/mongo/user/availability/email/:email/id/:id', function(req, res, next) {
  console.log('availability email and id');
  var objId = new mongooseObjectId(req.params.id);
  mongo.find({ _id: { $ne: objId }, email: req.params.email }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  }); 
});

app.get('/mongo/user/availability/email/:email', function(req, res, next) {
  console.log('availability email only');
  mongo.find({ email: req.params.email }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// 
/**
 * JWT
 *
 * @param req object
 *
 * @return json  
 */
app.post('/authenticate', function (req, res) {
  //TODO validate req.body.username and req.body.password
  console.dir(req.body);
  var userRec; 

  mongo.find({ email: req.body.username, password: req.body.password }, function (err, post) {
    
    if (err) return res.status(401).send('Wrong user or password');
    
    if (!post[0]){ // no user found in db
      return res.status(401).send('Wrong user or password');
    }else{
      var user = post[0]._doc;
      var profile = {
        first_name: user.fname,
        last_name: user.lname,
        email: user.email,
        id: user._id
      };
      // We are sending the profile inside the token
      var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });
      res.json({ token: token });
    }
  });
});

app.get('/api/restricted', function (req, res) {
  console.log('user ' + req.user.email + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});


/**
 * Twilio
 *
 * @to - telephone number - store
 * @from - sending number - buyer
 * @message - sending number - buyer
 *
 */

app.get('/sms/send/:to/:from/:message', twilioApi.sendSms);

/**
 * Text File Data Files
 *
 * @id - int - unique ID 
 *
 */
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