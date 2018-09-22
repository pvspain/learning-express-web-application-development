var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var stylus = require('stylus');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var findOrCreateProfile = require('./findOrCreateProfile');

var routes = require('./routes/index');
var contacts = require('./routes/contacts');
var auth = require('./routes/auth');
var CallbackDomain = process.env.CALLBACK_DOMAIN || 'http://localhost:3000';
var MongoURI = process.env.MONGODB_URI || 'mongodb://localhost/testdb';
mongoose.connect(MongoURI, function(err, res) {
    if(err) {
        console.log('ERROR connecting to: ' + MongoURI + '. ' + err);
    } else {
        console.log('MongoDB connected successfully to ' + MongoURI);
    }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    store: new MongoStore({url: MongoURI}), 
    secret: 'learn node', 
    resave: true, 
    saveUninitialized: false
}));
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

var Account = require('./models/account');
// passport.use(Account.createStrategy());

passport.use(new TwitterStrategy({
    consumerKey: '...',
    consumerSecret: '...',
    callbackURL: CallbackDomain + "/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    findOrCreateProfile({twitterId: profile.id}, profile, done);
  }
));

passport.use(new FacebookStrategy({
    clientID: '...',
    clientSecret: '...',
    callbackURL: CallbackDomain + "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    findOrCreateProfile({facebookId: profile.id}, profile, done);
  }
));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/', routes);
app.use('/contacts/', contacts);
app.use('/auth/', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
