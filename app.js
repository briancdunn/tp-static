var express = require('express'),
    swig = require('swig'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    bluebird = require('bluebird'),
    routes = require('./routes'),
    path = require('path');

var app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });



app.use(morgan('dev'));

app.use('/bootstrap', express.static(path.join(__dirname, './node_modules/bootstrap/dist')));

app.use('/jquery', express.static(path.join(__dirname, './node_modules/jquery/dist')));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(function(req,res,next) {
  var err = new Error('Not Found: ' + req.url);
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
