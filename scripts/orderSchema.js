var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  // _id: Number, // auto generated
  vendor: { type: String, required: true  },
  customerId: Number, // make required after login is setup
  items: [
  {
    // _id: Number,
    amount: String,
    style: String,
    size: String
  }],
  updated_at: { type: Date, default: Date.now } // new field
});


var Order = module.exports = mongoose.model('Order', OrderSchema);
module.exports = {
  Order: Order
}
