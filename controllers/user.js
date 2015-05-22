var mongoose = require('mongoose'),
User = mongoose.model('User');

exports.findAll = function(req, res){
	User.find({},function(err, results) {
		if(err) {
	      return res.status(500).send(err);
	    }else{
	      return res.status(200).send(results);
	    }
  });
};

exports.add = function(req, res) {
  User.create(req.body, function (err, data) {
    if(err) {
	      return res.status(500).send(err);
    }else{
      return res.status(201).send(data);
    }
  });
};

exports.test = function(req, res){
	console.log('foo');
	return res.send({result: 'success'});
};

exports.getProfile = function(req, res){
	User.findOne({_id: req.params.userID}, function(err, data) {
		if(err) {
	      return res.status(500).send(err);
	    }else{
	      return res.status(200).send(data);
	    }
	});
};

exports.updateProfile = function(req, res){
	var query = req.params.userID;
	var update = req.body;
	
	User.findOneAndUpdate(query, update, function(err, data){
		if(err) {
	      return res.status(500).send(err);
	    }else{
	      return res.status(201).send(data);
	    }
//		err = {};
//		res.send(err);
	});
};

