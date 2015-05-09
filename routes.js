module.exports = function(server){
	

	
	// var users = require('./controllers/users');
	// app.get('/users', users.findAll);
	// app.post('/users', users.add);


	var PATH = '/api/'

	var versionNo = '0.0.1';

	var Auth = require('./controllers/auth');
	server.post(PATH + 'signup', Auth.SignUp);
	server.post(PATH +'login', Auth.Login);


	var Braintree = require('./controllers/braintree');
	server.get(PATH + 'token', Braintree.getToken);
	server.post(PATH +'processPayment', Braintree.processPayment);


	var Wish = require('./controllers/wish');
	server.post(PATH +'AddWish', Wish.AddWish);
	server.get(PATH +'Wishes', Wish.All);

	var Charity = require('./controllers/charity');
	server.post(PATH +'charity', Charity.add);
	server.get(PATH +'charity', Charity.findAll);

	// console.log('done with routes'); 

	var User = require('./controllers/user');
	server.get(PATH +'Test', User.test);
	
	// get user object by userName
//	server.get(PATH + 'user/:userName', User.getProfile);
	
	// get user object by UserID
	server.get(PATH + 'user/:userID', User.getProfile);
	
	

// app.put(baseURL + '/companies/:id', Companies.update);
	// server.post({path : PATH +'GetDonations', version: versionNo}, GetDonations);
	// server.post({path : PATH +'Fulfillments', version: versionNo}, Fulfillments);
	// server.post({path : PATH +'GetPaidWishes', version: versionNo}, GetPaidWishes);
	// server.post({path : PATH +'UpdateWishAsPaid', version: versionNo}, UpdateWishAsPaid);

}
