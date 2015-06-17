var mongoose = require('mongoose');
var Wish = mongoose.model('Wish');
var Donation = mongoose.model('Donation');
var crypUtil = require('../services/auth/cryptoUtil');
var lodash = require('lodash');
var utility = require('../data/Utility');

exports.AddWish = function(req, res) {
    var userID = crypUtil.validateToken(req);
    if (userID) {
        console.log('before adding: ', userID);
        //sets the user that created the wish
        req.body._wishMaker = userID;
        console.log('after adding: ', req.body._wishMaker);
        Wish.create(req.body, function(err, data) {
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

//fulfill a wish
exports.findAll = function(req, res) {
    console.log('headers are: ', req.headers);
    var userID = crypUtil.validateToken(req);
    if (userID) {
        console.log('the user id is: ', userID);
        //gets all wishes not are not from the current user
        var query = Wish.find({
            _wishMaker: {
                '$ne': userID
            }
        });

        //gets new wishes only
        query.where('wishStatus').equals('new');

        //gets location information from header
        var location = req.headers.location;
        var rad = req.headers.radius;
        //use 4/1/2015 as default date
        var asOfDate = new Date(2015, 4, 1);

        if (req.headers.asOfDate) {
            asOfDate = new Date(req.body.asOfDate);
            console.log('as of date is: ', asOfDate);
            query.where('createdDate').gt(asOfDate);
        }

        //if the location is set, find all wishes that are within (rad) miles within (location)
        if (location && rad) {
            console.log('got location and rad');
            console.log('loc is: ', location);
            //convert location to number array
            var locArray = location.split(',').map(function(item) {
                return parseFloat(item);
            });

            console.log('locArray is: ', locArray);
            var area = {
                    center: locArray,
                    radius: utility.milesToRadians(rad),
                    unique: true,
                    spherical: true
                };
            query.where('location').within().circle(area);

        }

        query.populate('_donation')
        .populate('_charity', 'name');

        query.exec(function(err, data) {
            if (err) {
                return utility.handleError(res, err);
            } else {
                // console.log('before filter: ', data);
                var result = lodash.filter(data, function(item) {
                    return item._donation && item._donation.paidDate;
                });
                // console.log('after filter: ', result);
                return res.send(result);
            }
        });
    } else {
        return utility.handleAuthFailure(res);
    }
};

//Updates wish, PUT
exports.updateWish = function(req, res) {
    var updateObj = req.body;
    Wish.findOneAndUpdate({
        _id: req.params.wishID
    }, updateObj, function(err, data) {
        if (err) {
            return utility.handleError(res, err);
        } else {
            return res.send(data);
        }
    });

};

//Gets a specific wish, GET
exports.findWish = function(req, res) {
    Wish.findOne({
            _id: req.params.wishID
        })
        .populate('_charity')
        .populate('_donation')
        .populate('_wishMaker', 'user_name')
        .exec(function(err, data) {
            if (err) {
                return utility.handleError(res, err);
            } else {
                return res.send(data);
            }
        });
};

// Find all wishes from one user
exports.findWishesFromUser = function(req, res) {
    var userID = crypUtil.validateToken(req);
    if (userID) {
        Wish.find({
                _wishMaker: req.params.userID
            })
            .populate('_wishMaker', 'user_name')
            .populate('_charity', 'name')
            .populate('_donation')
            .exec(function(err, data) {
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

// Find all wishes from one fulfiller
exports.findWishesFromFulfiller = function(req, res) {
    var fflID = crypUtil.validateToken(req);
    var fflID2 = req.params.fulfillerID;
    if (fflID && fflID === fflID2) {
        // console.log(fflID);
        Wish.find({
                _fulfiller: fflID
            })
        .populate('_donation')
        .populate('_charity', 'name')
            .exec(function(err, data) {
                if (err) {
                    return utility.handleError(res, err);
                } else {
                    return res.send(data);
                }
            });
    } else {
        res.status(401).send({
            message: 'You are not authorized'
        });
    }
};

// Find all paid wishes
exports.findPaidWishes = function(req, res) {
    var userID = crypUtil.validateToken(req);
    console.log(userID);
    if (userID) {
        Donation.find({
                paidDate: {
                    $ne: null
                }
            })
            .populate('_wish')
            .exec(function(err, results) {
                if (err) {
                    console.log(err);
                    return utility.handleError(res, err);
                } else {
                    return res.send(results);
                }
            });
    }
};
