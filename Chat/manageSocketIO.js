var lodash = require('lodash');
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
                if(AddUser(user, socket)){
                    SendUserJoinUpdate(socket);
                }
            });
            socket.on('disconnect', function() {
                RemoveUser(socket);
                SendUserLeaveUpdate(socket);
            });

            socket.on('user:joined', function(user) {
                var message = user.name + ' joined the room';
                console.log('user joined');
                io.emit('user:joined', {
                    message: message,
                    time: moment()
                });

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
                            if (io.sockets.connected[whisperId]) { //make sure the user is still connected
                                found = true;
                                break;
                            }
                            // if (socket.id === whisperId) { //can't whisper to ourselves
                            //     socket.emit("update", "You can't whisper to yourself.");
                            // }
                        }
                    }

                    if (found) { //&& socket.id !== whisperId
                        console.log('found');
                        socket.emit("send", {
                            user_name: "You",
                            message: whisperMsg,
                            timestamp: new Date().getTime()
                        });
                        console.log('other sock: ', socket(whisperId));


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

            function AddUserToPeople(user) {
                people[socket.id] = {
                    "user": user.name
                };
            }

            function AddUserToSocket(socket) {
                sockets.push(socket);
            }

            function SendUserJoinUpdate(socket) {
                socket.emit("update", "You have connected to the server.");
            }

            function IsUserUnique(user) {
                var result = lodash.findWhere(people, {
                    'user': user.name
                });
                console.log('user is: ', user); 
                console.log('people are: ', people);
                console.log('result is: ', result);
                return !result;
            }

            function AddUser(user, socket) {
                if (IsUserUnique(user)) {
                    AddUserToPeople(user);
                    AddUserToSocket(socket);
                    return true;
                } else {
                    console.log('cannot add duplicate user!');
                    return false;
                }
            }


            function RemoveUserFromPeople(socket) {
                people[socket.id] = '';
            }

            function RemoveUserFromSocket(socket) {
                var index = sockets.indexOf(socket);
                if (index > -1) {
                    sockets.splice(index, 1);
                }
            }

            function SendUserLeaveUpdate(socket) {
                io.emit("update", "User has disconnected");
                console.log('MongerChat - user disconnected');
            }

            function RemoveUser(socket) {

                RemoveUserFromPeople(socket);
                RemoveUserFromSocket(socket);
                SendUserLeaveUpdate();
            }

        }); //end of io.on


    } //end of module.exports
