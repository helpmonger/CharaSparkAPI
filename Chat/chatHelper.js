var mongoose = require('mongoose'),
    moment = require('moment'),
    Chat = mongoose.model('Chat'),
    ChatSession = mongoose.model('ChatSession');


//this will return the existing chat session between two users
//or generate a new chat session.
exports.getSession = function(users) {
    ChatSession.find({
    	users: {
    		$all: users
    	},
        //     user1: {
        //         $in: users
        //     }
        // }, $and: {
        //     user2: {
        //         $in: users
        //     }
        // },
        function(err, data) {
            if (err) {
                return utility.handleError(res, err);
            } else {
                //if we find the session, check the timestamp to see if it's good
                if (moment().diff(data.timestamp, 'days') > 7) {
                    //create new session
                    var newSession = {
                    	user1: users[0],
                    	user2: users[1]
                    }
                    ChatSession.create(newSession, function(err, data) {
                        if (err) {
                            return utility.handleError(res, err);
                        } else {
                            return res.send(data);
                        }
                    });
                } else {
                    //return current sesison
                    return data._id;
                }


            };
        });


};
