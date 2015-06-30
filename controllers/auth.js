var mongoose = require('mongoose'),
    // jwt = require('jsonwebtoken'),
    User = mongoose.model('User'),
    passport = require('passport'),
    utility = require('../data/Utility'),
    cryptoUtil = require('../services/auth/cryptoUtil');


//this method is no longer in use. 
//See /services/auth/localAuth instead
exports.Register = function(req, res) {
        // res.setHeader('Access-Control-Allow-Origin','*');
        console.log('in signup');
        console.log('req body is: ', req.body);
        User.create(req.body, function(err, results) {
            if (err) {
                return console.log(err);
            } else {
                return res.send(201, results);
            }

        });
    } //end of sign up

//this method is no longer in use. 
//See /services/auth/localAuth instead
exports.Login = function(req, res) {

    userName = req.body.user_name;

    User.findOne({
        user_name: userName
    }, function(err, data) {

        if (err) {
            console.log('err is: ', err);
            return res.send(err);
        } else {
            userPass = req.body.password;
            if (data != null && data.password == userPass) {
                return res.send(200, {
                    result: 'true'
                });
            } else {
                return res.send(200, {
                    result: 'false'
                });
            }

        }
    });

}; //end of login

exports.Activate = function(req, res) {
    var activation = req.params.activation;
    if (activation) {
        var userID = cryptoUtil.deCodeID(activation);
        var update = {
            status: 'active'
        };

        //see if the user has already been activated
        User.findOne({
                _id: userID,
                status: {
                    '$ne': 'pending'
                },
            },
            function(err, data) {
                console.log('date is: ', data);
                if (data) { //the user is already activated
                    return res.send({
                        activated: false
                    });
                } else { //the user needs to be activated
                    User.findOneAndUpdate({
                        _id: userID
                    }, update, function(err, data) {
                        if (err) {
                            return utility.handleError(res, err);
                        } else {
                            return res.send({
                                activated: true
                            });
                        }
                    });
                }
            });
    } else {
        return utility.handleError(res, 'the activation is missing');
    }
};
