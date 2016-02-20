// 
var express = require('express');
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname + '/../'); // text files
var bodyParser = require('body-parser'); // text files

// athentication
var expressJwt = require('express-jwt'); // auth
var jwt = require('jsonwebtoken'); // auth
var secret = 'this is the secret secret secret 12356'; // auth
app.use('/api', expressJwt({secret: secret})); // protect api routes with JWT

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
var mongoUser = require('./mongoUserController').User; // mongo controller
var mongoOrder = require('./mongoOrderController').Order; // mongo controller

// app.get('/mongo/order', function(req, res, next) {
//   mongoOrder.find(function (err, todos) {
//     if (err) return next(err);
//     res.json(todos);
//   });
// });

app.get('/mongo/order', function(req, res, next) {
  mongoOrder.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

// app.post('/mongo/user', function(req, res, next) {
//   mongoUser.create(req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

app.post('/mongo/order', function(req, res, next) {
  console.log('/mongo/order');
  console.dir(req.body);
  mongoOrder.create(req.body, function (err, post) {
   if (err) return next(err);
    res.json(post);
  });
});

app.get('/mongo/order/:id', function(req, res, next) {
  mongoOrder.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.post('/mongo/order/:id', function(req, res, next) {
  mongoOrder.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.get('/mongo/user', function(req, res, next) {
  mongoUser.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

app.post('/mongo/user', function(req, res, next) {
  mongoUser.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.get('/mongo/user/:id', function(req, res, next) {
  mongoUser.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.post('/mongo/user/:id', function(req, res, next) {
  mongoUser.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.delete('/mongo/user/:id', function(req, res, next) {
  mongoUser.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.get('/mongo/user/count/email/:email/id/:id', function(req, res, next) {
  var objId = new mongooseObjectId(req.params.id);
  mongoUser.find({ _id: { $ne: objId }, email: req.params.email }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.get('/mongo/user/availability/email/:email/id/:id', function(req, res, next) {
  console.log('availability email and id');
  var objId = new mongooseObjectId(req.params.id);
  mongoUser.find({ _id: { $ne: objId }, email: req.params.email }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  }); 
});

app.get('/mongo/user/availability/email/:email', function(req, res, next) {
  console.log('availability email only');
  mongoUser.find({ email: req.params.email }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/**
 * JWT
 */

app.post('/authenticate', function (req, res) {
  var userRec; 
  // uncomment to include pw in query
  // mongoUser.find({ email: req.body.username, password: req.body.password }, function (err, post) {
  // query on email only
  mongoUser.find({ email: req.body.username }, function (err, post) {
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
  console.log('user ' + req.user.email + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});

/**
 * Twilio
 */

var twilioApi = require('./twilioController'); // twilio
app.get('/sms/send/:to/:from/:message', twilioApi.sendSms);

/**
 * Text File Data Files
 */
// app.get('/data/vendor/:id', vendors.get);
// app.get('/data/vendor', vendors.getAll);
// app.post('/data/vendor/:id', vendors.save);
// app.get('/data/order/new', orders.getNextId);
// app.get('/data/order/:id', orders.get);
// app.post('/data/order/:id', orders.save);
// app.get('/data/order', orders.getAll);
// app.get('/data/user/new', users.getNextId);
// app.get('/data/user/:id', users.get);
// app.post('/data/user/:id', users.save);
// app.get('/data/user', users.getAll);

app.get('*', function(req, res){ res.sendFile(rootPath + '/app/index.html'); });

app.listen(8000);
console.log('Listening on port 8000...');