var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cryptUtil = require('./services/auth/cryptoUtil');




var mongoUri = 'mongodb://testuser:coconut1@ds061651.mongolab.com:61651/charaspark';
// var mongoUri = 'mongodb://mUser:test123@127.0.0.1:27017/charaspark';
mongoose.connect(mongoUri);
var db = mongoose.connection;

db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});


var app = express();

var portNumber = process.env.PORT || 8080;


// app.use(restify.acceptParser(app.acceptable));
// app.use(restify.queryParser());
// app.use(restify.bodyParser());

// parse various different custom JSON types as JSON
// app.use(bodyParser.json({ type: 'application/*+json' }))

// // parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// // parse an HTML body into a string
// app.use(bodyParser.text({ type: 'text/html' }))

app.use(bodyParser.urlencoded({
	extended: true
}));


app.use(bodyParser.json());
app.use(passport.initialize());

// app.use(express.cookieParser('keyboard cat'));
app.use(cookieParser());
// app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(session({
  genid: function(req) {
    return cryptUtil.genuuid(); // use UUIDs for session IDs
  },
  secret: 'keyboard cat'
}))
app.use(flash());

//alliow cross origin requests
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
});


passport.serializeUser(function (user, done) {
	done(null, user.id);
});


require('./models/charity');
require('./models/wish');
require('./models/donation');
require('./models/user');


var localStrategy = require('./services/auth/localAuth');
passport.use('local-register', localStrategy.register);
passport.use('local-login', localStrategy.login);


app.set('port',portNumber);



require('./routes')(app);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})




    








