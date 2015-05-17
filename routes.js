var passport = require('passport');
var createSendToken = require('./services/auth/jwt');
var flash = require('connect-flash');

module.exports = function(app){
	

	
	// var users = require('./controllers/users');
	// app.get('/users', users.findAll);
	// app.post('/users', users.add);


	var PATH = '/api/'

	var versionNo = '0.0.1';


	// var Auth = require('./controllers/auth');
	// app.post(PATH + 'register', Auth.SignUp);
	// app.post(PATH +'login', Auth.Login);

	
	app.post('/register', passport.authenticate('local-register', 
								   { failureFlash: true }), function (req, res) {
		req.flash();
		console.log('in register');
		createSendToken(req.user, res);
	});
	

	app.post('/login', passport.authenticate('local-login'), function (req, res) {
		console.log('in login');
		createSendToken(req.user, res);
	});


	var Braintree = require('./controllers/braintree');
	app.get(PATH + 'token', Braintree.getToken);
	app.post(PATH +'processPayment', Braintree.processPayment);


	var Wish = require('./controllers/wish');
	app.post(PATH +'Wish', Wish.AddWish);
	app.get(PATH +'Wish', Wish.findAll);
	app.put(PATH +'Wish/:wishID', Wish.updateWish);
	app.get(PATH +'Wish/:wishID', Wish.findWish);
	
	app.get(PATH +'Wish/User/:userID', Wish.findWishesFromUser);

    var Donation = require('./controllers/donation');
	app.post(PATH +'Donation', Donation.addDonation);
	app.get(PATH +'Donation', Donation.findAll);
	app.put(PATH +'Donation/:donationID', Donation.updateDonation);
	app.get(PATH +'Donation/:donationID', Donation.findDonation);
	
	app.get(PATH +'Donation/User/:userID', Donation.findDonationsFromUser);

	var Charity = require('./controllers/charity');
	app.post(PATH +'charity', Charity.add);
	app.get(PATH +'charity', Charity.findAll);
	app.put(PATH +'charity/:charityID', Charity.updateCharity);
	app.get(PATH +'charity/:charityID', Charity.findCharity);

	// console.log('done with routes'); 

	var User = require('./controllers/user');
	app.get(PATH +'Test', User.test);
	
	// get user object by userName
//	app.get(PATH + 'user/:userName', User.getProfile);
	
	// get user object by UserID
	app.get(PATH + 'user/:userID', User.getProfile);
	
	// update a user by UserID 
	app.put(PATH + 'user/:userID', User.updateProfile);
	
	// get all users
	app.get(PATH + 'user', User.findAll);

	//test
	app.get('/flash', function(req, res){
		console.log('flash');
  // Set a flash message by passing the key, followed by the value, to req.flash().
	  req.flash('info', 'Flash is back!')
	  res.redirect('/');
	});
	

// app.put(baseURL + '/companies/:id', Companies.update);
	// server.post({path : PATH +'GetDonations', version: versionNo}, GetDonations);
	// server.post({path : PATH +'Fulfillments', version: versionNo}, Fulfillments);
	// server.post({path : PATH +'GetPaidWishes', version: versionNo}, GetPaidWishes);
	// server.post({path : PATH +'UpdateWishAsPaid', version: versionNo}, UpdateWishAsPaid);

}
