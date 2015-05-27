var mongoose = require('mongoose');
var Wish = mongoose.model('Wish');
var crypUtil = require('../services/auth/cryptoUtil');
var utility = require('../data/Utility');

exports.AddWish = function(req, res) {
    var userID = crypUtil.validateToken(req);
    if(userID) {
      //sets the user that created the wish
      req.body._wishMaker = userID;
      Wish.create(req.body, function (err, data) {
        if(err) {
          return utility.handleError(res);;
        }else{
          return res.send(data);
        }
      });
    }
    else {
        return utiity.handleAuthFailure(res);
    }
}

exports.findAll = function(req, res){
  console.log("req is: ", req);

  console.log('')
  //declares a new date as 4/1/2015
  var query = Wish.find({});
  
  //check for location information
  var location = req.body.startingLoc;
  var rad = req.body.radius;
  var asOfDate = new Date(2015, 4, 1); 

  if(req.body.asOfDate){
    asOfDate = new Date(res.body.asOfDate);
    console.log('as of date is: ', asOfDate);
    query.where('createdDate').gt(asOfDate);
  }

  if(location && radius){
      var area = { center: location, radius: rad, unique: true, spherical: true }
      query.where('location').within().circle(area)
  }

    query.exec(function(err, data) {
        if(err) {
          return utility.handleError(res);;
        }else{
          return res.send(data);
        }
    });
};


//Updates wish, PUT
exports.updateWish = function(req, res){
    var updateObj = req.body; 
    Wish.findOneAndUpdate({_id:req.params.wishID},updateObj,function(err, data) {
        if(err) {
          return utility.handleError(res);;
        } else{
          return res.send(data);
        }
    });

};

//Gets a specific wish, GET
exports.findWish = function(req, res){
    Wish.findOne({_id:req.params.wishID},function(err, data) {
        if(err) {
          return utility.handleError(res);;
        }else{
          return res.send(data);
        }
    });
};


// Find all wishes from one user
exports.findWishesFromUser = function(req, res){
  var userID = crypUtil.validateToken(req);
    if(userID) {
  	  Wish.find({_wishMaker: req.params.userID})
  	  .populate('_wishMaker', 'user_name')
  //	  .populate('_charity', 'name')
  	  .exec(function(err, data) {
  	    if(err) {
            return utility.handleError(res);;
          }else{
            return res.send(data);
          }
  	  });
    }
     else {
        return utiity.handleAuthFailure(res);
    }
	}

// Find all wishes from one fulfiller
exports.findWishesFromFulfiller = function(req, res){
  var fflID = crypUtil.validateToken(req);
  var fflID2 = req.params.fulfillerID;
  if(fflID && fflID==fflID2){  
    console.log(fflID);
    Wish.find({_fulfiller: fflID})
    .exec(function(err, data) {
      if(err) {
          return utility.handleError(res);;
        }else{
          return res.send(data);
        }
	  });
  }else{
    res.status(401).send({
      message:'You are not authorized'
    });
  }
}

// Find all paid wishes
exports.findPaidWishes = function(req, res){
  var userID = crypUtil.validateToken(req);
  console.log(userID);
  if(userID){
    Donation.find({paidDate:{$ne:null}})
    .populate(_wish)
        .exec(function(err, results) {
      if(err){
        console.log(err);
        return utility.handleError(res);;
      }else{
        return res.send(results);
  }
  });
  }
}

