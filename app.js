var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var mysql = require('mysql');
var connection = require('express-myconnection');

var index = require('./routes/index');
var home = require('./routes/home');
var addArticle = require('./routes/addArticle');
var viewArticle = require('./routes/viewArticle');

var app = express();

app.use(connection(mysql,{
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'nodeDb'
},'request'));

app.use(session({
    secret: 'adsfasdKJJHGDFJHAD@$#@#43543uJSJDHFKJSsdfs',
    resave: true,
    saveUninitialized: true
}));

app.use(require('connect-flash')());
app.use(function (req,res,next) {
    res.locals.messages = require('express-messages')(req,res);
    next();
});

app.use(expressValidator({
    errorFormator: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while(namespace.length){
            formParam +='['+namespace.shift()+']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }

}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/home', home);
app.use('/addArticle', addArticle);
app.use('/viewArticle', viewArticle);

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
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
