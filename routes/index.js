
/*
 * GET home page.
 */
var mongoose = require('mongoose'), Schema, ObjectId, Flock;

mongoose.connect('mongodb://localhost/flock_tracker', function (err) {
  if (err) {
    return 0; //TODO: Do something meaningful if we couldn't connect to mongo
  }
});

Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

Flock = new Schema({
  organizer: String,
  name: String
});

exports.index = function (req, res) {
  res.render('index', { title: 'Express' });
};
//var flocks = [{name: "Aaron's flock"}, {name: "Kron's flock"}]
exports.flock = {};
exports.flock.index = function (req, res) {
  Flock.find({}, function (err, docs) {
    res.render('flock/index', {title: 'Flocks', flocks: docs});
  });
};
exports.flock.create = function (req, res) {
  req.customCss = ["/stylesheets/leaflet.css"];
  req.customIeCss = ["/stylesheets/leaflet.ie.css"];
  res.render('flock/create', {
    title: 'Create a new Flock',
    flocks: flocks,
    req: req 
  });
};