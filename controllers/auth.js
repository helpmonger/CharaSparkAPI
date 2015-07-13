var mongoose = require('mongoose'),
    // jwt = require('jsonwebtoken'),
    User = mongoose.model('User'),
    passport = require('passport'),
    utility = require('../data/Utility'),
    cryptoUtil = require('../services/auth/cryptoUtil'),
    emailUtil = require('../services/auth/emailUtil'),
    bcrypt = require('bcrypt-nodejs');

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

exports.ChangePassword = function(req, res) {
	
    var userName = req.body.user_name;
    var newPassword = req.body.newPass;
    var oldPassword = req.body.oldPass;
    var userID = req.body._id
    
    var searchUser = {
    		user_name: userName
    };
    
//    res.send('running ChangePassword', newPassword + '/' + oldPassword + "/" + userName);
    
    User.findOne(searchUser, function(err, user){
    	if(err){
    		res.send('error');
    	}
    	
    	else{
            user.comparePasswords(oldPassword, function(err, isMatch) {
              if (err) res.send('error');
              if (!isMatch) res.send({errorMsg: 'username/password not match'});   
              else {
            	  // Okay to update the password
            	  
            	  cryptoUtil.hashPassword(newPassword).then(function(data, err) {
                      if (err) {
                          return res.send({
                              success: false
                          });
                      } else {
                          hashedNewPassword = data;
                    	  var update = {
                    			  password: hashedNewPassword
                    	  };
                    	  
                    	  User.findOneAndUpdate({
                    		  _id: userID
                    	  }, update, function(err, data) {
                              if (err) {
                                  res.send({errorMsg: 'error update'});
                              } else {
                                  res.send({
                                      success: true
                                  });
                              }
                    	  });                          
                      }
                  }); // end of hashPassword        	  
              } // end of else
            }); // end of comparePasswords
            
            }
    	
    });
    

    
}; // end of ChangePassword


exports.Activate = function(req, res) {
    var activation = req.body.activation;
    console.log('activation is: ', activation);

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


//the workflow: 
//first the user clicks forgot password link in app
//the app posts the email to the forgotpassword API
//which will hash the userID and send the user an email with a password reset link. 
//when the user click on the link, it will go to the website (front-end)
//which will parse the hash and post it to the ResetPassword API. 
//Finally the website will get a response and display the corresponding confirmation page


exports.ForgotPassword = function(req, res) {
    var email = req.body.email;

    User.findOne({
            email: email
        },
        function(err, dbUser) {
            if (dbUser) {

                //updates  forgotPassword = true
                var update = {
                        "forgotPassword": true
                    }
                    //sets the forgotPassword flag = true
                User.findOneAndUpdate({
                    email: email
                }, update, function(err, data) {
                    if (err) {
                        return utility.handleError(res, err);
                    }
                });

                //generate the hash and send the password reset link
                var hash = cryptoUtil.hashID(dbUser._id);
                emailUtil.sendPasswordReset(dbUser, hash);
            }

            //send back a 200 response regardless if user is found
            res.send();

        });
};

//determine if the user is allowed to reset the password.

exports.CanResetPassword = function(req, res) {
    var hash = req.body.resetHash;
    var newPassword = req.body.password;

    if (hash) {
        var userID = cryptoUtil.deCodeID(hash);

        //check if the forgotPassword = true
        User.findOne({
                _id: userID,
                forgotPassword: false
            },
            function(err, data) {
                if (data) { //forgotPassword = false which means the user did not requested to reset password
                    return res.send({
                        success: false
                    });
                } else { //we need to reset user's password
                    return res.send({
                        success: true
                    });
                }
            });
    }
};

exports.ResetPassword = function(req, res) {
    var hash = req.body.resetHash;
    var newPassword = req.body.newPassword;

    if (!newPassword) {
        console.log('the new password cannot be null');
        return;
    }


    if (hash) {
        var userID = cryptoUtil.deCodeID(hash);

        //check if the forgotPassword = true
        User.findOne({
                _id: userID,
                forgotPassword: false
            },
            function(err, data) {
                if (data) { //forgotPassword = false which means the user did not request to reset password
                    return res.send({
                        success: false
                    });
                } else { //we need to reset user's password

                    //first hash the password
                    cryptoUtil.hashPassword(newPassword).then(function(data, err) {
                        if (err) {
                            return res.send({
                                success: false
                            });
                        } else {
                            newPassword = data;
                        }
                    });
                    var update = {
                        password: newPassword,
                        forgotPassword: false
                    };

                    User.findOneAndUpdate({
                        _id: userID
                    }, update, function(err, data) {
                        if (err) {
                            return utility.handleError(res, err);
                        } else {
                            return res.send({
                                success: true
                            });
                        }
                    });
                }
            });
    }
};
