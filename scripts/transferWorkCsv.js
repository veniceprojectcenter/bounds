var request = require("request");

var SKIP = ["TIPO_SOGGETTO", "CODREG", "REGIONE", "CODPRO", "PROVINCIA", "CODCOM", "COMUNE", "PROCOM", "SEZ2011", "NSEZ", "ACE", "CODLOC", "CODASC"];

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
  var collection = db.collection('polygons');

  collection.find({}).toArray(function(err, docs) {
    if (err) { console.log(err); return; }
    docs.forEach(function(elem) {
      var workData = cache[elem.sez2011] || {};

      if (Object.keys(workData).length == 0) { return; }

      var workObj = {};

      Object.keys(workData).forEach(function(key) {
        if (SKIP.indexOf(key) == -1) {
          workObj[key] = parseInt(workData[key]);
        }
      });

      processTract(elem._id, workObj, collection);
    });

    //db.close();
  });
});

var q = 0;
function processTract(id, workData, collection) {
	var m = q;
	q += 1;

  collection.updateOne({_id: id}, { $set: {work: workData}}, function(err, res) {
  	console.log(m);
  });
}