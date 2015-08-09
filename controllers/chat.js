var mongoose = require('mongoose');
var Chat = mongoose.model('Chat');
var ChatSession = mongoose.model('ChatSession');
var utility = require('../data/Utility');

//Gets all chats for the specified user
exports.findChatHistoryForUser = function(req, res) {

    //find all chat sessions associated with the user
    console.log('the user id: ', req.params.userID);
    var query = ChatSession.find({users: req.params.userID});

    //next populate the messages in each session
    
    query.where()
    //the json should look something like this: 
    {
        date: '7/5/16',
        lastMessage: 'hey you',
        avatarUrl: 'www.gravatar.com/blah'
    }


    //we want to get only 1 session with each different user

    //make the chat session only have one id


    //gets location information from body
    var location = req.headers.location;
    var rad = req.headers.radius;

    if (location && rad) {
        console.log('got location and rad');
        console.log('loc is: ', location);
        console.log('rad is: ', rad);
        //convert location to number array
        var locArray = location.split(',').map(function(item) {
            return parseFloat(item);
        });

        console.log('locArray is: ', locArray);

        var area = {
                center: locArray,
                radius: utility.milesToRadians(rad),
                unique: true,
                spherical: true
            };
        query.where('gps').within().circle(area);

    }

    query.exec(function(err, results) {
        if (err) {
            return utility.handleError(res, err);
        } else {
            return res.send(results);
        }
    });
};
