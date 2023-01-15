/*
TITLE: Advanced Web Applications Course
TASK: Week 3 exercise
AUTHOR: Joona Pellinen
DATE: 20.11.2022

REFERENCES:
Course material
https://stackoverflow.com/questions/39921473/mixing-javascript-with-node-js-and-pug
https://gomakethings.com/the-javascript-fetch-method/
https://www.w3schools.com/jsref/jsref_find.asp
https://www.youtube.com/watch?v=Kw5tC5nQMRY
https://stackabuse.com/how-to-check-if-key-exists-in-javascript-object-array/
https://stackoverflow.com/questions/27508025/html-javascript-how-can-i-make-a-button-appear-in-a-function
https://stackoverflow.com/questions/39286008/deleting-a-user-in-an-array
https://stackoverflow.com/questions/8685107/hiding-a-button-in-javascript
*/

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);

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
