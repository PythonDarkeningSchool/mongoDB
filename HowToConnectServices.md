# How to connect services

To connect JavaScript, MongoDB and NodeJS follow this steps

## JavaScript

The following code is to generate a simple form with the required data

```javascript
<!DOCTYPE html>
<html>
<body>
	<form method="POST" action="http://localhost:3030/api/users" enctype="application/x-www-form-urlencoded">
	  First name:<br>
	  <input type="text" name="firstname" value="Mickey">
	  <br>
	  Last name:<br>
	  <input type="text" name="lastname" value="Mouse">
	  <br><br>
	  <input type="submit" value="Submit">
	</form> 
</body>
</html>
```

**Code explanation**:

- `method` => the HTTP verb could be POST/GET/PUT/DELETE or whatever you want, but for security reasons it must be POST
- `action` => this is the url (setup within `NodeJS`) for the POST method
- `enctype` => "encryption type" would be the declared in the code
- `name` => are the name of the variables that must catch in NodeJS app

## NodeJS

### Create endpoints

Install the following package and it will save to `package.json` (`node init is requiered as prerequisite`)

```bash
npm install body-parser --save
```

[body-parser package reference](https://www.npmjs.com/package/body-parser)

The following code is an example of how to setup NodeJS with custom `endpoints`

```javascript

// grab the packages we need
var express = require('express');
var app = express();
var port = 3030;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies


// routes will go here

// POST http://localhost:3030/api/users
// parameters sent with 
app.post('/api/users', function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    res.send('name is: ' + firstname + ' lastname is:' + lastname);
    console.log(req.body);
});


// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
```

References:

- [Use expressjs to get url and post parameters](https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters)

### Serve HTML files

```javascript

// grab the packages we need
var express = require('express');
var app = express();
var port = 3030;
var path = require('path');

// index.html
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

```

References

- [Use expresjs to deliver html files](https://scotch.io/tutorials/use-expressjs-to-deliver-html-files)

## MongoDB

Install the following package and it will save to `package.json` (`node init is requiered as prerequisite`)

```bash
npm install mongodb@2.2.33 --save
```

[mongodb package reference](https://www.npmjs.com/package/mongodb)

### Connecting to database

```javascript
var MongoClient = require('mongodb').MongoClient;
var database = "employees";
var password = ""
var user = ""
var uri = "mongodb://" + user + ":" + password + "@cluster0-shard-00-00-mexzx.mongodb.net:27017/" + database + "?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
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

```

# How to test services

## POSTMAN

To test the endpoint `http://localhost:3030/api/users` previously created in `NodeJS` with POSTMAN follow the next steps

1. Open a new tab
2. Change the HTTP verb to `POST` method
3. Introduce the URL `http://localhost:3030/api/users`
4. Select `Body` tab  and select `x-www-form-urlencoded`
5. Type the Keys and values proper for the request
6. Click on send button

Example:

![postman_post_example](img/postman_post_example.JPG)