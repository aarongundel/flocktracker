
/*
 * GET home page.
 */
var mongoose = require('mongoose'), 
  Schema, ObjectId, Flock;

mongoose.connect('mongodb://localhost/flock_tracker', function(err) { 
    if (!err) { 
      console.log('connected to MongoDB'); 
    } else { 
      throw err; 
    } 
}); 

Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
var flocks = [{name: "Aaron's flock"}, {name: "Kron's flock"}]
exports.flock = {};
exports.flock.index = function(req, res){
  res.render('flock/index', { title: 'Flocks', flocks: flocks });
};
exports.flock.create = function(req, res){
  req.customCss = ["/stylesheets/leaflet.css"];
  req.customIeCss = ["/stylesheets/leaflet.ie.css"];
  res.render('flock/create', { title: 'Create a new Flock', flocks: flocks, req: req });
};