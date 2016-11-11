// Get the packages we need
var express   = require('express');
var passport = require('passport');
var api       = require('./app/routes/api');
var appRouter = require('./app/routes/appRouter');
var User = require('./app/models/user').User;
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var app = express();

// Use environment defined port or 1339
var port = process.env.PORT || 1339;

// required for passport
// session secret
app.use(session({ secret: 'ilovescotchandwhisky' }));
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());
// use connect-flash for flash messages stored in session
app.use(flash());


// read cookies (needed for auth)
app.use(cookieParser());
// get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/views', express.static(__dirname + '/app/views'));
// app.set('/views', __dirname + '/app/views1');

// set up ejs for templating
app.set('view engine', 'ejs');

require('./app/helpers/passport.js')(passport, User, LocalStrategy);
console.log('passport loaded');
// load our routes and pass in our app and fully configured passport
require('./app/routes/login.js')(app, passport);
console.log('login routes loaded');

app.use('/', express.static(__dirname + '/static'));

app.use('/styles', express.static(__dirname + '/static/styles'));
app.use('/css', express.static(__dirname + '/static/css'));
app.use('/img', express.static(__dirname + '/static/img'));
app.use('/images', express.static(__dirname + '/static/img'));
app.use('/js', express.static(__dirname + '/static/js'));

// Main routes
app.use('/', appRouter);

// Register all our routes with /api
app.use('/api/v1', api);

// Start the server
app.listen(port);
console.log('Server listening on port ' + port);

