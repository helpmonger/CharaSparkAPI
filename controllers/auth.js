var mongoose = require('mongoose'),
// jwt = require('jsonwebtoken'),
User = mongoose.model('User'),
passport = require('passport');


exports.SignUp = function(req, res){
    // res.setHeader('Access-Control-Allow-Origin','*');
    console.log('in signup');
    
    res.setHeader('Access-Control-Allow-Origin','*');
 
    User.create(req.body, function(err, results){
    	if(err){
    		return console.log(err);
    	}
    	else{
    		return res.send(201, results);
    	}
    	
    });
} //end of sign up

exports.Login = function(req, res){
    // res.setHeader('Access-Control-Allow-Origin','*');
	userName = req.body.user_name;	
	
    User.findOne({user_name:userName}, function(err, data){
    	
    	if(err){
    		console.log('err is: ', err);
    		return res.send(err);
    	}
    	else {
    		userPass = req.body.password;
    		if(data != null && data.password == userPass){
    			return res.send(200, {result: 'true'});
    		}
    		else{
    			return res.send(200, {result: 'false'});
    		}

    	}
    });

} //end of login