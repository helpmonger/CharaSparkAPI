var mongoose = require('mongoose'),
Charity = mongoose.model('Charity');

exports.findAll = function(req, res){
  Charity.find({},function(err, results) {
    return res.send(results);
  });
};

exports.add = function(req, res) {
  Charity.create(req.body, function (err, results) {
    if (err) return console.log(err);
    return res.send(results);
  });
}
