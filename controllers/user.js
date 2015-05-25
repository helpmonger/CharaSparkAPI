var mongoose = require('mongoose'),
User = mongoose.model('User');

exports.findAll = function(req, res){
 	var userID = crypUtil.validateToken(req);
    if(userID) {
		User.find({},function(err, results) {
			if(err) {
		      return res.status(500).send(err);
		    }else{
		      return res.status(200).send(results);
		    }
	  });
	}
	else {
        res.status(401).send({
            message: 'You are not authorized'
        });
    }
}


exports.test = function(req, res){
	console.log('foo');
	return res.send({result: 'success'});
};

exports.getProfile = function(req, res){
	var userID = crypUtil.validateToken(req);
	var userID2 = req.params.userID;
    if(userID && userID == userID2) {
		User.findOne({_id: req.params.userID}, function(err, data) {
			if(err) {
		      return res.status(500).send(err);
		    }else{
		      return res.status(200).send(data);
		    }
		});
	}
	else {
        res.status(401).send({
            message: 'You are not authorized'
        });
    }

};

exports.updateProfile = function(req, res){
	var query = req.params.userID;
	var update = req.body;
	var userID = crypUtil.validateToken(req);
	var userID2 = req.params.userID;
	

    if(userID && userID == userID2) {
		User.findOneAndUpdate(query, update, function(err, data){
			if(err) {
		      return res.status(500).send(err);
		    }else{
		      return res.status(201).send(data);
		    }
		});
	}
	else {
        res.status(401).send({
            message: 'You are not authorized'
        });
    }
};

