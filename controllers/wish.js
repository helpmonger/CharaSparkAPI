var mongoose = require('mongoose');
var Wish = mongoose.model('Wish');
var crypUtil = require('../services/auth/cryptoUtil');

exports.AddWish = function(req, res) {
    var userID = crypUtil.validateToken(req);
    if(userID) {
      //sets the user that created the wish
      req.body._wishMaker = userID;
      Wish.create(req.body, function (err, data) {
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
}

exports.findAll = function(req, res){

    Wish.find({},function(err, data) {
        if(err) {
          return res.status(500).send(err);
        }else{
          return res.status(200).send(data);
        }
    });
};


//Updates wish, PUT
exports.updateWish = function(req, res){
    var updateObj = req.body; 
    Wish.findOneAndUpdate({_id:req.params.wishID},updateObj,function(err, data) {
        if(err) {
          return res.status(500).send(err);
        } else{
          return res.status(201).send(data);
        }
    });

};

//Gets a specific wish, GET
exports.findWish = function(req, res){
    Wish.findOne({_id:req.params.wishID},function(err, data) {
        if(err) {
          return res.status(500).send(err);
        }else{
          return res.status(201).send(data);
        }
    });
};


// Find all wishes from one user
exports.findWishesFromUser = function(req, res){
	  Wish.find({_wishMaker: req.params.userID})
	  .populate('_wishMaker', 'user_name')
//	  .populate('_charity', 'name')
	  .exec(function(err, data) {
	    if(err) {
          return res.status(500).send(err);
        }else{
          return res.status(201).send(data);
        }
	  });
	}
