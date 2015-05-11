var mongoose = require('mongoose'),
User = mongoose.model('User');

exports.findAll = function(req, res){
  res.setHeader('Access-Control-Allow-Origin','*'); 
  User.find({},function(err, results) {
    return res.send(results);
  });
};

exports.add = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  User.create(req.body, function (err, musician) {
    if (err) return console.log(err);
    return res.send(musician);
  });
};

exports.test = function(req, res){
	res.setHeader('Access-Control-Allow-Origin','*');
	console.log('foo');
	return res.send({result: 'success'});
};




exports.getProfile = function(req, res){
	res.setHeader('Access-Control-Allow-Origin','*');
	User.findOne({_id: req.params.userID}, function(err, data) {
		if(err){
			console.log('err is:', err);
			return res.send(err);
		}
		else{
			res.send(201, data);
		}
	});
};

exports.updateProfile = function(req, res){
	res.setHeader('Access-Control-Allow-Origin','*');
	var query = req.params.userID;
	var update = req.body;
	
	User.findOneAndUpdate(query, update, function(err, data){
		if(err){
			console.log('err is:', err);
			return res.send(err);
		}
		else{
			console.log('updated');
			return res.send(201, data);
		}
//		err = {};
//		res.send(err);
	});
};

