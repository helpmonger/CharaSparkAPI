var crypt = require('crypto');
var moment = require('moment');
var jwt = require('jwt-simple');

exports.genuuid =  function(){
	return crypt.randomBytes(48).toString('hex');
}

exports.validateToken = function(req){
	var token = req.headers.authorization;
	if(!token){
		console.log('token null');
		return null;
	}
	var token = token.split(' ')[1];
	console.log('token is: ', token);
	var payload = jwt.decode(token, "shhh..");

	if (!payload.sub || !payload.exp) {
		console.log('null sub or exp');
		console.log('token null');
		return null;
	}
	else if(moment().isAfter(moment.unix(payload.exp))){
		console.log('invalid timestamp');
		console.log('exp is: ', payload.exp);
		return null;
	}

	return payload.sub;
}
