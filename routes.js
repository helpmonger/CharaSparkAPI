var passport = require('passport');
var createSendToken = require('./services/auth/jwt');
var flash = require('connect-flash');

module.exports = function(app) {

    var PATH = '/api/';

    var versionNo = '0.0.1';

    //auth functions

    app.post(PATH + 'register', passport.authenticate('local-register', {
        failureFlash: true
    }), function(req, res) {
        var foo = req.flash();
        createSendToken(req.user, res);
    });

    app.post(PATH + 'login', passport.authenticate('local-login'), function(req, res) {
        createSendToken(req.user, res);
    });

    var User = require('./controllers/user');
    app.get(PATH + 'user', User.findAll); // get all users
    app.get(PATH + 'user/auth', User.getUserID); //return the access token based on userID - testing only
    app.get(PATH + 'user/:userID', User.getProfile); // get user object by UserID
    app.put(PATH + 'user/:userID', User.updateProfile); // update a user by UserID

	var Test = require('./controllers/test');
    app.get(PATH + 'test', Test.hello);

    var Braintree = require('./controllers/braintree');
    app.get(PATH + 'token', Braintree.getToken);
    app.post(PATH + 'processPayment', Braintree.processPayment);

    var Wish = require('./controllers/wish');
    app.post(PATH + 'wish', Wish.AddWish);
    app.get(PATH + 'wish/fulfiller/:fulfillerID', Wish.findWishesFromFulfiller);
    app.get(PATH + 'wish/user/:userID', Wish.findWishesFromUser);
    app.get(PATH + 'wish', Wish.findAll);
    app.get(PATH + 'wish/PaidWishes', Wish.findPaidWishes);
    app.put(PATH + 'wish/:wishID', Wish.updateWish);
    app.get(PATH + 'wish/:wishID', Wish.findWish);

    var Donation = require('./controllers/donation');
    app.post(PATH + 'donation', Donation.addDonation);
    app.get(PATH + 'donation', Donation.findAll);
    app.put(PATH + 'donation/:donationID', Donation.updateDonation);
    app.get(PATH + 'donation/:donationID', Donation.findDonation);

    app.get(PATH + 'donation/user/:userID', Donation.findDonationsFromUser);
    app.get(PATH + 'donation/charity/:charityID', Donation.findDonationsFromCharity);
    app.get(PATH + 'donation/wish/:wishID', Donation.findDonationForWish);

    var Charity = require('./controllers/charity');
    app.post(PATH + 'charity', Charity.add);
    app.get(PATH + 'charity', Charity.findAll);
    app.put(PATH + 'charity/:charityID', Charity.updateCharity);
    app.get(PATH + 'charity/:charityID', Charity.findCharity);

    // console.log('done with routes');

    

    //test
    app.get('/flash', function(req, res) {
        console.log('flash');
        // Set a flash message by passing the key, followed by the value, to req.flash().
        req.flash('info', 'Flash is back!');
        res.redirect('/');
    });
};
