var mongoose = require('mongoose'),
    User = mongoose.model('User');
var utility = require('../data/Utility');
var crypUtil = require('../services/auth/cryptoUtil');

exports.findAll = function(req, res) {
    var userID = crypUtil.validateToken(req);
    if (userID) {
        User.find({}, function(err, results) {
            if (err) {
                return utility.handleError(res, err);
            } else {
                return res.send(results);
            }
        });
    } else {
        return utility.handleAuthFailure(res);
    }
};

exports.isEmailUnique = function(req, res) {
    var email = req.body.email;

    //console.log(email);
    User.find({
        email: email
    }).limit(1).exec(function(err, results) {
        if (err) {
            return utility.handleError(res, err);
        } else {
            if (results && results.length > 0) {
                console.log(results.length);
                return res.send({
                    "unique": false
                })
            } else {
                //console.log(results);
                return res.send({
                    "unique": true
                });

            }

        }
    });

};


exports.isUserNameUnique = function(req, res) {
    var userName = req.body.userName;
    console.log(userName);
    User.find({
        user_name: userName

    }).limit(1).exec(function(err, results) {
        if (err) {
            return utility.handleError(res, err);
        } else {
            if (results && results.length > 0) {
                console.log(results.length);
                return res.send({
                    "unique": false
                });
            } else {
                console.log(results.length);
                return res.send({
                    "unique": true
                });
            }

        }
    });

};

exports.getUserID = function(req, res) {
    var userID = crypUtil.validateToken(req);
    if (userID) {
        return res.send({
            _id: userID
        });
    } else {
        return utility.handleAuthFailure(res);
    }
};

exports.test = function(req, res) {
    console.log('foo');
    return res.send({
        result: 'success'
    });
};

exports.getProfile = function(req, res) {
    var userID = crypUtil.validateToken(req);
    var userID2 = req.params.userID;
    if (userID && userID === userID2) {
        User.findOne({
            _id: req.params.userID
        }, function(err, data) {
            if (err) {
                return utility.handleError(res, err);
            } else {
                return res.send(data);
            }
        });
    } else {
        return utility.handleAuthFailure(res);
    }

};

exports.updateProfile = function(req, res) {
    var query = req.params.userID;
    var update = req.body;
    var userID = crypUtil.validateToken(req);
    var userID2 = req.params.userID;

    if (userID && userID === userID2) {
        User.findOneAndUpdate(query, update, function(err, data) {
            if (err) {
                return utility.handleError(res, err);
            } else {
                return res.send(data);
            }
        });
    } else {
        return utility.handleAuthFailure(res);
    }
};
