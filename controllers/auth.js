var mongoose = require('mongoose'),
jwt = require('jsonwebtoken'),
User = mongoose.model('User');


exports.SignUp = function(req, res){
    console.log('in signup');
    var user = {};
    user.password = req.params.password;
    user.user_name = req.params.user_name;
    user.email = req.params.email;
    user.postedOn = new Date();
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    User.save(user , function(err , success){
        console.log('Response success ', success);
        console.log('Response error ', err);
        if(success){
            return res.status(201).send(user);
        }else{
            return res.status(409).send(err);
        }
    });
} //end of sign up

exports.Login = function(req, res){
    console.log('in login');
    var user = {};
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    console.log('User name is: ', req.params.user_name);
    var userfromdb;
    User.findOne({user_name:req.params.user_name}, function(err, data){
    	if(err){
    		console.log('err is: ', err);
    		return res.status(409).send(err);
    	}
    	else {
    		userfromdb = data;
    		console.log('data is ', data);
    		// res.send(201 , data);
    		if(req.params.password == data.password)
    		{
    			console.log("log in successfull");
    			data.success = true;
    			return res.status(201).send(data);
    		}
    		else
    		{
    			var errorObj = {
			    	error: 'incorrect password'
			    };
    			console.log("log in failed");
    			data.success = false;
    			data.password = "";
    			data.email = "";
    			return res.status(201).send(data);
    		}
    	}
    });

} //end of login