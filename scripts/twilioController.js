// require the Twilio module and create a REST client
// ACCOUNT_SID, AUTH_TOKEN
var client = require('twilio')('ACf49b97b5d7e9734b9bed1eb1735d62ab', '5c829bb9a278367c2987d24eb45cde71');

module.exports.sendSms = function(req, res){
    //Send an SMS text message
    client.sendMessage({

        to: req.params.to, // Any number Twilio can deliver to
        from: req.params.from, // A number you bought from Twilio and can use for outbound communication
        body: req.params.message // body of the SMS message

    }, function(err, responseData) { //this function is executed when a response is received from Twilio

        if (!err) { // "err" is an error received during the request, if any

            // "responseData" is a JavaScript object containing data received from Twilio.
            // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
            // http://www.twilio.com/docs/api/rest/sending-sms#example-1

            console.log(responseData.from); // outputs "+14506667788"
            console.log(responseData.body); // outputs "word to your mother."

        }else{
            console.dir(responseData);
        }
    });
};

module.exports.makeCall = function(req, res){
    //Place a phone call, and respond with TwiML instructions from the given URL
    client.makeCall({

        to:'+16515556677', // Any number Twilio can call
        from: '+14506667788', // A number you bought from Twilio and can use for outbound communication
        url: 'http://www.example.com/twiml.php' // A URL that produces an XML document (TwiML) which contains instructions for the call

    }, function(err, responseData) {

        //executed when the call has been initiated.
        console.log(responseData.from); // outputs "+14506667788"

    });
};