var mongoose = require('mongoose');
var braintree = require('braintree');

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: 'hnvj4t6ggkv8thmr',
    publicKey: '5by28mt2pg8sdxmd',
    privateKey: 'f4fd03b4259013c3d29907f275b5da88'
});

exports.getToken = function(req, res, next) {
    console.log('end of connect');
    // generates the client token
    gateway.clientToken.generate({}, function(err, response) {
        if (err) {
            console.log('the err is: ', err);
            return next(err);
        } else {
            var clientToken = response.clientToken;
            console.log('clientToken is: ', clientToken);
            res.send(200, response.clientToken);
            return next();
        }
    });
};

exports.processPayment = function(req, res, next) {
    console.log('req.body.amount is ' + req.body.amount);
    console.log('req.body.nounce is ' + req.body.nounce);
   
    gateway.transaction.sale({
        amount: req.body.amount,
        paymentMethodNonce: req.body.nounce,
        // submit_for_settlement: true,
    }, function(err, result) {
        if (err) {
            console.log('the err is: ', err);
            return next(err);
        } else {
            console.log('result is: ', result);
            res.send(200, result);
            return next();
        }
    });
};
