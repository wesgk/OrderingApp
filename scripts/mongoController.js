var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  // _id: Number,
  fname: { type: String, required: true  },
  lname: { type: String, required: true  },
  email: { type: String, required: true },
  telephone: { type: String, required: true  },
  paypalNumber: Number,
  addresses: [
  {
    _id: Number,
    buildingNumber: String,
    apartmentNumber: String,
    streetName: String,
    city: String,
    country: String,
    province: String,
    postalCode: String,
    latLong: String,
    specialInstructions: String
  }],
  defaultAddress: String,
  note: String,
  password: String,
  updated_at: { type: Date, default: Date.now },
});

// UserSchema.path('email').validate(function (email) {
//    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//    return emailRegex.test(email.text); // Assuming email has a text attribute
// }, 'The e-mail field cannot be empty.');

/*user = { // default blank 
    fname: '',
    lname: '',
    email: '',
    telephone: '',
    paypalNumber: 0,
    addresses: [
    {
      id: '0',
      buildingNumber: '',
      apartmentNumber: '',
      streetName: '',
      city: '',
      country: 'USA',
      province: '',
      postalCode: '',
      latLong: '',
      specialInstructions: ''
    }
    ],
    defaultAddress: ''
}*/

module.exports = mongoose.model('User', UserSchema);
