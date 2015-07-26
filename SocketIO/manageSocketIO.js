
// var lodash = require('lodash');

module.exports = function (io) {



io.use(function(socket, next) {
  var handshakeData = socket.request;
  console.log('query is: ', Object.keys(handshakeData._query)[0]);
  // addConnectedUser(socket, Object.keys(handshakeData._query)[0]);

  // console.log('handshakedata ', handshakeData._query);
  // make sure the handshake data looks good as before
  // if error do this:
    // next(new Error('not authorized');
  // else just call next
  next();
});

io.on('connection', function(socket){
  var counter = 0;
  console.log('CharaSpark Chat - user connected');

  socket.on('disconnect', function(){
      console.log('MongerChat - user disconnected');
      // removeDisconnectedUser(socket);
  });

  socket.on('user:joined', function(user) {
    var message = user.name + ' joined the room';
    io.emit('user:joined', {message: message, time: moment() })
  });


  socket.on('message:send', function(message){
    console.log('message: ' + message);
    console.log(JSON.stringify(message));
   
  });



  }); //end of io.on


} //end of module.exports




	














