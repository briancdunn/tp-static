var express = require('express'),
    swig = require('swig'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    bluebird = require('bluebird'),
    routes = require('./routes');

var app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err,req,res,next) {
  res.status(err.status || 500);
  console.log({error: err});
  res.status(err.status).send(err.message);
})

app.listen(3000, function(err){
  console.log('Listening to port 3000');
});
