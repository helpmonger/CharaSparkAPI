var mongoose = require('mongoose'),
Donation = mongoose.model('Donation');

exports.AddDonation = function(req, res) {
	Donation.create(req.body, function(err, Donation) {
		if (err) return console.log(err);
		return res.send(Donation);
	});
}

exports.findAll = function(req, res){
	Donation.find({}, function(err, results) {
		return res.send(results);
	});
}


exports.updateDonation = function(req, res){
	var updateObj = req.body;
	Donation.findOneAndUpdate({_id:req.params.donationID}, updateObj, function(err, results) {
	if(err) {
		console.log(err);
		return res.send(err);
	}else{
		return res.send(results);
	}	
});

};

exports.findDonation = function(req, res){
  Donation.findOne({_id:req.params.donationID},function(err, results) {
    if(err){
      console.log(err);
    }else{
      return res.send(results);
    }
  });
};