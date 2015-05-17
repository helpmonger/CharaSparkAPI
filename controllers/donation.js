var mongoose = require('mongoose'),
Donation = mongoose.model('Donation');

exports.addDonation = function(req, res) {
	Donation.create(req.body, function(err, results) {
		if(err) {
	      return res.send(500,err);
	    }else{
	      return res.send(200,results);
	    }
	});
}

exports.findAll = function(req, res){
	Donation.find({}, function(err, results) {
		if(err) {
	      return res.send(500,err);
	    }else{
	      return res.send(200,results);
	    }
	});
}


exports.updateDonation = function(req, res){
	var updateObj = req.body;
	Donation.findOneAndUpdate({_id:req.params.donationID}, updateObj, function(err, results) {
		if(err) {
	      return res.send(500,err);
	    }else{
	      return res.send(200,results);
	    }	
});

};

exports.findDonation = function(req, res){
  Donation.findOne({_id:req.params.donationID},function(err, results) {
    	if(err) {
	      return res.send(500,err);
	    }else{
	      return res.send(200,results);
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
	    }else{
	      return res.send(results);
	    }
  });
};