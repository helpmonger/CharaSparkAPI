var crypt = require('crypto');

exports.genuuid =  function(){
	return crypt.randomBytes(48).toString('hex');
}
