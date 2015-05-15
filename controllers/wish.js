var mongoose = require('mongoose');
var Wish = mongoose.model('Wish');

exports.AddWish = function(req, res) {
  Wish.create(req.body, function (err, Wish) {
    if (err) return console.log(err);
    return res.send(Wish);
  });
}

exports.findAll = function(req, res){

    Wish.find({},function(err, results) {
        return res.send(results);
    });
};


//Updates wish, PUT
exports.updateWish = function(req, res){
  var updateObj = req.body; 
  Wish.findOneAndUpdate({_id:req.params.wishID},updateObj,function(err, results) {
    if(err){
      console.log(err);
      return res.send(err);
    }else{
       return res.send(results);
     }   
  });

};

//Gets a specific wish, GET
exports.findWish = function(req, res){
  Wish.findOne({_id:req.params.wishID},function(err, results) {
    if(err){
      console.log(err);
    }else{
      return res.send(results);
    }
  });
};

// exports.All = function(req , res , next){
 
 
//     // console.log('User id is: ', req.params._id);

//     //1. get id from request parameter
//     //2. find wishes by passing id of request parameter to the user collection 
//     //3. handle the success and failure from the find method
//     //4. call res.send to return the json data of the wishes for that user id

//     //var userwishesfromdb;

//         Wish.findOne({hasPaid: 'true', wishStatus: 'new'}, function(err, data){
//     	if(err){
//     		console.log('err is: ', err);
//     		return next(err);
//     	}
//     	else {
//     		//userwishesfromdb = data;
//     		console.log('data is ', data);
//     		res.send(201 , data);

//     	}
//     });
// }

exports.GetDonations = function(req , res , next){
    var user = {};
 
 
    console.log('User id is: ', req.params._id);


        wishes.find({userid:req.params._id}, function(err, data){
    	if(err){
    		console.log('err is: ', err);
    		return next(err);
    	}
    	else {
    		console.log('data is ', data);
    		if(data.amount > 0)
    		{
    		res.send(201 , data);
    	}

    	}
    });
} 


exports.Fulfillments = function(req , res , next){
    var user = {};
 
 
    // console.log('User id is: ', req.params._id);


        wishes.find({ fulfiller: { $exists: true } }, function(err, data){
    	if(err){
    		console.log('err is: ', err);
    		return next(err);
    	}
    	else { 
    		console.log('data is ', data);
    		if(data.wishstatus == "Fulfilled")
    		{
    		res.send(201 , data);
    	}

    	}
    });
} 


exports.GetPaidWishes = function(req , res , next){
    var user = {};
 
 
    console.log('User id is: ', req.params._id);


        wishes.find({userid:req.params._id}, function(err, data){
    	if(err){
    		console.log('err is: ', err);
    		return next(err);
    	}
    	else { 
    		console.log('data is ', data);
    		if(data.donationstatus == "Completed")
    		{
    		res.send(201 , data);
    	}

    	}
    });
} 

// db.collection.update( { "_id.authorID": 1 },
//    { "name": "Robert Frost" },
//    { upsert: true } )
// 1. it will read the wish id from the request
// 2. it will update the wish as paid

exports.UpdateWishAsPaid = function(req , res , next){
    req.params.postedOn = new Date();
    wishes.update( 
    	{ _id: req.params.wishid,
		    status: 'paid',
		    upsert: true }, function(err , success){
        console.log('Response success ', success);
        console.log('Response error ', err);
        if(success){
            res.send(201 , wishes);
            return next();
        }
        else{
            return next(err);
        }

         });
	}