var createError = require('http-errors');
var express = require('express');
const exphbs = require('express-handlebars'); //handlebars view engine for Express
const mongoose = require('mongoose');
const sassMidware = require('node-sass-middleware');
const browserify = require('browserify-middleware'); //module system for client side JS
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var todos = require('./routes/todos/index');
var todosAPI = require('./routes/todos/api');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos'); //todos router

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname: '.hbs', defaultLayout: 'layout'}));
app.set('view engine', 'hbs');
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

app.use(
  sassMidware({
    src: __dirname + '/sass', //compile any sass files in this dir
    dest: __dirname + '/public', //create css files in this dir
    debug: true, //log debug
  })
);

//setup Browserify to load the script.js from client dir in our proj
//and create a bundle.js w all the dependencies resolved
app.get('/javascripts/bundle.js', browserify('./client/script.js')); 

const dbConnectionString = process.env.MONGODB_URI || 'mongodb://localhost';
mongoose.connect(dbConnectionString + '/todos');

if (app.get('env') == 'development') { //set up browser-sync to be loaded only when we are in dev mode, then passing in a config obj to initialize browser-sync.
  var browserSync = require('browser-sync');
  var config = {
    files: ["public/**/*.{js,css}", "client/*.js", "sass/**/*.scss", "views/**/*.hbs"], //set up files that we want browser-sync to watch for changes
    logLevel: 'debug', //log level for the terminal
    logSnippet: false,
    reloadDelay: 3000, //delay for reloads
    reloadOnRestart: true //causes a full-refresh of the browser on server restart
  };
  var bs = browserSync(config);
  app.use(require('connect-browser-sync')(bs));
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//define all configuration BEFORE define routers.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todos', todosRouter); //set to be used by our app when incoming req has ./todos
app.use('/todos', todos);
app.use('/api/todos', todosAPI);

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
