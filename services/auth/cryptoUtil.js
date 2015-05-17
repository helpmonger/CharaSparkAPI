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
		return false;
	}
	var token = token.split(' ')[1];
	var payload = jwt.decode(token, "shhh..");

	if (!payload.sub || !payload.exp) {
		console.log('null sub or exp');
		console.log('token null');
		return false;
	}
	else if(moment().isAfter(moment.unix(payload.exp))){
		console.log('invalid timestamp');
		console.log('exp is: ', payload.exp);
		return false;
	}

	return true;
}
