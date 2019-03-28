var Mongodb = /** @class */ (function () {
    function Mongodb(db, user, password, cluster, clusterOptions) {
        // Import node modules
        var MongoClient = require("mongodb").MongoClient;
        this.assert = require('assert');
        // Assing variables
        var uri = "mongodb://" + user + ":" + password + "@" + cluster + "/" + db + "?" + clusterOptions;
        // Making the db connection
        MongoClient.connect(uri, function (err, db) {
            this.assert.equal(err, null);
            // return an active connection with db
            this.db = db;
        });
    }
    Mongodb.prototype.Query = function (collection, query) {
        this.db.collection(collection).find(query).toArray(function (err, result) {
            // Show an assert on error
            this.assert.equal(null, err);
            console.log(result);
            // Close mongoDB connection
            this.db.close();
        });
    };
    return Mongodb;
}());
//# sourceMappingURL=app.js.map