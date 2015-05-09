var mongoose = require('mongoose'),
User = mongoose.model('User');

exports.findAll = function(req, res){
  User.find({},function(err, results) {
    return res.send(results);
  });
};

exports.add = function(req, res) {
  User.create(req.body, function (err, musician) {
    if (err) return console.log(err);
    return res.send(musician);
  });
}

exports.test = function(req, res){
	console.log('foo');
	return res.send({result: 'success'});
};
	