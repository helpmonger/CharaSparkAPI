var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var mongoUri = 'mongodb://testuser:coconut1@ds061651.mongolab.com:61651/charaspark';
mongoose.connect(mongoUri);
var db = mongoose.connection;

db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});


var server = express();

var portNumber = process.env.PORT || 8080;


// server.use(restify.acceptParser(server.acceptable));
// server.use(restify.queryParser());
// server.use(restify.bodyParser());

// parse various different custom JSON types as JSON
server.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
server.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
server.use(bodyParser.text({ type: 'text/html' }))

server.set('port',portNumber);

require('./models/charity');
require('./models/wish');
require('./models/user');

require('./routes')(server);

server.listen(server.get('port'), function() {
  console.log("Node app is running at localhost:" + server.get('port'))
})




    








