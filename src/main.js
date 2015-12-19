var app, bodyParser, config, cookieParser, env, express, favicon, iot, logger, mongooseSetup, path, server;

express = require('express');

path = require('path');

favicon = require('serve-favicon');

logger = require('morgan');

cookieParser = require('cookie-parser');

bodyParser = require('body-parser');

iot = require('./routes/iot');

mongooseSetup = require('./data/mongoose-setup');

app = express();

app.use(require('connect-livereload')());

env = process.env.NODE_ENV || 'development';

app.locals.ENV = env;

app.locals.ENV_DEVELOPMENT = env === 'development';

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());

app.use(express["static"](path.join(__dirname, 'public')));

config = require('./config/' + (process.env.NODE_ENV || 'development') + '.json');

mongooseSetup.init(config).then(function(db) {
  return console.log('DB OK');
}, function(reason) {
  return console.log(reason);
});

app.use('/api/iot', iot);

app.use(function(req, res, next) {
  var err;
  err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    return res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  return res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});

app.set('port', process.env.PORT || 3000);

server = app.listen(app.get('port'), function() {
  return console.log('Express server listening on port ' + server.address().port);
});
