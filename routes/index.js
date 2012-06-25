
/*
 * GET home page.
 */
var mongoose = require('mongoose'), Schema, ObjectId, Flock, makeID;

mongoose.connect('mongodb://localhost/flock_tracker', function (err) {
  if (err) {
    return 0; //TODO: Do something meaningful if we couldn't connect to mongo
  }
});

makeID = function () {
  var text = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "abcdefghijklmnopqrstuvwxyz0123456789", i;

  for (i = 0; i < 5; i = i + 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

Flock = new Schema({
  name: String,
  organizer: String,
  shortID: String,
  location: {
    lon: Number,
    lat: Number
  }
});

Flock.index({ location:'2d' });

Flock = mongoose.model('Flock', Flock);

exports.index = function (req, res) {
  res.render('index', { title: 'Express', req: req });
};
//var flocks = [{name: "Aaron's flock"}, {name: "Kron's flock"}]
exports.flock = {};

exports.flock.index = function (req, res) {
  //res.render('flock/index', {title: 'Flocks', flocks: []});
  Flock.find({}, function (err, docs) {
    res.render('flock/index', { title: 'Flocks', flocks: docs });
  });
};

exports.flock.newFlock = function (req, res) {
  req.customCss = ["/stylesheets/leaflet.css"];
  req.customIeCss = ["/stylesheets/leaflet.ie.css"];
  res.render('flock/create', {
    title: 'Create a new Flock'
  });
};

exports.flock.create = function (req, res) {
  var location, flock;
  flock = new Flock();
  flock.name = req.body.flock.name;
  flock.organizer = req.body.flock.organizer;
  flock.shortID = makeID();
  flock.location = {
    lon: req.body.flock.longitude,
    lat: req.body.flock.latitude
  };

  flock.save(function (err) {
    if (!err) {
      req.flash('info', 'Flock created');
      res.redirect('/flocks');
    } else {
      req.flash('warning', 'Could not create the flock; try again');
      res.redirect('/flocks/new');
    }
  });
};

exports.flock.edit = function (req, res) {
  Flock.findById(req.params.id, function (err, doc) {
    res.render('flock/edit', {
      title: 'Edit Flock Data',
      flock: doc
    });
  });
};

exports.flock.update = function (req, res) {
  Flock.findById(req.params.id, function (err, doc) {
    var flock = doc;

    flock.name = req.body.flock.name;
    flock.organizer = req.body.flock.organizer;
    flock.location = {
      lon: req.body.flock.longitude,
      lat: req.body.flock.latitude
    };
    flock.save(function (err) {
      if (!err) {
        req.flash('info', 'Flock updated');
        res.redirect('/flocks');
      } else {
        req.flash('warning', 'Could not update the flock; try again');
        res.redirect('/flocks/' + req.params.id + '/edit');
      }
    });
  });
};

exports.flock.delete = function (req, res) {
  Flock.findById(req.params.id, function (err, doc) {
    if (!doc) {
      return next(new NotFound('Document not found'));
    }
    doc.remove(function () {
      req.flash('info', 'Deleted the flock');
      res.redirect('/flocks');
    });
  });
};