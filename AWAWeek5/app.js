/*
TITLE: Advanced Web Applications Course
TASK: Week 5 exercise
AUTHOR: Joona Pellinen
DATE: 4.12.2022

REFERENCES:
Course material
W3schools Syntax for javascript and html
https://www.techiedelight.com/dynamically-create-checkbox-with-javascript/
https://materializecss.com/checkboxes.html
https://www.javascripttutorial.net/javascript-dom/javascript-checkbox/
https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
https://blog.logrocket.com/multer-nodejs-express-upload-file/
*/

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "images/"});

const mongoDB = "mongodb://localhost:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

let indexRouter = require('./routes/index');
let recipesRouter = require('./routes/recipes');
const { Mongoose } = require('mongoose');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', recipesRouter);

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
