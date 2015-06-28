var crypt = require('crypto');
var moment = require('moment');
var jwt = require('jwt-simple');
var config = require('./cryptoUtil.config')();

exports.genuuid = function() {
    return crypt.randomBytes(48).toString('hex');
};

exports.validateToken = function(req) {
    var token = req.headers.authorization;
    // console.log('token is: ', token);
    if (!token) {
        console.log('token null');
        return null;
    }
    token = token.split(' ')[1];
    var payload = jwt.decode(token, 'shhh..');

    if (!payload.sub || !payload.exp) {
        console.log('null sub or exp');
        console.log('token null');
        return null;
    } else if (moment().isAfter(moment.unix(payload.exp))) {
        console.log('invalid timestamp');
        // console.log('exp is: ', new Date(payload.exp));
        return null;
    }
    console.log('token valid');
    return payload.sub;
};

exports.encrypt = function(text) {
    var cipher = crypt.createCipher(config.algorithm, config.password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

exports.decrypt = function(text) {
    var decipher = crypt.createDecipher(config.algorithm, config.password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};
