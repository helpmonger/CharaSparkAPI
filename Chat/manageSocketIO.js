// var lodash = require('lodash');
var moment = require('moment');


var people = {};
var sockets = [];

module.exports = function(io) {
        io.on('connection', function(socket) {
            var counter = 0;
            console.log('CharaSpark Chat - user connected');



            socket.on('joinserver', function(user) {
                // var message = user.name + ' joined the room';
                // io.emit('update', {message: message})
                people[socket.id] = {
                    "user": user.name
                };
                console.log('joined server and people is: ', people);
                socket.emit("update", "You have connected to the server.");
                sockets.push(socket);
            });
            socket.on('disconnect', function() {
                console.log('MongerChat - user disconnected');
                // removeDisconnectedUser(socket);
            });

            socket.on('user:joined', function(user) {
                var message = user.name + ' joined the room';
                console.log('user joined');
                io.emit('user:joined', {
                    message: message,
                    time: moment()
                })

            });



            //handles msg from client
            socket.on('send', function(msgObj) {
                console.log('message: ', msgObj);
                console.log('people is: ', people);
                var found = false;
                // console.log(JSON.stringify(message));
                var whisperTo = msgObj.to;
                var whisperMsg = msgObj.message;

                //find the user to whisper to
                var keys = Object.keys(people);
                console.log('keys is: ', keys);
                if (keys.length != 0) {
                    for (var i = 0; i < keys.length; i++) {
                      console.log('name is: ', people[keys[i]].user);
                        if (people[keys[i]].user === whisperTo) {
                            var whisperId = keys[i];
                            if(io.sockets.connected[whisperId]){ //make sure the user is still connected
                                found = true;
                                break;
                            }
                            // if (socket.id === whisperId) { //can't whisper to ourselves
                            //     socket.emit("update", "You can't whisper to yourself.");
                            // }
                        }
                    }

                    if (found ) { //&& socket.id !== whisperId
                      console.log('found');
                        // socket.emit("send", { //this is no longer necessary because it always will go to the 
                        //     user_name: "You",
                        //     message: whisperMsg,
                        //   timestamp: new Date().getTime()});
                        // console.log('other sock: ', socket(whisperId));
                       
                            
                        io.sockets.connected[whisperId].emit("chatMsg", {
                            user_name: people[socket.id].name,
                            message: whisperMsg,
                            timestamp: msgObj.msTime
                        });
                        
                    } else {
                      console.log('not found');
                        socket.emit("update", "Can't find " + whisperTo);
                    }

                } else {
                  console.log('keys.length == 0');
                }

            });



        }); //end of io.on


    } //end of module.exports
