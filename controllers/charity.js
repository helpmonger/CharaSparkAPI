var mongoose = require('mongoose'),
Charity = mongoose.model('Charity');
var utility = require('../data/Utility');

//Gets all charities, GET
exports.findAll = function(req, res){
  Charity.find({},function(err, results) {
    if(err) {
      return utility.handleError(res);
    }else{
      return res.send(results);
    }
  });
};

//Create a charity, POST
exports.add = function(req, res) {
  var userID = crypUtil.validateToken(req);
  if(userID) {
    console.log(req.body);
    Charity.create(req.body, function (err, results) {
      if(err) {
        return utility.handleError(res);
      }else{
        return res.send(results);
      }
    });
  }
  else {
    return utility.handleAuthFailure(res);
  }

}

//Updates charity, PUT
exports.updateCharity = function(req, res){
  var userID = crypUtil.validateToken(req);
    if(userID) {
      var updateObj = req.body; 
      Charity.findOneAndUpdate({_id:req.params.charityID},updateObj,function(err, results) {
        if(err) {
          return utility.handleError(res);
        }else{
          return res.send(results);
        }
      });
  }
  else {
    return utility.handleAuthFailure(res);
  }

};

//Gets a specific charity, GET
exports.findCharity = function(req, res){

  if(userID) {
    Charity.findOne({_id:req.params.charityID},function(err, results) {
      if(err){
        return utility.handleError(res);
      }else{
        return res.send(results);
      }
    });
  }
  else {
    return utility.handleAuthFailure(res);
  }

};
