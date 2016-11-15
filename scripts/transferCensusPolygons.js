var request = require("request");
var turf = require('@turf/turf');

if (process.argv.length != 3) {
	console.log('No file specified.');
	return;
}

var fs = require('fs');
var censusGeoJson = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

var MongoClient = require('mongodb').MongoClient;

var mongoUrl = 'mongodb://localhost:27017/bounds';

// Use connect method to connect to the server
MongoClient.connect(mongoUrl, function(err, db) {
  var collection = db.collection('censusPolygons');

  censusGeoJson.features.forEach(function(tract) {
  	var obj = {};
  	var centroid = turf.centroid(tract);

  	obj.sez2011 = tract.properties.["SEZ2011"];
  	obj.area = tract.properties["Shape_Area"];
  	obj.tract = tract.geometry;
  	obj.centroid = centroid;

  	processTract(obj, collection);
  });
});

var q = 0;
function processTract(elem, collection) {
  var m = q;
  q += 1;

  collection.update(elem, function(err, res) {
    console.log(m);
  });
}