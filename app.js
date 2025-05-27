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
const VIEW_PATH = path.join(__dirname, 'views');
const PUBLIC_PATH = path.join(__dirname, 'public');

// 미들웨어 설정 추출
const setupMiddlewares = (app) => {
  app.use(session({
    secret: '-',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));
  app.set('trust proxy', true);
  app.use(auth.middleware({
    logout: '/logout',
    admin: '/admin'
  }));
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(express.static(PUBLIC_PATH));
};

// 미들웨어 설정 함수 호출
setupMiddlewares(app);

// 뷰 엔진 설정
app.set('views', VIEW_PATH);
app.set('view engine', 'ejs');

// 라우터 설정
app.use('/', indexRouter);
app.use(`${URL_PREFIX}`, swaggerRouter);
app.use(`${URL_PREFIX}/static`, express.static('public'));

// 404 처리 및 에러 핸들러 설정
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;