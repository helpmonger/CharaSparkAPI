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

	// console.log('done with routes'); 

	var User = require('./controllers/user');
	server.get(PATH +'Test', User.test);
	
	// get user object
	server.get(PATH + 'user', User.getProfile);


// app.put(baseURL + '/companies/:id', Companies.update);
	// server.post({path : PATH +'GetDonations', version: versionNo}, GetDonations);
	// server.post({path : PATH +'Fulfillments', version: versionNo}, Fulfillments);
	// server.post({path : PATH +'GetPaidWishes', version: versionNo}, GetPaidWishes);
	// server.post({path : PATH +'UpdateWishAsPaid', version: versionNo}, UpdateWishAsPaid);

}
