var crypt = require('crypto');
var moment = require('moment');
var jwt = require('jwt-simple');

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
