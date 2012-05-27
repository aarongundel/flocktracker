
/*
 * GET home page.
 */

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