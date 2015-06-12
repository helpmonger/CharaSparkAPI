var mongoose = require('mongoose'),
    Donation = mongoose.model('Donation');
var crypUtil = require('../services/auth/cryptoUtil');
var lodash = require('lodash');
var utility = require('../data/Utility');
var errorCodes = utility.ErrorCodes;

exports.addDonation = function(req, res) {
    var userID = crypUtil.validateToken(req);
    if (userID) {
        //assigns the user as the donor
        req.body._donor = userID;
        Donation.create(req.body, function(err, results) {
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

exports.findAll = function(req, res) {
    Donation.find({}, function(err, results) {
        if (err) {
            return utility.handleError(res, err);
        } else {
            return res.send(results);
        }
    });
};

exports.updateDonation = function(req, res) {
    var userID = crypUtil.validateToken(req);
    if (userID) {
        var updateObj = req.body;
        Donation.findOneAndUpdate({
            _id: req.params.donationID
        }, updateObj, function(err, results) {
            if (err) {
                return utility.handleError(res, err);
            } else {
                return res.send(results);
            }
        });
    } else {
        return utility.handleAuthFailure(res);
    }
}
//
exports.findDonation = function(req, res) {
    var userID = crypUtil.validateToken(req);
    if (userID) {
        Donation.findOne({
            _id: req.params.donationID
        }, function(err, results) {
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

//Find all donations from one user
exports.findDonationsFromUser = function(req, res) {

    var userID = crypUtil.validateToken(req);
    if (userID) {
        Donation
            .find({
                _donor: userID
            })
            .populate('_donor', 'user_name')
            //	  .populate('_charity', 'name')
            .exec(function(err, results) {
                if (err) {
                    console.log(err);
                    return utility.handleError(res, err);
                } else {
                    var total = lodash.sum(results, function(data) {
                        return data.amount;
                    });
                    //console.log(total);
                    return res.status(200).send({
                        "listOfDonation": results,
                        "totalDonation": total
                    });
                }
            });

    } else {
        return utility.handleAuthFailure(res);
    }
};



//Find the donation for a specific wish 
exports.findDonationForWish = function(req, res) {
    var userID = crypUtil.validateToken(req);
    if (userID) {
        Donation
            .find({
                _wish: req.params.wishID
            })
            .exec(function(err, results) {
                if (err) {
                    console.log(err);
                    return utility.handleError(res, err);
                } else {
                    return res.send(results);
                }
            });
    } else {
        return utility.handleAuthFailure(res);
    }
};

//Find all donations from one charity
exports.findDonationsFromCharity = function(req, res) {
    var userID = crypUtil.validateToken(req);
    if (userID) {
        Donation
            .find({
                _charity: req.params.charityID,
                paidDate: {
                    $ne: null
                }
            })
            .exec(function(err, results) {
                if (err) {
                    console.log(err);
                    return utility.handleError(res, err);
                } else {
                    var total = lodash.sum(results, function(data) {
                        return data.amount;
                    });
                    //console.log(total);
                    return res.send({
                        'listOfDonation': results,
                        'totalDonation': total
                    });
                }
            });
    } else {
        return utility.handleAuthFailure(res);
    }
};
