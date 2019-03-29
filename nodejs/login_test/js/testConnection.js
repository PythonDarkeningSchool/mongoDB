var _a = require('mongodb-stitch-browser-sdk'), Stitch = _a.Stitch, RemoteMongoClient = _a.RemoteMongoClient, AnonymousCredential = _a.AnonymousCredential;
var client = Stitch.initializeDefaultAppClient('');
var db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('employees');
client.auth.loginWithCredential(new AnonymousCredential()).then(function (user) {
    return db.collection('employee').updateOne({ owner_id: client.auth.user.id }, { $set: { number: 42 } }, { upsert: true });
}).then(function () {
    return db.collection('employee').find({ owner_id: client.auth.user.id }, { limit: 100 }).asArray();
}).then(function (docs) {
    console.log("Found docs", docs);
    console.log("[MongoDB Stitch] Connected to Stitch");
}).catch(function (err) {
    console.error(err);
});
//# sourceMappingURL=testConnection.js.map