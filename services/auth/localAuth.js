var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;

var strategyOptions = {
	usernameField: 'email'
};

exports.login = new LocalStrategy(strategyOptions, function (email, password, done) {

	var searchUser = {
		email: email
	};

	User.findOne(searchUser, function (err, user) {
		if (err) return done(err);

		if (!user) return done(null, false, {
			message: 'Wrong email/password'
		});

		user.comparePasswords(password, function (err, isMatch) {
			if (err) return done(err);

			if (!isMatch) return done(null, false, {
				message: 'Wrong email/password'
			});

			return done(null, user);
		});
	})
});

exports.register = new LocalStrategy(strategyOptions, function (email, password, done) {

	console.log('in reigster2');
	var searchUser = {
		email: email
	};

	User.findOne(searchUser, function (err, user) {
		if (err) {
			handleError(err);
			return done(err);
		}

		if (user) {
				console.log('user already exists!');
				return done(null, false, {
				message: 'email already exists'
			});
		}

		var newUser = new User({
			email: email,
			password: password
		});

		newUser.save(function (err) {
			if (err) {
				handleError(err);
				return done(err);
		}		
			done(null, newUser);
		})
	});
});

function handleError(msg){
	console.log('the err is: ', msg);
}