var mongoose = require('mongoose'),
Charity = mongoose.model('Charity');

//Gets all charities, GET
exports.findAll = function(req, res){
  Charity.find({},function(err, results) {
    return res.send(results);
  });
};

//Create a charity, POST
exports.add = function(req, res) {
  Charity.create(req.body, function (err, results) {
    if (err) return console.log(err);
    return res.send(results);
  });
}

//Updates charity, PUT
exports.updateCharity = function(req, res){
  var updateObj = req.body; 
  Charity.findOneAndUpdate({_id:req.params.charityID},updateObj,function(err, results) {
    if(err){
      console.log(err);
      return res.send(err);
    }else{
       return res.send(results);
     }   
  });

};

//Gets a specific charity, GET
exports.findCharity = function(req, res){
  Charity.findOne({_id:req.params.charityID},function(err, results) {
    if(err){
      console.log(err);
    }else{
      return res.send(results);
    }
  });
};
