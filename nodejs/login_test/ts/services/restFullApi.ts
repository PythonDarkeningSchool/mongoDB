/*RestFull API*/

// Import local node modules
let express = require("express");
let assert = require("assert");
let bodyParser = require('body-parser');
let path = require('path');
// Import custom node modules
let mongoUtil = require( "../database/mongoConnection" );


// Define variables
let app = express();
let collection = "users";

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.static(path.join(__dirname, "../../html"))); // to serve all files into html folder
export class addEndPoint{

    // GET endpoints
    index(){
        let endPoint: string = "/";
        app.get(endPoint, function(_, response) {
            response.sendFile(path.join(__dirname + "/../../html/index.html"));
        })
    }


    // POST endpoints
    users(){
        let endpoint: string = "/api/users"
        app.post(endpoint, function(request: any, response: any) {
            let firstName = request.body.firstName;
            let lastName = request.body.lastName;
            response.send(`firstName: ${firstName} <> lastName: ${lastName}`);
            console.log(request.body);
        });
    }

    auth(){
        let endpoint: string = "/auth"
        app.post(endpoint, function(request: any, response: any) {
            let username: string = request.body.username;
            let password = request.body.password;
            console.log(`username: ${username}`);

            mongoUtil.connectToServer( function( err: object ) {
                // instantiate the connection
                let db = mongoUtil.getConnection();
                let query = { username: `${username}` }
              
                db.collection(collection).find(query).toArray(function(err: object, result: object) {
                  assert.equal(null, err);
                  // Show results
                  console.log(result);
                  response.send(result);
                  // Disconnect
                  mongoUtil.disconnect();
                });
              });
        });
    }   

    findAllUsers(){
        let endpoint: string = "/api/queries/findAllUsers"
        app.post(endpoint, function(request: any, response: any) {

            mongoUtil.connectToServer( function( err: object ) {
                // instantiate the connection
                let db = mongoUtil.getConnection();
              
                db.collection(collection).find({}).toArray(function(err: object, result: object) {
                  assert.equal(null, err);
                  // Show results
                  console.log(result);
                  response.send(result);
                  // Disconnect
                  mongoUtil.disconnect();
                });
              });
        });
    }
}

export class StartAPI{
    constructor(port: number){
        // Start the server
        app.listen(port);
        console.log(`(info) Server started! at => http://localhost:${port}`);
    }
}