var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cars = require("./routes/car")
const carsApi = require("./routes/carApi");
var bodyParser = require("body-parser");
var mongo = require('mongoose')

var app = express();


// connext monggo
mongo.connect('mongodb+srv://Quyet123:Quyet123@cluster0.byqpgoo.mongodb.net/')
  .then(() => {
    console.log("Connected to MongoDB");  // Tiếp tục thực hiện các tác vụ sau khi kết nối thành công nếu cần thiết
  })
  .catch((error) => {
    console.error("Errors to MongoDB:", error);
  });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json({limit: '50mb'}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars',cars)
app.use('/carsApi',carsApi);
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
