var START = "Piazzale%20Roma,%20Venice";

var request = require("request");
var sleep = require('sleep');

var MongoClient = require('mongodb').MongoClient;

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

	//if (m > 2) { return; }
	var url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + START + "&destination=" + elem.coordinates[0] + "," + elem.coordinates[1] + "&mode=driving&departure_time=1477389600&key=AIzaSyBixAUqw69Y-obv_QW3jJhlurSqO9hiiFQ";
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
		var driving = "";
	    if (!error && response.statusCode === 200 && body.routes && body.routes.length > 0) {
	        driving = body.routes[0];
	    } else {
	    	console.log(elem.address);
	    }

	    collection.updateOne({ _id : elem._id }, { $set: {driving: driving}}, function(err, res) {
        	console.log(m);
        });
	});
}