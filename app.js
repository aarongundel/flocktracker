
/**
 * Module dependencies.
 */

var express = require('express'),
  app = module.exports = express.createServer(),
  routes = require('./routes'),
  Twitter = require('ntwitter'), 
  io = require('socket.io').listen(app),
  twit;

// Configuration

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "97Z6ZcW108ILhUFOEucx" }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/flocks', routes.flock.index);
app.post('/flocks', routes.flock.create);
app.get('/flocks/new', routes.flock.newFlock);
app.get('/flocks/:id/edit', routes.flock.edit);
app.put('/flocks/:id', routes.flock.update);
app.del('/flocks/:id', routes.flock.delete);

app.listen(3000, function () {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

twit = new Twitter({
  consumer_key: 'ciKJo2VtfXrt3ZLHmRAQ',
  consumer_secret: '8AakHD8ovEhGkIAoq9TkjyTYmfOtBxCfCe03Q7v36s',
  access_token_key: '584364616-Z4rQF7lc6piR9s3aTu02rds3YScvPLXjTxws15SG',
  access_token_secret: 'ck52NFIeIEAomQKtaXSrKZtcTizUD2Ckdqr0GVv9Q'
});

twit.stream('statuses/filter', {
  track: ['#love']
}, function (stream) {
  stream.on('data', function (data) {
    io.sockets.volatile.emit('tweet', {
      user: data.user.screen_name,
      text: data.text
    });
  });
});