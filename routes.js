module.exports = function(server){
	

	
	// var users = require('./controllers/users');
	// app.get('/users', users.findAll);
	// app.post('/users', users.add);


	var PATH = '/api/'

	var versionNo = '0.0.1';

	var Auth = require('./controllers/auth');
	server.get({path : PATH + 'login' , version : versionNo} , Auth.SignUp);
	server.post({path : PATH +'signup' , version : versionNo} , Auth.Login);


	var Braintree = require('./controllers/braintree');
	server.get({path : PATH + 'token' , version : versionNo} , Braintree.getToken);
	server.post({path : PATH +'processPayment' , version : versionNo} , Braintree.processPayment);


	var Wish = require('./controllers/wish');
	server.post({path : PATH +'AddWish', version: versionNo} , Wish.AddWish);
	server.get({path : PATH +'Wishes', version: versionNo} , Wish.All);


	// server.post({path : PATH +'GetDonations', version: versionNo} , GetDonations);
	// server.post({path : PATH +'Fulfillments', version: versionNo} , Fulfillments);
	// server.post({path : PATH +'GetPaidWishes', version: versionNo} , GetPaidWishes);
	// server.post({path : PATH +'UpdateWishAsPaid', version: versionNo} , UpdateWishAsPaid);

}
