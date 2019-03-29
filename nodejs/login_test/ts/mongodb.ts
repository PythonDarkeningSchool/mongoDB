class Mongodb { 

    db;
    assert;

    constructor(db: string, user: string, password: string, cluster: string, clusterOptions: string) {
        // Import node modules
        let MongoClient = require("mongodb").MongoClient;
        this.assert = require('assert');
        // Assing variables
        let uri: string = `mongodb://${user}:${password}@${cluster}/${db}?${clusterOptions}`;

        // Making the db connection
        MongoClient.connect(uri, function(err, db) {
            this.assert.equal(err, null);
            // return an active connection with db
            this.db = db;
        });  
    }

    Query(collection: string, query: string): void {
        this.db.collection(collection).find(query).toArray(function(err, result) {
            // Show an assert on error
            this.assert.equal(null, err);
            console.log(result);
            // Close mongoDB connection
            this.db.close();
          });
    }

    PrintVariables(): void {
        console.log(`typeof(db) => ${typeof(this.db)}`);
        console.log(`typeof(assert) => ${typeof(this.assert)}`);
    }

}