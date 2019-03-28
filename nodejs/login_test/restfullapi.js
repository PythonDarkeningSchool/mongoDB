// grab the packages we need
const express = require("express");
const mongodb = require("connectmongodb");
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies


// POST to => http://localhost:3000/login
app.post('/login', function(req, res) {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    res.send('name is: ' + firstname + ' lastname is:' + lastname);
    console.log(req.body);
});


// start the server
app.listen(port);
console.log("Server started! At http://localhost:" + port);