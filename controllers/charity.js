var mongoose = require('mongoose'),
Charity = mongoose.model('Charity');

//Gets all charities, GET
exports.findAll = function(req, res){
  Charity.find({},function(err, results) {
    if(err) {
      return res.status(500).send(err);
    }else{
      return res.status(200).send(results);
    }
  });
};

//Create a charity, POST
exports.add = function(req, res) {
  console.log(req.body);
  Charity.create(req.body, function (err, results) {
    if(err) {
      return res.status(500).send(err);
    }else{
      return res.status(200).send(results);
    }
  });
}

//Updates charity, PUT
exports.updateCharity = function(req, res){
  var updateObj = req.body; 
  Charity.findOneAndUpdate({_id:req.params.charityID},updateObj,function(err, results) {
    if(err) {
      return res.status(500).send(err);
    }else{
      return res.status(200).send(results);
    }
  });

};

//Gets a specific charity, GET
exports.findCharity = function(req, res){
  Charity.findOne({_id:req.params.charityID},function(err, results) {
    if(err){
      return res.status(500).send(err);
    }else{
      return res.status(200).send(results);
    }
  });
};
