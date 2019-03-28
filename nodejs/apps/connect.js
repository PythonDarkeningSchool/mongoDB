var MongoClient = require('mongodb').MongoClient;
var database = "employees";
var password = "somePassoword"
var uri = "mongodb://hiperezr:" + password + "@cluster0-shard-00-00-mexzx.mongodb.net:27017/" + database + "?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
var assert = require('assert');


var insertOneDocument = function(db, callback) {
  // Get the documents collection
  db.collection('employee').insertOne({
  	name: "testingname",
  	lastname: "testinglastname"
  });

}


var insertOne = function(collection, data){
  collection.insertOne(data, function(err, result) {
    assert.equal(null, err);
    assert.equal(1, result.insertedCount);
    console.log("inserted documents: " + r.insertedCount);
  });
}


var updateOne = function(collection){
	collection.updateOne(
		{name : "pancho"}, {$set: {name: "anastasio"}}
  		, function(err, result) {
    		assert.equal(null, err);
    		console.log("updated document");
  		});
	}

MongoClient.connect(uri, function(err, db) {
	assert.equal(err, null);

  	var collection = db.collection('employee');
  	insertOneDocument();
  	insertOne(collection, data);
  	updateOne(collection);
  	// Close db connection
  	db.close();
});
