var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

//dbConfig

//mongoose
var dbURI = 'mongodb://admin:1234@ds145828.mlab.com:45828/voting';
var mongoose = require('mongoose');
mongoose.connect(dbURI);

//When Connected
mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + dbURI );
});

//when error
mongoose.connection.on('error', function() {
  console.log('Mongoose defualt connection error');
});

//when disconnection
mongoose.connection.on('disconnected', function() {
  console.log("Mongoose default connection disconnected");
});
//end mongoose


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
