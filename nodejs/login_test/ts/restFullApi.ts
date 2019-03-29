/*RestFull API*/

export class API{

    // Class attributes
    private app;
    private path;

    constructor(port: string){
        // Importing node modules
        let express = require("express");
        let bodyParser = require('body-parser');
        this.path = require('path');

        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
        this.app.use(bodyParser.json()); // support json encoded bodies

        // Start the server
        this.app.listen(port);
        console.log(`Server started! at => http://localhost:${port}`);
    }

    // Define the getters
    get getApp(){
        return this.app;
    }
    
    get getPath(){
        return this.path;
    }

    /* ====================
        HTTP Verbs
       ====================
    */

    // Inner class
    public GET = new class {
        private app: any;
        private path: any;

        // Define the setters
        set setApp(app: any){
            this.app = app;
        }

        set setPath(path: any){
            this.path = path;
        }

        // Add GET endpoints here ...

        // <Serve the main index.html>
        public indexHTML(): void {
            let endPoint: string = "/";

            this.app.get(endPoint, function(_, response) {
                response.sendFile(this.path.join(__dirname + "../html/index.html"));
                console.log("serve => index.html");
            })
        }        
    }

    public POST(){
        // Add POST endpoints here ...
        
        // <login endpoint>
        let login = (): void => {
            let endPoint: string = "/login";

            this.app.post(endPoint, function(request, response) {
                // Grab the variables from the POST method
                let firstname = request.body.firstname;
                let lastname = request.body.lastname;
                response.send(`name is: ${name} <> lastname is ${lastname}`);
                console.log(request.body);
            });
        }
    }
}