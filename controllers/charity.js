var mongoose = require('mongoose');
var crypUtil = require('../services/auth/cryptoUtil');
var Charity = mongoose.model('Charity');
var utility = require('../data/Utility');

//Gets all charities, GET
exports.findAll = function(req, res) {
    var query = Charity.find({});

    //gets location information from body
    var location = req.headers.location;
    var rad = req.headers.radius;

    if (location && rad) {
        console.log('got location and rad');
        console.log('loc is: ', location);
        console.log('rad is: ', rad);
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
        query.where('gps').within().circle(area);

    }

    query.exec(function(err, results) {
        if (err) {
            return utility.handleError(res, err);
        } else {
            return res.send(results);
        }
    });
};

//Create a charity, POST
exports.add = function(req, res) {
    var userID = crypUtil.validateToken(req);
    if (userID) {
        console.log(req.body);
        Charity.create(req.body, function(err, results) {
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

//Updates charity, PUT
exports.updateCharity = function(req, res) {
    var userID = crypUtil.validateToken(req);
    if (userID) {
        var updateObj = req.body;
        Charity.findOneAndUpdate({
            _id: req.params.charityID
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

};

//Gets a specific charity, GET
exports.findCharity = function(req, res) {

    if (userID) {
        Charity.findOne({
            _id: req.params.charityID
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
