var crypt = require('crypto');

module.exports =  function genuuid(){
	return crypt.randomBytes(48).toString('hex');
}
