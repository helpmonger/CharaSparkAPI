var mongoose = require('mongoose'),
Donation = mongoose.model('Donation');
var crypUtil = require('../services/auth/cryptoUtil');
var lodash = require('lodash');

exports.addDonation = function(req, res) {
	Donation.create(req.body, function(err, results) {
		if(err) {
	      return res.status(500).send(err);
	    }else{
	      return res.status(200).send(results);
	    }
	});
}

exports.findAll = function(req, res){
	Donation.find({}, function(err, results) {
		if(err) {
	      return res.status(500).send(err);
	    }else{
	      return res.status(200).send(results);
	    }
	});
}


exports.updateDonation = function(req, res){
	var updateObj = req.body;
	Donation.findOneAndUpdate({_id:req.params.donationID}, updateObj, function(err, results) {
		if(err) {
	      return res.status(500).send(err);
	    }else{
	      return res.status(200).send(results);
	    }	
});

};

exports.findDonation = function(req, res){
  Donation.findOne({_id:req.params.donationID},function(err, results) {
    	if(err) {
	      return res.status(500).send(err);
	    }else{
	      return res.status(200).send(results);
	    }
  });
};

//Find all donations from one user
exports.findDonationsFromUser = function(req, res){
	  Donation
	  .find({_donor: req.params.userID})
	  .populate('_donor', 'user_name')
//	  .populate('_charity', 'name')
	  .exec(function(err, results) {
	    if(err){
	      console.log(err);
	      return res.status(500).send(err);
	    }else{
	      return res.status(200).send(results);
	    }
  });
}; 



//Find the donation for a specific wish 
exports.findDonationForWish = function(req, res){
	var userID = crypUtil.validateToken(req);
	if(userID){
	  Donation
	  .find({_wish:req.params.wishID)
	  .exec(function(err, results) {
	    if(err){
	      console.log(err);
	      return res.status(500).send(err);
	    }else{
	      return res.status(200).send(results);
	    }
 	  });
	}else{
		res.status(401).send({
			message:'You are not authorized'
		});
	}
}; 

//Find all donations from one charity
exports.findDonationsFromCharity = function(req, res){
	var userID = crypUtil.validateToken(req);
	if(userID){
	  Donation
	  .find({_charity:req.params.charityID,paidDate:{$ne:null}})
	  .exec(function(err, results) {
	    if(err){
	      console.log(err);
	      return res.status(500).send(err);
	    }else{
	      var total = lodash.sum(results,function(data){
	    		return data.amount;
	    		});	
	      //console.log(total);
	      return res.status(200).send({"listOfDonation":results,"totalDonation":total});
	    }
 	  });
	}else{
		res.status(401).send({
			message:'You are not authorized'
		});
	}
}; 