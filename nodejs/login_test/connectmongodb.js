var MongoClient = require('mongodb').MongoClient;
var database = "employees";
var password = ""
var user = ""
var uri = "mongodb://" + user + ":" + password + "@cluster0-shard-00-00-mexzx.mongodb.net:27017/" + database + "?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
var assert = require('assert');

MongoClient.connect(uri, function(err, db) {
    assert.equal(err, null);

    var collection = db.collection('employee');
    insertOneDocument();
    insertOne(collection, data);
    updateOne(collection);
    // Close db connection
    db.close();
});