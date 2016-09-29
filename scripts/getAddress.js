var request = require("request");
var sleep = require('sleep');

var MongoClient = require('mongodb').MongoClient;

// Connection URL
var mongoUrl = 'mongodb://localhost:27017/bounds';

// Use connect method to connect to the server
MongoClient.connect(mongoUrl, function(err, db) {
  var collection = db.collection('markers');

  collection.find({}).toArray(function(err, docs) {
  	if (err) { console.log(err); return; }
  	docs.forEach(function(elem) {
  		processMarker(elem, collection);
  		sleep.usleep(100000);
  	});

  	//db.close();
  });
});

var q = 0;
function processMarker(elem, collection) {
	var m = q;
	q += 1;

	//if (q > 2) { return; }
	var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + elem.coordinates[0] + "," + elem.coordinates[1] + "&key=AIzaSyBixAUqw69Y-obv_QW3jJhlurSqO9hiiFQ";

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
		var address = "";
	    if (!error && response.statusCode === 200 && body.results && body.results.length > 0) {
	        address = body.results[0].formatted_address;
	    }

	    collection.updateOne({ _id : elem._id }, { $set: {address: address}}, function(err, res) {
        	console.log(m);
        });
	});
}