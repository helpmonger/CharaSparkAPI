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
