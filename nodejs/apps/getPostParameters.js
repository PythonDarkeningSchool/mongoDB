
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
    // var id = req.body.id;
    // var token = req.body.token;
    // var geo = req.body.geo;

    //res.send(id + ' ' + token + ' ' + geo);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    res.send('name is: ' + firstname + ' lastname is:' + lastname);
    console.log(req.body);
});





// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);