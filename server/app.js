const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

mongoose.connect('mongodb://localhost/react_app');

app.use(cors())
app.use(function(req, res, next) {
res.setHeader("Access-Control-Allow-Origin", '*');
res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {

  res.setHeader('Content-Type', 'application/json');
  next();
});

require('./routes')(app);



// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not found This page');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  let error = err.message;

  // render the error page
  res.status(err.status || 500);
  res.json({ error });
});


module.exports = app;
