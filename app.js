const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes');
const swaggerRouter = require('./src/routes/swagger-ui');
const {URL_PREFIX} = require("./src/configs/general.config");

const session = require('express-session');
const {auth, memoryStore} = require("./src/middle/auth");

const app = express();

app.use(session({
  secret: '-',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

app.set( 'trust proxy', true );
app.use(auth.middleware({
  logout: '/logout',
  admin: '/admin'
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(`${URL_PREFIX}`, swaggerRouter);
app.use(`${URL_PREFIX}/static`, express.static('public'));

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
