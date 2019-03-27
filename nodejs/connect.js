
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hiperezr:Focus.12@cluster0-mexzx.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("it").collection("devices");
  // perform actions on the collection object
  client.close();
});
