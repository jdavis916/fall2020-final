var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//this is a sanitize module that protects from xss attacks
var xss = require('xss-clean');
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import cors from 'cors';
//import mongoSanitize from "express-mongo-sanitize";
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

//setup express server
var app = express();

//database name
var dbName = 'copFinal';

//Loads the handlebars module
const handlebars = require('express-handlebars');
//sanitizes form data, will add next time
//app.use(xss());
//app.use(mongoSanitize());
//mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' + dbName, {
	useNewUrlParser: true, 
	useUnifiedTopology: true
});
//sanitizing form data
//app.use(mongoSanitize({ replaceWith: '_' }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//add handlebars
app.engine('hbs', handlebars({
	layoutsDir: __dirname + '/views/layouts',
	partialsDir: __dirname + '/views/partials',
	//new configuration parameter
	extname: 'hbs', 
	defaultLayout: 'main'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CORS setup
app.use(cors());

//bodyparser setup
//transpile request to usable format
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//routes
app.use('/', indexRouter);
//app.use('/users', usersRouter);

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
