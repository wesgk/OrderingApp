
var mongoOrder = require('./orderSchema').Order; // mongo controller

module.exports.getAll = function(req, res, next) {
  mongoOrder.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
};

module.exports.post = function(req, res, next) {
  mongoOrder.create(req.body, function (err, post) {
   if (err) return next(err);
    res.json(post);
  });
};

module.exports.get = function(req, res, next) {
  mongoOrder.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
};

module.exports.update = function(req, res, next) {
  mongoOrder.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
};
