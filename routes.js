var passport = require('passport');
var createSendToken = require('./services/auth/jwt');

module.exports = function(app){
	

	
	// var users = require('./controllers/users');
	// app.get('/users', users.findAll);
	// app.post('/users', users.add);


	var PATH = '/api/'

	var versionNo = '0.0.1';


	// var Auth = require('./controllers/auth');
	// app.post(PATH + 'register', Auth.SignUp);
	// app.post(PATH +'login', Auth.Login);

	
	app.post('/register', passport.authenticate('local-register'), function (req, res) {
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
	

// app.put(baseURL + '/companies/:id', Companies.update);
	// server.post({path : PATH +'GetDonations', version: versionNo}, GetDonations);
	// server.post({path : PATH +'Fulfillments', version: versionNo}, Fulfillments);
	// server.post({path : PATH +'GetPaidWishes', version: versionNo}, GetPaidWishes);
	// server.post({path : PATH +'UpdateWishAsPaid', version: versionNo}, UpdateWishAsPaid);

}
