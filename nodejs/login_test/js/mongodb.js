var Mongodb = (function () {
    function Mongodb(db, user, password, cluster, clusterOptions) {
        var MongoClient = require("mongodb").MongoClient;
        this.assert = require('assert');
        var uri = "mongodb://" + user + ":" + password + "@" + cluster + "/" + db + "?" + clusterOptions;
        MongoClient.connect(uri, function (err, db) {
            this.assert.equal(err, null);
            this.db = db;
        });
    }
    Mongodb.prototype.Query = function (collection, query) {
        this.db.collection(collection).find(query).toArray(function (err, result) {
            this.assert.equal(null, err);
            console.log(result);
            this.db.close();
        });
    };
    Mongodb.prototype.PrintVariables = function () {
        console.log("typeof(db) => " + typeof (this.db));
        console.log("typeof(assert) => " + typeof (this.assert));
    };
    return Mongodb;
}());
//# sourceMappingURL=mongodb.js.map