var request = require("request");

if (process.argv.length != 3) {
	console.log('No file specified.');
	return;
}

var fs = require('fs');

var parse = require('csv-parse/lib/sync');


var csvDoc = fs.readFileSync(process.argv[2], 'utf8');
var records = parse(csvDoc, {columns: true});

var cache = {};

records.forEach(function(rec) {
  cache[rec.SEZ2011] = rec;
});


var MongoClient = require('mongodb').MongoClient;

var mongoUrl = 'mongodb://localhost:27017/bounds';

// Use connect method to connect to the server
MongoClient.connect(mongoUrl, function(err, db) {
  var collection = db.collection('censusPolygons');

  collection.find({}).toArray(function(err, docs) {
    if (err) { console.log(err); return; }
    docs.forEach(function(elem) {
      var census = cache[elem.sez2011] || {};

      processTract(elem._id, census, collection);
    });

    //db.close();
  });
});

var q = 0;
function processTract(id, census, collection) {
	var m = q;
	q += 1;

  collection.updateOne({_id: id}, { $set: {census: census}}, function(err, res) {
  	console.log(m);
  });
}